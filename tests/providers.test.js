import test from 'node:test';
import assert from 'node:assert/strict';
import { providerSettings, providerPayload, providerQuotaHeaders } from '../lib/providers.js';
import { validateInput, prepareRequest } from '../lib/policy.js';
test('provider endpoints and keys are server configuration; production trial access is blocked',()=>{
  const provider=providerSettings({AI_PROVIDER:'nvidia',NVIDIA_API_KEY:'server-only',VERCEL_ENV:'production'});
  assert.ok(provider.error); assert.equal(provider.endpoint,'https://integrate.api.nvidia.com/v1/chat/completions');
  assert.equal(providerSettings({AI_PROVIDER:'nvidia',VERCEL_ENV:'production',NVIDIA_ACCESS_MODE:'production-authorized'}).error,'');
});
test('NVIDIA requests use documented fields while science remains locally validated',()=>{
  const provider=providerSettings({AI_PROVIDER:'nvidia'});
  const prepared=prepareRequest(validateInput({messages:[{role:'user',content:'İletkenlik deneyi tasarla'}]}),false,provider.quotaEnv);
  const payload=providerPayload(prepared,provider);
  assert.equal(payload.max_tokens,prepared.maxTokens); assert.equal(payload.stream,false);
  assert.equal(payload.max_completion_tokens,undefined); assert.equal(payload.include_reasoning,undefined); assert.equal(payload.response_format,undefined);
  assert.match(payload.messages[1].content,/JSON alan sözleşmesi/);
  assert.equal(providerQuotaHeaders(new Headers({'retry-after':'7','x-ratelimit-remaining-requests':'0'}),provider).get('x-ratelimit-remaining-requests'),null);
});

test('Cloudflare GPT-OSS retains low reasoning while Qwen keeps no-think without unsupported effort values',()=>{
  const provider=providerSettings({AI_PROVIDER:'cloudflare',CLOUDFLARE_SCIENCE_MODEL:'@cf/openai/gpt-oss-120b'});
  const prepared=prepareRequest(validateInput({messages:[{role:'user',content:'Kimya için iki araştırma fikri öner'}]}),false,provider.quotaEnv);
  const payload=providerPayload(prepared,provider); assert.equal(payload.reasoning_effort,'low'); assert.deepEqual(payload.response_format,{type:'json_object'});
  const economy=providerPayload({...prepared,payload:{...prepared.payload,model:'@cf/qwen/qwen3-30b-a3b-fp8'}},provider);
  assert.equal(economy.reasoning_effort,undefined); assert.match(economy.messages.at(-1).content,/no_think/);
});

test('Cloudflare uses one complete system instruction with a JSON-capable non-reasoning science default',()=>{
  const provider=providerSettings({AI_PROVIDER:'cloudflare'});
  const p=prepareRequest(validateInput({messages:[{role:'user',content:'İki farklı kimya araştırma fikri öner'}]}),false,provider.quotaEnv);
  const wire=providerPayload(p,provider);
  assert.equal(wire.model,'@cf/meta/llama-3.3-70b-instruct-fp8-fast');
  assert.equal(wire.reasoning_effort,undefined); assert.equal(wire.messages.filter(m=>m.role==='system').length,1);
  assert.match(wire.messages[0].content,/Sen BALKIZ/); assert.match(wire.messages[0].content,/Başvuru notları/);
});
