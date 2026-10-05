import { validateInput, prepareRequest, InputError } from '../lib/policy.js';
import { Governor, BusyError, parseReset } from '../lib/governor.js';
import { readSSE, encodeEvent } from '../lib/sse.js';
import { DISCLAIMER, publicSource } from '../lib/knowledge.js';

export const config = { runtime: 'edge' };
const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const RESPONSE_HEADERS = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...RESPONSE_HEADERS, 'Content-Type': 'application/json; charset=utf-8', ...extra } });
}

async function digest(text) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function readBody(request) {
  const cap = 450000;
  if (Number(request.headers.get('content-length')) > cap) throw new InputError('İstek boyutu çok büyük.', 413);
  if (!request.headers.get('content-type')?.includes('application/json')) throw new InputError('JSON içerik gerekli.', 415);
  if (!request.body) throw new InputError('İstek gövdesi eksik.');
  const reader = request.body.getReader(), chunks = []; let total = 0;
  try {
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      total += value.length;
      if (total > cap) { await reader.cancel(); throw new InputError('İstek boyutu çok büyük.', 413); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const all = new Uint8Array(total); let offset = 0;
  for (const chunk of chunks) { all.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder().decode(all)); } catch { throw new InputError('Geçersiz JSON.'); }
}

export function createHandler({ env = {}, fetchImpl = fetch, now = () => Date.now() } = {}) {
  const governor = new Governor({ env, fetchImpl, now });
  const cache = new Map(), inFlight = new Set();
  const cleanCache = () => {
    for (const [key, entry] of cache) if (entry.expires <= now()) cache.delete(key);
    while (cache.size > 48) cache.delete(cache.keys().next().value);
  };

  return async request => {
    if (request.method !== 'POST') return json({ error: 'Yalnızca POST destekleniyor.' }, 405, { Allow: 'POST' });
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return json({ error: 'Bu kaynaktan istek kabul edilmiyor.' }, 403);
    if (!env.GROQ_API_KEY) return json({ error: 'Yapay zekâ henüz yapılandırılmamış. Sunucuda GROQ_API_KEY tanımlanmalı.' }, 503);
    let lease, controller, cacheKey = '', lockHeld = false;
    try {
      const input = validateInput(await readBody(request));
      const client = await digest(request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown');
      cleanCache();
      cacheKey = input.sessionId ? await digest(`${client}:${JSON.stringify(input)}`) : '';
      const cached = cacheKey && cache.get(cacheKey);
      if (cached) {
        const stream = new ReadableStream({ start(out) { out.enqueue(encodeEvent({ meta: { ...cached.meta, cached: true } })); out.enqueue(encodeEvent({ delta: cached.text })); out.enqueue(encodeEvent({ done: true })); out.close(); } });
        return new Response(stream, { headers: { ...RESPONSE_HEADERS, 'Content-Type': 'text/event-stream; charset=utf-8' } });
      }
      if (cacheKey && inFlight.has(cacheKey)) throw new BusyError('Bu yanıt zaten hazırlanıyor. Birkaç saniye sonra tekrar deneyebilirsin.', 2, 409);
      if (request.signal.aborted) throw new BusyError('İstek iptal edildi.', 0, 499);
      if (cacheKey) { inFlight.add(cacheKey); lockHeld = true; }
      let prepared = prepareRequest(input, false, env);
      if (governor.pressure(prepared.model) || prepared.estimated > governor.limits.tpm) prepared = prepareRequest(input, true, env);
      try { lease = await governor.reserve(prepared.model, prepared.estimated, client); }
      catch (error) {
        if (error instanceof BusyError && error.status === 429 && prepared.profile !== 'compact') {
          prepared = prepareRequest(input, true, env);
          lease = await governor.reserve(prepared.model, prepared.estimated, client);
        } else throw error;
      }
      // The shared reservation also sees simultaneous requests on other instances.
      if (lease.pressure && prepared.profile !== 'compact') prepared = prepareRequest(input, true, env);
      controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 55000);
      const onAbort = () => controller.abort();
      request.signal.addEventListener('abort', onAbort, { once: true });
      if (request.signal.aborted) controller.abort();
      let released = false;
      const finish = async usage => {
        if (released) return; released = true; clearTimeout(timeout);
        request.signal.removeEventListener('abort', onAbort);
        if (lockHeld) { inFlight.delete(cacheKey); lockHeld = false; }
        await lease.release(usage);
      };
      let upstream;
      try {
        upstream = await fetchImpl(ENDPOINT, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.GROQ_API_KEY}` },
          body: JSON.stringify(prepared.payload), signal: controller.signal,
        });
      } catch {
        controller.abort(); await finish();
        return json({ error: request.signal.aborted ? 'İstek iptal edildi.' : 'Yanıt süresi aşıldı veya servise ulaşılamadı. Tekrar deneyebilirsin.' }, request.signal.aborted ? 499 : 504);
      }
      governor.observe(prepared.model, upstream.headers, upstream.status);
      if (!upstream.ok || !upstream.body) {
        await upstream.body?.cancel(); await finish();
        const wait = Math.max(1, Math.ceil(parseReset(upstream.headers.get('retry-after'), 60000) / 1000));
        if (upstream.status === 429) return json({ error: 'Ücretsiz yapay zekâ kotası dolu. Bütçe yenilenince tekrar dene.', retryAfter: wait }, 429, { 'Retry-After': String(wait) });
        return json({ error: upstream.status === 401 || upstream.status === 403 ? 'Sunucunun yapay zekâ anahtarı veya model erişimi kontrol edilmeli.' : 'Yapay zekâ servisi yanıt veremedi. Tekrar deneyebilirsin.' }, 502);
      }
      const meta = {
        profile: prepared.profile, model: prepared.scientific ? 'Bilim odaklı' : 'Hızlı',
        trimmed: prepared.trimmed, partialFiles: prepared.partialFiles,
        sources: prepared.sources.map(publicSource), disclaimer: DISCLAIMER,
        capacity: governor.shared ? 'shared' : 'instance', cached: false,
      };
      const stream = new ReadableStream({
        async start(out) {
          let text = '', usage, done = false, finishReason = '';
          const send = event => out.enqueue(encodeEvent(event));
          try {
            send({ meta });
            for await (const raw of readSSE(upstream.body)) {
              if (raw === '[DONE]') { done = true; break; }
              let data; try { data = JSON.parse(raw); } catch { throw new Error('Yanıt akışı bozuk.'); }
              if (data.error) throw new Error('Servis yanıtı yarıda kesildi.');
              const delta = data.choices?.[0]?.delta?.content;
              if (typeof delta === 'string') { text += delta; send({ delta }); }
              if (data.choices?.[0]?.finish_reason) finishReason = data.choices[0].finish_reason;
              if (data.usage?.total_tokens) usage = data.usage.total_tokens;
              else if (data.x_groq?.usage?.total_tokens) usage = data.x_groq.usage.total_tokens;
              if (text.length > 48000) throw new Error('Yanıt boyutu sınırı aşıldı.');
            }
            if (!done && !finishReason) throw new Error('Bağlantı yanıt tamamlanmadan kesildi.');
            if (!text.trim()) throw new Error('Servis boş yanıt döndürdü. Daha kısa bir istekle tekrar dene.');
            const truncated = finishReason === 'length';
            if (cacheKey && !truncated && !controller.signal.aborted) { cache.set(cacheKey, { text, meta, expires: now() + 300000 }); cleanCache(); }
            send({ done: true, truncated }); out.close();
          } catch (error) {
            controller.abort();
            try { send({ error: request.signal.aborted ? 'Yanıt durduruldu.' : error.message || 'Yanıt akışı kesildi.' }); out.close(); } catch { /* client disconnected */ }
          } finally { await finish(usage); }
        },
        async cancel() { controller.abort(); await finish(); },
      });
      return new Response(stream, { headers: { ...RESPONSE_HEADERS, 'Content-Type': 'text/event-stream; charset=utf-8', 'X-Accel-Buffering': 'no' } });
    } catch (error) {
      controller?.abort(); await lease?.release(); if (lockHeld) inFlight.delete(cacheKey);
      const status = error instanceof InputError || error instanceof BusyError ? error.status : 500;
      const wait = error.retryAfter || 0;
      return json({ error: status === 500 ? 'İstek işlenemedi. Tekrar deneyebilirsin.' : error.message, ...(wait ? { retryAfter: wait } : {}) }, status, wait ? { 'Retry-After': String(wait) } : {});
    }
  };
}

let liveHandler;
export default function handler(request) {
  liveHandler ??= createHandler({ env: process.env });
  return liveHandler(request);
}
