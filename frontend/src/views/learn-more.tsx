import { Fragment } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { List, Paragraphs } from '../components/i18n/Blocks';
import Rich, { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import PageHero from '../components/ui/PageHero';
import RelatedLinks from '../components/ui/RelatedLinks';
import ReviewNote from '../components/ui/ReviewNote';
import Toc from '../components/ui/Toc';
import { gallery } from '../content/gallery';
import { getDictionary, type SiteLocale } from '../i18n';
import { articleSchema, breadcrumbSchema, graph } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

const PATH = '/learn-more';

type Kind = 'Scripture' | 'Tradition' | 'History';
const kindStyles: Record<Kind, string> = {
  Scripture: 'bg-sindoor text-paper',
  Tradition: 'bg-marigold text-ink',
  History: 'bg-ink text-paper',
};

/* Source titles are kept in their original language. */
const sources = [
  { label: 'Srimad Bhagavatam, Canto 3 (Vedabase)', href: 'https://vedabase.io/en/library/sb/3/' },
  { label: 'Bhagavad Gita 10.26 (Vedabase)', href: 'https://vedabase.io/en/library/bg/10/26/' },
  { label: 'Gujarat Tourism — Sidhpur', href: 'https://www.gujarattourism.com/north-zone/patan/sidhpur.html' },
  { label: 'Patan district administration — Bindu Sarovar, Matru Tarpan place', href: 'https://patan.nic.in/tourist-place/bindu-sarovar-matru-tarpan-place-sidhpur/' },
  { label: 'Loktej (24 Sep 2024) — Siddhpur, a historic pilgrimage site for Matru Shradh', href: 'https://english.loktej.com/article/14467/siddhpur-a-historic-pilgrimage-site-for-matru-shradh-rituals' },
  { label: 'Wikipedia — Shristhal Sangrahalay (Bindu Sarovar museum)', href: 'https://en.wikipedia.org/wiki/Shristhal_Sangrahalay' },
  { label: 'Wikipedia — Rudra Mahalaya Temple', href: 'https://en.wikipedia.org/wiki/Rudra_Mahalaya_Temple' },
  { label: 'ETV Bharat Gujarati (6 Oct 2021) — Siddhpur’s genealogy registers', href: 'https://www.etvbharat.com/gujarati/gujarat/state/patan/bindu-sarovar-of-siddhpur-centuries-old-genealogical-books-of-the-congregation-are-still-intact/gj20211006071126567' },
  { label: 'Wikipedia — Gangasagar Mela', href: 'https://en.wikipedia.org/wiki/Gangasagar_Mela' },
];

export function learnMoreMetadata(locale: SiteLocale): Metadata {
  const m = getDictionary(locale).learnMore.meta;
  return pageMetadata({ locale, title: m.title, description: m.description, path: PATH, type: 'article' });
}

export function LearnMoreView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const l = t.learnMore;
  const photo = gallery[1];
  const toc = [...l.sections.map((s) => ({ id: s.id, label: s.toc })), { id: 'sources', label: l.sourcesToc }];

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema({ locale, path: PATH, title: l.meta.title, description: l.meta.description, image: photo.image, datePublished: '2026-10-14' }),
          breadcrumbSchema(locale, [{ name: l.breadcrumb, path: PATH }]),
        )}
      />

      <PageHero
        locale={locale}
        eyebrow={l.eyebrow}
        titleLines={richLines(l.title, locale)}
        crumbs={[{ name: l.breadcrumb, path: PATH }]}
        script={locale === 'gu' ? undefined : { text: 'બિંદુ સરોવર', className: 'font-guj' }}
        intro={
          <p>
            <Rich text={l.intro} locale={locale} strongClassName="font-semibold text-ink" />
          </p>
        }
      />

      <div className="px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <Toc items={toc} label={t.common.onThisPage} />
            </div>
          </aside>

          <article className="prose-temple lg:col-span-7 lg:col-start-5">
            {l.sections.map((section, i) => (
              <Fragment key={section.id}>
                <section aria-labelledby={section.id}>
                  <div className="not-prose mt-16 flex flex-wrap gap-2 first:mt-0">
                    {(section.kinds as Kind[]).map((k) => (
                      <span key={k} className={`eyebrow rounded-full px-3 py-1 text-[0.65rem] ${kindStyles[k]}`}>
                        {l.kinds[k]}
                      </span>
                    ))}
                  </div>
                  <h2 id={section.id} className="!mt-4">
                    {section.title}
                  </h2>
                  <Paragraphs items={section.paragraphs} locale={locale} />
                  <List items={section.list} locale={locale} />
                  {section.quote && (
                    <blockquote>
                      <p>
                        <Rich text={section.quote} locale={locale} />
                      </p>
                    </blockquote>
                  )}
                  {section.afterQuote && (
                    <p>
                      <Rich text={section.afterQuote} locale={locale} />
                    </p>
                  )}
                </section>

                {i === 1 && (
                  <figure className="not-prose my-14">
                    <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-paper-3 sm:aspect-16/11" data-reveal="clip">
                      <Image src={photo.image} alt={t.gallery.images[photo.id].alt} fill sizes="(max-width: 1024px) 90vw, 55vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-3 text-sm text-ink-mute">{t.gallery.images[photo.id].caption}</figcaption>
                  </figure>
                )}
              </Fragment>
            ))}

            <section aria-labelledby="sources">
              <h2 id="sources">{l.sourcesHeading}</h2>
              <p>
                <Rich text={l.sourcesIntro} locale={locale} />
              </p>
              <ul lang="en">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <div className="not-prose mt-12">
              <ReviewNote locale={locale} text={l.reviewNote} />
            </div>
          </article>
        </div>
      </div>

      <RelatedLinks items={l.related} locale={locale} />
    </>
  );
}
