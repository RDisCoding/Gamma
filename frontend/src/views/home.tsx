import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineShieldExclamation } from 'react-icons/hi';
import Rich, { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import CtaLink from '../components/ui/CtaLink';
import EnquiryBuilder from '../components/ui/EnquiryBuilder';
import FaqList from '../components/ui/FaqList';
import MapFacade from '../components/ui/MapFacade';
import Marquee from '../components/ui/Marquee';
import RotatingSeal from '../components/ui/RotatingSeal';
import ScamAlert from '../components/ui/ScamAlert';
import SectionHeading from '../components/ui/SectionHeading';
import { company } from '../content/company';
import { gallery, purohitPortrait } from '../content/gallery';
import { publishedReviews } from '../content/reviews';
import { serviceHrefs } from '../content/services';
import { fill, getDictionary, localePath, type SiteLocale } from '../i18n';
import { telHref, whatsappHref } from '../lib/contact';
import { faqSchema, graph, organizationSchema, personSchemas, webPageSchema, websiteSchema } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

export function homeMetadata(locale: SiteLocale): Metadata {
  const t = getDictionary(locale).home.meta;
  return pageMetadata({ locale, title: t.title, description: t.description, path: '/' });
}

export function HomeView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const h = t.home;
  const lp = (path: string) => localePath(locale, path);
  const img = (id: keyof typeof t.gallery.images) => t.gallery.images[id];

  const heroImage = gallery[0];
  const kundImage = gallery[1];
  const stripImages = [gallery[2], gallery[3], gallery[4], gallery[5], gallery[6]];
  const featuredRites = t.services.groups[0].services.filter((s) => serviceHrefs[s.id]);
  const names = t.company.purohitNames.join(` ${t.company.and} `);

  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(locale),
          websiteSchema(),
          ...personSchemas(locale),
          webPageSchema({ locale, path: '/', title: h.meta.title, description: h.meta.description }),
          faqSchema(t.faqs),
        )}
      />

      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pb-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 lg:col-span-8 lg:pt-10">
            <p className="eyebrow hero-rise flex items-center gap-4 text-sindoor" style={{ ['--d' as string]: 0 }}>
              <span aria-hidden="true" className="h-px w-10 bg-current" />
              {h.hero.eyebrow}
            </p>
            <h1 className="display-xl mt-8 text-ink">
              {richLines(h.hero.title, locale).map((line, i) => (
                <span key={i} className="hero-line">
                  <span style={{ ['--d' as string]: i + 1 }}>{line}</span>{' '}
                </span>
              ))}
            </h1>
            <p className="hero-rise mt-10 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl" style={{ ['--d' as string]: 4 }}>
              {h.hero.intro}
            </p>
            <div className="hero-rise mt-10 flex flex-wrap gap-3" style={{ ['--d' as string]: 5 }}>
              <CtaLink href={whatsappHref(t.common.defaultWhatsappMessage)} variant="whatsapp" icon={<FaWhatsapp />} cta="hero">
                {h.hero.whatsappCta}
              </CtaLink>
              <CtaLink href={telHref()} variant="ghost" icon={<FaPhone />} cta="hero">
                {fill(t.common.callNumber, { phone: company.phoneDisplay })}
              </CtaLink>
            </div>
          </div>

          <div className="relative lg:col-span-4">
            <div className="arch relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden bg-paper-3 lg:mt-24">
              <Image
                src={heroImage.image}
                alt={img(heroImage.id).alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="hero-zoom object-cover object-[60%_50%]"
              />
            </div>
            <RotatingSeal className="absolute -bottom-6 left-2 h-28 w-28 text-ink sm:h-36 sm:w-36 lg:-left-16 lg:bottom-8" />
          </div>
        </div>

        <dl
          className="hero-rise mx-auto mt-16 grid max-w-[1440px] gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
          style={{ ['--d' as string]: 6 }}
        >
          {h.facts.map((fact) => (
            <div key={fact.term} className="bg-paper p-6">
              <dt className="eyebrow text-sindoor">{fact.term}</dt>
              <dd className="mt-3 text-[1.02rem] leading-snug text-ink">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ScamAlert locale={locale} variant="band" />

      <Marquee tone="paper" />

      {/* ───────────── 01 The place ───────────── */}
      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="place-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="arch relative aspect-4/5 w-full max-w-lg overflow-hidden bg-paper-3" data-reveal="clip">
              <div className="absolute inset-[-8%]" data-parallax="0.08">
                <Image src={kundImage.image} alt={img(kundImage.id).alt} fill sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-mute" data-reveal>
              {img(kundImage.id).caption}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <SectionHeading id="place-title" index="01" eyebrow={h.place.eyebrow} title={richLines(h.place.title, locale)} />
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft" data-reveal>
              {h.place.paragraphs.map((p, i) => (
                <p key={i}>
                  <Rich text={p} locale={locale} strongClassName="font-semibold text-ink" />
                </p>
              ))}
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2" data-reveal>
              <div className="bg-paper p-6">
                <p className="font-display text-5xl text-sindoor">{h.place.panchTitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{h.place.panchText}</p>
              </div>
              <div className="bg-paper p-6">
                <p className="font-display text-5xl text-sindoor">{h.place.familiesValue}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  <Rich text={h.place.familiesText} locale={locale} linkClassName="underline decoration-ink/30 underline-offset-2 hover:decoration-sindoor" />
                </p>
              </div>
            </div>

            <div className="mt-10" data-reveal>
              <CtaLink href={lp('/learn-more')} variant="ghost">
                {h.place.cta}
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 02 Who we are ───────────── */}
      <section className="cv-auto bg-paper-2 px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="who-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12 lg:items-center">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <SectionHeading id="who-title" index="02" eyebrow={h.who.eyebrow} title={richLines(h.who.title, locale)} />
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-soft" data-reveal>
              {fill(h.who.text, { names })}
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {h.who.points.map((item, i) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-paper p-5 text-[0.98rem] leading-snug text-ink" data-reveal style={{ ['--d' as string]: i }}>
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sindoor" />
                  {item}
                </li>
              ))}
            </ul>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6" data-reveal>
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
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink-mute" data-reveal>
              {h.who.notOfficial}
            </p>
            <div className="mt-10" data-reveal>
              <CtaLink href={lp('/about')} variant="primary">
                {h.who.cta}
              </CtaLink>
            </div>
          </div>
          <figure className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <div className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden rounded-[1.75rem] bg-paper-3" data-reveal="clip">
              <div className="absolute inset-[-6%]" data-parallax="0.06">
                <Image
                  src={purohitPortrait.image}
                  alt={img('portrait').alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 35vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
            </div>
            <figcaption className="mx-auto mt-4 max-w-md text-sm text-ink-mute">{img('portrait').caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* ───────────── 03 How a visit works ───────────── */}
      <section className="cv-auto px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="steps-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="steps-title" index="03" eyebrow={h.steps.eyebrow} title={richLines(h.steps.title, locale)} />
              <p className="mt-8 max-w-sm text-lg leading-relaxed text-ink-soft" data-reveal>
                {h.steps.intro}
              </p>
              <div className="mt-8" data-reveal>
                <Link href={lp('/plan-your-visit')} className="link-draw inline-block py-1.5 font-semibold text-sindoor">
                  {h.steps.link}
                </Link>
              </div>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {h.steps.items.map((step, i) => (
              <li key={step.title} className="group grid grid-cols-[3.25rem_1fr] gap-6 border-t border-line py-10 sm:grid-cols-[6rem_1fr] sm:gap-10" data-reveal>
                <span className="font-display text-6xl leading-none tabular-nums text-sindoor/70 transition-colors duration-700 group-hover:text-sindoor sm:text-8xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-2">
                  <h3 className="font-display text-3xl text-ink sm:text-4xl">{step.title}</h3>
                  <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── 04 Rites ───────────── */}
      <section className="bg-dusk px-5 py-24 text-paper sm:px-8 lg:px-12 lg:py-36" aria-labelledby="rites-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <SectionHeading id="rites-title" index="04" eyebrow={h.rites.eyebrow} title={richLines(h.rites.title, locale)} tone="light" />
            <p className="max-w-md text-paper/70" data-reveal>
              {h.rites.intro}
            </p>
          </div>
          <ul className="mt-16 border-t border-paper/15">
            {featuredRites.map((rite, i) => (
              <li key={rite.id} data-reveal style={{ ['--d' as string]: i }}>
                <Link
                  href={lp(serviceHrefs[rite.id])}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 overflow-hidden border-b border-paper/15 py-8 sm:gap-10 sm:py-10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-sindoor transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                  />
                  <span className="relative eyebrow tabular-nums text-marigold">{String(i + 1).padStart(2, '0')}</span>
                  <span className="relative">
                    <span className="block font-display text-[clamp(2rem,5vw,4.5rem)] leading-none transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                      {rite.title}
                    </span>
                    <span className="mt-3 block max-w-2xl text-[0.98rem] text-paper/65 group-hover:text-paper/90">{rite.summary}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-xl transition-all duration-700 group-hover:-rotate-45 group-hover:border-paper group-hover:bg-paper group-hover:text-sindoor"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12" data-reveal>
            <CtaLink href={lp('/services')} variant="ghost-light">
              {h.rites.cta}
            </CtaLink>
          </div>
        </div>
      </section>

      {/* ───────────── Gallery strip ───────────── */}
      <section className="cv-auto py-24 lg:py-36" aria-labelledby="moments-title">
        <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <SectionHeading id="moments-title" eyebrow={h.moments.eyebrow} title={richLines(h.moments.title, locale)} />
          <Link href={lp('/gallery')} className="link-draw hidden shrink-0 py-1.5 font-semibold text-sindoor sm:inline-block" data-reveal>
            {h.moments.link}
          </Link>
        </div>
        <div
          className="mt-14 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 pb-6 sm:scroll-pl-8 sm:px-8 lg:scroll-pl-12 lg:px-12 [scrollbar-width:none]"
          tabIndex={0}
          aria-label={h.moments.stripLabel}
        >
          {stripImages.map((photo, i) => (
            <figure key={photo.image} className="relative w-min shrink-0 snap-start" data-reveal style={{ ['--d' as string]: i }}>
              <div
                className="relative h-[clamp(18rem,58vh,34rem)] max-w-[86vw] overflow-hidden rounded-3xl bg-paper-3"
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              >
                <Image
                  src={photo.image}
                  alt={img(photo.id).alt}
                  fill
                  sizes="(max-width: 640px) 86vw, 50vw"
                  className="object-cover transition-transform duration-[1.6s] ease-out-expo hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 text-sm text-ink-mute">{img(photo.id).caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────────── 05 Getting there ───────────── */}
      <section className="cv-auto bg-paper-2 px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="travel-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="travel-title"
              index="05"
              eyebrow={h.travel.eyebrow}
              title={richLines(h.travel.title, locale)}
              intro={<p>{h.travel.intro}</p>}
            />
            <dl className="mt-10 divide-y divide-line border-y border-line">
              {[
                [h.travel.byRail, `${t.travel.railStation}, ${t.travel.railShort}`],
                [h.travel.byAir, fill(h.travel.airDetail, { distance: t.travel.airportDistance })],
                [h.travel.byRoad, t.travel.road.slice(0, 3).map((r) => `${r.from} ${r.distance}`).join(' · ')],
              ].map(([term, detail]) => (
                <div key={term} className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr]" data-reveal>
                  <dt className="eyebrow pt-1 text-sindoor">{term}</dt>
                  <dd className="text-[1.02rem] leading-relaxed text-ink">{detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 flex gap-3 rounded-2xl border-2 border-sindoor bg-paper p-5 text-[0.98rem] leading-relaxed text-ink" data-reveal>
              <HiOutlineShieldExclamation aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-sindoor" />
              <span>{fill(t.scam.short, { phone: company.phoneDisplay })}</span>
            </p>
            <div className="mt-10" data-reveal>
              <CtaLink href={lp('/plan-your-visit')} variant="primary">
                {h.travel.cta}
              </CtaLink>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <MapFacade
              location="meeting"
              labels={t.map}
              names={{ meeting: t.company.meetingPointName, ritual: t.company.ritualLocationName }}
              className="aspect-4/5 sm:aspect-4/3 lg:aspect-auto lg:h-full lg:min-h-[32rem]"
            />
          </div>
        </div>
      </section>

      {/* ───────────── Testimonials ───────────── */}
      {publishedReviews.length > 0 && (
        <section className="cv-auto px-5 pt-24 sm:px-8 lg:px-12 lg:pt-36" aria-labelledby="words-title">
          <div className="mx-auto max-w-[1440px]">
            <SectionHeading id="words-title" eyebrow={h.words.eyebrow} title={richLines(h.words.title, locale)} />
            <ul className="mt-14 grid gap-px overflow-hidden rounded-4xl bg-line md:grid-cols-3" data-reveal>
              {publishedReviews.map((review) => (
                <li key={review.id} className="flex flex-col justify-between gap-8 bg-paper p-8 lg:p-10">
                  <blockquote lang="en">
                    <span aria-hidden="true" className="block font-display text-7xl leading-[0.6] text-sindoor/70">
                      “
                    </span>
                    <p className="mt-4 font-display text-[1.6rem] leading-snug text-ink">{review.reviewText}</p>
                  </blockquote>
                  <p className="text-sm font-semibold text-ink-soft">— {review.clientName}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ───────────── FAQ ───────────── */}
      <section className="cv-auto px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="faq-title" eyebrow={h.faq.eyebrow} title={richLines(h.faq.title, locale)} />
              <p className="mt-8 max-w-sm text-ink-soft" data-reveal>
                <Rich text={h.faq.intro} locale={locale} linkClassName="link-draw font-semibold text-sindoor" />
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={t.faqs} locale={locale} />
          </div>
        </div>
      </section>

      {/* ───────────── Enquiry ───────────── */}
      <section id="enquire" className="cv-auto px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36" aria-labelledby="enquire-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 rounded-4xl bg-paper-2 p-6 sm:p-10 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-5">
            <SectionHeading id="enquire-title" eyebrow={h.enquire.eyebrow} title={richLines(h.enquire.title, locale)} intro={<p>{h.enquire.intro}</p>} />
          </div>
          <div className="lg:col-span-7" data-reveal>
            <EnquiryBuilder text={t.enquiry} />
          </div>
        </div>
      </section>
    </>
  );
}
