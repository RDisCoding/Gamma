import type { SiteLocale } from '../../i18n/config';
import Rich from './Rich';

/** Paragraphs from a dictionary array. */
export function Paragraphs({ items, locale }: { items: readonly string[]; locale: SiteLocale }) {
  return (
    <>
      {items.map((text, i) => (
        <p key={i}>
          <Rich text={text} locale={locale} />
        </p>
      ))}
    </>
  );
}

/** Bulleted (or numbered) list from a dictionary array. Renders nothing when empty. */
export function List({ items, locale, ordered = false }: { items: readonly string[]; locale: SiteLocale; ordered?: boolean }) {
  if (!items.length) return null;
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag>
      {items.map((text, i) => (
        <li key={i}>
          <Rich text={text} locale={locale} />
        </li>
      ))}
    </Tag>
  );
}
