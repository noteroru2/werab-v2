import type { APIRoute } from 'astro';
import { BUSINESS_FACTS } from '../config/business';

export const GET: APIRoute = () => {
  const siteUrl = BUSINESS_FACTS.VERIFIED.siteUrl;

  const content = `# เรารับซื้อ.com (WE BUY) — LLM Knowledge File

> ข้อมูลและบริการประเมินสินค้าไอทีมือสองก่อนตัดสินใจขาย
> สโลแกน: "${BUSINESS_FACTS.VERIFIED.tagline}"

## ภาพรวมบริการ (Overview)
เรารับซื้อ.com ให้ข้อมูลและรับประเมินสินค้าไอทีมือสองในหมวดที่ระบุบนเว็บไซต์ ได้แก่ ${BUSINESS_FACTS.VERIFIED.acceptedCategories.join(', ')} โดยพิจารณาจากรุ่น สเปก สภาพ การทำงาน และอุปกรณ์ที่ผู้ขายแจ้ง

## ค่านิยมและมาตรฐานการบริการ (Core Principles)
1. ราคาจากรูปและข้อมูลเป็นการประเมินเบื้องต้น ราคาสุดท้ายยืนยันหลังตรวจสินค้าจริง
2. ไม่ขอ Password, PIN, OTP หรือ Recovery Key เพื่อเช็กราคาเบื้องต้น
3. เจ้าของควรสำรองข้อมูล ออกจากบัญชี และล้างข้อมูลด้วยตนเองเมื่อพร้อมส่งมอบ

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
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
