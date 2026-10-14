import type { Metadata } from 'next';
import { FaWhatsapp } from 'react-icons/fa';
import LeadConfirmed from '../components/analytics/LeadConfirmed';
import { richLines } from '../components/i18n/Rich';
import CtaLink from '../components/ui/CtaLink';
import PageHero from '../components/ui/PageHero';
import { getDictionary, localePath, type SiteLocale } from '../i18n';
import { whatsappHref } from '../lib/contact';
import { pageMetadata } from '../lib/seo';

export function thankYouMetadata(locale: SiteLocale): Metadata {
  const m = getDictionary(locale).thankYou.meta;
  return pageMetadata({ locale, title: m.title, description: m.description, path: '/thank-you', noindex: true });
}

export function ThankYouView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const ty = t.thankYou;
  return (
    <>
      <LeadConfirmed />
      <PageHero locale={locale} eyebrow={ty.eyebrow} titleLines={richLines(ty.title, locale)} intro={<p>{ty.intro}</p>}>
        <div className="hero-rise mt-10 flex flex-wrap gap-3" style={{ ['--d' as string]: 4 }}>
          <CtaLink href={whatsappHref(t.common.defaultWhatsappMessage)} variant="whatsapp" icon={<FaWhatsapp />} cta="thank_you">
            {t.common.whatsappUs}
          </CtaLink>
          <CtaLink href={localePath(locale, '/matrugaya-pooja-guide')} variant="ghost">
            {ty.guideCta}
          </CtaLink>
        </div>
      </PageHero>
    </>
  );
}
