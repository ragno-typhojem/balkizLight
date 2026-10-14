export class BusyError extends Error {
  constructor(message, retryAfter = 5, status = 429, fallbackEligible = false) {
    super(message); this.retryAfter = retryAfter; this.status = status; this.fallbackEligible = fallbackEligible;
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
if tonumber(redis.call('GET', KEYS[5]) or '0') + 1 > caps[5] then
  return {0, math.max(1, redis.call('TTL', KEYS[5])), 5}
end
for i = 1, 5 do
  if tonumber(redis.call('GET', KEYS[i]) or '0') + costs[i] > caps[i] then
    return {0, math.max(1, redis.call('TTL', KEYS[i])), i, math.max(0, math.min(caps[3] - tonumber(redis.call('GET', KEYS[3]) or '0'), caps[4] - tonumber(redis.call('GET', KEYS[4]) or '0')))}
  end
end
for i = 1, 5 do
  local value = redis.call('INCRBY', KEYS[i], costs[i])
  if value == costs[i] then
    redis.call('EXPIRE', KEYS[i], durations[i])
    if i == 3 or i == 4 then redis.call('SET', KEYS[i + 4], ARGV[9], 'EX', durations[i]) end
  end
end
redis.call('ZADD', KEYS[6], now + 65000, ARGV[9])
redis.call('EXPIRE', KEYS[6], 70)
return {1, 0, redis.call('ZCARD', KEYS[6]), redis.call('GET', KEYS[7]) or '', redis.call('GET', KEYS[8]) or ''}
`;

// Reconcile only the same token windows; old completions must not refund new windows.
export const RELEASE_SCRIPT = `
redis.call('ZREM', KEYS[1], ARGV[1])
for i = 2, 3 do
  if ARGV[i + 1] ~= '' and redis.call('GET', KEYS[i + 2]) == ARGV[i + 1] and redis.call('EXISTS', KEYS[i]) == 1 then
    local delta = tonumber(ARGV[2])
    local value = tonumber(redis.call('GET', KEYS[i]) or '0')
    redis.call('INCRBY', KEYS[i], math.max(-value, delta))
  end
end
return 1
`;

export class Governor {
  constructor({ env = {}, fetchImpl = fetch, now = () => Date.now(), userBuckets = new Map(), active = new Map() } = {}) {
    this.env = env; this.fetch = fetchImpl; this.now = now;
    this.limits = limitsFrom(env); this.buckets = new Map(); this.userBuckets = userBuckets; this.active = active; this.observed = new Map();
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
    for (const [key, value] of this.userBuckets) if (value.reset <= now) this.userBuckets.delete(key);
    for (const [key, expiry] of this.active) if (expiry <= now) this.active.delete(key);
    if (this.buckets.size + this.userBuckets.size > 4000) throw new BusyError('Servis yoğun. Biraz sonra tekrar dene.', 60);
  }

  pressure(model) {
    this.cleanup();
    const observed = this.observed.get(model), now = this.now(), budget = this.buckets.get(`${model}:tm`);
    return this.active.size >= 2 || (budget?.reset > now && budget.value > this.limits.tpm * 0.45) ||
      (observed && observed.tokensUntil > now && observed.tokens < this.limits.tpm * 0.45) ||
      (observed && observed.requestsUntil > now && observed.requests < this.limits.rpd * 0.1);
  }

  availableTokens(model) {
    this.cleanup();
    const now = this.now(), observed = this.observed.get(model);
    let available = Math.min(this.limits.tpm - (this.buckets.get(`${model}:tm`)?.value || 0), this.limits.tpd - (this.buckets.get(`${model}:td`)?.value || 0));
    if (observed?.tokensUntil > now) available = Math.min(available, observed.tokens);
    return Math.max(0, Math.floor(available));
  }

  async reserve(model, tokens, client) {
    const { rpm, rpd, tpm, tpd, userRpm, concurrent } = this.limits;
    if (tokens > tpm) throw new BusyError('Bu istek ücretsiz dakika bütçesine sığmıyor. Mesajı kısalt veya dosyaları azalt.', 0, 413, true);
    const now = this.now(), observation = this.observed.get(model);
    if (observation?.blockedUntil > now) throw new BusyError('Yapay zekâ kotası şu an dolu.', Math.ceil((observation.blockedUntil - now) / 1000),429,true);
    if (observation?.requestsUntil > now && observation.requests < 1) throw new BusyError('Günlük yapay zekâ kotası dolu.', Math.ceil((observation.requestsUntil - now) / 1000),429,true);
    if (observation?.tokensUntil > now && observation.tokens < tokens) throw new BusyError('Dakika bütçesi yenileniyor.', Math.ceil((observation.tokensUntil - now) / 1000),429,true);
    const id = crypto.randomUUID(), prefix = this.env.QUOTA_NAMESPACE || 'balkiz:v2';
    const keys = [`${prefix}:${model}:rm`, `${prefix}:${model}:rd`, `${prefix}:${model}:tm`, `${prefix}:${model}:td`, `${this.env.QUOTA_USER_NAMESPACE || prefix}:u:${client}`, `${this.env.QUOTA_CONCURRENT_NAMESPACE || prefix}:active`, `${prefix}:${model}:tm:window`, `${prefix}:${model}:td:window`];
    if (this.shared) {
      const result = await this.redis(RESERVE_SCRIPT, keys, [now, tokens, rpm, rpd, tpm, tpd, userRpm, concurrent, id]);
      if (result[0] !== 1) {
        const error = new BusyError(result[2] === 5 ? 'Çok hızlı istek gönderiyorsun. Kısa bir ara ver.' : 'Ücretsiz kapasite şu an dolu; bütçe yenilendiğinde tekrar deneyebilirsin.', Number(result[1]));
        error.fallbackEligible = [1,2,3,4].includes(result[2]);
        if ([3, 4].includes(result[2]) && Number.isFinite(result[3])) error.availableTokens = result[3];
        throw error;
      }
      this.active.set(id, now + 65000);
      let released = false;
      return {
        pressure: result[2] >= 2, release: async actualTokens => {
          if (released) return; released = true; this.active.delete(id);
          // Unknown/cancelled usage remains reserved; confirmed usage releases the excess.
          const delta = Number.isFinite(actualTokens) && actualTokens >= 0 ? Math.ceil(actualTokens) - tokens : 0;
          try { await this.redis(RELEASE_SCRIPT, [keys[5], keys[2], keys[3], keys[6], keys[7]], [id, delta, result[3] || '', result[4] || '']); } catch { /* conservative reservation and bounded lease remain */ }
        },
      };
    }
    if (this.env.REQUIRE_SHARED_LIMITS === '1') throw new BusyError('Paylaşımlı kapasite kontrolü yapılandırılmalı.', 10, 503);
    this.cleanup();
    if (this.active.size >= concurrent) throw new BusyError('Tüm yanıt sıraları dolu. Birkaç saniye sonra tekrar dene.', 2);
    const specs = [[`u:${client}`, 1, userRpm, 60000], [`${model}:rm`, 1, rpm, 60000], [`${model}:rd`, 1, rpd, 86400000], [`${model}:tm`, tokens, tpm, 60000], [`${model}:td`, tokens, tpd, 86400000]];
    for (const [key, cost, cap] of specs) {
      const bucket = (key.startsWith('u:') ? this.userBuckets : this.buckets).get(key);
      if ((bucket?.value || 0) + cost > cap) throw new BusyError(key.startsWith('u:') ? 'Çok hızlı istek gönderiyorsun. Kısa bir ara ver.' : 'Ücretsiz kapasite dolu; bütçe yenileniyor.', Math.ceil(((bucket?.reset || now + 60000) - now) / 1000),429,!key.startsWith('u:'));
    }
    const reservations = specs.map(([key, cost, , duration]) => {
      const pool = key.startsWith('u:') ? this.userBuckets : this.buckets;
      const bucket = pool.get(key) || { value: 0, reset: now + duration };
      bucket.value += cost; pool.set(key, bucket); return { key, bucket };
    });
    this.active.set(id, now + 65000);
    let released = false;
    return {
      pressure: this.active.size >= 2,
      release: async actualTokens => {
        if (released) return; released = true; this.active.delete(id);
        if (Number.isFinite(actualTokens) && actualTokens >= 0) {
          const delta = Math.ceil(actualTokens) - tokens;
          for (const { key, bucket } of reservations.filter(item => /:t[md]$/.test(item.key))) {
            if (this.buckets.get(key) === bucket) bucket.value = Math.max(0, bucket.value + delta);
          }
        }
      },
    };
  }

  observe(model, headers, status = 200, requestedTokens = Infinity) {
    const now = this.now(), result = { ...(this.observed.get(model) || {}) };
    const number = name => {
      const raw = headers.get(name); return raw !== null && Number.isFinite(Number(raw)) ? Number(raw) : null;
    };
    const tokens = number('x-ratelimit-remaining-tokens'), requests = number('x-ratelimit-remaining-requests');
    if (tokens !== null) Object.assign(result, { tokens, tokensUntil: now + parseReset(headers.get('x-ratelimit-reset-tokens'), 60000) });
    if (requests !== null) Object.assign(result, { requests, requestsUntil: now + parseReset(headers.get('x-ratelimit-reset-requests'), 86400000) });
    if (status === 429) result.blockedUntil = now + Math.max(1000, quotaReset(headers, requestedTokens));
    this.observed.set(model, result);
  }
}

export function parseReset(value, fallback) {
  if (!value) return fallback;
  if (/^\d+(\.\d+)?$/.test(value)) return Math.ceil(Number(value) * 1000);
  const matches = [...value.matchAll(/(\d+(?:\.\d+)?)(ms|s|m|h|d)/g)];
  return matches.length ? Math.ceil(matches.reduce((sum, match) => sum + Number(match[1]) * ({ ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 })[match[2]], 0)) : fallback;
}

// Provider reset headers are more precise than a blanket one-minute fallback.
export function quotaReset(headers, requestedTokens = Infinity) {
  if (headers.has('retry-after')) return parseReset(headers.get('retry-after'), 60000);
  if (headers.get('x-ratelimit-remaining-requests') === '0') return parseReset(headers.get('x-ratelimit-reset-requests'), 86400000);
  const remaining = headers.get('x-ratelimit-remaining-tokens');
  if (headers.has('x-ratelimit-reset-tokens') && (remaining === null || Number(remaining) < requestedTokens)) return parseReset(headers.get('x-ratelimit-reset-tokens'), 60000);
  return 60000;
}
