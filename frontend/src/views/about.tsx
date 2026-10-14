import Image from 'next/image';
import type { Metadata } from 'next';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import Rich, { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import CtaLink from '../components/ui/CtaLink';
import PageHero from '../components/ui/PageHero';
import RelatedLinks from '../components/ui/RelatedLinks';
import SectionHeading from '../components/ui/SectionHeading';
import { company } from '../content/company';
import { gallery, purohitPortrait } from '../content/gallery';
import { publishedReviews } from '../content/reviews';
import { fill, getDictionary, localePath, type SiteLocale } from '../i18n';
import { telHref, whatsappHref } from '../lib/contact';
import { breadcrumbSchema, graph, organizationSchema, personSchemas, webPageSchema } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

const PATH = '/about';

export function aboutMetadata(locale: SiteLocale): Metadata {
  const m = getDictionary(locale).about.meta;
  return pageMetadata({ locale, title: m.title, description: m.description, path: PATH });
}

export function AboutView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const a = t.about;
  const address = `${t.company.street}, ${t.company.locality} ${company.postalAddress.postalCode}`;

  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(locale),
          ...personSchemas(locale),
          webPageSchema({ locale, path: PATH, title: a.meta.title, description: a.meta.description, type: 'AboutPage' }),
          breadcrumbSchema(locale, [{ name: a.breadcrumb, path: PATH }]),
        )}
      />
      <PageHero
        locale={locale}
        eyebrow={a.eyebrow}
        titleLines={richLines(a.title, locale)}
        crumbs={[{ name: a.breadcrumb, path: PATH }]}
        intro={
          <p>
            <Rich text={t.company.identityStatement} locale={locale} />
          </p>
        }
      />

      <section className="px-5 pb-24 sm:px-8 lg:px-12" aria-labelledby="people-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12 lg:items-center">
          <figure className="lg:col-span-5">
            <div className="arch relative aspect-3/4 w-full max-w-md overflow-hidden bg-paper-3" data-reveal="clip">
              <Image
                src={purohitPortrait.image}
                alt={t.gallery.images.portrait.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 35vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="mt-4 max-w-md text-sm text-ink-mute">{t.gallery.images.portrait.caption}</figcaption>
          </figure>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading id="people-title" index="01" eyebrow={a.peopleEyebrow} title={richLines(a.peopleTitle, locale)} />
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6" data-reveal>
              {t.company.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-6xl leading-none text-sindoor">{stat.value}</span>
                    <span className="mt-2 block text-sm text-ink-soft">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="mt-10 border-t border-line">
              {company.purohits.map((p, i) => (
                <li key={p.name} id={`purohit-${i + 1}`} className="border-b border-line py-8" data-reveal style={{ ['--d' as string]: i }}>
                  <p className="font-display text-4xl text-ink">{t.company.purohitNames[i]}</p>
                  <p className="mt-2 text-ink-mute">{t.company.purohitRole}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={telHref(p.phoneE164)}
                      data-cta="about_purohit"
                      className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      <FaPhone aria-hidden="true" /> {p.phoneDisplay}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft" data-reveal>
              {fill(a.meetText, { address })}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 px-5 py-24 sm:px-8 lg:px-12 lg:py-32" aria-labelledby="how-title">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading id="how-title" index="02" eyebrow={a.howEyebrow} title={richLines(a.howTitle, locale)} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-4xl bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {a.principles.map((p) => (
              <article key={p.title} className="bg-paper p-8">
                <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-full bg-sindoor" />
                <h3 className="mt-6 font-display text-3xl leading-tight text-ink">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-soft">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32" aria-labelledby="feedback-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="feedback-title" index="03" eyebrow={a.wordsEyebrow} title={richLines(a.wordsTitle, locale)} />
          </div>
          <div className="lg:col-span-7">
            {publishedReviews.length > 0 ? (
              <ul className="space-y-10">
                {publishedReviews.map((r) => (
                  <li key={r.id} data-reveal>
                    <blockquote lang="en" className="font-display text-3xl leading-snug text-ink">
                      “{r.reviewText}”
                    </blockquote>
                    <p className="mt-4 text-ink-mute">— {r.clientName}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg leading-relaxed text-ink-soft" data-reveal>
                {a.noReviews}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-5 sm:grid-cols-3">
          {[gallery[4], gallery[6], gallery[3]].map((photo, i) => (
            <figure key={photo.image} data-reveal style={{ ['--d' as string]: i }}>
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-paper-3">
                <Image src={photo.image} alt={t.gallery.images[photo.id].alt} fill sizes="(max-width: 640px) 90vw, 30vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-ink-mute">{t.gallery.images[photo.id].caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mx-auto mt-14 flex max-w-[1440px] flex-wrap gap-3">
          <CtaLink href={whatsappHref(a.messageText)} variant="whatsapp" icon={<FaWhatsapp />} cta="about">
            {a.messageCta}
          </CtaLink>
          <CtaLink href={localePath(locale, '/contact')} variant="ghost">
            {a.contactCta}
          </CtaLink>
        </div>
      </section>

      <RelatedLinks items={a.related} locale={locale} />
    </>
  );
}
