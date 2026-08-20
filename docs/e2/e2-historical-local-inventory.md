# PHASE E2.0 / E2.1 — HISTORICAL LOCAL WINNERS INVENTORY & REMEDIATION REPORT

**โครงการ:** เรารับซื้อ.com V2 Strategy & Local Equity Architecture  
**สถานะ:** GONE COLLISION REMEDIATION COMPLETED & INVENTORY LOCKED  
**วันที่บันทึก:** 20 สิงหาคม 2026  
**เอกสารอ้างอิงหลัก:** [`reports/seo/new-ia.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/new-ia.csv), [`reports/seo/e2-historical-local-inventory.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/e2-historical-local-inventory.csv), [`docs/strategy/new-information-architecture.md`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/docs/strategy/new-information-architecture.md)

---

## 1. Executive Summary & Remediation Verdict

| ตัวชี้วัดการตรวจสอบ (Audit Metric) | ผลลัพธ์ที่ตรวจพบ (Result) | สถานะความถูกต้อง (Status) |
| :--- | :---: | :---: |
| **VERDICT** | **REMEDIATION COMPLETED (ALL PASS)** | 🟢 **PASS** |
| **EXACT HISTORICAL LOCAL WINNERS** | **36 / 36 URLs** | 🟢 **100% MATCH** |
| **AUTHORITATIVE TIER COUNTS** | **Tier 1: 17 \| Tier 2: 15 \| Tier 3: 4** | 🟢 **LOCKED** |
| **GSC EVIDENCE MATCHED** | **35 URLs** (Clicks ≥ 1 หรือ Imp ≥ 1) | 🟢 **PASS** |
| **GSC EVIDENCE NONE** | **1 URL** (`/รับซื้อไอแพด-ขอนแก่น-ipad/`) | ℹ️ **PRESERVED IN IA** |
| **CURRENT INDEX (ในกลุ่ม 36)** | **2 URLs** (`/รับซื้อลำโพง-อุดรธานี/`, `/รับซื้อลำโพง-สารคาม/`) | 🟢 **ALREADY ACTIVE** |
| **CURRENT HOLD_NOINDEX (ในกลุ่ม 36)** | **8 URLs** (6 เดิม + 2 Remediated) | 🟢 **PASS** |
| **CURRENT DRAFT (404/Unregistered)** | **26 URLs** | ℹ️ **PENDING CONTENT** |
| **CURRENT REDIRECT** | **0 URLs** | 🟢 **ZERO CONFLICT** |
| **CURRENT GONE (410 Collision)** | **0 URLs** (แก้ไขเรียบร้อยใน E2.1) | 🟢 **REMEDIATED** |
| **REDIRECT COLLISIONS** | **0 URLs** | 🟢 **ZERO CONFLICT** |
| **DUPLICATE LOCAL INTENT CONFLICTS** | **0 Conflicts** (Intent Deduplicated) | 🟢 **CLEAN** |
| **MISSING PARENT MONEY HUBS** | **0 URLs** (100% Parent Assigned) | 🟢 **CLEAN** |
| **TIER SOURCE MISSING** | **0 URLs** (100% Tier Source Found) | 🟢 **CLEAN** |

---

## 2. Authoritative Decision Order & Equity Rules

การระบุตัวตนและจัดกลุ่ม URL ประวัติศาสตร์ทั้ง 36 หน้ายึดตามลำดับชั้นความสำคัญ (Decision Precedence) ดังนี้:

