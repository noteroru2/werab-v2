/**
 * Production Content Hygiene Gate
 * Scans rendered Astro page source and Markdown bodies while ignoring comments,
 * styles, scripts and Markdown frontmatter metadata.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), '..');
const scanRoots = [path.join(rootDir, 'src', 'pages'), path.join(rootDir, 'src', 'content', 'pages'), path.join(rootDir, 'src', 'components')];

const forbidden = [
  { label: 'Historical editorial language', re: /\bHistorical\b/i },
  { label: 'Search Intent editorial language', re: /Search\s+Intent/i },
  { label: 'Money Hub editorial language', re: /Money\s+Hub/i },
  { label: 'Intent editorial language', re: /\bIntent\b/i },
  { label: 'Search Equity editorial language', re: /Search\s+Equity/i },
  { label: 'Cannibalization editorial language', re: /Cannibali[sz]ation/i },
  { label: 'Final Master Map editorial language', re: /Final\s+Master\s+Map/i },
  { label: 'V2 architecture editorial language', re: /โครงสร้าง\s*V2/i },
  { label: 'Parent Money Hub editorial language', re: /Parent\s+Money\s+Hub/i },
  { label: 'National hub editorial language', re: /National\s+(?:Notebook|Smartphone|Camera|MacBook|iPhone|iPad|Speaker)\s+Hub/i },
  { label: 'Legacy URL explanation', re: /URL\s*เดิม/i },
  { label: 'Search-history editorial explanation', re: /ประวัติการค้นหา/i },
  { label: 'Internal route migration explanation', re: /เส้นทางเดิม/i },
  { label: 'Internal recovery wording', re: /กู้หน้า/i },
  { label: 'Template/local-page wording', re: /หน้า\s*Local/i },
  { label: 'Template-area-page wording', re: /หน้าพื้นที่/i }
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(full));
    else if (ent.isFile() && /\.(astro|md)$/i.test(ent.name)) out.push(full);
  }
  return out;
}

function visibleCopy(file, text) {
  if (/\.md$/i.test(file)) {
    // Frontmatter contains implementation field names such as primaryIntent; it is not rendered copy.
    text = text.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '');
  } else {
    // Astro frontmatter, comments, styles and scripts are not visible copy.
    text = text.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '');
    text = text.replace(/<!--([\s\S]*?)-->/g, '');
    text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
    text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  }
  return text;
}

function lineOf(text, index) { return text.slice(0, index).split('\n').length; }

export function runContentHygieneAudit() {
  const files = scanRoots.flatMap(walk);
  const findings = [];
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const text = visibleCopy(file, raw);
    for (const rule of forbidden) {
      rule.re.lastIndex = 0;
      const m = rule.re.exec(text);
      if (m) findings.push({ file: path.relative(rootDir, file), line: lineOf(text, m.index), issue: rule.label, sample: m[0] });
    }
    const codeRoute = /<code>\s*\/[^<]+<\/code>/i.exec(text);
    if (codeRoute) findings.push({ file: path.relative(rootDir, file), line: lineOf(text, codeRoute.index), issue: 'Internal route architecture rendered as code', sample: codeRoute[0] });
  }

  console.log('PRODUCTION CONTENT HYGIENE AUDIT');
  console.log(`Rendered-copy sources scanned: ${files.length}`);
  if (findings.length) {
    console.error(`FAIL: ${findings.length} production-copy hygiene finding(s)`);
    for (const f of findings) console.error(`- ${f.file}:${f.line} — ${f.issue} — ${f.sample}`);
    return { ok: false, findings };
  }
  console.log('PASS: no internal SEO, migration, template or route-architecture language found in rendered copy.');
  return { ok: true, findings: [] };
}

if (process.argv[1] === __filename) {
  const result = runContentHygieneAudit();
  if (!result.ok) process.exit(1);
}
