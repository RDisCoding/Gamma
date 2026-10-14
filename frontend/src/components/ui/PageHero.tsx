import Link from 'next/link';
import type { ReactNode } from 'react';
import { getDictionary, localePath, type SiteLocale } from '../../i18n';

interface Crumb {
  name: string;
  path: string;
}

interface Props {
  locale: SiteLocale;
  eyebrow: string;
  /** Each entry is rendered as one line of the headline. */
  titleLines: ReactNode[];
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Small native-script word shown beside the title (e.g. Devanagari). */
  script?: { text: string; className: string };
}

/**
 * Inner-page header: breadcrumbs, a large serif title whose lines rise on
 * load (pure CSS, so it never waits for JavaScript), and a short answer-first
 * introduction.
 */
export default function PageHero({ locale, eyebrow, titleLines, intro, crumbs, children, script }: Props) {
  const t = getDictionary(locale);
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-24">
      <div className="mx-auto max-w-[1440px]">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label={t.common.breadcrumb} className="hero-rise mb-10 text-sm text-ink-mute" style={{ ['--d' as string]: 0 }}>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={localePath(locale, '/')} className="link-draw">
                  {t.common.home}
                </Link>
              </li>
              {crumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={localePath(locale, crumb.path)} className="link-draw">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow hero-rise text-sindoor" style={{ ['--d' as string]: 1 }}>
              {eyebrow}
            </p>
            <h1 className="display-lg mt-6 max-w-[18ch] text-ink">
              {titleLines.map((line, i) => (
                <span key={i} className="hero-line">
                  <span style={{ ['--d' as string]: i + 1 }}>{line}</span>{' '}
                </span>
              ))}
            </h1>
          </div>
          {script && (
            // Decorative native-script word, drawn from a data attribute so it stays out of the text content.
            <span
              aria-hidden="true"
              data-text={script.text}
              className={`hero-rise hidden text-[clamp(3rem,7vw,6rem)] leading-none text-sindoor/15 before:content-[attr(data-text)] lg:block ${script.className}`}
              style={{ ['--d' as string]: 3 }}
            />
          )}
        </div>

        {intro && (
          <div
            className="hero-rise mt-10 max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl"
            style={{ ['--d' as string]: titleLines.length + 1 }}
          >
            {intro}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
