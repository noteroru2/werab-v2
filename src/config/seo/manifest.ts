/**
 * src/config/seo/manifest.ts
 * Central SEO Manifest — Authoritative single source of truth for URL architecture,
 * lifecycle state, indexability, canonical relationships, and migration provenance.
 */

import type { SeoManifestRecord } from './types';
import { GONE_PATHS_RAW } from './gone';
import { RAW_REDIRECT_RULES } from './redirects';
import { PLANNED_PAGES } from '../planned-pages';
import { normalizePath } from '../../lib/seo/normalize';

/**
 * 1. Owner-Approved Core Public Pages (INDEX with READY Content)
 */
export const APPROVED_INDEX_PAGES: SeoManifestRecord[] = [
  {
    path: '/',
    state: 'INDEX',
    pageType: 'hub',
    contentCluster: 'general',
    primaryIntent: 'buyback',
    canonical: 'self',
    title: 'รับซื้อสินค้าไอทีมือสอง เช็กราคาก่อนขาย | เรารับซื้อ.com',
    description: 'รับซื้อสินค้าไอทีมือสอง โน๊ตบุ๊ค คอม MacBook iPhone iPad กล้อง ลำโพง และอุปกรณ์ไอที ส่งรุ่น รูป สภาพและอุปกรณ์เพื่อเช็กราคาเบื้องต้นก่อนตัดสินใจขาย',
    h1: 'รับซื้อสินค้าไอทีมือสอง เช็กราคาก่อนขายก่อนตัดสินใจ',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อลำโพง-อุดรธานี/',
    state: 'INDEX',
    pageType: 'location',
    contentCluster: 'audio',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อลำโพง/',
    title: 'รับซื้อลำโพง อุดรธานี Marshall JBL ลำโพงบลูทูธมือสอง | เรารับซื้อ.com',
    description: 'บริการรับซื้อลำโพงมือสองในจังหวัดอุดรธานี Marshall, JBL, Harman Kardon เช็กราคา ตรวจสอบสภาพ นัดรับได้สะดวก',
    h1: 'รับซื้อลำโพงมือสอง อุดรธานี ประเมินราคาก่อนขาย',
    gscPriority: 'high',
    migrationStatus: 'rebuilt',
    contentStatus: 'READY',
    notes: 'Approved historical survivor rewritten page for Udon Thani speaker market.'
  },
  {
    path: '/รับซื้อลำโพง-สารคาม/',
    state: 'INDEX',
    pageType: 'location',
    contentCluster: 'audio',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อลำโพง/',
    title: 'รับซื้อลำโพง มหาสารคาม Marshall JBL ลำโพงบลูทูธมือสอง | เรารับซื้อ.com',
    description: 'บริการรับซื้อลำโพงมือสองในจังหวัดมหาสารคาม Marshall, JBL เช็กราคาเบื้องต้นก่อนขาย นัดรับในพื้นที่ สะดวก ปลอดภัย',
    h1: 'รับซื้อลำโพงมือสอง มหาสารคาม',
    gscPriority: 'high',
    migrationStatus: 'rebuilt',
    contentStatus: 'READY',
    notes: 'Approved historical survivor preserved slug for Mahasarakham speaker market.'
  },
  {
    path: '/รับซื้อ/',
    state: 'INDEX',
    pageType: 'hub',
    contentCluster: 'general',
    primaryIntent: 'buyback',
    canonical: 'self',
    title: 'รับซื้อสินค้าไอทีมือสอง มีอะไรบ้าง | เรารับซื้อ.com',
    description: 'รวมสินค้าที่รับซื้อ โน๊ตบุ๊ค คอม MacBook iPhone iPad กล้อง ลำโพง ซากคอม และ Server เลือกหมวดสินค้า ดูข้อมูลที่ต้องใช้ และเช็กราคาก่อนขาย',
    h1: 'รับซื้อสินค้าไอทีมือสอง เลือกประเภทสินค้าที่ต้องการขาย',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อโน๊ตบุ๊ค/',
    state: 'INDEX',
    pageType: 'category',
    contentCluster: 'notebook',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อโน๊ตบุ๊คมือสอง Gaming Notebook เช็กราคาก่อนขาย | เรารับซื้อ.com',
    description: 'รับซื้อโน๊ตบุ๊คมือสอง Notebook Laptop และ Gaming Notebook เช็กราคาจากรุ่น CPU RAM SSD การ์ดจอ แบตเตอรี่ สภาพและอุปกรณ์ ส่งข้อมูลประเมินก่อนขาย',
    h1: 'รับซื้อโน๊ตบุ๊คมือสอง เช็กรุ่น สเปก และสภาพก่อนขาย',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อคอม/',
    state: 'INDEX',
    pageType: 'category',
    contentCluster: 'pc',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อคอมมือสอง Gaming PC และคอมประกอบ เช็กราคาก่อนขาย | เรารับซื้อ.com',
    description: 'รับซื้อคอมพิวเตอร์มือสอง Gaming PC และคอมประกอบ ประเมินจาก CPU การ์ดจอ RAM SSD เมนบอร์ด PSU และสภาพเครื่อง ส่งสเปกและรูปเช็กราคาก่อนขาย',
    h1: 'รับซื้อคอมมือสอง Gaming PC เช็กสเปกและราคาก่อนขาย',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อแมคบุ๊ค/',
    state: 'INDEX',
    pageType: 'category',
    contentCluster: 'macbook',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อ MacBook มือสอง MacBook Air Pro เช็กราคาก่อนขาย | เรารับซื้อ.com',
    description: 'รับซื้อ MacBook มือสอง MacBook Air และ MacBook Pro ประเมินจากรุ่น ชิป M1 M2 M3 M4 RAM SSD แบตเตอรี่ สภาพจอและอุปกรณ์ ส่งข้อมูลเช็กราคาก่อนขาย',
    h1: 'รับซื้อ MacBook มือสอง เช็กรุ่น ชิป แบตเตอรี่และสภาพก่อนขาย',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อไอโฟน/',
    state: 'INDEX',
    pageType: 'category',
    contentCluster: 'iphone',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อ iPhone มือสอง เช็กรุ่น แบตเตอรี่และสภาพก่อนขาย | เรารับซื้อ.com',
    description: 'รับซื้อ iPhone มือสองหลายรุ่น ประเมินจากรุ่น ความจุ สุขภาพแบตเตอรี่ หน้าจอ Face ID กล้อง สภาพเครื่อง ประวัติซ่อมและอุปกรณ์ ส่งข้อมูลเช็กราคาก่อนขาย',
    h1: 'รับซื้อ iPhone มือสอง เช็กรุ่น ความจุ แบตเตอรี่และสภาพก่อนขาย',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อไอแพด/',
    state: 'INDEX',
    pageType: 'category',
    contentCluster: 'ipad',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อ iPad มือสอง เช็กรุ่น ความจุ แบตเตอรี่และสภาพ | เรารับซื้อ.com',
    description: 'รับซื้อ iPad มือสอง iPad Air Pro mini ประเมินจากรุ่น ความจุ Wi-Fi หรือ Cellular หน้าจอ แบตเตอรี่ สภาพ ประวัติซ่อมและอุปกรณ์ ส่งข้อมูลเช็กราคาก่อนขาย',
    h1: 'รับซื้อ iPad มือสอง เช็กรุ่น ความจุ และสภาพก่อนขาย',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อกล้อง/',
    state: 'INDEX',
    pageType: 'category',
    contentCluster: 'camera',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อกล้องมือสอง กล้อง Mirrorless DSLR และเลนส์ | เรารับซื้อ.com',
    description: 'รับซื้อกล้องมือสอง Mirrorless DSLR และเลนส์ ประเมินจากรุ่น Body เลนส์ สภาพ Sensor Shutter หน้าจอ แบตเตอรี่ เชื้อรา ฝ้า และอุปกรณ์ ส่งข้อมูลเช็กราคาก่อนขาย',
    h1: 'รับซื้อกล้องมือสอง เช็กรุ่น Body เลนส์ และสภาพก่อนขาย',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อลำโพง/',
    state: 'INDEX',
    pageType: 'category',
    contentCluster: 'audio',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อลำโพงมือสอง Bluetooth JBL Marshall เช็กราคาก่อนขาย | เรารับซื้อ.com',
    description: 'รับซื้อลำโพงมือสอง Bluetooth และลำโพงพกพา ประเมินจากรุ่น แบตเตอรี่ เสียง ดอกลำโพง การเชื่อมต่อ สภาพ อุปกรณ์และประวัติซ่อม ส่งข้อมูลเช็กราคาก่อนขาย',
    h1: 'รับซื้อลำโพงมือสอง เช็กรุ่น เสียง แบตเตอรี่และสภาพก่อนขาย',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อซากคอมพิวเตอร์/',
    state: 'INDEX',
    pageType: 'category',
    contentCluster: 'pc',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อคอม/',
    title: 'รับซื้อซากคอมพิวเตอร์ คอมเสีย เปิดไม่ติด และอะไหล่ | เรารับซื้อ.com',
    description: 'รับซื้อซากคอมพิวเตอร์ คอมเสีย เปิดไม่ติด และชิ้นส่วนคอม ประเมินจาก CPU การ์ดจอ RAM SSD เมนบอร์ด PSU อาการและสภาพ ส่งสเปกกับรูปเช็กราคาก่อนขาย',
    h1: 'รับซื้อซากคอมพิวเตอร์ คอมเสีย เปิดไม่ติด เช็กมูลค่าชิ้นส่วนก่อนขาย',
    gscPriority: 'high',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อ-server/',
    state: 'INDEX',
    pageType: 'category',
    contentCluster: 'b2b',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อ Server มือสอง เซิร์ฟเวอร์องค์กร เช็กราคาก่อนขาย | เรารับซื้อ.com',
    description: 'รับซื้อ Server มือสองและเซิร์ฟเวอร์องค์กร ประเมินจากรุ่น CPU RAM ECC Storage RAID Controller Network PSU สภาพและอุปกรณ์ ส่งสเปกกับรูปเช็กราคาก่อนขาย',
    h1: 'รับซื้อ Server มือสอง เช็กสเปก อุปกรณ์ และสภาพก่อนขาย',
    gscPriority: 'high',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  }
];

