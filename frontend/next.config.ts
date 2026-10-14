import type { NextConfig } from 'next';
import { DEVICE_SIZES, IMAGE_SIZES } from './image-widths.mjs';

const nextConfig: NextConfig = {
  output: 'export',
  experimental: {
    // One 404 page for every language (the site has a root layout per language).
    globalNotFound: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Static export has no image server: image-loader.ts maps each request to
    // a WebP variant generated ahead of time by scripts/optimize-images.mjs.
    loader: 'custom',
    loaderFile: './image-loader.ts',
    deviceSizes: DEVICE_SIZES,
    imageSizes: IMAGE_SIZES,
  },
};

export default nextConfig;
