export class BusyError extends Error {
  constructor(message, retryAfter = 5, status = 429) {
    super(message); this.retryAfter = retryAfter; this.status = status;
  }
}

export function limitsFrom(env) {
  const integer = (name, fallback, min = 1, max = 1000000) => {
    const value = Number(env[name]);
    return Number.isFinite(value) && value >= min ? Math.min(max, Math.floor(value)) : fallback;
  };
  const headroom = Number(env.QUOTA_HEADROOM);
  const ratio = headroom >= 0.1 && headroom <= 1 ? headroom : 0.85;
  return {
    rpm: Math.max(1, Math.floor(integer('GROQ_RPM', 30) * ratio)),
    rpd: Math.max(1, Math.floor(integer('GROQ_RPD', 1000) * ratio)),
    tpm: Math.max(1, Math.floor(integer('GROQ_TPM', 8000) * ratio)),
    tpd: Math.max(1, Math.floor(integer('GROQ_TPD', 200000) * ratio)),
    concurrent: integer('MAX_CONCURRENT', 4, 1, 32), userRpm: integer('USER_RPM', 6, 1, 60),
  };
}

// Atomically check and reserve each window across all instances. No chat text.
export const RESERVE_SCRIPT = `
local now = tonumber(ARGV[1])
redis.call('ZREMRANGEBYSCORE', KEYS[6], '-inf', now)
local costs = {1, 1, tonumber(ARGV[2]), tonumber(ARGV[2]), 1}
local caps = {tonumber(ARGV[3]), tonumber(ARGV[4]), tonumber(ARGV[5]), tonumber(ARGV[6]), tonumber(ARGV[7])}
local durations = {60, 86400, 60, 86400, 60}
if redis.call('ZCARD', KEYS[6]) >= tonumber(ARGV[8]) then return {0, 2, 6} end
for i = 1, 5 do
  if tonumber(redis.call('GET', KEYS[i]) or '0') + costs[i] > caps[i] then
    return {0, math.max(1, redis.call('TTL', KEYS[i])), i}
  end
end
for i = 1, 5 do
  local value = redis.call('INCRBY', KEYS[i], costs[i])
  if value == costs[i] then redis.call('EXPIRE', KEYS[i], durations[i]) end
end
redis.call('ZADD', KEYS[6], now + 65000, ARGV[9])
redis.call('EXPIRE', KEYS[6], 70)
return {1, 0, redis.call('ZCARD', KEYS[6])}
`;

