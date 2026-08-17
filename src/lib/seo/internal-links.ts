/**
 * src/lib/seo/internal-links.ts
 * Cluster-Aware Internal Linking Engine.
 * Intelligently suggests contextual parent, cluster siblings, and guide links
 * while strictly prohibiting links to GONE, REDIRECT sources, DRAFT, or REVIEW_REQUIRED pages.
 */

import { SEO_MANIFEST_MAP } from '../../config/seo/manifest';
import { resolveSeo } from './resolve';
import type { ResolvedSeo } from '../../config/seo/types';

export interface InternalLinkItem {
  path: string;
  title: string;
  badge?: string;
}

export function getInternalLinks(currentSeo: ResolvedSeo): {
  parentLink?: InternalLinkItem;
  clusterLinks: InternalLinkItem[];
  guideLinks: InternalLinkItem[];
} {
  const currentPath = currentSeo.normalizedPath;
  const currentCluster = currentSeo.contentCluster || 'general';

  let parentLink: InternalLinkItem | undefined = undefined;

  // 1. Resolve Parent Link
  if (currentSeo.parent) {
    const parentSeo = resolveSeo(currentSeo.parent);
    if (parentSeo.indexable && parentSeo.state === 'INDEX') {
      parentLink = {
        path: parentSeo.normalizedPath,
        title: parentSeo.title || parentSeo.h1 || 'หมวดหมู่หลัก'
      };
    }
  } else if (currentPath !== '/' && currentPath !== '/รับซื้อ/') {
    parentLink = {
      path: '/รับซื้อ/',
      title: 'หมวดหมู่สินค้าที่เรารับซื้อทั้งหมด'
    };
  }

  // 2. Resolve Cluster Related Links (Same cluster, state === INDEX)
  const clusterLinks: InternalLinkItem[] = [];
  const guideLinks: InternalLinkItem[] = [];

  for (const [path, record] of SEO_MANIFEST_MAP.entries()) {
    if (path === currentPath) continue;
    if (record.state !== 'INDEX') continue;

    // Check cluster relevance
    if (record.contentCluster === currentCluster && currentCluster !== 'general') {
      clusterLinks.push({
        path: record.path,
        title: record.h1 || record.title || record.path,
        badge: record.pageType === 'location' ? 'พื้นที่ให้บริการ' : undefined
      });
    }

    // Check guide relevance
    if (record.primaryIntent === 'price_check' || record.pageType === 'guide') {
      if (guideLinks.length < 3) {
        guideLinks.push({
          path: record.path,
          title: record.h1 || record.title || record.path
        });
      }
    }
  }

  return {
    parentLink,
    clusterLinks: clusterLinks.slice(0, 6),
    guideLinks
  };
}
