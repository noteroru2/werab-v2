import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Read exact 208 raw legacy GONE paths
const rawGone = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/raw/gone-paths.json'), 'utf8'));

console.log(`Writing exactly ${rawGone.length} paths to src/config/seo/gone.ts`);

const goneTsContent = `/**
 * src/config/seo/gone.ts
 * Authoritative set of exactly 208 GONE (HTTP 410) paths.
 * Matched 1:1 with legacy webuy-thai src/config/gone-paths.ts.
 */

import { normalizePath } from '../../lib/seo/normalize';

export const GONE_PATHS_RAW: string[] = ${JSON.stringify(rawGone, null, 2)};

export const GONE_PATHS = new Set<string>(
  GONE_PATHS_RAW.map(p => normalizePath(p))
);

export function isGonePath(path: string): boolean {
  return GONE_PATHS.has(normalizePath(path));
}
`;

fs.writeFileSync(path.join(rootDir, 'src/config/seo/gone.ts'), goneTsContent, 'utf8');
console.log('Saved src/config/seo/gone.ts with exact 208 paths.');
