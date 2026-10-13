import { normalize } from './retrieval.js';
import { violatesExclusions } from './constraints.js';

const string = { type: 'string' }, list = { type: 'array', items: string };
const fields = { title: string, question: string, materials: list, steps: list, explanation: string, expected: string, safety: list, limits: string };
export function outputFormat(experiment, model) {
  const schema = experiment ? { type: 'object', properties: fields, required: Object.keys(fields), additionalProperties: false } : { type: 'object', properties: { reply: string }, required: ['reply'], additionalProperties: false };
  return /^(openai\/gpt-oss-(?:120b|20b)|qwen\/qwen3\.8-27b)$/.test(model) ? { type: 'json_schema', json_schema: { name: experiment ? 'experiment_card' : 'science_reply', strict: true, schema } } : { type: 'json_object' };
}
export class OutputError extends Error {}
const hazardous = /\bhcl\b|\bnaoh\b|hidroklorik|sodyum hidroksit|kostik|sud kostik|\bkursun\b(?!\s*kalem)|potasyum permanganat|wimshurst|tesla bobin|sebeke gerilim|yuksek gerilim|kuru buz|basincli (?:kap|roket)|canli bakteri kulturu/;
export function riskyRecipe(text) {
  const value = normalize(text);
  return /gozleri(?:nizi|ni)? kapali tut|gozlerini kapat.{0,30}koru|yutulmasi.{0,30}risk.{0,10}(?:olusturmaz|yok)/.test(value) || hazardous.test(value) && /karistir|ekle|pipet|isit|cozun|hazirla|dok|bagla|kurun|\b\d+\s*(?:ml|mg|g|molar|m)\b/.test(value);
}
function validateString(value, name, cap = 1800) {
  if (typeof value !== 'string' || !value.trim() || value.length > cap) throw new OutputError(`Yanıtın ${name} bölümü eksik veya fazla uzun; yarım tarif gösterilmedi.`);
  return value.trim();
}
export function validateAndRender(raw, prepared) {
  let data; try { data = JSON.parse(raw); } catch { throw new OutputError('Yanıt tamamlanmış biçimde alınamadı; yarım deney tarifi gösterilmedi.'); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new OutputError('Yanıt biçimi geçersiz.');
  if (!prepared.experimentCard) {
    const reply = validateString(data.reply, 'metin', 18000);
    if (riskyRecipe(reply)) throw new OutputError('Yanıt riskli veya tutarsız uygulama adımları içerdiği için gösterilmedi. Düşük riskli bir düzenek iste.');
    return reply;
  }
  for (const field of ['title', 'question', 'explanation', 'expected', 'limits']) validateString(data[field], field, 1200);
  for (const field of ['materials', 'steps', 'safety']) {
    if (!Array.isArray(data[field]) || !data[field].length || data[field].length > (field === 'materials' ? 10 : 6)) throw new OutputError('Deney kartının malzeme, yöntem veya güvenlik bölümü eksik.');
    data[field] = data[field].map(value => validateString(value, field, 600));
  }
  const active = [data.title, data.question, ...data.materials, ...data.steps].join('\n');
  if (violatesExclusions(active, prepared.constraints)) throw new OutputError(`Yanıt istemediğin konuyu/malzemeyi içerdiği için gösterilmedi: ${prepared.constraints.labels.join(', ')}. Kısıtların sonraki istekte korunacak.`);
  const recipe = [...data.materials, ...data.steps, ...data.safety].join('\n');
  if (riskyRecipe(recipe) || hazardous.test(normalize(data.materials.join(' ')))) throw new OutputError('Yanıt çocuk etkinliği için riskli madde veya uygulama içerdiği için gösterilmedi. Farklı, düşük riskli bir düzenek iste.');
  const entire = normalize(JSON.stringify(data));
  const expected = normalize(data.expected);
  if (/(?:tuzlu|sofra tuzu|sodyum klorur).{0,80}(?:bazik|mavi)/.test(expected) && !/yapmaz|olmaz|degil|gostermez/.test(expected)) throw new OutputError('Tuzun pH veya renk etkisi kaynak olmadan kesinleştirildi; tarif gösterilmedi.');
  if (/sodyum bikarbonat/.test(entire) && data.materials.some(value => /sodyum bikarbonat.*kabartma tozu|kabartma tozu.*sodyum bikarbonat/.test(normalize(value)))) throw new OutputError('Karbonat ve kabartma tozu aynı madde gibi yazıldığı için tarif gösterilmedi.');
  if (/kristal/.test(normalize(active)) && /\b(?:5|10|15|20|30|40)\s*(?:dk|dakika|minut)/.test(normalize(data.expected))) throw new OutputError('Kristal oluşum süresi için doğrulanmamış kısa süre verildi; tarif gösterilmedi.');
  return `## ${data.title}\n\n**Araştırma sorusu:** ${data.question}\n\n**Malzemeler:** ${data.materials.join('; ')}\n\n**Yöntem**\n\n${data.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n**Bilimsel dayanak:** ${data.explanation}\n\n**Beklenen gözlem (tahmin):** ${data.expected}\n\n**Güvenlik ve kontrol**\n\n${data.safety.map(item => `- ${item}`).join('\n')}\n\n**Sınırlar:** ${data.limits}`;
}
