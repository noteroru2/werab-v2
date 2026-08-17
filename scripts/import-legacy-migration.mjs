/**
 * scripts/import-legacy-migration.mjs
 * Imports and snapshots legacy migration data from ../webuy-thai (READ-ONLY)
 * Produces normalized JSON snapshots in migration/legacy/ and route-inventory.csv.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const LEGACY_REPO_PATH = process.env.LEGACY_REPO_PATH || '../webuy-thai';
const OUTPUT_DIR = path.resolve('./migration/legacy');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 1. Get Provenance Information
let legacyGitSha = 'UNKNOWN';
try {
  legacyGitSha = execSync(`git -C "${LEGACY_REPO_PATH}" rev-parse HEAD`, { encoding: 'utf8' }).trim();
} catch (e) {
  console.warn('Could not determine legacy git SHA:', e.message);
}

const importTimestamp = new Date().toISOString();
console.log(`[Import] Starting legacy snapshot from ${LEGACY_REPO_PATH} (Git SHA: ${legacyGitSha})...`);

// Helper to normalize path
function normalizePath(p) {
  if (!p) return '/';
  let decoded = p;
  try {
    decoded = decodeURIComponent(p);
  } catch (e) {
    decoded = p;
  }
  decoded = decoded.trim();
  if (!decoded.startsWith('/')) decoded = '/' + decoded;
  if (!decoded.endsWith('/')) decoded = decoded + '/';
  return decoded.replace(/\/+/g, '/');
}

// 2. Read and Parse GONE PATHS from legacy src/config/gone-paths.ts
const goneFile = path.join(LEGACY_REPO_PATH, 'src/config/gone-paths.ts');
let gonePaths = [];
if (fs.existsSync(goneFile)) {
  const content = fs.readFileSync(goneFile, 'utf8');
  const matches = [...content.matchAll(/"([^"]+)"/g)].map(m => normalizePath(m[1]));
  gonePaths = Array.from(new Set(matches)).sort();
}
console.log(`[Import] Found ${gonePaths.length} GONE paths.`);

// 3. Read and Parse REDIRECTS from legacy public/_redirects and docs/recovery/batch-1/
const redirectsFile = path.join(LEGACY_REPO_PATH, 'public/_redirects');
const redirects = [];
const seenSources = new Set();

function addRedirect(source, target, status = 301, origin = 'migration') {
  const src = normalizePath(source);
  const tgt = normalizePath(target);
  if (!seenSources.has(src)) {
    seenSources.add(src);
    redirects.push({ source: src, target: tgt, status, origin });
  }
}

if (fs.existsSync(redirectsFile)) {
  const content = fs.readFileSync(redirectsFile, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      addRedirect(parts[0], parts[1], parts[2] ? parseInt(parts[2], 10) : 301, 'public/_redirects');
    }
  }
}

// Additional approved legacy redirect sources
const additionalApprovedRedirects = [
  { source: '/buy-camera-surin/', target: '/รับซื้อกล้อง/', origin: 'recovery-action-map' },
  { source: '/buy-camera-mahasarakam/', target: '/รับซื้อกล้อง/', origin: 'recovery-action-map' },
  { source: '/buy-camera-nongkai/', target: '/รับซื้อกล้อง/', origin: 'recovery-action-map' },
  { source: '/รับซื้อ-notebook-ใกล้ฉัน/', target: '/รับซื้อโน๊ตบุ๊ค/', origin: 'recovery-action-map' },
  { source: '/รับซื้อ-macbook-แม็คบุ๊ค/', target: '/รับซื้อแมคบุ๊ค/', origin: 'recovery-action-map' },
  { source: '/รับซื้อแมคบุ๊ค-macbook/', target: '/รับซื้อแมคบุ๊ค/', origin: 'recovery-action-map' },
  { source: '/รับซื้อ-macbook-แม็คบุ๊ค-ใกล้ฉั/', target: '/รับซื้อแมคบุ๊ค/', origin: 'recovery-action-map' },
  { source: '/รับซื้อไอโฟน-15-iphone-15/', target: '/รับซื้อไอโฟน/', origin: 'recovery-action-map' },
  { source: '/รับซื้อไอโฟน-iphone-อุบล/', target: '/รับซื้อไอโฟน/', origin: 'recovery-action-map' },
  { source: '/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/', target: '/รับซื้อไอโฟน/', origin: 'recovery-action-map' },
  { source: '/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/', target: '/รับซื้อลำโพง/', origin: 'recovery-action-map' },
  { source: '/รับซื้อแมคบุ๊ค-macbook-ยโสธร/', target: '/รับซื้อแมคบุ๊ค/', origin: 'recovery-action-map' }
];

for (const r of additionalApprovedRedirects) {
  addRedirect(r.source, r.target, 301, r.origin);
}
console.log(`[Import] Total normalized redirect sources: ${redirects.length}`);

// 4. Read Survivor Decisions and Moved Files
const movedFilesPath = path.join(LEGACY_REPO_PATH, 'docs/recovery/batch-1/moved-files.json');
let movedFiles = [];
if (fs.existsSync(movedFilesPath)) {
  movedFiles = JSON.parse(fs.readFileSync(movedFilesPath, 'utf8'));
}

const goneSet = new Set(gonePaths);
const redirectSourceMap = new Map(redirects.map(r => [r.source, r.target]));

const survivorDecisions = [];
const rebuildIndexCandidates = [
  '/รับซื้อลำโพง-อุดรธานี/',
  '/รับซื้อลำโพง-สารคาม/',
  '/รับซื้อไอโฟน-ขอนแก่น/',
  '/รับซื้อไอโฟน-ยโสธร/',
  '/รับซื้อไอแพด-ยโสธร-ipad/',
  '/รับซื้อกล้อง-canon/',
  '/รับซื้อกล้อง-sony-a6400/',
  '/buy-camera-ubon/',
  '/รับซื้อ-server/',
  '/รับซื้อไอโฟนใกล้ฉัน/',
  '/รับซื้อกล้องถ่ายรูป/',
  '/รับซื้อกล้อง-nikon-รับซื้อกล/',
  '/รับซื้อลำโพง-ยโสธร/'
];

const batch15NewRedirects = new Set([
  '/รับซื้อ-macbook-จังหวัดกาฬสินธ/',
  '/รับซื้อ-macbook-จังหวัดนครราชส/',
  '/รับซื้อ-macbook-จังหวัดบุรีรัม/',
  '/รับซื้อ-macbook-จังหวัดสุรินทร/',
  '/รับซื้อ-macbook-จังหวัดนครพนม/',
  '/รับซื้อ-macbook-จังหวัดมุกดาหา/',
  '/รับซื้อ-macbook-จังหวัดร้อยเอ็/',
  '/รับซื้อ-macbook/',
  '/legacy-รับซื้อกล้อง-ยโสธร-815/',
  '/legacy-รับซื้อไอโฟน-มหาสารคาม-851/'
]);

for (const m of movedFiles) {
  const normalized = normalizePath(m.slug ? `/${m.slug}/` : m.path);
  if (!goneSet.has(normalized)) {
    let decision = 'HOLD_NOINDEX';
    let target = undefined;

    if (batch15NewRedirects.has(normalized)) {
      decision = 'NEW_REDIRECT';
      target = redirectSourceMap.get(normalized);
    } else if (redirectSourceMap.has(normalized)) {
      decision = 'EXISTING_REDIRECT';
      target = redirectSourceMap.get(normalized);
    } else if (rebuildIndexCandidates.includes(normalized)) {
      decision = 'REBUILD_INDEX';
    }

    survivorDecisions.push({
      path: normalized,
      slug: m.slug,
      file: m.file,
      title: m.title || '',
      decision,
      target,
      originalCategory: m.category || ''
    });
  }
}

const decisionCounts = {
  REBUILD_INDEX: survivorDecisions.filter(s => s.decision === 'REBUILD_INDEX').length,
  NEW_REDIRECT: survivorDecisions.filter(s => s.decision === 'NEW_REDIRECT').length,
  EXISTING_REDIRECT: survivorDecisions.filter(s => s.decision === 'EXISTING_REDIRECT').length,
  HOLD_NOINDEX: survivorDecisions.filter(s => s.decision === 'HOLD_NOINDEX').length
};
console.log(`[Import] Survivor decisions summary:`, decisionCounts, `(Total survivors: ${survivorDecisions.length})`);

// 5. Read legacy post inventory
const postsDir = path.join(LEGACY_REPO_PATH, 'src/content/posts');
const legacyRoutes = [];

if (fs.existsSync(postsDir)) {
  const postFiles = fs.readdirSync(postsDir);
  for (const file of postFiles) {
    if (file.endsWith('.md')) {
      const fullPath = path.join(postsDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const slugMatch = content.match(/slug:\s*["']?([^"'\n\r]+)["']?/);
      const titleMatch = content.match(/title:\s*["']?([^"'\n\r]+)["']?/);
      const noindexMatch = content.match(/noindex:\s*(true|false)/);
      const canonicalMatch = content.match(/canonical:\s*["']?([^"'\n\r]+)["']?/);
      
      const slug = slugMatch ? slugMatch[1].trim() : file.replace('.md', '');
      const pathNorm = normalizePath(`/${slug}/`);
      
      legacyRoutes.push({
        file,
        slug,
        path: pathNorm,
        title: titleMatch ? titleMatch[1].trim() : '',
        noindex: noindexMatch ? noindexMatch[1] === 'true' : false,
        canonical: canonicalMatch ? canonicalMatch[1].trim() : null
      });
    }
  }
}
console.log(`[Import] Inventoried ${legacyRoutes.length} legacy post files.`);

// 6. Write Snapshots
const metadata = {
  legacyRepoPath: LEGACY_REPO_PATH,
  legacyGitSha,
  importTimestamp,
  stats: {
    goneCount: gonePaths.length,
    redirectCount: redirects.length,
    movedFilesCount: movedFiles.length,
    survivorsCount: survivorDecisions.length,
    legacyRoutesCount: legacyRoutes.length,
    survivorDecisionsBreakdown: decisionCounts
  }
};

fs.writeFileSync(path.join(OUTPUT_DIR, 'source-metadata.json'), JSON.stringify(metadata, null, 2), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'gone-paths.json'), JSON.stringify(gonePaths, null, 2), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'redirects.json'), JSON.stringify(redirects, null, 2), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'survivor-decisions.json'), JSON.stringify(survivorDecisions, null, 2), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'routes.json'), JSON.stringify(legacyRoutes, null, 2), 'utf8');

// 7. Generate Route Inventory CSV
const inventoryCsvLines = [
  'path,legacyStatus,legacyIndexable,legacyCanonical,legacySitemap,gone,redirect,redirectTarget,survivorDecision,v2State,contentStatus,technicalStatus,source,notes'
];

const survivorMap = new Map(survivorDecisions.map(s => [s.path, s]));
const allEncounteredPaths = new Set([
  ...gonePaths,
  ...redirects.map(r => r.source),
  ...survivorDecisions.map(s => s.path),
  ...legacyRoutes.map(r => r.path)
]);

for (const p of Array.from(allEncounteredPaths).sort()) {
  const isGone = goneSet.has(p);
  const redirectTarget = redirectSourceMap.get(p) || '';
  const isRedirect = Boolean(redirectTarget);
  const survivor = survivorMap.get(p);
  const legacyPost = legacyRoutes.find(r => r.path === p);

  let v2State = 'HOLD_NOINDEX';
  let contentStatus = 'NONE';
  let technicalStatus = 'READY';
  let source = 'legacy-post';

  if (isGone) {
    v2State = 'GONE';
    contentStatus = 'NOT_APPLICABLE';
    source = 'gone-paths.ts';
  } else if (isRedirect) {
    v2State = 'REDIRECT';
    contentStatus = 'NOT_APPLICABLE';
    source = 'redirects';
  } else if (survivor) {
    if (survivor.decision === 'REBUILD_INDEX') {
      v2State = 'INDEX';
      contentStatus = (p === '/รับซื้อลำโพง-อุดรธานี/' || p === '/รับซื้อลำโพง-สารคาม/') ? 'READY' : 'CONTENT_REQUIRED';
      source = 'survivor-rebuild';
    } else {
      v2State = 'HOLD_NOINDEX';
      contentStatus = 'PENDING_REVIEW';
      source = 'survivor-hold';
    }
  } else if (legacyPost) {
    v2State = legacyPost.noindex ? 'HOLD_NOINDEX' : 'HOLD_NOINDEX';
    contentStatus = 'LEGACY_CONTENT';
    source = 'legacy-posts';
  }

  const legacyIndexable = legacyPost ? !legacyPost.noindex : !isGone && !isRedirect;
  const legacyCanonical = legacyPost?.canonical || p;
  const legacySitemap = legacyIndexable && !isGone && !isRedirect;

  function escapeCsv(str) {
    if (!str) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  }

  inventoryCsvLines.push([
    escapeCsv(p),
    escapeCsv(isGone ? 'GONE' : isRedirect ? 'REDIRECT' : 'ACTIVE'),
    escapeCsv(legacyIndexable ? 'true' : 'false'),
    escapeCsv(legacyCanonical),
    escapeCsv(legacySitemap ? 'true' : 'false'),
    escapeCsv(isGone ? 'true' : 'false'),
    escapeCsv(isRedirect ? 'true' : 'false'),
    escapeCsv(redirectTarget),
    escapeCsv(survivor ? survivor.decision : ''),
    escapeCsv(v2State),
    escapeCsv(contentStatus),
    escapeCsv(technicalStatus),
    escapeCsv(source),
    escapeCsv('')
  ].join(','));
}

fs.writeFileSync(path.join(OUTPUT_DIR, 'route-inventory.csv'), inventoryCsvLines.join('\n'), 'utf8');
console.log(`[Import] Generated route-inventory.csv with ${inventoryCsvLines.length - 1} entries.`);
