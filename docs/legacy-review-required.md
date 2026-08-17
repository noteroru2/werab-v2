# รายงานการตรวจสอบหลักฐานและกำหนดสถานะ URL ประวัติศาสตร์ 22 เส้นทาง (Legacy Review Report)

**เอกสาร:** [reports/seo/legacy-review-required.csv](file:///c:/Users/User/Desktop/%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%80%E0%B8%88%E0%B8%84/werab-v2/reports/seo/legacy-review-required.csv)
**สถานะ:** ตรวจสอบหลักฐานดิบจาก WordPress / Legacy Repo ครบถ้วนทั้ง 22 เส้นทาง

---

## 1. บทสรุปการตรวจสอบหลักฐาน (Evidence Summary)

1. **กลุ่ม WordPress Numeric Permalinks (20 เส้นทาง):**
   - รหัสตัวเลขทั้งหมด (เช่น `/1090/`, `/1199/`, `/1230/` ... `/1517/`) ตรงกับรหัสไฟล์ `wpPostId.md` ในระบบเดิม 100%
   - สลักหลัก (Semantic Slugs) ของบทความเหล่านี้ในระบบเดิมเป็นบทความบาง (Thin Content 30-50 คำ) ที่ถูกตั้งค่า `noindex: true` และส่วนใหญ่มี Canonical ชี้เข้าสู่หมวดหมู่หลัก (`/รับซื้อกล้อง/`, `/รับซื้อคอมประกอบ/`)
   - ไม่มีเส้นทางตัวเลขใดเลยที่เคยปรากฏอยู่ใน Sitemap หรือเป็น URL หลักที่ได้รับอนุมัติในกลุ่ม 63 ผู้รอดชีวิต
   - **มติที่ได้รับมอบหมาย:** กำหนดสถานะเป็น **`DRAFT`** (HTTP 404 Private) เพื่อรักษาความสะอาดของดัชนี และไม่ส่งผลกระทบต่อสิทธิ์ประวัติศาสตร์

2. **กลุ่มบทความจัดอันดับกล้อง Fujifilm (2 เส้นทาง):**
   - `/10-อันดับ-กล้อง-fujifilm-ในตลาดมือ/`: เป็นบทความเดิม (`1352.md`) ที่มีเนื้อหาเพียง 40 คำ และตั้งค่า `noindex: true` ไว้แล้ว
   - `/100-อันดับ-กล้อง-fujifilm-ในตลาดมือ/`: เป็น URL รูปแบบพิมพ์ผิด (Typo Variant) ที่ไม่มีไฟล์เนื้อหาอยู่จริง
   - **มติที่ได้รับมอบหมาย:** กำหนดสถานะเป็น **`DRAFT`** (HTTP 404 Private)

---

## 2. ตารางแจกแจงมติสถานะทั้ง 22 เส้นทาง

| เส้นทาง (Path) | wpPostId | สลักดั้งเดิม (Legacy Slug) | สถานะความพร้อม (Legacy Status) | มติสถานะ V2 (Assigned State) | ความมั่นใจ |
| :--- | :---: | :--- | :--- | :---: | :---: |
| `/100-อันดับ-กล้อง-fujifilm-ในตลาดมือ/` | N/A | N/A | NO | **`DRAFT`** | HIGH |
| `/10-อันดับ-กล้อง-fujifilm-ในตลาดมือ/` | 1352 | 10 อันดับ กล้อง Fujifilm ในตลาดมือสอง | NO (noindex: true) | **`DRAFT`** | HIGH |
| `/1090/` | 1090 | รับซื้อไอแพด แอร์ 6 iPad Air 6 อุบล | NO (noindex: true in V1 cleanup) | **`DRAFT`** | HIGH |
| `/1199/` | 1199 | ขายโน๊ตบุ๊คอุบล | NO (noindex: true) | **`DRAFT`** | HIGH |
| `/1209/` | 1209 | ขายโน๊ตบุ๊คอุบล | รับซื้อโน๊ตบุ๊คอุบลราชธานี | NO (quarantined/gone) | **`DRAFT`** | HIGH |
| `/1216/` | 1216 | รับซื้อโน๊ตบุ๊คมือสอง อุบล | ขายโน๊ตบุ๊คอุบล | รับซื้อโน๊ตบุ๊คอุบลราชธานี | NO (quarantined/gone) | **`DRAFT`** | HIGH |
| `/1230/` | 1230 | ข้อดีที่ทำให้กล้อง Canon EOS M50 น่าสนใจ | NO (noindex: true, 41 words) | **`DRAFT`** | HIGH |
| `/1340/` | 1340 | รับซ่อมคอมพิวเตอร์ ยโสธร | NO (noindex: true, off-topic repair) | **`DRAFT`** | HIGH |
| `/1352/` | 1352 | 10 อันดับ กล้อง Fujifilm ในตลาดมือสอง | NO (noindex: true) | **`DRAFT`** | HIGH |
| `/1362/` | 1362 | รับซื้อกล้อง ได้เงินทันใจ | NO (noindex: true, 35 words) | **`DRAFT`** | HIGH |
| `/1477/` | 1477 | รับซื้อกล้องมือสอง บุรีรัมย์ | NO (redirected via public/_redirects) | **`DRAFT`** | HIGH |
| `/1480/` | 1480 | Buy Camera Sisaket | NO (noindex: true, 36 words) | **`DRAFT`** | HIGH |
| `/1482/` | 1482 | Buy Camera Yasothon | NO (noindex: true, 36 words) | **`DRAFT`** | HIGH |
| `/1494/` | 1494 | Buy Camera Udon | NO (noindex: true, 35 words) | **`DRAFT`** | HIGH |
| `/1498/` | 1498 | Buy Camera Mukdahan | NO (noindex: true, 36 words) | **`DRAFT`** | HIGH |
| `/1500/` | 1500 | Buy Camera Nakonpanom | NO (noindex: true, 35 words) | **`DRAFT`** | HIGH |
| `/1502/` | 1502 | Buy Camera Sakonnakon | NO (noindex: true, 36 words) | **`DRAFT`** | HIGH |
| `/1504/` | 1504 | Buy Camera Bungkan | NO (noindex: true, 37 words) | **`DRAFT`** | HIGH |
| `/1508/` | 1508 | Buy Camera Chaiyaphum | NO (noindex: true, 39 words) | **`DRAFT`** | HIGH |
| `/1511/` | 1511 | รับซื้อ Harddisk | NO (noindex: true, 44 words) | **`DRAFT`** | HIGH |
| `/1515/` | 1515 | รับซื้อฮาร์ดดิส | NO (noindex: true, 42 words) | **`DRAFT`** | HIGH |
| `/1517/` | 1517 | We Buy Harddisk | NO (noindex: true, 44 words) | **`DRAFT`** | HIGH |

---

## 3. สรุปผลกระทบต่อสถาปัตยกรรม V2 (Impact on V2 Architecture)

- **REVIEW_REQUIRED COUNT:** 0 เส้นทาง (ปลดล็อคข้อกำหนดความคลุมเครือเรียบร้อย)
- **DRAFT COUNT:** 22 เส้นทาง (ตอบกลับรหัส HTTP 404 ไม่เปิดเข้า Index และไม่เข้า Sitemap)
- **GONE (HTTP 410):** คงเดิม 208 เส้นทางตาม Authoritative Baseline 100%
- **SURVIVORS (63):** คงเดิม 13 REBUILD_INDEX, 10 NEW_REDIRECT, 11 EXISTING_REDIRECT, 29 HOLD_NOINDEX
- **ACTIVE INDEX (3):** คงเดิม (`/`, `/รับซื้อลำโพง-อุดรธานี/`, `/รับซื้อลำโพง-สารคาม/`)
