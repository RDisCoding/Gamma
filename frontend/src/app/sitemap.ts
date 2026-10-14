import type { MetadataRoute } from 'next';
import { serviceDetails } from '../content/service-details';
import { site } from '../content/site';
import { siteLocales } from '../i18n/config';
import { languageAlternates } from '../lib/seo';

export const dynamic = 'force-static';

const pages: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/matrugaya-pooja-guide', priority: 0.9 },
  { path: '/learn-more', priority: 0.8 },
  { path: '/plan-your-visit', priority: 0.8 },
  { path: '/cost-and-booking', priority: 0.8 },
  { path: '/services', priority: 0.7 },
  { path: '/about', priority: 0.7 },
  { path: '/contact', priority: 0.7 },
  { path: '/gallery', priority: 0.5 },
  ...serviceDetails.map((s) => ({ path: `/services/${s.slug}`, priority: 0.6 })),
];

const abs = (path: string) => (path === '/' ? `${site.url}/` : `${site.url}${path}`);

/** Every page in every site language, each listing its translations (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  return siteLocales.flatMap((locale) =>
    pages.map(({ path, priority }) => {
      const languages = Object.fromEntries(Object.entries(languageAlternates(path)).map(([k, v]) => [k, abs(v)]));
      const own = languages[locale === 'en' ? 'en-IN' : `${locale}-IN`];
      return {
        url: own,
        lastModified: site.lastUpdated,
        priority: locale === 'en' ? priority : Math.round(priority * 90) / 100,
        alternates: { languages },
      };
    }),
  );
}
