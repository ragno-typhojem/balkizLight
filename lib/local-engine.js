import { EXPERIMENT_BANK } from './experiment-bank.js';
import { MATERIALS, materialById, marketLink } from './materials.js';
import { SOURCES, publicSource, DISCLAIMER, retrieveKnowledge } from './knowledge.js';
import { conversationConstraints, violatesExclusions } from './constraints.js';
import { requestsNewActivity } from './conversation.js';
import { normalize } from './retrieval.js';
import { GUIDE_FORMATS } from './guide-format.js';
const riskyRecipe = text => /\bhcl\b|\bnaoh\b|hidroklorik|sodyum hidroksit|gozleri kapali/.test(normalize(text));

export const VARIANTS = ['Keşif', 'Tekrar ve karşılaştırma', 'Yeni değişken', 'Grafik ve model sınırı'];
export const LOCAL_VARIANT_COUNT = EXPERIMENT_BANK.length * VARIANTS.length;
const stop = new Set('baska bambaska yeni bir deney etkinlik bul oner yaz bana farkli kimya kimyasal daha karsilastir kiyasla plan kilavuz kimyasallarla basit kolay zor ucuz ileri cocuklar icin kanka super tasarla yap bulma lutfen misin deneyin onceki bunlari bunlariyla onerileri oneriyi kac dakika kisi katilimci yas gozlem'.split(' '));
function terms(text) { return normalize(text).split(/[^\p{L}\p{N}]+/u).filter(word => word.length > 2 && /\p{L}/u.test(word) && !stop.has(word)); }
const explicitAI = text => /yapay zekayla|yapay zeka ile|ai ile|model ile|ozgun olarak sifirdan/.test(normalize(text));
export function localIntent(input) {
  if (input.settings.engine === 'ai' || explicitAI(input.messages.at(-1).content)) return '';
  const latest = normalize(input.messages.at(-1).content);
  if (input.attachments?.length && (/dosya|belge|kilavuzdaki|ektek|yukled/.test(latest) || !requestsNewActivity(input) && !/malzeme|magaza|market/.test(latest))) return '';
  if (!/deney|etkinlik/.test(latest) && /bul|alinir/.test(latest) && MATERIALS.some(item => terms(`${item.name} ${item.query}`).some(word => word.length > 4 && latest.includes(word)))) return 'materials';
  if (/malzeme.{0,20}(?:bul|oner|al|nereden)|nereden.{0,15}(?:bul|al)|hepsiburada|trendyol|magaza|market|alisveris/.test(latest)) return 'materials';
  if (/kiyasla|karsilastir|onceki yanit/.test(latest) && /onceki|oner|deney|etkinlik|yanit|bunlari|bunlar/.test(latest)) return 'compare';
  if (requestsNewActivity(input) || /deney (?:bul|oner|tasarla)|etkinlik (?:bul|oner)|fikir (?:bul|oner)|kimyasallarla/.test(latest)) return 'suggest';
  if (/kilavuz|plani yaz|bunu.{0,25}(?:zorlastir|kolaylastir|dakika)|varyasyon/.test(latest)) return 'adapt';
  return '';
}
function settingsFor(input) {
  const settings = { ...input.settings };
  const latest = normalize(input.messages.at(-1).content), duration = latest.match(/(\d{1,3})\s*(?:dk|dakika)/);
  const ageMessage = input.messages.filter(message => message.role === 'user').map(message => normalize(message.content)).reverse().find(text => /\d{1,2}(?:\s*[–-]\s*\d{1,2})?\s*yas/.test(text));
  const age = ageMessage?.match(/(\d{1,2})(?:\s*[–-]\s*\d{1,2})?\s*yas/);
  if (age) { settings.numericAge = Number(age[1]); settings.age = settings.numericAge < 9 ? '6–8' : settings.numericAge < 13 ? '9–12' : settings.numericAge < 16 ? '13–15' : '16+'; }
  const count = latest.match(/(\d{1,3})\s*(?:kisi|katilimci|ogrenci|cocuk)/);
  if (count) settings.participants = Math.min(200, Math.max(1, Number(count[1])));
  if (duration) settings.duration = Math.min(180, Math.max(10, Number(duration[1])));
  return settings;
}
function rank(input, allHistory = input.messages) {
  const constraints = conversationConstraints(input.messages), settings = settingsFor(input);
  const query = terms(`${input.messages.at(-1).content} ${settings.materials || ''}`).filter(word => !constraints.excluded.includes('acid-base') || !['asit','baz','ph','indikator'].includes(word)).filter(word => !constraints.excluded.includes('food-dye') || !['gida','boya','boyasi','boyasiz','bulsana'].includes(word));
  const age = settings.numericAge ?? (Number(settings.age?.split('–')[0]?.replace('+', '')) || 9);
  const latest = normalize(input.messages.at(-1).content);
  const domain = /fizik/.test(latest) ? 'physics' : /astronomi/.test(latest) ? 'astronomy' : /matematik/.test(latest) ? 'math' : /yapay zeka/.test(latest) ? 'ai' : /kimya/.test(latest) ? 'chemistry' : !['general','science'].includes(settings.domain) ? settings.domain : constraints.chemistry ? 'chemistry' : settings.domain;
  const previous = allHistory.filter(message => message.role === 'assistant').map(message => message.content).join('\n');
  const strictMaterials = /sadece|yalniz|baska malzeme yok/.test(normalize(`${settings.materials} ${input.messages.at(-1).content}`));
  return EXPERIMENT_BANK.filter(card => card.minAge <= age &&
    (['general', 'science'].includes(domain) || card.domain === domain) &&
    !violatesExclusions([card.title, card.question, ...card.materials.map(id => materialById(id).name)].join(' '), constraints) &&
    (!strictMaterials || card.materials.every(id => ['water', 'timer', 'pencil', 'cups'].includes(id) || normalize(settings.materials || input.messages.at(-1).content).includes(normalize(materialById(id).name.split(' / ')[0])) || id === 'paper' && /kagit/.test(normalize(settings.materials)) || id === 'string' && /ip/.test(normalize(settings.materials)))))
    .map(card => {
      const searchable = normalize(`${card.title} ${card.question} ${card.principle} ${card.materials.map(id => materialById(id).name).join(' ')}`);
      const matches = query.reduce((n, word) => n + Number(searchable.includes(word)), 0);
      return { card, requested: query.length > 0, matches, exact: latest.includes(normalize(card.title)), seen: previous.includes(card.title), score: matches + (card.domain === domain ? 2 : 0) };
    }).sort((a, b) => Number(b.exact) - Number(a.exact) || Number(a.seen) - Number(b.seen) || b.score - a.score || a.card.id.localeCompare(b.card.id));
}
function refs(cards) { return [...new Set(cards.map(card => card.sourceId))].map(id => SOURCES.find(source => source.id === id)).filter(Boolean).map(publicSource); }
function variantFor(card, input) {
  const seen = input.messages.filter(message => message.role === 'assistant').map(message => message.content).join(' ');
  const start = input.settings.difficulty === 'advanced' ? 3 : input.settings.difficulty === 'intermediate' ? 1 : 0;
  for (let offset = 0; offset < VARIANTS.length; offset++) {
    const index = (start + offset) % VARIANTS.length;
    if (!seen.includes(`${card.title} · ${VARIANTS[index]}`)) return index;
  }
  return null;
}
function safety(card) {
  const warnings = card.materials.map(id => materialById(id).warning);
  return [...new Set(warnings), 'Öğretmen yaşa, gruba ve mekâna göre ön deneme yapsın; öneri uygulama onayı değildir.'];
}
function renderCard(card, input, variant) {
  const settings = settingsFor(input), style = VARIANTS[variant];
  const materials = card.materials.map(id => materialById(id));
  const steps = [...card.steps];
  if (variant === 1) steps.push('Aynı koşulları en az üç kez gözlemleyip tekrarlar arasındaki farkı kaydedin.');
  if (variant === 2) steps.push(card.variation);
  if (variant === 3) steps.push('Ölçüm birimini ya da kategori sıklığını açıkça yazın; grafik oluşturup modelin hangi koşullarda sınırlı olduğunu tartışın.');
  const groupCount = Math.max(1, Math.ceil(Number(settings.participants || 20) / 4));
  const source = SOURCES.find(source => source.id === card.sourceId);
  const body = `## ${card.title} · ${style}\n\n**Araştırma sorusu:** ${card.question}\n\n**Çerçeve:** ${settings.age} yaş · ${settings.duration} dk · yaklaşık ${groupCount} çalışma grubu. Bu süre sınıf akışıdır; ölçümün tamamlanacağına dair garanti değildir.\n\n**Malzemeler:** ${materials.map(item => item.name).join('; ')}. Sayıları grup düzenine göre hazırla.\n\n**Yöntem**\n\n${steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\n**Bilimsel dayanak:** ${card.principle}\n\n**Bir adım ileri:** ${card.variation}\n\n**Güvenlik ve kontrol**\n\n${safety(card).map(item => `- ${item}`).join('\n')}\n\n**Beklenen sonuç:** Veriyi siz toplayacaksınız; burada ölçülmüş sonuç veya garanti edilmiş başarı yok.\n\n${source ? `**Kaynak:** [${source.publisher} · ${source.title}](${source.url})\n\n` : ''}**Malzeme araştırması:** ${materials.filter(item => !['water','timer'].includes(item.id)).slice(0, 4).map(item => `[${item.name}](${marketLink(item.query)})`).join(' · ')}\n\nMağaza bağlantıları arama içindir; stok, fiyat ve ürün uygunluğu doğrulanmadı.`;
  if (!/kilavuz|plani yaz/.test(normalize(input.messages.at(-1).content))) return body;
  const safe = safety(card).map(item => `- ${item}`).join('\n');
  const method = steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
  const resources = `${source ? `[${source.publisher} · ${source.title}](${source.url})` : 'Ek bilimsel kontrol gerekir.'}\n\nMalzemeler: ${materials.filter(item => !['water','timer'].includes(item.id)).slice(0,4).map(item => `[${item.name}](${marketLink(item.query)})`).join(' · ')}. Arama bağlantılarıdır; stok/fiyat doğrulanmadı.`;
  const framing = `${settings.age} yaş · ${settings.duration} dk sınıf akışı · ${settings.participants || 20} katılımcı · yaklaşık ${groupCount} grup. Ölçümün bu sürede tamamlanacağı garanti edilmez.`;
  const supplies = materials.map(item => item.name).join('; ') + '. Sayıları grup düzenine göre hazırla.';
  const research = [card.question, 'Öğrenciler bilimsel ilkeye dayanarak bir tahmin yazsın. Bu taslak ölçülmüş sonuç içermez.', `${framing}\n\n${supplies}`, 'Sorudaki tek koşulu değiştir; diğer koşulları sabit tut. İlk koşulu karşılaştırma olarak koru; aynı anda birden fazla değişken değiştirme.', safe, method + '\n\nAynı koşulda en az üç tekrar yap; tekrarlar arasındaki farkı kaydet.', '| Koşul | Tekrar | Ölçüm / gözlem | Birim / kategori |\n|---|---|---|---|\n|  | 1 |  |  |\n|  | 2 |  |  |\n|  | 3 |  |  |', `${card.principle}\n\nÖlçüm aracının çözünürlüğünü ve değişken kontrolünü belirt. Bulguyu yalnız denediğiniz koşullarla sınırla; sayı veya başarı uydurma.`, card.variation, resources];
  const ilkyar = [card.title + ' · ' + style, ({chemistry:'Kimya',physics:'Fizik / Fen',astronomy:'Astronomi',math:'Matematik',ai:'Yapay zekâ'})[card.domain] || card.domain, settings.age + ' yaş', framing, supplies, card.question, card.principle, 'Gönüllü düzenek ve ürün etiketlerini önceden kontrol eder, ön deneme yapar; grupta uygulama, gözlem, kayıt ve güvenlik görevleri paylaşılır.', method, 'Çocuklara araştırma sorusunu sor; önce tahminlerini al, gözlemlerini çizim veya tabloyla kaydettir. Tahmin ile gözlemi ayrı yazdır.', card.variation, safe, resources];
  const format = settings.format === 'research' ? 'research' : 'ilkyar';
  return `## ${card.title} · ${style}\n\n` + GUIDE_FORMATS[format].map((heading,index) => `### ${heading}\n\n${(format === 'research' ? research : ilkyar)[index]}`).join('\n\n');
}
function materialReply(input) {
  const query = terms(input.messages.at(-1).content), constraints = conversationConstraints(input.messages);
  let candidates = MATERIALS.filter(material => !violatesExclusions(material.name, constraints));
  const scored = candidates.map(item => ({ item, score: query.reduce((n, word) => n + Number(normalize(`${item.name} ${item.query}`).includes(word)), 0) })).sort((a, b) => b.score - a.score);
  const positive = scored.filter(item => item.score > 0);
  if (!positive.length && query.some(word => !/^(?:malzeme\w*|erisilebilir|ucuz|nereden|alirim|alabilir|alinir|lazim|gerekli|uygun|kimyasal\w*|market\w*|magaza\w*)$/.test(word))) return null;
  candidates = positive.length ? positive.slice(0, 6).map(entry => entry.item) : rank(input).slice(0, 2).flatMap(entry => entry.card.materials.map(materialById));
  candidates = [...new Map(candidates.map(item => [item.id, item])).values()].slice(0, 8);
  if (!candidates.length) return null;
  return { text: `## Erişilebilir malzeme seçenekleri\n\n${candidates.map(item => `- **${item.name}** · ${item.where}. ${item.warning}\n  [Tüm mağazalarda araştır](${marketLink(item.query)}) · [Hepsiburada](${marketLink(item.query, 'hepsiburada')}) · [Trendyol](${marketLink(item.query, 'trendyol')})`).join('\n\n')}\n\nBu bağlantılar ürün araştırması içindir; canlı stok/fiyat okunmadı. Kimyasal üründe ad, saflık, derişim, etiket ve güvenlik bilgi formunu kontrol et. Alım yapılmaz.`, sources: [] };
}
export function buildLocalReply(input, history = input.messages) {
  if (explicitAI(input.messages.at(-1).content)) return null;
  const intent = localIntent(input);
  if (!intent) {
    if (input.settings.engine !== 'local' || input.attachments?.length) return null;
    const constraints = conversationConstraints(input.messages);
    const knowledge = retrieveKnowledge(input.messages.at(-1).content, input.settings.domain, true, { budget: 1300, limit: 2, guides: false, constraints });
    if (!knowledge.sources.length) return null;
    return { text: `## Yerel bilimsel başvuru\n\n${knowledge.sources.map(source => `**${source.title}:** ${source.facts}`).join('\n\n')}\n\nBu kısa başvuru notları canlı araştırma veya soruna özel yapay zekâ analizi değildir.`, meta: { profile: 'local', local: true, sources: knowledge.sources.map(publicSource), disclaimer: DISCLAIMER, usage: { total: 0, cached: 0, charged: 0 } } };
  }
  let result, ids = [];
  if (intent === 'materials') result = materialReply(input);
  else {
    const ranked = rank(input, history);
    if (!ranked.length || intent === 'suggest' && ranked.every(entry => entry.requested && entry.matches === 0)) return null;
    if (intent === 'compare') {
      const knownPrior = history.filter(message => message.role === 'assistant').map(message => message.content).join(' ');
      const used = ranked.filter(entry => knownPrior.includes(entry.card.title));
      const selected = (used.length >= 2 ? used : ranked).slice(0, 3).map(entry => entry.card);
      const prior = history.filter(message => message.role === 'assistant' && !riskyRecipe(message.content) && message.content.trim()).slice(-3);
      result = { text: `## Seçenekleri birlikte kıyaslayalım\n\n${prior.length ? `Önceki öneriler: ${prior.map(message => message.content.split('\n').find(line => line.trim())?.replace(/^#+\s*/, '')?.slice(0, 90)).join(' · ')}. Bunlar bilimsel kanıt sayılmaz.\n\n` : ''}| Seçenek | Araştırma odağı | Malzeme erişimi | Hazırlık |\n|---|---|---|---|\n${selected.map(card => `| ${card.title} | ${card.question} | ${[...new Set(card.materials.map(id => materialById(id).where))].join(', ')} | ${card.minAge}+ yaş, ön deneme |`).join('\n')}\n\n**Önerilen başlangıç:** ${selected[0].title}. Seçim yaş, alan, malzeme eşleşmesi ve daha önce görülmüş başlıklara göre yapıldı; uygulanıp başarı ölçülmedi. **Yeni geliştirme:** ${selected[0].variation}\n\nİstersen bir seçeneğin adını yazıp kılavuz iste veya yapay zekâyla ayrıntılandır.`, sources: refs(selected) }; ids = selected.map(card => card.id);
    } else {
      const previous = input.messages.filter(message => message.role === 'assistant').at(-1)?.content || '';
      const active = intent === 'adapt' ? EXPERIMENT_BANK.find(card => previous.includes(card.title)) : null;
      const requested = ranked.find(entry => entry.exact)?.card;
      if (intent === 'adapt' && !requested && (previous && !active || !active && ranked.every(entry => entry.requested && entry.matches === 0))) return null;
      const next = ranked.find(entry => variantFor(entry.card,input) !== null);
      const selected = requested || (active && ranked.some(entry => entry.card.id === active.id) ? active : intent === 'adapt' ? ranked[0].card : next?.card);
      if (!selected) return null;
      const variant = variantFor(selected, input) ?? 0;
      result = { text: renderCard(selected, input, variant), sources: refs([selected]) }; ids = [selected.id];
    }
  }
  if (!result) return null;
  return { text: result.text, meta: { profile: 'local', local: true, engine: 'local', sources: result.sources, patterns: ids, excluded: conversationConstraints(input.messages).labels, disclaimer: DISCLAIMER, usage: { total: 0, cached: 0, charged: 0 }, provenance: 'Özgün yerel geliştirme taslağı; yapay zekâ üretimi veya uygulama doğrulaması değildir.' } };
}

export function localReferenceContext(input) {
  const recent = input.messages.filter(message => message.role === 'assistant').slice(-2).map(message => message.content).join(' ');
  const card = EXPERIMENT_BANK.find(item => recent.includes(item.title));
  if (!card) return '';
  const note = JSON.stringify({ type: 'local-proposal-not-proof', title: card.title, question: card.question, principle: card.principle, variation: card.variation, materials: card.materials.map(id => materialById(id).name), sourceId: card.sourceId });
  return note.length <= 1000 ? note : '';
}
