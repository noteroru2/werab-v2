/**
 * src/config/seo/types.ts
 * Authoritative type definitions for URL Lifecycle, SEO Manifest, and Resolver.
 */

export type UrlLifecycleState =
  | 'INDEX'
  | 'HOLD_NOINDEX'
  | 'REDIRECT'
  | 'GONE'
  | 'DRAFT'
  | 'REVIEW_REQUIRED';

export type PageType =
  | 'hub'
  | 'category'
  | 'service'
  | 'guide'
  | 'location'
  | 'model'
  | 'condition'
  | 'policy'
  | 'trust'
  | 'static';

export type ContentCluster =
  | 'general'
  | 'audio'
  | 'camera'
  | 'iphone'
  | 'ipad'
  | 'macbook'
  | 'notebook'
  | 'pc'
  | 'gaming'
  | 'b2b'
  | 'android'
  | 'condition'
  | 'valuation';

export type PrimaryIntent =
  | 'buyback'
  | 'price_check'
  | 'guide'
  | 'local'
  | 'trust'
  | 'contact'
  | 'policy';

export type MigrationStatus =
  | 'preserved'
  | 'rebuilt'
  | 'redirected'
  | 'gone'
  | 'hold'
  | 'pending';

export type ContentStatus =
  | 'READY'
  | 'CONTENT_REQUIRED'
  | 'DRAFT'
  | 'NOT_APPLICABLE'
  | 'PENDING_REVIEW';

export interface SeoManifestRecord {
  path: string;
  state: UrlLifecycleState;
  pageType?: PageType;
  contentCluster?: ContentCluster;
  primaryIntent?: PrimaryIntent;
  secondaryIntents?: string[];
  title?: string;
  description?: string;
  h1?: string;
  canonical?: string;
  redirectTo?: string;
  parent?: string;
  relatedPages?: string[];
  gscPriority?: 'critical' | 'high' | 'medium' | 'low';
  migrationStatus?: MigrationStatus;
  contentStatus?: ContentStatus;
  source?: string;
  notes?: string;
  lastmod?: string;
}

export interface ResolvedSeo {
  path: string;
  normalizedPath: string;
  state: UrlLifecycleState;
  httpStatus: 200 | 301 | 404 | 410;
  indexable: boolean;
  follow: boolean;
  robots: string;
  canonical: string;
  canonicalIsSelf: boolean;
  redirectTo?: string;
  sitemapEligible: boolean;
  pageType?: PageType;
  contentCluster?: ContentCluster;
  primaryIntent?: PrimaryIntent;
  migrationStatus?: MigrationStatus;
  contentStatus?: ContentStatus;
  title?: string;
  description?: string;
  h1?: string;
  parent?: string;
  relatedPages?: string[];
  gscPriority?: string;
  reason: string;
}
