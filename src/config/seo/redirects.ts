/**
 * src/config/seo/redirects.ts
 * Authoritative 301 Permanent Redirect Registry for เรารับซื้อ.com V2.
 * Contains exactly 44 verified historical migration redirect sources.
 */

import { normalizePath } from '../../lib/seo/normalize';

export interface RedirectRule {
  source: string;
  target: string;
  status: 301;
  reason?: string;
}

export const RAW_REDIRECT_RULES: Array<{ source: string; target: string; reason?: string }> = [
  // 1. English Transliterations -> Thai Canonical (8 rules)
  { source: '/rab-sue/', target: '/รับซื้อ/', reason: 'English transliteration alias' },
  { source: '/rab-sue-com/', target: '/รับซื้อคอม/', reason: 'English transliteration alias' },
  { source: '/rab-sue-ipad/', target: '/รับซื้อไอแพด/', reason: 'English transliteration alias' },
  { source: '/rab-sue-iphone/', target: '/รับซื้อไอโฟน/', reason: 'English transliteration alias' },
  { source: '/rab-sue-klong/', target: '/รับซื้อกล้อง/', reason: 'English transliteration alias' },
  { source: '/rab-sue-lamphong/', target: '/รับซื้อลำโพง/', reason: 'English transliteration alias' },
  { source: '/rab-sue-macbook/', target: '/รับซื้อแมคบุ๊ค/', reason: 'English transliteration alias' },
  { source: '/rab-sue-notebook/', target: '/รับซื้อโน๊ตบุ๊ค/', reason: 'English transliteration alias' },

  // 2. 'ใกล้ฉัน' (Near Me) Variants -> Canonical Category Hubs (11 rules)
  { source: '/รับซื้อ-ใกล้ฉัน/', target: '/รับซื้อ/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อคอม-ใกล้ฉัน/', target: '/รับซื้อคอม/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อคอมประกอบ-ใกล้ฉัน/', target: '/รับซื้อคอมประกอบ/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อโน๊ตบุ๊ค-ใกล้ฉัน/', target: '/รับซื้อโน๊ตบุ๊ค/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อแมคบุ๊ค-ใกล้ฉัน/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อไอแพด-ใกล้ฉัน/', target: '/รับซื้อไอแพด/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อไอโฟน-ใกล้ฉัน/', target: '/รับซื้อไอโฟน/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อ-apple-watch-ใกล้ฉัน/', target: '/รับซื้อ-apple-watch/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อลำโพง-ใกล้ฉัน/', target: '/รับซื้อลำโพง/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อสมาร์ทโฟน-android-ใกล้ฉัน/', target: '/รับซื้อสมาร์ทโฟน-android/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อเครื่องเกม-ใกล้ฉัน/', target: '/รับซื้อเครื่องเกม/', reason: 'Near-me alias consolidation' },

  // 3. Contact (1 rule)
  { source: '/ติดต่อเรา/', target: '/contact/', reason: 'Thai contact alias' },

  // 4. Truncated & Legacy Misspelled URLs (3 rules)
  { source: '/รับซื้อโน๊ตบุ๊ค-ศรีสะเก/', target: '/รับซื้อโน๊ตบุ๊ค/', reason: 'Truncated legacy slug' },
  { source: '/รับซื้อคอมพิวเตอร์-ภูเก/', target: '/รับซื้อคอม/', reason: 'Truncated legacy slug' },
  { source: '/รับซื้อกล้องมือสอง-บุรี/', target: '/รับซื้อกล้อง/', reason: 'Truncated legacy slug' },

  // 5. Authoritative 11 EXISTING_REDIRECT Historical Survivor Consolidations (11 rules)
  { source: '/รับซื้อ-macbook-จังหวัดกาฬสินธ/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดนครราชส/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดบุรีรัม/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดสุรินทร/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดนครพนม/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดมุกดาหา/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดร้อยเอ็/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/legacy-รับซื้อกล้อง-ยโสธร-815/', target: '/รับซื้อกล้อง-ยโสธร/', reason: 'WordPress legacy ID slug consolidation' },
  { source: '/legacy-รับซื้อไอโฟน-มหาสารคาม-851/', target: '/รับซื้อไอโฟน-มหาสารคาม/', reason: 'WordPress legacy ID slug consolidation' },
  { source: '/รับซื้อ-macbook/', target: '/รับซื้อแมคบุ๊ค/', reason: 'English slug to Thai canonical' },
  { source: '/รับซื้อแมคบุ๊ค-macbook-ยโสธร/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Legacy duplicate keyword slug' },

  // 6. Authoritative 10 NEW_REDIRECT Historical Survivor Consolidations (10 rules)
  { source: '/รับซื้อกล้องถ่ายรูป/', target: '/รับซื้อกล้อง/', reason: 'Authoritative survivor redirect' },
  { source: '/รับซื้อกล้อง-รับซื้อกล้/', target: '/รับซื้อกล้อง/', reason: 'Authoritative survivor redirect' },
  { source: '/รับซื้อกล้อง-ให้ราคาสูง/', target: '/รับซื้อกล้อง/', reason: 'Authoritative survivor redirect' },
  { source: '/รับซื้อแม็คบุ๊ค-macbook/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Authoritative survivor redirect' },
  { source: '/รับซื้อแมคบุ๊ค-macbook/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Authoritative survivor redirect' },
  { source: '/รับซื้อ-macbook-แม็คบุ๊ค/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Authoritative survivor redirect' },
  { source: '/รับซื้อ-macbook-แม็คบุ๊ค-ใกล้ฉั/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Authoritative survivor redirect' },
  { source: '/รับซื้อ-notebook-ใกล้ฉัน/', target: '/รับซื้อโน๊ตบุ๊ค/', reason: 'Authoritative survivor redirect' },
  { source: '/รับซื้อไอโฟนใกล้ฉัน/', target: '/รับซื้อไอโฟน/', reason: 'Authoritative survivor redirect' },
  { source: '/buy-camera-surin/', target: '/รับซื้อกล้องมือสองสุร/', reason: 'Authoritative survivor redirect' }
];

// Normalized Map for O(1) Lookup
export const REDIRECT_MAP = new Map<string, RedirectRule>();

for (const rule of RAW_REDIRECT_RULES) {
  const normSource = normalizePath(rule.source);
  const normTarget = normalizePath(rule.target);
  REDIRECT_MAP.set(normSource, {
    source: normSource,
    target: normTarget,
    status: 301,
    reason: rule.reason
  });
}

export function getRedirect(path: string): RedirectRule | undefined {
  return REDIRECT_MAP.get(normalizePath(path));
}
