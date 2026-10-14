// Custom next/image loader for the static export. Local JPEG/PNG files are
// served from the WebP variants built by scripts/optimize-images.mjs; anything
// else (SVG, remote URLs) is returned unchanged.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (src.startsWith('/') && /\.(jpe?g|png)$/i.test(src)) {
    return `/_img${src.replace(/\.(jpe?g|png)$/i, '')}-${width}.webp`;
  }
  return src;
}
