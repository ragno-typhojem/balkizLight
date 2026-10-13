import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLocalReply } from '../lib/local-engine.js';
import { validateInput } from '../lib/policy.js';
import { createHandler } from '../api/chat.js';
import { readSSE } from '../lib/sse.js';
import { MATERIALS, marketLink } from '../lib/materials.js';
import { EXPERIMENT_BANK } from '../lib/experiment-bank.js';
import { SOURCES } from '../lib/knowledge.js';
import { GUIDE_FORMATS } from '../lib/guide-format.js';

const input = (text, settings = {}, prior = []) => validateInput({ messages: [...prior, { role: 'user', content: text }], settings });
test('automatic new experiment requests can produce a local proposal without a key or provider call', async () => {
  let calls = 0;
  const handler = createHandler({ fetchImpl: async () => { calls++; throw new Error('must not call'); } });
  const response = await handler(new Request('https://balkiz.test/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input('Yeni kimya deneyi bul')) }));
  const events = []; for await (const raw of readSSE(response.body)) events.push(JSON.parse(raw));
  assert.equal(calls, 0); assert.equal(events.at(-1).usage.charged, 0); assert.ok(events.some(event => event.delta));
});
test('another local proposal avoids the previous base idea and preserves exclusions', () => {
  const first = buildLocalReply(input('Yeni kimya deneyi bul'));
  const second = buildLocalReply(input('Başka deney', {}, [{ role: 'user', content: 'Kimya' }, { role: 'assistant', content: first.text }, { role: 'user', content: 'Asit baz bulma; gıda boyası kullanma.' }]));
  assert.notEqual(first.meta.patterns[0], second.meta.patterns[0]);
  assert.ok(second.meta.excluded.length >= 2); assert.equal(second.meta.usage.charged, 0);
});
test('explicit AI requests and uncovered specialized topics are not disguised as local answers', () => {
  assert.equal(buildLocalReply(input('Yapay zekâyla bu etkinliği derinleştir')), null);
  assert.equal(buildLocalReply(input('Kuantum dolanıklık deneyi tasarla')), null);
});
test('all local material and scientific references resolve and store links do not claim stock', () => {
  for (const card of EXPERIMENT_BANK) {
    assert.ok(card.materials.every(id => MATERIALS.some(material => material.id === id)));
    assert.ok(SOURCES.some(source => source.id === card.sourceId));
  }
  const url = new URL(marketLink('sodyum aljinat', 'hepsiburada'));
  assert.equal(url.hostname, 'www.google.com'); assert.match(url.searchParams.get('q'), /site:hepsiburada.com/);
});
test('local material search does not consume AI quota', () => {
  const result = buildLocalReply(input('Gliserin nereden alırım?'));
  assert.equal(result.meta.usage.charged, 0); assert.match(result.text, /stok\/fiyat okunmadı/);
});
test('guide creation preserves a selected named card and both complete formats', () => {
  const previous = buildLocalReply(input('Yeni kimya deneyi bul'));
  const target = EXPERIMENT_BANK.find(card => card.id === 'visc');
  for (const format of ['ilkyar', 'research']) {
    const reply = buildLocalReply(input(`${target.title} için kılavuz yaz`, { format }, [{ role: 'assistant', content: previous.text }]));
    assert.deepEqual(reply.meta.patterns, [target.id]);
    for (const heading of GUIDE_FORMATS[format]) assert.ok(reply.text.includes(`### ${heading}`));
  }
});
test('a custom previous answer and an uncatalogued chemical are not replaced by unrelated local ideas', () => {
  assert.equal(buildLocalReply(input('Bu konuşmadaki etkinliğin kılavuzunu yaz', {}, [{ role: 'assistant', content: 'Özel elektromanyetik ölçüm düzeneği' }])), null);
  assert.equal(buildLocalReply(input('Bakır sülfat nereden alırım?')), null);
});
