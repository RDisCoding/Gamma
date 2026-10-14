// Shared by next.config.ts (which widths <Image> may request) and
// scripts/optimize-images.mjs (which widths get generated). Keep them in sync
// by only editing these two lists.
export const DEVICE_SIZES = [480, 640, 828, 1080, 1440, 1920];
export const IMAGE_SIZES = [96, 160, 256, 384];
export const IMAGE_WIDTHS = [...IMAGE_SIZES, ...DEVICE_SIZES];
