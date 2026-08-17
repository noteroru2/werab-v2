import fs from 'node:fs';
import path from 'node:path';

const legacyPostsDir = 'c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/src/content/posts';
const legacyDocsDir = 'c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/docs';

const targetPaths = [
  '/100-อันดับ-กล้อง-fujifilm-ในตลาดมือ/',
  '/10-อันดับ-กล้อง-fujifilm-ในตลาดมือ/',
  '/1090/',
  '/1199/',
  '/1209/',
  '/1216/',
  '/1230/',
  '/1340/',
  '/1352/',
  '/1362/',
  '/1477/',
  '/1480/',
  '/1482/',
  '/1494/',
  '/1498/',
  '/1500/',
  '/1502/',
  '/1504/',
  '/1508/',
  '/1511/',
  '/1515/',
  '/1517/'
];

console.log(`Searching legacy evidence for ${targetPaths.length} paths...\n`);

// 1. Check all files in src/content/posts/
let postFiles = [];
if (fs.existsSync(legacyPostsDir)) {
  postFiles = fs.readdirSync(legacyPostsDir);
}

console.log(`Found ${postFiles.length} files in webuy-thai/src/content/posts/\n`);

for (const target of targetPaths) {
  const cleanId = target.replace(/\//g, '');
  console.log(`--------------------------------------------------`);
  console.log(`TARGET: ${target} (ID/Slug candidate: ${cleanId})`);

  // Check if file exists as <cleanId>.md
  const mdFile = `${cleanId}.md`;
  if (postFiles.includes(mdFile)) {
    const content = fs.readFileSync(path.join(legacyPostsDir, mdFile), 'utf8');
    const titleMatch = content.match(/title:\s*["']?([^"'\n\r]+)["']?/);
    const slugMatch = content.match(/slug:\s*["']?([^"'\n\r]+)["']?/);
    const canonicalMatch = content.match(/canonical:\s*["']?([^"'\n\r]+)["']?/);
    const noindexMatch = content.match(/noindex:\s*([^\n\r]+)/);

    console.log(`  [FILE FOUND in posts/] ${mdFile}`);
    console.log(`  Title: ${titleMatch ? titleMatch[1] : 'N/A'}`);
    console.log(`  Slug: ${slugMatch ? slugMatch[1] : 'N/A'}`);
    console.log(`  Canonical: ${canonicalMatch ? canonicalMatch[1] : 'N/A'}`);
    console.log(`  Noindex: ${noindexMatch ? noindexMatch[1] : 'N/A'}`);
  } else {
    // Check if slug or title mentions cleanId in any post file
    let foundInPost = false;
    for (const pf of postFiles) {
      if (pf.includes(cleanId)) {
        console.log(`  [PARTIAL MATCH in posts/ filename] ${pf}`);
        foundInPost = true;
      }
    }
    if (!foundInPost) {
      console.log(`  [NO DIRECT FILE in posts/]`);
    }
  }
}
