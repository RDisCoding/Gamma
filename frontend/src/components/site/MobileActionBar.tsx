import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { getDictionary, type SiteLocale } from '../../i18n';
import { telHref, whatsappHref } from '../../lib/contact';

/** Thumb-reach call and WhatsApp buttons on small screens. */
export default function MobileActionBar({ locale }: { locale: SiteLocale }) {
  const t = getDictionary(locale);
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={telHref()}
          data-cta="mobile_bar"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 text-[0.95rem] font-semibold text-ink"
        >
          <FaPhone aria-hidden="true" /> {t.common.call}
        </a>
        <a
          href={whatsappHref(t.common.defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="mobile_bar"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp text-[0.95rem] font-semibold text-paper"
        >
          <FaWhatsapp aria-hidden="true" /> {t.common.whatsapp}
        </a>
      </div>
    </div>
  );
}
