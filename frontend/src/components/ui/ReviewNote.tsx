import { site } from '../../content/site';
import { getDictionary, type SiteLocale } from '../../i18n';
import Rich from '../i18n/Rich';

/** Date stamp and the standing caveat that the purohit confirms details for each family. */
export default function ReviewNote({ locale, text }: { locale: SiteLocale; text?: string }) {
  const t = getDictionary(locale);
  const date = new Date(site.lastUpdated).toLocaleDateString(t.locale.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <aside className="rounded-3xl border border-line bg-paper-2/60 p-6 text-sm leading-relaxed text-ink-soft">
      <p>
        <span className="font-semibold text-ink">{t.common.lastUpdated}:</span> <time dateTime={site.lastUpdated}>{date}</time>
      </p>
      <p className="mt-2">
        <Rich text={text ?? t.reviewNote.default} locale={locale} />
      </p>
    </aside>
  );
}
