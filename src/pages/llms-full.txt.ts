import type { APIRoute } from 'astro';
import { BUSINESS_FACTS } from '../config/business';
import { SEO_MANIFEST_MAP } from '../config/seo/manifest';
import { resolveSeo } from '../lib/seo/resolve';

export const GET: APIRoute = () => {
  const siteUrl = BUSINESS_FACTS.VERIFIED.siteUrl;

  const lines = [
    `# เรารับซื้อ.com (WE BUY) — Full LLM Architecture & Manifest Index`,
    ``,
    `Domain: ${siteUrl}`,
    `Display Domain: ${BUSINESS_FACTS.VERIFIED.displayDomain}`,
    `Positioning: ${BUSINESS_FACTS.VERIFIED.positioning}`,
    `Tagline: "${BUSINESS_FACTS.VERIFIED.tagline}"`,
    `Contact Phone: ${BUSINESS_FACTS.VERIFIED.phone}`,
    `Contact LINE: ${BUSINESS_FACTS.VERIFIED.lineId}`,
    ``,
    `## URL Architecture Inventory (Indexable Pages)`
  ];

  for (const path of SEO_MANIFEST_MAP.keys()) {
    const seo = resolveSeo(path);
    if (seo.state === 'INDEX' && seo.httpStatus === 200) {
      lines.push(`- ${siteUrl}${seo.normalizedPath}`);
      if (seo.title) lines.push(`  Title: ${seo.title}`);
      if (seo.description) lines.push(`  Description: ${seo.description}`);
    }
  }

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
