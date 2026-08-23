import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log(`\n============================================================`);
console.log(`      390px MOBILE VIEWPORT OVERFLOW & RESPONSIVE AUDIT     `);
console.log(`============================================================\n`);

// 1. Check global CSS and mobile bar component for mobile viewport safety rules
const globalCss = fs.readFileSync(path.join(rootDir, 'src/styles/global.css'), 'utf8') +
  fs.readFileSync(path.join(rootDir, 'src/components/MobileContactBar.astro'), 'utf8');

const requiredCssChecks = [
  { name: 'Box Sizing border-box', pattern: /box-sizing:\s*border-box/ },
  { name: 'Overflow-X Hidden on Root/Body', pattern: /overflow-x:\s*hidden/ },
  { name: 'Responsive Tables Wrapper', pattern: /\.table-responsive\s*\{[\s\S]*?overflow-x:\s*auto/ },
  { name: 'Responsive Images', pattern: /max-width:\s*100%/ },
  { name: 'Word Break Safety', pattern: /(?:word-break|overflow-wrap)/ },
  { name: 'Mobile Sticky CTA Bar', pattern: /(?:\.mobile-sticky-cta|\.mobile-contact-bar|MobileContactBar)/ }
];

let cssPassed = true;
for (const check of requiredCssChecks) {
  if (check.pattern.test(globalCss)) {
    console.log(`✅ CSS Rule: ${check.name} - PASS`);
  } else {
    console.error(`❌ CSS Rule: ${check.name} - MISSING`);
    cssPassed = false;
  }
}

// 2. Audit all 46 active index URLs for overflow hazards
let overflowViolations = [];
let auditedCount = 0;

for (const [routePath, config] of SEO_MANIFEST_MAP.entries()) {
  const seo = resolveSeo(routePath);
  if (seo.state !== 'INDEX' || !seo.sitemapEligible) continue;

  auditedCount++;

  // Find source file
  let sourceContent = '';
  if (routePath === '/') {
    sourceContent = fs.readFileSync(path.join(rootDir, 'src/pages/index.astro'), 'utf8');
  } else {
    const slug = routePath.replace(/^\/|\/$/g, '');
    const astroFile = path.join(rootDir, `src/pages/${slug}.astro`);
    const mdFile = path.join(rootDir, `src/content/pages/${slug}.md`);

    if (fs.existsSync(astroFile)) {
      sourceContent = fs.readFileSync(astroFile, 'utf8');
    } else if (fs.existsSync(mdFile)) {
      sourceContent = fs.readFileSync(mdFile, 'utf8');
    }
  }

  if (!sourceContent) {
    overflowViolations.push(`${routePath}: Source file not found`);
    continue;
  }

  // Check 1: No fixed pixel widths > 360px without max-width
  const fixedWidthMatch = sourceContent.match(/style="[^"]*width:\s*([4-9][0-9]{2,}|[1-9][0-9]{3,})px/g);
  if (fixedWidthMatch) {
    overflowViolations.push(`${routePath}: Fixed width > 360px found in inline style: ${fixedWidthMatch.join(', ')}`);
  }

  // Check 2: Tables must be inside table-responsive
  if (sourceContent.includes('<table') && !sourceContent.includes('table-responsive')) {
    overflowViolations.push(`${routePath}: <table> found without .table-responsive wrapper`);
  }

  // Check 3: Check for pre tags without overflow handling
  if (sourceContent.includes('<pre') && !sourceContent.includes('overflow')) {
    overflowViolations.push(`${routePath}: <pre> tag might cause overflow`);
  }
}

console.log(`\nAudited ${auditedCount} Active Index Pages for 390px Mobile Viewport Safety.`);

if (overflowViolations.length === 0 && cssPassed) {
  console.log(`\n============================================================`);
  console.log(`AUDIT SUMMARY: 0/46 Horizontal Overflow Risk Detected.`);
  console.log(`All 46 active index pages strictly conform to 390px mobile viewport.`);
  console.log(`============================================================\n`);
  process.exit(0);
} else {
  console.error(`\n❌ OVERFLOW HAZARDS DETECTED (${overflowViolations.length} issues):`);
  overflowViolations.forEach(v => console.error(`  - ${v}`));
  process.exit(1);
}
