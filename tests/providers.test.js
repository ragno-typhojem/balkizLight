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
