/**
 * src/config/planned-pages.ts
 * Planned Information Architecture concepts.
 * All planned routes are kept in state: 'DRAFT' and contentStatus: 'CONTENT_REQUIRED'.
 * They DO NOT generate public thin pages or enter the sitemap until approved content is ready.
 */

import type { SeoManifestRecord } from './seo/types';

export const PLANNED_PAGES: SeoManifestRecord[] = [
  {
    path: '/รุ่น/',
    state: 'DRAFT',
    pageType: 'model',
    contentCluster: 'general',
    primaryIntent: 'guide',
    contentStatus: 'DRAFT',
    notes: 'Planned directory for device models and specifications.'
  },
  {
    path: '/สภาพ/',
    state: 'DRAFT',
    pageType: 'condition',
    contentCluster: 'general',
    primaryIntent: 'guide',
    contentStatus: 'DRAFT',
    notes: 'Planned grading condition assessment guide.'
  },
  {
    path: '/ก่อนขาย/',
    state: 'DRAFT',
    pageType: 'guide',
    contentCluster: 'general',
    primaryIntent: 'guide',
    contentStatus: 'DRAFT',
    notes: 'Planned pre-sale checklist and data wipe guides.'
  },
  {
    path: '/คู่มือ/',
    state: 'DRAFT',
    pageType: 'guide',
    contentCluster: 'general',
    primaryIntent: 'guide',
    contentStatus: 'DRAFT',
    notes: 'Planned comprehensive user guides collection.'
  },
  {
    path: '/ผลงานรับซื้อ/',
    state: 'DRAFT',
    pageType: 'trust',
    contentCluster: 'general',
    primaryIntent: 'trust',
    contentStatus: 'DRAFT',
    notes: 'Planned proof of work and buyback transaction archive.'
  },
  {
    path: '/รับซื้อแรม/',
    state: 'DRAFT',
    pageType: 'category',
    contentCluster: 'pc',
    primaryIntent: 'buyback',
    contentStatus: 'CONTENT_REQUIRED',
    notes: 'Planned RAM buyback hub.'
  },
  {
    path: '/รับซื้อการ์ดจอ/',
    state: 'DRAFT',
    pageType: 'category',
    contentCluster: 'pc',
    primaryIntent: 'buyback',
    contentStatus: 'CONTENT_REQUIRED',
    notes: 'Planned GPU buyback hub.'
  }
];
