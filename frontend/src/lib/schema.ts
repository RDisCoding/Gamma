// JSON-LD builders. Only verified, visible information goes in here — no
// ratings, prices or opening hours.
import { company } from '../content/company';
import { site } from '../content/site';
import { getDictionary } from '../i18n';
import { hreflang, localePath, type SiteLocale } from '../i18n/config';
import { absoluteUrl } from './seo';

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

const personId = (index: number) => `${site.url}/about#purohit-${index + 1}`;
const pageUrl = (locale: SiteLocale, path: string) => absoluteUrl(localePath(locale, path));

/** Inline reference used where the full LocalBusiness node is not on the page. */
const orgRef = () => ({ '@type': 'Organization', '@id': ORG_ID, name: company.name, url: `${site.url}/` });

export function organizationSchema(locale: SiteLocale) {
  const t = getDictionary(locale);
  const a = company.postalAddress;
  return {
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: company.name,
    alternateName: company.alternateNames,
    description: t.company.shortDescription,
    url: `${site.url}/`,
    image: absoluteUrl(site.ogImage),
    telephone: company.phoneE164,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: company.meetingPoint.lat, longitude: company.meetingPoint.lng },
    hasMap: company.meetingPoint.mapsUrl,
    areaServed: { '@type': 'Place', name: 'Siddhpur, Gujarat, India' },
    knowsLanguage: company.languages,
    member: company.purohits.map((_, i) => ({ '@id': personId(i) })),
    ...(company.googleBusinessProfileUrl ? { sameAs: [company.googleBusinessProfileUrl] } : {}),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${site.url}/`,
    name: site.name,
    inLanguage: ['en-IN', 'gu-IN', 'hi-IN'],
    publisher: { '@id': ORG_ID },
  };
}

export function personSchemas(locale: SiteLocale) {
  const t = getDictionary(locale);
  return company.purohits.map((p, i) => ({
    '@type': 'Person',
    '@id': personId(i),
    name: p.name,
    ...(t.company.purohitNames[i] && t.company.purohitNames[i] !== p.name ? { alternateName: t.company.purohitNames[i] } : {}),
    jobTitle: t.company.purohitRole,
    telephone: p.phoneE164,
    worksFor: { '@id': ORG_ID },
  }));
}

export function breadcrumbSchema(locale: SiteLocale, items: { name: string; path: string }[]) {
  const t = getDictionary(locale);
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: t.common.home, path: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: pageUrl(locale, item.path),
    })),
  };
}

export function webPageSchema({
  locale,
  path,
  title,
  description,
  type = 'WebPage',
}: {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
}) {
  return {
    '@type': type,
    '@id': `${pageUrl(locale, path)}#webpage`,
    url: pageUrl(locale, path),
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: hreflang[locale],
  };
}

export function articleSchema({
  locale,
  path,
  title,
  description,
  image,
  datePublished,
  dateModified = site.lastUpdated,
}: {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${pageUrl(locale, path)}#article`,
    mainEntityOfPage: pageUrl(locale, path),
    headline: title,
    description,
    image: absoluteUrl(image ?? site.ogImage),
    datePublished,
    dateModified,
    inLanguage: hreflang[locale],
    author: orgRef(),
    publisher: orgRef(),
  };
}

export function serviceSchema({ locale, path, name, description }: { locale: SiteLocale; path: string; name: string; description: string }) {
  return {
    '@type': 'Service',
    '@id': `${pageUrl(locale, path)}#service`,
    name,
    description,
    url: pageUrl(locale, path),
    provider: orgRef(),
    areaServed: { '@type': 'Place', name: 'Siddhpur, Gujarat, India' },
  };
}

/** Strips dictionary formatting for plain-text fields. */
export function plainText(s: string) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\{phone\}/g, company.phoneDisplay);
}

/**
 * FAQPage markup mirrors the visible FAQ. Google retired FAQ rich results in
 * 2026, so this is for machine readability only — not an expected search feature.
 */
export function faqSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: plainText(f.answer) },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
