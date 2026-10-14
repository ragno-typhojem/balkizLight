// Server-only provider configuration. Endpoints and credentials never come from chat input.
export function providerSettings(env = {}) {
  const name = env.AI_PROVIDER || 'groq', nvidia = name === 'nvidia';
  const valid = ['groq','nvidia'].includes(name);
  const error = !valid ? 'Sunucunun yapay zekâ sağlayıcı ayarı geçersiz.' : nvidia && env.VERCEL_ENV === 'production' && env.NVIDIA_ACCESS_MODE !== 'production-authorized' ? 'Seçilen yapay zekâ servisi bu yayın ortamı için yetkilendirilmedi. Sunucu yapılandırması kontrol edilmeli.' : '';
  const prefix = nvidia ? 'NVIDIA' : 'GROQ';
  // Conservative application caps, not a claim about NVIDIA account entitlement.
  const defaults = nvidia ? {RPM:10,RPD:1000,TPM:20000,TPD:200000} : {RPM:30,RPD:1000,TPM:8000,TPD:200000};
  const base = env.QUOTA_NAMESPACE || 'balkiz:v2';
  const quotaEnv = { ...env, QUOTA_NAMESPACE: nvidia ? `${base}:nvidia` : base };
  for (const metric of ['RPM','RPD','TPM','TPD']) quotaEnv[`GROQ_${metric}`] = env[`AI_${metric}`] || env[`${prefix}_${metric}`] || defaults[metric];
  return { name, error, key: env[`${prefix}_API_KEY`] || '', endpoint: nvidia ? 'https://integrate.api.nvidia.com/v1/chat/completions' : 'https://api.groq.com/openai/v1/chat/completions', quotaEnv };
}
export function providerModel(route, env = {}) {
  const prefix = env.AI_PROVIDER === 'nvidia' ? 'NVIDIA' : 'GROQ';
  return route === 'research' ? env[`${prefix}_SCIENCE_MODEL`] || 'openai/gpt-oss-120b' : env[`${prefix}_ECONOMY_MODEL`] || env[`${prefix}_FAST_MODEL`] || 'openai/gpt-oss-20b';
}
export function providerPayload(prepared, provider) {
  if (provider.name === 'groq') return prepared.payload;
  // NVIDIA's hosted API documents max_tokens and reasoning_effort. JSON is
  // requested in the prompt and validated locally; no constrained-decoding claim.
  const {model,messages,temperature,stream,reasoning_effort} = prepared.payload;
  return {model,messages,temperature,stream,max_tokens:Math.min(4096,prepared.maxTokens), ...(/gpt-oss/.test(model) ? {reasoning_effort:reasoning_effort || 'low'} : {})};
}
export function providerQuotaHeaders(headers, provider) {
  if (provider.name === 'groq') return headers;
  const result = new Headers();
  if (headers.has('retry-after')) result.set('retry-after',headers.get('retry-after'));
  return result;
}
