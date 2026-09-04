/**
 * src/lib/seo/schema.ts
 * Central Schema Generation Engine for JSON-LD Structured Data.
 * Produces valid, deterministic, Google-compliant schema graph.
 */

import { BUSINESS_FACTS } from '../../config/business';
import type { ResolvedSeo } from '../../config/seo/types';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SchemaOptions {
  seo: ResolvedSeo;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  article?: {
    headline: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
  };
}

export function generateSchemaGraph(options: SchemaOptions): string {
  const { seo, breadcrumbs, faqs, article } = options;
  const siteUrl = BUSINESS_FACTS.VERIFIED.siteUrl;
  const pageUrl = `${siteUrl}${seo.normalizedPath}`;

  const graph: Record<string, unknown>[] = [];

  // 1. Organization Entity (Global Master ID)
  const organizationEntity = {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: BUSINESS_FACTS.VERIFIED.brandName,
    alternateName: BUSINESS_FACTS.VERIFIED.englishBrandName,
    url: siteUrl,
    description: BUSINESS_FACTS.VERIFIED.tagline,
    knowsAbout: BUSINESS_FACTS.VERIFIED.acceptedCategories,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_FACTS.VERIFIED.phone,
      contactType: 'customer service',
      areaServed: 'TH',
      availableLanguage: ['Thai', 'English']
    }
  };
  graph.push(organizationEntity);

  // 2. WebSite Entity (Global Master ID)
  const websiteEntity = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: BUSINESS_FACTS.VERIFIED.brandName,
    publisher: {
      '@id': `${siteUrl}/#organization`
    },
    inLanguage: 'th'
  };
  graph.push(websiteEntity);

  // 3. WebPage Entity (connects each URL to the site and its primary topic)
  graph.push({
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo.title || seo.h1 || BUSINESS_FACTS.VERIFIED.brandName,
    description: seo.description || BUSINESS_FACTS.VERIFIED.tagline,
    inLanguage: 'th',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` }
  });

  // 4. BreadcrumbList Entity
  if (breadcrumbs && breadcrumbs.length > 0) {
    const itemListElement = breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
    }));

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement
    });
  }

  // 5. Service Entity (For Money & Category Pages)
  if (seo.pageType === 'category' || seo.pageType === 'service' || seo.pageType === 'hub' || seo.pageType === 'location') {
    graph.push({
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: seo.title || seo.h1 || BUSINESS_FACTS.VERIFIED.brandName,
      description: seo.description || BUSINESS_FACTS.VERIFIED.tagline,
      provider: {
        '@id': `${siteUrl}/#organization`
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Thailand'
      },
      serviceType: 'Buyback and IT valuation service'
    });
  }

  // 6. FAQPage Entity (Rendered ONLY when visible FAQ items exist)
  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  // 7. Article Entity (For Guides, Reviews, Location articles)
  if (article) {
    graph.push({
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: article.headline,
      description: article.description,
      image: article.image
        ? (article.image.startsWith('http') ? article.image : `${siteUrl}${article.image}`)
        : undefined,
      ...(article.datePublished ? { datePublished: article.datePublished } : {}),
      ...(article.dateModified || article.datePublished
        ? { dateModified: article.dateModified || article.datePublished }
        : {}),
      author: article.authorName?.includes('ทีมงาน')
        ? { '@id': `${siteUrl}/#organization` }
        : {
            '@type': 'Person',
            name: article.authorName || BUSINESS_FACTS.VERIFIED.contactPerson
          },
      publisher: {
        '@id': `${siteUrl}/#organization`
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`
      }
    });
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': graph
  };

  return JSON.stringify(schemaJson, null, 2);
}
