/**
 * scripts/redirect-audit.mjs
 * Phase 28: Redirect Safety Audit.
 * Validates redirect table for loops, chains, conflicts, and GONE collisions.
 */

import { RAW_REDIRECT_RULES, REDIRECT_MAP } from '../src/config/seo/redirects.ts';
import { GONE_PATHS } from '../src/config/seo/gone.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';

console.log(`\n=== REDIRECT SAFETY AUDIT ===`);
console.log(`Auditing ${RAW_REDIRECT_RULES.length} redirect rules...`);

let errors = [];

// 1. Check duplicate sources
const seenSources = new Set();
for (const rule of RAW_REDIRECT_RULES) {
  const normSrc = normalizePath(rule.source);
  if (seenSources.has(normSrc)) {
    errors.push(`Duplicate redirect source: ${normSrc}`);
  }
  seenSources.add(normSrc);
}

// 2. Check loops, chains, and GONE collisions
for (const rule of RAW_REDIRECT_RULES) {
  const normSrc = normalizePath(rule.source);
  const normTgt = normalizePath(rule.target);

  // Self loop (A -> A)
  if (normSrc === normTgt) {
    errors.push(`Self redirect loop: ${normSrc} -> ${normTgt}`);
  }

  // Source in GONE
  if (GONE_PATHS.has(normSrc)) {
    errors.push(`Redirect source is also in GONE registry: ${normSrc}`);
  }

  // Target in GONE
  if (GONE_PATHS.has(normTgt)) {
    errors.push(`Redirect target is in GONE registry: ${normSrc} -> ${normTgt}`);
  }

  // Multi-hop chain (Target is another redirect source)
  if (REDIRECT_MAP.has(normTgt)) {
    errors.push(`Redirect chain detected: ${normSrc} -> ${normTgt} -> ${REDIRECT_MAP.get(normTgt).target}`);
  }
}

if (errors.length > 0) {
  console.error(`❌ Found ${errors.length} redirect errors:`);
  for (const e of errors) {
    console.error(`  - ${e}`);
  }
  process.exit(1);
} else {
  console.log(`✅ All redirects are 1-hop, loop-free, and conflict-free!`);
  process.exit(0);
}
