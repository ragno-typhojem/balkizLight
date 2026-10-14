import test from 'node:test';
import assert from 'node:assert/strict';
import { workingMemory, memoryContext, turnSettings } from '../lib/conversation-state.js';
import { requestsNewActivity } from '../lib/conversation.js';
import { validateInput, prepareRequest } from '../lib/policy.js';
const options = '### 1. Aljinat\n**Araştırma sorusu:** Jel nasıl değişir?\n**Malzemeler:** Etiketli jel seti\n\n### 2. İletkenlik\n**Araştırma sorusu:** İyon türü ölçümü değiştirir mi?\n**Malzemeler:** EC ölçer ve sitrat\n\n### 3. Optik\n**Araştırma sorusu:** Açı nasıl etkiler?\n**Malzemeler:** Polarizasyon filtreleri';
test('selected option survives subsequent short modifications', () => {
  const messages=[{role:'assistant',content:options},{role:'user',content:'İkincisini seçiyorum'},{role:'assistant',content:'Aynı sıcaklıkta üç tekrar kullanalım.'}];
  assert.match(workingMemory(messages).activity.title,/İletkenlik/);
  assert.match(workingMemory(messages).latestUpdate,/üç tekrar/);
  assert.match(memoryContext(messages,{},false,1000,'Bunu 30 dakikaya indir'),/EC ölçer/);
});
test('changing a material preserves the experiment rather than requesting a random new one', () => {
  for (const text of ['Bunu başka bir malzemeyle yap','Aynı deneyde farklı malzeme kullan','Bunu daha zorlaştır']) assert.equal(requestsNewActivity({messages:[{role:'user',content:text}]}),false);
  assert.equal(requestsNewActivity({messages:[{role:'user',content:'Başka bir deney öner'}]}),true);
});
test('procurement and scientific depth persist as actual settings', () => {
  const settings=turnSettings('Kimyasalları tedarik edebiliriz, daha zor olsun',{procurement:'owned',difficulty:'intro'});
  assert.equal(settings.procurement,'obtainable'); assert.equal(settings.difficulty,'advanced');
});
test('a guide request remains a guide even when it asks for a new experiment', () => {
  const prepared=prepareRequest(validateInput({messages:[{role:'user',content:'Başka bir kimya deneyinin kılavuzunu yaz'}]}));
  assert.equal(prepared.novel,true); assert.equal(prepared.experimentCard,false); assert.equal(prepared.intent,'guide');
});
test('multiple ideas use numbered text rather than forcing a single experiment card', () => {
  const prepared=prepareRequest(validateInput({messages:[{role:'user',content:'3 farklı kimya deneyi öner'}]}));
  assert.equal(prepared.experimentCard,false); assert.match(prepared.payload.messages[1].content,/numaralandır/);
});

test('choosing the second idea carries that option in compressed assistant history',()=>{
  const prepared=prepareRequest(validateInput({messages:[{role:'user',content:'Üç farklı bilim fikri öner'},{role:'assistant',content:options+'\n'+'Ek açıklama. '.repeat(80)},{role:'user',content:'İkinci fikri geliştir; yalnız kontrol değişkenini yaz.'}],settings:{domain:'chemistry',detail:'short'}}),true);
  const history=prepared.payload.messages.filter(m=>m.role==='assistant').map(m=>m.content).join('\n');
  assert.match(history,/2\. İletkenlik/); assert.ok(!history.includes('### 1. Aljinat'));
});
