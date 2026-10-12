import test from 'node:test';
import assert from 'node:assert/strict';
import { quotaReset, Governor } from '../lib/governor.js';

test('a token reset header does not become an arbitrary sixty-second wait', () => {
  const headers = new Headers({ 'x-ratelimit-remaining-tokens': '100', 'x-ratelimit-reset-tokens': '7.66s' });
  assert.equal(quotaReset(headers, 1500), 7660);
  const governor = new Governor({ now: () => 1000 }); governor.observe('m', headers, 429, 1500);
  assert.equal(governor.observed.get('m').blockedUntil, 8660);
});
test('explicit retry-after and exhausted daily request budgets remain authoritative', () => {
  assert.equal(quotaReset(new Headers({ 'retry-after': '12', 'x-ratelimit-reset-tokens': '3s' })), 12000);
  assert.equal(quotaReset(new Headers({ 'x-ratelimit-remaining-requests': '0', 'x-ratelimit-reset-requests': '2h', 'x-ratelimit-reset-tokens': '3s' })), 7200000);
});
