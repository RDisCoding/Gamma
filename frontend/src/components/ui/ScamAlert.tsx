import { FaPhone } from 'react-icons/fa';
import { HiOutlineShieldExclamation } from 'react-icons/hi';
import { company } from '../../content/company';
import { fill, getDictionary, type SiteLocale } from '../../i18n';
import { telHref } from '../../lib/contact';

/**
 * Scam warning. "band" is a full-width alert for the homepage; "card" sits
 * inside visit, contact and booking content.
 */
export default function ScamAlert({ locale, variant = 'card', className = '' }: { locale: SiteLocale; variant?: 'band' | 'card'; className?: string }) {
  const t = getDictionary(locale);
  const phone = company.phoneDisplay;

  const steps = (
    <ol className="mt-6 grid gap-3">
      {t.scam.steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden="true"
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              variant === 'band' ? 'bg-paper text-sindoor' : 'bg-sindoor text-paper'
            }`}
          >
            {i + 1}
          </span>
          <span className="pt-0.5 leading-snug">{fill(step, { phone })}</span>
        </li>
      ))}
    </ol>
  );

  if (variant === 'band') {
    return (
      <section role="note" aria-labelledby="scam-band-title" className={`bg-sindoor-deep px-5 py-12 text-paper sm:px-8 lg:px-12 lg:py-16 ${className}`}>
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-sindoor-deep">
              <HiOutlineShieldExclamation aria-hidden="true" className="h-4 w-4" />
              {t.scam.label}
            </p>
            <h2 id="scam-band-title" className="display-md mt-5">
              {t.scam.title}
            </h2>
          </div>
          <div className="text-[1.05rem] text-paper/90 lg:col-span-6 lg:col-start-7">
            <p className="leading-relaxed">{t.scam.body}</p>
            {steps}
            <a
              href={telHref()}
              data-cta="scam_alert"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 py-3 font-semibold text-sindoor-deep transition-colors hover:bg-marigold"
            >
              <FaPhone aria-hidden="true" /> {fill(t.common.callNumber, { phone })}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <aside role="note" className={`rounded-3xl border-2 border-sindoor bg-paper p-6 text-ink sm:p-7 ${className}`}>
      <p className="eyebrow inline-flex items-center gap-2 text-sindoor">
        <HiOutlineShieldExclamation aria-hidden="true" className="h-5 w-5" />
        {t.scam.label}
      </p>
      <p className="mt-3 font-display text-[1.75rem] leading-tight text-ink">{t.scam.title}</p>
      <p className="mt-3 leading-relaxed text-ink-soft">{t.scam.body}</p>
      {steps}
      <a
        href={telHref()}
        data-cta="scam_alert"
        className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-sindoor px-6 py-3 font-semibold text-paper transition-colors hover:bg-sindoor-deep"
      >
        <FaPhone aria-hidden="true" /> {fill(t.common.callNumber, { phone })}
      </a>
    </aside>
  );
}
