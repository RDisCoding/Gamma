/**
 * Site languages with their own, editable translations. English lives at the
 * root (/about); the others under a prefix (/gu/about, /hi/about).
 * Languages not listed here are offered through Google Translate instead
 * (see src/content/languages.ts).
 */
export const siteLocales = ['en', 'gu', 'hi'] as const;
export type SiteLocale = (typeof siteLocales)[number];
export const prefixedLocales = ['gu', 'hi'] as const satisfies readonly SiteLocale[];

export const hreflang: Record<SiteLocale, string> = { en: 'en-IN', gu: 'gu-IN', hi: 'hi-IN' };

export function isSiteLocale(value: string): value is SiteLocale {
  return (siteLocales as readonly string[]).includes(value);
}

/** "/about" in a given locale → "/about", "/gu/about", "/hi/about". */
export function localePath(locale: SiteLocale, path: string) {
  if (locale === 'en') return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** Splits "/gu/about" into { locale: 'gu', path: '/about' }. */
export function splitLocale(pathname: string): { locale: SiteLocale; path: string } {
  const match = pathname.match(/^\/(gu|hi)(\/.*)?$/);
  if (match) return { locale: match[1] as SiteLocale, path: match[2] || '/' };
  return { locale: 'en', path: pathname || '/' };
}
