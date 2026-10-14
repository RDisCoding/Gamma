/*
 * Rites with their own page (/services/<slug>). Text for each is in the
 * language files (src/i18n, `serviceDetail.items[slug]`).
 */
export const serviceDetails = [
  { slug: 'pind-daan-tarpan', image: '/gallery/06.jpeg' },
  { slug: 'narayan-bali', image: '/gallery/08.jpeg' },
  { slug: 'tripindi-shraddha', image: '/gallery/05.jpeg' },
] as const;

export type ServiceSlug = (typeof serviceDetails)[number]['slug'];
