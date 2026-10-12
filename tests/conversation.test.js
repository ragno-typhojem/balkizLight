import test from 'node:test';
import assert from 'node:assert/strict';
import { conversationHistory, requestIntent } from '../lib/conversation.js';
import { validateInput, prepareRequest } from '../lib/policy.js';

const input = (messages, settings = {}) => validateInput({ messages, settings });
test('an assistant-only local template survives its first follow-up', () => {
  const prepared = prepareRequest(input([
    { role: 'assistant', content: '# Sarkaç araştırması\nMalzemeler: ip ve kâğıt.\n' + 'Adım açıklaması. '.repeat(600) },
    { role: 'user', content: 'Bunu 15 dakikaya indir.' },
  ]));
  assert.ok(prepared.payload.messages.some(message => message.role === 'assistant' && message.content.includes('Sarkaç')));
  assert.equal(prepared.intent, 'chat');
  assert.equal(prepared.scientific, true);
  assert.equal(prepared.payload.messages.at(-1).content, 'Bunu 15 dakikaya indir.');
});
test('failed answers and consecutive questions cannot terminate history selection', () => {
  const prepared = prepareRequest(input([
    { role: 'user', content: 'Karbonat deneyinde kap açık olsun.' },
    { role: 'assistant', content: 'Açık kap ve gözlem tablosu kullanalım.' },
    { role: 'user', content: 'Malzemeyi azalt.' },
    { role: 'user', content: 'Sadece aynı deney için.' },
  ]), true);
  assert.ok(prepared.payload.messages.some(message => message.content.includes('kap açık')));
  assert.ok(prepared.payload.messages.some(message => message.role === 'assistant'));
});
test('a long conversation retains the original constraints and the latest answer', () => {
  const messages = [{ role: 'user', content: 'İlk kısıt: görme engelli katılımcılar için sesli görev.' }, ...Array.from({ length: 20 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: `Son tur ${i}. ` + 'Ayrıntı '.repeat(300) }))];
  const history = conversationHistory(messages, 2600, 'Son değişikliği koru');
  assert.ok(history.messages.some(message => message.content.includes('görme engelli')));
  assert.ok(history.messages.at(-1).content.includes('Son tur 19'));
  assert.ok(history.messages.reduce((n, message) => n + message.content.length, 0) <= 2700);
  assert.equal(history.trimmed, true);
});
test('a follow-up does not inherit the old plan mode; explicit guides preserve format', () => {
  const messages = [{ role: 'assistant', content: 'Kâğıt köprü deneyi.' }, { role: 'user', content: 'Bunu daha zor yap.' }];
  assert.equal(requestIntent(input(messages, { task: 'plan' })), 'chat');
  const prepared = prepareRequest(input([{ role: 'user', content: 'Kâğıt köprü kılavuzu yaz.' }], { format: 'ilkyar' }));
  assert.equal(prepared.intent, 'guide');
  assert.match(prepared.payload.messages[1].content, /Branş.*Öğrenci Seviyesi.*Etkinliğin Çocuklara Anlatımı/s);
});
