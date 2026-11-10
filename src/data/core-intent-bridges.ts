/**
 * Phase 3: intent-led internal links for homepage and six category owners.
 * Only routes already classified INDEX in src/config/seo/manifest.ts.
 * Do not invent pages, pricing, claims, nationwide branches or new slugs.
 */
export type CoreSeoTopic = 'home' | 'notebook' | 'pc' | 'macbook' | 'iphone' | 'ipad' | 'camera';
export interface IntentRoute { label: string; href: string; why: string }
export interface IntentBridge {
  heading: string;
  intro: string;
  links: readonly IntentRoute[];
  related: readonly IntentRoute[];
  intake: string;
}

export const CORE_INTENT_BRIDGES: Record<CoreSeoTopic,IntentBridge> = {
  home: {
    heading: 'เลือกเส้นทางเช็กราคาที่ตรงกับสินค้าของคุณ',
    intro: 'หากไม่ทราบรุ่นหรือมีตำหนิ เริ่มจากคู่มือได้เลย ไม่ต้องเดาราคาด้วยชื่อสินค้าอย่างเดียว',
    links: [
      { label:'ดูสินค้าที่รับซื้อทุกหมวด', href:'/รับซื้อ/', why:'เลือกประเภทสินค้าก่อนส่งข้อมูล' },
      { label:'เช็กราคาก่อนขายต้องส่งอะไร', href:'/เช็กราคาก่อนขาย/', why:'ดูตัวอย่างสเปก รูป และอุปกรณ์ที่ช่วยประเมิน' },
      { label:'เครื่องมีตำหนิ ควรซ่อมก่อนหรือไม่', href:'/สภาพสินค้า/ควรซ่อมก่อนขายไหม/', why:'เทียบต้นทุนซ่อมกับการขายตามสภาพ' }
    ],
    related: [
      { label:'โน๊ตบุ๊คและ Gaming Notebook', href:'/รับซื้อโน๊ตบุ๊ค/', why:'CPU/GPU/VRAM/แบต' },
      { label:'คอมประกอบและ Gaming PC', href:'/รับซื้อคอม/', why:'ตรวจอะไหล่และประกันเป็นชิ้น' },
      { label:'MacBook Air และ Pro', href:'/รับซื้อแมคบุ๊ค/', why:'ชิป/ความจุ/แบต/ล็อก' },
      { label:'iPhone มือสอง', href:'/รับซื้อไอโฟน/', why:'รุ่น/ความจุ/แบต/Face ID' },
      { label:'iPad มือสอง', href:'/รับซื้อไอแพด/', why:'รุ่น/จอ/ความจุ/บัญชี' },
      { label:'กล้องและเลนส์', href:'/รับซื้อกล้อง/', why:'Body/เลนส์/ชัตเตอร์/ฝ้า' }
    ],
    intake:'แจ้งชื่อรุ่นหรือภาพหน้าจอสเปก ภาพรอบเครื่อง อาการและอุปกรณ์ที่มี เพื่อรับการประเมินเบื้องต้น'
  },
  notebook: {
    heading: 'เลือกหน้ารับซื้อโน๊ตบุ๊คตามยี่ห้อ และดูปัญหาก่อนขาย',
    intro: 'หน้ารวมนี้อธิบายการประเมิน Notebook ทุกกลุ่ม ส่วนหน้ารุ่นแยกเงื่อนไขที่ต่างกันเพื่อไม่ต้องเดาราคาจากชื่อยี่ห้อ',
    links:[
      {label:'Notebook ASUS',href:'/รับซื้อโน๊ตบุ๊ค-asus/',why:'ดูเงื่อนไขการประเมินรุ่น ASUS'},
      {label:'Notebook Lenovo',href:'/รับซื้อโน๊ตบุ๊ค-lenovo/',why:'ดูรุ่นและจุดตรวจของ Lenovo'},
      {label:'Notebook Acer',href:'/รับซื้อโน๊ตบุ๊ค-acer/',why:'จอ บานพับ รุ่นย่อย และแบต'},
      {label:'Notebook Dell',href:'/รับซื้อโน๊ตบุ๊ค-dell/',why:'แยกสายทำงาน/ธุรกิจและอุปกรณ์'}
    ],
    related:[
      {label:'แบตเตอรี่เสื่อม',href:'/สภาพสินค้า/แบตเสื่อม/',why:'ต้องแจ้งอาการอย่างไร'},
      {label:'จอแตกหรือมีเส้น',href:'/สภาพสินค้า/จอแตก/',why:'แยกสภาพจอกับค่าซ่อม'},
      {label:'ไม่มีอะแดปเตอร์/อุปกรณ์',href:'/สภาพสินค้า/ไม่มีอุปกรณ์/',why:'แจ้งรุ่นหัวชาร์จและสิ่งที่ขาด'}
    ],
    intake:'ส่ง CPU รุ่นเต็ม, GPU/VRAM หากมี, RAM/SSD, แบต, รูปทุกด้าน, อาการ และอะแดปเตอร์'
  },
  pc: {
    heading: 'คอมประกอบ คอมเสีย และวิธีตรวจชิ้นส่วนก่อนขาย',
    intro: 'คอมทั้งเครื่องกับอะไหล่แยกชิ้นมีเกณฑ์ประเมินต่างกัน เลือกหน้าที่ตรงกับสภาพและส่วนประกอบของเครื่อง',
    links:[
      {label:'รับซื้อคอมประกอบ Gaming PC',href:'/รับซื้อคอมประกอบ/',why:'เช็ก CPU/GPU/เมนบอร์ด/PSU แยกชิ้น'},
      {label:'รับซื้อซากคอม/เครื่องเปิดไม่ติด',href:'/รับซื้อซากคอมพิวเตอร์/',why:'แยกอะไหล่ที่ทดสอบได้จากชิ้นเสีย'},
      {label:'แนวทางเช็กราคาก่อนขาย',href:'/เช็กราคาก่อนขาย/',why:'รวมข้อมูลที่ส่งให้ประเมินออนไลน์'}
    ],
    related:[
      {label:'เครื่องเปิดไม่ติด',href:'/สภาพสินค้า/เปิดไม่ติด/',why:'ควรตรวจและถ่ายอะไรบ้าง'},
      {label:'ควรซ่อมก่อนขายไหม',href:'/สภาพสินค้า/ควรซ่อมก่อนขายไหม/',why:'เทียบความเสี่ยงกับค่าซ่อม'}
    ],
    intake:'ส่ง CPU, GPU, RAM, SSD/HDD, เมนบอร์ด, PSU, ภาพภายใน, ประกัน และอาการที่พบ'
  },
  macbook:{
    heading:'รับซื้อ MacBook ตามตระกูลชิป รุ่น Air/Pro และสภาพ',
    intro:'MacBook ชื่อใกล้กันอาจต่างทั้งชิป ปี ความจุ และอุปกรณ์ จึงควรเลือกหน้าที่ตรงกับเครื่องแล้วส่งข้อมูลระบบ',
    links:[
      {label:'MacBook Air',href:'/รับซื้อ-macbook-air/',why:'รุ่น Intel/M Series, แบต และน้ำหนักการใช้งาน'},
      {label:'MacBook Pro',href:'/รับซื้อ-macbook-pro/',why:'จอ พอร์ต ชิป และความจุ RAM/SSD'},
      {label:'ไม่มีอุปกรณ์หรือชุดชาร์จ',href:'/สภาพสินค้า/ไม่มีอุปกรณ์/',why:'เตรียมข้อมูลอุปกรณ์ที่ขาด'}
    ],
    related:[
      {label:'เครื่องแบตเสื่อม',href:'/สภาพสินค้า/แบตเสื่อม/',why:'ดู Cycle และอาการที่แจ้งได้'},
      {label:'เครื่องมีปัญหาจอ',href:'/สภาพสินค้า/จอแตก/',why:'ค่าซ่อมและการแสดงผล'},
      {label:'เครื่องเปิดไม่ติด',href:'/สภาพสินค้า/เปิดไม่ติด/',why:'ตรวจอาการก่อนตีราคา'}
    ],
    intake:'ส่งภาพ About This Mac, RAM/SSD, Cycle Count, จอ/ตัวเครื่อง, อุปกรณ์ และสถานะ Find My/MDM (ไม่ส่งรหัสผ่าน)'
  },
  iphone:{
    heading:'แยกการประเมิน iPhone ตาม Series และสภาพเครื่อง',
    intro:'ราคา iPhone ขึ้นกับรุ่นย่อย ความจุ แบต หน้าจอ และประวัติซ่อม เลือกหน้ารุ่นแล้วตรวจสิทธิ์ใช้งานก่อนส่งมอบ',
    links:[
      {label:'iPhone 13 Series',href:'/รับซื้อ-iphone-13/',why:'รุ่น mini/Pro/Pro Max และความจุ'},
      {label:'iPhone 14 Series',href:'/รับซื้อ-iphone-14/',why:'จอ กล้อง แบต และรุ่นย่อย'},
      {label:'iPhone 15 Series',href:'/รับซื้อ-iphone-15/',why:'USB-C รุ่นย่อยและสภาพ'}
    ],
    related:[
      {label:'แบตเสื่อม',href:'/สภาพสินค้า/แบตเสื่อม/',why:'Battery Health และอาการ'},
      {label:'จอแตก',href:'/สภาพสินค้า/จอแตก/',why:'ตรวจ Touch/Face ID'},
      {label:'ไม่มีอุปกรณ์',href:'/สภาพสินค้า/ไม่มีอุปกรณ์/',why:'อุปกรณ์ไม่ครบควรแจ้งอะไร'}
    ],
    intake:'ส่งรุ่นและความจุ, Battery Health, Parts and Service History หากมี, ภาพตัวเครื่อง, Face ID และสถานะ Activation Lock'
  },
  ipad:{
    heading:'แยกรุ่น iPad Air และ iPad Pro ก่อนส่งเช็กราคา',
    intro:'รุ่น Wi-Fi/Cellular, ความจุ, หน้าจอ และการจัดการบัญชีมีผลต่อการประเมิน iPad มากกว่าชื่อรุ่นเพียงอย่างเดียว',
    links:[
      {label:'iPad Air',href:'/รับซื้อ-ipad-air/',why:'แยกรุ่นชิป ขนาดจอ และความจุ'},
      {label:'iPad Pro',href:'/รับซื้อ-ipad-pro/',why:'รุ่นปี M Series จอ และอุปกรณ์เสริม'},
      {label:'เช็กราคาก่อนขาย',href:'/เช็กราคาก่อนขาย/',why:'ส่งรุ่นจริงและรูปให้ครบก่อนตีราคา'}
    ],
    related:[
      {label:'หน้าจอหรือทัชมีปัญหา',href:'/สภาพสินค้า/จอแตก/',why:'แยกความเสียหาย'},
      {label:'ไม่มี Apple Pencil/กล่อง',href:'/สภาพสินค้า/ไม่มีอุปกรณ์/',why:'ประเมินจากชุดอุปกรณ์ที่มี'}
    ],
    intake:'ส่ง Model Number, Wi-Fi/Cellular, ความจุ, ภาพหน้าจอ/ขอบ, อุปกรณ์, แบต และสถานะ Find My'
  },
  camera:{
    heading:'เลือกรุ่นกล้องและเลนส์ที่ต้องการประเมิน',
    intro:'ราคากล้องมือสองต้องแยก Body กับเลนส์ และตรวจการทำงานจริง โดยเฉพาะเซนเซอร์ ฝ้า เชื้อรา และอุปกรณ์',
    links:[
      {label:'กล้อง Sony',href:'/รับซื้อกล้อง-sony/',why:'Body/เลนส์ E-mount และรหัสรุ่น'},
      {label:'กล้อง Canon',href:'/รับซื้อกล้อง-canon/',why:'EOS/RF/EF และอาการเลนส์'},
      {label:'กล้อง Nikon',href:'/รับซื้อกล้อง-nikon/',why:'Z/F mount และสภาพระบบโฟกัส'},
      {label:'กล้อง Fujifilm',href:'/รับซื้อกล้อง-fujifilm-ฟูจิฟิล์ม/',why:'X/GFX และเลนส์'},
    ],
    related:[
      {label:'อุปกรณ์/ชุดชาร์จไม่ครบ',href:'/สภาพสินค้า/ไม่มีอุปกรณ์/',why:'แจ้งรายการแบต ชาร์จ ฝาปิด'},
      {label:'เครื่องเปิดไม่ติด',href:'/สภาพสินค้า/เปิดไม่ติด/',why:'ตรวจอาการ Body และแบต'}
    ],
    intake:'ส่ง Body รุ่นเต็ม, เลนส์ทุกรุ่น, Shutter Count (หากมี), รูปด้านหน้า/ท้ายเลนส์, อาการและชุดชาร์จ'
  }
};