/**
 * 2. Core Navigation Hubs & Structural Pages (HOLD_NOINDEX pending owner review)
 */
export const CORE_HOLD_NOINDEX_PAGES: SeoManifestRecord[] = [
  {
    path: '/รับซื้อคอมประกอบ/',
    state: 'HOLD_NOINDEX',
    pageType: 'category',
    contentCluster: 'pc',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อคอม/',
    title: 'รับซื้อคอมประกอบ มือสอง Gaming PC สเปกแรง | เรารับซื้อ.com',
    description: 'รับซื้อคอมประกอบ Gaming PC เวิร์กสเตชัน ตีราคาแยกชิ้นส่วนตามอุปกรณ์จริง CPU, GPU, RAM, Mainboard, SSD',
    h1: 'รับซื้อคอมประกอบและชิ้นส่วนคอมพิวเตอร์',
    gscPriority: 'high',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/รับซื้อเครื่องเกม/',
    state: 'HOLD_NOINDEX',
    pageType: 'category',
    contentCluster: 'gaming',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อเครื่องเกม PS5, PS4, Nintendo Switch, Steam Deck | เรารับซื้อ.com',
    description: 'รับซื้อคอนโซลและเครื่องเล่นเกมพกพา PlayStation, Nintendo Switch, Xbox, Handheld PC อุปกรณ์เสริม จอย แผ่นเกม',
    h1: 'รับซื้อเครื่องเล่นเกมคอนโซลและพกพา',
    gscPriority: 'high',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/รับซื้อ-apple-watch/',
    state: 'HOLD_NOINDEX',
    pageType: 'category',
    contentCluster: 'iphone',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อ Apple Watch Series, Ultra, SE มือสอง | เรารับซื้อ.com',
    description: 'รับซื้อ Apple Watch ทุกตระกูล Ultra, Series, SE ตรวจสอบสภาพบอดี้ หน้าจอ และสุขภาพแบตเตอรี่ ให้ราคายุติธรรม',
    h1: 'รับซื้อ Apple Watch มือสอง',
    gscPriority: 'medium',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/รับซื้อ-ups/',
    state: 'HOLD_NOINDEX',
    pageType: 'category',
    contentCluster: 'b2b',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อเครื่องสำรองไฟ UPS มือสอง ทุกขนาด | เรารับซื้อ.com',
    description: 'รับซื้อเครื่องสำรองไฟ UPS APC, Eaton, Cleanline, Syndome ทั้งขนาดบ้าน สำนักงาน และตู้แร็คระบบใหญ่',
    h1: 'รับซื้อเครื่องสำรองไฟ UPS มือสอง',
    gscPriority: 'medium',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/รับซื้อสมาร์ทโฟน-android/',
    state: 'HOLD_NOINDEX',
    pageType: 'category',
    contentCluster: 'android',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อ/',
    title: 'รับซื้อสมาร์ทโฟน Android Samsung, Xiaomi, OPPO, Vivo | เรารับซื้อ.com',
    description: 'รับซื้อโทรศัพท์มือถือระบบ Android รุ่นเรือธงและรุ่นยอดนิยม Samsung Galaxy, Xiaomi, OPPO, Vivo เช็กสเปก ตีราคาตรงตามสภาพ',
    h1: 'รับซื้อสมาร์ทโฟน Android มือสอง',
    gscPriority: 'medium',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/เช็กราคาก่อนขาย/',
    state: 'HOLD_NOINDEX',
    pageType: 'guide',
    contentCluster: 'general',
    primaryIntent: 'price_check',
    canonical: 'self',
    title: 'เช็กราคาก่อนขาย วิธีประเมินมูลค่าสินค้าไอทีมือสอง | เรารับซื้อ.com',
    description: 'แนวทางการประเมินราคาก่อนขายสินค้าไอที ปัจจัยที่มีผลต่อราคา สภาพเครื่อง อุปกรณ์ครบกล่อง และประกันคงเหลือ เพื่อให้ได้ราคาดีที่สุด',
    h1: 'เช็กราคาก่อนขาย เข้าใจปัจจัยประเมินสภาพ',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/ราคากลางรับซื้อ/',
    state: 'HOLD_NOINDEX',
    pageType: 'guide',
    contentCluster: 'general',
    primaryIntent: 'price_check',
    canonical: 'self',
    title: 'ราคากลางรับซื้อสินค้าไอทีมือสอง อัปเดตล่าสุด | เรารับซื้อ.com',
    description: 'มาตรฐานราคากลางรับซื้อสินค้าไอที โน๊ตบุ๊ค คอมพิวเตอร์ มือถือ แท็บเล็ต ให้คุณใช้เป็นแนวทางเปรียบเทียบก่อนตัดสินใจขาย',
    h1: 'แนวทางราคากลางรับซื้อสินค้าไอที',
    gscPriority: 'high',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/เกี่ยวกับเรา/',
    state: 'HOLD_NOINDEX',
    pageType: 'static',
    contentCluster: 'general',
    primaryIntent: 'trust',
    canonical: 'self',
    title: 'เกี่ยวกับเรา ข้อมูลบริการและพันธกิจ | เรารับซื้อ.com',
    description: 'ทำความรู้จัก เรารับซื้อ.com บริการรับซื้อสินค้าไอทีที่เน้นความโปร่งใส ปลอดภัย ซื่อตรง และให้คำปรึกษาก่อนตัดสินใจขาย',
    h1: 'เกี่ยวกับ เรารับซื้อ.com',
    gscPriority: 'medium',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/ความน่าเชื่อถือ/',
    state: 'HOLD_NOINDEX',
    pageType: 'static',
    contentCluster: 'general',
    primaryIntent: 'trust',
    canonical: 'self',
    title: 'ความน่าเชื่อถือ มาตรฐานการประเมินและการซื้อขาย | เรารับซื้อ.com',
    description: 'มาตรฐานความปลอดภัย กระบวนการล้างข้อมูลส่วนบุคคล (Data Privacy) และหลักฐานการทำธุรกรรมที่โปร่งใส',
    h1: 'มาตรฐานความปลอดภัยและความน่าเชื่อถือ',
    gscPriority: 'high',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/contact/',
    state: 'HOLD_NOINDEX',
    pageType: 'static',
    contentCluster: 'general',
    primaryIntent: 'contact',
    canonical: 'self',
    title: 'ติดต่อเรา ช่องทางส่งรูปประเมินราคา | เรารับซื้อ.com',
    description: 'ติดต่อทีมงาน เรารับซื้อ.com เพื่อส่งรูปถ่าย สเปก และรายละเอียดสินค้าเพื่อประเมินราคาเบื้องต้นได้ฟรีผ่าน LINE @webuy',
    h1: 'ติดต่อส่งรูปประเมินราคาเบื้องต้น',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/terms/',
    state: 'HOLD_NOINDEX',
    pageType: 'policy',
    contentCluster: 'general',
    primaryIntent: 'policy',
    canonical: 'self',
    title: 'ข้อกำหนดและเงื่อนไขการใช้บริการ | เรารับซื้อ.com',
    description: 'ข้อกำหนด เงื่อนไขการรับซื้อสินค้าไอที และหลักเกณฑ์การตรวจสอบกรรมสิทธิ์สินค้า',
    h1: 'ข้อกำหนดและเงื่อนไขการใช้บริการ',
    gscPriority: 'low',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/privacy-policy/',
    state: 'HOLD_NOINDEX',
    pageType: 'policy',
    contentCluster: 'general',
    primaryIntent: 'policy',
    canonical: 'self',
    title: 'นโยบายความเป็นส่วนตัว (Privacy Policy) | เรารับซื้อ.com',
    description: 'นโยบายการคุ้มครองข้อมูลส่วนบุคคลและมาตรฐานการล้างข้อมูลอุปกรณ์ก่อนการส่งต่อ',
    h1: 'นโยบายความเป็นส่วนตัว',
    gscPriority: 'low',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  },
  {
    path: '/cookie-policy/',
    state: 'HOLD_NOINDEX',
    pageType: 'policy',
    contentCluster: 'general',
    primaryIntent: 'policy',
    canonical: 'self',
    title: 'นโยบายคุกกี้ (Cookie Policy) | เรารับซื้อ.com',
    description: 'ข้อมูลเกี่ยวกับการใช้งานคุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานบนเว็บไซต์',
    h1: 'นโยบายคุกกี้',
    gscPriority: 'low',
    migrationStatus: 'preserved',
    contentStatus: 'PENDING_REVIEW'
  }
];

