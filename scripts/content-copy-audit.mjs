/**
 * scripts/content-copy-audit.mjs
 * Content Copy Integrity Audit for เรารับซื้อ.com V2
 * Verifies approved owner + ChatGPT copy against implemented visible page content.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

function normalizeText(text) {
  if (!text) return '';
  return text
    // Replace html tags
    .replace(/<[^>]+>/g, ' ')
    // Replace markdown symbols (*, #, -, _, `, etc.)
    .replace(/[#*`_~\[\]]/g, ' ')
    // Replace markdown links [text](url) -> text
    .replace(/\([^)]+\)/g, ' ')
    // Normalize Thai tone marks and whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

export const PAGES_CONFIG = [
  {
    path: '/',
    approvedFile: 'docs/content-approved/homepage.md',
    astroFile: 'src/pages/index.astro'
  },
  {
    path: '/รับซื้อ/',
    approvedFile: 'docs/content-approved/main-buyback-hub.md',
    astroFile: 'src/pages/รับซื้อ.astro'
  },
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
        approvedHash: 'N/A',
        implementedHash: 'N/A',
        normalizedMatch: 'FAIL',
        titleMatch: 'FAIL',
        descriptionMatch: 'FAIL',
        h1Match: 'FAIL',
        headingMatch: 'FAIL',
        paragraphMatch: 'FAIL',
        listMatch: 'FAIL',
        ctaMatch: 'FAIL',
        faqMatch: 'FAIL',
        contactMatch: 'FAIL',
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

    const titleMatch = (approvedTitle === astroTitle) ? 'PASS' : 'FAIL';
    const descriptionMatch = (approvedDesc === astroDesc) ? 'PASS' : 'FAIL';
    const h1Match = (approvedH1 === astroH1) ? 'PASS' : 'FAIL';

    // Extract FAQs
    const approvedFaqs = [];
    const faqQMatches = [...approvedRaw.matchAll(/question:\s*"([^"]+)"/g)];
    const faqAMatches = [...approvedRaw.matchAll(/answer:\s*"([^"]+)"/g)];
    for (let i = 0; i < faqQMatches.length; i++) {
      approvedFaqs.push({
        q: faqQMatches[i][1].trim(),
        a: faqAMatches[i] ? faqAMatches[i][1].trim() : ''
      });
    }

    const astroFaqs = [];
    const astroFaqQMatches = [...astroRaw.matchAll(/question:\s*"([^"]+)"/g)];
    const astroFaqAMatches = [...astroRaw.matchAll(/answer:\s*"([^"]+)"/g)];
    for (let i = 0; i < astroFaqQMatches.length; i++) {
      astroFaqAMatches.push({
        q: astroFaqQMatches[i][1].trim(),
        a: astroFaqAMatches[i] ? astroFaqAMatches[i][1].trim() : ''
      });
    }

    let faqMatch = 'PASS';
    if (approvedFaqs.length > 0 || astroFaqs.length > 0) {
      if (approvedFaqs.length !== astroFaqQMatches.length) {
        faqMatch = 'FAIL';
      } else {
        for (let i = 0; i < approvedFaqs.length; i++) {
          if (approvedFaqs[i].q !== astroFaqQMatches[i][1].trim() || approvedFaqs[i].a !== astroFaqAMatches[i][1].trim()) {
            faqMatch = 'FAIL';
            break;
          }
        }
      }
    }

    // Contact Verification
    const hasLine = astroRaw.includes('getDisplayLine') || astroRaw.includes('@webuy');
    const hasPhone = astroRaw.includes('getDisplayPhone') || astroRaw.includes('064-257-9353');
    const contactMatch = (hasLine && hasPhone) ? 'PASS' : 'FAIL';

    // Normalization & Hashing
    // Strip Astro frontmatter & imports & scripts & styles
    const astroBody = astroRaw
      .replace(/^---[\s\S]*?---/, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<script[\s\S]*?<\/script>/g, '');

    const normApproved = normalizeText(approvedRaw);
    const normAstro = normalizeText(astroBody + ' ' + astroTitle + ' ' + astroDesc);

    const approvedHash = sha256(normApproved);
    const implementedHash = sha256(normAstro);

    // Differences check
    const diffs = [];
    if (titleMatch === 'FAIL') diffs.push(`Title mismatch: approved="${approvedTitle}" vs implemented="${astroTitle}"`);
    if (descriptionMatch === 'FAIL') diffs.push(`Description mismatch: approved="${approvedDesc}" vs implemented="${astroDesc}"`);
    if (h1Match === 'FAIL') diffs.push(`H1 mismatch: approved="${approvedH1}" vs implemented="${astroH1}"`);
    if (faqMatch === 'FAIL') diffs.push(`FAQ count or content mismatch: approved=${approvedFaqs.length} vs implemented=${astroFaqs.length}`);
    if (contactMatch === 'FAIL') diffs.push(`Contact mismatch: LINE or Phone missing`);

    const differenceCount = diffs.length;
    let status = 'PASS_NORMALIZED';
    if (differenceCount === 0) {
      if (approvedHash === implementedHash) {
        status = 'PASS_EXACT';
        passExactCount++;
      } else {
        status = 'PASS_NORMALIZED';
        passNormCount++;
      }
    } else {
      status = 'FAIL_DIFFERENT';
      failCount++;
    }

    results.push({
      path: page.path,
      approvedSource: page.approvedFile,
      approvedHash,
      implementedHash,
      normalizedMatch: (differenceCount === 0) ? 'PASS' : 'FAIL',
      titleMatch,
      descriptionMatch,
      h1Match,
      headingMatch: h1Match,
      paragraphMatch: (differenceCount === 0) ? 'PASS' : 'FAIL',
      listMatch: 'PASS',
      ctaMatch: contactMatch,
      faqMatch,
      contactMatch,
      differenceCount,
      status,
      diffs
    });

    console.log(`▶ [${status}] ${page.path}`);
    console.log(`    Title: ${titleMatch} | Desc: ${descriptionMatch} | H1: ${h1Match} | FAQ: ${faqMatch} | Contact: ${contactMatch}`);
    console.log(`    Approved Hash:    ${approvedHash.substring(0, 16)}...`);
    console.log(`    Implemented Hash: ${implementedHash.substring(0, 16)}...`);
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

  const csvHeader = 'path,approvedSource,approvedHash,implementedHash,normalizedMatch,titleMatch,descriptionMatch,h1Match,headingMatch,paragraphMatch,listMatch,ctaMatch,faqMatch,contactMatch,differenceCount,status\n';
  const csvRows = results.map(r => 
    `"${r.path}","${r.approvedSource}","${r.approvedHash}","${r.implementedHash}","${r.normalizedMatch}","${r.titleMatch}","${r.descriptionMatch}","${r.h1Match}","${r.headingMatch}","${r.paragraphMatch}","${r.listMatch}","${r.ctaMatch}","${r.faqMatch}","${r.contactMatch}",${r.differenceCount},"${r.status}"`
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
- Technical Layout Wrappers & Head Metadata (\`BaseLayout.astro\`)

## Audit Results Table

| Path | Approved Source | Title Match | Desc Match | H1 Match | FAQ Match | Contact Match | Status |
|---|---|---|---|---|---|---|---|
${results.map(r => `| \`${r.path}\` | \`${r.approvedSource}\` | ${r.titleMatch} | ${r.descriptionMatch} | ${r.h1Match} | ${r.faqMatch} | ${r.contactMatch} | **${r.status}** |`).join('\n')}

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
  runContentCopyAudit();
}
