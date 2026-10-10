export function normalize(text) {
  return String(text ?? '').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
}
const STOP = new Set('ve veya bir bu su icin ile olarak daha en nasil nedir neden bana benim sen etkinlik etkinligi deney deneyi gelistir gelistirmek yap yapmak olabilir olsun istiyorum lutfen hazirla bilgi anlat kullan'.split(' '));
function tokens(text) { return normalize(text).split(/[^\p{L}\p{N}]+/u).filter(word => word.length > 1 && !STOP.has(word)); }
// Conservative inflection handling; never treat short strings like "ay" as substrings of "yapay".
function stem(word) {
  if (word.length < 6) return word;
  return word.replace(/(?:larinin|lerinin|larini|lerini|larin|lerin|lardan|lerden|lari|leri|sinin|sini|inin|nin|inda|inde|dan|den|dir|tir|lik|lar|ler)$/, '');
}
export function createRetriever(records) {
  const postings = new Map(), phrases = new Map();
  for (const record of records) {
    const terms = new Map();
    for (const [text, weight] of [[record.title, 4], [(record.keywords || []).join(' '), 3], [record.facts || record.goal, 0.35]]) {
      for (const word of new Set(tokens(text).map(stem))) terms.set(word, (terms.get(word) || 0) + weight);
    }
    for (const [word, weight] of terms) {
      if (!postings.has(word)) postings.set(word, []);
      postings.get(word).push({ record, weight });
    }
    phrases.set(record.id, (record.keywords || []).map(normalize).filter(key => key.includes(' ')));
  }
  return (text, domain = 'general') => {
    const query = normalize(text), queryTerms = new Set(tokens(text).slice(-120).map(stem)), scores = new Map();
    for (const word of queryTerms) {
      const matches = postings.get(word) || [];
      const idf = Math.log(1 + records.length / (1 + matches.length));
      for (const { record, weight } of matches) scores.set(record, (scores.get(record) || 0) + weight * idf);
    }
    const padded = ` ${query.replace(/[^\p{L}\p{N}]+/gu, ' ')} `;
    for (const [record, score] of scores) {
      const phraseHits = phrases.get(record.id).filter(key => padded.includes(` ${key} `)).length;
      scores.set(record, score + phraseHits * 5 + (record.domain === domain ? 1.5 : 0));
    }
    return [...scores].map(([record, score]) => ({ record, score })).sort((a, b) => b.score - a.score || a.record.id.localeCompare(b.record.id));
  };
}
