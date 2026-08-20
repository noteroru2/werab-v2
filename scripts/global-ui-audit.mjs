/**
 * scripts/global-ui-audit.mjs
 * Global Header & Footer Integrity Audit for เรารับซื้อ.com V2
 * Authoritative verification against docs/content-approved/approved-global-ui.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export function runGlobalUiAudit() {
  console.log('\n============================================================');
  console.log('       เรารับซื้อ.com V2 — GLOBAL UI INTEGRITY AUDIT        ');
  console.log('============================================================\n');

  const headerPath = path.join(rootDir, 'src', 'components', 'Header.astro');
  const footerPath = path.join(rootDir, 'src', 'components', 'Footer.astro');

  const headerRaw = fs.readFileSync(headerPath, 'utf8');
  const footerRaw = fs.readFileSync(footerPath, 'utf8');

  let errors = 0;

  // 1. Prohibited Global Claims Check
  const PROHIBITED_CLAIMS = [
    'ศูนย์บริการรับซื้อสินค้าไอทีมือสองครบวงจร',
    'ดำเนินมาตรการลบข้อมูล (Data Sanitization) ให้ผู้ขายทุกครั้ง',
    'ราคาสูงที่สุด',
    'ให้ราคาดีที่สุด',
    'อันดับ 1',
    'รับซื้อทุกรุ่น',
    'รับซื้อทุกสภาพ',
    'รับประกันรับซื้อ',
    'มีสาขาทั่วประเทศ',
    'มีสาขาทุกจังหวัด',
    'เปิด 24 ชั่วโมง',
    'official Apple partner',
    'official brand authorization',
    'official service center',
    'guaranteed data sanitization'
  ];

  let unapprovedClaimsCount = 0;
  for (const claim of PROHIBITED_CLAIMS) {
    if (headerRaw.includes(claim)) {
      console.error(`❌ Header contains prohibited claim: "${claim}"`);
      unapprovedClaimsCount++;
      errors++;
    }
    if (footerRaw.includes(claim)) {
      console.error(`❌ Footer contains prohibited claim: "${claim}"`);
      unapprovedClaimsCount++;
      errors++;
    }
  }

  // 2. Camera & Speaker Global Link State
  let headerCameraLink = 'ABSENT';
  if (headerRaw.includes("'/รับซื้อกล้อง/'") || headerRaw.includes('"/รับซื้อกล้อง/"') || headerRaw.includes('href="/รับซื้อกล้อง/"')) {
    headerCameraLink = 'CLICKABLE';
  } else if (headerRaw.includes('รับซื้อกล้อง')) {
    headerCameraLink = 'PLAIN_TEXT';
  }

  let footerCameraLink = 'ABSENT';
  if (footerRaw.includes("'/รับซื้อกล้อง/'") || footerRaw.includes('"/รับซื้อกล้อง/"') || footerRaw.includes('href="/รับซื้อกล้อง/"')) {
    footerCameraLink = 'CLICKABLE';
  } else if (footerRaw.includes('รับซื้อกล้อง')) {
    footerCameraLink = 'PLAIN_TEXT';
  }

  let headerSpeakerLink = 'ABSENT';
  if (headerRaw.includes("'/รับซื้อลำโพง/'") || headerRaw.includes('"/รับซื้อลำโพง/"') || headerRaw.includes('href="/รับซื้อลำโพง/"')) {
    headerSpeakerLink = 'CLICKABLE';
  } else if (headerRaw.includes('รับซื้อลำโพง')) {
    headerSpeakerLink = 'PLAIN_TEXT';
  }

  let footerSpeakerLink = 'ABSENT';
  if (footerRaw.includes("'/รับซื้อลำโพง/'") || footerRaw.includes('"/รับซื้อลำโพง/"') || footerRaw.includes('href="/รับซื้อลำโพง/"')) {
    footerSpeakerLink = 'CLICKABLE';
  } else if (footerRaw.includes('รับซื้อลำโพง')) {
    footerSpeakerLink = 'PLAIN_TEXT';
  }

  let headerScrapLink = 'ABSENT';
  if (headerRaw.includes("'/รับซื้อซากคอมพิวเตอร์/'") || headerRaw.includes('"/รับซื้อซากคอมพิวเตอร์/"') || headerRaw.includes('href="/รับซื้อซากคอมพิวเตอร์/"')) {
    headerScrapLink = 'CLICKABLE';
  } else if (headerRaw.includes('รับซื้อซากคอมพิวเตอร์') || headerRaw.includes('ซากคอมพิวเตอร์')) {
    headerScrapLink = 'PLAIN_TEXT';
  }

  let footerScrapLink = 'ABSENT';
  if (footerRaw.includes("'/รับซื้อซากคอมพิวเตอร์/'") || footerRaw.includes('"/รับซื้อซากคอมพิวเตอร์/"') || footerRaw.includes('href="/รับซื้อซากคอมพิวเตอร์/"')) {
    footerScrapLink = 'CLICKABLE';
  } else if (footerRaw.includes('รับซื้อซากคอมพิวเตอร์') || footerRaw.includes('ซากคอมพิวเตอร์')) {
    footerScrapLink = 'PLAIN_TEXT';
  }

  let headerServerLink = 'ABSENT';
  if (headerRaw.includes("'/รับซื้อ-server/'") || headerRaw.includes('"/รับซื้อ-server/"') || headerRaw.includes('href="/รับซื้อ-server/"')) {
    headerServerLink = 'CLICKABLE';
  } else if (headerRaw.includes('รับซื้อ Server') || headerRaw.includes('รับซื้อ-server')) {
    headerServerLink = 'PLAIN_TEXT';
  }

  let footerServerLink = 'ABSENT';
  if (footerRaw.includes("'/รับซื้อ-server/'") || footerRaw.includes('"/รับซื้อ-server/"') || footerRaw.includes('href="/รับซื้อ-server/"')) {
    footerServerLink = 'CLICKABLE';
  } else if (footerRaw.includes('รับซื้อ Server') || footerRaw.includes('รับซื้อ-server')) {
    footerServerLink = 'PLAIN_TEXT';
  }

  // 3. Unsafe / Unapproved Route Links Check
  const PROHIBITED_ROUTES = [
    '/รับซื้อลำโพง/', // Not in approved-global-ui.md navigation
    '/รับซื้อซากคอมพิวเตอร์/', // Not in approved-global-ui.md navigation
    '/รับซื้อ-server/', // HOLD_NOINDEX route must not be clickable in global nav while unreleased
    '/รับซื้อคอมประกอบ/',
    '/รับซื้อเครื่องเกม/',
    '/ราคากลางรับซื้อ/',
    '/ความน่าเชื่อถือ/',
    '/รับซื้อ-macbook/',
    '/terms/',
    '/privacy-policy/',
    '/cookie-policy/',
    '/contact/'
  ];

  let unsafeHeaderLinks = 0;
  let unsafeFooterLinks = 0;
  let redirectSourceLinks = 0;
  let goneLinks = 0;
  let draft404Links = 0;
  let holdNoindexLinks = 0;

  for (const r of PROHIBITED_ROUTES) {
    if (headerRaw.includes(`'${r}'`) || headerRaw.includes(`"${r}"`) || headerRaw.includes(`href="${r}"`)) {
      console.error(`❌ Header contains unapproved/unsafe route link: "${r}"`);
      unsafeHeaderLinks++;
      errors++;
      if (r === '/รับซื้อ-macbook/') redirectSourceLinks++;
      else if (r === '/รับซื้อ-server/' || r === '/รับซื้อคอมประกอบ/' || r === '/รับซื้อเครื่องเกม/') holdNoindexLinks++;
      else draft404Links++;
    }
    if (footerRaw.includes(`'${r}'`) || footerRaw.includes(`"${r}"`) || footerRaw.includes(`href="${r}"`)) {
      console.error(`❌ Footer contains unapproved/unsafe route link: "${r}"`);
      unsafeFooterLinks++;
      errors++;
      if (r === '/รับซื้อ-macbook/') redirectSourceLinks++;
      else if (r === '/รับซื้อ-server/' || r === '/รับซื้อคอมประกอบ/' || r === '/รับซื้อเครื่องเกม/') holdNoindexLinks++;
      else draft404Links++;
    }
  }

  // Camera link must be CLICKABLE now that /รับซื้อกล้อง/ is released to INDEX
  if (headerCameraLink !== 'CLICKABLE') {
    console.error('❌ Header must contain approved CLICKABLE Camera link');
    errors++;
  }
  if (footerCameraLink !== 'CLICKABLE') {
    console.error('❌ Footer must contain approved CLICKABLE Camera link');
    errors++;
  }

  // Speaker link must be ABSENT per approved-global-ui.md
  if (headerSpeakerLink !== 'ABSENT') {
    console.error('❌ Header must NOT contain /รับซื้อลำโพง/');
    errors++;
  }
  if (footerSpeakerLink !== 'ABSENT') {
    console.error('❌ Footer must NOT contain /รับซื้อลำโพง/');
    errors++;
  }

  // Scrap link must be ABSENT per approved-global-ui.md
  if (headerScrapLink !== 'ABSENT') {
    console.error('❌ Header must NOT contain /รับซื้อซากคอมพิวเตอร์/');
    errors++;
  }
  if (footerScrapLink !== 'ABSENT') {
    console.error('❌ Footer must NOT contain /รับซื้อซากคอมพิวเตอร์/');
    errors++;
  }

  // Server link must be ABSENT per approved-global-ui.md
  if (headerServerLink !== 'ABSENT') {
    console.error('❌ Header must NOT contain /รับซื้อ-server/');
    errors++;
  }
  if (footerServerLink !== 'ABSENT') {
    console.error('❌ Footer must NOT contain /รับซื้อ-server/');
    errors++;
  }

  // 4. Approved Footer Description & Positioning Check
  const expectedDesc = 'ข้อมูลและบริการรับประเมินสินค้าไอทีมือสองตามรุ่น สเปก สภาพ และอุปกรณ์ เพื่อให้ผู้ขายเช็กราคาเบื้องต้นก่อนตัดสินใจ';
  const expectedPositioning = 'ก่อนขาย เช็กราคา เข้าใจสภาพ แล้วค่อยตัดสินใจ';
  const expectedBrand = 'เรารับซื้อ.com';
  const expectedCopyright = '© 2026';

  let footerPass = true;
  if (!footerRaw.includes(expectedBrand) && !footerRaw.includes('BUSINESS_FACTS.VERIFIED.brandName')) {
    console.error('❌ Footer missing approved brand');
    footerPass = false;
    errors++;
  }
  if (!footerRaw.replace(/\s+/g, ' ').includes(expectedDesc)) {
    console.error('❌ Footer missing approved description');
    footerPass = false;
    errors++;
  }
  if (!footerRaw.replace(/\s+/g, ' ').includes(expectedPositioning)) {
    console.error('❌ Footer missing approved positioning');
    footerPass = false;
    errors++;
  }
  if (!footerRaw.includes(expectedCopyright)) {
    console.error('❌ Footer missing approved copyright');
    footerPass = false;
    errors++;
  }

  let headerPass = true;
  if (unsafeHeaderLinks > 0 || unapprovedClaimsCount > 0) {
    headerPass = false;
  }
  if (unsafeFooterLinks > 0 || !footerPass) {
    footerPass = false;
  }

  const totalUnsafeLinks = unsafeHeaderLinks + unsafeFooterLinks;

  console.log(`HEADER:                  ${headerPass ? 'PASS' : 'FAIL'}`);
  console.log(`FOOTER:                  ${footerPass ? 'PASS' : 'FAIL'}`);
  console.log(`HEADER_CAMERA_LINK:      ${headerCameraLink}`);
  console.log(`FOOTER_CAMERA_LINK:      ${footerCameraLink}`);
  console.log(`HOLD_NOINDEX GLOBAL NAV: ${holdNoindexLinks} expected 0`);
  console.log(`UNAPPROVED GLOBAL CLAIMS:${unapprovedClaimsCount} expected 0`);
  console.log(`UNSAFE HEADER LINKS:     ${unsafeHeaderLinks} expected 0`);
  console.log(`UNSAFE FOOTER LINKS:     ${unsafeFooterLinks} expected 0`);
  console.log(`REDIRECT-SOURCE LINKS:   ${redirectSourceLinks} expected 0`);
  console.log(`GONE LINKS:              ${goneLinks} expected 0`);
  console.log(`DRAFT/404 LINKS:         ${draft404Links} expected 0`);
  console.log(`UNSAFE GLOBAL LINKS:     ${totalUnsafeLinks} expected 0`);
  console.log('============================================================\n');

  if (errors > 0) {
    console.error(`❌ Global UI Audit Failed with ${errors} error(s).`);
    return {
      success: false,
      errors,
      headerCameraLink,
      footerCameraLink,
      holdNoindexLinks,
      totalUnsafeLinks
    };
  }

  console.log('🎉 GLOBAL UI AUDIT PASSED WITH ZERO ERRORS!\n');
  return {
    success: true,
    errors: 0,
    headerCameraLink,
    footerCameraLink,
    holdNoindexLinks,
    totalUnsafeLinks
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { success } = runGlobalUiAudit();
  if (!success) {
    process.exit(1);
  }
}
