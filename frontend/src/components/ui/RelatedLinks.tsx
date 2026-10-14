import Link from 'next/link';
import { getDictionary, localePath, type SiteLocale } from '../../i18n';

interface Item {
  href: string;
  title: string;
  text: string;
}

/** End-of-page links to the next most useful pages. */
export default function RelatedLinks({ items, locale }: { items: readonly Item[]; locale: SiteLocale }) {
  const t = getDictionary(locale);
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12" aria-labelledby="related-title">
      <div className="mx-auto max-w-[1440px]">
        <h2 id="related-title" className="eyebrow text-sindoor" data-reveal>
          {t.common.keepReading}
        </h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] bg-line md:grid-cols-3" data-reveal>
          {items.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="group flex min-h-56 flex-col justify-between bg-paper p-8 transition-colors duration-500 hover:bg-paper-2"
            >
              <span className="font-display text-3xl leading-tight text-ink">{item.title}</span>
              <span className="mt-6 flex items-end justify-between gap-6 text-[0.98rem] text-ink-soft">
                <span>{item.text}</span>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:-rotate-45 group-hover:border-sindoor group-hover:bg-sindoor group-hover:text-paper"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
