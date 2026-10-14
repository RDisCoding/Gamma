import Link from 'next/link';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { company } from '../../content/company';
import { site } from '../../content/site';
import { getDictionary, localePath, type SiteLocale } from '../../i18n';
import { telHref, whatsappHref } from '../../lib/contact';
import Rich, { richLines } from '../i18n/Rich';
import CtaLink from '../ui/CtaLink';
import BinduMark from './BinduMark';

export default function Footer({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);
  const c = t.footer.columns;
  const columns = [
    {
      title: c.guides,
      links: [
        { name: c.guideLink, href: '/matrugaya-pooja-guide' },
        { name: c.learnMoreLink, href: '/learn-more' },
        { name: c.visitLink, href: '/plan-your-visit' },
        { name: c.costLink, href: '/cost-and-booking' },
      ],
    },
    {
      title: c.rituals,
      links: [
        { name: c.allServices, href: '/services' },
        { name: t.serviceDetail.items['pind-daan-tarpan'].name, href: '/services/pind-daan-tarpan' },
        { name: t.serviceDetail.items['narayan-bali'].name, href: '/services/narayan-bali' },
        { name: t.serviceDetail.items['tripindi-shraddha'].name, href: '/services/tripindi-shraddha' },
      ],
    },
    {
      title: c.about,
      links: [
        { name: c.whoWeAre, href: '/about' },
        { name: c.gallery, href: '/gallery' },
        { name: c.contact, href: '/contact' },
      ],
    },
  ];
  const address = [t.company.street, `${t.company.locality}, ${t.company.district}`, `${t.company.region} ${company.postalAddress.postalCode}`].join(', ');
  const updated = new Date(site.lastUpdated).toLocaleDateString(t.locale.dateLocale, { month: 'long', year: 'numeric' });
  const title = richLines(t.footer.title, locale);

  return (
    <footer className="relative overflow-hidden bg-dusk text-paper">
      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-24 sm:px-8 lg:px-12 lg:pb-12 lg:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-marigold" data-reveal>
              {t.footer.eyebrow}
            </p>
            <h2 className="display-lg mt-6 max-w-[14ch] [&_em]:text-marigold" data-reveal-lines>
              {title.map((line, i) => (
                <span key={i} className="line-mask">
                  <span style={{ ['--d' as string]: i }}>{line}</span>{' '}
                </span>
              ))}
            </h2>
          </div>
          <div className="space-y-6" data-reveal style={{ ['--d' as string]: 2 }}>
            <p className="max-w-md text-paper/70">{t.footer.text}</p>
            <div className="flex flex-wrap gap-3">
              <CtaLink href={whatsappHref(t.common.defaultWhatsappMessage)} variant="whatsapp" icon={<FaWhatsapp />} cta="footer">
                {t.common.whatsapp}
              </CtaLink>
              <CtaLink href={telHref()} variant="ghost-light" icon={<FaPhone />} cta="footer">
                {company.phoneDisplay}
              </CtaLink>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-12 border-t border-paper/15 pt-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-5 text-sm leading-relaxed text-paper/70">
            <Link href={lp('/')} className="flex items-center gap-3 text-paper">
              <BinduMark className="h-9 w-7" />
              <span translate="no" className="font-wordmark text-2xl">
                {company.name}
              </span>
            </Link>
            <address className="not-italic">
              <span className="block text-paper">{t.footer.meetAtHome}</span>
              {address} ({t.company.nearLandmark}) ·{' '}
              <a href={company.meetingPoint.mapsUrl} target="_blank" rel="noopener noreferrer" data-cta="footer" className="link-draw text-marigold">
                {t.footer.directions}
              </a>
            </address>
            <p>
              <span className="block text-paper">{t.footer.ritesAt}</span>
              {t.company.ritualLocationName} — {t.footer.weTakeYou}
            </p>
            <p>
              <span className="block text-paper">{t.footer.phoneWhatsapp}</span>
              <a href={telHref()} data-cta="footer" className="link-draw">
                {company.phoneDisplay}
              </a>{' '}
              · {t.company.callTimes} — {t.company.callBeforeVisit}
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="link-draw">
                {company.email}
              </a>
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow text-marigold">{col.title}</p>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={lp(link.href)} className="link-draw text-paper/80 hover:text-paper">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs leading-relaxed text-paper/60 lg:flex-row lg:justify-between">
          <p className="max-w-3xl">
            <Rich text={t.company.identityStatement} locale={locale} />
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} {company.name} · {t.common.lastUpdated} {updated}
          </p>
        </div>
      </div>

      {/* Decorative wordmark, drawn as SVG so it scales with the page width. */}
      <svg aria-hidden="true" viewBox="0 0 1200 190" className="pointer-events-none block w-full select-none px-4 pb-6 text-paper/5">
        <text x="300" y="150" textAnchor="middle" fill="currentColor" fontSize="168" className="font-deva">
          मातृगया
        </text>
        <circle cx="600" cy="100" r="9" fill="currentColor" />
        <text x="900" y="150" textAnchor="middle" fill="currentColor" fontSize="168" className="font-guj">
          સિદ્ધપુર
        </text>
      </svg>
    </footer>
  );
}