1. **Final Phase A–D Approved Master Map / Final IA:** [`reports/seo/new-ia.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/new-ia.csv) และ [`docs/strategy/new-information-architecture.md`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/docs/strategy/new-information-architecture.md)
2. **Current Survivor Decisions & Migration Snapshots:** [`migration/approved/survivor-decisions.json`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/migration/approved/survivor-decisions.json) และ [`reports/seo/preserve-disposition.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/preserve-disposition.csv)
3. **Current SEO Manifest & Resolver Lifecycle:** [`src/config/seo/manifest.ts`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts)
4. **Historical GSC Evidence Window (2026-04-07 → 2026-07-06):** [`reports/seo/url-equity-master.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/url-equity-master.csv) และ `docs/gsc/rerubsue_gsc_recovery_plan_2026-07-06.xlsx`

> [!IMPORTANT]
> **กฎความคงอยู่ของ URL ดั้งเดิม (Critical URL Equity Rule):**
> โครงการ V2 จะไม่ทำการ Normalize, ปรับแต่งให้สวยงาม (Beautify), หรือแปลง Slug ดั้งเดิมเป็นรูปแบบอื่น เช่น `/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/` จะคงไว้ตามโครงสร้าง Master Map ดั้งเดิม เพื่อรักษาค่าพลัง Backlink และประวัติ Indexation ที่ Search Engine บันทึกไว้

---

## 3. ตารางบัญชีรายชื่อประวัติศาสตร์ทั้ง 36 หน้า (Full 36-Row Locked Table)

| # | ระดับ (Tier) | URL ดั้งเดิม (Historical URL) | สินค้า (Product) | พื้นที่เป้าหมาย (Location) | Parent Hub | Clicks (90d) | Imp (90d) | CTR | Avg Pos | GSC Class | Master Map Decision | สถานะรันไทม์ปัจจุบัน | ความพร้อมการปล่อยหน้า (Readiness) |
| :-: | :--- | :--- | :--- | :--- | :--- | :-: | :-: | :-: | :-: | :---: | :--- | :---: | :--- |
| 1 | `TIER_1_HIGH_EQUITY` | `/รับซื้อลำโพง-อุดรธานี/` | ลำโพงบลูทูธ | อุดรธานี | `/รับซื้อลำโพง/` | 6 | 104 | 5.77% | 9.49 | `VERY_HIGH` | PRESERVE_IMPROVE | `INDEX` | 🟢 **ALREADY_ACTIVE_INDEX** |
| 2 | `TIER_1_HIGH_EQUITY` | `/รับซื้อลำโพง-สารคาม/` | ลำโพงบลูทูธ | มหาสารคาม | `/รับซื้อลำโพง/` | 4 | 28 | 14.29% | 19.61 | `HIGH` | PRESERVE_IMPROVE | `INDEX` | 🟢 **ALREADY_ACTIVE_INDEX** |
| 3 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/` | ลำโพงบลูทูธ (JBL/Marshall) | ร้อยเอ็ด | `/รับซื้อลำโพง/` | 5 | 36 | 13.89% | 9.64 | `HIGH` | PRESERVE_REWRITE | `HOLD_NOINDEX` | 🟡 READY_FOR_CONTENT_E2 |
| 4 | `TIER_3_WEAK_BUT_STRATEGIC` | `/รับซื้อลำโพง-ยโสธร/` | ลำโพงบลูทูธ | ยโสธร | `/รับซื้อลำโพง/` | 3 | 28 | 10.71% | 9.50 | `MEDIUM` | PRESERVE_REWRITE | `HOLD_NOINDEX` | 🟡 READY_FOR_CONTENT_E2 |
| 5 | `TIER_1_HIGH_EQUITY` | `/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/` | โน๊ตบุ๊ค / แล็ปท็อป | อุบลราชธานี | `/รับซื้อโน๊ตบุ๊ค/` | 75 | 973 | 7.71% | 7.59 | `VERY_HIGH` | PRESERVE_REWRITE | `HOLD_NOINDEX` | 🟡 **REMEDIATED (HOLD_NOINDEX)** |
| 6 | `TIER_1_HIGH_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-เลย/` | โน๊ตบุ๊ค / แล็ปท็อป | เลย | `/รับซื้อโน๊ตบุ๊ค/` | 20 | 164 | 12.20% | 9.34 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 7 | `TIER_1_HIGH_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-บุรีรัม/` | โน๊ตบุ๊ค / แล็ปท็อป | บุรีรัมย์ | `/รับซื้อโน๊ตบุ๊ค/` | 20 | 240 | 8.33% | 7.67 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 8 | `TIER_1_HIGH_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/` | โน๊ตบุ๊ค / แล็ปท็อป | ชัยภูมิ | `/รับซื้อโน๊ตบุ๊ค/` | 15 | 320 | 4.69% | 8.23 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 9 | `TIER_1_HIGH_EQUITY` | `/รับซื้อ-notebook-อำเภอพล-ขอนแก่น/` | โน๊ตบุ๊ค / แล็ปท็อป | อำเภอพล (ขอนแก่น) | `/รับซื้อโน๊ตบุ๊ค/` | 15 | 206 | 7.28% | 10.72 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 10 | `TIER_1_HIGH_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-สกลนคร/` | โน๊ตบุ๊ค / แล็ปท็อป | สกลนคร | `/รับซื้อโน๊ตบุ๊ค/` | 12 | 276 | 4.35% | 9.07 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 11 | `TIER_1_HIGH_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-นครพนม/` | โน๊ตบุ๊ค / แล็ปท็อป | นครพนม | `/รับซื้อโน๊ตบุ๊ค/` | 12 | 128 | 9.38% | 7.66 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 12 | `TIER_1_HIGH_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-นครราชส/` | โน๊ตบุ๊ค / แล็ปท็อป | นครราชสีมา (โคราช) | `/รับซื้อโน๊ตบุ๊ค/` | 11 | 296 | 3.72% | 9.52 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 13 | `TIER_1_HIGH_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/` | โน๊ตบุ๊ค / แล็ปท็อป | ยโสธร | `/รับซื้อโน๊ตบุ๊ค/` | 10 | 76 | 13.16% | 6.03 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 14 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อ-notebook-ชุมแพ-ขอนแก่น/` | โน๊ตบุ๊ค / แล็ปท็อป | อำเภอชุมแพ (ขอนแก่น) | `/รับซื้อโน๊ตบุ๊ค/` | 9 | 103 | 8.74% | 11.84 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 15 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/` | โน๊ตบุ๊ค / แล็ปท็อป | ขอนแก่น | `/รับซื้อโน๊ตบุ๊ค/` | 9 | 506 | 1.78% | 14.47 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 16 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-กาฬสินธ/` | โน๊ตบุ๊ค / แล็ปท็อป | กาฬสินธุ์ | `/รับซื้อโน๊ตบุ๊ค/` | 9 | 247 | 3.64% | 8.06 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 17 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-อุดรธาน/` | โน๊ตบุ๊ค / แล็ปท็อป | อุดรธานี | `/รับซื้อโน๊ตบุ๊ค/` | 5 | 86 | 5.81% | 9.09 | `HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 18 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-ร้อยเอ็/` | โน๊ตบุ๊ค / แล็ปท็อป | ร้อยเอ็ด | `/รับซื้อโน๊ตบุ๊ค/` | 6 | 187 | 3.21% | 7.35 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 19 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อโน๊ตบุ๊ค-หนองบัว/` | โน๊ตบุ๊ค / แล็ปท็อป | หนองบัวลำภู | `/รับซื้อโน๊ตบุ๊ค/` | 6 | 61 | 9.84% | 7.18 | `HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 20 | `TIER_1_HIGH_EQUITY` | `/รับซื้อคอม-อุดรธานี/` | คอมพิวเตอร์ / PC | อุดรธานี | `/รับซื้อคอม/` | 45 | 498 | 9.04% | 8.21 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 21 | `TIER_1_HIGH_EQUITY` | `/รับซื้อคอม-ขอนแก่น/` | คอมพิวเตอร์ / PC | ขอนแก่น | `/รับซื้อคอม/` | 26 | 496 | 5.24% | 13.39 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 22 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อคอม-สารคาม/` | คอมพิวเตอร์ / PC | มหาสารคาม | `/รับซื้อคอม/` | 4 | 107 | 3.74% | 10.26 | `HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 23 | `TIER_1_HIGH_EQUITY` | `/รับซื้อไอโฟน-มหาสารคาม/` | ไอโฟน / iPhone | มหาสารคาม | `/รับซื้อไอโฟน/` | 14 | 346 | 4.05% | 9.56 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 24 | `TIER_1_HIGH_EQUITY` | `/รับซื้อมือถือ-อุบล/` | โทรศัพท์มือถือ / ไอโฟน | อุบลราชธานี | `/รับซื้อไอโฟน/` | 19 | 435 | 4.37% | 12.67 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 25 | `TIER_1_HIGH_EQUITY` | `/รับซื้อโทรศัพท์มือถือ-จ/` | โทรศัพท์มือถือ / สมาร์ทโฟน | ภูมิภาคอีสาน (Regional) | `/รับซื้อไอโฟน/` | 25 | 746 | 3.35% | 9.13 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 26 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/` | ไอโฟน / iPhone | ร้อยเอ็ด | `/รับซื้อไอโฟน/` | 5 | 174 | 2.87% | 10.16 | `VERY_HIGH` | PRESERVE_REWRITE | `HOLD_NOINDEX` | 🟡 READY_FOR_CONTENT_E2 |
| 27 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อโทรศัพท์-มือถือ-ย/` | โทรศัพท์มือถือ / ไอโฟน | ยโสธร | `/รับซื้อไอโฟน/` | 9 | 135 | 6.67% | 11.02 | `VERY_HIGH` | PRESERVE_REWRITE | `HOLD_NOINDEX` | 🟡 **REMEDIATED (HOLD_NOINDEX)** |
| 28 | `TIER_3_WEAK_BUT_STRATEGIC` | `/รับซื้อไอแพด-ขอนแก่น-ipad/` | ไอแพด / iPad | ขอนแก่น | `/รับซื้อไอแพด/` | NONE | NONE | NONE | NONE | `NONE` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 29 | `TIER_3_WEAK_BUT_STRATEGIC` | `/รับซื้อไอแพด-ยโสธร-ipad/` | ไอแพด / iPad | ยโสธร | `/รับซื้อไอแพด/` | 3 | 24 | 12.50% | 11.67 | `MEDIUM` | PRESERVE_REWRITE | `HOLD_NOINDEX` | 🟡 READY_FOR_CONTENT_E2 |
| 30 | `TIER_1_HIGH_EQUITY` | `/รับซื้อเมืองขอนแก่น/` | แมคบุ๊ค / MacBook | ขอนแก่น | `/รับซื้อแมคบุ๊ค/` | 11 | 133 | 8.27% | 11.54 | `VERY_HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 31 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อmacbook-อุดรธานี/` | แมคบุ๊ค / MacBook | อุดรธานี | `/รับซื้อแมคบุ๊ค/` | 4 | 34 | 11.76% | 10.41 | `HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 32 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อกล้องมือสองมุก/` | กล้อง / เลนส์ | มุกดาหาร | `/รับซื้อกล้อง/` | 5 | 44 | 11.36% | 10.75 | `HIGH` | PRESERVE_REWRITE | `HOLD_NOINDEX` | 🟡 READY_FOR_CONTENT_E2 |
| 33 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อกล้องอุบล-กล้องcanon-niko/` | กล้อง / เลนส์ | อุบลราชธานี | `/รับซื้อกล้อง/` | 4 | 91 | 4.40% | 10.44 | `HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 34 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อกล้อง-ยโสธร/` | กล้อง / เลนส์ | ยโสธร | `/รับซื้อกล้อง/` | 4 | 50 | 8.00% | 7.54 | `HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 35 | `TIER_2_MODERATE_EQUITY` | `/รับซื้อกล้องถ่ายรูป-ศรี/` | กล้อง / เลนส์ | ศรีสะเกษ | `/รับซื้อกล้อง/` | 4 | 41 | 9.76% | 6.98 | `HIGH` | PRESERVE_REWRITE | `DRAFT` | ⚪ PENDING_REGISTRATION |
| 36 | `TIER_3_WEAK_BUT_STRATEGIC` | `/รับซื้อกล้องมือสองสุร/` | กล้อง / เลนส์ | สุรินทร์ | `/รับซื้อกล้อง/` | 0 | 58 | 0.00% | 9.31 | `MEDIUM` | PRESERVE_REWRITE | `HOLD_NOINDEX` | 🟡 READY_FOR_CONTENT_E2 |

---

## 4. ผลการแก้ไขข้อขัดแย้ง GONE (Remediation Details)

### 4.1 รายละเอียดการปลดล็อคข้อขัดแย้ง
1. 🟢 **`/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/`**
   * *สถานะเดิม:* `GONE` (HTTP 410)
   * *สถานะใหม่:* `HOLD_NOINDEX` (HTTP 200, robots: `noindex,follow`, sitemap: NO, indexable: NO)
   * *การแก้ไข:* นำออกจาก `src/config/seo/gone.ts` และลงทะเบียนใน `src/config/seo/manifest.ts` ใต้กลุ่ม `REBUILD_INDEX_CANDIDATES` โดยกำหนด `contentStatus: CONTENT_REQUIRED`
2. 🟢 **`/รับซื้อโทรศัพท์-มือถือ-ย/`**
   * *สถานะเดิม:* `GONE` (HTTP 410)
   * *สถานะใหม่:* `HOLD_NOINDEX` (HTTP 200, robots: `noindex,follow`, sitemap: NO, indexable: NO)
   * *การแก้ไข:* นำออกจาก `src/config/seo/gone.ts` และลงทะเบียนใน `src/config/seo/manifest.ts` ใต้กลุ่ม `REBUILD_INDEX_CANDIDATES` โดยกำหนด `contentStatus: CONTENT_REQUIRED`

### 4.2 สรุปการเปลี่ยนแปลงจำนวน GONE
* **GONE ก่อนหน้า:** **208 URLs**
* **GONE ที่ถูกลบออก (Remediated):** **2 URLs** (`/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/`, `/รับซื้อโทรศัพท์-มือถือ-ย/`)
* **GONE ที่เพิ่มเข้ามา:** **0 URLs**
* **GONE ปัจจุบัน (Reconciled Active):** **206 URLs**

---

## 5. การตรวจสอบความถูกต้องของ Mapping พิเศษ (Read-Only Mapping Verification)

### A. `/รับซื้อโทรศัพท์มือถือ-จ/`
* **MAPPING CONFIRMED:** 🟢 **YES**
* **MASTER MAP SOURCE:** [`reports/seo/new-ia.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/new-ia.csv) (Node `LOCAL_PHONE_REGIONAL`, Line 43) และ [`reports/seo/url-equity-master.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/url-equity-master.csv)
* **เหตุผลรองรับ:** ในระบบ WordPress ดั้งเดิม Title คือ *"รับซื้อโทรศัพท์มือถือ จังหวัดร้อยเอ็ด ให้ราคาสูงที่สุด ไปรับถึงที่"* โดย Slug ถูกตัดทอนเหลือ `/รับซื้อโทรศัพท์มือถือ-จ/` ซึ่งส่งผลให้ URL นี้ติดอันดับและรับ Traffic กว้างขวางในระดับภูมิภาคอีสาน (Clicks = 25, Imp = 746) Master Map จึงจัดให้เป็นหน้า Local Phone Regional โดยมี Parent Hub คือ `/รับซื้อไอโฟน/`

### B. `/รับซื้อเมืองขอนแก่น/`
* **MAPPING CONFIRMED:** 🟢 **YES**
* **MASTER MAP SOURCE:** [`reports/seo/new-ia.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/new-ia.csv) (Node `LOCAL_MACBOOK_KHONKAEN`, Line 48) และ [`reports/seo/url-equity-master.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/url-equity-master.csv)
* **เหตุผลรองรับ:** ในระบบดั้งเดิม Title คือ *"รับซื้อ MacBook, iMac , iPhone , iPad เมืองขอนแก่น ขอนแก่น"* ซึ่งเน้นกลุ่มสินค้าตระกูล Apple Mac ในเขตอำเภอเมืองขอนแก่นรอบมหาวิทยาลัยขอนแก่น (Clicks = 11, Imp = 133, Pos = 11.54) Master Map จึงจัดสรรให้เป็น MacBook Local Winner ประจำขอนแก่น เชื่อมโยงกับ Parent Hub `/รับซื้อแมคบุ๊ค/`

---

## 6. ผลการตรวจสอบความสมบูรณ์ของระบบพื้นฐาน (Baseline Regression Audit)

| การทดสอบความสอดคล้องของระบบ (System Check) | ค่าเป้าหมายที่คาดหวัง | ผลการรันตรวจสอบจริง | สถานะ |
| :--- | :---: | :---: | :---: |
| **Active INDEX Pages** | 13 | 13 | 🟢 **MATCH** |
| **Sitemap XML URLs** | 13 | 13 | 🟢 **MATCH** |
| **GONE (410) Paths** | 206 | 206 | 🟢 **MATCH** |
| **Active Redirects (301)** | 44 | 44 | 🟢 **MATCH** |
| **Unexpected INDEX Pages** | 0 | 0 | 🟢 **MATCH** |
| **Money Hub Content Copy Integrity** | 11 / 11 PASS | 11 / 11 PASS (Exact Hashes) | 🟢 **MATCH** |
| **Survivor Parity Audit** | 63 / 63 PASS | 63 / 63 PASS | 🟢 **MATCH** |
| **E2 Master Map ↔ Runtime Parity** | 36 / 36 PASS | 36 / 36 PASS (0 Collisions) | 🟢 **MATCH** |
| **Master QA Test Suite (11 Audits)** | 11 / 11 PASS | 11 / 11 Passed, 0 Failed | 🟢 **MATCH** |

---

> [!NOTE]
> **STOP RULE CONFIRMATION:**  
> การแก้ไขข้อขัดแย้ง GONE สิ้นสุดลงอย่างสมบูรณ์ ไม่มีข้อขัดแย้งตกค้าง ไม่มีการปล่อยหน้า INDEX และไม่มีการสร้างเนื้อหาใหม่ ระบบหยุดรอรับคำสั่งจาก Owner เพื่อเข้าสู่กระบวนการเขียนเนื้อหา E2 ใน Batch ถัดไป
