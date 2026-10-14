import { SOURCES } from './knowledge.js';
import { EXPERIMENT_BANK } from './experiment-bank.js';
import { materialById } from './materials.js';
import { createRetriever, normalize } from './retrieval.js';
import { violatesExclusions } from './constraints.js';
const records = EXPERIMENT_BANK.map(card => ({...card, keywords:[card.question,card.principle,...card.materials.map(id=>materialById(id).name)],facts:card.variation}));
const rank = createRetriever(records);
const generic = new Set('sicaklik olcum model deney kimyasal arastirma kontrol cozelti cozunme madde birim islem malzeme'.split(' '));
const requestWords = /^(?:baska|yeni|farkli|bambaska|deney\w*|etkinlik\w*|arastirma\w*|kimya\w*|fizik\w*|bilim\w*|oner\w*|bul\w*|tasarla\w*|fikir\w*|fikri\w*|mekanizma\w*|malzeme\w*|reaktif\w*|arac\w*|tedarik\w*|edilebilir|egitim|bunlar\w*|tekrar\w*|bir|iki|bana|kanka|daha|ileri|zor|basit|kolay|yas|sure|ayni|koru|kalsin|lutfen|icin|sadece|yalniz|soru|olcum\w*|kisaca|olmadan|ve|veya|ile|bi|bu|bun\w*|ne|nasil|neden|nedir|mi|misin|olmadi|begenmedim|istemiyorum|olmasin|fen|tane|ayrica|her|en|yaz\w*|uc|dort|bes|dk|de|da)$/;
export function proposalContext(query,domain,previous='',constraints={excluded:[]},budget=1800,difficulty='intermediate') {
  const prior=normalize(previous);
  const mechanismSeen=card=>(SOURCES.find(source=>source.id===card.sourceId)?.keywords||[]).map(normalize).some(word=>word.length>5&&!generic.has(word)&&prior.includes(word));
  let candidates=records.filter(card=>(['general','science'].includes(domain)||card.domain===domain) && !prior.includes(normalize(card.title)) && !previous.includes(`#source:${card.sourceId}`) && !mechanismSeen(card) && !violatesExclusions(`${card.title} ${card.principle} ${card.materials.map(id=>materialById(id).name).join(' ')}`,constraints));
  const topicWords=normalize(query).split(/[^\p{L}\p{N}]+/u).filter(word=>word.length>1&&/\p{L}/u.test(word)&&!requestWords.test(word)&&!(constraints.excluded.includes('acid-base')&&/^(?:asit|baz|indikator)/.test(word))&&!(constraints.excluded.includes('food-dye')&&/^(?:gida|boya)/.test(word)));
  let selected;
  if(topicWords.length) {
    // An uncovered named topic must not receive an unrelated seed.
    selected=rank(topicWords.join(' '),domain).filter(item=>candidates.some(card=>card.id===item.record.id)).map(item=>item.record);
  } else {
    const focused=candidates.filter(card=>difficulty==='intro' ? !card.depth&&card.minAge<=9 : card.controls&&card.measure);
    if(focused.length)candidates=focused;
    const start=(previous.match(/^#{2,3}\s/gm)||[]).length % Math.max(1,candidates.length);
    selected=candidates.slice(start).concat(candidates.slice(0,start));
  }
  for(const card of selected) {
    const source=SOURCES.find(item=>item.id===card.sourceId);
    const note=JSON.stringify({kind:'proposal-seed-not-proof',title:card.title,question:card.question,materials:card.materials.map(id=>materialById(id).name),controls:card.controls||'',measurement:card.measure||'',next:card.variation,sourceId:card.sourceId,minAge:card.minAge,source:source?{id:source.id,url:source.url,facts:source.facts}:null});
    if(note.length<=budget)return note;
  }
  return '';
}
