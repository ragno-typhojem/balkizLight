import { normalize } from './retrieval.js';
import { conversationConstraints } from './constraints.js';

const short = (value, cap) => String(value || '').replace(/\s+/g, ' ').trim().slice(0,cap);
function field(text, labels, cap) {
  const lines = text.split('\n'), index = lines.findIndex(line => labels.some(label => normalize(line.replace(/[\*#]/g,'')).trim().startsWith(label)));
  if (index < 0) return '';
  const value = lines[index].includes(':') ? lines[index].replace(/^[^:]+:\s*/,'') : lines.slice(index+1).find(line=>line.trim() && !/^#/.test(line)) || '';
  return short(value.replace(/^\*+\s*/,''),cap);
}
// Extractive working memory, not a generated summary or a source of scientific truth.
export function workingMemory(messages, settings = {}, selection = '') {
  const users = messages.filter(message => message.role === 'user');
  const answers = messages.filter(message => message.role === 'assistant' && message.content.trim() && !/^\[(?:Tamamlanmamış|Önceki yanıt riskli)/.test(message.content));
  const latest = answers.at(-1)?.content || '';
  const hasMaterials = message => field(message.content,['malzemeler','etkinlikte kullanilacak malzemeler'],20);
  const sourceMessage = answers.findLast(message=>field(message.content,['arastirma sorusu','etkinligin amaci'],20) || /^#{1,3}\s/m.test(message.content) && hasMaterials(message)) || answers.findLast(hasMaterials) || answers.at(-1);
  let current = sourceMessage?.content || latest;
  const candidates = [selection,...messages.slice(messages.indexOf(sourceMessage)+1).filter(message=>message.role==='user').reverse().map(message=>message.content)];
  const expression = /^(?:([1-6])(?:[.)'’\s]|$)|(?:birinci|ikinci|ucuncu|dorduncu|besinci|altinci))/;
  const selectedText = candidates.map(normalize).find(text=>expression.test(text)) || '';
  const chosen = selectedText.match(expression);
  const ordinal = chosen?.[1] ? Number(chosen[1]) : chosen ? ['birinci','ikinci','ucuncu','dorduncu','besinci','altinci'].findIndex(word=>selectedText.startsWith(word))+1 : 0;
  if (ordinal) {
    const options = current.split(/(?=^#{2,4}\s+\d+[.)]\s)/m);
    const selected = options.find(section=>new RegExp(`^#{2,4}\\s+${ordinal}[.)]\\s`).test(section));
    if (selected) current = selected;
  }
  const heading = current.split('\n').find(line => /^#{1,3}\s/.test(line));
  const update = sourceMessage?.content !== latest ? latest : '';
  const question = field(update,['arastirma sorusu','etkinligin amaci'],150) || field(current,['arastirma sorusu','etkinligin amaci'],150);
  const materials = field(update,['malzemeler','etkinlikte kullanilacak malzemeler'],200) || field(current,['malzemeler','etkinlikte kullanilacak malzemeler'],200);
  const steps = current.split('\n').filter(line => /^\d+[.)]\s/.test(line)).slice(0,2).map(line=>short(line,140));
  const preferences = users.slice(-8).map(message=>message.content.split(/\n|(?<=[.!?])\s+/).filter(line=>/yas|yaş|dakika|katilimci|katılımcı|malzeme|tedarik|butce|bütçe|kullanma|olmasin|olmasın|kimya|fizik|ileri|zor|kolay|alerji|engelli|laboratuvar|gozetim|gözetim/i.test(line)).map(line=>short(line,140))).flat().slice(-5);
  const activity = { title: short(heading?.replace(/^#+\s*/,''),100), question, materials, steps };
  if (!activity.title && current) activity.title = short(current,140);
  const seen = answers.slice(-5).flatMap(message=>{
    const headings = message.content.split('\n').filter(line=>/^#{1,3}\s/.test(line));
    return (headings.length ? headings : [message.content.split('\n').find(line=>line.trim())]).map(line=>short(line?.replace(/^#+\s*/,''),90));
  }).slice(-6);
  return { activity, latestUpdate: sourceMessage?.content !== latest ? short(latest,220) : '', preferences, seen: [...new Set(seen)], excluded: conversationConstraints(messages).labels, procurement: settings.procurement || 'obtainable' };
}
export function memoryContext(messages, settings, novel, cap = 1000, selection = '') {
  const memory = workingMemory(messages,settings,selection);
  const record = novel ? { avoid: memory.seen, preferences: memory.preferences.slice(-3), excluded: memory.excluded } : memory;
  let text = JSON.stringify(record);
  if (text.length > cap) { if (record.activity) record.activity.steps = []; record.preferences = record.preferences.slice(-2); record.latestUpdate = short(record.latestUpdate,120); text = JSON.stringify(record); }
  if (text.length > cap) { if (record.activity) { record.activity.materials = short(record.activity.materials,100); record.activity.question = short(record.activity.question,100); } record.seen = record.seen?.slice(-2); record.avoid = record.avoid?.slice(-3); text = JSON.stringify(record); }
  return text.length <= cap ? text : JSON.stringify({ activity: { title: memory.activity.title, question: memory.activity.question }, excluded: memory.excluded });
}

export function turnSettings(content, current) {
  const settings = { ...current }, text = normalize(content);
  for (const [domain,word] of [['physics','fizik'],['chemistry','kimya'],['astronomy','astronomi'],['math','matematik'],['ai','yapay zeka'],['microbiology','biyoloji'],['robotics','robot'],['drama','drama'],['music','muzik'],['origami','origami'],['literature','edebiyat'],['art','resim']]) {
    if (text === word || new RegExp(`(?:^|\\s)${word}(?:da|de|ta|te|ya|ye|a|e)? (?:alan|deney|etkinlik|istiyorum|icin|gec|gidelim|yapalim)`).test(text)) settings.domain = domain;
  }
  if (/tedarik edem|temin edem|satin alam|yalniz elimizdek|sadece elimizdek/.test(text)) settings.procurement = 'owned';
  else if (/tedarik|temin edebilir|satin alabilir|malzeme alabilir|kimyasallari alabilir/.test(text)) settings.procurement = 'obtainable';
  if (/daha zor|daha gelismis|ileri duzey|ilkokul seviyesinde olmasin|basit olmasin/.test(text)) settings.difficulty = 'advanced';
  else if (/daha kolay|basitlestir|baslangic seviyesi/.test(text)) settings.difficulty = 'intro';
  const age = text.match(/(\d{1,2})(?:\s*[–-]\s*\d{1,2})?\s*yas/);
  if (age) settings.age = Number(age[1]) < 9 ? '6–8' : Number(age[1]) < 13 ? '9–12' : Number(age[1]) < 16 ? '13–15' : '16+';
  const duration = text.match(/(\d{1,3})\s*(?:dk|dakika)/), count = text.match(/(\d{1,3})\s*(?:kisi|katilimci|ogrenci|cocuk)/);
  if (duration) settings.duration = Math.max(10,Math.min(180,Number(duration[1])));
  if (count) settings.participants = Math.max(1,Math.min(200,Number(count[1])));
  return settings;
}
