import { buildLocalReply } from '../lib/local-engine.js';
import { laboratoryClarification, conversationConstraints } from '../lib/constraints.js';
import { validateAndRender, OutputError } from '../lib/output.js';
import { validateInput, prepareRequest, InputError } from '../lib/policy.js';
import { Governor, BusyError, quotaReset } from '../lib/governor.js';
import { readSSE, encodeEvent } from '../lib/sse.js';
import { DISCLAIMER, publicSource } from '../lib/knowledge.js';
import { providerSettings, providerPayload, providerQuotaHeaders } from '../lib/providers.js';

export const config = { runtime: 'edge' };
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
  const provider = providerSettings(env);
  const governor = new Governor({ env:provider.quotaEnv, fetchImpl, now });
  const cache = new Map(), inFlight = new Set();
  const cleanCache = () => {
    for (const [key, entry] of cache) if (entry.expires <= now()) cache.delete(key);
    while (cache.size > 48) cache.delete(cache.keys().next().value);
  };

  return async request => {
    if (request.method !== 'POST') return json({ error: 'Yalnızca POST destekleniyor.' }, 405, { Allow: 'POST' });
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return json({ error: 'Bu kaynaktan istek kabul edilmiyor.' }, 403);
    let lease, controller, cacheKey = '', lockHeld = false, upstreamStarted = false;
    try {
      const input = validateInput(await readBody(request));
      const local = buildLocalReply(input);
      if (local) {
        const stream = new ReadableStream({ start(out) { out.enqueue(encodeEvent({ meta: local.meta })); out.enqueue(encodeEvent({ delta: local.text })); out.enqueue(encodeEvent({ done: true, usage: local.meta.usage })); out.close(); } });
        return new Response(stream, { headers: { ...RESPONSE_HEADERS, 'Content-Type': 'text/event-stream; charset=utf-8' } });
      }
      if (input.settings.engine === 'local') return json({ error: 'Bu istek yerel havuzda karşılanamadı. Kütüphaneden bir taslak aç veya Otomatik/Yapay zekâ modunu seç. Bu istekte model kotası kullanılmadı.' }, 422);
      const clarification = laboratoryClarification(input);
      if (clarification) {
        const constraints = conversationConstraints(input.messages);
        const stream = new ReadableStream({ start(out) {
          out.enqueue(encodeEvent({ meta: { profile: 'clarification', local: true, sources: [], excluded: constraints.labels, disclaimer: DISCLAIMER } }));
          out.enqueue(encodeEvent({ delta: clarification })); out.enqueue(encodeEvent({ done: true, usage: { total: 0, cached: 0, charged: 0 } })); out.close();
        } });
        return new Response(stream, { headers: { ...RESPONSE_HEADERS, 'Content-Type': 'text/event-stream; charset=utf-8' } });
      }
      if (provider.error || !provider.key) return json({ error: provider.error || 'Yapay zekâ henüz yapılandırılmamış. Sunucudaki API anahtarı ayarlanmalı.' }, 503);
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
      let prepared = prepareRequest(input, false, provider.quotaEnv);
      if (governor.pressure(prepared.model) || prepared.estimated > governor.limits.tpm) prepared = prepareRequest(input, true, provider.quotaEnv);
      const available = governor.availableTokens(prepared.model);
      if (available >= 1000 && available < prepared.estimated) {
        try { prepared = prepareRequest(input, true, provider.quotaEnv, available); } catch (error) { if (!(error instanceof InputError)) throw error; }
      }
      try { lease = await governor.reserve(prepared.model, prepared.estimated, client); }
      catch (error) {
        if (error instanceof BusyError && error.status === 429 && (prepared.profile !== 'compact' || error.availableTokens >= 1000)) {
          try { prepared = prepareRequest(input, true, provider.quotaEnv, error.availableTokens ?? governor.availableTokens(prepared.model)); } catch (packingError) { if (packingError instanceof InputError) throw error; throw packingError; }
          lease = await governor.reserve(prepared.model, prepared.estimated, client);
        } else throw error;
      }
      // The shared reservation also sees simultaneous requests on other instances.
      if (lease.pressure && prepared.profile !== 'compact') prepared = prepareRequest(input, true, provider.quotaEnv);
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
      if (prepared.guarded) {
        const meta = {
          profile: prepared.profile, novel: prepared.novel, model: prepared.route === 'research' ? 'Bilimsel derinlik' : 'Ekonomik',
          trimmed: prepared.trimmed, partialFiles: prepared.partialFiles,
          sources: prepared.sources.map(publicSource), disclaimer: DISCLAIMER,
          capacity: governor.shared ? 'shared' : 'instance', cached: false, checked: false, excluded: prepared.constraints.labels,
        };
        const events = new ReadableStream({
          async start(out) {
            let charged;
            const send = event => out.enqueue(encodeEvent(event));
            try {
              send({ meta }); // First bytes arrive before model generation; no partial recipe is exposed.
              upstreamStarted = true;
              const response = await fetchImpl(provider.endpoint, {
                method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${provider.key}` },
                body: JSON.stringify(providerPayload(prepared,provider)), signal: controller.signal,
              });
              governor.observe(prepared.model, providerQuotaHeaders(response.headers,provider), response.status, prepared.estimated);
              if (!response.ok) {
                await response.body?.cancel(); charged = 0;
                if (response.status === 429) {
                  const wait = Math.max(1, Math.ceil(quotaReset(providerQuotaHeaders(response.headers,provider), prepared.estimated) / 1000));
                  send({ error: 'Ücretsiz yapay zekâ kotası dolu.', retryAfter: wait }); out.close(); return;
                }
                throw new OutputError(response.status === 401 || response.status === 403 ? 'Sunucunun model erişimi veya API anahtarı kontrol edilmeli.' : 'Yapay zekâ servisi yanıt biçimini kabul etmedi veya yanıt veremedi.');
              }
              const result = await response.json();
              const usage = result.usage || result.x_groq?.usage;
              const total = Number.isFinite(usage?.total_tokens) ? usage.total_tokens : undefined;
              const cached = provider.name === 'groq' && Number.isFinite(usage?.prompt_tokens_details?.cached_tokens) ? Math.min(total || 0, Math.max(0, usage.prompt_tokens_details.cached_tokens)) : 0;
              if (Number.isFinite(total)) charged = total - cached;
              const choice = result.choices?.[0];
              if (choice?.finish_reason === 'length') throw new OutputError('Yanıt uzunluk sınırında kesildi. Yarım deney adımları gösterilmedi; daha kısa bir fikir iste.');
              if (choice?.finish_reason !== 'stop') throw new OutputError('Yanıt tamamlanamadı; uygulama adımları gösterilmedi.');
              const text = validateAndRender(choice.message?.content || '', prepared);
              meta.checked = true;
              if (controller.signal.aborted) throw new Error('aborted');
              if (cacheKey) { cache.set(cacheKey, { text, meta, expires: now() + 300000 }); cleanCache(); }
              await finish(charged);
              send({ meta }); send({ delta: text }); send({ done: true, usage: Number.isFinite(total) ? { total, cached, charged } : null }); out.close();
            } catch (error) {
              controller.abort();
              try { send({ error: error instanceof OutputError ? error.message : 'Yanıt durduruldu veya bağlantı kesildi; yarım deney tarifi gösterilmedi.', errorCode: 'output_rejected' }); out.close(); } catch { /* client disconnected */ }
            } finally { await finish(charged); }
          },
          async cancel() { controller.abort(); await finish(); },
        });
        return new Response(events, { headers: { ...RESPONSE_HEADERS, 'Content-Type': 'text/event-stream; charset=utf-8', 'X-Accel-Buffering': 'no' } });
      }
      let upstream;
      try {
        upstreamStarted = true;
        upstream = await fetchImpl(provider.endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${provider.key}` },
          body: JSON.stringify(providerPayload(prepared,provider)), signal: controller.signal,
        });
      } catch {
        controller.abort(); await finish();
        return json({ error: request.signal.aborted ? 'İstek iptal edildi.' : 'Yanıt süresi aşıldı veya servise ulaşılamadı. Tekrar deneyebilirsin.' }, request.signal.aborted ? 499 : 504);
      }
      governor.observe(prepared.model, providerQuotaHeaders(upstream.headers,provider), upstream.status, prepared.estimated);
      if (!upstream.ok || !upstream.body) {
        await upstream.body?.cancel(); await finish(0);
        const wait = Math.max(1, Math.ceil(quotaReset(providerQuotaHeaders(upstream.headers,provider), prepared.estimated) / 1000));
        if (upstream.status === 429) return json({ error: 'Ücretsiz yapay zekâ kotası dolu. Bütçe yenilenince tekrar dene.', retryAfter: wait }, 429, { 'Retry-After': String(wait) });
        return json({ error: upstream.status === 401 || upstream.status === 403 ? 'Sunucunun yapay zekâ anahtarı veya model erişimi kontrol edilmeli.' : 'Yapay zekâ servisi yanıt veremedi. Tekrar deneyebilirsin.' }, 502);
      }
      const meta = {
        profile: prepared.profile, novel: prepared.novel, model: prepared.route === 'research' ? 'Bilimsel derinlik' : 'Ekonomik',
        trimmed: prepared.trimmed, partialFiles: prepared.partialFiles,
        sources: prepared.sources.map(publicSource), disclaimer: DISCLAIMER,
        capacity: governor.shared ? 'shared' : 'instance', cached: false, checked: prepared.guarded, excluded: prepared.constraints.labels,
      };
      const stream = new ReadableStream({
        async start(out) {
          let text = '', usage, cachedTokens = 0, done = false, finishReason = '';
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
              const reported = data.usage || data.x_groq?.usage;
              if (Number.isFinite(reported?.total_tokens)) {
                usage = reported.total_tokens;
                const cached = reported.prompt_tokens_details?.cached_tokens;
                cachedTokens = provider.name === 'groq' && Number.isFinite(cached) ? Math.min(usage, Math.max(0, cached)) : 0;
              }
              if (text.length > 48000) throw new Error('Yanıt boyutu sınırı aşıldı.');
            }
            if (!done && !finishReason) throw new Error('Bağlantı yanıt tamamlanmadan kesildi.');
            if (!text.trim()) throw new Error('Servis boş yanıt döndürdü. Daha kısa bir istekle tekrar dene.');
            const truncated = finishReason === 'length';
            if (cacheKey && !truncated && !controller.signal.aborted) { cache.set(cacheKey, { text, meta, expires: now() + 300000 }); cleanCache(); }
            send({ done: true, truncated, usage: Number.isFinite(usage) ? { total: usage, cached: cachedTokens, charged: usage - cachedTokens } : null }); out.close();
          } catch (error) {
            controller.abort();
            try { send({ error: request.signal.aborted ? 'Yanıt durduruldu.' : error.message || 'Yanıt akışı kesildi.' }); out.close(); } catch { /* client disconnected */ }
          } finally { await finish(Number.isFinite(usage) ? usage - cachedTokens : undefined); }
        },
        async cancel() { controller.abort(); await finish(); },
      });
      return new Response(stream, { headers: { ...RESPONSE_HEADERS, 'Content-Type': 'text/event-stream; charset=utf-8', 'X-Accel-Buffering': 'no' } });
    } catch (error) {
      controller?.abort(); await lease?.release(upstreamStarted ? undefined : 0); if (lockHeld) inFlight.delete(cacheKey);
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