/**
 * 3. Authoritative 11 REBUILD_INDEX Candidates (CONTENT_REQUIRED / HOLD_NOINDEX)
 */
export const REBUILD_INDEX_CANDIDATES: SeoManifestRecord[] = [
  {
    path: '/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'audio',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อลำโพง/',
    title: 'รับซื้อลำโพง ร้อยเอ็ด | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local speaker content.'
  },
  {
    path: '/รับซื้อลำโพง-ยโสธร/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'audio',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อลำโพง/',
    title: 'รับซื้อลำโพง ยโสธร | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local speaker content.'
  },
  {
    path: '/รับซื้อไอแพด-ยโสธร-ipad/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'ipad',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อไอแพด/',
    title: 'รับซื้อไอแพด ยโสธร | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPad content.'
  },

  {
    path: '/รับซื้อไอโฟน-ขอนแก่น/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'iphone',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อไอโฟน/',
    title: 'รับซื้อไอโฟน ขอนแก่น | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPhone content.'
  },
  {
    path: '/รับซื้อไอโฟน-จังหวัดอุด/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'iphone',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อไอโฟน/',
    title: 'รับซื้อไอโฟน อุดรธานี | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPhone content.'
  },
  {
    path: '/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'iphone',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อไอโฟน/',
    title: 'รับซื้อไอโฟน ร้อยเอ็ด | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPhone content.'
  },
  {
    path: '/รับซื้อไอโฟน-ยโสธร/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'iphone',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อไอโฟน/',
    title: 'รับซื้อไอโฟน ยโสธร | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPhone content.'
  },
  {
    path: '/รับซื้อกล้องมือสองสุร/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'camera',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อกล้อง/',
    title: 'รับซื้อกล้อง สุรินทร์ | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local camera content.'
  },
  {
    path: '/buy-camera-mahasarakam/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'camera',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อกล้อง/',
    title: 'รับซื้อกล้อง มหาสารคาม | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local camera content.'
  },
  {
    path: '/รับซื้อกล้องมือสองมุก/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'camera',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อกล้อง/',
    title: 'รับซื้อกล้อง มุกดาหาร | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local camera content.'
  }
];

