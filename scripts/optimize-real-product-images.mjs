import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const outputDir = path.resolve('public/images/real-products');

const sourceGroups = {
  old: 'C:/Users/User/Downloads/drive-download-20260903T052104Z-1-001',
  recent: 'C:/Users/User/Downloads/drive-download-20260904T095709Z-1-001',
};

const images = [
  ['acer-swift-sf314-42-front', `${sourceGroups.old}/Acer Swift SF314-42/IMG_20260902_162312.jpg`],
  ['acer-swift-sf314-42-back', `${sourceGroups.old}/Acer Swift SF314-42/IMG_20260902_162505.jpg`],
  ['insta360-x5-open-box', `${sourceGroups.old}/Insta360 x5 8k/IMG_20260902_185315.jpg`],
  ['insta360-x5-box', `${sourceGroups.old}/Insta360 x5 8k/IMG_20260902_185423.jpg`],
  ['lenovo-82v7-front', `${sourceGroups.old}/lenovo 82v7/IMG_20260902_154611.jpg`],
  ['lenovo-82v7-angle', `${sourceGroups.old}/lenovo 82v7/IMG_20260902_154727.jpg`],
  ['macbook-air-m1-back', `${sourceGroups.old}/macbook air m1 8-256/IMG_20260902_112205.jpg`],
  ['macbook-air-m1-front', `${sourceGroups.old}/macbook air m1 8-256/IMG_20260831_104127.jpg`],
  ['macbook-air-m3-system', `${sourceGroups.old}/macbook air m3 8-256/IMG_20260902_113331.jpg`, [
    { left: 2520, top: 1135, width: 430, height: 135 },
  ]],
  ['macbook-air-m3-back', `${sourceGroups.old}/macbook air m3 8-256/IMG_20260902_113427.jpg`],
  ['msi-thin-a15-angle', `${sourceGroups.old}/Mis thin A15 4060 ram16/IMG_20260831_110220.jpg`],
  ['msi-thin-a15-front', `${sourceGroups.old}/Mis thin A15 4060 ram16/IMG_20260831_110923.jpg`],
  ['desktop-black-case', `${sourceGroups.recent}/เครื่องดำ/IMG_20260903_185146.jpg`],
  ['desktop-black-components', `${sourceGroups.recent}/เครื่องดำ/IMG_20260903_185218.jpg`],
  ['desktop-black-geforce-rtx', `${sourceGroups.recent}/เครื่องดำ/IMG_20260903_185306.jpg`],
  ['desktop-black-front', `${sourceGroups.recent}/เครื่องดำ/IMG_20260903_185449.jpg`],
  ['desktop-white-case', `${sourceGroups.recent}/เครื่องขาว/IMG_20260903_185911.jpg`],
  ['desktop-white-angle', `${sourceGroups.recent}/เครื่องขาว/IMG_20260903_190051.jpg`],
  ['desktop-white-geforce-rtx', `${sourceGroups.recent}/เครื่องขาว/IMG_20260903_190257.jpg`],
  ['ipad-pro-m1-with-box', `${sourceGroups.recent}/iPad pro m1/IMG_20260903_095017.jpg`],
  ['ipad-pro-m1-screen', `${sourceGroups.recent}/iPad pro m1/IMG_20260903_100430.jpg`],
  ['ipad-gen-10-front', `${sourceGroups.recent}/iPad Gen 10/IMG_20260903_101255.jpg`],
  ['ipad-gen-10-system', `${sourceGroups.recent}/iPad Gen 10/IMG_20260903_101320.jpg`, [
    { left: 2600, top: 1080, width: 1120, height: 190 },
    { left: 2450, top: 1900, width: 1320, height: 390 },
  ]],
];

async function redact(inputPath, regions = []) {
  const base = sharp(inputPath).rotate();
  if (regions.length === 0) return base;

  const overlays = await Promise.all(regions.map(async (region) => ({
    input: await sharp(inputPath)
      .rotate()
      .extract(region)
      .blur(28)
      .toBuffer(),
    left: region.left,
    top: region.top,
  })));

  return base.composite(overlays);
}

await mkdir(outputDir, { recursive: true });

for (const [slug, inputPath, regions = []] of images) {
  const sanitizedPipeline = await redact(inputPath, regions);
  const sanitized = await sanitizedPipeline.toBuffer();

  for (const width of [600, 1200]) {
    const resized = sharp(sanitized)
      .resize({ width, withoutEnlargement: true, fit: 'inside' });

    await resized.clone().avif({ quality: 50, effort: 6 }).toFile(path.join(outputDir, `${slug}-${width}.avif`));
    await resized.clone().webp({ quality: 72, effort: 6 }).toFile(path.join(outputDir, `${slug}-${width}.webp`));
  }
}

console.log(`Optimized ${images.length} unique product photos into AVIF and WebP.`);
