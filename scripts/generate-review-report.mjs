import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const reviewEntries = [
  {
    path: '/100-อันดับ-กล้อง-fujifilm-ในตลาดมือ/',
    legacySource: 'NONE (non-existent typo URL)',
    wpPostId: 'N/A',
    legacyTitle: 'N/A',
    legacyCanonical: 'N/A',
    legacyIndexable: 'NO',
    legacySitemap: 'NO',
    historicalEvidence: 'Non-existent URL variation of 10-อันดับ-กล้อง-fujifilm. 0 word count, no historical ranking/traffic value.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'Non-existent typo pattern. Marked as DRAFT (HTTP 404 private) to prevent index clutter.',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/10-อันดับ-กล้อง-fujifilm-ในตลาดมือ/',
    legacySource: 'src/content/posts/1352.md',
    wpPostId: '1352',
    legacyTitle: '10 อันดับ กล้อง Fujifilm ในตลาดมือสอง',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true)',
    legacySitemap: 'NO',
    historicalEvidence: 'Legacy thin ranking post (40 words). Set to noindex in V1 with canonical to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'Archived thin blog post not selected for survivor rebuild. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1090/',
    legacySource: 'src/content/posts/1090.md',
    wpPostId: '1090',
    legacyTitle: 'รับซื้อไอแพด แอร์ 6 iPad Air 6 อุบล',
    legacyCanonical: 'self',
    legacyIndexable: 'NO (noindex: true in V1 cleanup)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1090.md. Canonical slug was /รับซื้อไอแพด-แอร์-6-ipad-air-6-อุบล/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อไอแพด/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1199/',
    legacySource: 'src/content/posts/1199.md',
    wpPostId: '1199',
    legacyTitle: 'ขายโน๊ตบุ๊คอุบล',
    legacyCanonical: 'self',
    legacyIndexable: 'NO (noindex: true)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1199.md (ขายโน๊ตบุ๊คอุบล, 189 words). Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อโน๊ตบุ๊ค/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1209/',
    legacySource: 'src/content/quarantine/off-topic/1209.md',
    wpPostId: '1209',
    legacyTitle: 'ขายโน๊ตบุ๊คอุบล | รับซื้อโน๊ตบุ๊คอุบลราชธานี',
    legacyCanonical: 'self',
    legacyIndexable: 'NO (quarantined/gone)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1209.md. Corresponding semantic slug /ขายโน๊ตบุ๊คอุบล-รับซื้/ is in 208 GONE baseline.',
    equivalentPath: 'NONE',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'Internal numeric ID for quarantined post. Semantic slug handled by 410 GONE. Numeric alias retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1216/',
    legacySource: 'src/content/quarantine/off-topic/1216.md',
    wpPostId: '1216',
    legacyTitle: 'รับซื้อโน๊ตบุ๊คมือสอง อุบล | ขายโน๊ตบุ๊คอุบล | รับซื้อโน๊ตบุ๊คอุบลราชธานี',
    legacyCanonical: 'self',
    legacyIndexable: 'NO (quarantined/gone)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1216.md. Corresponding semantic slug /รับซื้อโน๊ตบุ๊คมือสอง-อ/ is in 208 GONE baseline.',
    equivalentPath: 'NONE',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'Internal numeric ID for quarantined post. Semantic slug handled by 410 GONE. Numeric alias retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1230/',
    legacySource: 'src/content/posts/1230.md',
    wpPostId: '1230',
    legacyTitle: 'ข้อดีที่ทำให้กล้อง Canon EOS M50 น่าสนใจ',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 41 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1230.md (thin blog post, 41 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin post. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1340/',
    legacySource: 'src/content/posts/1340.md',
    wpPostId: '1340',
    legacyTitle: 'รับซ่อมคอมพิวเตอร์ ยโสธร',
    legacyCanonical: 'self',
    legacyIndexable: 'NO (noindex: true, off-topic repair)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1340.md (123 words, off-topic repair service). Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อคอม/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for off-topic repair post. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1352/',
    legacySource: 'src/content/posts/1352.md',
    wpPostId: '1352',
    legacyTitle: '10 อันดับ กล้อง Fujifilm ในตลาดมือสอง',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1352.md (10-อันดับ-กล้อง-fujifilm, 40 words). Canonical pointed to /รับซื้อกล้อง/.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1362/',
    legacySource: 'src/content/posts/1362.md',
    wpPostId: '1362',
    legacyTitle: 'รับซื้อกล้อง ได้เงินทันใจ',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 35 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1362.md (thin post, 35 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin post. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1477/',
    legacySource: 'src/content/posts/1477.md',
    wpPostId: '1477',
    legacyTitle: 'รับซื้อกล้องมือสอง บุรีรัมย์',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (redirected via public/_redirects)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1477.md. The semantic slug /รับซื้อกล้องมือสอง-บุรี/ is in 44 301 Redirects registry.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'Internal numeric ID. Semantic slug handled by 301 Redirect. Numeric alias retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1480/',
    legacySource: 'src/content/posts/1480.md',
    wpPostId: '1480',
    legacyTitle: 'Buy Camera Sisaket',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 36 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1480.md (buy-camera-sisaket, 36 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin English slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1482/',
    legacySource: 'src/content/posts/1482.md',
    wpPostId: '1482',
    legacyTitle: 'Buy Camera Yasothon',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 36 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1482.md (buy-camera-yasothon, 36 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin English slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1494/',
    legacySource: 'src/content/posts/1494.md',
    wpPostId: '1494',
    legacyTitle: 'Buy Camera Udon',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 35 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1494.md (buy-camera-udon, 35 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin English slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1498/',
    legacySource: 'src/content/posts/1498.md',
    wpPostId: '1498',
    legacyTitle: 'Buy Camera Mukdahan',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 36 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1498.md (buy-camera-mukdahan, 36 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin English slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1500/',
    legacySource: 'src/content/posts/1500.md',
    wpPostId: '1500',
    legacyTitle: 'Buy Camera Nakonpanom',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 35 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1500.md (buy-camera-nakonpanom, 35 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin English slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1502/',
    legacySource: 'src/content/posts/1502.md',
    wpPostId: '1502',
    legacyTitle: 'Buy Camera Sakonnakon',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 36 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1502.md (buy-camera-sakonnakon, 36 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin English slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1504/',
    legacySource: 'src/content/posts/1504.md',
    wpPostId: '1504',
    legacyTitle: 'Buy Camera Bungkan',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 37 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1504.md (buy-camera-bungkan, 37 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin English slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1508/',
    legacySource: 'src/content/posts/1508.md',
    wpPostId: '1508',
    legacyTitle: 'Buy Camera Chaiyaphum',
    legacyCanonical: '/รับซื้อกล้อง/',
    legacyIndexable: 'NO (noindex: true, 39 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1508.md (buy-camera-chaiyaphum, 39 words). Canonical pointed to /รับซื้อกล้อง/. Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อกล้อง/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin English slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1511/',
    legacySource: 'src/content/posts/1511.md',
    wpPostId: '1511',
    legacyTitle: 'รับซื้อ Harddisk',
    legacyCanonical: 'self',
    legacyIndexable: 'NO (noindex: true, 44 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1511.md (รับซื้อ-harddisk, 44 words). Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อคอมประกอบ/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin hardware slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1515/',
    legacySource: 'src/content/posts/1515.md',
    wpPostId: '1515',
    legacyTitle: 'รับซื้อฮาร์ดดิส',
    legacyCanonical: 'self',
    legacyIndexable: 'NO (noindex: true, 42 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1515.md (รับซื้อฮาร์ดดิส, 42 words). Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อคอมประกอบ/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin hardware slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  },
  {
    path: '/1517/',
    legacySource: 'src/content/posts/1517.md',
    wpPostId: '1517',
    legacyTitle: 'We Buy Harddisk',
    legacyCanonical: 'self',
    legacyIndexable: 'NO (noindex: true, 44 words)',
    legacySitemap: 'NO',
    historicalEvidence: 'Raw WordPress numeric post ID for 1517.md (we-buy-harddisk, 44 words). Not in 63 approved survivors.',
    equivalentPath: '/รับซื้อคอมประกอบ/',
    recommendedState: 'DRAFT',
    redirectTarget: '',
    confidence: 'HIGH',
    reason: 'WordPress internal numeric ID alias for thin hardware slug. Retained as DRAFT (HTTP 404 private).',
    ownerReviewRequired: 'NO'
  }
];

// 1. Generate reports/seo/legacy-review-required.csv
const csvHeaders = [
  'path',
  'legacySource',
  'wpPostId',
  'legacyTitle',
  'legacyCanonical',
  'legacyIndexable',
  'legacySitemap',
  'historicalEvidence',
  'equivalentPath',
  'recommendedState',
  'redirectTarget',
  'confidence',
  'reason',
  'ownerReviewRequired'
];

const csvLines = [
  csvHeaders.join(',')
];

for (const entry of reviewEntries) {
  const row = [
    `"${entry.path}"`,
    `"${entry.legacySource}"`,
    `"${entry.wpPostId}"`,
    `"${entry.legacyTitle.replace(/"/g, '""')}"`,
    `"${entry.legacyCanonical}"`,
    `"${entry.legacyIndexable}"`,
    `"${entry.legacySitemap}"`,
    `"${entry.historicalEvidence.replace(/"/g, '""')}"`,
    `"${entry.equivalentPath}"`,
    `"${entry.recommendedState}"`,
    `"${entry.redirectTarget}"`,
    `"${entry.confidence}"`,
    `"${entry.reason.replace(/"/g, '""')}"`,
    `"${entry.ownerReviewRequired}"`
  ];
  csvLines.push(row.join(','));
}

const reportDir = path.join(rootDir, 'reports/seo');
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, 'legacy-review-required.csv'), csvLines.join('\n'), 'utf8');
console.log(`Generated reports/seo/legacy-review-required.csv with ${reviewEntries.length} entries.`);

// 2. Generate docs/legacy-review-required.md
let mdContent = `# รายงานการตรวจสอบหลักฐานและกำหนดสถานะ URL ประวัติศาสตร์ 22 เส้นทาง (Legacy Review Report)

**เอกสาร:** [reports/seo/legacy-review-required.csv](file:///c:/Users/User/Desktop/%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%80%E0%B8%88%E0%B8%84/werab-v2/reports/seo/legacy-review-required.csv)
**สถานะ:** ตรวจสอบหลักฐานดิบจาก WordPress / Legacy Repo ครบถ้วนทั้ง 22 เส้นทาง

---

## 1. บทสรุปการตรวจสอบหลักฐาน (Evidence Summary)

1. **กลุ่ม WordPress Numeric Permalinks (20 เส้นทาง):**
   - รหัสตัวเลขทั้งหมด (เช่น \`/1090/\`, \`/1199/\`, \`/1230/\` ... \`/1517/\`) ตรงกับรหัสไฟล์ \`wpPostId.md\` ในระบบเดิม 100%
   - สลักหลัก (Semantic Slugs) ของบทความเหล่านี้ในระบบเดิมเป็นบทความบาง (Thin Content 30-50 คำ) ที่ถูกตั้งค่า \`noindex: true\` และส่วนใหญ่มี Canonical ชี้เข้าสู่หมวดหมู่หลัก (\`/รับซื้อกล้อง/\`, \`/รับซื้อคอมประกอบ/\`)
   - ไม่มีเส้นทางตัวเลขใดเลยที่เคยปรากฏอยู่ใน Sitemap หรือเป็น URL หลักที่ได้รับอนุมัติในกลุ่ม 63 ผู้รอดชีวิต
   - **มติที่ได้รับมอบหมาย:** กำหนดสถานะเป็น **\`DRAFT\`** (HTTP 404 Private) เพื่อรักษาความสะอาดของดัชนี และไม่ส่งผลกระทบต่อสิทธิ์ประวัติศาสตร์

2. **กลุ่มบทความจัดอันดับกล้อง Fujifilm (2 เส้นทาง):**
   - \`/10-อันดับ-กล้อง-fujifilm-ในตลาดมือ/\`: เป็นบทความเดิม (\`1352.md\`) ที่มีเนื้อหาเพียง 40 คำ และตั้งค่า \`noindex: true\` ไว้แล้ว
   - \`/100-อันดับ-กล้อง-fujifilm-ในตลาดมือ/\`: เป็น URL รูปแบบพิมพ์ผิด (Typo Variant) ที่ไม่มีไฟล์เนื้อหาอยู่จริง
   - **มติที่ได้รับมอบหมาย:** กำหนดสถานะเป็น **\`DRAFT\`** (HTTP 404 Private)

---

## 2. ตารางแจกแจงมติสถานะทั้ง 22 เส้นทาง

| เส้นทาง (Path) | wpPostId | สลักดั้งเดิม (Legacy Slug) | สถานะความพร้อม (Legacy Status) | มติสถานะ V2 (Assigned State) | ความมั่นใจ |
| :--- | :---: | :--- | :--- | :---: | :---: |
`;

for (const e of reviewEntries) {
  mdContent += `| \`${e.path}\` | ${e.wpPostId} | ${e.legacyTitle} | ${e.legacyIndexable} | **\`${e.recommendedState}\`** | ${e.confidence} |\n`;
}

mdContent += `
---

## 3. สรุปผลกระทบต่อสถาปัตยกรรม V2 (Impact on V2 Architecture)

- **REVIEW_REQUIRED COUNT:** 0 เส้นทาง (ปลดล็อคข้อกำหนดความคลุมเครือเรียบร้อย)
- **DRAFT COUNT:** 22 เส้นทาง (ตอบกลับรหัส HTTP 404 ไม่เปิดเข้า Index และไม่เข้า Sitemap)
- **GONE (HTTP 410):** คงเดิม 208 เส้นทางตาม Authoritative Baseline 100%
- **SURVIVORS (63):** คงเดิม 13 REBUILD_INDEX, 10 NEW_REDIRECT, 11 EXISTING_REDIRECT, 29 HOLD_NOINDEX
- **ACTIVE INDEX (3):** คงเดิม (\`/\`, \`/รับซื้อลำโพง-อุดรธานี/\`, \`/รับซื้อลำโพง-สารคาม/\`)
`;

const docsDir = path.join(rootDir, 'docs');
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
fs.writeFileSync(path.join(docsDir, 'legacy-review-required.md'), mdContent, 'utf8');
console.log(`Generated docs/legacy-review-required.md.`);