export class Governor {
  constructor({ env = {}, fetchImpl = fetch, now = () => Date.now() } = {}) {
    this.env = env; this.fetch = fetchImpl; this.now = now;
    this.limits = limitsFrom(env); this.buckets = new Map(); this.active = new Map(); this.observed = new Map();
    this.shared = Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);
  }

  async redis(script, keys, args) {
    const url = this.env.UPSTASH_REDIS_REST_URL;
    if (!/^https:\/\//.test(url)) throw new BusyError('Paylaşımlı kapasite ayarı geçersiz.', 10, 503);
    try {
      const response = await this.fetch(url.replace(/\/$/, ''), {
        method: 'POST', headers: { Authorization: `Bearer ${this.env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(['EVAL', script, keys.length, ...keys, ...args.map(String)]), signal: AbortSignal.timeout(2500),
      });
      const result = await response.json();
      if (!response.ok || result.error || result.result == null) throw new Error('redis');
      return result.result;
    } catch { throw new BusyError('Kapasite kontrolüne ulaşılamıyor. Kısa bir süre sonra tekrar dene.', 10, 503); }
  }

  cleanup() {
    const now = this.now();
    for (const [key, value] of this.buckets) if (value.reset <= now) this.buckets.delete(key);
    for (const [key, expiry] of this.active) if (expiry <= now) this.active.delete(key);
    if (this.buckets.size > 4000) throw new BusyError('Servis yoğun. Biraz sonra tekrar dene.', 60);
  }

  pressure(model) {
    this.cleanup();
    const observed = this.observed.get(model), now = this.now(), budget = this.buckets.get(`${model}:tm`);
    return this.active.size >= 2 || (budget?.reset > now && budget.value > this.limits.tpm * 0.45) ||
      (observed && observed.tokensUntil > now && observed.tokens < this.limits.tpm * 0.45) ||
      (observed && observed.requestsUntil > now && observed.requests < this.limits.rpd * 0.1);
  }

  async reserve(model, tokens, client) {
    const { rpm, rpd, tpm, tpd, userRpm, concurrent } = this.limits;
    if (tokens > tpm) throw new BusyError('Bu istek ücretsiz dakika bütçesine sığmıyor. Mesajı kısalt veya dosyaları azalt.', 0, 413);
    const now = this.now(), observation = this.observed.get(model);
    if (observation?.blockedUntil > now) throw new BusyError('Yapay zekâ kotası şu an dolu.', Math.ceil((observation.blockedUntil - now) / 1000));
    if (observation?.requestsUntil > now && observation.requests < 1) throw new BusyError('Günlük yapay zekâ kotası dolu.', Math.ceil((observation.requestsUntil - now) / 1000));
    if (observation?.tokensUntil > now && observation.tokens < tokens) throw new BusyError('Dakika bütçesi yenileniyor.', Math.ceil((observation.tokensUntil - now) / 1000));
    const id = crypto.randomUUID(), prefix = this.env.QUOTA_NAMESPACE || 'balkiz:v2';
    const keys = [`${prefix}:${model}:rm`, `${prefix}:${model}:rd`, `${prefix}:${model}:tm`, `${prefix}:${model}:td`, `${prefix}:u:${client}`, `${prefix}:active`];
    if (this.shared) {
      const result = await this.redis(RESERVE_SCRIPT, keys, [now, tokens, rpm, rpd, tpm, tpd, userRpm, concurrent, id]);
      if (result[0] !== 1) throw new BusyError(result[2] === 5 ? 'Çok hızlı istek gönderiyorsun. Kısa bir ara ver.' : 'Ücretsiz kapasite şu an dolu; bütçe yenilendiğinde tekrar deneyebilirsin.', Number(result[1]));
      this.active.set(id, now + 65000);
      let released = false;
      return {
        pressure: result[2] >= 2, release: async () => {
          if (released) return; released = true; this.active.delete(id);
          // Shared reservations remain conservative: cancelled/unknown usage is charged.
          try { await this.redis("return redis.call('ZREM', KEYS[1], ARGV[1])", [keys[5]], [id]); } catch { /* bounded lease expires */ }
        },
      };
    }
    if (this.env.REQUIRE_SHARED_LIMITS === '1') throw new BusyError('Paylaşımlı kapasite kontrolü yapılandırılmalı.', 10, 503);
    this.cleanup();
    if (this.active.size >= concurrent) throw new BusyError('Tüm yanıt sıraları dolu. Birkaç saniye sonra tekrar dene.', 2);
    const specs = [[`${model}:rm`, 1, rpm, 60000], [`${model}:rd`, 1, rpd, 86400000], [`${model}:tm`, tokens, tpm, 60000], [`${model}:td`, tokens, tpd, 86400000], [`u:${client}`, 1, userRpm, 60000]];
    for (const [key, cost, cap] of specs) {
      const bucket = this.buckets.get(key);
      if ((bucket?.value || 0) + cost > cap) throw new BusyError(key.startsWith('u:') ? 'Çok hızlı istek gönderiyorsun. Kısa bir ara ver.' : 'Ücretsiz kapasite dolu; bütçe yenileniyor.', Math.ceil(((bucket?.reset || now + 60000) - now) / 1000));
    }
    const reservations = specs.map(([key, cost, , duration]) => {
      const bucket = this.buckets.get(key) || { value: 0, reset: now + duration };
      bucket.value += cost; this.buckets.set(key, bucket); return { key, bucket };
    });
    this.active.set(id, now + 65000);
    let released = false;
    return {
      pressure: this.active.size >= 2,
      release: async actualTokens => {
        if (released) return; released = true; this.active.delete(id);
        if (Number.isFinite(actualTokens)) {
          const refund = Math.max(0, tokens - actualTokens);
          for (const { key, bucket } of reservations.filter(item => /:t[md]$/.test(item.key))) {
            if (this.buckets.get(key) === bucket) bucket.value = Math.max(0, bucket.value - refund);
          }
        }
      },
    };
  }

  observe(model, headers, status = 200) {
    const now = this.now(), result = { ...(this.observed.get(model) || {}) };
    const number = name => {
      const raw = headers.get(name); return raw !== null && Number.isFinite(Number(raw)) ? Number(raw) : null;
    };
    const tokens = number('x-ratelimit-remaining-tokens'), requests = number('x-ratelimit-remaining-requests');
    if (tokens !== null) Object.assign(result, { tokens, tokensUntil: now + parseReset(headers.get('x-ratelimit-reset-tokens'), 60000) });
    if (requests !== null) Object.assign(result, { requests, requestsUntil: now + parseReset(headers.get('x-ratelimit-reset-requests'), 86400000) });
    if (status === 429) result.blockedUntil = now + Math.max(1000, parseReset(headers.get('retry-after'), 60000));
    this.observed.set(model, result);
  }
}

export function parseReset(value, fallback) {
  if (!value) return fallback;
  if (/^\d+(\.\d+)?$/.test(value)) return Math.ceil(Number(value) * 1000);
  const matches = [...value.matchAll(/(\d+(?:\.\d+)?)(ms|s|m|h|d)/g)];
  return matches.length ? Math.ceil(matches.reduce((sum, match) => sum + Number(match[1]) * ({ ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 })[match[2]], 0)) : fallback;
}
