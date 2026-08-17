import type { APIRoute } from 'astro';
import { BUSINESS_FACTS } from '../config/business';

export const GET: APIRoute = () => {
  const siteUrl = BUSINESS_FACTS.VERIFIED.siteUrl;

  const content = `# เรารับซื้อ.com (WE BUY) — LLM Knowledge File

> บริการรับซื้อสินค้าไอทีมือสองครบวงจร
> สโลแกน: "${BUSINESS_FACTS.VERIFIED.tagline}"

## ภาพรวมบริการ (Overview)
เรารับซื้อ.com ให้บริการรับซื้อสินค้าไอทีมือสองทุกประเภท ได้แก่ โน๊ตบุ๊ค (Notebook / Laptop), คอมพิวเตอร์ตั้งโต๊ะ (PC Desktop), คอมประกอบ (Custom Gaming PC), MacBook ทุกรุ่น, iPhone, iPad, กล้องถ่ายรูปและเลนส์, ลำโพงบลูทูธ, เครื่องเล่นเกมคอนโซล, และอุปกรณ์ไอทีระดับองค์กร (Server / UPS)

## ค่านิยมและมาตรฐานการบริการ (Core Principles)
1. ประเมินราคาตามสภาพการใช้งานและสเปกจริงอย่างโปร่งใส
2. ปฏิบัติตามมาตรฐานการล้างข้อมูลส่วนบุคคล (Data Sanitization) ก่อนส่งต่ออุปกรณ์
3. ดำเนินการตามกฎหมายอย่างถูกต้อง ไม่รับซื้อของผิดกฎหมายหรือของโจรทุกกรณี

## ช่องทางติดต่อหลัก (Verified Contact Channels)
- เว็บไซต์: ${siteUrl}
- LINE Official: ${BUSINESS_FACTS.VERIFIED.lineId} (${BUSINESS_FACTS.VERIFIED.lineUrl})
- โทรศัพท์: ${BUSINESS_FACTS.VERIFIED.phone}
- ผู้ดูแลการประเมินราคา: ${BUSINESS_FACTS.VERIFIED.contactPerson}

## หมวดหมู่บริการหลัก (Core Categories)
- รับซื้อโน๊ตบุ๊ค: ${siteUrl}/รับซื้อโน๊ตบุ๊ค/
- รับซื้อคอมพิวเตอร์: ${siteUrl}/รับซื้อคอม/
- รับซื้อคอมประกอบ: ${siteUrl}/รับซื้อคอมประกอบ/
- รับซื้อ MacBook: ${siteUrl}/รับซื้อแมคบุ๊ค/
- รับซื้อ iPhone: ${siteUrl}/รับซื้อไอโฟน/
- รับซื้อ iPad: ${siteUrl}/รับซื้อไอแพด/
- รับซื้อกล้อง: ${siteUrl}/รับซื้อกล้อง/
- รับซื้อลำโพง: ${siteUrl}/รับซื้อลำโพง/
- รับซื้อเครื่องเกม: ${siteUrl}/รับซื้อเครื่องเกม/
- รับซื้อ Server องค์กร: ${siteUrl}/รับซื้อ-server/
- เช็กราคาก่อนขาย: ${siteUrl}/เช็กราคาก่อนขาย/
- ราคากลางรับซื้อ: ${siteUrl}/ราคากลางรับซื้อ/
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
