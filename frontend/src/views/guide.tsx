import Image from 'next/image';
import type { Metadata } from 'next';
import { FaWhatsapp } from 'react-icons/fa';
import { List, Paragraphs } from '../components/i18n/Blocks';
import Rich, { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import CtaLink from '../components/ui/CtaLink';
import FaqList from '../components/ui/FaqList';
import PageHero from '../components/ui/PageHero';
import RelatedLinks from '../components/ui/RelatedLinks';
import ReviewNote from '../components/ui/ReviewNote';
import ScamAlert from '../components/ui/ScamAlert';
import Toc from '../components/ui/Toc';
import { gallery } from '../content/gallery';
import { getDictionary, localePath, type SiteLocale } from '../i18n';
import { whatsappHref } from '../lib/contact';
import { articleSchema, breadcrumbSchema, faqSchema, graph } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

const PATH = '/matrugaya-pooja-guide';

export function guideMetadata(locale: SiteLocale): Metadata {
  const m = getDictionary(locale).guide.meta;
  return pageMetadata({ locale, title: m.title, description: m.description, path: PATH, type: 'article' });
}

function Section({ id, block, locale }: { id: string; block: { heading: string; paragraphs: readonly string[]; list?: readonly string[] }; locale: SiteLocale }) {
  return (
    <>
      <h2 id={id}>{block.heading}</h2>
      <Paragraphs items={block.paragraphs} locale={locale} />
      {block.list && <List items={block.list} locale={locale} />}
    </>
  );
}

export function GuideView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const g = t.guide;
  const photo = gallery[2];

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema({ locale, path: PATH, title: g.meta.title, description: g.meta.description, image: '/og-image.jpg', datePublished: '2026-10-14' }),
          breadcrumbSchema(locale, [{ name: g.breadcrumb, path: PATH }]),
          faqSchema(g.faqs),
        )}
      />

      <PageHero
        locale={locale}
        eyebrow={g.eyebrow}
        titleLines={richLines(g.title, locale)}
        crumbs={[{ name: g.breadcrumb, path: PATH }]}
        script={locale === 'en' ? { text: 'मातृगया', className: 'font-deva' } : undefined}
        intro={
          <p>
            <Rich text={g.intro} locale={locale} strongClassName="font-semibold text-ink" />
          </p>
        }
      />

      <div className="px-5 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <Toc items={g.toc} label={t.common.onThisPage} />
            </div>
          </aside>

          <article className="prose-temple lg:col-span-7 lg:col-start-5">
            <Section id="what" block={g.what} locale={locale} />
            <Section id="why-siddhpur" block={g.why} locale={locale} />
            <Section id="who" block={g.who} locale={locale} />
            <Section id="when" block={g.when} locale={locale} />
            <Section id="steps" block={g.stepsIntro} locale={locale} />
          </article>
        </div>
      </div>

      {/* Steps — full-bleed band so the sequence reads at a glance */}
      <section aria-label={g.stepsLabel} className="bg-dusk px-5 py-20 text-paper sm:px-8 lg:px-12 lg:py-28">
        <ol className="mx-auto grid max-w-[1440px] gap-px overflow-hidden rounded-[1.75rem] bg-paper/10 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {g.steps.map((step, i) => (
            <li key={step.title} className="bg-dusk p-8 lg:p-10">
              <span className="font-display text-6xl text-marigold">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 font-display text-3xl">{step.title}</h3>
              <p className="mt-4 leading-relaxed text-paper/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <article className="prose-temple lg:col-span-7 lg:col-start-5">
            <Section id="duration" block={g.duration} locale={locale} />
            <Section id="bring" block={g.bring} locale={locale} />
            <Section id="arrangements" block={g.arrangements} locale={locale} />
            <p>
              <Rich text={g.arrangements.after} locale={locale} />
            </p>

            <figure className="not-prose my-12">
              <div className="relative aspect-16/10 overflow-hidden rounded-3xl bg-paper-3" data-reveal="clip">
                <Image src={photo.image} alt={t.gallery.images[photo.id].alt} fill sizes="(max-width: 1024px) 90vw, 55vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-ink-mute">{t.gallery.images[photo.id].caption}</figcaption>
            </figure>

            <h2 id="book">{g.book.heading}</h2>
            <List items={g.book.list} locale={locale} ordered />
            <div className="not-prose">
              <ScamAlert locale={locale} />
            </div>
            <p>
              <Rich text={g.book.after} locale={locale} />
            </p>

            <div className="not-prose mt-10 flex flex-wrap gap-3">
              <CtaLink href={whatsappHref(t.common.defaultWhatsappMessage)} variant="whatsapp" icon={<FaWhatsapp />} cta="guide">
                {g.book.askCta}
              </CtaLink>
              <CtaLink href={localePath(locale, '/contact')} variant="ghost">
                {g.book.contactCta}
              </CtaLink>
            </div>

            <h2 id="questions">{g.questionsHeading}</h2>
          </article>
        </div>
      </div>

      <div className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7 lg:col-start-5">
            <FaqList faqs={g.faqs} locale={locale} />
            <ReviewNote locale={locale} />
          </div>
        </div>
      </div>

      <RelatedLinks items={g.related} locale={locale} />
    </>
  );
}
