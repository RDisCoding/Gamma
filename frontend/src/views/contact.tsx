import type { Metadata } from 'next';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import EmailEnquiryForm from '../components/ui/EmailEnquiryForm';
import EnquiryBuilder from '../components/ui/EnquiryBuilder';
import MapFacade from '../components/ui/MapFacade';
import PageHero from '../components/ui/PageHero';
import ScamAlert from '../components/ui/ScamAlert';
import { company } from '../content/company';
import { getDictionary, type SiteLocale } from '../i18n';
import { telHref, whatsappHref } from '../lib/contact';
import { breadcrumbSchema, graph, organizationSchema, webPageSchema } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

const PATH = '/contact';

export function contactMetadata(locale: SiteLocale): Metadata {
  const m = getDictionary(locale).contact.meta;
  return pageMetadata({ locale, title: m.title, description: m.description, path: PATH });
}

export function ContactView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const c = t.contact;
  const address = [t.company.street, `${t.company.locality}, ${t.company.district}`, `${t.company.region} ${company.postalAddress.postalCode}`].join(', ');
  const [emailUser, emailDomain] = company.email.split('@');
  const channels = [
    { label: c.channels.whatsapp, value: company.phoneDisplay, href: whatsappHref(t.common.defaultWhatsappMessage), icon: <FaWhatsapp />, note: c.channels.whatsappNote },
    { label: c.channels.phone, value: company.phoneDisplay, href: telHref(), icon: <FaPhone />, note: c.channels.phoneNote },
    {
      label: c.channels.email,
      value: (
        <>
          {emailUser}@<wbr />
          {emailDomain}
        </>
      ),
      href: `mailto:${company.email}`,
      icon: <FaEnvelope />,
      note: c.channels.emailNote,
      small: true,
    },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(locale),
          webPageSchema({ locale, path: PATH, title: c.meta.title, description: c.meta.description, type: 'ContactPage' }),
          breadcrumbSchema(locale, [{ name: c.breadcrumb, path: PATH }]),
        )}
      />
      <PageHero locale={locale} eyebrow={c.eyebrow} titleLines={richLines(c.title, locale)} crumbs={[{ name: c.breadcrumb, path: PATH }]} intro={<p>{c.intro}</p>} />

      <section className="px-5 pb-24 sm:px-8 lg:px-12" aria-label={c.channelsLabel}>
        <div className="mx-auto grid max-w-[1440px] gap-px overflow-hidden rounded-4xl bg-line md:grid-cols-3" data-reveal>
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              data-cta="contact_page"
              {...(ch.href.startsWith('https') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex min-h-64 flex-col justify-between bg-paper p-8 transition-colors duration-500 hover:bg-dusk hover:text-paper lg:p-10"
            >
              <span className="flex items-center justify-between">
                <span className="eyebrow text-sindoor group-hover:text-marigold">{ch.label}</span>
                <span className="text-2xl text-sindoor group-hover:text-marigold">{ch.icon}</span>
              </span>
              <span>
                <span className={`block font-display leading-tight ${ch.small ? 'text-[clamp(1.5rem,2.1vw,2rem)]' : 'text-[clamp(1.9rem,3vw,2.75rem)]'}`}>
                  {ch.value}
                </span>
                <span className="mt-2 block text-sm text-ink-mute group-hover:text-paper/60">{ch.note}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-paper-2 px-5 py-24 sm:px-8 lg:px-12 lg:py-32" aria-labelledby="locations-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-5">
            <h2 id="locations-title" className="display-md" data-reveal>
              {c.locationsTitle}
            </h2>
            <div data-reveal>
              <p className="eyebrow text-sindoor">{c.meetLabel}</p>
              <p className="mt-3 font-display text-3xl">{t.company.meetingPointName}</p>
              <address className="mt-3 not-italic leading-relaxed text-ink">{address}</address>
              <p className="mt-3 leading-relaxed text-ink-soft">{t.company.meetingPointDescription}</p>
              <a
                href={company.meetingPoint.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="contact_page"
                className="link-draw mt-4 inline-block font-semibold text-sindoor"
              >
                {c.directions}
              </a>
            </div>
            <div data-reveal>
              <p className="eyebrow text-sindoor">{c.ritualLabel}</p>
              <p className="mt-3 font-display text-3xl">{t.company.ritualLocationName}</p>
              <p className="mt-3 leading-relaxed text-ink-soft">{t.company.ritualLocationDescription}</p>
            </div>
            <ScamAlert locale={locale} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <MapFacade
              location="meeting"
              labels={t.map}
              names={{ meeting: t.company.meetingPointName, ritual: t.company.ritualLocationName }}
              className="aspect-4/5 sm:aspect-4/3 lg:sticky lg:top-28 lg:aspect-auto lg:h-[34rem]"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-2">
          <div aria-labelledby="wa-form-title">
            <p className="eyebrow text-sindoor" data-reveal>
              {c.option1}
            </p>
            <h2 id="wa-form-title" className="display-md mt-5" data-reveal>
              {c.option1Title}
            </h2>
            <div className="mt-10" data-reveal>
              <EnquiryBuilder text={t.enquiry} />
            </div>
          </div>
          <div aria-labelledby="email-form-title">
            <p className="eyebrow text-sindoor" data-reveal>
              {c.option2}
            </p>
            <h2 id="email-form-title" className="display-md mt-5" data-reveal>
              {c.option2Title}
            </h2>
            <div className="mt-10" data-reveal>
              <EmailEnquiryForm locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
