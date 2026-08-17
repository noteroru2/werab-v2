/**
 * src/config/seo/manifest.ts
 * Central SEO Manifest — Single source of truth for URL architecture,
 * lifecycle state, indexability, canonical relationships, and migration provenance.
 */

import type { SeoManifestRecord } from './types';
import { GONE_PATHS_RAW } from './gone';
import { RAW_REDIRECT_RULES } from './redirects';
import { PLANNED_PAGES } from '../planned-pages';
import { normalizePath } from '../../lib/seo/normalize';

/**
 * 1. Core Money Pages, Hubs, and Essential Static Pages
 */
export const CORE_PAGES: SeoManifestRecord[] = [
  {
    path: '/',
    state: 'INDEX',
    pageType: 'hub',
    contentCluster: 'general',
    primaryIntent: 'buyback',
    canonical: 'self',
    title: 'เรารับซื้อ.com | บริการรับซื้อสินค้าไอที มือสอง ประเมินราคาจริงใจ',
    description: 'ศูนย์บริการรับซื้อสินค้าไอทีมือสองครบวงจร โน๊ตบุ๊ค คอมพิวเตอร์ แมคบุ๊ค ไอโฟน ไอแพด กล้อง ลำโพง เครื่องเกม เช็กราคาก่อนขาย ประเมินสภาพตรงไปตรงมา',
    h1: 'รับซื้อสินค้าไอทีมือสอง ประเมินราคาเบื้องต้นก่อนขาย',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อ/',
    state: 'INDEX',
    pageType: 'hub',
    contentCluster: 'general',
    primaryIntent: 'buyback',
    canonical: 'self',
    title: 'หมวดหมู่สินค้าที่เรารับซื้อ | เรารับซื้อ.com',
    description: 'รวมหมวดหมู่สินค้าไอทีมือสองที่เรารับซื้อทุกประเภท เช็กรายละเอียดรุ่น สภาพ และเงื่อนไขการรับซื้อได้ทันที',
    h1: 'บริการรับซื้อสินค้าไอทีมือสองทุกหมวดหมู่',
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
    title: 'รับซื้อโน๊ตบุ๊ค มือสอง ทุกรุ่น ทุกสภาพ | เรารับซื้อ.com',
    description: 'รับซื้อโน๊ตบุ๊คมือสอง Gaming, Office, Ultrabook ทุกแบรนด์ Asus, Acer, Lenovo, Dell, HP, MSI ประเมินราคาเร็ว ให้ราคาสมเหตุสมผล',
    h1: 'รับซื้อโน๊ตบุ๊คมือสอง ตีราคาตรงตามสภาพ',
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
    title: 'รับซื้อคอมพิวเตอร์ มือสอง PC คอมแบรนด์ ทุกสเปก | เรารับซื้อ.com',
    description: 'รับซื้อคอมพิวเตอร์ตั้งโต๊ะ PC Desktop สำนักงาน คอมประกอบ เช็กราคาก่อนขาย นัดรับได้สะดวก ปลอดภัย',
    h1: 'รับซื้อคอมพิวเตอร์มือสอง ทุกสเปก',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อคอมประกอบ/',
    state: 'INDEX',
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
    title: 'รับซื้อแมคบุ๊ค MacBook Pro / Air ชิป M1 M2 M3 Intel | เรารับซื้อ.com',
    description: 'รับซื้อ MacBook Pro, MacBook Air ทุกรุ่น เช็กสุขภาพแบตเตอรี่ สภาพตัวเครื่อง ตีราคาโปร่งใส ปลดล็อค Apple ID ปลอดภัย',
    h1: 'รับซื้อ MacBook มือสอง ทุกตระกูล',
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
    title: 'รับซื้อไอโฟน iPhone ทุกรุ่น สภาพสวย หรือมีตำหนิ | เรารับซื้อ.com',
    description: 'รับซื้อ iPhone มือสอง ตั้งแต่รุ่นใหม่จนถึงรุ่นยอดนิยม ตรวจสอบสุขภาพแบตเตอรี่ ฟังก์ชัน Face ID กล้อง หน้าจอ ประเมินราคาตรงจุด',
    h1: 'รับซื้อไอโฟน iPhone มือสอง ทุกสภาพ',
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
    title: 'รับซื้อไอแพด iPad Pro, Air, Mini, Gen มือสอง | เรารับซื้อ.com',
    description: 'รับซื้อ iPad ทุกซีรีส์ พร้อมรับซื้ออุปกรณ์เสริม Apple Pencil, Magic Keyboard ประเมินราคาตามสภาพจริง',
    h1: 'รับซื้อ iPad มือสอง ทุกรุ่น',
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
    title: 'รับซื้อกล้อง มือสอง เลนส์ Mirrorless DSLR ทุกค่าย | เรารับซื้อ.com',
    description: 'รับซื้อกล้องดิจิตอล Sony, Canon, Fujifilm, Nikon, Panasonic เลนส์ และอุปกรณ์ถ่ายภาพ เช็กชัตเตอร์ ตรวจเซนเซอร์ ตีราคาแม่นยำ',
    h1: 'รับซื้อกล้องและเลนส์มือสอง ทุกค่าย',
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
    title: 'รับซื้อลำโพง Marshall, JBL, Harman Kardon, Bose มือสอง | เรารับซื้อ.com',
    description: 'รับซื้อลำโพงบลูทูธ ลำโพงพกพา ลำโพงบ้านแบรนด์ดัง Marshall, JBL, Bose, Harman Kardon เช็กระบบเสียง แบตเตอรี่ ประเมินราคาเร็ว',
    h1: 'รับซื้อลำโพงบลูทูธและเครื่องเสียงมือสอง',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อเครื่องเกม/',
    state: 'INDEX',
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
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อ-apple-watch/',
    state: 'INDEX',
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
    title: 'รับซื้อ Server และอุปกรณ์ Enterprise IT องค์กร | เรารับซื้อ.com',
    description: 'รับซื้อเซิร์ฟเวอร์ Rack Server, Tower Server, Storage, Switch, อุปกรณ์ห้อง Data Center สำหรับองค์กรและ B2B พร้อมบริการจัดการขนย้าย',
    h1: 'รับซื้อ Server และอุปกรณ์ไอทีระดับองค์กร',
    gscPriority: 'high',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อ-ups/',
    state: 'INDEX',
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
    contentStatus: 'READY'
  },
  {
    path: '/รับซื้อสมาร์ทโฟน-android/',
    state: 'INDEX',
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
    contentStatus: 'READY'
  },
  {
    path: '/เช็กราคาก่อนขาย/',
    state: 'INDEX',
    pageType: 'guide',
    contentCluster: 'general',
    primaryIntent: 'price_check',
    canonical: 'self',
    title: 'เช็กราคาก่อนขาย วิธีประเมินมูลค่าสินค้าไอทีมือสอง | เรารับซื้อ.com',
    description: 'แนวทางการประเมินราคาก่อนขายสินค้าไอที ปัจจัยที่มีผลต่อราคา สภาพเครื่อง อุปกรณ์ครบกล่อง และประกันคงเหลือ เพื่อให้ได้ราคาดีที่สุด',
    h1: 'เช็กราคาก่อนขาย เข้าใจปัจจัยประเมินสภาพ',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/ราคากลางรับซื้อ/',
    state: 'INDEX',
    pageType: 'guide',
    contentCluster: 'general',
    primaryIntent: 'price_check',
    canonical: 'self',
    title: 'ราคากลางรับซื้อสินค้าไอทีมือสอง อัปเดตล่าสุด | เรารับซื้อ.com',
    description: 'มาตรฐานราคากลางรับซื้อสินค้าไอที โน๊ตบุ๊ค คอมพิวเตอร์ มือถือ แท็บเล็ต ให้คุณใช้เป็นแนวทางเปรียบเทียบก่อนตัดสินใจขาย',
    h1: 'แนวทางราคากลางรับซื้อสินค้าไอที',
    gscPriority: 'high',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/เกี่ยวกับเรา/',
    state: 'INDEX',
    pageType: 'static',
    contentCluster: 'general',
    primaryIntent: 'trust',
    canonical: 'self',
    title: 'เกี่ยวกับเรา ข้อมูลบริการและพันธกิจ | เรารับซื้อ.com',
    description: 'ทำความรู้จัก เรารับซื้อ.com บริการรับซื้อสินค้าไอทีที่เน้นความโปร่งใส ปลอดภัย ซื่อตรง และให้คำปรึกษาก่อนตัดสินใจขาย',
    h1: 'เกี่ยวกับ เรารับซื้อ.com',
    gscPriority: 'medium',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/ความน่าเชื่อถือ/',
    state: 'INDEX',
    pageType: 'static',
    contentCluster: 'general',
    primaryIntent: 'trust',
    canonical: 'self',
    title: 'ความน่าเชื่อถือ มาตรฐานการประเมินและการซื้อขาย | เรารับซื้อ.com',
    description: 'มาตรฐานความปลอดภัย กระบวนการล้างข้อมูลส่วนบุคคล (Data Privacy) และหลักฐานการทำธุรกรรมที่โปร่งใส',
    h1: 'มาตรฐานความปลอดภัยและความน่าเชื่อถือ',
    gscPriority: 'high',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/contact/',
    state: 'INDEX',
    pageType: 'static',
    contentCluster: 'general',
    primaryIntent: 'contact',
    canonical: 'self',
    title: 'ติดต่อเรา ช่องทางส่งรูปประเมินราคา | เรารับซื้อ.com',
    description: 'ติดต่อทีมงาน เรารับซื้อ.com เพื่อส่งรูปถ่าย สเปก และรายละเอียดสินค้าเพื่อประเมินราคาเบื้องต้นได้ฟรีผ่าน LINE @webuy',
    h1: 'ติดต่อส่งรูปประเมินราคาเบื้องต้น',
    gscPriority: 'critical',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/terms/',
    state: 'INDEX',
    pageType: 'policy',
    contentCluster: 'general',
    primaryIntent: 'policy',
    canonical: 'self',
    title: 'ข้อกำหนดและเงื่อนไขการใช้บริการ | เรารับซื้อ.com',
    description: 'ข้อกำหนด เงื่อนไขการรับซื้อสินค้าไอที และหลักเกณฑ์การตรวจสอบกรรมสิทธิ์สินค้า',
    h1: 'ข้อกำหนดและเงื่อนไขการใช้บริการ',
    gscPriority: 'low',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/privacy-policy/',
    state: 'INDEX',
    pageType: 'policy',
    contentCluster: 'general',
    primaryIntent: 'policy',
    canonical: 'self',
    title: 'นโยบายความเป็นส่วนตัว (Privacy Policy) | เรารับซื้อ.com',
    description: 'นโยบายการคุ้มครองข้อมูลส่วนบุคคลและมาตรฐานการล้างข้อมูลอุปกรณ์ก่อนการส่งต่อ',
    h1: 'นโยบายความเป็นส่วนตัว',
    gscPriority: 'low',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  },
  {
    path: '/cookie-policy/',
    state: 'INDEX',
    pageType: 'policy',
    contentCluster: 'general',
    primaryIntent: 'policy',
    canonical: 'self',
    title: 'นโยบายคุกกี้ (Cookie Policy) | เรารับซื้อ.com',
    description: 'ข้อมูลเกี่ยวกับการใช้งานคุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานบนเว็บไซต์',
    h1: 'นโยบายคุกกี้',
    gscPriority: 'low',
    migrationStatus: 'preserved',
    contentStatus: 'READY'
  }
];

