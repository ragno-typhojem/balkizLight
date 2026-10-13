import { conversationConstraints } from './lib/constraints.js';
import { buildLocalReply, localIntent, LOCAL_VARIANT_COUNT } from './lib/local-engine.js?v=2.5.0';
import { MATERIALS, STORES, marketLink } from './lib/materials.js';
import { EXPERIMENT_BANK } from './lib/experiment-bank.js';
import { SOURCES, REFERENCE_LIBRARY, GUIDES, DISCLAIMER, KNOWLEDGE_VERSION, normalize } from './lib/knowledge.js?v=2.5.0';
import { TEMPLATES } from './lib/templates.js?v=2.5.0';
import { ACTIVITY_AREAS, activityLabel } from './lib/activities.js?v=2.5.0';
import { extractFile, FILE_LIMITS } from './lib/files.js?v=2.5.0';
import { readSSE } from './lib/sse.js?v=2.5.0';

const $ = selector => document.querySelector(selector);
const KEY = 'balkiz_chats_v3', THEME = 'balkiz_theme_v2';
const DEFAULTS = { engine: 'auto', memory: 'current', domain: 'general', task: 'auto', format: 'ilkyar', detail: 'auto', difficulty: 'intro', age: '9–12', duration: 40, participants: 20, materials: '' };
const SETTINGS = Object.keys(DEFAULTS);
const e = Object.fromEntries(['history', 'thread', 'scroll', 'input', 'send', 'toast', 'sidebar'].map(name => [name, $(`#${name}`)]));
let chats = {}, active = '', busy = false, readingFiles = false, following = true, saving, toastTimer, streamController;
let retryPayload = null, cooldownUntil = 0, currentFiles = [], draftByChat = new Map(), filesByChat = new Map();
let sessionId = crypto.randomUUID(), storageWarning = false, retryInterval;
try {
  sessionId = sessionStorage.getItem('balkiz_session') || sessionId;
  sessionStorage.setItem('balkiz_session', sessionId);
} catch { /* private browser can still chat */ }

const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const uid = () => crypto.randomUUID();
// Populate choices before restoring chats so new fields and old science selections survive.
$('#domain').replaceChildren(new Option('Birlikte seçelim', 'general'), ...ACTIVITY_AREAS.map(area => new Option(area.label, area.id)), new Option('Fen bilimleri · genel', 'science'));
$('#template-category').replaceChildren(new Option('Tüm başlıklar', 'all'), ...ACTIVITY_AREAS.map(area => new Option(area.label, area.id)));
$('#template-count').textContent = TEMPLATES.length;
function toast(message) { e.toast.textContent = message; e.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => e.toast.classList.remove('show'), 4500); }
function announce(message) { $('#announce').textContent = message; }
function safeURL(url) { try { const parsed = new URL(url); return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : ''; } catch { return ''; } }

function markdown(source) {
  if (!window.marked) return escapeHTML(source).replace(/\n/g, '<br>');
  const doc = new DOMParser().parseFromString(window.marked.parse(String(source || ''), { gfm: true, breaks: true }), 'text/html');
  const allowed = new Set(['P','BR','STRONG','B','EM','I','S','DEL','H1','H2','H3','H4','H5','H6','UL','OL','LI','BLOCKQUOTE','PRE','CODE','TABLE','THEAD','TBODY','TR','TH','TD','HR','A']);
  // No raw HTML, SVG, remote image tracking, forms, handlers or styled output.
  for (const node of [...doc.body.querySelectorAll('*')]) {
    if (!allowed.has(node.tagName)) { node.replaceWith(doc.createTextNode(node.textContent || '')); continue; }
    const href = node.tagName === 'A' ? safeURL(node.getAttribute('href')) : '';
    for (const attribute of [...node.attributes]) node.removeAttribute(attribute.name);
    if (href) { node.setAttribute('href', href); node.setAttribute('target', '_blank'); node.setAttribute('rel', 'noopener noreferrer'); }
  }
  return doc.body.innerHTML;
}

