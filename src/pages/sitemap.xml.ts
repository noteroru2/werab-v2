import type { APIRoute } from 'astro';
import { SEO_MANIFEST_MAP } from '../config/seo/manifest';
import { resolveSeo } from '../lib/seo/resolve';
import { BUSINESS_FACTS } from '../config/business';
import { getCollection } from 'astro:content';
import { normalizePath } from '../lib/seo/normalize';

export const GET: APIRoute = async () => {
  const siteUrl = BUSINESS_FACTS.VERIFIED.siteUrl;
  const sitemapUrls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: string }> = [];

  // Read collection entries to get accurate dates
  const pages = await getCollection('pages');
  const collectionDateMap = new Map<string, string>();
  for (const p of pages) {
    const norm = normalizePath(`/${p.data.slug}/`);
    const date = p.data.updatedDate || p.data.pubDate;
    if (date) collectionDateMap.set(norm, date);
  }

  // Iterate over all entries in SEO manifest
  for (const [path, record] of SEO_MANIFEST_MAP.entries()) {
    const seo = resolveSeo(path);

    // Strict sitemap eligibility
    if (
      seo.state === 'INDEX' &&
      seo.indexable &&
      seo.canonicalIsSelf &&
      seo.sitemapEligible &&
      seo.httpStatus === 200
    ) {
      const fullUrl = `${siteUrl}${seo.normalizedPath}`;
      const lastmod = collectionDateMap.get(seo.normalizedPath) || record.lastmod;

      let priority = '0.7';
      if (seo.normalizedPath === '/') priority = '1.0';
      else if (seo.pageType === 'hub') priority = '0.9';
      else if (seo.pageType === 'category') priority = '0.8';
      else if (seo.pageType === 'location') priority = '0.7';

      sitemapUrls.push({
        loc: fullUrl,
        lastmod,
        priority
      });
    }
  }

  // Sort deterministically
  sitemapUrls.sort((a, b) => a.loc.localeCompare(b.loc));

  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const entry of sitemapUrls) {
    xmlLines.push('  <url>');
    xmlLines.push(`    <loc>${entry.loc}</loc>`);
    if (entry.lastmod) {
      xmlLines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    }
    xmlLines.push(`    <priority>${entry.priority}</priority>`);
    xmlLines.push('  </url>');
  }

  xmlLines.push('</urlset>');

  return new Response(xmlLines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Robots-Tag': 'noindex'
    }
  });
};