/**
 * 4. Authoritative 29 HOLD_NOINDEX Historical Survivor Pages
 */
export const HOLD_NOINDEX_SURVIVORS: SeoManifestRecord[] = [
  '/ขายโน๊ตบุ๊ค-ขอนแก่น/',
  '/ร้านรับซื้อโน๊ตบุ๊คอุบ-2/',
  '/รับซื้อกล้อง-canon-2/',
  '/รับซื้อกล้อง-sony-a6400/',
  '/รับซื้อกล้อง-sony-rx100/',
  '/รับซื้อกล้อง-sony-a7/',
  '/รับซื้อกล้องมือสองอุบล/',
  '/รับซื้อกล้องมือสองขอนแ/',
  '/รับซื้อกล้องมือสองอุดร/',
  '/รับซื้อกล้องมือสองนครร/',
  '/รับซื้อกล้องมือสองบุรี/',
  '/รับซื้อกล้องมือสองศรี/',
  '/รับซื้อกล้องมือสองกาฬ/',
  '/รับซื้อกล้องมือสองมหา/',
  '/รับซื้อกล้องมือสองยโสธ/',
  '/รับซื้อกล้องมือสองมุกด/',
  '/รับซื้อกล้องมือสองบึง/',
  '/รับซื้อกล้องมือสองหนอ/',
  '/รับซื้อกล้องนครราชสีมา/',
  '/รับซื้อกล้องเลนส์/',
  '/ร้านรับซื้อโน๊ตบุ๊คในอ/',
  '/รับซื้อกล้อง-รับซื้อเลน/',
  '/buy-camera-ubon/',
  '/buy-camera-nongkai/',
  '/รับซื้อไอโฟน-15-iphone-15/',
  '/รับซื้อไอโฟน-iphone-อุบล/',
  '/รับซื้อกล้อง-canon/',
  '/รับซื้อกล้อง-nikon-รับซื้อกล/',
  '/รับซื้อกล้อง-ใกล้ฉัน/'
].map(p => ({
  path: p,
  state: 'HOLD_NOINDEX',
  contentStatus: 'PENDING_REVIEW',
  migrationStatus: 'hold',
  notes: 'Historical survivor in hold/review'
}));

