import { company } from '../../content/company';
import { site } from '../../content/site';
import { getDictionary, localePath, type SiteLocale } from '../../i18n';

/**
 * Plain HTML form posted to FormSubmit, which emails the enquiry to the
 * purohits and then returns the visitor to /thank-you (where the lead is
 * counted). Works without JavaScript.
 */
export default function EmailEnquiryForm({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale).emailForm;
  const field =
    'w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3.5 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-sindoor';
  return (
    <form action={company.formEndpoint} method="POST" data-lead-form="contact_page" className="grid gap-5">
      <input type="hidden" name="_subject" value={t.subject} />
      <input type="hidden" name="_next" value={`${site.url}${localePath(locale, '/thank-you')}`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-name" className="mb-2 block text-sm font-medium text-ink-soft">
            {t.name}
          </label>
          <input id="enq-name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="enq-phone" className="mb-2 block text-sm font-medium text-ink-soft">
            {t.phone}
          </label>
          <input id="enq-phone" name="phone" type="tel" required autoComplete="tel" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="enq-message" className="mb-2 block text-sm font-medium text-ink-soft">
          {t.message}
        </label>
        <textarea id="enq-message" name="message" required rows={5} className={`${field} resize-y`} />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-mute">{t.note.replace('{email}', company.email)}</p>
        <button
          type="submit"
          className="inline-flex min-h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-7 py-3 font-semibold text-paper transition-colors hover:bg-sindoor"
        >
          {t.submit}
        </button>
      </div>
    </form>
  );
}
