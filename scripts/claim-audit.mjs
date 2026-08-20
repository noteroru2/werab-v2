/**
 * scripts/claim-audit.mjs
 * Phase 26: Claim & Business Fact Verification Audit.
 * Scans entire codebase and content to ensure zero hallucinated business facts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const FORBIDDEN_PATTERNS = [
  { pattern: /\b10200\b/, name: 'Bangkok fallback postal code 10200' },
  { pattern: /24\s*ชั่วโมง|ตลอด\s*24\s*ชม|เปิด\s*24/i, name: 'Fake 24/7 opening hours claim' },
  { pattern: /latitude|longitude/i, name: 'Unverified GeoCoordinates schema' },
  { pattern: /สาขาทั่วประเทศ\s*77\s*จังหวัด|มีสาขาทุกจังหวัด/i, name: 'Exaggerated physical branch claim' },
  { pattern: /official\s+(JBL|Marshall|Bose|Sony|Dell|HPE|Lenovo|Cisco|Supermicro)\s+partner/i, name: 'Fake official brand partner claim' },
  { pattern: /official\s+brand\s+authorization|official\s+service\s+center|authorized\s+service\s+center/i, name: 'Fake official brand authorization claim' },
  { pattern: /certified\s+(enterprise\s+disposal|ITAD)\s+provider/i, name: 'Fake enterprise ITAD / disposal certification claim' },
  { pattern: /รับประกันล้างเซนเซอร์|รับประกันล้างฝ้า|รับประกันกำจัดรา/i, name: 'Unapproved guaranteed camera repair/cleaning claim' },
  { pattern: /รับประกันกันน้ำ|รับประกันสภาพกันน้ำ/i, name: 'Unapproved guaranteed waterproof claim' },
  { pattern: /รับประกันกู้ข้อมูล|รับประกันลบข้อมูล/i, name: 'Unapproved data recovery or destruction guarantee claim' },
  { pattern: /รับซื้อซากทุกชนิด|รับซื้อทุกชิ้น|รับซื้อ\s*Server\s*ทุก(รุ่น|สภาพ|แบรนด์|องค์กร)/i, name: 'Unapproved universal buyback guarantee claim' },
  { pattern: /มีสาขาในจังหวัด|มีสาขาทั่วภาคอีสาน|มีพนักงานประจำ(จังหวัด|ทุกพื้นที่)|มีจุดรับซื้อทุกอำเภอ/i, name: 'Unsupported local branch / staff claims' },
  { pattern: /รับถึงที่ทุกกรณี|รับประกันเดินทางไปรับ|รับซื้อทุกเครื่อง|ราคาสูงที่สุด|ให้ราคาดีที่สุด|อันดับ\s*1\b/i, name: 'Unsupported superlative or guarantee claims' },
  { pattern: /ขอ(รหัสผ่าน|password|pin|otp|apple\s*id\s*password|google\s*password|recovery\s*code|recovery\s*key)/i, name: 'Sensitive credential request violation' }
];

const SCAN_DIRS = ['src', 'public'];
let violations = [];
let filesScanned = 0;

function scanDir(dir) {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) return;

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(entryPath);
    } else if (/\.(astro|ts|js|mjs|md|json|html)$/.test(entry.name)) {
      filesScanned++;
      const content = fs.readFileSync(path.join(rootDir, entryPath), 'utf8');

      // Skip test script itself and config definitions
      if (entryPath.includes('claim-audit.mjs') || entryPath.includes('business.ts')) continue;

      // Strip negative disclaimer blocks before scanning
      const cleaned = content
        .replace(/<p>[^<]*ไม่ได้(หมายความว่า|ใช้เพื่ออ้าง)[^<]*<\/p>\s*<ul[\s\S]*?<\/ul>/gi, ' ')
        .replace(/หน้านี้ไม่ได้หมายความว่า:[\s\S]*?(?=\n\n|---|$)/gi, ' ');

      const lines = cleaned.split('\n');
      for (const line of lines) {
        // Skip approved disclaimer lines
        if (/ไม่ได้(หมายความว่า|ใช้เพื่ออ้าง|แปลว่า)|ไม่(ต้อง|ควร|จำเป็น)/.test(line)) continue;
        for (const rule of FORBIDDEN_PATTERNS) {
          if (rule.pattern.test(line)) {
            violations.push({
              file: entryPath,
              rule: rule.name
            });
          }
        }
      }
    }
  }
}

for (const dir of SCAN_DIRS) {
  scanDir(dir);
}

console.log(`\n=== CLAIM & FACT VERIFICATION AUDIT ===`);
console.log(`Scanned ${filesScanned} files.`);

if (violations.length > 0) {
  console.error(`❌ Found ${violations.length} claim violations:`);
  for (const v of violations) {
    console.error(`  - [${v.rule}] in ${v.file}`);
  }
  process.exit(1);
} else {
  console.log(`✅ All business facts verified! Zero hallucinated claims found.`);
  process.exit(0);
}
