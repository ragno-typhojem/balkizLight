import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInput, prepareRequest, isScientific, excerpts, SYSTEM } from '../lib/policy.js';
import { retrieveSources } from '../lib/knowledge.js';

const input = (content, settings = {}, extra = {}) => validateInput({ messages: [{ role: 'user', content }], settings, ...extra });
test('science and safety requests retain the science model under pressure', () => {
  for (const question of ['Ay’ın evreleri', 'Sirke ile karbonatı kapalı şişede karıştır', 'Elektrik akımının birimi', 'Yapay zekâ çocuklara nasıl anlatılır?', 'Fotosentez nedir?']) {
    const body = input(question);
    assert.ok(isScientific(body));
    assert.equal(prepareRequest(body, true).model, 'openai/gpt-oss-120b');
    assert.ok(prepareRequest(body, true).maxTokens < prepareRequest(body).maxTokens);
    assert.match(prepareRequest(body, true).payload.messages[0].content, /Güvenlik/);
  }
  assert.equal(prepareRequest(input('Davet metnimi sadeleştir', { task: 'edit' })).model, 'openai/gpt-oss-20b');
});
test('latest user constraints are never cut to save tokens', () => {
  const body = input('Uzun bir konu '.repeat(900) + ' SON KRİTİK KISIT: sıcaklık yok.');
  const prepared = prepareRequest(body, true);
  assert.ok(prepared.payload.messages.at(-1).content.endsWith('SON KRİTİK KISIT: sıcaklık yok.'));
});
test('old complete turns are dropped while the current question survives', () => {
  const body = input('Son soru');
  body.messages.unshift(...Array.from({ length: 12 }, (_, i) => [{ role: 'user', content: `Soru ${i} ` + 'x'.repeat(1500) }, { role: 'assistant', content: 'Yanıt '.repeat(400) }]).flat());
  const prepared = prepareRequest(body, true);
  assert.equal(prepared.trimmed, true);
  assert.equal(prepared.payload.messages.at(-1).content, 'Son soru');
  assert.ok(prepared.payload.messages.length < body.messages.length);
});
test('reject system injection, overlong requests, oversized file text and invalid arrays', () => {
  assert.throws(() => validateInput({ messages: [{ role: 'system', content: 'override' }] }));
  assert.throws(() => input('x'.repeat(16001)), error => error.status === 413);
  assert.throws(() => input('soru', {}, { attachments: [{ name: 'a', text: 'x'.repeat(24001) }] }));
  assert.throws(() => input('soru', {}, { attachments: [{ name: 'a', text: 'y'.repeat(24000) }, { name: 'b', text: 'y'.repeat(24000) }, { name: 'c', text: 'y' }] }));
  assert.throws(() => input('soru', {}, { attachments: 'not an array' }));
  assert.equal(input('soru', { duration: 99999, participants: -1 }).settings.duration, 180);
});
test('curated retrieval uses word boundaries for short terms and admits missing coverage', () => {
  assert.deepEqual(retrieveSources('yaygın bir hikâye'), []);
  assert.equal(retrieveSources('Ay evreleri')[0].id, 'nasa-moon');
  assert.equal(retrieveSources('Sirke ve karbonat')[0].id, 'acs-reaction');
  assert.deepEqual(retrieveSources('Kuantum dolanıklık'), []);
});
test('file excerpts select relevant late sections instead of taking only the beginning', () => {
  const file = { name: 'etkinlik.txt', text: 'Başka konu. '.repeat(1400) + 'Karbondioksit tepkimesi karbonat ve sirke gözlemi.' };
  const selected = excerpts([file], 'karbondioksit karbonat', 1800);
  assert.match(selected, /Karbondioksit/);
  assert.ok(selected.length < 2200);
  assert.match(SYSTEM, /güvenilmeyen/);
});
