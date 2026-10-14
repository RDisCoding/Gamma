import type { Metadata } from 'next';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import Rich, { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import CtaLink from '../components/ui/CtaLink';
import EnquiryBuilder from '../components/ui/EnquiryBuilder';
import FaqList from '../components/ui/FaqList';
import PageHero from '../components/ui/PageHero';
import RelatedLinks from '../components/ui/RelatedLinks';
import SectionHeading from '../components/ui/SectionHeading';
import { company } from '../content/company';
import { getDictionary, type SiteLocale } from '../i18n';
import { telHref, whatsappHref } from '../lib/contact';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

const PATH = '/cost-and-booking';

export function costMetadata(locale: SiteLocale): Metadata {
  const m = getDictionary(locale).cost.meta;
  return pageMetadata({ locale, title: m.title, description: m.description, path: PATH });
}

export function CostView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const c = t.cost;

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ locale, path: PATH, title: c.meta.title, description: c.meta.description }),
          breadcrumbSchema(locale, [{ name: c.breadcrumb, path: PATH }]),
          faqSchema(c.faqs),
        )}
      />
      <PageHero
        locale={locale}
        eyebrow={c.eyebrow}
        titleLines={richLines(c.title, locale)}
        crumbs={[{ name: c.breadcrumb, path: PATH }]}
        intro={
          <p>
            <Rich text={c.intro} locale={locale} strongClassName="font-semibold text-ink" />
          </p>
        }
      >
        <div className="hero-rise mt-10 flex flex-wrap gap-3" style={{ ['--d' as string]: 4 }}>
          <CtaLink href={whatsappHref(c.quoteMessage)} variant="whatsapp" icon={<FaWhatsapp />} cta="cost_hero">
            {c.quoteCta}
          </CtaLink>
          <CtaLink href={telHref()} variant="ghost" icon={<FaPhone />} cta="cost_hero">
            {company.phoneDisplay}
          </CtaLink>
        </div>
      </PageHero>

      {company.priceGuide.length > 0 && (
        <section className="px-5 pb-20 sm:px-8 lg:px-12" aria-labelledby="price-title">
          <div className="mx-auto max-w-[1440px]">
            <h2 id="price-title" className="display-md">
              {c.priceGuide.heading}
            </h2>
            <table className="mt-8 w-full text-left">
              <thead>
                <tr className="border-b border-line text-sm text-ink-mute">
                  <th className="py-3 font-medium">{c.priceGuide.rite}</th>
                  <th className="py-3 font-medium">{c.priceGuide.from}</th>
                  <th className="py-3 font-medium">{c.priceGuide.includes}</th>
                </tr>
              </thead>
              <tbody>
                {company.priceGuide.map((p) => (
                  <tr key={p.label} className="border-b border-line">
                    <td className="py-4 font-display text-2xl">{p.label}</td>
                    <td className="py-4">{p.amount}</td>
                    <td className="py-4 text-ink-soft">{p.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="px-5 pb-24 sm:px-8 lg:px-12" aria-labelledby="factors-title">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading id="factors-title" index="01" eyebrow={c.factors.eyebrow} title={richLines(c.factors.title, locale)} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-4xl bg-line sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {c.factors.items.map((f, i) => (
              <article key={f.title} className="bg-paper p-8">
                <p aria-hidden="true" className="font-display text-5xl text-sindoor/70">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 font-display text-3xl text-ink">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="offerings" className="bg-paper-2 px-5 py-24 sm:px-8 lg:px-12 lg:py-32" aria-labelledby="offerings-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="offerings-title"
              index="02"
              eyebrow={c.offerings.eyebrow}
              title={richLines(c.offerings.title, locale)}
              intro={<p>{c.offerings.intro}</p>}
            />
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:col-span-8" data-reveal>
            {t.offerings.map((o) => (
              <li key={o.name} className="bg-paper px-6 py-5">
                <span className="block font-display text-2xl text-ink">{o.name}</span>
                {o.note && <span className="mt-1 block text-sm text-ink-soft">{o.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-dusk px-5 py-24 text-paper sm:px-8 lg:px-12 lg:py-32" aria-labelledby="ask-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="ask-title" index="03" tone="light" eyebrow={c.ask.eyebrow} title={richLines(c.ask.title, locale)} />
            <p className="mt-8 max-w-md text-paper/70" data-reveal>
              {c.ask.intro}
            </p>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {c.ask.items.map((q, i) => (
              <li key={q} className="flex items-baseline gap-5 border-b border-paper/15 py-5 text-lg" data-reveal style={{ ['--d' as string]: i % 3 }}>
                <span aria-hidden="true" className="text-marigold">
                  ✓
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32" aria-labelledby="book-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 rounded-4xl bg-paper-2 p-6 sm:p-10 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-5">
            <SectionHeading id="book-title" index="04" eyebrow={c.book.eyebrow} title={richLines(c.book.title, locale)} intro={<p>{c.book.intro}</p>} />
          </div>
          <div className="lg:col-span-7" data-reveal>
            <EnquiryBuilder text={t.enquiry} />
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-8 lg:px-12" aria-labelledby="cost-faq">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12">
          <h2 id="cost-faq" className="display-md lg:col-span-4">
            {c.faqHeading}
          </h2>
          <div className="lg:col-span-8">
            <FaqList faqs={c.faqs} locale={locale} />
          </div>
        </div>
      </section>

      <RelatedLinks items={c.related} locale={locale} />
    </>
  );
}
