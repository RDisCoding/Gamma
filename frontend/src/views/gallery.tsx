import Image from 'next/image';
import type { Metadata } from 'next';
import { richLines } from '../components/i18n/Rich';
import JsonLd from '../components/seo/JsonLd';
import PageHero from '../components/ui/PageHero';
import RelatedLinks from '../components/ui/RelatedLinks';
import { gallery, videos } from '../content/gallery';
import { getDictionary, type SiteLocale } from '../i18n';
import { breadcrumbSchema, graph, webPageSchema } from '../lib/schema';
import { pageMetadata } from '../lib/seo';

const PATH = '/gallery';

export function galleryMetadata(locale: SiteLocale): Metadata {
  const m = getDictionary(locale).galleryPage.meta;
  return pageMetadata({ locale, title: m.title, description: m.description, path: PATH });
}

export function GalleryView({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  const g = t.galleryPage;

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ locale, path: PATH, title: g.meta.title, description: g.meta.description, type: 'CollectionPage' }),
          breadcrumbSchema(locale, [{ name: g.breadcrumb, path: PATH }]),
        )}
      />
      <PageHero locale={locale} eyebrow={g.eyebrow} titleLines={richLines(g.title, locale)} crumbs={[{ name: g.breadcrumb, path: PATH }]} intro={<p>{g.intro}</p>} />

      <section className="px-5 pb-24 sm:px-8 lg:px-12" aria-label={g.photosLabel}>
        <div className="mx-auto max-w-[1440px] columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
          {gallery.map((photo, i) => (
            <figure key={photo.image} className="break-inside-avoid" data-reveal style={{ ['--d' as string]: i % 3 }}>
              <div className="overflow-hidden rounded-3xl bg-paper-3">
                <Image
                  src={photo.image}
                  alt={t.gallery.images[photo.id].alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                  className="h-auto w-full transition-transform duration-[1.6s] ease-out-expo hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-mute">{t.gallery.images[photo.id].caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-dusk px-5 py-24 text-paper sm:px-8 lg:px-12" aria-labelledby="videos-title">
        <div className="mx-auto max-w-[1440px]">
          <h2 id="videos-title" className="display-md" data-reveal>
            {g.videosTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-paper/70" data-reveal>
            {g.videosIntro}
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {videos.map((v, i) => {
              const text = t.gallery.videos[i];
              return (
                <a
                  key={v.youtubeId}
                  href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  data-reveal
                >
                  <div className="relative aspect-video overflow-hidden rounded-3xl bg-dusk-2">
                    {/* Plain <img>: the thumbnail is hosted by YouTube, outside the image pipeline. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-80 transition-[transform,opacity] duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-sindoor transition-transform duration-500 group-hover:scale-110">
                        ▶
                      </span>
                    </span>
                  </div>
                  <p lang="en" className="mt-4 font-display text-2xl">
                    {text.title}
                  </p>
                  <p className="mt-1 text-sm text-paper/60">
                    {text.description} {g.opensYoutube}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <RelatedLinks items={g.related} locale={locale} />
    </>
  );
}
