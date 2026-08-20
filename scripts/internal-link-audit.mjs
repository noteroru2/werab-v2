/**
 * scripts/internal-link-audit.mjs
 * Phase 31: Cluster Linking & Internal Links Audit.
 * Scans internal linking engine output and rendered AST/HTML for broken, GONE, redirected, or orphan links.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { getInternalLinks } from '../src/lib/seo/internal-links.ts';
import { GONE_PATHS } from '../src/config/seo/gone.ts';
import { REDIRECT_MAP } from '../src/config/seo/redirects.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log(`\n=== INTERNAL LINK & CLUSTER AUDIT ===`);

let checkedPages = 0;
let linkViolations = [];

for (const pathKey of SEO_MANIFEST_MAP.keys()) {
  const seo = resolveSeo(pathKey);
  if (seo.state !== 'INDEX') continue;

  checkedPages++;
  const links = getInternalLinks(seo);
  const allGenerated = [
    ...(links.parentLink ? [links.parentLink.path] : []),
    ...links.clusterLinks.map(l => l.path),
    ...links.guideLinks.map(l => l.path)
  ];

  for (const targetPath of allGenerated) {
    if (GONE_PATHS.has(targetPath)) {
      linkViolations.push(`Page ${pathKey} links to GONE path: ${targetPath}`);
    }
    if (REDIRECT_MAP.has(targetPath)) {
      linkViolations.push(`Page ${pathKey} links to redirect source: ${targetPath}`);
    }
    const targetSeo = resolveSeo(targetPath);
    if (targetSeo.state !== 'INDEX' || targetSeo.httpStatus !== 200) {
      linkViolations.push(`Page ${pathKey} links to non-INDEX target: ${targetPath} (${targetSeo.state})`);
    }
  }
}

// 2. Physical Page Rendered Link & Orphan Graph Check for Money Hubs
const INDEX_PAGES = [
  '/',
  '/รับซื้อ/',
  '/รับซื้อโน๊ตบุ๊ค/',
  '/รับซื้อคอม/',
  '/รับซื้อแมคบุ๊ค/',
  '/รับซื้อไอโฟน/',
  '/รับซื้อไอแพด/',
  '/รับซื้อกล้อง/',
  '/รับซื้อลำโพง/',
  '/รับซื้อซากคอมพิวเตอร์/',
  '/รับซื้อ-server/',
  '/รับซื้อลำโพง-อุดรธานี/',
  '/รับซื้อลำโพง-สารคาม/',
  '/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/',
  '/รับซื้อคอม-อุดรธานี/',
  '/รับซื้อคอม-ขอนแก่น/',
  '/รับซื้อโน๊ตบุ๊ค-บุรีรัม/',
  '/รับซื้อโน๊ตบุ๊ค-เลย/',
  '/รับซื้อโทรศัพท์มือถือ-จ/',
  '/รับซื้อมือถือ-อุบล/',
  '/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/',
  '/รับซื้อไอโฟน-มหาสารคาม/',
  '/รับซื้อโน๊ตบุ๊ค-สกลนคร/',
  '/รับซื้อโน๊ตบุ๊ค-นครพนม/',
  '/รับซื้อโน๊ตบุ๊ค-นครราชส/',
  '/รับซื้อเมืองขอนแก่น/',
  '/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/',
  '/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/'
];

const MONEY_HUBS = [
  '/รับซื้อ/',
  '/รับซื้อโน๊ตบุ๊ค/',
  '/รับซื้อคอม/',
  '/รับซื้อแมคบุ๊ค/',
  '/รับซื้อไอโฟน/',
  '/รับซื้อไอแพด/',
  '/รับซื้อกล้อง/',
  '/รับซื้อลำโพง/',
  '/รับซื้อซากคอมพิวเตอร์/',
  '/รับซื้อ-server/'
];

function extractLinksFromFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const links = [];

  const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/g)];
  for (const m of hrefMatches) {
    let url = m[1].trim();
    if (url.startsWith('/') && !url.startsWith('//')) {
      links.push(normalizePath(url));
    }
  }

  const urlMatches = [...content.matchAll(/url:\s*['"]([^'"]+)['"]/g)];
  for (const m of urlMatches) {
    let url = m[1].trim();
    if (url.startsWith('/') && !url.startsWith('//')) {
      links.push(normalizePath(url));
    }
  }

  const pathMatches = [...content.matchAll(/path:\s*['"]([^'"]+)['"]/g)];
  for (const m of pathMatches) {
    let url = m[1].trim();
    if (url.startsWith('/') && !url.startsWith('//')) {
      links.push(normalizePath(url));
    }
  }

  return [...new Set(links)];
}

const headerPath = path.join(rootDir, 'src/components/Header.astro');
const footerPath = path.join(rootDir, 'src/components/Footer.astro');

const globalHeaderLinks = extractLinksFromFile(headerPath);
const globalFooterLinks = extractLinksFromFile(footerPath);
const globalNavLinks = [...new Set([...globalHeaderLinks, ...globalFooterLinks])];

const pageFiles = {
  '/': 'src/pages/index.astro',
  '/รับซื้อ/': 'src/pages/รับซื้อ.astro',
  '/รับซื้อโน๊ตบุ๊ค/': 'src/pages/รับซื้อโน๊ตบุ๊ค.astro',
  '/รับซื้อคอม/': 'src/pages/รับซื้อคอม.astro',
  '/รับซื้อแมคบุ๊ค/': 'src/pages/รับซื้อแมคบุ๊ค.astro',
  '/รับซื้อไอโฟน/': 'src/pages/รับซื้อไอโฟน.astro',
  '/รับซื้อไอแพด/': 'src/pages/รับซื้อไอแพด.astro',
  '/รับซื้อกล้อง/': 'src/pages/รับซื้อกล้อง.astro',
  '/รับซื้อลำโพง/': 'src/pages/รับซื้อลำโพง.astro',
  '/รับซื้อซากคอมพิวเตอร์/': 'src/pages/รับซื้อซากคอมพิวเตอร์.astro',
  '/รับซื้อ-server/': 'src/pages/รับซื้อ-server.astro',
  '/รับซื้อลำโพง-อุดรธานี/': 'src/content/pages/รับซื้อลำโพง-อุดรธานี.md',
  '/รับซื้อลำโพง-สารคาม/': 'src/content/pages/รับซื้อลำโพง-สารคาม.md',
  '/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/': 'src/pages/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ.astro',
  '/รับซื้อคอม-อุดรธานี/': 'src/pages/รับซื้อคอม-อุดรธานี.astro',
  '/รับซื้อคอม-ขอนแก่น/': 'src/pages/รับซื้อคอม-ขอนแก่น.astro',
  '/รับซื้อโน๊ตบุ๊ค-บุรีรัม/': 'src/pages/รับซื้อโน๊ตบุ๊ค-บุรีรัม.astro',
  '/รับซื้อโน๊ตบุ๊ค-เลย/': 'src/pages/รับซื้อโน๊ตบุ๊ค-เลย.astro',
  '/รับซื้อโทรศัพท์มือถือ-จ/': 'src/pages/รับซื้อโทรศัพท์มือถือ-จ.astro',
  '/รับซื้อมือถือ-อุบล/': 'src/pages/รับซื้อมือถือ-อุบล.astro',
  '/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/': 'src/pages/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ.astro',
  '/รับซื้อไอโฟน-มหาสารคาม/': 'src/pages/รับซื้อไอโฟน-มหาสารคาม.astro',
  '/รับซื้อโน๊ตบุ๊ค-สกลนคร/': 'src/pages/รับซื้อโน๊ตบุ๊ค-สกลนคร.astro',
  '/รับซื้อโน๊ตบุ๊ค-นครพนม/': 'src/pages/รับซื้อโน๊ตบุ๊ค-นครพนม.astro',
  '/รับซื้อโน๊ตบุ๊ค-นครราชส/': 'src/pages/รับซื้อโน๊ตบุ๊ค-นครราชส.astro',
  '/รับซื้อเมืองขอนแก่น/': 'src/pages/รับซื้อเมืองขอนแก่น.astro',
  '/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/': 'src/pages/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร.astro',
  '/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/': 'src/pages/รับซื้อโน๊ตบุ๊ค-ขอนแก่น.astro'
};

const pageOutboundMap = new Map();

for (const p of INDEX_PAGES) {
  const relFile = pageFiles[p];
  const fullPath = path.join(rootDir, relFile);
  const pageSpecificLinks = extractLinksFromFile(fullPath);
  const allPageOutbound = [...new Set([...pageSpecificLinks, ...globalNavLinks])];
  pageOutboundMap.set(p, allPageOutbound);
}

for (const [source, outLinks] of pageOutboundMap.entries()) {
  for (const target of outLinks) {
    if (GONE_PATHS.has(target)) {
      linkViolations.push(`Physical page ${source} links to GONE path: ${target}`);
    }
    if (REDIRECT_MAP.has(target)) {
      linkViolations.push(`Physical page ${source} links to REDIRECT source: ${target}`);
    }
    const targetSeo = resolveSeo(target);
    if (targetSeo.state === 'HOLD_NOINDEX') {
      linkViolations.push(`Physical page ${source} links to unapproved HOLD_NOINDEX route: ${target}`);
    } else if (targetSeo.state !== 'INDEX' || targetSeo.httpStatus !== 200) {
      linkViolations.push(`Physical page ${source} links to non-INDEX target: ${target}`);
    }
  }
}

const inboundMap = new Map();
for (const p of INDEX_PAGES) {
  inboundMap.set(p, []);
}

for (const [source, outLinks] of pageOutboundMap.entries()) {
  for (const target of outLinks) {
    if (inboundMap.has(target)) {
      inboundMap.get(target).push(source);
    }
  }
}

const depthMap = new Map();
depthMap.set('/', 0);
const queue = ['/'];

while (queue.length > 0) {
  const current = queue.shift();
  const currentDepth = depthMap.get(current);
  const outLinks = pageOutboundMap.get(current) || [];

  for (const target of outLinks) {
    if (!depthMap.has(target) && INDEX_PAGES.includes(target)) {
      depthMap.set(target, currentDepth + 1);
      queue.push(target);
    }
  }
}

let orphanCount = 0;
for (const hub of MONEY_HUBS) {
  const inLinks = inboundMap.get(hub) || [];
  if (inLinks.length === 0) {
    orphanCount++;
    linkViolations.push(`E1 Money Hub ${hub} is an orphan (0 inbound links)`);
  }
  const depth = depthMap.get(hub) ?? 999;
  if (depth > 2) {
    linkViolations.push(`E1 Money Hub ${hub} crawl depth is ${depth} (> 2 hops from homepage)`);
  }
}

// 3. Historical E2 Local Winners Comprehensive Audit
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
    rows.push(row);
  }
  return rows;
}

const newIaCsvPath = path.join(rootDir, 'reports/seo/new-ia.csv');
const newIaRaw = fs.readFileSync(newIaCsvPath, 'utf8');
const newIaRows = parseCSV(newIaRaw).slice(1);
const localWinners = newIaRows.filter(r => r[4] === 'LOCAL_MONEY' || r[3] === 'LOCAL_MONEY');
const allE2Paths = localWinners.map(r => normalizePath(r[8]));

const releasedE2Paths = allE2Paths.filter(p => resolveSeo(p).state === 'INDEX');
console.log(`\n- Authoritative E2 Pool Size:        ${allE2Paths.length} URLs`);
console.log(`- Authoritative E2 Released (INDEX): ${releasedE2Paths.length} URLs (Expected: 17)`);

if (releasedE2Paths.length !== 17) {
  linkViolations.push(`Expected 17 released E2 INDEX pages, found ${releasedE2Paths.length}`);
}

let releasedE2OrphanCount = 0;
let releasedE2DepthPassCount = 0;

for (const p of releasedE2Paths) {
  const inLinks = inboundMap.get(p) || [];
  if (inLinks.length === 0) {
    releasedE2OrphanCount++;
    orphanCount++;
    linkViolations.push(`Released E2 Local Winner ${p} is an orphan (0 crawlable inbound links)`);
  }
  const depth = depthMap.get(p) ?? 999;
  if (depth <= 2) {
    releasedE2DepthPassCount++;
  } else {
    linkViolations.push(`Released E2 Local Winner ${p} crawl depth is ${depth} (> 2 hops from homepage)`);
  }
}

console.log(`- Released E2 Orphans:               ${releasedE2OrphanCount} / ${releasedE2Paths.length} (Expected: 0)`);
console.log(`- Released E2 Depth <= 2:            ${releasedE2DepthPassCount} / ${releasedE2Paths.length} (Expected: 17)`);

// 4. Batch and Category Sub-checks
const SPEAKER_PAGES = [
  '/รับซื้อลำโพง-อุดรธานี/',
  '/รับซื้อลำโพง-สารคาม/'
];

for (const p of SPEAKER_PAGES) {
  const inLinks = inboundMap.get(p) || [];
  if (inLinks.length === 0) {
    linkViolations.push(`Speaker Local Winner ${p} is an orphan (0 inbound links)`);
  }
  const depth = depthMap.get(p) ?? 999;
  if (depth > 2) {
    linkViolations.push(`Speaker Local Winner ${p} crawl depth is ${depth} (> 2 hops from homepage)`);
  }
}

const BATCH_1_PAGES = [
  '/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/',
  '/รับซื้อคอม-อุดรธานี/',
  '/รับซื้อคอม-ขอนแก่น/',
  '/รับซื้อโน๊ตบุ๊ค-บุรีรัม/',
  '/รับซื้อโน๊ตบุ๊ค-เลย/'
];

for (const p of BATCH_1_PAGES) {
  const inLinks = inboundMap.get(p) || [];
  if (inLinks.length === 0) {
    linkViolations.push(`Batch 1 Local Winner ${p} is an orphan (0 inbound links)`);
  }
  const depth = depthMap.get(p) ?? 999;
  if (depth > 2) {
    linkViolations.push(`Batch 1 Local Winner ${p} crawl depth is ${depth} (> 2 hops from homepage)`);
  }
}

const BATCH_2_PAGES = [
  '/รับซื้อโทรศัพท์มือถือ-จ/',
  '/รับซื้อมือถือ-อุบล/',
  '/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/',
  '/รับซื้อไอโฟน-มหาสารคาม/',
  '/รับซื้อโน๊ตบุ๊ค-สกลนคร/'
];

for (const p of BATCH_2_PAGES) {
  const inLinks = inboundMap.get(p) || [];
  if (inLinks.length === 0) {
    linkViolations.push(`Batch 2 Local Winner ${p} is an orphan (0 inbound links)`);
  }
  const depth = depthMap.get(p) ?? 999;
  if (depth > 2) {
    linkViolations.push(`Batch 2 Local Winner ${p} crawl depth is ${depth} (> 2 hops from homepage)`);
  }
}

const BATCH_3_PAGES = [
  '/รับซื้อโน๊ตบุ๊ค-นครพนม/',
  '/รับซื้อโน๊ตบุ๊ค-นครราชส/',
  '/รับซื้อเมืองขอนแก่น/',
  '/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/',
  '/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/'
];

for (const p of BATCH_3_PAGES) {
  const inLinks = inboundMap.get(p) || [];
  if (inLinks.length === 0) {
    linkViolations.push(`Batch 3 Local Winner ${p} is an orphan (0 inbound links)`);
  }
  const depth = depthMap.get(p) ?? 999;
  if (depth > 2) {
    linkViolations.push(`Batch 3 Local Winner ${p} crawl depth is ${depth} (> 2 hops from homepage)`);
  }
}

// 5. Ensure 0 public links to unreleased district pages
const UNRELEASED_DISTRICT_PAGES = [
  '/รับซื้อ-notebook-อำเภอพล-ขอนแก่น/',
  '/รับซื้อ-notebook-ชุมแพ-ขอนแก่น/'
];

for (const dist of UNRELEASED_DISTRICT_PAGES) {
  const normDist = normalizePath(dist);
  const inLinks = inboundMap.get(normDist) || [];
  if (inLinks.length > 0) {
    linkViolations.push(`Unreleased District page ${normDist} received public inbound links from: ${inLinks.join(', ')}`);
  }
}

if (linkViolations.length > 0) {
  console.error(`❌ Found ${linkViolations.length} internal link violations:`);
  for (const lv of linkViolations) {
    console.error(`  - ${lv}`);
  }
  process.exit(1);
} else {
  console.log(`\n✅ All internal links, Money Hubs, Speaker Survivors (2/2), and Batches 1-3 (15/15) verified cleanly (17/17 Released E2 Orphans = 0, Depth <= 2, 0 district leaks)!`);
  process.exit(0);
}
