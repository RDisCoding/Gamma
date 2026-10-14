import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { localePath, type SiteLocale } from '../../i18n/config';

interface Options {
  locale: SiteLocale;
  emClassName?: string;
  strongClassName?: string;
  linkClassName?: string;
}

const TOKEN = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

function parse(text: string, o: Options, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    const index = m.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    const key = `${keyPrefix}-${i++}`;
    if (m[1] !== undefined) {
      out.push(
        <strong key={key} className={o.strongClassName}>
          {parse(m[1], o, key)}
        </strong>,
      );
    } else if (m[2] !== undefined) {
      out.push(
        <em key={key} className={o.emClassName}>
          {parse(m[2], o, key)}
        </em>,
      );
    } else {
      const href = m[4];
      if (/^https?:\/\//.test(href)) {
        out.push(
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={o.linkClassName}>
            {m[3]}
          </a>,
        );
      } else {
        out.push(
          <Link key={key} href={localePath(o.locale, href)} className={o.linkClassName}>
            {m[3]}
          </Link>,
        );
      }
    }
    last = index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/**
 * Renders dictionary text with **bold**, *emphasis* and [links](/path).
 * Internal links get the current language prefix automatically.
 */
export default function Rich({ text, ...options }: { text: string } & Options) {
  return <>{parse(text, options, 'r')}</>;
}

/** Heading lines: each string becomes one line; *emphasis* is shown in sindoor red. */
export function richLines(lines: readonly string[], locale: SiteLocale): ReactNode[] {
  return lines.map((line, i) => (
    <Fragment key={i}>
      <Rich text={line} locale={locale} emClassName="text-sindoor" />
    </Fragment>
  ));
}
