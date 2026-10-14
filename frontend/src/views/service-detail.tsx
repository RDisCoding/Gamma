import Image from 'next/image';
import type { Metadata } from 'next';
import { FaWhatsapp } from 'react-icons/fa';
import { List, Paragraphs } from '../components/i18n/Blocks';
import { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import CtaLink from '../components/ui/CtaLink';
import FaqList from '../components/ui/FaqList';
import PageHero from '../components/ui/PageHero';
import RelatedLinks from '../components/ui/RelatedLinks';
import ReviewNote from '../components/ui/ReviewNote';
import { serviceDetails, type ServiceSlug } from '../content/service-details';
import { fill, getDictionary, type SiteLocale } from '../i18n';
import { whatsappHref } from '../lib/contact';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

export const serviceSlugs = serviceDetails.map((s) => s.slug);

const firstSentence = (text: string) => text.match(/^.*?[.।](?=\s|$)/)?.[0] ?? text;

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(slug);
}

export function serviceDetailMetadata(locale: SiteLocale, slug: ServiceSlug): Metadata {
  const s = getDictionary(locale).serviceDetail.items[slug];
  return pageMetadata({ locale, title: s.seoTitle, description: s.metaDescription, path: `/services/${slug}` });
}

export function ServiceDetailView({ locale, slug }: { locale: SiteLocale; slug: ServiceSlug }) {
  const t = getDictionary(locale);
  const d = t.serviceDetail;
  const s = d.items[slug];
  const path = `/services/${slug}`;
  const image = serviceDetails.find((x) => x.slug === slug)!.image;
  const crumbs = [
    { name: t.servicesPage.breadcrumb, path: '/services' },
    { name: s.name, path },
  ];
  const others = serviceSlugs.filter((x) => x !== slug);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ locale, path, title: s.seoTitle, description: s.metaDescription }),
          serviceSchema({ locale, path, name: s.name, description: s.lead }),
          breadcrumbSchema(locale, crumbs),
          faqSchema(s.faqs),
        )}
      />

      <PageHero locale={locale} eyebrow={s.eyebrow} titleLines={richLines(s.title, locale)} crumbs={crumbs} intro={<p>{s.lead}</p>} />

      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <article className="prose-temple lg:col-span-7">
            {s.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <Paragraphs items={section.paragraphs} locale={locale} />
                <List items={section.list} locale={locale} />
              </section>
            ))}
          </article>

          <aside className="space-y-8 lg:col-span-4 lg:col-start-9">
            <figure className="lg:sticky lg:top-28">
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] bg-paper-3" data-reveal="clip">
                <Image src={image} alt={s.imageAlt} fill sizes="(max-width: 1024px) 90vw, 30vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-ink-mute">{d.imageCaption}</figcaption>

              <div className="mt-8 rounded-[1.75rem] bg-dusk p-7 text-paper" data-reveal>
                <p className="eyebrow text-marigold">{d.confirmHeading}</p>
                <ul className="mt-5 space-y-3 text-[0.98rem] leading-snug text-paper/85">
                  {s.confirm.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <CtaLink
                  href={whatsappHref(fill(d.askMessage, { name: s.name }))}
                  variant="whatsapp"
                  icon={<FaWhatsapp />}
                  cta={`service_${slug}`}
                  className="mt-7 w-full"
                >
                  {fill(d.askAbout, { name: s.name })}
                </CtaLink>
              </div>
            </figure>
          </aside>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12" aria-labelledby="service-faq">
        <div className="mx-auto max-w-[1440px] lg:grid lg:grid-cols-12 lg:gap-16">
          <h2 id="service-faq" className="display-md mb-10 lg:col-span-4">
            {fill(d.questionsAbout, { name: s.name })}
          </h2>
          <div className="space-y-10 lg:col-span-8">
            <FaqList faqs={s.faqs} locale={locale} />
            <ReviewNote locale={locale} />
          </div>
        </div>
      </section>

      <RelatedLinks
        locale={locale}
        items={[
          { href: '/matrugaya-pooja-guide', title: d.guideLink.title, text: d.guideLink.text },
          ...others.map((o) => ({ href: `/services/${o}`, title: d.items[o].name, text: firstSentence(d.items[o].lead) })),
        ]}
      />
    </>
  );
}
