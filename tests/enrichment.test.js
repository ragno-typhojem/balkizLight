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
  const first=proposalContext('Başka deney bul','chemistry','',constraints,1800);
  const seed=JSON.parse(first);const second=proposalContext('Başka deney bul','chemistry',`## ${seed.title}`,constraints,1800);
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

test('without clauses exclude both named activities rather than retrieving forbidden manuals',()=>{
  const constraints=conversationConstraints([{role:'user',content:'Kimya için asit baz ve gıda boyası olmadan iki fikir öner.'}]);
  assert.ok(constraints.excluded.includes('acid-base')); assert.ok(constraints.excluded.includes('food-dye'));
  const prepared=prepareRequest(validateInput({messages:[{role:'user',content:'Kimya için asit baz ve gıda boyası olmadan iki fikir öner.'}],settings:{domain:'chemistry'}}));
  assert.ok(!prepared.sources.some(source=>/asit|indikatör/i.test(source.title)));
});

test('generic chemistry wording cannot attach a writing workshop or astronomy facts',()=>{
  const note=retrieveKnowledge('Kimya için tedarik edilebilir eğitim reaktifleri ve ölçüm araçlarıyla iki farklı araştırma fikri öner. Yalnız soru ve mekanizma yaz.','chemistry',true,{budget:1600});
  assert.ok(note.sources.every(source=>['chemistry','science'].includes(source.domain)));
  assert.ok(!note.sources.some(source=>source.id==='nasa-seasons'||source.id==='guide-1go6WPc_FB8awwQR4l6vgLsFuowBDwqG6'));
});

test('Turkish word counts and negated guide requests preserve conversational intent',()=>{
  for (const text of ['İki farklı araştırma fikri öner','Üç farklı kimya deneyi öner']) {const p=prepareRequest(validateInput({messages:[{role:'user',content:text}],settings:{domain:'chemistry'}})); assert.equal(p.experimentCard,false); assert.equal(p.intent,'ideas');}
  const p=prepareRequest(validateInput({messages:[{role:'assistant',content:'### 1. Jel\n### 2. İletkenlik'},{role:'user',content:'İkincisini geliştir; tam kılavuz yazma.'}],settings:{domain:'chemistry'}})); assert.equal(p.intent,'chat'); assert.equal(p.experimentCard,false);
  const n=prepareRequest(validateInput({messages:[{role:'user',content:'Farklı mekanizmayla başka kimya araştırması öner.'}],settings:{domain:'chemistry'}})); assert.equal(n.novel,true);
});

test('chemistry output rejects unsupported doses and observed carbonate/thiocyanate errors',async()=>{
  const {validateAndRender}=await import('../lib/output.js');
  const prepared=prepareRequest(validateInput({messages:[{role:'user',content:'Kimya konusunu açıkla'}],settings:{domain:'chemistry',task:'explain'}}));
  assert.equal(prepared.experimentCard,false);
  for(const reply of ['Kalsiyum bikarbonat çökelmesi kristal oluşturur.','Magnezyum sülfat ile alüminyum sülfat çapraz bağlanarak jel oluşturur.','Sodyum karbonat ve kalsiyum klorür karışımında CO2 gazı çıkar.','Demir tiyosiyanat manyetik bir çökelti oluşturur.','5 g kalsiyum klorürü 50 mL suya ekle ve karıştır.']) assert.throws(()=>validateAndRender(JSON.stringify({reply}),prepared));
  assert.doesNotThrow(()=>validateAndRender(JSON.stringify({reply:'Kalsiyum klorür ve sodyum bikarbonat için öğretmenin hazırladığı etiketli eğitim çözeltilerini kullan; gözlemi su kontrolleriyle karşılaştır.'}),prepared));
});

