import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string().optional(),
    slug: z.string(),
    pubDate: z.string().optional(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    pageType: z.enum([
      'hub',
      'category',
      'service',
      'guide',
      'location',
      'model',
      'condition',
      'policy',
      'trust',
      'static'
    ]).default('service'),
    contentCluster: z.enum([
      'general',
      'audio',
      'camera',
      'iphone',
      'ipad',
      'macbook',
      'notebook',
      'pc',
      'gaming',
      'b2b',
      'android',
      'condition',
      'valuation'
    ]).default('general'),
    primaryIntent: z.enum([
      'buyback',
      'price_check',
      'guide',
      'local',
      'trust',
      'contact',
      'policy'
    ]).default('buyback'),
    secondaryIntents: z.array(z.string()).optional(),
    state: z.enum([
      'INDEX',
      'HOLD_NOINDEX',
      'REDIRECT',
      'GONE',
      'DRAFT',
      'REVIEW_REQUIRED'
    ]).default('INDEX'),
    migrationStatus: z.enum([
      'preserved',
      'rebuilt',
      'redirected',
      'gone',
      'hold',
      'pending'
    ]).default('rebuilt'),
    contentStatus: z.enum([
      'READY',
      'CONTENT_REQUIRED',
      'DRAFT',
      'NOT_APPLICABLE',
      'PENDING_REVIEW'
    ]).default('READY'),
    parent: z.string().optional(),
    relatedPages: z.array(z.string()).optional(),
    gscPriority: z.enum(['critical', 'high', 'medium', 'low']).optional(),
    author: z.string().optional(),
    reviewer: z.string().optional(),
    lastReviewed: z.string().optional(),
    faqItems: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional()
  })
});

export const collections = {
  pages: pagesCollection
};
