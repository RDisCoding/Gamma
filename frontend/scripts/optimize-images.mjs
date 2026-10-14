// Generates responsive WebP variants for every raster image in public/gallery and
// public/img. The site is a static export (no Next.js image server), so
// image-loader.ts points <Image> at these pre-built files instead.
//
// Output: public/_img/<dir>/<name>-<width>.webp  (git-ignored, rebuilt on demand)
import { readdir, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { IMAGE_WIDTHS } from '../image-widths.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, 'public');
const outDir = path.join(publicDir, '_img');
const SOURCE_DIRS = ['gallery', 'img'];
const QUALITY = 72;

async function isFresh(source, target) {
  try {
    const [s, t] = await Promise.all([stat(source), stat(target)]);
    return t.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

let written = 0;
let skipped = 0;

for (const dir of SOURCE_DIRS) {
  const files = (await readdir(path.join(publicDir, dir))).filter((f) => /\.(jpe?g|png)$/i.test(f));
  await mkdir(path.join(outDir, dir), { recursive: true });

  for (const file of files) {
    const source = path.join(publicDir, dir, file);
    const base = file.replace(/\.(jpe?g|png)$/i, '');

    for (const width of IMAGE_WIDTHS) {
      const target = path.join(outDir, dir, `${base}-${width}.webp`);
      if (await isFresh(source, target)) {
        skipped++;
        continue;
      }
      await sharp(source)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(target);
      written++;
    }
  }
}

console.log(`optimize-images: ${written} written, ${skipped} up to date`);
