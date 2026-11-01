'use client';

import { useId, useMemo, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import type { Dictionary } from '../../i18n/en';
import { whatsappHref } from '../../lib/contact';

const fill = (text: string, value: string, key = 'value') => text.replace(`{${key}}`, value);

/**
 * Turns a few planning answers into a ready-to-send WhatsApp message, so the
 * purohit gets everything needed to reply with dates and a quote. Nothing is
 * stored or sent anywhere until the visitor taps the button.
 *
 * `text` labels the form in the page's language; `messageText` writes the
 * message in a language the purohits read (the same dictionary on English,
 * Gujarati and Hindi pages). Choices are kept by position so each maps to
 * the same option in both.
 */
export default function EnquiryBuilder({
  text,
  messageText = text,
  tone = 'dark',
}: {
  text: Dictionary['enquiry'];
  messageText?: Dictionary['enquiry'];
  tone?: 'dark' | 'light';
}) {
  const id = useId();
  const [ritual, setRitual] = useState(0);
  const [when, setWhen] = useState('');
  const [people, setPeople] = useState('');
  const [from, setFrom] = useState('');
  const [language, setLanguage] = useState(-1);
  const [needStay, setNeedStay] = useState(false);
  const [needTransport, setNeedTransport] = useState(false);
  const out = messageText;
  const m = out.message;

  const message = useMemo(() => {
    const lines = [fill(m.intro, out.rituals[ritual], 'ritual')];
    if (when) lines.push(fill(m.when, when));
    if (people) lines.push(fill(m.people, people));
    if (from) lines.push(fill(m.from, from));
    if (language >= 0) lines.push(fill(m.language, out.languageOptions[language]));
    const help = [needStay && m.helpStay, needTransport && m.helpTransport].filter(Boolean) as string[];
    if (help.length) lines.push(fill(m.help, help.join(m.helpJoin)));
    lines.push(m.signature);
    return lines.join('\n');
  }, [out, m, ritual, when, people, from, language, needStay, needTransport]);

  const light = tone === 'light';
  const field = `w-full rounded-2xl border px-4 py-3.5 text-[1rem] outline-none transition-colors focus:border-sindoor ${
    light ? 'border-paper/20 bg-paper/5 text-paper placeholder:text-paper/40' : 'border-ink/15 bg-paper text-ink placeholder:text-ink-mute'
  }`;
  const label = `mb-2 block text-sm font-medium ${light ? 'text-paper/80' : 'text-ink-soft'}`;

  return (
    <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} aria-describedby={`${id}-note`}>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-ritual`} className={label}>
          {text.ritual}
        </label>
        <select id={`${id}-ritual`} value={ritual} onChange={(e) => setRitual(Number(e.target.value))} className={field}>
          {text.rituals.map((r, i) => (
            <option key={r} value={i}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-when`} className={label}>
          {text.when}
        </label>
        <input id={`${id}-when`} value={when} onChange={(e) => setWhen(e.target.value)} placeholder={text.whenPlaceholder} className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-people`} className={label}>
          {text.people}
        </label>
        <input
          id={`${id}-people`}
          inputMode="numeric"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          placeholder={text.peoplePlaceholder}
          className={field}
        />
      </div>
      <div>
        <label htmlFor={`${id}-from`} className={label}>
          {text.from}
        </label>
        <input id={`${id}-from`} value={from} onChange={(e) => setFrom(e.target.value)} placeholder={text.fromPlaceholder} className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-lang`} className={label}>
          {text.language}
        </label>
        <select id={`${id}-lang`} value={language} onChange={(e) => setLanguage(Number(e.target.value))} className={field}>
          <option value={-1}>{text.noPreference}</option>
          {text.languageOptions.map((l, i) => (
            <option key={l} value={i}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={label}>{text.help}</legend>
        <div className="flex flex-wrap gap-3">
          {[
            [text.helpStay, needStay, setNeedStay] as const,
            [text.helpTransport, needTransport, setNeedTransport] as const,
          ].map(([name, checked, set]) => (
            <label
              key={name}
              className={`flex cursor-pointer items-center gap-3 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                checked ? 'border-sindoor bg-sindoor text-paper' : light ? 'border-paper/20 text-paper/80' : 'border-ink/15 text-ink-soft'
              }`}
            >
              <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => set(e.target.checked)} />
              {name}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className={`text-sm ${light ? 'text-paper/55' : 'text-ink-mute'}`}>
          {text.note}
        </p>
        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="enquiry_builder"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-whatsapp px-7 py-3 font-semibold text-paper transition-colors hover:bg-[#17603c]"
        >
          <FaWhatsapp aria-hidden="true" /> {text.send}
        </a>
      </div>
    </form>
  );
}