function cleanSettings(raw = {}) {
  const result = { ...DEFAULTS };
  for (const name of SETTINGS) {
    const node = $(`#${name}`), value = raw[name];
    if (node.tagName === 'SELECT' && [...node.options].some(option => option.value === value)) result[name] = value;
    else if (name === 'materials' && typeof value === 'string') result[name] = value.slice(0, 600);
    else if (node.type === 'number' && Number.isFinite(Number(value))) result[name] = Math.max(Number(node.min), Math.min(Number(node.max), Number(value)));
  }
  return result;
}
function getSettings() { return cleanSettings(Object.fromEntries(SETTINGS.map(name => [name, $(`#${name}`).value]))); }
function setSettings(settings) { for (const [name, value] of Object.entries(cleanSettings(settings))) $(`#${name}`).value = value; }
function cleanChats(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const result = {};
  for (const item of Object.values(raw).slice(0, 150)) {
    if (!item || !Array.isArray(item.messages)) continue;
    const id = /^[a-zA-Z0-9_-]{1,80}$/.test(item.id) ? item.id : uid();
    const messages = item.messages.filter(message => message && ['user', 'assistant'].includes(message.role) && typeof message.content === 'string').slice(-200).map(message => ({
      role: message.role, content: message.content.slice(0, 48000),
      status: message.status === 'error' || message.status === 'stopped' || message.status === 'pending' ? 'stopped' : 'done',
      files: Array.isArray(message.files) ? message.files.filter(name => typeof name === 'string').slice(0, 3).map(name => name.slice(0, 120)) : [],
      meta: message.meta && typeof message.meta === 'object' ? { ...message.meta, sources: REFERENCE_LIBRARY.filter(source => message.meta.sources?.some?.(ref => ref.id === source.id)).map(source => ({ id: source.id, title: source.title, publisher: source.publisher, url: source.url, kind: source.kind })) } : null,
    }));
    result[id] = { id, title: String(item.title || 'Yeni çalışma').slice(0, 100), updatedAt: Number(item.updatedAt) || Date.now(), settings: cleanSettings(item.settings), messages };
  }
  return result;
}
function load() {
  try {
    const stored = localStorage.getItem(KEY) || localStorage.getItem('balkiz_chats_v2') || localStorage.getItem('balkiz_chats_v1');
    return stored ? cleanChats(JSON.parse(stored).chats || JSON.parse(stored)) : {};
  } catch { storageWarning = true; return {}; }
}
function save(immediate = false) {
  clearTimeout(saving);
  const persist = () => {
    try { localStorage.setItem(KEY, JSON.stringify({ version: 3, chats })); $('#save-status').textContent = 'Bu cihazda kaydedildi'; }
    catch { $('#save-status').textContent = 'Kayıt alanı dolu · yedek al'; if (!storageWarning) toast('Cihazda kayıt yapılamadı. Yedekle düğmesiyle çalışmalarını indir.'); storageWarning = true; }
  };
  if (immediate) persist(); else { $('#save-status').textContent = 'Kaydediliyor…'; saving = setTimeout(persist, 250); }
}
function canNavigate() { if (!busy && !readingFiles) return true; toast('Önce yanıtı durdur veya dosyanın okunmasını bekle.'); return false; }
function createChat(settings = DEFAULTS) {
  if (!canNavigate()) return null;
  if (active) { draftByChat.set(active, e.input.value); filesByChat.set(active, currentFiles); }
  const id = uid(); chats[id] = { id, title: 'Yeni çalışma', updatedAt: Date.now(), settings: cleanSettings(settings), messages: [] };
  active = id; currentFiles = []; e.input.value = ''; retryPayload = null;
  setSettings(settings); save(); render(); closeDrawers(); if (matchMedia('(min-width:721px)').matches) e.input.focus();
  return chats[id];
}
function selectChat(id) {
  if (!canNavigate() || !chats[id]) return;
  draftByChat.set(active, e.input.value); filesByChat.set(active, currentFiles);
  active = id; currentFiles = filesByChat.get(id) || []; e.input.value = draftByChat.get(id) || ''; retryPayload = null;
  setSettings(chats[id].settings); render(); closeDrawers();
}
function history() {
  e.history.replaceChildren(); const query = $('#history-search').value.toLocaleLowerCase('tr');
  const sorted = Object.values(chats).sort((a, b) => b.updatedAt - a.updatedAt);
  $('#chat-count').textContent = sorted.length;
  for (const chat of sorted.filter(chat => chat.title.toLocaleLowerCase('tr').includes(query))) {
    const row = document.createElement('div'); row.className = `history-item${chat.id === active ? ' active' : ''}`;
    const choose = document.createElement('button'); choose.className = 'history-select'; choose.innerHTML = `${icon('chat')}<span>${escapeHTML(chat.title)}</span>`;
    choose.title = chat.title; choose.setAttribute('aria-current', chat.id === active ? 'true' : 'false'); choose.onclick = () => selectChat(chat.id);
    const remove = document.createElement('button'); remove.className = 'history-delete'; remove.innerHTML = icon('close'); remove.setAttribute('aria-label', `${chat.title} çalışmasını sil`);
    remove.onclick = () => {
      if (!canNavigate() || !confirm('Bu çalışma cihazdan silinsin mi?')) return;
      delete chats[chat.id]; filesByChat.delete(chat.id); draftByChat.delete(chat.id);
      if (active === chat.id) { const next = Object.keys(chats)[0]; if (next) selectChat(next); else { active = ''; createChat(); } }
      save(); history();
    };
    row.append(choose, remove); e.history.append(row);
  }
  if (!e.history.children.length) { const empty = document.createElement('p'); empty.className = 'empty-history'; empty.textContent = 'Aradığın çalışma bulunamadı.'; e.history.append(empty); }
}

