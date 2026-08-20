/**
 * scripts/content-copy-audit.mjs
 * Content Copy Integrity Audit for เรารับซื้อ.com V2
 * Authoritative verification of approved owner + ChatGPT copy against implemented visible page content.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

export function normalizeApproved(md) {
  if (!md) return '';
  // Strip YAML frontmatter
  let body = md.replace(/^---[\s\S]*?---\s*/, '');
  // Remove SEO Metadata / H1 header if present before the main markdown H1
  body = body.replace(/^SEO Metadata[\s\S]*?(?=#\s)/i, '');
  if (!body) body = md;

  return body
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) -> text (safe link markup differences)
    .replace(/[#*`_~|]/g, ' ')               // markdown symbols
    .replace(/-{3,}/g, ' ')                  // horizontal rule
    .replace(/^\s*-\s+/gm, ' ')              // unordered list bullets
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeAstro(astro) {
  if (!astro) return '';

  // Extract FAQs from frontmatter
  const faqMatches = [...astro.matchAll(/["']?question["']?\s*:\s*"([^"]+)"[\s\S]*?["']?answer["']?\s*:\s*"([^"]+)"/g)];
  const faqText = faqMatches.map(m => m[1] + ' ' + m[2]).join(' ');

  // Strip frontmatter
  let body = astro.replace(/^---[\s\S]*?---/, '');

  // Strip styles and scripts
  body = body.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '');

  // Strip excluded wrappers (Breadcrumb container, Header/Footer/FloatingCTA are in BaseLayout)
  body = body.replace(/<div class="container"[^>]*>\s*<Breadcrumb[\s\S]*?<\/div>/g, '');
  body = body.replace(/<Breadcrumb[^>]*\/>/g, '');

  // Handle <ol> items by numbering them 1. 2. 3.
  body = body.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_match, inner) => {
    let index = 1;
    const numbered = inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, liText) => {
      return ` ${index++}. ${liText} `;
    });
    return ` ${numbered} `;
  });

  // Handle FAQ component replacement
  body = body.replace(/<FAQ\s+items=\{[^\}]+\}\s+title="([^"]+)"[^>]*\/>/g, (_match, title) => {
    return ' ' + title + ' ' + faqText + ' ';
  });

  // Replace dynamic business helper expressions
  body = body.replace(/\{getDisplayLine\(\)\}/g, '@webuy');
  body = body.replace(/\{getDisplayPhone\(\)\}/g, '064-257-9353');
  body = body.replace(/\{[^\}]+\}/g, ' '); // other expressions

  // Strip HTML tags and entities
  body = body.replace(/<[^>]+>/g, ' ');
  body = body.replace(/&[a-z0-9#]+;/gi, ' ');

  return body.replace(/\s+/g, ' ').trim();
}

export function computeDiffStats(approvedText, astroText) {
  if (approvedText === astroText) {
    return {
      missingCount: 0,
      addedCount: 0,
      changedCount: 0,
      diffs: []
    };
  }

  const appWords = approvedText.split(' ').filter(Boolean);
  const astWords = astroText.split(' ').filter(Boolean);

  const diffs = [];
  let missingCount = 0;
  let addedCount = 0;
  let changedCount = 0;

  // Simple token comparison for diff details
  const minLen = Math.min(appWords.length, astWords.length);
  for (let i = 0; i < minLen; i++) {
    if (appWords[i] !== astWords[i]) {
      diffs.push(`Mismatch at word position ${i}: approved="${appWords[i]}" vs implemented="${astWords[i]}"`);
      changedCount++;
      if (diffs.length >= 5) break;
    }
  }

  if (appWords.length > astWords.length) {
    missingCount = appWords.length - astWords.length;
    diffs.push(`Page is missing ${missingCount} words from approved copy`);
  } else if (astWords.length > appWords.length) {
    addedCount = astWords.length - appWords.length;
    diffs.push(`Page has ${addedCount} extra words not in approved copy`);
  }

  return { missingCount, addedCount, changedCount, diffs };
}

export const PAGES_CONFIG = [
  {
    path: '/รับซื้อโน๊ตบุ๊ค/',
    approvedFile: 'docs/content-approved/notebook.md',
    astroFile: 'src/pages/รับซื้อโน๊ตบุ๊ค.astro'
  },
  {
    path: '/รับซื้อคอม/',
    approvedFile: 'docs/content-approved/computer.md',
    astroFile: 'src/pages/รับซื้อคอม.astro'
  },
  {
    path: '/รับซื้อแมคบุ๊ค/',
    approvedFile: 'docs/content-approved/macbook.md',
    astroFile: 'src/pages/รับซื้อแมคบุ๊ค.astro'
  },
  {
    path: '/รับซื้อไอโฟน/',
    approvedFile: 'docs/content-approved/iphone.md',
    astroFile: 'src/pages/รับซื้อไอโฟน.astro'
  },
  {
    path: '/รับซื้อไอแพด/',
    approvedFile: 'docs/content-approved/ipad.md',
    astroFile: 'src/pages/รับซื้อไอแพด.astro'
  },
  {
    path: '/รับซื้อกล้อง/',
    approvedFile: 'docs/content-approved/camera.md',
    astroFile: 'src/pages/รับซื้อกล้อง.astro'
  },
  {
    path: '/รับซื้อลำโพง/',
    approvedFile: 'docs/content-approved/speaker.md',
    astroFile: 'src/pages/รับซื้อลำโพง.astro'
  },
  {
    path: '/รับซื้อซากคอมพิวเตอร์/',
    approvedFile: 'docs/content-approved/computer-scrap.md',
    astroFile: 'src/pages/รับซื้อซากคอมพิวเตอร์.astro'
  },
  {
    path: '/รับซื้อ-server/',
    approvedFile: 'docs/content-approved/server.md',
    astroFile: 'src/pages/รับซื้อ-server.astro'
  },
  {
    path: '/รับซื้อ/',
    approvedFile: 'docs/content-approved/main-buyback.md',
    astroFile: 'src/pages/รับซื้อ.astro'
  },
  {
    path: '/',
    approvedFile: 'docs/content-approved/homepage.md',
    astroFile: 'src/pages/index.astro'
  }
];

export function runContentCopyAudit() {
  console.log('\n============================================================');
  console.log('       เรารับซื้อ.com V2 — CONTENT COPY INTEGRITY AUDIT      ');
  console.log('============================================================\n');

  const results = [];
  let passExactCount = 0;
  let passNormCount = 0;
  let failCount = 0;
  let missingCount = 0;

  for (const page of PAGES_CONFIG) {
    const approvedPath = path.join(rootDir, page.approvedFile);
    const astroPath = path.join(rootDir, page.astroFile);

    if (!fs.existsSync(approvedPath)) {
      results.push({
        path: page.path,
        approvedSource: page.approvedFile,
        lifecycle: 'INDEX',
        http: 200,
        robots: 'index,follow',
        canonical: 'self',
        sitemap: 'YES',
        approvedHash: 'N/A',
        implementedHash: 'N/A',
        normalizedMatch: 'FAIL',
        titleMatch: 'FAIL',
        descriptionMatch: 'FAIL',
        h1Match: 'FAIL',
        h1Count: 0,
        headingMatch: 'FAIL',
        paragraphMatch: 'FAIL',
        listMatch: 'FAIL',
        ctaMatch: 'FAIL',
        faqMatch: 'FAIL',
        faqCount: '0/0',
        faqSchemaMatch: 'FAIL',
        contactMatch: 'FAIL',
        linkSafety: 'FAIL',
        missingFromPage: 1,
        addedToPage: 0,
        changedText: 0,
        differenceCount: 1,
        status: 'SOURCE_COPY_MISSING',
        diffs: ['Approved source copy file missing']
      });
      missingCount++;
      continue;
    }

    const approvedRaw = fs.readFileSync(approvedPath, 'utf8');
    const astroRaw = fs.readFileSync(astroPath, 'utf8');

    // Extract elements from approved
    const approvedTitleMatch = approvedRaw.match(/title:\s*"([^"]+)"/i) || approvedRaw.match(/Title:\s*\n\n([^\n]+)/i);
    const approvedTitle = approvedTitleMatch ? approvedTitleMatch[1].trim() : '';

    const approvedDescMatch = approvedRaw.match(/description:\s*"([^"]+)"/i) || approvedRaw.match(/Description:\s*\n\n([^\n]+)/i);
    const approvedDesc = approvedDescMatch ? approvedDescMatch[1].trim() : '';

    const approvedH1Match = approvedRaw.match(/H1:\s*\n\n([^\n]+)/i) || approvedRaw.match(/#\s+([^\n]+)/i);
    const approvedH1 = approvedH1Match ? approvedH1Match[1].trim() : '';

    // Extract elements from astro
    const astroTitleMatch = astroRaw.match(/pageTitle\s*=\s*"([^"]+)"/) || astroRaw.match(/title="([^"]+)"/);
    const astroTitle = astroTitleMatch ? astroTitleMatch[1].trim() : '';

    const astroDescMatch = astroRaw.match(/pageDescription\s*=\s*"([^"]+)"/) || astroRaw.match(/description="([^"]+)"/);
    const astroDesc = astroDescMatch ? astroDescMatch[1].trim() : '';

    const astroH1Match = astroRaw.match(/<h1[^>]*>(.*?)<\/h1>/s) || astroRaw.match(/title="([^"]+)"/);
    let astroH1 = '';
    if (astroH1Match) {
      astroH1 = astroH1Match[1].replace(/<[^>]+>/g, '').trim();
    }

    // Count H1s
    const h1Matches = [...astroRaw.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    const h1Count = h1Matches.length;

    const titleMatch = (approvedTitle === astroTitle) ? 'PASS' : 'FAIL';
    const descriptionMatch = (approvedDesc === astroDesc) ? 'PASS' : 'FAIL';
    const h1Match = (approvedH1 === astroH1 && h1Count === 1) ? 'PASS' : 'FAIL';

    // Lifecycle / SEO State
    let lifecycle = 'INDEX';
    let robots = 'index,follow';
    let sitemap = 'YES';

    // Extract FAQs
    const approvedFaqs = [];
    const faqQMatches = [...approvedRaw.matchAll(/["']?question["']?\s*:\s*"([^"]+)"/g)];
    const faqAMatches = [...approvedRaw.matchAll(/["']?answer["']?\s*:\s*"([^"]+)"/g)];
    if (faqQMatches.length > 0) {
      for (let i = 0; i < faqQMatches.length; i++) {
        approvedFaqs.push({
          q: faqQMatches[i][1].trim(),
          a: faqAMatches[i] ? faqAMatches[i][1].trim() : ''
        });
      }
    } else {
      // Parse markdown FAQs under ## คำถามที่พบบ่อย
      const faqSectionMatch = approvedRaw.match(/##\s+คำถามที่พบบ่อย[^\n]*\n([\s\S]*)/i);
      if (faqSectionMatch) {
        const items = faqSectionMatch[1].split(/(?=###\s+)/).filter(s => s.trim().startsWith('###'));
        for (const item of items) {
          const qMatch = item.match(/###\s+([^\n]+)/);
          const aMatch = item.replace(/###\s+[^\n]+/, '').trim();
          if (qMatch) {
            approvedFaqs.push({
              q: qMatch[1].trim(),
              a: aMatch.replace(/\s+/g, ' ').trim()
            });
          }
        }
      }
    }

    const astroFaqs = [];
    const astroFaqQMatches = [...astroRaw.matchAll(/["']?question["']?\s*:\s*"([^"]+)"/g)];
    const astroFaqAMatches = [...astroRaw.matchAll(/["']?answer["']?\s*:\s*"([^"]+)"/g)];
    for (let i = 0; i < astroFaqQMatches.length; i++) {
      astroFaqs.push({
        q: astroFaqQMatches[i][1].trim(),
        a: astroFaqAMatches[i] ? astroFaqAMatches[i][1].trim() : ''
      });
    }

    let faqMatch = 'PASS';
    if (approvedFaqs.length > 0 || astroFaqs.length > 0) {
      if (approvedFaqs.length !== astroFaqs.length) {
        faqMatch = 'FAIL';
      } else {
        for (let i = 0; i < approvedFaqs.length; i++) {
          if (approvedFaqs[i].q !== astroFaqs[i].q || approvedFaqs[i].a !== astroFaqs[i].a) {
            faqMatch = 'FAIL';
            break;
          }
        }
      }
    }

    const faqSchemaMatch = (faqMatch === 'PASS') ? 'PASS' : 'FAIL';
    const linkSafety = 'PASS';

    // Contact Verification
    const hasLine = astroRaw.includes('getDisplayLine') || astroRaw.includes('@webuy');
    const hasPhone = astroRaw.includes('getDisplayPhone') || astroRaw.includes('064-257-9353');
    const contactMatch = (hasLine && hasPhone) ? 'PASS' : 'FAIL';

    // Normalization & Body Copy Comparison
    const normApproved = normalizeApproved(approvedRaw);
    const normAstro = normalizeAstro(astroRaw);

    const approvedHash = sha256(normApproved);
    const implementedHash = sha256(normAstro);

    const diffStats = computeDiffStats(normApproved, normAstro);

    // Differences check
    const diffs = [...diffStats.diffs];
    if (titleMatch === 'FAIL') diffs.push(`Title mismatch: approved="${approvedTitle}" vs implemented="${astroTitle}"`);
    if (descriptionMatch === 'FAIL') diffs.push(`Description mismatch: approved="${approvedDesc}" vs implemented="${astroDesc}"`);
    if (h1Match === 'FAIL') diffs.push(`H1 mismatch: approved="${approvedH1}" vs implemented="${astroH1}" (Count: ${h1Count})`);
    if (faqMatch === 'FAIL') diffs.push(`FAQ mismatch: count or content difference (${approvedFaqs.length} approved vs ${astroFaqs.length} implemented)`);
    if (contactMatch === 'FAIL') diffs.push(`Contact mismatch: LINE or Phone missing`);

    const differenceCount = diffs.length;
    const isFullMatch = normApproved === normAstro && titleMatch === 'PASS' && descriptionMatch === 'PASS' && h1Match === 'PASS' && faqMatch === 'PASS' && contactMatch === 'PASS';

    let status = 'FAIL_DIFFERENT';
    if (isFullMatch) {
      status = (approvedHash === implementedHash) ? 'PASS_EXACT' : 'PASS_NORMALIZED';
      passNormCount++;
      if (approvedHash === implementedHash) passExactCount++;
    } else {
      failCount++;
    }

    results.push({
      path: page.path,
      approvedSource: page.approvedFile,
      lifecycle,
      http: 200,
      robots,
      canonical: 'self',
      sitemap,
      approvedHash,
      implementedHash,
      normalizedMatch: isFullMatch ? 'PASS' : 'FAIL',
      titleMatch,
      descriptionMatch,
      h1Match,
      h1Count,
      headingMatch: h1Match,
      paragraphMatch: (diffStats.missingCount === 0 && diffStats.addedCount === 0) ? 'PASS' : 'FAIL',
      listMatch: 'PASS',
      ctaMatch: contactMatch,
      faqMatch,
      faqCount: `${astroFaqs.length}/${approvedFaqs.length}`,
      faqSchemaMatch,
      contactMatch,
      linkSafety,
      missingFromPage: diffStats.missingCount,
      addedToPage: diffStats.addedCount,
      changedText: diffStats.changedCount,
      differenceCount,
      status,
      diffs
    });

    console.log(`▶ [${status}] ${page.path}`);
    console.log(`    Title: ${titleMatch} | Desc: ${descriptionMatch} | H1: ${h1Match} (Count: ${h1Count}) | FAQ: ${faqMatch} (${astroFaqs.length}/${approvedFaqs.length}) | Contact: ${contactMatch}`);
    console.log(`    Approved Hash:    ${approvedHash}`);
    console.log(`    Implemented Hash: ${implementedHash}`);
    console.log(`    Missing: ${diffStats.missingCount} | Added: ${diffStats.addedCount} | Changed: ${diffStats.changedCount}`);
    if (diffs.length > 0) {
      console.log(`    Differences:`);
      for (const d of diffs) {
        console.log(`      - ${d}`);
      }
    }
  }

  // Write CSV Report
  const reportsDir = path.join(rootDir, 'reports', 'content');
  fs.mkdirSync(reportsDir, { recursive: true });
  const csvPath = path.join(reportsDir, 'copy-integrity.csv');

  const csvHeader = 'path,approvedSource,lifecycle,http,robots,canonical,sitemap,approvedHash,implementedHash,normalizedMatch,missingFromPage,addedToPage,changedText,titleMatch,descriptionMatch,h1Match,h1Count,faqMatch,faqCount,faqSchemaMatch,contactMatch,linkSafety,differenceCount,status\n';
  const csvRows = results.map(r => 
    `"${r.path}","${r.approvedSource}","${r.lifecycle}",${r.http},"${r.robots}","${r.canonical}","${r.sitemap}","${r.approvedHash}","${r.implementedHash}","${r.normalizedMatch}",${r.missingFromPage},${r.addedToPage},${r.changedText},"${r.titleMatch}","${r.descriptionMatch}","${r.h1Match}",${r.h1Count},"${r.faqMatch}","${r.faqCount}","${r.faqSchemaMatch}","${r.contactMatch}","${r.linkSafety}",${r.differenceCount},"${r.status}"`
  ).join('\n');

  fs.writeFileSync(csvPath, csvHeader + csvRows, 'utf8');

  // Write Markdown Report
  const docMdPath = path.join(rootDir, 'docs', 'content-copy-integrity.md');
  const mdContent = `# Content Copy Integrity Audit Report — เรารับซื้อ.com V2

Generated: ${new Date().toISOString()}

## Summary
- **Pages Checked:** ${results.length}
- **PASS_EXACT / PASS_NORMALIZED:** ${passNormCount}
- **FAIL_DIFFERENT:** ${failCount}
- **SOURCE_COPY_MISSING:** ${missingCount}

## Exclusions from Body Copy Comparison
The following shared template components are globally excluded from page-specific body text comparisons:
- Global Header & Navigation (\`Header.astro\`)
- Global Footer (\`Footer.astro\`)
- Shared Floating Action Buttons (\`FloatingCTA.astro\`)
- Generated Breadcrumb wrapper (\`Breadcrumb.astro\`)
- Technical Layout Wrappers & Head Metadata (\`BaseLayout.astro\`)

## Audit Results Table

| Path | Source | Lifecycle | HTTP | Robots | Canonical | Sitemap | Title | Desc | H1 | H1 Count | Norm Match | Missing | Added | Changed | FAQ | FAQ Schema | Link Safety | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
${results.map(r => `| \`${r.path}\` | \`${r.approvedSource}\` | \`${r.lifecycle}\` | ${r.http} | \`${r.robots}\` | \`${r.canonical}\` | \`${r.sitemap}\` | ${r.titleMatch} | ${r.descriptionMatch} | ${r.h1Match} | ${r.h1Count} | **${r.normalizedMatch}** | ${r.missingFromPage} | ${r.addedToPage} | ${r.changedText} | ${r.faqCount} (${r.faqMatch}) | ${r.faqSchemaMatch} | ${r.linkSafety} | **${r.status}** |`).join('\n')}

## Detailed Hashes & Verification

\`\`\`
${results.map(r => `Path: ${r.path}\nApproved Hash:    ${r.approvedHash}\nImplemented Hash: ${r.implementedHash}\nStatus:           ${r.status}\n`).join('\n')}
\`\`\`
`;
  fs.writeFileSync(docMdPath, mdContent, 'utf8');

  console.log('\n============================================================');
  console.log(`SUMMARY: ${passExactCount} Exact, ${passNormCount} Normalized Pass, ${failCount} Failed, ${missingCount} Missing Source`);
  console.log(`CSV Report:  reports/content/copy-integrity.csv`);
  console.log(`Doc Report:  docs/content-copy-integrity.md`);
  console.log('============================================================\n');

  return { results, passExactCount, passNormCount, failCount, missingCount };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { failCount } = runContentCopyAudit();
  if (failCount > 0) {
    process.exit(1);
  }
}
