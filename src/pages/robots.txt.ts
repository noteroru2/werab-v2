import type { APIRoute } from 'astro';
import { BUSINESS_FACTS } from '../config/business';

export const GET: APIRoute = (context) => {
  const siteUrl = BUSINESS_FACTS.VERIFIED.siteUrl;
  const runtime = (context.locals as Record<string, unknown>).runtime as { env?: { SEO_PREVIEW?: string } } | undefined;
  const seoPreviewMode = import.meta.env.SEO_PREVIEW === '1' || runtime?.env?.SEO_PREVIEW === '1';
  // Preview must be access-controlled and never advertise the production sitemap.
  if (seoPreviewMode) {
    return new Response('# SEO preview: non-indexable via meta/X-Robots-Tag; access control required\nUser-agent: *\nAllow: /\n', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow, noarchive' }
    });
  }

  const robots = `# robots.txt for เรารับซื้อ.com V2
User-agent: *
Allow: /

# Sitemap Index
Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