const IDEAS = [
  { icon: 'spark', title: 'Bir etkinlik tasarla', text: 'Bir fikri uygulanabilir bir akışa dönüştür.', query: 'Kolay bulunan malzemelerle merak uyandıran bir bilim etkinliği planla.', task: 'plan', domain: 'science' },
  { icon: 'flask', title: 'Bir deney geliştir', text: 'Gözlemle, sorgula, güvenle keşfet.', query: 'Sirke ve karbonat tepkimesini çocuklara anlatan düşük riskli, açık kapta bir gözlem etkinliği hazırla. Güvenlik ve bilimsel açıklamayı ekle.', task: 'plan', domain: 'chemistry' },
  { icon: 'book', title: 'Bir konuyu açıkla', text: 'Karmaşık bilgiyi çocukların diline çevir.', query: 'Ay’ın evrelerini çocuklara basit bir modelle açıkla. Yaygın yanlış anlamaları ve modelin sınırlarını belirt.', task: 'explain', domain: 'astronomy' },
  { icon: 'check', title: 'Bir adım ileri taşı', text: 'Yeni fikirler, ölçümler ve farklı yollar keşfet.', query: 'Çocukların kendi hipotezlerini kurabileceği üç düşük riskli deney fikri öner. Her fikrin sınanabilir sorusunu, ölçülecek değişkenini ve neden ilginç olduğunu kısaca açıkla.', task: 'ideas', domain: 'science' },
];
function welcome() {
  e.thread.innerHTML = `<div class="welcome"><div class="welcome-kicker"><span class="small-dot"></span> BİRLİKTE ÖĞRENELİM</div><h1>Küçük bir merak,<br><span>büyük bir keşif.</span></h1><p class="welcome-copy">Çocukların sorularından ilham al. Bilimden sanata etkinlik fikrini paylaş; yaşa uygun, anlaşılır ve uygulanabilir bir plan geliştirelim.</p><div class="welcome-grid">${IDEAS.map((idea, index) => `<button class="idea-card" data-idea="${index}"><div class="idea-icon${index % 2 ? ' warm' : ''}">${icon(idea.icon)}</div><span class="card-arrow">↗</span><b>${idea.title}</b><small>${idea.text}</small></button>`).join('')}</div><p class="topic-label">YA DA BİR ALANDAN BAŞLA</p><div class="topic-chips">${[['physics','Fizik / Fen'],['chemistry','Kimya'],['ai','Yapay zekâ'],['astronomy','Astronomi'],['drama','Yaratıcı drama'],['origami','Origami']].map(([domain, title]) => `<button class="topic-chip" data-domain="${domain}" aria-pressed="${$('#domain').value === domain}">${title}</button>`).join('')}</div><button class="welcome-library" data-library>${icon('book')} ${ACTIVITY_AREAS.length} başlıkta ${TEMPLATES.length} hazır taslağa göz at <span>↗</span></button></div>`;
  e.thread.querySelectorAll('[data-idea]').forEach(button => button.onclick = () => {
    const idea = IDEAS[Number(button.dataset.idea)]; e.input.value = idea.query; $('#task').value = idea.task; $('#domain').value = idea.domain; settingsChanged(); grow(); e.input.focus();
  });
  e.thread.querySelectorAll('[data-domain]').forEach(button => button.onclick = () => {
    $('#domain').value = button.dataset.domain; settingsChanged(); e.input.focus();
  });
  e.thread.querySelector('[data-library]').onclick = () => $('#templates-open').click();
}
function addMessage(message) {
  const article = document.createElement('article'); article.className = `message ${message.role}`;
  article.innerHTML = message.role === 'assistant' ? `<div class="assistant-header"><img src="/assets/balkiz-mark.svg" alt="" width="23" height="23">BALKIZ <span class="response-label"></span></div><div class="message-content"></div><div class="response-footer" hidden></div><div class="response-controls"></div>` : '<div class="message-content"></div>';
  const content = article.querySelector('.message-content');
  if (message.role === 'user') {
    content.textContent = message.content;
    if (message.files?.length) { const attached = document.createElement('span'); attached.className = 'attached-names'; attached.textContent = `Ekler: ${message.files.join(', ')}`; content.append(attached); }
  } else {
    if (message.status === 'pending') content.innerHTML = '<span class="thinking"><span class="thinking-dot"></span> Yanıt hazırlanıyor; deney adımları tamamlanınca gösterilecek…</span>';
    else { content.innerHTML = message.meta?.truncated ? '<p class="error-note">Bu eski yanıt uzunluk sınırında kesildi. Yarım deney tarifi gösterilmiyor; yeni bir kısa fikir iste.</p>' : markdown(message.content); if (message.status === 'stopped' && !message.meta?.truncated) content.insertAdjacentHTML('beforeend', '<p class="error-note">Bu yanıt tamamlanmadı; uygulamadan önce kontrol et.</p>'); }
    if (message.meta) responseMeta(article, message.meta);
    if (message.content && message.status !== 'pending' && !message.meta?.truncated) responseControls(article, message);
  }
  e.thread.append(article); return article;
}
function responseMeta(article, meta) {
  article.querySelector('.response-label').textContent = meta.profile === 'local' ? '· Yerel geliştirme · 0 token' : meta.local ? '· Malzeme bilgisi gerekli' : meta.profile === 'template' ? '· Hazır taslak' : meta.cached ? '· Kaydedilmiş yanıt' : meta.profile === 'compact' ? '· Kısa yanıt' : '';
  const footer = article.querySelector('.response-footer'); footer.hidden = false; footer.replaceChildren();
  if (Array.isArray(meta.sources) && meta.sources.length) {
    const label = document.createElement('div'); label.textContent = meta.profile === 'template' ? 'Taslağın başvuru kaynakları · uygulamadan önce incele' : 'Yanıta eşlik eden başvuru notları · canlı arama yapılmadı'; footer.append(label);
    const links = document.createElement('div'); links.className = 'response-sources';
    for (const ref of meta.sources) {
      const source = REFERENCE_LIBRARY.find(source => source.id === ref.id); if (!source) continue;
      const link = document.createElement('a'); link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = `${source.kind === 'guide' ? 'Kılavuz' : 'Başvuru'} · ${source.publisher} · ${source.title}`; links.append(link);
    }
    footer.append(links);
  } else { const label = document.createElement('div'); label.textContent = meta.profile === 'template' ? 'Gönüllüler için başlangıç taslağı · yaşa ve koşullara göre uyarlanmalı.' : 'Bu soru için özel bir başvuru notu yok; iddiaları ayrıca kontrol et.'; footer.append(label); }
  const note = document.createElement('div'); note.textContent = DISCLAIMER; footer.append(note);
  if (meta.provenance) { const provenance = document.createElement('div'); provenance.textContent = meta.provenance; footer.append(provenance); }
  if (meta.excluded?.length) { const constraints = document.createElement('div'); constraints.textContent = `Korunan isteklerin: ${meta.excluded.join(', ')} önerilmesin.`; footer.append(constraints); }
  if (meta.checked) { const check = document.createElement('div'); check.textContent = 'Biçim, tanımlı dışlamalar ve bazı riskli tarifler kontrol edildi; bilimsel doğruluk onayı değildir.'; footer.append(check); }
  if (meta.usage) { const usage = document.createElement('div'); usage.textContent = `Bu yanıt: ${meta.usage.charged} token · önbellekten ${meta.usage.cached} token`; footer.append(usage); }
  if (meta.trimmed || meta.partialFiles) { const limits = document.createElement('div'); limits.textContent = [meta.trimmed ? meta.novel ? 'Önceki öneriler tekrar edilmemesi için kısa alıntılarla taşındı.' : 'Sohbet bağı korunarak önceki metinden kısa bölümler kullanıldı.' : '', meta.partialFiles ? 'Dosyaların yalnızca seçili metin bölümleri değerlendirildi.' : ''].filter(Boolean).join(' '); footer.append(limits); }
}
function responseControls(article, message) {
  const controls = article.querySelector('.response-controls'); controls.replaceChildren();
  const copy = document.createElement('button'); copy.innerHTML = `${icon('copy')} Kopyala`; copy.onclick = async () => {
    try { await navigator.clipboard.writeText(`${message.content}\n\n${DISCLAIMER}`); toast('Yanıt kopyalandı.'); } catch { toast('Kopyalama izni yok. Yanıt metnini seçip kopyalayabilirsin.'); }
  };
  const download = document.createElement('button'); download.innerHTML = `${icon('down')} İndir`; download.onclick = () => downloadBlob(`${message.content}\n\n---\n${DISCLAIMER}`, 'balkiz-etkinlik.md', 'text/markdown;charset=utf-8');
  controls.append(copy, download);
  for (const [label, prompt] of [['Yapay zekâyla derinleştir', 'Yapay zekâyla bu son etkinliği bilimsel kaynaklara ve seçtiğim derinliğe göre geliştir. Yalnız yeni katkıları yaz; ölçülmüş sonuç uydurma.'], ['Farklı deney', 'Önceki deneyleri tekrarlamadan, farklı bir araştırma sorusu ve farklı düzenek içeren başka bir deney öner. Aynı yaş ve süreyi koru.'], ['Bir adım ileri', 'Bu etkinliği bir adım ileri taşı: yeni bir araştırma sorusu ve bunu sınayabileceğimiz düşük riskli bir deney öner. Tüm planı tekrar yazma.'], ['Daha az malzeme', 'Aynı etkinliği daha az malzemeyle nasıl uygulayabiliriz? Yalnız değişiklikleri ve ilgili güvenliği yaz.'], ['Kılavuz oluştur', 'Bu konuşmada geliştirdiğimiz etkinliği seçili kılavuz formatında birleştir. Son değişiklikleri koru.']]) {
    const button = document.createElement('button'); button.textContent = label;
    button.onclick = () => { if (!canNavigate()) return; if (label === 'Yapay zekâyla derinleştir') { $('#engine').value = 'auto'; settingsChanged(); } e.input.value = prompt; draftByChat.set(active, prompt); grow(); e.input.focus(); };
    controls.append(button);
  }
}
function render() {
  history(); e.thread.replaceChildren(); const chat = chats[active];
  $('#work-title').textContent = chat?.title || 'Yeni çalışma';
  if (chat?.messages.length) chat.messages.forEach(addMessage); else welcome();
  following = true; requestAnimationFrame(() => bottom()); renderFiles(); grow();
}
function nearBottom() { return e.scroll.scrollHeight - e.scroll.scrollTop - e.scroll.clientHeight < 90; }
function bottom() { e.scroll.scrollTop = e.scroll.scrollHeight; $('#jump').hidden = true; }
e.scroll.addEventListener('scroll', () => { following = nearBottom(); $('#jump').hidden = following; }, { passive: true });
$('#jump').onclick = () => { following = true; bottom(); };
function grow() {
  e.input.style.height = 'auto'; e.input.style.height = `${Math.min(e.input.scrollHeight, matchMedia('(max-width:720px)').matches ? 120 : 150)}px`;
  const cooling = Date.now() < cooldownUntil;
  const canLocal = $('#engine').value === 'local' || localIntent({ messages: [{ role: 'user', content: e.input.value }], settings: getSettings(), attachments: currentFiles });
  e.send.disabled = !busy && (readingFiles || (cooling || !navigator.onLine) && !canLocal || !e.input.value.trim());
  e.send.classList.toggle('is-stop', busy); e.send.setAttribute('aria-label', busy ? 'Yanıtı durdur' : cooling ? 'Tekrar deneme süresi bekleniyor' : 'Mesajı gönder');
  e.send.innerHTML = busy ? '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="1" width="14" height="14" rx="2"/></svg>' : icon('arrow');
  $('#attach').disabled = busy || readingFiles; for (const node of document.querySelectorAll('#settings-form input,#settings-form select,#settings-form textarea,#task')) node.disabled = busy;
}
function connection() {
  const node = $('#connection'); node.classList.toggle('busy', busy);
  node.innerHTML = `<span class="small-dot"></span> ${busy ? 'Hazırlanıyor' : navigator.onLine ? 'Hazır' : 'Çevrimdışı'}`;
}
function settingsChanged() {
  if (chats[active]) { chats[active].settings = getSettings(); save(); }
  e.thread.querySelectorAll('[data-domain]').forEach(button => button.setAttribute('aria-pressed', button.dataset.domain === $('#domain').value));
  $('#mode-status').textContent = $('#engine').value === 'local' ? 'Yerel havuz · 0 token' : $('#engine').value === 'ai' ? 'Yapay zekâ · kota kullanır' : $('#detail').value === 'auto' ? 'Otomatik · ekonomik' : $('#detail').value === 'short' ? 'Kısa yanıt' : 'Ayrıntılı yanıt';
}
for (const name of SETTINGS) $(`#${name}`).addEventListener('change', settingsChanged);
e.input.oninput = () => { draftByChat.set(active, e.input.value); grow(); };
e.input.onkeydown = event => {
  // On touch devices Enter keeps its expected newline behavior.
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing && !matchMedia('(pointer:coarse)').matches) { event.preventDefault(); if (!busy) send(); }
};
$('#composer').onsubmit = event => { event.preventDefault(); if (busy) streamController?.abort(); else send(); };
$('#settings-form').onsubmit = event => event.preventDefault();

