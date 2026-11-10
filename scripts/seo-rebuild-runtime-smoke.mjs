/**
 * Runtime-only SEO smoke test for an ISOLATED Worker, never production.
 * Usage: node scripts/seo-rebuild-runtime-smoke.mjs http://127.0.0.1:8787
 * Requires SEO_PREVIEW=1 in the Worker runtime.
 */
import assert from 'node:assert/strict';

const input = process.argv[2] || '';
if (!input) throw new Error('Explicit localhost preview origin is required');
const origin = new URL(input);
if (!['127.0.0.1', 'localhost', '[::1]'].includes(origin.hostname)) {
  throw new Error('Refusing to test a non-local hostname');
}
const tests = [];
async function get(path, { follow = false } = {}) {
  const url = new URL(path, origin);
  const res = await fetch(url, { redirect: follow ? 'follow' : 'manual', signal: AbortSignal.timeout(15000) });
  const body = await res.text();
  return { res, body };
}
function check(condition, message) {
  assert.ok(condition, message);
  tests.push(message);
}

const home = await get('/');
check(home.res.status === 200, 'Homepage responds HTTP 200');
check((home.res.headers.get('x-robots-tag') || '').includes('noindex'), 'Homepage has preview X-Robots-Tag noindex');
check(/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(home.body), 'Homepage has preview meta robots noindex');
check(/<link\s+rel=["']canonical["']/.test(home.body), 'Homepage renders canonical link');

for (const path of ['/รับซื้อโน๊ตบุ๊ค/', '/รับซื้อคอม/', '/รับซื้อแมคบุ๊ค/']) {
  const page = await get(path);
  check(page.res.status === 200, path + ' responds 200');
  check((page.res.headers.get('x-robots-tag') || '').includes('noindex'), path + ' has preview noindex header');
}

// Batch 2 must render PHOTO-BACKED inspection evidence, not just data files.
check(home.body.includes('Acer Swift SF314-42'), 'Homepage renders a real photo-backed notebook example');
check(home.body.includes('Insta360 X5'), 'Homepage renders a real photo-backed camera example');
check(home.body.includes('ไม่ใช่หลักฐานว่าได้ซื้อเครื่องในภาพแล้ว'), 'Photo evidence does not claim a completed buyback');
for (const [path, expectedTitle] of [
  ['/รับซื้อโน๊ตบุ๊ค/', 'MSI Thin A15'],
  ['/รับซื้อคอม/', 'คอมประกอบเคสสีขาว'],
  ['/รับซื้อแมคบุ๊ค/', 'MacBook Air M3'],
  ['/รับซื้อไอแพด/', 'iPad Pro ชิป M1'],
  ['/รับซื้อกล้อง/', 'Insta360 X5'],
]) {
  const page = await get(path);
  check(page.res.status===200 && page.body.includes(expectedTitle), path + ' renders photo-evidence example ' + expectedTitle);
}
const iphone = await get('/รับซื้อไอโฟน/');
check(iphone.res.status===200 && iphone.body.includes('ตัวอย่างจุดตรวจ iPhone'), 'iPhone keeps useful inspection copy without fabricated purchase photos');

const legacy = await get('/รับซื้อ-macbook/');
check(legacy.res.status === 301, 'Legacy MacBook route returns HTTP 301');
const loc = legacy.res.headers.get('location') || '';
check(new URL(loc, origin).pathname === '/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%A1%E0%B8%84%E0%B8%9A%E0%B8%B8%E0%B9%8A%E0%B8%84/'.replace(/^\/$/, '/')
  || decodeURI(new URL(loc, origin).pathname) === '/รับซื้อแมคบุ๊ค/', 'Legacy route redirects to current MacBook URL');

const gone = await get('/รับซื้อเหล้ารีเจนซี่/');
check(gone.res.status === 410, 'Historical Gone route returns HTTP 410');

const missing = await get('/__nonexistent_werab_seo_smoke__/');
check(missing.res.status === 404, 'Unknown URL responds HTTP 404');

const robots = await get('/robots.txt');
check(robots.res.status === 200, 'Preview robots.txt available');
check(!/Sitemap:\s*https:\/\/xn--c3c3a0aa6cvaf8b9dze\.com/i.test(robots.body), 'Preview robots does not advertise production sitemap');

console.log(JSON.stringify({ result: 'PASS', checks: tests.length, tests, productionTouched: false }, null, 2));
