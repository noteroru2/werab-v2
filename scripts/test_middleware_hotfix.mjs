/**
 * scripts/test_middleware_hotfix.mjs
 * Comprehensive unit test for the middleware hotfix and ByteString safety.
 */

import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';

console.log('\n=== TESTING MIDDLEWARE ROUTING & BYTESTRING SAFETY ===\n');

function safeRedirectUrl(target, base) {
  return new URL(target, base).href;
}

async function simulateMiddleware(inputUrlStr) {
  const url = new URL(inputUrlStr);
  const rawPathname = url.pathname;

  let redirectedTo = null;
  let redirectStatus = null;
  let nextCalled = false;

  const mockContext = {
    url,
    redirect: (target, status) => {
      // Test if target is a valid ByteString (no characters > 255)
      for (let i = 0; i < target.length; i++) {
        if (target.charCodeAt(i) > 255) {
          throw new TypeError(`Cannot convert argument to a ByteString because the character at index ${i} has a value of ${target.charCodeAt(i)} which is greater than 255.`);
        }
      }
      redirectedTo = target;
      redirectStatus = status;
      return new Response(null, { status, headers: { Location: target } });
    },
    locals: {}
  };

  const mockNext = async () => {
    nextCalled = true;
    return new Response('OK', { status: 200, headers: new Headers() });
  };

  // Run Middleware Logic
  try {
    // Skip static
    if (rawPathname.startsWith('/_astro/') || rawPathname === '/favicon.ico') {
      return { status: 200, nextCalled: true };
    }

    // 1. Path Normalization: Decode raw incoming pathname to compare with decoded normalized format
    let decodedPath = rawPathname;
    try {
      decodedPath = decodeURI(rawPathname);
    } catch {
      // fallback
    }

    const normalized = normalizePath(decodedPath);

    if (decodedPath !== normalized) {
      const resp = mockContext.redirect(safeRedirectUrl(normalized, url), 301);
      return {
        input: inputUrlStr,
        status: 301,
        nextCalled: false,
        redirectedTo,
        redirectStatus
      };
    }

    // 2. SEO Resolver Evaluation
    const seo = resolveSeo(normalized);

    // 3. HTTP 301 Permanent Redirect
    if (seo.httpStatus === 301 && seo.redirectTo) {
      const loc = safeRedirectUrl(seo.redirectTo, url);
      for (let i = 0; i < loc.length; i++) {
        if (loc.charCodeAt(i) > 255) {
          throw new TypeError(`Location header contains non-ByteString character at index ${i}: code ${loc.charCodeAt(i)}`);
        }
      }
      return {
        input: inputUrlStr,
        status: 301,
        nextCalled: false,
        redirectedTo: loc,
        redirectStatus: 301
      };
    }

    // 4. HTTP 410 Gone
    if (seo.httpStatus === 410) {
      return {
        input: inputUrlStr,
        status: 410,
        nextCalled: false
      };
    }

    // 5. Normal route -> next()
    const nextResp = await mockNext();
    return {
      input: inputUrlStr,
      status: nextResp.status,
      nextCalled: true
    };
  } catch (err) {
    return {
      input: inputUrlStr,
      status: 'ERROR',
      nextCalled: false,
      error: err.message
    };
  }
}

const testCases = [
  // 1. Direct Unicode Thai requests (already normalized with trailing slash)
  { url: 'http://localhost:4321/รับซื้อโน๊ตบุ๊ค/', expectedNext: true, expectedStatus: 200 },
  { url: 'http://localhost:4321/รับซื้อ/', expectedNext: true, expectedStatus: 200 },
  { url: 'http://localhost:4321/รับซื้อคอม/', expectedNext: true, expectedStatus: 200 },
  { url: 'http://localhost:4321/รับซื้อแมคบุ๊ค/', expectedNext: true, expectedStatus: 200 },
  { url: 'http://localhost:4321/รับซื้อไอโฟน/', expectedNext: true, expectedStatus: 200 },
  { url: 'http://localhost:4321/รับซื้อไอแพด/', expectedNext: true, expectedStatus: 200 },
  { url: 'http://localhost:4321/รับซื้อกล้อง/', expectedNext: true, expectedStatus: 200 },
  { url: 'http://localhost:4321/', expectedNext: true, expectedStatus: 200 },

  // 2. Percent-encoded input requests (as browsers often send)
  { url: 'http://localhost:4321/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%82%E0%B8%99%E0%B9%82%E0%B8%95%E0%B8%9A%E0%B8%B8%E0%B9%8A%E0%B8%84/', expectedNext: true, expectedStatus: 200 },
  { url: 'http://localhost:4321/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%2520%E0%B8%A1/', expectedNext: true, expectedStatus: 200 },

  // 3. Missing trailing slash (should redirect with valid ByteString URL)
  { url: 'http://localhost:4321/รับซื้อโน๊ตบุ๊ค', expectedNext: false, expectedStatus: 301, expectedTargetDecoded: '/รับซื้อโน๊ตบุ๊ค/' },
  { url: 'http://localhost:4321/รับซื้อคอม', expectedNext: false, expectedStatus: 301, expectedTargetDecoded: '/รับซื้อคอม/' },

  // 4. 301 Redirect Rules
  { url: 'http://localhost:4321/รับซื้อ-macbook/', expectedNext: false, expectedStatus: 301, expectedTargetDecoded: '/รับซื้อแมคบุ๊ค/' },
  { url: 'http://localhost:4321/rab-sue-com/', expectedNext: false, expectedStatus: 301, expectedTargetDecoded: '/รับซื้อคอม/' },
  { url: 'http://localhost:4321/รับซื้อ-ใกล้ฉัน/', expectedNext: false, expectedStatus: 301, expectedTargetDecoded: '/รับซื้อ/' },

  // 5. 410 Gone Routes
  { url: 'http://localhost:4321/จำนำมือถืออุบล/', expectedNext: false, expectedStatus: 410 },
  { url: 'http://localhost:4321/รับซื้อเหล้า/', expectedNext: false, expectedStatus: 410 }
];

let allPassed = true;

for (const tc of testCases) {
  const res = await simulateMiddleware(tc.url);
  if (res.error) {
    console.error(`❌ FAIL: ${tc.url} -> ERROR: ${res.error}`);
    allPassed = false;
  } else if (tc.expectedNext && !res.nextCalled) {
    console.error(`❌ FAIL: ${tc.url} -> Expected next() to be called directly, but got redirect to ${res.redirectedTo}`);
    allPassed = false;
  } else if (tc.expectedStatus && res.status !== tc.expectedStatus) {
    console.error(`❌ FAIL: ${tc.url} -> Expected status ${tc.expectedStatus}, got ${res.status}`);
    allPassed = false;
  } else if (tc.expectedTargetDecoded) {
    const decodedTarget = decodeURI(new URL(res.redirectedTo).pathname);
    if (decodedTarget !== tc.expectedTargetDecoded) {
      console.error(`❌ FAIL: ${tc.url} -> Expected redirect target ${tc.expectedTargetDecoded}, got ${decodedTarget}`);
      allPassed = false;
    } else {
      console.log(`✓ PASS: ${tc.url} -> 301 -> ${decodedTarget} (ByteString Location valid)`);
    }
  } else {
    console.log(`✓ PASS: ${tc.url} -> Status ${res.status} (Direct next()=${res.nextCalled})`);
  }
}

console.log(`\nOVERALL TEST RESULT: ${allPassed ? 'ALL TESTS PASSED 🎉' : 'FAILURES DETECTED ❌'}\n`);