function setCooldown(seconds) {
  cooldownUntil = Date.now() + seconds * 1000; clearInterval(retryInterval);
  const showWait = () => { const secondsLeft = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000)); $('#mode-status').textContent = secondsLeft ? `Kota bekleniyor · ${secondsLeft} sn · taslakları ücretsiz açabilirsin` : 'Hazır · ekonomik'; };
  showWait();
  retryInterval = setInterval(() => {
    const remaining = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
    document.querySelectorAll('.retry-button').forEach(button => { button.disabled = remaining > 0 || busy; button.textContent = remaining ? `${remaining} sn sonra tekrar deneyebilirsin` : 'Tekrar dene'; });
    showWait(); grow(); if (!remaining) { clearInterval(retryInterval); retryInterval = null; }
  }, 500);
}
function requestMessages(messages) {
  const usable = messages.filter(message => message.content.trim() && (message.status === 'done' || message.role === 'assistant' && ['stopped', 'error'].includes(message.status)));
  const selected = usable.length > 60 ? [...usable.slice(0, 2), ...usable.slice(-58)] : usable;
  return selected.map(({ role, content, status }, index) => ({ role, content: (status !== 'done' ? '[Tamamlanmamış önceki yanıt; eksik adımlar uygulanmamalı.]\n' : '') + (index !== selected.length - 1 && content.length > 15800 ? content.slice(0, 12000) + '\n[…]\n' + content.slice(-3700) : content) }));
}
function requestMessagesWithPreferences(messages) {
  const wire = requestMessages(messages), constraints = conversationConstraints(messages);
  const statements = { 'acid-base': 'Asit baz deneyi istemiyorum.', 'food-dye': 'Gıda boyası kullanma.', crystals: 'Kristal deneyi istemiyorum.' };
  if (constraints.excluded.length) wire.unshift({ role: 'user', content: 'Bu çalışmada korunan önceki kullanıcı tercihleri: ' + constraints.excluded.map(id => statements[id]).join(' ') });
  return wire;
}
async function send(retry = false) {
  if (busy || readingFiles) return;
  const chat = chats[active]; if (!chat) return;
  const draft = e.input.value.trim();
  const input = { messages: [...chat.messages.filter(message => message.content.trim() && (message.role === 'user' || message.status === 'done' && !message.meta?.truncated)).map(({role,content}) => ({role,content})), { role: 'user', content: draft }], settings: getSettings(), attachments: currentFiles };
  const memory = input.settings.memory === 'device' ? Object.values(chats).sort((a,b) => b.updatedAt - a.updatedAt).slice(0,30).flatMap(item => item.messages.slice(-12).filter(message => message.status === 'done' && !message.meta?.truncated).map(message => ({role:message.role,content:message.content.slice(0,1800)}))) : chat.messages.filter(message => message.status === 'done' && !message.meta?.truncated);
  const local = !retry && draft ? buildLocalReply(input, memory) : null;
  if (!local && (Date.now() < cooldownUntil || !navigator.onLine)) { toast('Yapay zekâ şu an kullanılamıyor; malzeme bulma ve yerel fikir havuzu kullanılabilir.'); return; }
  if (!local && input.settings.engine === 'local') { toast('Bu istek hazır havuzda karşılanamadı. Fikir havuzundan seç veya Otomatik/Yapay zekâ moduna geç.'); return; }
  let payload;
  if (retry) {
    if (!retryPayload || retryPayload.chatId !== active) return;
    payload = retryPayload.payload;
    const last = chat.messages.at(-1); if (last?.role === 'assistant' && last.status !== 'done') { chat.messages.pop(); e.thread.lastElementChild?.remove(); }
  } else {
    const text = e.input.value.trim(); if (!text) return;
    if (e.thread.querySelector('.welcome')) e.thread.replaceChildren();
    const user = { role: 'user', content: text, status: 'done', files: currentFiles.map(file => file.name) }; chat.messages.push(user); addMessage(user);
    if (chat.messages.length === 1) chat.title = text.replace(/\s+/g, ' ').slice(0, 46);
    chat.settings = getSettings(); chat.updatedAt = Date.now();
    // Original document bytes and extracted text are kept in memory only.
    payload = { sessionId, settings: chat.settings, attachments: currentFiles.map(({ name, text }) => ({ name, text })), messages: requestMessagesWithPreferences(chat.messages) };
    retryPayload = { chatId: active, payload }; e.input.value = ''; draftByChat.delete(active); save(); history(); $('#work-title').textContent = chat.title;
  }
  if (local) {
    chat.messages.push({ role: 'assistant', content: local.text, status: 'done', meta: local.meta });
    retryPayload = null; chat.updatedAt = Date.now(); save(); render();
    $('#mode-status').textContent = 'Yerel geliştirme · 0 token'; announce('Yerel öneri hazır. Yapay zekâ kotası kullanılmadı.'); return;
  }
  busy = true; following = true; bottom(); grow(); connection();
  const answer = { role: 'assistant', content: '', status: 'pending', meta: null }; chat.messages.push(answer);
  const article = addMessage(answer), box = article.querySelector('.message-content');
  streamController = new AbortController();
  const timeout = setTimeout(() => streamController?.abort(), 65000);
  let paintTimer, finished = false;
  const paint = () => { paintTimer = null; box.classList.add('streaming-content'); box.textContent = answer.content; if (following) bottom(); };
  try {
    const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: streamController.signal });
    if (!response.ok) {
      let data = {}; try { data = await response.json(); } catch { /* generic HTTP failure */ }
      const wait = Math.min(86400, Number(data.retryAfter || response.headers.get('retry-after')) || 0);
      if (wait) setCooldown(wait);
      throw new Error(data.error || 'Yanıt alınamadı. Tekrar deneyebilirsin.');
    }
    if (!response.body) throw new Error('Yanıt akışı başlatılamadı.');
    for await (const raw of readSSE(response.body)) {
      const event = JSON.parse(raw);
      if (event.meta) {
        answer.meta = event.meta; responseMeta(article, event.meta);
        $('#mode-status').textContent = event.meta.profile === 'local' ? 'Yerel geliştirme · 0 token' : event.meta.cached ? 'Kaydedilmiş yanıt' : event.meta.novel ? 'Yeni deney · kısıtların korunuyor' : event.meta.profile === 'compact' ? 'Kalan bütçeye göre kısa yanıt' : 'Otomatik · ekonomik';
      }
      if (event.delta) { answer.content += event.delta; if (!paintTimer) paintTimer = setTimeout(paint, 65); }
      if (event.error) { if (event.retryAfter) setCooldown(Math.min(86400, Number(event.retryAfter) || 0)); throw new Error(event.error); }
      if (event.done) { if (event.usage) { answer.meta = { ...answer.meta, usage: event.usage }; responseMeta(article, answer.meta); } finished = true; if (event.truncated) { answer.meta = { ...answer.meta, truncated: true }; } break; }
    }
    if (!finished) throw new Error('Bağlantı kesildi; bu yanıt tamamlanmadı.');
    clearTimeout(paintTimer); box.classList.remove('streaming-content'); box.innerHTML = markdown(answer.content);
    answer.status = answer.meta?.truncated ? 'stopped' : 'done';
    if (answer.meta?.truncated) box.insertAdjacentHTML('beforeend', '<p class="error-note">Yanıt uzunluk sınırına ulaştı. Eksik planı uygulama; belirli bir bölümü ayrıntılandırmamı iste.</p>');
    responseControls(article, answer); announce('BALKIZ yanıtı tamamlandı.'); retryPayload = null;
  } catch (error) {
    clearTimeout(paintTimer); box.classList.remove('streaming-content'); box.innerHTML = markdown(answer.content);
    answer.status = streamController.signal.aborted ? 'stopped' : 'error';
    const note = document.createElement('div'); note.className = 'error-note'; note.textContent = streamController.signal.aborted ? 'Yanıt durduruldu veya süre doldu. Bu yanıt tamamlanmadı.' : error.message; box.append(note);
    const retryButton = document.createElement('button'); retryButton.className = 'retry-button'; retryButton.textContent = 'Tekrar dene'; retryButton.onclick = () => send(true); retryButton.disabled = Date.now() < cooldownUntil;
    box.append(retryButton); if (answer.content) responseControls(article, answer); announce(note.textContent);
  } finally {
    clearTimeout(timeout); clearTimeout(paintTimer); busy = false; streamController = null; chat.updatedAt = Date.now(); save(); history(); grow(); connection(); if (following) bottom();
  }
}

