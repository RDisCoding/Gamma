import { company } from '../../content/company';
import type { SiteLocale } from '../../i18n/config';
import Rich from '../i18n/Rich';

interface Faq {
  id: string;
  question: string;
  answer: string;
}

/** Accessible accordion built on <details>, so answers are in the HTML and work without JavaScript. */
export default function FaqList({ faqs, locale }: { faqs: readonly Faq[]; locale: SiteLocale }) {
  return (
    <div className="border-t border-line">
      {faqs.map((faq, i) => (
        <details key={faq.id} id={faq.id} className="faq group border-b border-line" data-reveal style={{ ['--d' as string]: i % 4 }}>
          <summary className="flex items-start justify-between gap-6 py-6 text-left">
            <h3 className="font-display text-[1.45rem] leading-snug text-ink transition-colors group-hover:text-sindoor sm:text-[1.7rem]">
              {faq.question}
            </h3>
            <span
              aria-hidden="true"
              className="faq-icon mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 text-lg leading-none"
            >
              +
            </span>
          </summary>
          <div className="max-w-3xl pb-8 pr-10 text-[1.05rem] leading-relaxed text-ink-soft">
            <Rich text={faq.answer.replace('{phone}', company.phoneDisplay)} locale={locale} linkClassName="link-draw font-semibold text-sindoor" />
          </div>
        </details>
      ))}
    </div>
  );
}
