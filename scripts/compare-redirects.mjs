import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. Read _redirects from legacy webuy-thai
const legacyRedirectsFile = fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/public/_redirects', 'utf8');
const legacyRedirects = [];
for (const line of legacyRedirectsFile.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    let src = decodeURI(parts[0]);
    let tgt = decodeURI(parts[1]);
    if (!src.endsWith('/')) src += '/';
    if (!tgt.endsWith('/')) tgt += '/';
    legacyRedirects.push({ source: src, target: tgt });
  }
}
console.log(`Legacy _redirects count: ${legacyRedirects.length}`);

// 2. Read RAW_REDIRECT_RULES in V2
import { RAW_REDIRECT_RULES } from '../src/config/seo/redirects.ts';
console.log(`V2 RAW_REDIRECT_RULES count: ${RAW_REDIRECT_RULES.length}`);

// Check difference
const legacySrcs = new Set(legacyRedirects.map(r => r.source));
const v2Srcs = new Set(RAW_REDIRECT_RULES.map(r => r.source));

console.log('\nIn V2 but not in legacy _redirects:');
for (const r of RAW_REDIRECT_RULES) {
  if (!legacySrcs.has(r.source)) {
    console.log(`  + ${r.source} -> ${r.target} (${r.reason})`);
  }
}

console.log('\nIn legacy _redirects but not in V2:');
for (const r of legacyRedirects) {
  if (!v2Srcs.has(r.source)) {
    console.log(`  - ${r.source} -> ${r.target}`);
  }
}
