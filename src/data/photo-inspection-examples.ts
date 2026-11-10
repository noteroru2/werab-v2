/**
 * Photo-led inspection examples from EXISTING PUBLIC website images.
 *
 * Provenance: src/data/real-product-images.ts (23 already-public photos).
 * No customer documents, internal cost, completed purchase claim, quote,
 * serial number, device ID, or personal data are included.
 *
 * "Observed" describes what the existing image/caption can support.
 * "To check" describes questions for an actual quote; not results of tests.
 * This is NOT a ledger of completed buybacks. Confirm purchase evidence and
 * owner approval before creating a completed-transaction case study.
 */
import type { RealProductCategory } from './real-product-images';

export interface PhotoInspectionExample {
  id: string;
  category: RealProductCategory;
  title: string;
  photoSlugs: readonly string[];
  observed: string;
  toCheck: string;
  priceFactors: string;
  imageEvidenceOnly: true;
}

export const PHOTO_INSPECTION_EXAMPLES: readonly PhotoInspectionExample[] = [
  {
    id: 'acer-swift-sf314-42',
    category: 'notebook',
    title: 'Acer Swift SF314-42',
    photoSlugs: ['acer-swift-sf314-42-front','acer-swift-sf314-42-back'],
    observed: 'มีภาพตัวเครื่องด้านหน้า หน้าจอ ฝาหลัง และมุมที่เห็นพอร์ตบางส่วน',
    toCheck: 'ยืนยัน CPU, RAM, SSD, สุขภาพแบตเตอรี่, อาการจอ และอะแดปเตอร์ด้วยการตรวจเครื่องจริง',
    priceFactors: 'รุ่นย่อยและสภาพแบตเตอรี่มีผลต่อความพร้อมขายต่อ; ภาพอย่างเดียวไม่ยืนยันการทำงาน',
    imageEvidenceOnly: true
  },
  {
    id: 'lenovo-82v7',
    category: 'notebook',
    title: 'Lenovo 82V7',
    photoSlugs: ['lenovo-82v7-front','lenovo-82v7-angle'],
    observed: 'มีภาพด้านหน้าจอและมุมเครื่อง ซึ่งช่วยให้ดูสภาพภายนอกและพอร์ตได้เบื้องต้น',
    toCheck: 'ใช้รหัสรุ่นเต็มตรวจ CPU/GPU และขอผลตรวจ RAM, SSD, แบตเตอรี่, คีย์บอร์ด และบานพับ',
    priceFactors: 'รหัส 82V7 เพียงอย่างเดียวไม่ยืนยันสเปกทุกส่วน จึงไม่ควรระบุราคาแน่นอนจากภาพ',
    imageEvidenceOnly: true
  },
  {
    id: 'msi-thin-a15',
    category: 'notebook',
    title: 'MSI Thin A15 (ภาพระบุ RTX 4060)',
    photoSlugs: ['msi-thin-a15-angle','msi-thin-a15-front'],
    observed: 'มีภาพเครื่องเกมมิ่งและคีย์บอร์ด; คำอธิบายภาพต้นทางระบุ RTX 4060 / RAM 16GB',
    toCheck: 'ขอภาพข้อมูล GPU จริง, รหัส CPU, ความจุ SSD, อุณหภูมิทดสอบ และประกันคงเหลือ',
    priceFactors: 'ต้องยืนยัน GPU/CPU และประสิทธิภาพภายใต้โหลด ก่อนเทียบกลุ่มราคา Gaming Notebook',
    imageEvidenceOnly: true
  },
  {
    id: 'macbook-air-m1',
    category: 'macbook',
    title: 'MacBook Air M1 (ภาพระบุ 8GB/256GB)',
    photoSlugs: ['macbook-air-m1-front','macbook-air-m1-back'],
    observed: 'มีภาพด้านหน้าจอและฝาหลัง; ข้อมูลรุ่นและความจุมาจากคำอธิบายภาพเดิม',
    toCheck: 'ตรวจ About This Mac, Battery Cycle, True Tone, พอร์ต, อะแดปเตอร์ และการออกจาก Find My',
    priceFactors: 'สภาพแบตเตอรี่ หน้าจอ และอุปกรณ์ครบชุดกระทบต้นทุนเตรียมขาย',
    imageEvidenceOnly: true
  },
  {
    id: 'macbook-air-m3',
    category: 'macbook',
    title: 'MacBook Air M3 (ภาพระบุ 8GB/256GB)',
    photoSlugs: ['macbook-air-m3-back','macbook-air-m3-system'],
    observed: 'มีภาพตัวเครื่องและหน้าข้อมูลระบบที่คำอธิบายภาพเดิมระบุว่าปิดบังเลขประจำเครื่องแล้ว',
    toCheck: 'ตรวจรุ่นปี, สเปกที่ตัวเครื่อง, Battery Health, MDM/Find My, สภาพจอและอุปกรณ์',
    priceFactors: 'แยกเจเนอเรชันชิปและการจัดการเครื่อง ไม่เหมาราคา MacBook Air ทุกรุ่น',
    imageEvidenceOnly: true
  },
  {
    id: 'insta360-x5',
    category: 'camera',
    title: 'Insta360 X5 พร้อมภาพกล่องและอุปกรณ์',
    photoSlugs: ['insta360-x5-open-box','insta360-x5-box'],
    observed: 'มีภาพกล้องในกล่องและกล่องสินค้า ช่วยดูรายการอุปกรณ์ที่แสดงในภาพได้บางส่วน',
    toCheck: 'ยืนยันความสมบูรณ์เลนส์ทั้งสองด้าน, เซนเซอร์, การบันทึก 360°, แบตเตอรี่, สายชาร์จ และอุปกรณ์จริง',
    priceFactors: 'เลนส์และการบันทึกภาพของกล้อง 360° เป็นจุดเสี่ยงสำคัญที่ตรวจด้วยภาพกล่องไม่ได้',
    imageEvidenceOnly: true
  },
  {
    id: 'desktop-black',
    category: 'pc',
    title: 'คอมประกอบเคสสีดำ / GeForce RTX',
    photoSlugs: ['desktop-black-case','desktop-black-components','desktop-black-geforce-rtx','desktop-black-front'],
    observed: 'ภาพแสดงเคส พัดลม ภายในเครื่อง และการ์ด GeForce RTX แต่ไม่ยืนยันรุ่น GPU ที่แน่นอน',
    toCheck: 'ขอ CPU, รหัส GPU, เมนบอร์ด, RAM/SSD, ยี่ห้อและกำลัง PSU พร้อมผลทดสอบเสถียรภาพ',
    priceFactors: 'คอมประกอบควรประเมินมูลค่าอะไหล่แยกและความเสี่ยง PSU/ความร้อน ไม่ตีราคาจากเคส',
    imageEvidenceOnly: true
  },
  {
    id: 'desktop-white',
    category: 'pc',
    title: 'คอมประกอบเคสสีขาว / GeForce RTX',
    photoSlugs: ['desktop-white-case','desktop-white-angle','desktop-white-geforce-rtx'],
    observed: 'มีภาพเคสสีขาว ภายในเครื่อง และการ์ด GeForce RTX; ภาพไม่ระบุชิปหรือความจุ',
    toCheck: 'ขอรายการอะไหล่เต็มพร้อมรูป Serial ที่ปิดบางส่วน ผลตรวจ SSD และการทดสอบ GPU',
    priceFactors: 'ราคาขายต่อขึ้นกับอุปกรณ์หลักและประกัน ไม่ใช่สีเคสหรือจำนวนพัดลม',
    imageEvidenceOnly: true
  },
  {
    id: 'ipad-pro-m1',
    category: 'tablet',
    title: 'iPad Pro ชิป M1 พร้อมภาพกล่อง',
    photoSlugs: ['ipad-pro-m1-with-box','ipad-pro-m1-screen'],
    observed: 'มีภาพ iPad Pro M1 กับกล่องและสภาพด้านหน้าจอ ไม่ยืนยันความจุจากภาพเหล่านี้',
    toCheck: 'ตรวจขนาดจอ รุ่น Wi-Fi/Cellular, ความจุ, Touch, Face ID, USB-C, แบตเตอรี่ และ Find My',
    priceFactors: 'ขนาดรุ่น ความจุ สภาพจอ และความพร้อมใช้งานมีผลต่อราคาประเมิน',
    imageEvidenceOnly: true
  },
  {
    id: 'ipad-gen10',
    category: 'tablet',
    title: 'iPad รุ่นที่ 10 พร้อมภาพข้อมูลระบบ',
    photoSlugs: ['ipad-gen-10-front','ipad-gen-10-system'],
    observed: 'มีภาพตัวเครื่องและภาพหน้าข้อมูลระบบที่คำอธิบายต้นทางระบุว่าปกปิดเลขประจำเครื่องแล้ว',
    toCheck: 'ยืนยันความจุ Wi-Fi/Cellular, แบตเตอรี่, Touch ID, หน้าจอ, USB-C และสถานะ Activation Lock',
    priceFactors: 'เครื่องที่ติด Activation Lock/Remote Management ไม่ควรถูกประเมินเป็นเครื่องพร้อมขาย',
    imageEvidenceOnly: true
  }
];
