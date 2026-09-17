import type { ResolvedSeo } from './types';

export type RecoveryCluster = 'notebook' | 'pc' | 'iphone' | 'camera' | 'ipad' | 'macbook';

export interface RecoveryWinner {
  path: string;
  cluster: RecoveryCluster;
  historicalClicks90d: number;
  historicalImpressions90d: number;
  historicalPosition90d: number;
  priority: 'tier1' | 'tier2';
}

/**
 * Recovery V3 protected network.
 *
 * Source: reports/seo/p0-url-equity-decisions.csv (pre-collapse GSC equity).
 * These are IT-only URLs that historically earned search clicks and were
 * explicitly preserved/rebuilt during P0-P4. Off-topic alcohol/pawn/home-
 * appliance URLs are intentionally excluded even when they had old traffic.
 *
 * Do not remove or demote these URLs without a new GSC-backed migration plan.
 */
export const RECOVERY_V3_WINNERS: readonly RecoveryWinner[] = [
  { path: '/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/', cluster: 'notebook', historicalClicks90d: 75, historicalImpressions90d: 973, historicalPosition90d: 7.59, priority: 'tier1' },
  { path: '/รับซื้อคอม-อุดรธานี/', cluster: 'pc', historicalClicks90d: 45, historicalImpressions90d: 498, historicalPosition90d: 8.21, priority: 'tier1' },
  { path: '/รับซื้อคอม-ขอนแก่น/', cluster: 'pc', historicalClicks90d: 26, historicalImpressions90d: 496, historicalPosition90d: 13.39, priority: 'tier1' },
  { path: '/รับซื้อโทรศัพท์มือถือ-จ/', cluster: 'iphone', historicalClicks90d: 25, historicalImpressions90d: 746, historicalPosition90d: 9.13, priority: 'tier1' },
  { path: '/รับซื้อโน๊ตบุ๊ค-บุรีรัม/', cluster: 'notebook', historicalClicks90d: 20, historicalImpressions90d: 240, historicalPosition90d: 7.67, priority: 'tier1' },
  { path: '/รับซื้อโน๊ตบุ๊ค-เลย/', cluster: 'notebook', historicalClicks90d: 20, historicalImpressions90d: 164, historicalPosition90d: 9.34, priority: 'tier1' },
  { path: '/รับซื้อมือถือ-อุบล/', cluster: 'iphone', historicalClicks90d: 19, historicalImpressions90d: 435, historicalPosition90d: 12.67, priority: 'tier1' },
  { path: '/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/', cluster: 'notebook', historicalClicks90d: 15, historicalImpressions90d: 320, historicalPosition90d: 8.23, priority: 'tier1' },
  { path: '/รับซื้อ-notebook-อำเภอพล-ขอนแก่น/', cluster: 'notebook', historicalClicks90d: 15, historicalImpressions90d: 206, historicalPosition90d: 10.72, priority: 'tier1' },
  { path: '/รับซื้อซากคอมพิวเตอร์/', cluster: 'pc', historicalClicks90d: 15, historicalImpressions90d: 164, historicalPosition90d: 20.39, priority: 'tier1' },
  { path: '/รับซื้อไอโฟน-มหาสารคาม/', cluster: 'iphone', historicalClicks90d: 14, historicalImpressions90d: 346, historicalPosition90d: 9.56, priority: 'tier1' },
  { path: '/รับซื้อโน๊ตบุ๊ค-สกลนคร/', cluster: 'notebook', historicalClicks90d: 12, historicalImpressions90d: 276, historicalPosition90d: 9.07, priority: 'tier1' },
  { path: '/รับซื้อโน๊ตบุ๊ค-นครพนม/', cluster: 'notebook', historicalClicks90d: 12, historicalImpressions90d: 128, historicalPosition90d: 7.66, priority: 'tier1' },
  { path: '/รับซื้อเมืองขอนแก่น/', cluster: 'macbook', historicalClicks90d: 11, historicalImpressions90d: 133, historicalPosition90d: 11.54, priority: 'tier2' },
  { path: '/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/', cluster: 'notebook', historicalClicks90d: 10, historicalImpressions90d: 76, historicalPosition90d: 6.03, priority: 'tier2' },
  { path: '/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/', cluster: 'notebook', historicalClicks90d: 9, historicalImpressions90d: 506, historicalPosition90d: 14.47, priority: 'tier2' },
  { path: '/รับซื้อ-notebook-ชุมแพ-ขอนแก่น/', cluster: 'notebook', historicalClicks90d: 9, historicalImpressions90d: 103, historicalPosition90d: 11.84, priority: 'tier2' },
  { path: '/รับซื้อกล้องมือสอง-บริก/', cluster: 'camera', historicalClicks90d: 8, historicalImpressions90d: 140, historicalPosition90d: 26.64, priority: 'tier2' },
  { path: '/รับซื้อกล้องถ่ายรูปจัง/', cluster: 'camera', historicalClicks90d: 7, historicalImpressions90d: 204, historicalPosition90d: 10.44, priority: 'tier2' },
  { path: '/รับซื้อคอม-ศรีสะเกษ/', cluster: 'pc', historicalClicks90d: 7, historicalImpressions90d: 99, historicalPosition90d: 9.83, priority: 'tier2' },
  { path: '/รับซื้อโน๊ตบุ๊ค-บึงกาฬ/', cluster: 'notebook', historicalClicks90d: 7, historicalImpressions90d: 97, historicalPosition90d: 7.10, priority: 'tier2' },
  { path: '/รับซื้อไอแพด-อุบล/', cluster: 'ipad', historicalClicks90d: 7, historicalImpressions90d: 68, historicalPosition90d: 13.24, priority: 'tier2' },
] as const;

export const RECOVERY_V3_CORE_HUBS: Readonly<Record<RecoveryCluster, string>> = {
  notebook: '/รับซื้อโน๊ตบุ๊ค/',
  pc: '/รับซื้อคอม/',
  iphone: '/รับซื้อไอโฟน/',
  camera: '/รับซื้อกล้อง/',
  ipad: '/รับซื้อไอแพด/',
  macbook: '/รับซื้อแมคบุ๊ค/',
};

export function getRecoveryWinnersForCluster(cluster?: string, limit = 6): RecoveryWinner[] {
  if (!cluster) return [];
  return RECOVERY_V3_WINNERS
    .filter((winner) => winner.cluster === cluster)
    .sort((a, b) => {
      if (a.priority !== b.priority) return a.priority === 'tier1' ? -1 : 1;
      return b.historicalClicks90d - a.historicalClicks90d;
    })
    .slice(0, limit);
}

export function isRecoveryCoreHub(seo: Pick<ResolvedSeo, 'normalizedPath'>): boolean {
  return Object.values(RECOVERY_V3_CORE_HUBS).includes(seo.normalizedPath);
}
