/**
 * src/lib/seo/resolve.ts
 * Primary SEO Resolver decision engine.
 * Single source of truth for routing, metadata, indexability, canonical,
 * sitemap eligibility, and HTTP status codes.
 */

import { normalizePath } from './normalize';
import { isGonePath } from '../../config/seo/gone';
import { getRedirect } from '../../config/seo/redirects';
import { getManifestRecord } from '../../config/seo/manifest';
import type { ResolvedSeo, UrlLifecycleState } from '../../config/seo/types';

export function resolveSeo(inputPath: string): ResolvedSeo {
  const norm = normalizePath(inputPath);

  // 1. Check GONE Registry (HTTP 410)
  if (isGonePath(norm)) {
    return {
      path: inputPath,
      normalizedPath: norm,
      state: 'GONE',
      httpStatus: 410,
      indexable: false,
      follow: false,
      robots: 'noindex,nofollow',
      canonical: norm,
      canonicalIsSelf: false,
      sitemapEligible: false,
      migrationStatus: 'gone',
      contentStatus: 'NOT_APPLICABLE',
      reason: 'Matched authoritative GONE paths registry'
    };
  }

  // 2. Check 301 Permanent Redirect Registry
  const redirectRule = getRedirect(norm);
  if (redirectRule) {
    return {
      path: inputPath,
      normalizedPath: norm,
      state: 'REDIRECT',
      httpStatus: 301,
      indexable: false,
      follow: false,
      robots: 'noindex,nofollow',
      canonical: redirectRule.target,
      canonicalIsSelf: false,
      redirectTo: redirectRule.target,
      sitemapEligible: false,
      migrationStatus: 'redirected',
      contentStatus: 'NOT_APPLICABLE',
      reason: redirectRule.reason || 'Matched 301 permanent redirect rule'
    };
  }

  // 3. Check SEO Manifest Registry
  const manifestRecord = getManifestRecord(norm);
  if (manifestRecord) {
    const state: UrlLifecycleState = manifestRecord.state;

    if (state === 'INDEX') {
      const canonical = manifestRecord.canonical === 'self' || !manifestRecord.canonical
        ? norm
        : manifestRecord.canonical;

      return {
        path: inputPath,
        normalizedPath: norm,
        state: 'INDEX',
        httpStatus: 200,
        indexable: true,
        follow: true,
        robots: 'index,follow',
        canonical,
        canonicalIsSelf: canonical === norm,
        sitemapEligible: true,
        pageType: manifestRecord.pageType,
        contentCluster: manifestRecord.contentCluster,
        primaryIntent: manifestRecord.primaryIntent,
        migrationStatus: manifestRecord.migrationStatus || 'preserved',
        contentStatus: manifestRecord.contentStatus || 'READY',
        title: manifestRecord.title,
        description: manifestRecord.description,
        h1: manifestRecord.h1,
        parent: manifestRecord.parent,
        relatedPages: manifestRecord.relatedPages,
        gscPriority: manifestRecord.gscPriority,
        reason: 'Explicitly configured INDEX route in manifest'
      };
    }

    if (state === 'HOLD_NOINDEX') {
      const canonical = manifestRecord.canonical === 'self' || !manifestRecord.canonical
        ? norm
        : manifestRecord.canonical;

      return {
        path: inputPath,
        normalizedPath: norm,
        state: 'HOLD_NOINDEX',
        httpStatus: 200,
        indexable: false,
        follow: true,
        robots: 'noindex,follow',
        canonical,
        canonicalIsSelf: canonical === norm,
        sitemapEligible: false,
        pageType: manifestRecord.pageType,
        contentCluster: manifestRecord.contentCluster,
        primaryIntent: manifestRecord.primaryIntent,
        migrationStatus: manifestRecord.migrationStatus || 'hold',
        contentStatus: manifestRecord.contentStatus || 'PENDING_REVIEW',
        title: manifestRecord.title,
        description: manifestRecord.description,
        h1: manifestRecord.h1,
        parent: manifestRecord.parent,
        relatedPages: manifestRecord.relatedPages,
        gscPriority: manifestRecord.gscPriority,
        reason: 'Explicitly configured HOLD_NOINDEX route in manifest'
      };
    }

    if (state === 'DRAFT') {
      return {
        path: inputPath,
        normalizedPath: norm,
        state: 'DRAFT',
        httpStatus: 404,
        indexable: false,
        follow: false,
        robots: 'noindex,nofollow',
        canonical: norm,
        canonicalIsSelf: false,
        sitemapEligible: false,
        pageType: manifestRecord.pageType,
        contentCluster: manifestRecord.contentCluster,
        migrationStatus: 'pending',
        contentStatus: 'DRAFT',
        reason: 'Planned DRAFT page - not yet publicly released'
      };
    }

    if (state === 'REVIEW_REQUIRED') {
      return {
        path: inputPath,
        normalizedPath: norm,
        state: 'REVIEW_REQUIRED',
        httpStatus: 404,
        indexable: false,
        follow: false,
        robots: 'noindex,nofollow',
        canonical: norm,
        canonicalIsSelf: false,
        sitemapEligible: false,
        migrationStatus: 'pending',
        contentStatus: 'PENDING_REVIEW',
        reason: 'REVIEW_REQUIRED - migration decision pending review'
      };
    }
  }

  // 4. Unknown Route (Real HTTP 404)
  return {
    path: inputPath,
    normalizedPath: norm,
    state: 'DRAFT',
    httpStatus: 404,
    indexable: false,
    follow: false,
    robots: 'noindex,nofollow',
    canonical: norm,
    canonicalIsSelf: false,
    sitemapEligible: false,
    contentStatus: 'NOT_APPLICABLE',
    reason: 'Unknown route - not in manifest, GONE, or redirects'
  };
}
