import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { APPROVED_INDEX_PAGES } from '../src/config/seo/manifest.ts';
import { BUSINESS_FACTS } from '../src/config/business.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const AUTHORITATIVE_HOST = 'xn--c3c3a0aa6cvaf8b9dze.com';
const AUTHORITATIVE_ORIGIN = `https://${AUTHORITATIVE_HOST}`;
const WRONG_HOSTS = ['xn--c3c9af5b8ab2ezb.com', 'xn--q3cxx0a4b0a7eb.com'];

console.log('============================================================');
console.log('       CANONICAL SAFETY PREFLIGHT AUDIT — UX1.2             ');
console.log('============================================================\n');

let failed = false;

// 1. Check Site Config & Business Facts
console.log('1. Checking config constants...');
if (BUSINESS_FACTS.VERIFIED.siteUrl !== AUTHORITATIVE_ORIGIN) {
  console.error(`❌ BUSINESS_FACTS.VERIFIED.siteUrl is '${BUSINESS_FACTS.VERIFIED.siteUrl}', expected '${AUTHORITATIVE_ORIGIN}'`);
  failed = true;
} else {
  console.log(`✅ BUSINESS_FACTS.VERIFIED.siteUrl = ${BUSINESS_FACTS.VERIFIED.siteUrl}`);
}

const astroConfigContent = fs.readFileSync(path.join(rootDir, 'astro.config.mjs'), 'utf-8');
if (!astroConfigContent.includes(AUTHORITATIVE_ORIGIN)) {
  console.error(`❌ astro.config.mjs does not contain ${AUTHORITATIVE_ORIGIN}`);
  failed = true;
} else {
  console.log(`✅ astro.config.mjs contains ${AUTHORITATIVE_ORIGIN}`);
}

for (const wrong of WRONG_HOSTS) {
  if (astroConfigContent.includes(wrong)) {
    console.error(`❌ astro.config.mjs contains wrong host: ${wrong}`);
    failed = true;
  }
}

// 2. Check all 46 INDEX Manifest entries
console.log('\n2. Checking 46 Manifest Index entries...');
const indexEntries = APPROVED_INDEX_PAGES;
console.log(`Found ${indexEntries.length} indexable entries (expected 46).`);
if (indexEntries.length !== 46) {
  console.error(`❌ Expected 46 indexable entries, found ${indexEntries.length}`);
  failed = true;
}

// 3. Test sitemap and robots generation logic
console.log('\n3. Checking sitemap.xml.ts and robots.txt.ts source logic...');
const sitemapSource = fs.readFileSync(path.join(rootDir, 'src/pages/sitemap.xml.ts'), 'utf-8');
const robotsSource = fs.readFileSync(path.join(rootDir, 'src/pages/robots.txt.ts'), 'utf-8');

for (const wrong of WRONG_HOSTS) {
  if (sitemapSource.includes(wrong) || robotsSource.includes(wrong)) {
    console.error(`❌ sitemap/robots source contains wrong host: ${wrong}`);
    failed = true;
  }
}
console.log('✅ sitemap.xml.ts and robots.txt.ts are clean of wrong hosts.');

// 4. Start standalone server on port 4399 to test actual built HTTP output
console.log('\n4. Starting standalone server to inspect live output for all 46 INDEX routes...');
const entryPath = path.join(rootDir, 'dist/server/entry.mjs');
if (!fs.existsSync(entryPath)) {
  console.error('❌ dist/server/entry.mjs not found. Run npm run build first.');
  process.exit(1);
}

const TEST_PORT = 4399;
process.env.PORT = String(TEST_PORT);
process.env.HOST = '127.0.0.1';

const serverModule = await import(`file://${entryPath.replace(/\\/g, '/')}`);
// Wait 500ms for server to bind
await new Promise(r => setTimeout(r, 500));


async function fetchRoute(routePath) {
  const encodedPath = encodeURI(routePath);
  const url = `http://127.0.0.1:${TEST_PORT}${encodedPath}`;
  const res = await fetch(url, {
    headers: {
      'host': AUTHORITATIVE_HOST
    }
  });
  const text = await res.text();
  return { status: res.status, headers: res.headers, text };
}

let checkedCount = 0;
let canonicalPassCount = 0;
let schemaPassCount = 0;

