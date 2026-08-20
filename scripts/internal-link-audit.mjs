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
  '/รับซื้อลำโพง-สารคาม/'
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
  '/รับซื้อลำโพง-สารคาม/': 'src/content/pages/รับซื้อลำโพง-สารคาม.md'
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

if (linkViolations.length > 0) {
  console.error(`❌ Found ${linkViolations.length} internal link violations:`);
  for (const lv of linkViolations) {
    console.error(`  - ${lv}`);
  }
  process.exit(1);
} else {
  console.log(`✅ All internal links and Money Hub crawl graphs verified cleanly (0 orphans, depth <= 2)!`);
  process.exit(0);
}