/**
 * 5. Unexpected Legacy Paths Requiring Review (REVIEW_REQUIRED / DRAFT)
 */
export const UNREVIEWED_LEGACY_PATHS: SeoManifestRecord[] = [
  "/100-อันดับ-กล้อง-fujifilm-ในตลาดมือ/",
  "/10-อันดับ-กล้อง-fujifilm-ในตลาดมือ/",
  "/1090/",
  "/1199/",
  "/1209/",
  "/1216/",
  "/1230/",
  "/1340/",
  "/1352/",
  "/1362/",
  "/1477/",
  "/1480/",
  "/1482/",
  "/1494/",
  "/1498/",
  "/1500/",
  "/1502/",
  "/1504/",
  "/1508/",
  "/1511/",
  "/1515/",
  "/1517/"
].map(p => ({
  path: p,
  state: 'DRAFT',
  contentStatus: 'NOT_APPLICABLE',
  migrationStatus: 'hold',
  notes: 'Unapproved legacy numeric ID / ranking path requiring owner review (REVIEW_REQUIRED).'
}));

/**
 * 6. Master Manifest Map Assembly
 */
const ALL_MANIFEST_RECORDS: SeoManifestRecord[] = [
  ...APPROVED_INDEX_PAGES,
  ...CORE_HOLD_NOINDEX_PAGES,
  ...REBUILD_INDEX_CANDIDATES,
  ...HOLD_NOINDEX_SURVIVORS,
  ...UNREVIEWED_LEGACY_PATHS,
  ...PLANNED_PAGES
];

