export type RealProductCategory = 'notebook' | 'macbook' | 'camera' | 'pc' | 'tablet';

export interface RealProductImage {
  slug: string;
  category: RealProductCategory;
  alt: string;
  caption: string;
  featured?: boolean;
  portrait?: boolean;
}

export const REAL_PRODUCT_IMAGES: RealProductImage[] = [
  { slug: 'acer-swift-sf314-42-front', category: 'notebook', alt: 'โน๊ตบุ๊ค Acer Swift SF314-42 มือสอง เปิดเครื่องทดสอบหน้าจอ', caption: 'Acer Swift SF314-42 — ด้านหน้าและหน้าจอ', featured: true },
  { slug: 'acer-swift-sf314-42-back', category: 'notebook', alt: 'ฝาหลังโน๊ตบุ๊ค Acer Swift SF314-42 มือสอง', caption: 'Acer Swift SF314-42 — ฝาหลังและพอร์ต' },
  { slug: 'lenovo-82v7-front', category: 'notebook', alt: 'โน๊ตบุ๊ค Lenovo 82V7 มือสอง เปิดเครื่องทดสอบหน้าจอ', caption: 'Lenovo 82V7 — ด้านหน้าและหน้าจอ', featured: true },
  { slug: 'lenovo-82v7-angle', category: 'notebook', alt: 'โน๊ตบุ๊ค Lenovo 82V7 มือสอง มุมด้านข้าง', caption: 'Lenovo 82V7 — ตัวเครื่องและพอร์ต' },
  { slug: 'msi-thin-a15-angle', category: 'notebook', alt: 'โน๊ตบุ๊คเกมมิ่ง MSI Thin A15 RTX 4060 RAM 16GB มือสอง', caption: 'MSI Thin A15 — เครื่องเกมมิ่ง RTX 4060', featured: true },
  { slug: 'msi-thin-a15-front', category: 'notebook', alt: 'โน๊ตบุ๊ค MSI Thin A15 มือสอง เปิดเครื่องและไฟคีย์บอร์ด', caption: 'MSI Thin A15 — หน้าจอและคีย์บอร์ด' },
  { slug: 'macbook-air-m1-back', category: 'macbook', alt: 'MacBook Air M1 8GB 256GB มือสอง ฝาหลังสีเงิน', caption: 'MacBook Air M1 — ฝาหลังและตัวเครื่อง' },
  { slug: 'macbook-air-m1-front', category: 'macbook', alt: 'MacBook Air M1 8GB 256GB มือสอง เปิดเครื่องทดสอบ', caption: 'MacBook Air M1 — หน้าจอและคีย์บอร์ด', featured: true },
  { slug: 'macbook-air-m3-system', category: 'macbook', alt: 'MacBook Air M3 8GB 256GB มือสอง หน้าข้อมูลระบบที่ปกปิดเลขประจำเครื่องแล้ว', caption: 'MacBook Air M3 — ตรวจรุ่น ชิป และหน่วยความจำ' },
  { slug: 'macbook-air-m3-back', category: 'macbook', alt: 'MacBook Air M3 8GB 256GB มือสอง ฝาหลังสีมิดไนท์', caption: 'MacBook Air M3 — ฝาหลังและตัวเครื่อง', featured: true },
  { slug: 'insta360-x5-open-box', category: 'camera', alt: 'กล้อง Insta360 X5 8K มือสอง พร้อมกล่องและอุปกรณ์', caption: 'Insta360 X5 — ตัวกล้องและอุปกรณ์ในกล่อง' },
  { slug: 'insta360-x5-box', category: 'camera', alt: 'กล่องกล้อง Insta360 X5 8K 360 Action Cam มือสอง', caption: 'Insta360 X5 — กล่องสินค้า', featured: true },
  { slug: 'desktop-black-case', category: 'pc', alt: 'คอมประกอบมือสองเคสสีดำ กระจกข้างและพัดลม RGB', caption: 'คอมประกอบเคสสีดำ — ภาพรวมตัวเครื่อง', featured: true },
  { slug: 'desktop-black-components', category: 'pc', alt: 'ภายในคอมประกอบมือสองเคสสีดำ แรมและชุดระบายความร้อน', caption: 'คอมเคสสีดำ — ภายในและแรม' },
  { slug: 'desktop-black-geforce-rtx', category: 'pc', alt: 'การ์ดจอ GeForce RTX ภายในคอมประกอบมือสองเคสสีดำ', caption: 'คอมเคสสีดำ — การ์ดจอ GeForce RTX' },
  { slug: 'desktop-black-front', category: 'pc', alt: 'ด้านหน้าคอมประกอบมือสองเคสสีดำพร้อมพัดลม RGB สามตัว', caption: 'คอมเคสสีดำ — พัดลมด้านหน้า', portrait: true },
  { slug: 'desktop-white-case', category: 'pc', alt: 'คอมประกอบมือสองเคสสีขาว กระจกใสและพัดลม RGB', caption: 'คอมประกอบเคสสีขาว — ภาพรวมตัวเครื่อง', featured: true },
  { slug: 'desktop-white-angle', category: 'pc', alt: 'คอมประกอบมือสองเคสสีขาว มุมด้านข้าง', caption: 'คอมเคสสีขาว — ด้านข้างและการจัดวางอุปกรณ์', portrait: true },
  { slug: 'desktop-white-geforce-rtx', category: 'pc', alt: 'การ์ดจอ GeForce RTX ภายในคอมประกอบมือสองเคสสีขาว', caption: 'คอมเคสสีขาว — การ์ดจอ GeForce RTX' },
  { slug: 'ipad-pro-m1-with-box', category: 'tablet', alt: 'iPad Pro M1 มือสองพร้อมกล่อง เปิดเครื่องทดสอบ', caption: 'iPad Pro M1 — ตัวเครื่องพร้อมกล่อง', featured: true },
  { slug: 'ipad-pro-m1-screen', category: 'tablet', alt: 'iPad Pro M1 มือสองวางคู่กับกล่อง ตรวจสภาพหน้าจอ', caption: 'iPad Pro M1 — หน้าจอและกล่อง' },
  { slug: 'ipad-gen-10-front', category: 'tablet', alt: 'iPad รุ่นที่ 10 มือสอง เปิดเครื่องทดสอบหน้าจอ', caption: 'iPad Gen 10 — หน้าจอและตัวเครื่อง', featured: true },
  { slug: 'ipad-gen-10-system', category: 'tablet', alt: 'iPad รุ่นที่ 10 มือสอง หน้าข้อมูลระบบที่ปกปิดเลขประจำเครื่องแล้ว', caption: 'iPad Gen 10 — ตรวจรุ่นและความจุ' },
];
