import type { Metadata } from 'next';
import { site } from '../content/site';
import { hreflang, localePath, siteLocales, type SiteLocale } from '../i18n/config';
import { getDictionary } from '../i18n';

interface PageMetaInput {
  locale: SiteLocale;
  /** Full <title> text, used as written. */
  title: string;
  description: string;
  /** Path without language prefix, e.g. "/services". */
  path: string;
  image?: { url: string; alt: string };
  type?: 'website' | 'article';
  noindex?: boolean;
}

/** Links each page to its equivalents in every site language (hreflang). */
export function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of siteLocales) languages[hreflang[l]] = localePath(l, path);
  languages['x-default'] = path;
  return languages;
}

/**
 * Builds complete metadata for a page. Next.js replaces (rather than merges)
 * openGraph objects from the layout, so every page gets a full set here.
 */
export function pageMetadata({ locale, title, description, path, image, type = 'website', noindex }: PageMetaInput): Metadata {
  const t = getDictionary(locale);
  const url = localePath(locale, path);
  const ogImage = image ?? { url: site.ogImage, alt: t.gallery.images['06'].alt };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: t.locale.ogLocale,
      alternateLocale: siteLocales.filter((l) => l !== locale).map((l) => getDictionary(l).locale.ogLocale),
      images: [{ url: ogImage.url, width: 1200, height: 630, alt: ogImage.alt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const absoluteUrl = (path: string) => (path === '/' ? `${site.url}/` : `${site.url}${path}`);