test('multiple idea output has independent numbered questions rather than unsolicited recipes',async()=>{
  const {validateAndRender}=await import('../lib/output.js');
  const p=prepareRequest(validateInput({messages:[{role:'user',content:'İki farklı kimya araştırma fikri öner'}],settings:{domain:'chemistry'}}));
  assert.equal(p.pluralIdeas,true);assert.equal(p.ideaCount,2);
  const ideas=[{title:'İletkenlik',question:'İyon tipi neyi değiştirir?',mechanism:'İyonların hareketi iletkenlikle ilişkilidir.',measurement:'Aynı sıcaklıkta µS/cm.',safety:'Etiketli eğitim çözeltilerini öğretmen hazırlar.'},{title:'Aljinat',question:'Jel geometrisi neyi etkiler?',mechanism:'Polimer ağında su ve mekanik cevap.',measurement:'Aynı yükte şekil değişimi mm.',safety:'Deney örnekleri tüketilmez.'}];
  const text=validateAndRender(JSON.stringify({ideas}),p);assert.match(text,/### 1. İletkenlik/);assert.match(text,/### 2. Aljinat/);
  assert.throws(()=>validateAndRender(JSON.stringify({ideas:ideas.slice(0,1)}),p));
});

test('another research idea stays brief without forcing a full preparation recipe',()=>{
  const p=prepareRequest(validateInput({messages:[{role:'user',content:'Başka kimya araştırması öner'}],settings:{domain:'chemistry'}}));
  assert.equal(p.novel,true); assert.equal(p.experimentCard,false); assert.equal(p.ideaOutput,true); assert.equal(p.ideaCount,1);
});

test('constraint checks distinguish redox indicators and explicit non-use from forbidden experiments',async()=>{
  const {violatesExclusions}=await import('../lib/constraints.js');
  const c=conversationConstraints([{role:'user',content:'Asit baz ve gıda boyası istemiyorum.'}]);
  assert.equal(violatesExclusions('C vitamini redoks deneyinde DCPIP indikatörü kullanılır.',c),false);
  for(const text of ['Gıda boyası kullanılmaz; etiketli aljinat jeli incelenir.','Gıda boyası kullanmadan ölç.','Gıda boyası kullanılmamalıdır.']) assert.equal(violatesExclusions(text,c),false);
  assert.equal(violatesExclusions('pH indikatörü ile asit–baz titrasyonu.',c),true);
  assert.equal(violatesExclusions('Gıda boyası ekle.',c),true);
  const all=conversationConstraints([{role:'user',content:'İndikatör kullanma.'}]);assert.equal(violatesExclusions('Redoks indikatörü.',all),true);
});

test('generic research suggestions use controlled measurable studies; unknown named topics get no unrelated seed',()=>{
  const p=JSON.parse(proposalContext('Başka kimya araştırması öner','chemistry','',{excluded:[]},1800,'intermediate'));
  assert.ok(p.controls&&p.measurement); assert.ok(p.source.facts);
  const c=conversationConstraints([{role:'user',content:'Asit baz ve gıda boyası olmadan'}]);
  const realistic=JSON.parse(proposalContext('Kimya için asit baz ve gıda boyası olmadan iki farklı araştırma fikri öner. Sadece soru, mekanizma ve ölçümü kısaca yaz.','chemistry','',c,1800));
  assert.ok(realistic.controls&&realistic.measurement);
  assert.equal(proposalContext('Kuantum dolanıklık ölçümü','physics','',{excluded:[]},1800),'');
});

test('observed open-flame research suggestion is rejected before display',async()=>{
  const {riskyRecipe,validateAndRender}=await import('../lib/output.js');
  assert.equal(riskyRecipe('Bir mum veya küçük bir ateş kaynağı kullanılır. Alev yüksekliği ölçülür.'),true);
  assert.equal(riskyRecipe('Yanma bir yükseltgenme sürecidir; bu etkinlikte alev kullanılmaz.'),false);
  const p=prepareRequest(validateInput({messages:[{role:'user',content:'Başka kimya araştırması öner'}],settings:{domain:'chemistry'}}));
  assert.throws(()=>validateAndRender(JSON.stringify({ideas:[{title:'Yanma hızı',question:'Hava akımı etkisi?',mechanism:'Küçük bir ateş kaynağı kullanılır.',measurement:'Alev yüksekliği ölçülür.',safety:'Gözlük tak.'}]}),p));
  assert.match(p.payload.messages.at(-1).content,/dayanak mekanizma:/);
});

test('reply text must contain an answer rather than an echoed schema',async()=>{
 const {validateAndRender}=await import('../lib/output.js');
 const p=prepareRequest(validateInput({messages:[{role:'user',content:'Polarizasyon kılavuzu yaz'}],settings:{domain:'physics'}}),false,{AI_PROVIDER:'cloudflare'});
 assert.throws(()=>validateAndRender(JSON.stringify({reply:JSON.stringify({type:'object',properties:{reply:{type:'string'}},required:['reply']})}),p));
 assert.ok(!p.payload.messages.some(m=>m.content.includes('alan sözleşmesine uygun veri')));
});
