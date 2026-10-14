export const site = {
  url: 'https://www.matrugayatirth.com',
  name: 'Matrugaya Tirth',
  /** Shown as "Last updated" on guides and in the sitemap. Update whenever content changes. */
  lastUpdated: '2026-10-14',
  ogImage: '/og-image.jpg',
};

/** Menu order. Labels come from `nav` in the language files (src/i18n). */
export const navigation = [
  { key: 'guide', href: '/matrugaya-pooja-guide' },
  { key: 'learnMore', href: '/learn-more' },
  { key: 'services', href: '/services' },
  { key: 'visit', href: '/plan-your-visit' },
  { key: 'cost', href: '/cost-and-booking' },
  { key: 'about', href: '/about' },
  { key: 'gallery', href: '/gallery' },
  { key: 'contact', href: '/contact' },
] as const;

export type NavKey = (typeof navigation)[number]['key'];
