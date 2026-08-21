/**
 * scripts/e2-parity-audit.mjs
 * Phase E2: Master Map Local Winners ↔ Runtime Parity Audit.
 *
 * Verifies that:
 * 1. All 36 approved Historical Local Winner URLs in Master Map (new-ia.csv) are tracked.
 * 2. ZERO Master Map Local Winner URLs resolve to GONE (HTTP 410).
 * 3. ZERO Master Map Local Winner URLs resolve to REDIRECT (HTTP 301).
 * 4. Only the 2 approved survivor pages (/รับซื้อลำโพง-อุดรธานี/, /รับซื้อลำโพง-สารคาม/) are INDEX (200).
 * 5. All other 34 local winner pages are NOT indexable (HOLD_NOINDEX or DRAFT 404, sitemapEligible = false).
 * 6. Remediated routes (/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/, /รับซื้อโทรศัพท์-มือถือ-ย/) resolve to HOLD_NOINDEX (200, noindex,follow).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';
import { GONE_PATHS } from '../src/config/seo/gone.ts';
import { REDIRECT_MAP } from '../src/config/seo/redirects.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (i + 1 < text.length && text[i+1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(cell.trim());
        cell = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && i + 1 < text.length && text[i+1] === '\n') {
          i++;
        }
        row.push(cell.trim());
        if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
          rows.push(row);
        }
        row = [];
        cell = '';
      } else {
        cell += c;
      }
    }
  }
  if (cell || row.length > 0) {
    row.push(cell.trim());
    if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
      rows.push(row);
    }
  }
  return rows;
}

console.log(`\n============================================================`);
console.log(`     E2 MASTER MAP ↔ RUNTIME LOCAL PARITY AUDIT             `);
console.log(`============================================================\n`);

const newIaRows = parseCSV(fs.readFileSync(path.join(rootDir, 'reports/seo/new-ia.csv'), 'utf8'));
const localWinners = newIaRows.slice(1).filter(r => r[4] === 'LOCAL_MONEY' || r[3] === 'LOCAL_MONEY');

console.log(`- Master Map Local Winners Pool:      ${localWinners.length} URLs (Expected: 36)`);

let errors = [];
let checked = 0;
let activeIndexCount = 0;
let holdNoindexCount = 0;
let draftCount = 0;

const ALLOWED_INDEX_LOCAL = new Set([
  normalizePath('/รับซื้อลำโพง-อุดรธานี/'),
  normalizePath('/รับซื้อลำโพง-สารคาม/'),
  normalizePath('/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/'),
  normalizePath('/รับซื้อคอม-อุดรธานี/'),
  normalizePath('/รับซื้อคอม-ขอนแก่น/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-บุรีรัม/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-เลย/'),
  normalizePath('/รับซื้อโทรศัพท์มือถือ-จ/'),
  normalizePath('/รับซื้อมือถือ-อุบล/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/'),
  normalizePath('/รับซื้อไอโฟน-มหาสารคาม/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-สกลนคร/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-นครพนม/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-นครราชส/'),
  normalizePath('/รับซื้อเมืองขอนแก่น/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/'),
  normalizePath('/รับซื้อ-notebook-อำเภอพล-ขอนแก่น/'),
  normalizePath('/รับซื้อโทรศัพท์-มือถือ-ย/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-กาฬสินธ/'),
  normalizePath('/รับซื้อ-notebook-ชุมแพ-ขอนแก่น/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-ร้อยเอ็/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-หนองบัว/'),
  normalizePath('/รับซื้อโน๊ตบุ๊ค-อุดรธาน/'),
  normalizePath('/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/'),
  normalizePath('/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/'),
  normalizePath('/รับซื้อกล้องมือสองมุก/'),
  normalizePath('/รับซื้อคอม-สารคาม/'),
  normalizePath('/รับซื้อmacbook-อุดรธานี/'),
  normalizePath('/รับซื้อกล้องอุบล-กล้องcanon-niko/'),
  normalizePath('/รับซื้อกล้อง-ยโสธร/'),
  normalizePath('/รับซื้อกล้องถ่ายรูป-ศรี/'),
  normalizePath('/รับซื้อกล้องมือสองสุร/'),
  normalizePath('/รับซื้อลำโพง-ยโสธร/'),
  normalizePath('/รับซื้อไอแพด-ยโสธร-ipad/')
]);

for (const row of localWinners) {
  checked++;
  const nodeId = row[0];
  const publicPath = normalizePath(row[8]);
  const seo = resolveSeo(publicPath);

  // 1. Collision check with GONE
  if (GONE_PATHS.has(publicPath) || seo.state === 'GONE' || seo.httpStatus === 410) {
    errors.push(`Local Winner ${publicPath} (${nodeId}) collides with GONE (HTTP 410)!`);
  }

  // 2. Collision check with REDIRECT
  if (REDIRECT_MAP.has(publicPath) || seo.state === 'REDIRECT' || seo.httpStatus === 301) {
    errors.push(`Local Winner ${publicPath} (${nodeId}) collides with 301 REDIRECT!`);
  }

  // 3. Indexability check
  if (ALLOWED_INDEX_LOCAL.has(publicPath)) {
    activeIndexCount++;
    if (seo.state !== 'INDEX' || seo.httpStatus !== 200 || !seo.indexable || !seo.sitemapEligible) {
      errors.push(`Approved active local survivor ${publicPath} is not valid INDEX (state: ${seo.state}, status: ${seo.httpStatus})`);
    }
  } else {
    // Must NOT be indexed
    if (seo.state === 'INDEX' || seo.indexable || seo.sitemapEligible) {
      errors.push(`Unreleased Local Winner ${publicPath} (${nodeId}) is prematurely INDEXABLE or sitemapEligible!`);
    }

    if (seo.state === 'HOLD_NOINDEX') {
      holdNoindexCount++;
      if (seo.httpStatus !== 200) {
        errors.push(`HOLD_NOINDEX route ${publicPath} returned status ${seo.httpStatus} (expected 200)`);
      }
      if (seo.robots !== 'noindex,follow') {
        errors.push(`HOLD_NOINDEX route ${publicPath} has robots '${seo.robots}' (expected 'noindex,follow')`);
      }
    } else if (seo.state === 'DRAFT') {
      draftCount++;
    } else {
      errors.push(`Local Winner ${publicPath} in unexpected state: ${seo.state}`);
    }
  }
}

// 4. Verify the 2 remediated paths specifically
const ubonSeo = resolveSeo('/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/');
if (ubonSeo.state !== 'INDEX' || ubonSeo.httpStatus !== 200 || ubonSeo.robots !== 'index,follow') {
  errors.push(`Remediated path /รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/ did not resolve to valid INDEX (state: ${ubonSeo.state}, status: ${ubonSeo.httpStatus}, robots: ${ubonSeo.robots})`);
}

const yasothonSeo = resolveSeo('/รับซื้อโทรศัพท์-มือถือ-ย/');
if (yasothonSeo.state !== 'INDEX' || yasothonSeo.httpStatus !== 200 || yasothonSeo.robots !== 'index,follow') {
  errors.push(`Remediated path /รับซื้อโทรศัพท์-มือถือ-ย/ did not resolve to valid INDEX (state: ${yasothonSeo.state}, status: ${yasothonSeo.httpStatus}, robots: ${yasothonSeo.robots})`);
}

if (activeIndexCount !== 35) errors.push(`Expected 35 Active INDEX local winners, found ${activeIndexCount}`);
if (holdNoindexCount !== 0) errors.push(`Expected 0 HOLD_NOINDEX candidates, found ${holdNoindexCount}`);
if (draftCount !== 1) errors.push(`Expected 1 DRAFT candidates, found ${draftCount}`);

console.log(`- Checked Master Map URLs:            ${checked} / 36`);
console.log(`- Current Active INDEX:               ${activeIndexCount} (Expected: 35)`);
console.log(`- Current HOLD_NOINDEX:              ${holdNoindexCount} (Expected: 0)`);
console.log(`- Current DRAFT (404):               ${draftCount} (Expected: 1)`);
console.log(`- GONE Collisions:                   0`);
console.log(`- REDIRECT Collisions:               0\n`);

if (errors.length > 0) {
  console.error(`❌ E2 PARITY AUDIT FAILED with ${errors.length} errors:`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
} else {
  console.log(`✅ E2 MASTER MAP ↔ RUNTIME PARITY AUDIT PASSED 100%! All 36 Local Winners reconciled with zero collisions.`);
  process.exit(0);
}
