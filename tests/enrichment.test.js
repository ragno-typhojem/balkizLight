import test from 'node:test';
import assert from 'node:assert/strict';
import { ENRICHED_EXPERIMENTS } from '../lib/enriched-experiments.js';
import { SOURCES, GUIDES, retrieveKnowledge } from '../lib/knowledge.js';
import { MATERIALS } from '../lib/materials.js';
import { GUIDE_INSIGHTS } from '../lib/guide-insights.js';
import { LISTINGS, procurementContext } from '../lib/procurement.js';
import { proposalContext } from '../lib/proposal-context.js';
import { conversationConstraints } from '../lib/constraints.js';
import { prepareRequest, validateInput } from '../lib/policy.js';
import { turnSettings } from '../lib/conversation-state.js';
import { readFile, readdir } from 'node:fs/promises';

test('new research proposals have actionable controls, measurement and timing with resolving references',()=>{
  assert.ok(ENRICHED_EXPERIMENTS.length >= 25);
  assert.ok(ENRICHED_EXPERIMENTS.filter(c=>c.domain==='chemistry').length >= 12);
  for(const card of ENRICHED_EXPERIMENTS){
    assert.ok(card.controls && card.measure && card.timing && card.variation,card.id);
    assert.ok(card.steps.length>=3,card.id);
    assert.ok(card.materials.every(id=>MATERIALS.some(m=>m.id===id)),card.id);
    assert.ok(SOURCES.some(s=>s.id===card.sourceId),card.id);
    const source=SOURCES.find(s=>s.id===card.sourceId); if(new URL(source.url).hostname==='www.acs.org') assert.match(source.publisher,/American Chemical Society/);
  }
});
test('read-manual notes refer to real catalog IDs and do not redistribute contacts',()=>{
  assert.equal(Object.keys(GUIDE_INSIGHTS).length,12);
  for(const [id,note] of Object.entries(GUIDE_INSIGHTS)){
    assert.ok(GUIDES.some(g=>g.id===id));
    assert.ok(note.flow && note.develop && note.caution);
    assert.ok(!/@|\+90/.test(JSON.stringify(note)));
  }
});
test('procurement records preserve identity traps and never carry a stock or price promise',()=>{
  assert.ok(LISTINGS.length>=12);
  assert.ok(LISTINGS.every(item=>new URL(item.url).protocol==='https:' && MATERIALS.some(m=>m.id===item.materialId)));
  assert.ok(LISTINGS.find(item=>item.id==='ty-copper-caution').notEquivalent);
  assert.ok(LISTINGS.every(item=>!Object.hasOwn(item,'price')&&!Object.hasOwn(item,'stock')));
  const context=procurementContext('Bakır elektrot nereden alırım?',800);
  assert.ok(context.length<=801); assert.ok(context.includes('dated-listing-not-live-stock'));
});
test('bounded retrieval carries a read manual as planning evidence rather than scientific proof',()=>{
  const note=retrieveKnowledge('13-Polarizasyon.docx etkinliğini geliştir','physics',true,{budget:1600});
  assert.ok(note.sources.some(s=>s.kind==='guide'));
  assert.match(note.context,/guide-planning-not-scientific-proof/);
  assert.match(note.context,/Malus/);
  assert.ok(note.context.length<=1600);
});
test('AI idea seeds diversify and preserve user exclusions without becoming catalogue-only responses',()=>{
  const constraints=conversationConstraints([{role:'user',content:'Kimya olsun, asit baz ve gıda boyası kullanma.'}]);
  const first=proposalContext('Başka deney bul','chemistry','',constraints,1000);
  const seed=JSON.parse(first);const second=proposalContext('Başka deney bul','chemistry',`## ${seed.title}`,constraints,1000);
  assert.notEqual(JSON.parse(second).title,seed.title);
  const prepared=prepareRequest(validateInput({messages:[{role:'user',content:'Kimya için farklı bir deney bul'}],settings:{engine:'auto'}}));
  assert.match(prepared.payload.messages.map(m=>m.content).join('\n'),/proposal-seed-not-proof/);
});
test('switching fields in natural Turkish updates the active domain rather than retaining chemistry',()=>{
  assert.equal(turnSettings('Fizikte deney yapalım',{domain:'chemistry'}).domain,'physics');
  assert.equal(turnSettings('Müzik için etkinlik geliştirelim',{domain:'chemistry'}).domain,'music');
  assert.equal(turnSettings('kimya değil, fizik için yeni deney',{domain:'chemistry'}).domain,'physics');
});
test('static package excludes server policy, provider internals and secrets but includes offline fonts and new knowledge',async()=>{
  const build=await readFile('scripts/build.mjs','utf8');
  for(const file of ['enriched-sources.js','enriched-experiments.js','guide-insights.js','procurement.js'])assert.ok(build.includes(file));
  assert.ok(!build.includes("'policy.js'"));assert.ok(!build.includes("'providers.js'"));
  assert.ok((await readdir('assets/fonts')).includes('OFL.txt'));
  const css=await readFile('styles.css','utf8');assert.match(css,/Comic Sans MS/);assert.match(css,/prefers-reduced-motion/);
  for(const file of ['knowledge.js','proposal-context.js','policy.js'])assert.ok(!/from\s+['"][^'"]+\?v=/.test(await readFile(`lib/${file}`,'utf8')));
});
