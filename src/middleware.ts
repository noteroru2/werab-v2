import { defineMiddleware } from 'astro:middleware';
import { resolveSeo } from './lib/seo/resolve';
import { normalizePath } from './lib/seo/normalize';
import { RELEASE_VERSION } from './config/release';

/**
 * Serializes any redirect target into a safe, percent-encoded HTTP URL
 * to prevent ByteString conversion errors on Unicode/Thai pathnames.
 */
function safeRedirectUrl(target: string, base: URL): string {
  return new URL(target, base).href;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;
  const rawPathname = url.pathname;

  // Skip static assets and special system endpoints
  const isStaticAsset =
    rawPathname.startsWith('/_astro/') ||
    rawPathname.startsWith('/@') ||
    rawPathname.startsWith('/_image') ||
    rawPathname === '/favicon.ico' ||
    rawPathname.endsWith('.css') ||
    rawPathname.endsWith('.js') ||
    rawPathname.endsWith('.png') ||
    rawPathname.endsWith('.jpg') ||
    rawPathname.endsWith('.jpeg') ||
    rawPathname.endsWith('.svg') ||
    rawPathname.endsWith('.avif') ||
    rawPathname.endsWith('.webp') ||
    rawPathname.endsWith('.woff2') ||
    rawPathname.endsWith('.xml') ||
    rawPathname.endsWith('.txt');

  if (isStaticAsset) {
    const response = await next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Werab-Release', RELEASE_VERSION);
    if (rawPathname.startsWith('/_astro/')) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (/\.(?:avif|webp|png|jpe?g|svg|woff2)$/.test(rawPathname)) {
      response.headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    } else if (/\.(?:xml|txt)$/.test(rawPathname)) {
      response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    }
    return response;
  }

  // 1. Path Normalization: Decode raw incoming pathname to compare with decoded normalized format
  let decodedPath = rawPathname;
  try {
    decodedPath = decodeURI(rawPathname);
  } catch {
    // If decode fails, fallback to rawPathname
  }

  const normalized = normalizePath(decodedPath);

  // If path is not normalized (e.g. missing trailing slash, redundant slashes), redirect safely
  if (decodedPath !== normalized) {
    return context.redirect(safeRedirectUrl(normalized, url), 301);
  }

  // 2. SEO Resolver Evaluation
  const seo = resolveSeo(normalized);

  // 3. HTTP 301 Permanent Redirect
  if (seo.httpStatus === 301 && seo.redirectTo) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: safeRedirectUrl(seo.redirectTo, url),
        'Cache-Control': 'public, max-age=86400',
        'X-Robots-Tag': 'noindex, nofollow',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-Werab-Release': RELEASE_VERSION
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
        'Cache-Control': 'public, max-age=604800',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-Frame-Options': 'DENY',
        'X-Werab-Release': RELEASE_VERSION
      }
    });
  }

  // Pass resolved SEO context to locals
  (context.locals as Record<string, unknown>).seo = seo;

  const response = await next();

  // Add basic security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Werab-Release', RELEASE_VERSION);
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  if (import.meta.env.PROD) {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'self'; upgrade-insecure-requests"
    );
  }

  return response;
});
