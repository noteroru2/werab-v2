/**
 * scripts/http-status-audit.mjs
 * Phase 29: HTTP Status & Middleware Verification.
 * Verifies that the SEO resolver and routing layer return exact expected status codes.
 */

import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';

console.log(`\n=== HTTP STATUS & ROUTING AUDIT ===`);

const testCases = [
  // 1. Core 200 Routes
  { path: '/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อ/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อโน๊ตบุ๊ค/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อคอม/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อแมคบุ๊ค/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อไอโฟน/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อไอแพด/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อกล้อง/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อลำโพง/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อซากคอมพิวเตอร์/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อ-server/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อลำโพง-อุดรธานี/', expectedStatus: 200, expectedState: 'INDEX' },
  { path: '/รับซื้อลำโพง-สารคาม/', expectedStatus: 200, expectedState: 'INDEX' },

  // 2. 301 Permanent Redirects
  { path: '/rab-sue-com/', expectedStatus: 301, expectedRedirect: '/รับซื้อคอม/' },
  { path: '/รับซื้อ-ใกล้ฉัน/', expectedStatus: 301, expectedRedirect: '/รับซื้อ/' },
  { path: '/รับซื้อ-macbook/', expectedStatus: 301, expectedRedirect: '/รับซื้อแมคบุ๊ค/' },
  { path: '/ติดต่อเรา/', expectedStatus: 301, expectedRedirect: '/contact/' },

  // 3. 410 Gone Paths
  { path: '/รับซื้อเหล้า/', expectedStatus: 410, expectedState: 'GONE' },
  { path: '/รับซื้อตั๋วจำนำ/', expectedStatus: 410, expectedState: 'GONE' },
  { path: '/รับจำนำมือถืออุบล/', expectedStatus: 410, expectedState: 'GONE' },
  { path: '/รับจำนำไอโฟน-อุบล/', expectedStatus: 410, expectedState: 'GONE' },

  // 4. 404 Unknown and DRAFT Routes
  { path: '/รุ่น/', expectedStatus: 404, expectedState: 'DRAFT' },
  { path: '/random-unknown-page-xyz-123/', expectedStatus: 404, expectedState: 'DRAFT' }
];

let failed = 0;

for (const tc of testCases) {
  const norm = normalizePath(tc.path);
  const seo = resolveSeo(norm);

  let pass = true;
  if (seo.httpStatus !== tc.expectedStatus) {
    console.error(`❌ ${tc.path} returned status ${seo.httpStatus}, expected ${tc.expectedStatus}`);
    pass = false;
  }
  if (tc.expectedState && seo.state !== tc.expectedState) {
    console.error(`❌ ${tc.path} returned state ${seo.state}, expected ${tc.expectedState}`);
    pass = false;
  }
  if (tc.expectedRedirect && seo.redirectTo !== tc.expectedRedirect) {
    console.error(`❌ ${tc.path} redirected to ${seo.redirectTo}, expected ${tc.expectedRedirect}`);
    pass = false;
  }

  if (pass) {
    console.log(`✅ [${seo.httpStatus}] ${tc.path} -> ${seo.state}${seo.redirectTo ? ' (Redirect to ' + seo.redirectTo + ')' : ''}`);
  } else {
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n❌ ${failed} HTTP status test cases failed!`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${testCases.length} HTTP status test cases passed!`);
  process.exit(0);
}