function renderFiles() {
  $('#file-list').replaceChildren();
  currentFiles.forEach((file, index) => {
    const chip = document.createElement('div'); chip.className = 'file-chip';
    chip.innerHTML = `${icon('file')}<span>${escapeHTML(file.name)}</span><small>${file.partial ? 'kısmi metin' : `${Math.ceil(file.text.length / 1000)} bin kar.`}</small>`;
    chip.title = `${file.name}: yalnızca seçili metin bölümleri gönderilir`;
    const remove = document.createElement('button'); remove.type = 'button'; remove.innerHTML = icon('close'); remove.setAttribute('aria-label', `${file.name} dosyasını kaldır`);
    remove.onclick = () => { if (busy || readingFiles) return; currentFiles.splice(index, 1); renderFiles(); };
    chip.append(remove); $('#file-list').append(chip);
  });
}
$('#attach').onclick = () => { toast('En fazla 3 dosya · dosya başına 5 MB. Metin cihazında çıkarılır; seçili bölümler yapay zekâya gönderilir. Kişisel veri ekleme.'); $('#files').click(); };
$('#files').onchange = async event => {
  const selected = [...event.target.files]; event.target.value = ''; if (!selected.length || busy || readingFiles) return;
  if (selected.length + currentFiles.length > FILE_LIMITS.count) { toast('En fazla 3 dosya ekleyebilirsin.'); return; }
  if (selected.reduce((sum, file) => sum + file.size, 0) + currentFiles.reduce((sum, file) => sum + file.size, 0) > FILE_LIMITS.totalBytes) { toast('Dosyaların toplamı en fazla 10 MB olabilir.'); return; }
  readingFiles = true; grow(); $('#mode-status').textContent = 'Dosya cihazında okunuyor…';
  try {
    for (const file of selected) {
      try {
        const extracted = await extractFile(file);
        if (currentFiles.reduce((sum, item) => sum + item.text.length, 0) + extracted.text.length > FILE_LIMITS.totalCharacters) { toast('Dosya metinlerinin toplamı 48.000 karakteri aşamaz.'); continue; }
        currentFiles.push(extracted); renderFiles();
      } catch (error) { toast(`${file.name}: ${error.message}`); }
    }
  } finally { readingFiles = false; grow(); settingsChanged(); }
};
function downloadBlob(content, name, type) {
  const blob = new Blob([content], { type }); const link = document.createElement('a'); const url = URL.createObjectURL(blob);
  link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 2000);
}
$('#export-work').onclick = () => {
  const chat = chats[active]; if (!chat?.messages.length) { toast('İndirmek için önce bir çalışma oluştur.'); return; }
  const text = `# ${chat.title}\n\n${chat.messages.map(message => `## ${message.role === 'user' ? 'Sen' : 'BALKIZ'}${message.status !== 'done' ? ' · tamamlanmamış yanıt' : ''}\n\n${message.content}`).join('\n\n')}\n\n---\n${DISCLAIMER}`;
  downloadBlob(text, 'balkiz-calisma.md', 'text/markdown;charset=utf-8');
};
$('#backup').onclick = () => downloadBlob(JSON.stringify({ version: 3, chats }, null, 2), 'balkiz-calismalar.json', 'application/json');
$('#import-open').onclick = () => { if (canNavigate()) $('#import-file').click(); };
$('#import-file').onchange = async event => {
  const file = event.target.files[0]; event.target.value = ''; if (!file) return;
  if (file.size > 5 * 1024 * 1024) { toast('Yedek dosyası en fazla 5 MB olabilir.'); return; }
  try {
    const data = JSON.parse(await file.text()), restored = cleanChats(data.chats || data);
    if (!Object.keys(restored).length) throw new Error('Yedekte geçerli çalışma yok.');
    if (Object.keys(chats).length + Object.keys(restored).length > 150) throw new Error('Bir defada en fazla 150 çalışma saklanabilir. Önce yedek alıp eski çalışmaları kaldır.');
    for (const chat of Object.values(restored)) { const id = uid(); chats[id] = { ...chat, id }; }
    save(true); history(); toast('Yedek yüklendi; mevcut çalışmaların korundu.');
  } catch (error) { toast(error.message || 'Yedek okunamadı.'); }
};
$('#clear-history').onclick = () => { if (canNavigate() && confirm('Bu cihazdaki tüm çalışmalar silinsin mi? Önce yedek almak isteyebilirsin.')) { chats = {}; active = ''; draftByChat.clear(); filesByChat.clear(); createChat(); save(true); } };
$('#history-search').oninput = history;
$('#new-chat').onclick = () => createChat();
$('#theme').onclick = () => {
  const dark = document.documentElement.dataset.theme !== 'dark'; document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  try { localStorage.setItem(THEME, dark ? 'dark' : 'light'); } catch { /* theme still applies */ }
};

