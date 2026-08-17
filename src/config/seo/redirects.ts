/**
 * src/config/seo/redirects.ts
 * Authoritative 301 Permanent Redirect Registry for เรารับซื้อ.com V2.
 * All redirects are direct (non-chained), loop-free, and conflict-free.
 */

import { normalizePath } from '../../lib/seo/normalize';

export interface RedirectRule {
  source: string;
  target: string;
  status: 301;
  reason?: string;
}

export const RAW_REDIRECT_RULES: Array<{ source: string; target: string; reason?: string }> = [
  // 1. English Transliterations -> Thai Canonical
  { source: '/rab-sue/', target: '/รับซื้อ/', reason: 'English transliteration alias' },
  { source: '/rab-sue-com/', target: '/รับซื้อคอม/', reason: 'English transliteration alias' },
  { source: '/rab-sue-ipad/', target: '/รับซื้อไอแพด/', reason: 'English transliteration alias' },
  { source: '/rab-sue-iphone/', target: '/รับซื้อไอโฟน/', reason: 'English transliteration alias' },
  { source: '/rab-sue-klong/', target: '/รับซื้อกล้อง/', reason: 'English transliteration alias' },
  { source: '/rab-sue-lamphong/', target: '/รับซื้อลำโพง/', reason: 'English transliteration alias' },
  { source: '/rab-sue-macbook/', target: '/รับซื้อแมคบุ๊ค/', reason: 'English transliteration alias' },
  { source: '/rab-sue-notebook/', target: '/รับซื้อโน๊ตบุ๊ค/', reason: 'English transliteration alias' },

  // 2. 'ใกล้ฉัน' (Near Me) Variants -> Canonical Category Hubs
  { source: '/รับซื้อ-ใกล้ฉัน/', target: '/รับซื้อ/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อคอม-ใกล้ฉัน/', target: '/รับซื้อคอม/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อคอมประกอบ-ใกล้ฉัน/', target: '/รับซื้อคอมประกอบ/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อโน๊ตบุ๊ค-ใกล้ฉัน/', target: '/รับซื้อโน๊ตบุ๊ค/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อ-notebook-ใกล้ฉัน/', target: '/รับซื้อโน๊ตบุ๊ค/', reason: 'English/Thai mixed near-me' },
  { source: '/รับซื้อแมคบุ๊ค-ใกล้ฉัน/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อไอแพด-ใกล้ฉัน/', target: '/รับซื้อไอแพด/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อไอโฟน-ใกล้ฉัน/', target: '/รับซื้อไอโฟน/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อ-apple-watch-ใกล้ฉัน/', target: '/รับซื้อ-apple-watch/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อกล้อง-ใกล้ฉัน/', target: '/รับซื้อกล้อง/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อลำโพง-ใกล้ฉัน/', target: '/รับซื้อลำโพง/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อสมาร์ทโฟน-android-ใกล้ฉัน/', target: '/รับซื้อสมาร์ทโฟน-android/', reason: 'Near-me alias consolidation' },
  { source: '/รับซื้อเครื่องเกม-ใกล้ฉัน/', target: '/รับซื้อเครื่องเกม/', reason: 'Near-me alias consolidation' },

  // 3. Contact & Essential Aliases
  { source: '/ติดต่อเรา/', target: '/contact/', reason: 'Thai contact alias' },
  { source: '/รับซื้อ-macbook/', target: '/รับซื้อแมคบุ๊ค/', reason: 'English slug to Thai canonical' },

  // 4. Truncated & Legacy Misspelled URLs
  { source: '/รับซื้อโน๊ตบุ๊ค-ศรีสะเก/', target: '/รับซื้อโน๊ตบุ๊ค/', reason: 'Truncated legacy slug' },
  { source: '/รับซื้อคอมพิวเตอร์-ภูเก/', target: '/รับซื้อคอม/', reason: 'Truncated legacy slug' },
  { source: '/รับซื้อกล้องมือสอง-บุรี/', target: '/รับซื้อกล้อง/', reason: 'Truncated legacy slug' },

  // 5. Batch 1.5 Safety Review Survivor Redirects (Province Macbook & Legacy Imports)
  { source: '/รับซื้อ-macbook-จังหวัดกาฬสินธ/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดนครราชส/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดบุรีรัม/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดสุรินทร/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดนครพนม/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดมุกดาหา/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/รับซื้อ-macbook-จังหวัดร้อยเอ็/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated legacy province slug' },
  { source: '/legacy-รับซื้อกล้อง-ยโสธร-815/', target: '/รับซื้อกล้อง-ยโสธร/', reason: 'WordPress legacy ID slug consolidation' },
  { source: '/legacy-รับซื้อไอโฟน-มหาสารคาม-851/', target: '/รับซื้อไอโฟน-มหาสารคาม/', reason: 'WordPress legacy ID slug consolidation' },

  // 6. Additional Approved Recovery Redirects
  { source: '/buy-camera-surin/', target: '/รับซื้อกล้อง/', reason: 'Legacy English camera slug' },
  { source: '/buy-camera-mahasarakam/', target: '/รับซื้อกล้อง/', reason: 'Legacy English camera slug' },
  { source: '/buy-camera-nongkai/', target: '/รับซื้อกล้อง/', reason: 'Legacy English camera slug' },
  { source: '/รับซื้อ-macbook-แม็คบุ๊ค/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Legacy duplicate keyword slug' },
  { source: '/รับซื้อแมคบุ๊ค-macbook/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Legacy duplicate keyword slug' },
  { source: '/รับซื้อ-macbook-แม็คบุ๊ค-ใกล้ฉั/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Truncated near-me slug' },
  { source: '/รับซื้อไอโฟน-15-iphone-15/', target: '/รับซื้อไอโฟน/', reason: 'Legacy model variant consolidation' },
  { source: '/รับซื้อไอโฟน-iphone-อุบล/', target: '/รับซื้อไอโฟน/', reason: 'Legacy duplicate keyword slug' },
  { source: '/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/', target: '/รับซื้อไอโฟน/', reason: 'Legacy duplicate keyword slug' },
  { source: '/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/', target: '/รับซื้อลำโพง/', reason: 'Legacy duplicate brand slug' },
  { source: '/รับซื้อแมคบุ๊ค-macbook-ยโสธร/', target: '/รับซื้อแมคบุ๊ค/', reason: 'Legacy duplicate keyword slug' }
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
