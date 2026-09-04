/**
 * src/config/business.ts
 * Authoritative single source of truth for business and contact facts.
 * Strictly separates VERIFIED facts from UNCONFIGURED/OPTIONAL facts to prevent hallucinated data.
 */

export const BUSINESS_FACTS = {
  // 1. VERIFIED FACTS (Confirmed from legacy source evidence)
  VERIFIED: {
    brandName: 'เรารับซื้อ.com',
    englishBrandName: 'WE BUY',
    siteUrl: 'https://xn--c3c3a0aa6cvaf8b9dze.com',
    displayDomain: 'เรารับซื้อ.com',
    phone: '064-257-9353',
    phoneRaw: '0642579353',
    lineId: '@webuy',
    lineUrl: 'https://line.me/R/ti/p/@webuy',
    contactPerson: 'คุณโน๊ต',
    positioning: 'General Buyback Authority',
    tagline: 'ก่อนขาย เช็กราคา เข้าใจสภาพ แล้วค่อยตัดสินใจ',
    valueProps: [
      'ประเมินเบื้องต้นจากรุ่น สเปก สภาพ การทำงาน และอุปกรณ์ที่แจ้ง',
      'แยกราคาประเมินออนไลน์ออกจากราคาสุดท้ายหลังตรวจสินค้าจริง',
      'ไม่ขอ Password, PIN, OTP หรือ Recovery Key เพื่อเช็กราคาเบื้องต้น',
      'มีช่องทาง LINE และโทรศัพท์สำหรับส่งข้อมูลและสอบถามก่อนตัดสินใจขาย'
    ],
    serviceArea: 'ให้บริการรับซื้อทั่วประเทศไทย',
    acceptedCategories: [
      'โน๊ตบุ๊ค (Notebook / Laptop)',
      'คอมพิวเตอร์ตั้งโต๊ะ (PC Desktop / All-in-One)',
      'คอมประกอบ (Gaming PC / Workstation)',
      'MacBook (Pro / Air ทุกชิป)',
      'iPhone และ iPad ทุกรุ่น',
      'กล้องถ่ายรูปและเลนส์ (DSLR / Mirrorless)',
      'ลำโพงบลูทูธและเครื่องเสียง',
      'เครื่องเล่นเกมคอนโซล (PS5, PS4, Nintendo Switch)',
      'Server และ Enterprise IT สำหรับองค์กร'
    ]
  },

  // 2. OPTIONAL / CONFIGURABLE FACTS
  OPTIONAL: {
    facebookUrl: undefined as string | undefined,
    tiktokUrl: undefined as string | undefined
  },

  // 3. NOT_CONFIGURED (Explicitly flagged to prevent fake schema generation)
  NOT_CONFIGURED: {
    physicalAddress: null,
    streetAddress: null,
    postalCode: null,
    latitude: null,
    longitude: null,
    openingHours247: false,
    provinceBranches: null
  }
} as const;

// Helper utilities for clean template consumption
export function getLineUrl(): string {
  return BUSINESS_FACTS.VERIFIED.lineUrl;
}

export function getPhoneUrl(): string {
  return `tel:${BUSINESS_FACTS.VERIFIED.phoneRaw}`;
}

export function getDisplayPhone(): string {
  return BUSINESS_FACTS.VERIFIED.phone;
}

export function getDisplayLine(): string {
  return BUSINESS_FACTS.VERIFIED.lineId;
}

export function getBrandName(): string {
  return BUSINESS_FACTS.VERIFIED.brandName;
}

export function getSiteUrl(): string {
  return BUSINESS_FACTS.VERIFIED.siteUrl;
}