let drawerReturnFocus;
function closeDrawers() {
  e.sidebar.classList.remove('drawer-open'); $('#context-panel').classList.remove('drawer-open'); $('#scrim').hidden = true;
  e.sidebar.inert = matchMedia('(max-width:720px)').matches; $('#context-panel').inert = matchMedia('(max-width:1000px)').matches;
  $('#menu').setAttribute('aria-expanded', 'false'); $('#context-toggle').setAttribute('aria-expanded', 'false');
  if (drawerReturnFocus) { drawerReturnFocus.focus(); drawerReturnFocus = null; }
}
function openDrawer(target, trigger) {
  closeDrawers(); const node = $(target); node.inert = false; node.classList.add('drawer-open'); $('#scrim').hidden = false;
  drawerReturnFocus = trigger; trigger.setAttribute('aria-expanded', 'true'); node.querySelector('button,select,input').focus();
}
$('#menu').onclick = () => openDrawer('#sidebar', $('#menu'));
$('#context-toggle').onclick = () => openDrawer('#context-panel', $('#context-toggle'));
$('#close-menu').onclick = $('#close-context').onclick = $('#scrim').onclick = closeDrawers;
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeDrawers();
  if (event.key !== 'Tab' || $('#scrim').hidden) return;
  const drawer = document.querySelector('.drawer-open'); if (!drawer) return;
  const nodes = [...drawer.querySelectorAll('button,input,select,textarea,a')].filter(node => !node.disabled && node.getClientRects().length);
  const first = nodes[0], last = nodes.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
