// Server-only provider configuration. Endpoints and credentials never come from chat input.
const FREE_CLOUDFLARE_MODELS = new Set(['@cf/qwen/qwen3-30b-a3b-fp8','@cf/openai/gpt-oss-120b','@cf/openai/gpt-oss-20b']);
export function providerSettings(env = {}) {
  const name = env.AI_PROVIDER || 'groq', nvidia = name === 'nvidia', cloudflare = name === 'cloudflare';
  const valid = ['groq','nvidia','cloudflare'].includes(name);
  const account = env.CLOUDFLARE_ACCOUNT_ID || '';
  let error = '';
  if (!valid) error = 'Sunucunun yapay zekâ sağlayıcı ayarı geçersiz.';
  else if (nvidia && env.VERCEL_ENV === 'production' && env.NVIDIA_ACCESS_MODE !== 'production-authorized') error = 'Seçilen yapay zekâ servisi bu yayın ortamı için yetkilendirilmedi. Sunucu yapılandırması kontrol edilmeli.';
  else if (cloudflare && (!/^[a-f0-9]{32}$/i.test(account) || env.CLOUDFLARE_FREE_PLAN !== '1' || !FREE_CLOUDFLARE_MODELS.has(providerModel('research',env)) || !FREE_CLOUDFLARE_MODELS.has(providerModel('economy',env)))) error = 'Cloudflare hesabı, ücretsiz plan beyanı veya model ayarı kontrol edilmeli.';
  const prefix = cloudflare ? 'CLOUDFLARE' : nvidia ? 'NVIDIA' : 'GROQ';
  // Application token caps are separate from each account's actual entitlement.
  const defaults = cloudflare ? {RPM:30,RPD:1000,TPM:40000,TPD:240000} : nvidia ? {RPM:10,RPD:1000,TPM:20000,TPD:200000} : {RPM:30,RPD:1000,TPM:8000,TPD:200000};
  const base = env.QUOTA_NAMESPACE || 'balkiz:v2';
  const quotaEnv = { ...env, FORCE_JSON_OUTPUT:cloudflare ? '1' : env.FORCE_JSON_OUTPUT, QUOTA_USER_NAMESPACE:base, QUOTA_CONCURRENT_NAMESPACE:base, QUOTA_NAMESPACE: name === 'groq' ? base : `${base}:${name}` };
  for (const metric of ['RPM','RPD','TPM','TPD']) quotaEnv[`GROQ_${metric}`] = env[`AI_${metric}`] || env[`${prefix}_${metric}`] || defaults[metric];
  return { name, error, key: env[`${prefix}_API_KEY`] || '', endpoint: cloudflare ? `https://api.cloudflare.com/client/v4/accounts/${account}/ai/v1/chat/completions` : nvidia ? 'https://integrate.api.nvidia.com/v1/chat/completions' : 'https://api.groq.com/openai/v1/chat/completions', quotaEnv };
}
export function providerModel(route, env = {}) {
  const prefix = env.AI_PROVIDER === 'cloudflare' ? 'CLOUDFLARE' : env.AI_PROVIDER === 'nvidia' ? 'NVIDIA' : 'GROQ';
  const research = prefix === 'CLOUDFLARE' ? '@cf/openai/gpt-oss-120b' : prefix === 'NVIDIA' ? 'openai/gpt-oss-20b' : 'openai/gpt-oss-120b';
  const economy = prefix === 'CLOUDFLARE' ? '@cf/qwen/qwen3-30b-a3b-fp8' : 'openai/gpt-oss-20b';
  return route === 'research' ? env[`${prefix}_SCIENCE_MODEL`] || research : env[`${prefix}_ECONOMY_MODEL`] || env[`${prefix}_FAST_MODEL`] || economy;
}
export function providerPayload(prepared, provider) {
  if (provider.name === 'groq') return prepared.payload;
  // NVIDIA's hosted API documents max_tokens and reasoning_effort. JSON is
  // requested in the prompt and validated locally; no constrained-decoding claim.
  const {model,messages,temperature,stream,reasoning_effort} = prepared.payload;
  if (provider.name === 'cloudflare') {
    const wire = messages.map((message,index)=> /qwen3-30b/.test(model) && index === messages.length-1 ? {...message,content:message.content+'\n/no_think'} : message);
    return {model,messages:wire,temperature,stream,max_tokens:Math.min(4096,prepared.maxTokens), ...(/gpt-oss/.test(model) ? {reasoning_effort:reasoning_effort || 'low'} : {})};
  }
  return {model,messages,temperature,stream,max_tokens:Math.min(4096,prepared.maxTokens), ...(/gpt-oss/.test(model) ? {reasoning_effort:reasoning_effort || 'low'} : {})};
}
// Only a definite HTTP refusal can trigger the one configured backup attempt.
// Never retry a cancelled request, a partial generation, or rejected science output.
export const fallbackStatus = status => [401,402,403,404,429,500,502,503].includes(status);
export function providerQuotaHeaders(headers, provider) {
  if (provider.name === 'groq') return headers;
  const result = new Headers();
  if (headers.has('retry-after')) result.set('retry-after',headers.get('retry-after'));
  return result;
}
