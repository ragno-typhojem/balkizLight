import { EXPERIMENT_BANK } from './experiment-bank.js';
import { materialById } from './materials.js';
import { createRetriever, normalize } from './retrieval.js';
import { violatesExclusions } from './constraints.js';
const records=EXPERIMENT_BANK.map(card=>({...card,keywords:[card.question,card.principle,...card.materials.map(id=>materialById(id).name)],facts:card.variation}));
const rank=createRetriever(records);
export function proposalContext(query,domain,previous='',constraints={excluded:[]},budget=850) {
  const candidates=records.filter(card=>(['general','science'].includes(domain)||card.domain===domain) && !normalize(previous).includes(normalize(card.title)) && !violatesExclusions(`${card.title} ${card.principle} ${card.materials.map(id=>materialById(id).name).join(' ')}`,constraints));
  if(!candidates.length) return '';
  const ranked=rank(query,domain).filter(item=>candidates.some(card=>card.id===item.record.id));
  // A generic next-idea request rotates across mechanisms; a named topic keeps its match.
  const meaningful = normalize(query).replace(/\b(?:baska|yeni|farkli|bambaska|deney\w*|etkinlik\w*|kimya\w*|fizik\w*|oner\w*|bul\w*|tasarla\w*|bir|bana|kanka|daha|ileri|zor|yas|sure|ayni|koru|lutfen)\b/g,'').trim();
  const selected=meaningful.length>5&&ranked.length?ranked.map(item=>item.record):candidates.slice((previous.match(/^## /gm)||[]).length%candidates.length).concat(candidates);
  for(const card of selected){
    const note=JSON.stringify({kind:'proposal-seed-not-proof',title:card.title,question:card.question,principle:card.principle,materials:card.materials.map(id=>materialById(id).name),next:card.variation,sourceId:card.sourceId,minAge:card.minAge});
    if(note.length<=budget)return note;
  }
  return '';
}
