import { defineMiddleware } from 'astro:middleware';
import { resolveSeo } from './lib/seo/resolve';
import { normalizePath } from './lib/seo/normalize';

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  // Skip static assets and special system endpoints
  if (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/@') ||
    pathname.startsWith('/_image') ||
    pathname === '/favicon.ico' ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.xml') ||
    pathname.endsWith('.txt')
  ) {
    return next();
  }

  const normalized = normalizePath(pathname);

  // 1. Path Normalization: Redirect to trailing-slash format if not matching
  if (pathname !== normalized) {
    return context.redirect(normalized, 301);
  }

  // 2. SEO Resolver Evaluation
  const seo = resolveSeo(pathname);

  // 3. HTTP 301 Permanent Redirect
  if (seo.httpStatus === 301 && seo.redirectTo) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: encodeURI(seo.redirectTo),
        'Cache-Control': 'public, max-age=86400',
        'X-Robots-Tag': 'noindex, nofollow'
      }
    });
  }

  // 4. HTTP 410 Gone (Authoritative legacy removal response)
  if (seo.httpStatus === 410) {
    const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>410 Gone | เรารับซื้อ.com</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .box { background: #1e293b; padding: 40px; border-radius: 12px; max-width: 500px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
    h1 { font-size: 40px; color: #d97706; margin: 0 0 16px 0; }
    p { color: #94a3b8; line-height: 1.6; margin-bottom: 24px; font-size: 16px; }
    a { display: inline-block; background: #d97706; color: #ffffff; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none; transition: background 0.2s; }
    a:hover { background: #b45309; }
  </style>
</head>
<body>
  <div class="box">
    <h1>410 Gone</h1>
    <p>หน้านี้ถูกยกเลิกการเผยแพร่อย่างถาวรตามการปรับปรุงโครงสร้างของเว็บไซต์ เรารับซื้อ.com</p>
    <a href="/">กลับสู่หน้าแรก</a>
  </div>
</body>
</html>`;

    return new Response(html, {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'public, max-age=604800'
      }
    });
  }

  // Pass resolved SEO context to locals
  (context.locals as Record<string, unknown>).seo = seo;

  const response = await next();

  // Add basic security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
});
