import { normalize } from './retrieval.js';

const rules = [
  {id:'indicators',label:'İndikatör kullanımı',subject:'indikator',negation:'indikator.{0,40}(?:kullanma|istemiyorum|olmasin|haric|degil|olmadan)'},
  { id: 'acid-base', label: 'Asit–baz ve pH indikatörü etkinliği', subject: 'asit[\\s–—-]*baz|\\bph\\b|indikator', negation: '(?:asit[\\s–—-]*baz|\\bph\\b|indikator).{0,55}(?:bulma|onerme|istemiyorum|olmasin|yapma|haric|olmadan|olmayan|icermeyen|disinda|degil|yerine)' },
  { id: 'food-dye', label: 'Gıda boyası', subject: 'gida boya', negation: 'gida\\s+boyasiz|gida\\s+boya.{0,40}(?:kullanma|bulma|istemiyorum|olmasin|haric|olmadan|olmayan|icermeyen|disinda|degil)' },
  { id: 'crystals', label: 'Kristal büyütme etkinliği', subject: 'kristal', negation: 'kristal.{0,40}(?:bulma|onerme|istemiyorum|olmasin|yapma|haric|olmadan|olmayan|icermeyen|disinda|degil)' },
];
export function conversationConstraints(messages) {
  const excluded = new Set(); let chemistry = false;
  for (const message of messages) {
    if (message.role !== 'user') continue;
    const text = normalize(message.content);
    if (/kimya|kimyasal/.test(text)) chemistry = true;
    if (/fizik|astronomi|biyoloji|yapay zeka|matematik|robot/.test(text) && !/kimya|kimyasal/.test(text)) chemistry = false;
    for (const rule of rules) {
      if (new RegExp(rule.negation).test(text)) excluded.add(rule.id);
      else if (new RegExp(`(?:${rule.subject}).{0,30}(?:artik olabilir|kullanabiliriz|istiyorum|oner)$`).test(text.trim())) excluded.delete(rule.id);
    }
  }
  return { excluded: [...excluded], labels: rules.filter(rule => excluded.has(rule.id)).map(rule => rule.label), chemistry };
}
export function hasNewExclusion(text) { return rules.some(rule => new RegExp(rule.negation).test(normalize(text))); }
export function violatesExclusions(text, constraints) {
  const mention='(?:asit[\\s–—-]*baz|gida\\s+boya(?:si|sini)?|indikator(?:u|unu)?|kristal(?:ler|leri)?)';
  const denial='(?:kullan(?:il)?ma(?:z|dan|yin|yacak|mali(?:dir)?)?|ekle(?:n)?me(?:z|den|yin|meli(?:dir)?)?|icermiyor|icermeyen|olmayan|olmadan|degil|gerekmez|gerekmiyor|gerek yok|yok)';
  const value = normalize(text).replace(new RegExp(mention+'(?:\\s+(?:kullanimi|kullanilmasi|kullanmak|eklenmesi|etkinligi|deneyi|titrasyonu|tepkimesi))?\\s+'+denial+'\\b','g'),' ');
  return constraints.excluded.some(id => id === 'acid-base' ? /asit[\s–—-]*baz|\bph\b|notralles|hidroklorik|sodyum hidroksit|\bhcl\b|\bnaoh\b/.test(value) || id === 'acid-base' && /indikator/.test(value) && !/redoks|dcpip|iyot|vitamin|askorbik|nisasta/.test(value) : id === 'food-dye' ? /gida\s+boya/.test(value) : id === 'indicators' ? /indikator/.test(value) : id === 'crystals' ? /kristal/.test(value) : false);
}
export function allowedSource(source, constraints) { if (constraints.excluded.includes('acid-base') && source.id === 'acs-reaction') return false; return !violatesExclusions(`${source.title} ${(source.keywords || []).join(' ')} ${source.facts || source.goal || ''}`, constraints); }

export function laboratoryClarification(input) {
  if (input.settings.procurement !== 'owned') return '';
  const latest = normalize(input.messages.at(-1).content);
  if (!/(?:daha\s+)?kimyasallarla|laboratuvar deneyi/.test(latest)) return '';
  const userText = input.messages.filter(message => message.role === 'user').map(message => normalize(message.content)).join(' ');
  const hasMaterialNames = /sodyum|kalsiyum|potasyum|bakir|algina|jelatin|sirke|nisasta|deterjan|sabun/.test(userText) || input.settings.materials.trim();
  if (hasMaterialNames) return '';
  return 'Kimyasal ağırlıklı farklı bir deney tasarlayabiliriz. Elindeki kimyasalların adları, etiketli derişimleri ve uygulayacağın ortam nedir? Bunları bilmeden madde ya da karışım miktarı uydurmayacağım. Önceki öneriyi yeniden yazmak yerine bu bilgilere göre ayrı bir soru ve düzenek geliştireceğim.';
}
