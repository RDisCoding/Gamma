import type { Metadata } from 'next';
import { FaWhatsapp } from 'react-icons/fa';
import Rich, { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import CtaLink from '../components/ui/CtaLink';
import MapFacade from '../components/ui/MapFacade';
import PageHero from '../components/ui/PageHero';
import RelatedLinks from '../components/ui/RelatedLinks';
import ReviewNote from '../components/ui/ReviewNote';
import ScamAlert from '../components/ui/ScamAlert';
import SectionHeading from '../components/ui/SectionHeading';
import { fill, getDictionary, type SiteLocale } from '../i18n';
import { whatsappHref } from '../lib/contact';
import { articleSchema, breadcrumbSchema, graph } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

const PATH = '/plan-your-visit';

export function visitMetadata(locale: SiteLocale): Metadata {
  const m = getDictionary(locale).visit.meta;
  return pageMetadata({ locale, title: m.title, description: m.description, path: PATH, type: 'article' });
}

export function VisitView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const v = t.visit;

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema({ locale, path: PATH, title: v.meta.title, description: v.meta.description, datePublished: '2026-10-14' }),
          breadcrumbSchema(locale, [{ name: v.breadcrumb, path: PATH }]),
        )}
      />
      <PageHero
        locale={locale}
        eyebrow={v.eyebrow}
        titleLines={richLines(v.title, locale)}
        crumbs={[{ name: v.breadcrumb, path: PATH }]}
        script={locale === 'gu' ? undefined : { text: 'સિદ્ધપુર', className: 'font-guj' }}
        intro={
          <p>
            <Rich text={v.intro} locale={locale} strongClassName="font-semibold text-ink" />
          </p>
        }
      />

      {/* Routes */}
      <section className="px-5 pb-24 sm:px-8 lg:px-12" aria-labelledby="routes-title">
        <div className="mx-auto grid max-w-[1440px] gap-px overflow-hidden rounded-4xl bg-line lg:grid-cols-3" data-reveal>
          <article className="bg-paper p-8 lg:p-10">
            <p className="eyebrow text-sindoor">{v.byRail}</p>
            <h2 id="routes-title" className="mt-5 font-display text-4xl text-ink">
              {t.travel.railStation}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">{t.travel.railLine}.</p>
            <p className="mt-4 leading-relaxed text-ink-soft">{t.travel.railNote}</p>
          </article>
          <article className="bg-paper p-8 lg:p-10">
            <p className="eyebrow text-sindoor">{v.byAir}</p>
            <h3 className="mt-5 font-display text-4xl text-ink">{v.airTitle}</h3>
            <p className="mt-5 leading-relaxed text-ink-soft">
              {fill(v.airText, { airport: t.travel.airportName, distance: t.travel.airportDistance })}
            </p>
          </article>
          <article className="bg-paper p-8 lg:p-10">
            <p className="eyebrow text-sindoor">{v.byRoad}</p>
            <h3 className="mt-5 font-display text-4xl text-ink">{v.roadTitle}</h3>
            <dl className="mt-5 divide-y divide-line">
              {t.travel.road.map((r) => (
                <div key={r.from} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-ink">{r.from}</dt>
                  <dd className="text-ink-soft">{r.distance}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-ink-mute">{fill(v.highwayNote, { highway: t.travel.highway })}</p>
          </article>
        </div>
      </section>

      {/* Where to meet us */}
      <section className="bg-paper-2 px-5 py-24 sm:px-8 lg:px-12 lg:py-32" aria-labelledby="where-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="where-title"
              eyebrow={v.meet.eyebrow}
              title={richLines(v.meet.title, locale)}
              intro={
                <>
                  <p>
                    {t.company.meetingPointName}. {t.company.meetingPointDescription}
                  </p>
                  <p className="mt-4">{t.company.ritualLocationDescription}</p>
                </>
              }
            />
            <ScamAlert locale={locale} className="mt-8" />
            <p className="mt-6 text-sm leading-relaxed text-ink-soft" data-reveal>
              {v.meet.facilities}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <MapFacade
              location="meeting"
              labels={t.map}
              names={{ meeting: t.company.meetingPointName, ritual: t.company.ritualLocationName }}
              className="aspect-4/5 sm:aspect-4/3"
            />
          </div>
        </div>
      </section>

      {/* Stay & timing */}
      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32" aria-labelledby="stay-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading id="stay-title" index="01" eyebrow={v.stay.eyebrow} title={richLines(v.stay.title, locale)} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft" data-reveal>
              {v.stay.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading index="02" eyebrow={v.timing.eyebrow} title={richLines(v.timing.title, locale)} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft" data-reveal>
              {v.timing.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-dusk px-5 py-24 text-paper sm:px-8 lg:px-12 lg:py-32" aria-labelledby="checklist-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="checklist-title"
              tone="light"
              eyebrow={v.checklist.eyebrow}
              title={richLines(v.checklist.title, locale)}
              intro={<p>{v.checklist.intro}</p>}
            />
            <div className="mt-10" data-reveal>
              <CtaLink href={whatsappHref(v.checklist.whatsappMessage)} variant="whatsapp" icon={<FaWhatsapp />} cta="visit_checklist">
                {v.checklist.cta}
              </CtaLink>
            </div>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-3xl bg-paper/10 sm:grid-cols-2 lg:col-span-7" data-reveal>
            {v.checklist.items.map((item, i) => (
              <li key={item} className="flex gap-4 bg-dusk p-6">
                <span className="font-display text-3xl leading-none text-marigold">{String(i + 1).padStart(2, '0')}</span>
                <span className="pt-1 leading-snug text-paper/85">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <ReviewNote locale={locale} text={v.reviewNote} />
        </div>
      </section>

      <RelatedLinks items={v.related} locale={locale} />
    </>
  );
}
