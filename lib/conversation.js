import { hasNewExclusion } from './constraints.js';
import { normalize } from './retrieval.js';

// Extractive compression only: no extra model request, no invented conversation facts.
export function compactMessage(content, cap, query = '') {
  if (content.length <= cap) return content;
  const marker = '\n[… önceki metinden seçili bölümler …]\n';
  const words = normalize(query).split(/[^\p{L}\p{N}]+/u).filter(word => word.length > 3);
  const lines = content.split('\n').map((text, index) => ({ text, index, score: words.reduce((n, word) => n + Number(normalize(text).includes(word)), 0) + (/güvenlik|risk|varsayım|malzeme|hipotez|değişken/i.test(text) ? 2 : 0) }));
  const head = Math.floor(cap * 0.35), tail = Math.floor(cap * 0.2);
  const room = Math.max(0, cap - head - tail - marker.length * 2);
  let used = 0;
  const selected = lines.filter(line => line.score > 0).sort((a, b) => b.score - a.score || a.index - b.index).filter(line => {
    if (used + line.text.length + 1 > room) return false;
    used += line.text.length + 1; return true;
  }).sort((a, b) => a.index - b.index).map(line => line.text).join('\n');
  return `${content.slice(0, head)}${marker}${selected}${marker}${content.slice(-tail)}`.slice(0, cap);
}

export function conversationHistory(messages, budget, query) {
  if (!messages.length || budget < 200) return { messages: [], trimmed: messages.length > 0 };
  const chosen = new Map();
  let remaining = budget;
  if (messages.length > 6 && budget >= 600) {
    const content = compactMessage(messages[0].content, Math.min(220,Math.floor(budget*.15)),query);
    chosen.set(0,{role:messages[0].role,content}); remaining -= content.length;
  }
  // Reserve space for both sides of the latest exchange, rather than only a guide.
  const lastUser = messages.findLastIndex(message => message.role === 'user');
  if (lastUser >= 0) {
    const content = compactMessage(messages[lastUser].content, Math.min(400, Math.floor(budget * .3)),query);
    if (chosen.has(lastUser)) remaining += chosen.get(lastUser).content.length;
    chosen.set(lastUser,{ role:'user',content }); remaining -= content.length;
  }
  for (let i = messages.length - 1; i >= Math.max(0, messages.length - 6); i--) {
    if (chosen.has(i)) continue;
    const message = messages[i];
    const cap = Math.min(remaining, message.role === 'assistant' ? (i === messages.length - 1 ? Math.min(850, Math.floor(budget * .5)) : 300) : 350);
    if (cap < 120) continue;
    const content = compactMessage(message.content, cap, query);
    chosen.set(i, { role: message.role, content }); remaining -= content.length;
  }
  // Preserve the original brief/template as an anchor when the conversation is longer.
  if (!chosen.has(0) && remaining >= 160) chosen.set(0, { role: messages[0].role, content: compactMessage(messages[0].content, Math.min(remaining, 600), query) });
  const history = [...chosen].sort((a, b) => a[0] - b[0]).map(([, message]) => message);
  if (history[0]?.role === 'assistant') history.unshift({ role: 'user', content: 'Önceden açılan taslak / önceki çalışma bağlamı:' });
  return { messages: history, trimmed: chosen.size < messages.length || [...chosen].some(([index, message]) => message.content !== messages[index].content) };
}

export function requestsNewActivity(input) {
  const text = normalize(input.messages.at(-1).content);
  if (/baska.{0,12}istemiyorum|yeni.{0,12}istemiyorum|farkli.{0,12}istemiyorum/.test(text)) return false;
  if (/ayni (?:deney|etkinlik)|baska (?:bir )?malzeme|farkli (?:bir )?malzeme|malzeme.{0,20}(?:degistir|degisik)|bunu.{0,30}(?:gelistir|zorlastir|kolaylastir|degistir)/.test(text) && !/bambaska (?:bir )?(?:deney|etkinlik)/.test(text)) return false;
  if (hasNewExclusion(text)) {
    const previous = normalize(input.messages.filter(message=>message.role==='assistant').at(-1)?.content.slice(0,350) || '');
    if (/asit[\s–-]*baz|indikator|kristal/.test(previous) && /bulma|onerme|istemiyorum|yerine/.test(text)) return true;
  }
  if (/\b(?:bambaska|yepyeni)\b/.test(text) && !/ayni(?:sini)?/.test(text)) return true;
  return /(?:baska|bambaska|farkli|yeni|degisik|yepyeni)\s+(?:(?:bir|bi|birkac|tane|ozgun|bilimsel|kimya|fizik|biyoloji|astronomi|matematik)\s+)*(?:deney|etkinlik|arastirma|fikir|oner)/.test(text) ||
    /(?:deney|etkinlik|fikir).{0,24}(?:baska|farkli|degisik)/.test(text) ||
    /^(?:baska|baska bir tane|farkli bir sey|bunu istemiyorum|begenmedim|olmadi baska)[.!?\s]*$/.test(text);
}

export function requestIntent(input) {
  const latest = normalize(input.messages.at(-1).content);
  if (/kilavuz|rehber|tam plan|etkinlik plani|plani yaz/.test(latest) && !/(?:kilavuz|rehber|tam plan).{0,18}(?:yazma|istemiyorum|gerek yok|olmasin|degil)/.test(latest)) return 'guide';
  if (requestsNewActivity(input)) return 'ideas';
  if (/geri bildirim|elestir|degerlendir|inceleme rapor/.test(latest)) return 'review';
  if (/fikir|oner|alternatif|beyin firtina|deney.{0,10}bul|etkinlik.{0,10}bul/.test(latest)) return 'ideas';
  if (/deney tasarla|deney kur|arastirma tasarla|hipotez|kontrol grubu/.test(latest)) return 'experiment';
  const followup = input.messages.length > 1;
  if (followup && (latest.length < 320 || /bunu|bu deney|bu etkinlik|devam|yerine|degistir|ekle|cikar|zorlastir|kolaylastir/.test(latest))) return 'chat';
  if (/neden|nasil|nedir|acikla|anlat|hesapla|dogru mu/.test(latest)) return 'explain';
  if (input.settings.task === 'plan') return 'guide';
  return input.settings.task === 'auto' ? 'chat' : input.settings.task;
}

export function noveltyHistory(messages, budget = 550) {
  const history = [];
  let room = budget;
  const preferences = messages.filter(message => message.role === 'user').slice(-3).flatMap(message => message.content.split(/(?<=[.!?])\s+|\n/)).filter(line => /yas|yaş|dakika|malzeme|kullanma|olmasin|olmasın|alerji|butce|bütçe|gozetim|gözetim/i.test(line)).join(' ');
  if (preferences && room >= 250) {
    const prefix = 'Önceki kısıtlardan alıntı (eski konu zorunlu değil): ';
    const content = prefix + compactMessage(preferences, Math.min(170, room - prefix.length));
    history.push({ role: 'user', content }); room -= content.length;
  }
  const prior = messages.filter(message => message.role === 'assistant').slice(-3);
  for (let i = prior.length - 1; i >= 0 && room >= 80; i--) {
    const prefix = 'Önceki öneri, tekrar etme: ';
    const cap = Math.min(180, Math.floor(room / (i + 1)));
    const content = prefix + compactMessage(prior[i].content, Math.max(40, cap - prefix.length));
    history.push({ role: 'assistant', content }); room -= content.length;
  }
  return history;
}