export const SEO_MANIFEST_MAP = new Map<string, SeoManifestRecord>();

for (const rec of ALL_MANIFEST_RECORDS) {
  const norm = normalizePath(rec.path);
  SEO_MANIFEST_MAP.set(norm, { ...rec, path: norm });
}

// Register 301 Redirects
for (const rule of RAW_REDIRECT_RULES) {
  const src = normalizePath(rule.source);
  const tgt = normalizePath(rule.target);
  if (!SEO_MANIFEST_MAP.has(src)) {
    SEO_MANIFEST_MAP.set(src, {
      path: src,
      state: 'REDIRECT',
      redirectTo: tgt,
      migrationStatus: 'redirected',
      contentStatus: 'NOT_APPLICABLE',
      notes: rule.reason
    });
  }
}

// Register 410 GONE Paths (Authoritative 208)
for (const g of GONE_PATHS_RAW) {
  const norm = normalizePath(g);
  if (!SEO_MANIFEST_MAP.has(norm)) {
    SEO_MANIFEST_MAP.set(norm, {
      path: norm,
      state: 'GONE',
      migrationStatus: 'gone',
      contentStatus: 'NOT_APPLICABLE',
      notes: 'Quarantined off-topic / spam legacy URL.'
    });
  }
}

export function getManifestRecord(path: string): SeoManifestRecord | undefined {
  return SEO_MANIFEST_MAP.get(normalizePath(path));
}
