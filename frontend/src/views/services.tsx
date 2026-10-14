import Link from 'next/link';
import type { Metadata } from 'next';
import { FaWhatsapp } from 'react-icons/fa';
import { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import CtaLink from '../components/ui/CtaLink';
import PageHero from '../components/ui/PageHero';
import RelatedLinks from '../components/ui/RelatedLinks';
import { serviceHrefs } from '../content/services';
import { fill, getDictionary, localePath, type SiteLocale } from '../i18n';
import { whatsappHref } from '../lib/contact';
import { breadcrumbSchema, graph, webPageSchema } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

const PATH = '/services';

export function servicesMetadata(locale: SiteLocale): Metadata {
  const m = getDictionary(locale).servicesPage.meta;
  return pageMetadata({ locale, title: m.title, description: m.description, path: PATH });
}

export function ServicesView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const s = t.servicesPage;

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ locale, path: PATH, title: s.meta.title, description: s.meta.description, type: 'CollectionPage' }),
          breadcrumbSchema(locale, [{ name: s.breadcrumb, path: PATH }]),
        )}
      />
      <PageHero
        locale={locale}
        eyebrow={s.eyebrow}
        titleLines={richLines(s.title, locale)}
        crumbs={[{ name: s.breadcrumb, path: PATH }]}
        script={locale === 'hi' ? undefined : { text: 'श्राद्ध', className: 'font-deva' }}
        intro={<p>{s.intro}</p>}
      />

      {t.services.groups.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
          className={`px-5 py-20 sm:px-8 lg:px-12 lg:py-28 ${gi % 2 === 1 ? 'bg-paper-2' : ''}`}
        >
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow text-sindoor" data-reveal>
                  {String(gi + 1).padStart(2, '0')}
                </p>
                <h2 id={`${group.id}-title`} className="display-md mt-5" data-reveal>
                  {group.title}
                </h2>
                <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft" data-reveal>
                  {group.intro}
                </p>
              </div>
            </div>
            <ul className="border-t border-line lg:col-span-8">
              {group.services.map((service, i) => {
                const href = serviceHrefs[service.id];
                const body = (
                  <>
                    <div>
                      <h3 className="font-display text-[clamp(1.8rem,3.4vw,2.75rem)] leading-tight text-ink transition-colors group-hover:text-sindoor">
                        {service.title}
                      </h3>
                      {service.alsoKnownAs && (
                        <p className="mt-2 text-sm text-ink-mute">{fill(t.services.alsoCalled, { names: service.alsoKnownAs })}</p>
                      )}
                      <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">{service.summary}</p>
                    </div>
                    {href && (
                      <span
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/20 text-xl transition-all duration-700 group-hover:-rotate-45 group-hover:border-sindoor group-hover:bg-sindoor group-hover:text-paper"
                      >
                        →
                      </span>
                    )}
                  </>
                );
                return (
                  <li key={service.id} id={service.id} className="border-b border-line" data-reveal style={{ ['--d' as string]: i % 4 }}>
                    {href ? (
                      <Link href={localePath(locale, href)} className="group flex items-start justify-between gap-8 py-9">
                        {body}
                      </Link>
                    ) : (
                      <div className="flex items-start justify-between gap-8 py-9">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 rounded-4xl bg-sindoor p-8 text-paper sm:p-12 lg:flex-row lg:items-center">
          <p className="display-md max-w-[20ch]" data-reveal>
            {s.bandTitle}
          </p>
          <CtaLink href={whatsappHref(t.common.defaultWhatsappMessage)} variant="light" icon={<FaWhatsapp />} cta="services_band">
            {s.bandCta}
          </CtaLink>
        </div>
      </section>

      <RelatedLinks items={s.related} locale={locale} />
    </>
  );
}