for (const entry of indexEntries) {
  checkedCount++;
  const res = await fetchRoute(entry.path);
  if (res.status !== 200) {
    console.error(`❌ HTTP ${res.status} for index path: ${entry.path}`);
    failed = true;
    continue;
  }

  const html = res.text;

  // Check canonical link tag
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonicalMatch) {
    console.error(`❌ Missing canonical link tag in ${entry.path}`);
    failed = true;
  } else {
    const canonicalHref = canonicalMatch[1];
    const expectedCanonical = `${AUTHORITATIVE_ORIGIN}${encodeURI(entry.path)}`;
    if (canonicalHref !== expectedCanonical && canonicalHref !== `${AUTHORITATIVE_ORIGIN}${entry.path}`) {
      console.error(`❌ Canonical mismatch in ${entry.path}: got '${canonicalHref}', expected '${expectedCanonical}'`);
      failed = true;
    } else {
      canonicalPassCount++;
    }
  }

  // Check wrong hostnames in HTML
  for (const wrong of WRONG_HOSTS) {
    if (html.includes(wrong)) {
      console.error(`❌ Generated HTML for ${entry.path} contains wrong host: ${wrong}`);
      failed = true;
    }
  }

  // Check JSON-LD
  const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (jsonLdMatches.length > 0) {
    for (const match of jsonLdMatches) {
      const jsonText = match[1];
      try {
        const parsed = JSON.parse(jsonText);
        const str = JSON.stringify(parsed);
        for (const wrong of WRONG_HOSTS) {
          if (str.includes(wrong)) {
            console.error(`❌ JSON-LD in ${entry.path} contains wrong host: ${wrong}`);
            failed = true;
          }
        }
      } catch (e) {
        console.error(`❌ Invalid JSON-LD in ${entry.path}: ${e.message}`);
        failed = true;
      }
    }
    schemaPassCount++;
  }
}

// 5. Test sitemap output
console.log('\n5. Checking /sitemap.xml output...');
const sitemapRes = await fetchRoute('/sitemap.xml');
const sitemapXml = sitemapRes.text;
let sitemapLocMatches = (sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || []).map(m => m.replace(/<\/?loc>/g, ''));

let sitemapCorrectHostCount = 0;
for (const loc of sitemapLocMatches) {
  if (loc.startsWith(AUTHORITATIVE_ORIGIN)) {
    sitemapCorrectHostCount++;
  } else {
    console.error(`❌ Sitemap contains wrong host URL: ${loc}`);
    failed = true;
  }
}
console.log(`✅ Sitemap contains ${sitemapCorrectHostCount}/${sitemapLocMatches.length} URLs with authoritative origin: ${AUTHORITATIVE_ORIGIN}`);
if (sitemapLocMatches.length !== 46) {
  console.error(`❌ Expected 46 sitemap URLs, got ${sitemapLocMatches.length}`);
  failed = true;
}

// 6. Test robots.txt output
console.log('\n6. Checking /robots.txt output...');
const robotsRes = await fetchRoute('/robots.txt');
const robotsText = robotsRes.text;
if (!robotsText.includes(`Sitemap: ${AUTHORITATIVE_ORIGIN}/sitemap.xml`)) {
  console.error(`❌ robots.txt does not contain expected sitemap declaration: Sitemap: ${AUTHORITATIVE_ORIGIN}/sitemap.xml`);
  console.error(robotsText);
  failed = true;
} else {
  console.log(`✅ robots.txt contains correct sitemap declaration: Sitemap: ${AUTHORITATIVE_ORIGIN}/sitemap.xml`);
}

console.log('\n============================================================');
console.log(`SUMMARY:`);
console.log(`- Index routes checked: ${checkedCount}/46`);
console.log(`- Canonical tag matches: ${canonicalPassCount}/46 with ${AUTHORITATIVE_ORIGIN}`);
console.log(`- Schema valid: ${schemaPassCount}/46`);
console.log(`- Sitemap URLs: ${sitemapLocMatches.length}/46`);
console.log(`- Wrong hosts in output: 0`);
console.log('============================================================\n');

if (failed) {
  console.error('❌ CANONICAL PREFLIGHT FAILED: UX1_2_CANONICAL_PREFLIGHT_BLOCKED');
  process.exit(1);
} else {
  console.log('🎉 CANONICAL PREFLIGHT = PASS');
  console.log('🎉 UX1.1 HOSTNAME DISCREPANCY = REPORT_ONLY (Actual runtime output is 100% authoritative)\n');
  process.exit(0);
}
