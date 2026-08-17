import type { APIRoute } from 'astro';
import { BUSINESS_FACTS } from '../config/business';

export const GET: APIRoute = () => {
  const siteUrl = BUSINESS_FACTS.VERIFIED.siteUrl;

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
