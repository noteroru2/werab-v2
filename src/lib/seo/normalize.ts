/**
 * src/lib/seo/normalize.ts
 * Central URL normalization engine.
 * Ensures consistent Thai Unicode decoding, leading/trailing slash handling,
 * and strips query parameters/fragments from path identity.
 */

export function normalizePath(inputPath: string): string {
  if (!inputPath || typeof inputPath !== 'string') {
    return '/';
  }

  // 1. Strip protocol and host if full URL is passed
  let pathOnly = inputPath;
  try {
    if (inputPath.startsWith('http://') || inputPath.startsWith('https://')) {
      const url = new URL(inputPath);
      pathOnly = url.pathname;
    }
  } catch {
    // If not a valid URL, treat as raw path
  }

  // 2. Strip query string and fragment
  const queryIndex = pathOnly.indexOf('?');
  if (queryIndex !== -1) {
    pathOnly = pathOnly.slice(0, queryIndex);
  }
  const hashIndex = pathOnly.indexOf('#');
  if (hashIndex !== -1) {
    pathOnly = pathOnly.slice(0, hashIndex);
  }

  // 3. Decode percent-encoded Unicode (Thai characters) safely
  let decoded = pathOnly.trim();
  try {
    decoded = decodeURI(decoded);
  } catch {
    // Fallback: If decodeURI fails on malformed characters, leave as is
  }

  // 4. Normalize slashes
  decoded = decoded.replace(/\\+/g, '/');
  decoded = decoded.replace(/\/+/g, '/');

  // 5. Ensure single leading slash
  if (!decoded.startsWith('/')) {
    decoded = '/' + decoded;
  }

  // 6. Ensure consistent trailing slash (except for files with extensions like .xml, .txt, .json)
  const isFile = /\.[a-zA-Z0-9]+$/.test(decoded);
  if (!isFile && !decoded.endsWith('/')) {
    decoded = decoded + '/';
  }

  return decoded;
}

export function isSamePath(pathA: string, pathB: string): boolean {
  return normalizePath(pathA) === normalizePath(pathB);
}