let lastLayoutWidth = window.innerWidth;
function fitViewport() {
  const viewport = window.visualViewport;
  document.documentElement.style.setProperty('--app-height', `${viewport?.height || window.innerHeight}px`);
  document.documentElement.style.setProperty('--app-top', `${viewport?.offsetTop || 0}px`);
  if (following) requestAnimationFrame(bottom);
}
window.addEventListener('resize', () => {
  if (Math.abs(window.innerWidth - lastLayoutWidth) > 50) closeDrawers();
  lastLayoutWidth = window.innerWidth; grow(); fitViewport();
});
window.visualViewport?.addEventListener('resize', fitViewport);
window.visualViewport?.addEventListener('scroll', fitViewport);
fitViewport();
$('#templates-open').onclick = () => { if (!canNavigate()) return; closeDrawers(); $('#library-dialog').showModal(); };
$('#sources-open').onclick = () => { closeDrawers(); renderSources(); $('#sources-dialog').showModal(); };
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.dialog-close').onclick = () => dialog.close();
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
}
function renderTemplates() {
  const query = normalize($('#template-search').value.trim()), category = $('#template-category').value;
  const visible = TEMPLATES.filter(template => (category === 'all' || template.domain === category) && normalize(`${template.title} ${template.summary} ${activityLabel(template.domain)} ${template.materials || ''}`).includes(query));
  const list = $('#template-list'); list.replaceChildren();
  $('#template-results').textContent = `${visible.length} / ${TEMPLATES.length} taslak · hazır taslak açmak kota kullanmaz`;
  for (const template of visible) {
    const card = document.createElement('article'); card.className = 'template-card'; card.innerHTML = `<span class="template-category">${escapeHTML(activityLabel(template.domain))}${template.difficulty === 'advanced' ? ' · İleri' : ''}</span><div class="template-meta">${template.age} yaş · ${template.duration} dakika</div><h3>${escapeHTML(template.title)}</h3><p>${escapeHTML(template.summary)}</p>`;
    const button = document.createElement('button'); button.textContent = 'Taslağı aç'; button.setAttribute('aria-label', `${template.title} taslağını aç`); button.onclick = () => {
      if (!canNavigate()) return;
      $('#library-dialog').close(); const chat = createChat({ ...DEFAULTS, domain: template.domain, difficulty: template.difficulty || 'intro', age: template.age, duration: template.duration, materials: template.materials || '' }); if (!chat) return;
      chat.title = template.title; chat.messages.push({ role: 'assistant', content: template.content, status: 'done', meta: { sources: SOURCES.filter(source => template.sourceIds?.includes(source.id)).map(source => ({ id: source.id })), profile: 'template' } });
      save(); render(); toast('Taslak açıldı. İndirip kullanabilir veya bir mesajla geliştirebilirsin.');
    }; card.append(button); list.append(card);
  }
  if (!visible.length) {
    const empty = document.createElement('p'); empty.className = 'template-empty'; empty.textContent = 'Bu aramada taslak bulunamadı. Başka bir sözcük dene veya tüm başlıkları seç.'; list.append(empty);
  }
}
$('#template-search').addEventListener('input', renderTemplates);
$('#template-category').addEventListener('change', renderTemplates);
renderTemplates();
$('#source-category').replaceChildren(new Option('Tüm alanlar', 'all'), ...ACTIVITY_AREAS.map(area => new Option(area.label, area.id)));
let sourceLimit = 24;
function sourceLabel(source) { return source.kind === 'guide' ? 'Etkinlik kılavuzu / ek' : source.kind === 'simulation' ? 'Simülasyon' : source.kind === 'institution' ? 'Kurum' : 'Bilimsel dayanak'; }
function renderSources(reset = true) {
  if (reset) sourceLimit = 24;
  const words = normalize($('#source-search').value.trim()).split(/\s+/).filter(Boolean);
  const kind = $('#source-kind').value, category = $('#source-category').value;
  const visible = REFERENCE_LIBRARY.filter(source => (kind === 'all' || source.kind === kind) && (category === 'all' || source.domain === category) && words.every(word => normalize(`${source.title} ${source.publisher} ${activityLabel(source.domain)} ${(source.keywords || []).join(' ')} ${source.facts || ''} ${source.goal || ''} ${source.development || ''} ${source.materials || ''}`).includes(word)));
  $('#source-results').textContent = `${visible.length} sonuç · ${SOURCES.length} başvuru kaynağı, ${GUIDES.length} kılavuz/ek · katalog ${KNOWLEDGE_VERSION}`;
  const list = $('#source-list'); list.replaceChildren();
  for (const source of visible.slice(0, sourceLimit)) {
    const card = document.createElement('article'); card.className = 'source-card';
    card.innerHTML = `<div class="source-card-meta">${escapeHTML(sourceLabel(source))} · ${escapeHTML(activityLabel(source.domain))}</div><a class="source-entry" href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer"><b>${escapeHTML(source.title)} ↗</b><span>${escapeHTML(source.publisher)}</span></a><p>${escapeHTML(source.kind === 'guide' ? source.goal || source.scope : source.facts)}</p>`;
    if (source.kind === 'guide') {
      const idea = document.createElement('p'); idea.textContent = `Geliştirme fikri: ${source.development}`; card.append(idea);
      const scope = document.createElement('p'); scope.className = 'source-date'; scope.textContent = source.scope; card.append(scope);
      if (source.warning) { const warning = document.createElement('p'); warning.className = 'source-warning'; warning.textContent = source.warning; card.append(warning); }
      const links = document.createElement('div'); links.className = 'response-sources';
      for (const id of source.sourceIds) {
        const ref = SOURCES.find(item => item.id === id); if (!ref) continue;
        const link = document.createElement('a'); link.href = ref.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = ref.title; links.append(link);
      }
      card.append(links);
    }
    const button = document.createElement('button'); button.className = 'source-develop'; button.textContent = source.kind === 'guide' ? 'Bu etkinliği geliştir' : 'Bu konuyla etkinlik oluştur';
    button.onclick = () => {
      if (!canNavigate()) return;
      const settings = getSettings(); $('#sources-dialog').close();
      const chat = createChat({ ...settings, task: 'plan', domain: source.domain, materials: source.materials || settings.materials }); if (!chat) return;
      chat.title = source.title; save(); render();
      e.input.value = source.kind === 'guide' ? `“${source.title}” etkinliğini yeni keşif soruları, farklı varyasyonlar ve seçtiğim bilimsel derinliğe uygun bir akışla geliştir.` : `“${source.title}” konusuyla seçtiğim yaş ve bilimsel derinliğe uygun yeni bir etkinlik oluştur.`;
      draftByChat.set(chat.id, e.input.value); grow(); e.input.focus();
    };
    const reviewed = document.createElement('p'); reviewed.className = 'source-date'; reviewed.textContent = `Not tarihi: ${source.reviewed || KNOWLEDGE_VERSION}`; card.append(reviewed);
    card.append(button); list.append(card);
  }
  $('#source-more').hidden = visible.length <= sourceLimit;
  if (!visible.length) { const empty = document.createElement('p'); empty.textContent = 'Bu aramada kaynak bulunamadı. Konuyu veya filtreleri değiştir.'; list.append(empty); }
}
for (const name of ['source-search', 'source-kind', 'source-category']) $(`#${name}`).addEventListener(name === 'source-search' ? 'input' : 'change', () => renderSources());
$('#source-more').onclick = () => { sourceLimit += 24; renderSources(false); };
window.addEventListener('online', () => { connection(); grow(); });
window.addEventListener('offline', () => { connection(); grow(); toast('Çevrimdışı kütüphane ve kaydedilmiş çalışmalar kullanılabilir.'); });
window.addEventListener('pagehide', () => save(true));
try { document.documentElement.dataset.theme = localStorage.getItem(THEME) === 'dark' ? 'dark' : 'light'; } catch { /* defaults to light */ }
$('#year').textContent = new Date().getFullYear();
chats = load(); active = Object.values(chats).sort((a, b) => b.updatedAt - a.updatedAt)[0]?.id || '';
if (active) { setSettings(chats[active].settings); render(); } else createChat();
closeDrawers(); connection();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => { /* online app remains usable */ });

