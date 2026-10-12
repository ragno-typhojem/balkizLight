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
  if (messages.length > 6) {
    const content = compactMessage(messages[0].content, Math.min(500, Math.floor(budget * 0.2)), query);
    chosen.set(0, { role: messages[0].role, content }); remaining -= content.length;
  }
  // Latest answer survives even when it is a long guide, a template or an interrupted reply.
  for (let i = messages.length - 1; i >= Math.max(0, messages.length - 6); i--) {
    const message = messages[i];
    const cap = Math.min(remaining, message.role === 'assistant' ? (i === messages.length - 1 ? 1100 : 500) : 550);
    if (cap < 160) break;
    const content = compactMessage(message.content, cap, query);
    chosen.set(i, { role: message.role, content }); remaining -= content.length;
  }
  // Preserve the original brief/template as an anchor when the conversation is longer.
  if (!chosen.has(0) && remaining >= 160) chosen.set(0, { role: messages[0].role, content: compactMessage(messages[0].content, Math.min(remaining, 600), query) });
  const history = [...chosen].sort((a, b) => a[0] - b[0]).map(([, message]) => message);
  if (history[0]?.role === 'assistant') history.unshift({ role: 'user', content: 'Önceden açılan taslak / önceki çalışma bağlamı:' });
  return { messages: history, trimmed: chosen.size < messages.length || [...chosen].some(([index, message]) => message.content !== messages[index].content) };
}

export function requestIntent(input) {
  const latest = normalize(input.messages.at(-1).content);
  if (/kilavuz|rehber|tam plan|etkinlik plani|plani yaz/.test(latest)) return 'guide';
  if (/geri bildirim|elestir|degerlendir|inceleme rapor/.test(latest)) return 'review';
  if (/fikir|oner|alternatif|beyin firtina/.test(latest)) return 'ideas';
  if (/deney tasarla|deney kur|arastirma tasarla|hipotez|kontrol grubu/.test(latest)) return 'experiment';
  const followup = input.messages.length > 1;
  if (followup && (latest.length < 320 || /bunu|bu deney|bu etkinlik|devam|yerine|degistir|ekle|cikar|zorlastir|kolaylastir/.test(latest))) return 'chat';
  if (/neden|nasil|nedir|acikla|anlat|hesapla|dogru mu/.test(latest)) return 'explain';
  if (input.settings.task === 'plan') return 'guide';
  return input.settings.task === 'auto' ? 'chat' : input.settings.task;
}
