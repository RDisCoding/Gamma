import '../globals.css';
import type { Metadata, Viewport } from 'next';
import SiteShell from '../../components/site/SiteShell';
import { site } from '../../content/site';
import { getDictionary, prefixedLocales, type SiteLocale } from '../../i18n';
import { siteVerification } from '../../lib/seo';
import { indicFonts } from '../fonts';

/* Gujarati (/gu), Hindi (/hi), Telugu (/te), Kannada (/kn) and Tamil (/ta).
   English lives in the (en) route group. */
export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getDictionary((await params).locale as SiteLocale);
  return {
    metadataBase: new URL(site.url),
    title: t.home.meta.title,
    description: t.company.shortDescription,
    applicationName: site.name,
    formatDetection: { telephone: false, email: false, address: false },
    verification: siteVerification,
  };
}

export const viewport: Viewport = { themeColor: '#f6efe3', width: 'device-width', initialScale: 1 };

export default async function LocaleLayout({ children, params }: Props) {
  const locale = (await params).locale as SiteLocale;
  return (
    <SiteShell locale={locale} fontClassName={indicFonts}>
      {children}
    </SiteShell>
  );
}