/**
 * 2. Approved Historical Survivor Content Pages (INDEX with READY Content)
 */
export const APPROVED_CONTENT_PAGES: SeoManifestRecord[] = [
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
  }
];

/**
 * 3. Survivor REBUILD_INDEX Candidates (Pending Owner/ChatGPT Content -> HOLD_NOINDEX / CONTENT_REQUIRED)
 */
export const PENDING_SURVIVOR_PAGES: SeoManifestRecord[] = [
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
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local content.'
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
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local content.'
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
    notes: 'REBUILD_INDEX survivor candidate - awaiting unique local content.'
  },
  {
    path: '/รับซื้อกล้อง-canon/',
    state: 'HOLD_NOINDEX',
    pageType: 'category',
    contentCluster: 'camera',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อกล้อง/',
    title: 'รับซื้อกล้อง Canon | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting brand guide content.'
  },
  {
    path: '/รับซื้อกล้อง-sony-a6400/',
    state: 'HOLD_NOINDEX',
    pageType: 'model',
    contentCluster: 'camera',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อกล้อง/',
    title: 'รับซื้อกล้อง Sony A6400 | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - awaiting model page content.'
  },
  {
    path: '/buy-camera-ubon/',
    state: 'HOLD_NOINDEX',
    pageType: 'location',
    contentCluster: 'camera',
    primaryIntent: 'local',
    canonical: 'self',
    parent: '/รับซื้อกล้อง/',
    title: 'รับซื้อกล้อง อุบลราชธานี | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - historical English slug.'
  },
  {
    path: '/รับซื้อไอโฟนใกล้ฉัน/',
    state: 'HOLD_NOINDEX',
    pageType: 'guide',
    contentCluster: 'iphone',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อไอโฟน/',
    title: 'รับซื้อไอโฟนใกล้ฉัน | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - non-hyphenated alias.'
  },
  {
    path: '/รับซื้อกล้องถ่ายรูป/',
    state: 'HOLD_NOINDEX',
    pageType: 'category',
    contentCluster: 'camera',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อกล้อง/',
    title: 'รับซื้อกล้องถ่ายรูป | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate.'
  },
  {
    path: '/รับซื้อกล้อง-nikon-รับซื้อกล/',
    state: 'HOLD_NOINDEX',
    pageType: 'category',
    contentCluster: 'camera',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อกล้อง/',
    title: 'รับซื้อกล้อง Nikon | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate - historical keyword slug.'
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
    notes: 'REBUILD_INDEX survivor candidate - awaiting Batch 1 local rewrite.'
  },
  {
    path: '/รับซื้อแม็คบุ๊ค-macbook/',
    state: 'HOLD_NOINDEX',
    pageType: 'category',
    contentCluster: 'macbook',
    primaryIntent: 'buyback',
    canonical: 'self',
    parent: '/รับซื้อแมคบุ๊ค/',
    title: 'รับซื้อแม็คบุ๊ค MacBook | เรารับซื้อ.com',
    contentStatus: 'CONTENT_REQUIRED',
    migrationStatus: 'hold',
    notes: 'REBUILD_INDEX survivor candidate.'
  }
];

/**
 * 4. Master Map Assembly
 */
const ALL_EXPLICIT_RECORDS: SeoManifestRecord[] = [
  ...CORE_PAGES,
  ...APPROVED_CONTENT_PAGES,
  ...PENDING_SURVIVOR_PAGES,
  ...PLANNED_PAGES
];

export const SEO_MANIFEST_MAP = new Map<string, SeoManifestRecord>();

for (const rec of ALL_EXPLICIT_RECORDS) {
  const norm = normalizePath(rec.path);
  SEO_MANIFEST_MAP.set(norm, { ...rec, path: norm });
}

// Register Redirects into Manifest
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

// Register GONE paths into Manifest
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