// Local materials and original experiment proposals. No model/search API call on open.
$('#material-store').replaceChildren(...STORES.map(store => new Option(store.name, store.id)));
function renderMaterials() {
  const words = normalize($('#material-search').value).split(/\s+/).filter(Boolean), store = $('#material-store').value;
  const visible = MATERIALS.filter(item => words.every(word => normalize(`${item.name} ${item.query} ${item.where}`).includes(word)));
  $('#material-results').textContent = `${visible.length} / ${MATERIALS.length} malzeme · arama ve seçim 0 token`;
  const list = $('#material-list'); list.replaceChildren();
  for (const item of visible) {
    const card = document.createElement('article'); card.className = 'source-card';
    card.innerHTML = `<h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.where)}</p><p class="source-warning">${escapeHTML(item.warning)}</p>`;
    const link = document.createElement('a'); link.className = 'source-develop'; link.href = marketLink(item.query,store); link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Mağazada araştır ↗';
    const add = document.createElement('button'); add.className = 'source-develop'; add.textContent = 'Malzemelerime ekle'; add.onclick = () => { if (!canNavigate()) return; const node = $('#materials'); const next = [node.value.trim(), item.name].filter(Boolean).join('; '); if (next.length > 600) { toast('Malzeme listesi dolu.'); return; } node.value = next; settingsChanged(); toast('Malzeme eklendi. Ürün uygunluğunu ayrıca kontrol et.'); };
    card.append(link,add); list.append(card);
  }
}
function renderIdeas() {
  const words = normalize($('#idea-search').value).split(/\s+/).filter(Boolean);
  $('#ideas-description').textContent = `${EXPERIMENT_BANK.length} özgün araştırma fikri, ${LOCAL_VARIANT_COUNT} yöntem/analiz uyarlaması. Bunlar farklılığı doğrulanmış deney sonuçları değildir. Kotasız açılır; her uygulama öğretmen ön denemesi gerektirir.`;
  const list = $('#idea-list'); list.replaceChildren();
  for (const card of EXPERIMENT_BANK.filter(card => words.every(word => normalize(`${card.title} ${card.question} ${activityLabel(card.domain)} ${card.materials.map(id => MATERIALS.find(item => item.id === id)?.name).join(' ')}`).includes(word)))) {
    const node = document.createElement('article'); node.className = 'template-card';
    node.innerHTML = `<span class="template-category">${escapeHTML(activityLabel(card.domain))} · ${card.minAge}+ yaş</span><h3>${escapeHTML(card.title)}</h3><p>${escapeHTML(card.question)}</p>`;
    const open = document.createElement('button'); open.textContent = 'Kotasız aç'; open.onclick = () => {
      if (!canNavigate()) return;
      const age = Number($('#age').value.split('–')[0].replace('+',''));
      if (age < card.minAge) { toast(`Bu fikir ${card.minAge}+ yaş için. Uygun yaş grubunu seç veya başka fikir aç.`); return; }
      $('#ideas-dialog').close(); $('#domain').value = card.domain; $('#engine').value = 'auto'; settingsChanged(); e.input.value = `${activityLabel(card.domain)} alanında ${card.title} için kılavuz yaz.`; grow(); send();
    }; node.append(open); list.append(node);
  }
}
$('#materials-open').onclick = () => { closeDrawers(); renderMaterials(); $('#materials-dialog').showModal(); };
$('#ideas-open').onclick = () => { closeDrawers(); renderIdeas(); $('#ideas-dialog').showModal(); };
$('#material-search').oninput = renderMaterials; $('#material-store').onchange = renderMaterials; $('#idea-search').oninput = renderIdeas;
