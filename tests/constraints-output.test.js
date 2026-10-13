import test from 'node:test';
import assert from 'node:assert/strict';
import { conversationConstraints, laboratoryClarification } from '../lib/constraints.js';
import { prepareRequest, validateInput } from '../lib/policy.js';
import { validateAndRender } from '../lib/output.js';
import { createHandler } from '../api/chat.js';
import { readSSE } from '../lib/sse.js';

const messages = [
  { role: 'user', content: 'yeni deney bul' },
  { role: 'assistant', content: 'Renk Değiştiren Limonata Çözeltileri' },
  { role: 'user', content: 'bambaşka deney yaz' },
  { role: 'assistant', content: 'Renkli Kristal Çiçekleri' },
  { role: 'user', content: 'bambaşka ve daha kimyasallarla' },
  { role: 'assistant', content: 'HCl 50 ml ve NaOH 50 ml ekle.' },
  { role: 'user', content: 'gıda boyasız bulsana' },
  { role: 'assistant', content: 'Asit baz indikatörleri' },
  { role: 'user', content: 'asit baz bulma bana' },
];
const prepared = () => prepareRequest(validateInput({ messages }));
const card = () => ({ title: 'Akış süresini karşılaştır', question: 'Sıvılar aynı kaptan aynı sürede mi akar?', materials: ['Su', 'Bilinen eğitim sıvısı', 'Plastik kap', 'Kronometre'], steps: ['Aynı hacimleri ölç.', 'Aynı açıklıktan akışı zamanla.', 'Sıcaklığı sabit tutarak tekrar et.'], explanation: 'Viskozite akışa dirençle ilgilidir.', expected: 'Akış süreleri farklı olabilir; sonuç ölçülmelidir.', safety: ['Sıçramayı önle; tüketme.', 'Öğretmen uygun malzemeyi ve yöntemi önceden kontrol etsin.'], limits: 'Bu öneri uygulanmadı; kap geometrisi sonucu etkiler.' });
test('the supplied sequence retains both exclusions and chemistry preference', () => {
  const constraints = conversationConstraints(messages);
  assert.deepEqual(constraints.excluded, ['food-dye', 'acid-base']); assert.equal(constraints.chemistry, true);
  const result = prepared(); assert.equal(result.novel, true); assert.equal(result.experimentCard, true);
  assert.equal(result.payload.stream, false); assert.equal(result.payload.response_format.json_schema.strict, true);
  assert.ok(!result.sources.some(source => source.kind === 'guide'));
  assert.ok(!result.payload.messages.some(message => /HCl 50 ml/.test(message.content)));
});
test('new material/topic constraints persist beyond a short history window', () => {
  const later = [...messages, ...Array.from({ length: 10 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: 'Daha farklı bir yöntem.' })), { role: 'user', content: 'Başka deney' }];
  assert.ok(conversationConstraints(later).excluded.includes('acid-base'));
  assert.ok(conversationConstraints(later).excluded.includes('food-dye'));
});
test('excluded recipes are rejected before rendering instead of relying on prompt obedience', () => {
  const acid = card(); acid.title = 'Asit-baz indikatörleri';
  assert.throws(() => validateAndRender(JSON.stringify(acid), prepared()), /istemediğin/);
  const dye = card(); dye.materials.push('Gıda boyası');
  assert.throws(() => validateAndRender(JSON.stringify(dye), prepared()), /istemediğin/);
  assert.match(validateAndRender(JSON.stringify(card()), prepared()), /Güvenlik ve kontrol/);
});
test('unsafe chemistry and eye-closing advice cannot be exposed as a recipe', () => {
  const clean = { ...prepared(), constraints: { excluded: [], labels: [] } };
  const acid = card(); acid.materials.push('0,1 M HCl'); acid.steps.push('5 ml ekle.');
  assert.throws(() => validateAndRender(JSON.stringify(acid), clean), /riskli/);
  const eyes = card(); eyes.safety = ['Gözleri kapalı tutun.'];
  assert.throws(() => validateAndRender(JSON.stringify(eyes), clean), /riskli/);
});
test('unknown lab materials ask a relevant free clarification rather than inventing concentrations', () => {
  const input = validateInput({ messages: messages.slice(0, 5) });
  assert.match(laboratoryClarification(input), /kimyasalların adları/);
});
test('a length-limited scientific answer exposes no partial recipe and triggers no auto retry', async () => {
  let calls = 0;
  const handler = createHandler({ env: { GROQ_API_KEY: 'not-real' }, fetchImpl: async () => { calls++; return Response.json({ choices: [{ message: { content: '{"title":"Eksik' }, finish_reason: 'length' }], usage: { total_tokens: 900 } }); } });
  const request = new Request('https://balkiz.test/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }) });
  const response = await handler(request); const events = [];
  for await (const raw of readSSE(response.body)) events.push(JSON.parse(raw));
  assert.equal(calls, 1); assert.ok(!events.some(event => event.delta)); assert.match(events.at(-1).error, /Yarım deney/);
});

test('scientific responses are validated before any delta reaches the client', async () => {
  const bad = card(); bad.materials.push('Gıda boyası');
  let calls = 0;
  const handler = createHandler({ env: { GROQ_API_KEY: 'mock' }, fetchImpl: async (_, init) => {
    calls++; const payload = JSON.parse(init.body); assert.equal(payload.stream, false);
    assert.equal(payload.response_format.json_schema.strict, true);
    return Response.json({ choices: [{ message: { content: JSON.stringify(bad) }, finish_reason: 'stop' }], usage: { total_tokens: 600 } });
  } });
  const response = await handler(new Request('https://balkiz.test/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }) }));
  const events = []; for await (const raw of readSSE(response.body)) events.push(JSON.parse(raw));
  assert.equal(calls, 1); assert.ok(!events.some(event => event.delta)); assert.match(events.at(-1).error, /istemediğin/);
});
test('the lab clarification does not require a key or spend provider quota', async () => {
  let calls = 0; const handler = createHandler({ fetchImpl: async () => { calls++; throw new Error('must not call'); } });
  const response = await handler(new Request('https://balkiz.test/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: messages.slice(0, 5) }) }));
  const events = []; for await (const raw of readSSE(response.body)) events.push(JSON.parse(raw));
  assert.equal(calls, 0); assert.equal(events.at(-1).usage.charged, 0); assert.match(events.find(event => event.delta).delta, /etiketli derişimleri/);
});
