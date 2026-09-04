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

  // 2. Resolve explicitly curated related pages first, then fill from same cluster.
  const clusterLinks: InternalLinkItem[] = [];
  const guideLinks: InternalLinkItem[] = [];
  const seen = new Set<string>();

  for (const relatedPath of currentSeo.relatedPages || []) {
    const related = resolveSeo(relatedPath);
    if (!related.indexable || related.state !== 'INDEX' || related.normalizedPath === currentPath) continue;
    if (related.primaryIntent === 'price_check' || related.primaryIntent === 'guide' || related.pageType === 'guide' || related.pageType === 'condition') {
      if (!guideLinks.some(item => item.path === related.normalizedPath)) {
        guideLinks.push({ path: related.normalizedPath, title: related.h1 || related.title || related.normalizedPath });
      }
      continue;
    }
    if (!seen.has(related.normalizedPath)) {
      seen.add(related.normalizedPath);
      clusterLinks.push({
        path: related.normalizedPath,
        title: related.h1 || related.title || related.normalizedPath,
        badge: related.pageType === 'location' ? 'พื้นที่ให้บริการ' : undefined
      });
    }
  }

  for (const [path, record] of SEO_MANIFEST_MAP.entries()) {
    if (path === currentPath || seen.has(path)) continue;
    if (record.state !== 'INDEX') continue;

    if (record.contentCluster === currentCluster && currentCluster !== 'general') {
      seen.add(path);
      clusterLinks.push({
        path: record.path,
        title: record.h1 || record.title || record.path,
        badge: record.pageType === 'location' ? 'พื้นที่ให้บริการ' : undefined
      });
    }

    if ((record.primaryIntent === 'price_check' || record.primaryIntent === 'guide' || record.pageType === 'guide' || record.pageType === 'condition') && !guideLinks.some(item => item.path === record.path)) {
      guideLinks.push({
        path: record.path,
        title: record.h1 || record.title || record.path
      });
    }
  }

  return {
    parentLink,
    clusterLinks: clusterLinks.slice(0, 6),
    guideLinks: guideLinks.slice(0, 3)
  };
}
