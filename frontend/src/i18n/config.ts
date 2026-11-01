/**
 * Site languages with their own, editable translations. English lives at the
 * root (/about); the others under a prefix (/gu/about, /te/about, …).
 * Languages not listed here are offered through Google Translate instead
 * (see src/content/languages.ts).
 */
export const siteLocales = ['en', 'gu', 'hi', 'te', 'kn', 'ta'] as const;
export type SiteLocale = (typeof siteLocales)[number];
export const prefixedLocales = ['gu', 'hi', 'te', 'kn', 'ta'] as const satisfies readonly SiteLocale[];

export const hreflang: Record<SiteLocale, string> = { en: 'en-IN', gu: 'gu-IN', hi: 'hi-IN', te: 'te-IN', kn: 'kn-IN', ta: 'ta-IN' };

/**
 * Languages the purohits read. Messages visitors send them (WhatsApp texts,
 * the email subject) are prepared in the page's language when it is one of
 * these, and in English otherwise.
 */
export const purohitLocales: readonly SiteLocale[] = ['en', 'gu', 'hi'];

export function messageLocale(locale: SiteLocale): SiteLocale {
  return purohitLocales.includes(locale) ? locale : 'en';
}

export function isSiteLocale(value: string): value is SiteLocale {
  return (siteLocales as readonly string[]).includes(value);
}

/** "/about" in a given locale → "/about", "/gu/about", "/hi/about". */
export function localePath(locale: SiteLocale, path: string) {
  if (locale === 'en') return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

const prefixPattern = new RegExp(`^/(${prefixedLocales.join('|')})(/.*)?$`);

/** Splits "/gu/about" into { locale: 'gu', path: '/about' }. */
export function splitLocale(pathname: string): { locale: SiteLocale; path: string } {
  const match = pathname.match(prefixPattern);
  if (match) return { locale: match[1] as SiteLocale, path: match[2] || '/' };
  return { locale: 'en', path: pathname || '/' };
}
