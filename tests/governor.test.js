import test from 'node:test';
import assert from 'node:assert/strict';
import { Governor, parseReset, RESERVE_SCRIPT } from '../lib/governor.js';

test('concurrency and per-client quotas release correctly', async () => {
  const governor = new Governor({ env: { MAX_CONCURRENT: '2', USER_RPM: '2' } });
  const a = await governor.reserve('science', 100, 'a');
  const b = await governor.reserve('science', 100, 'b');
  await assert.rejects(governor.reserve('science', 100, 'c'), error => error.status === 429);
  await a.release(50); await b.release(50);
  const c = await governor.reserve('science', 100, 'a'); await c.release();
  await assert.rejects(governor.reserve('science', 100, 'a'), error => error.status === 429);
});
test('minute resets do not reset daily budgets, and reconciliation never refunds a new window', async () => {
  let now = 1000;
  const governor = new Governor({ env: { GROQ_TPM: '1000', GROQ_TPD: '1500', QUOTA_HEADROOM: '1' }, now: () => now });
  const first = await governor.reserve('m', 900, 'a');
  now += 61000;
  governor.cleanup();
  const second = await governor.reserve('m', 100, 'b');
  await first.release(100);
  assert.equal(governor.buckets.get('m:tm').value, 100);
  assert.equal(governor.buckets.get('m:td').value, 200);
  await second.release();
});
test('RPD observation is daily, TPM observation is per minute', async () => {
  let now = 1000; const governor = new Governor({ now: () => now });
  governor.observe('m', new Headers({ 'x-ratelimit-remaining-requests': '0', 'x-ratelimit-reset-requests': '2h', 'x-ratelimit-remaining-tokens': '7000', 'x-ratelimit-reset-tokens': '3s' }));
  now += 60000;
  await assert.rejects(governor.reserve('m', 100, 'a'), error => error.retryAfter > 7000);
  now += 7200000; const lease = await governor.reserve('m', 100, 'a'); await lease.release();
  assert.equal(parseReset('2m59.56s', 0), 179560);
  assert.equal(parseReset('7.66s', 0), 7660);
});
test('shared store failures fail closed and never send a Groq request', async () => {
  const governor = new Governor({ env: { UPSTASH_REDIS_REST_URL: 'https://redis.test', UPSTASH_REDIS_REST_TOKEN: 'secret' }, fetchImpl: async () => { throw new Error('offline'); } });
  await assert.rejects(governor.reserve('m', 100, 'a'), error => error.status === 503);
  const required = new Governor({ env: { REQUIRE_SHARED_LIMITS: '1' } });
  await assert.rejects(required.reserve('m', 100, 'a'), error => error.status === 503);
});
test('shared quota reservation sends one atomic operation and expires its lease', async () => {
  const commands = [];
  const governor = new Governor({ env: { UPSTASH_REDIS_REST_URL: 'https://redis.test', UPSTASH_REDIS_REST_TOKEN: 'test' }, fetchImpl: async (url, init) => {
    commands.push(JSON.parse(init.body)); return Response.json({ result: commands.length === 1 ? [1, 0, 2] : 1 });
  } });
  const lease = await governor.reserve('m', 900, 'hashed-client');
  assert.equal(lease.pressure, true);
  assert.equal(commands[0][0], 'EVAL'); assert.equal(commands[0][2], 6);
  assert.match(RESERVE_SCRIPT, /65000/);
  assert.doesNotMatch(JSON.stringify(commands), /message|content/);
  await lease.release(); await lease.release(); assert.equal(commands.length, 2);
});
