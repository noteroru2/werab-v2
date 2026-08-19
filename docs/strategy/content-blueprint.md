# พิมพ์เขียวเนื้อหาและคิวการผลิต เรารับซื้อ.com V2 (Content Blueprint & Production Queue)

**โครงการ:** เรารับซื้อ.com V2 Strategy & Content Blueprint  
**วันที่ปรับปรุงล่าสุด:** 19 สิงหาคม 2026  
**เอกสารอ้างอิง:** [`reports/seo/content-production-queue.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/content-production-queue.csv) และ [`reports/seo/content-blueprint.csv`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/reports/seo/content-blueprint.csv)

---

## 1. ลำดับการพึ่งพาของเนื้อหา (Content Dependency Ordering)

> ⛔ **ข้อกำหนดลำดับการผลิต (Dependency Rule):**
> **ห้ามผลิตหรือปล่อยหน้าลูก (Local/Child Page) ก่อนที่หน้าหมวดหมู่แม่ (Parent Money Hub) จะเขียนเสร็จสมบูรณ์**

```mermaid
graph TD
    subgraph Phase1["1. รากฐานเว็บไซต์ (Foundation)"]
        F1["/ (หน้าแรก)"]
        F2["/เกี่ยวกับ/ & /ติดต่อ/"]
        F3["/วิธีขาย/ & /เช็กราคาก่อนขาย/"]
    end
    
    subgraph Phase2["2. หมวดหมู่สร้างรายได้หลัก (Money Hubs)"]
        M1["/รับซื้อ/ (Central Directory)"]
        M2["/รับซื้อโน๊ตบุ๊ค/, /รับซื้อคอม/, /รับซื้อแมคบุ๊ค/"]
        M3["/รับซื้อไอโฟน/, /รับซื้อไอแพด/, /รับซื้อกล้อง/, /รับซื้อลำโพง/"]
        M4["/รับซื้อซากคอมพิวเตอร์/"]
    end
    
    subgraph Phase3["3. หน้าย่อยและพื้นที่ประวัติศาสตร์ (Children & Local)"]
        L1["15 Notebook Local Winners"]
        L2["3 PC Computer Local Winners"]
        L3["5 Mobile Phone Local Winners"]
        L4["5 Camera & Brand Winners"]
        L5["4 Speaker Local Winners"]
    end
    
    subgraph Phase4["4. คู่มือสภาพและเกณฑ์ราคา (Condition & Guides)"]
        C1["5 Condition & Valuation Guides"]
        C2["3 How-To & Spec Guides"]
    end
    
    Phase1 --> Phase2
    Phase2 --> Phase3
    Phase2 --> Phase4
```

---

## 2. โครงสร้างคิวการผลิตเนื้อหา 7 ชุด (Reconciled Production Batches)

จำนวนหน้าในคิวการผลิตทั้งหมด **61 หน้าเฉพาะ** ได้รับการจัดกลุ่มตามลำดับการพึ่งพาและความสำคัญของ Search Equity:

| ชุดการผลิต (Batch) | บทบาทและประเภทเนื้อหา | จำนวนหน้า | รายการ URL สำคัญ | เงื่อนไขการปลดล็อก (Dependency) |
| :--- | :--- | :---: | :--- | :--- |
| **Batch 0** | Foundation & Core Money Hubs | **14** | `/`, `/รับซื้อ/`, `/เช็กราคาก่อนขาย/`, `/วิธีขาย/`, `/เกี่ยวกับ/`, `/ติดต่อ/`, `/ผลงาน/`, `/รับซื้อโน๊ตบุ๊ค/`, `/รับซื้อคอม/`, `/รับซื้อแมคบุ๊ค/`, `/รับซื้อไอโฟน/`, `/รับซื้อไอแพด/`, `/รับซื้อกล้อง/`, `/รับซื้อลำโพง/` | Root Framework |
| **Batch 1** | High-Equity Historical Money URLs | **17** | `/รับซื้อซากคอมพิวเตอร์/`, `/รับซื้อลำโพง-อุดรธานี/` (Active), `/รับซื้อลำโพง-สารคาม/` (Active), `/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/`, `/รับซื้อคอม-อุดรธานี/`, `/รับซื้อคอม-ขอนแก่น/`, `/รับซื้อโทรศัพท์มือถือ-จ/`, `/รับซื้อโน๊ตบุ๊ค-บุรีรัม/`, `/รับซื้อโน๊ตบุ๊ค-เลย/`, `/รับซื้อ-notebook-อำเภอพล-ขอนแก่น/`, `/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/`, `/รับซื้อไอโฟน-มหาสารคาม/`, `/รับซื้อโน๊ตบุ๊ค-สกลนคร/`, `/รับซื้อโน๊ตบุ๊ค-นครพนม/`, `/รับซื้อเมืองขอนแก่น/`, `/รับซื้อโน๊ตบุ๊ค-นครราชส/`, `/รับซื้อมือถือ-อุบล/` | Batch 0 Category Hubs |
| **Batch 2** | Notebook & Enterprise Server | **9** | `/รับซื้อ-server/`, `/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/`, `/รับซื้อ-notebook-ชุมแพ-ขอนแก่น/`, `/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/`, `/รับซื้อโน๊ตบุ๊ค-กาฬสินธ/`, `/รับซื้อโน๊ตบุ๊ค-อุดรธาน/`, `/รับซื้อโน๊ตบุ๊ค-ร้อยเอ็/`, `/รับซื้อโน๊ตบุ๊ค-หนองบัว/`, `/รับซื้อคอม-สารคาม/` | `/รับซื้อโน๊ตบุ๊ค/` & `/รับซื้อคอม/` |
| **Batch 3** | iPhone / iPad / MacBook | **5** | `/รับซื้อโทรศัพท์-มือถือ-ย/`, `/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/`, `/รับซื้อไอแพด-ขอนแก่น-ipad/`, `/รับซื้อไอแพด-ยโสธร-ipad/`, `/รับซื้อmacbook-อุดรธานี/` | `/รับซื้อไอโฟน/`, `/รับซื้อไอแพด/`, `/รับซื้อแมคบุ๊ค/` |
| **Batch 4** | Camera & Audio Hubs | **8** | `/รับซื้อกล้อง-fujifilm-ฟูจิฟิล์ม/`, `/รับซื้อกล้องมือสองมุก/`, `/รับซื้อกล้องอุบล-กล้องcanon-niko/`, `/รับซื้อกล้อง-ยโสธร/`, `/รับซื้อกล้องถ่ายรูป-ศรี/`, `/รับซื้อกล้องมือสองสุร/`, `/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/`, `/รับซื้อลำโพง-ยโสธร/` | `/รับซื้อกล้อง/` & `/รับซื้อลำโพง/` |
| **Batch 5** | Condition & Valuation Guides | **5** | `/สภาพสินค้า/จอแตก/`, `/สภาพสินค้า/เปิดไม่ติด/`, `/สภาพสินค้า/แบตเสื่อม/`, `/สภาพสินค้า/ไม่มีอุปกรณ์/`, `/สภาพสินค้า/ควรซ่อมก่อนขายไหม/` | `/เช็กราคาก่อนขาย/` |
| **Batch 6** | Decision Guides & How-To | **3** | `/คู่มือ/วิธีล้างข้อมูล-factory-reset/`, `/คู่มือ/วิธีตรวจสเปกก่อนขาย/`, `/คู่มือ/วิธีถ่ายรูปประเมินราคา/` | `/วิธีขาย/` |
| **ยอดรวม** | **7 Batches สมบูรณ์** | **61** | **ครอบคลุมโครงสร้าง V2 ครบ 100%** | **ไม่มีหน้าซ้ำซ้อน** |

---

## 3. รายชื่อ Top 20 หน้าที่ต้องเขียนก่อนในอนาคต (Top 20 Priority Pages)

1. [`/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — หน้าแรก เรารับซื้อ.com (**Active INDEX**)
2. [`/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค อุบลราชธานี (Clicks: 75)
3. [`/รับซื้อคอม-อุดรธานี/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อคอมพิวเตอร์/PC อุดรธานี (Clicks: 45)
4. [`/รับซื้อคอม-ขอนแก่น/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อคอมพิวเตอร์ ขอนแก่น (Clicks: 26)
5. [`/รับซื้อโทรศัพท์มือถือ-จ/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อมือถือ/สมาร์ทโฟน ภาคอีสาน (Clicks: 25)
6. [`/รับซื้อโน๊ตบุ๊ค-บุรีรัม/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค บุรีรัมย์ (Clicks: 20)
7. [`/รับซื้อโน๊ตบุ๊ค-เลย/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค เลย (Clicks: 20)
8. [`/รับซื้อมือถือ-อุบล/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อมือถือ อุบลราชธานี (Clicks: 19)
9. [`/รับซื้อ-notebook-อำเภอพล-ขอนแก่น/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค อำเภอพล ขอนแก่น (Clicks: 15)
10. [`/รับซื้อซากคอมพิวเตอร์/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อซากคอมพิวเตอร์/อุปกรณ์ IT เสีย (Clicks: 15)
11. [`/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค ชัยภูมิ (Clicks: 15)
12. [`/รับซื้อไอโฟน-มหาสารคาม/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อ iPhone มหาสารคาม (Clicks: 14)
13. [`/รับซื้อโน๊ตบุ๊ค-สกลนคร/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค สกลนคร (Clicks: 12)
14. [`/รับซื้อโน๊ตบุ๊ค-นครพนม/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค นครพนม (Clicks: 12)
15. [`/รับซื้อเมืองขอนแก่น/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — ศูนย์รับซื้อ MacBook ขอนแก่น (Clicks: 11)
16. [`/รับซื้อโน๊ตบุ๊ค-นครราชส/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค โคราช (Clicks: 11)
17. [`/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค ยโสธร (Clicks: 10)
18. [`/รับซื้อ-notebook-ชุมแพ-ขอนแก่น/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — จุดรับซื้อโน๊ตบุ๊ค ชุมแพ (Clicks: 9)
19. [`/รับซื้อโน๊ตบุ๊ค-กาฬสินธ/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อโน๊ตบุ๊ค กาฬสินธุ์ (Clicks: 9)
20. [`/รับซื้อโทรศัพท์-มือถือ-ย/`](file:///c:/Users/User/Desktop/รวมโปรเจค/werab-v2/src/config/seo/manifest.ts) — รับซื้อมือถือ ยโสธร (Clicks: 9)

---

## 4. การตรวจสอบความปลอดภัยและการไม่แตะต้องระบบรันไทม์

- **ACTIVE INDEX ปัจจุบัน:** **3 หน้า** (`/`, `/รับซื้อลำโพง-อุดรธานี/`, `/รับซื้อลำโพง-สารคาม/`)
- **SITEMAP:** **3 หน้า**
- **ACTIVE GONE:** **208 เส้นทาง** (ไม่มีการแก้ไข `src/config/seo/gone.ts`)
- **ACTIVE MIGRATION REDIRECTS:** **44 กฎ** (ไม่มีการแก้ไข `src/config/seo/redirects.ts`)
- **UNAPPROVED NEW INDEX:** **0 หน้า**
