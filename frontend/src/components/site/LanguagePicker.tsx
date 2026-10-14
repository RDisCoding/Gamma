'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import { languages } from '../../content/languages';
import { hreflang, localePath, splitLocale, type SiteLocale } from '../../i18n/config';
import { trackEvent } from '../../lib/analytics';
import { currentLanguage, restoreEnglish, setLanguageCookie, translatePage } from '../../lib/translate';

interface Labels {
  button: string;
  ownHeading: string;
  autoHeading: string;
  autoNote: string;
}

const own = languages.filter((l) => l.own);
const auto = languages.filter((l) => !l.own);
const scriptFont: Record<string, string> = { gu: 'font-guj', hi: 'font-deva' };

/**
 * Navbar language menu. English, Gujarati and Hindi link to the site's own
 * translated pages; every other language translates the English page with
 * Google Translate.
 */
export default function LanguagePicker({ locale, labels, tone = 'dark' }: { locale: SiteLocale; labels: Labels; tone?: 'dark' | 'light' }) {
  const pathname = usePathname();
  const { path } = splitLocale(pathname);
  const [open, setOpen] = useState(false);
  const [autoLang, setAutoLang] = useState('en');
  const [busy, setBusy] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Apply (or clean up) a Google Translate choice saved on an earlier visit.
  useEffect(() => {
    const saved = currentLanguage();
    if (saved === 'en') return;
    if (locale !== 'en' || own.some((l) => l.code === saved)) {
      // Our own translations never run through Google Translate.
      setLanguageCookie(null);
      if (locale === 'en' && (saved === 'gu' || saved === 'hi')) window.location.replace(localePath(saved, path));
      return;
    }
    const id = window.setTimeout(() => {
      setAutoLang(saved);
      translatePage(saved);
    }, 0);
    return () => window.clearTimeout(id);
  }, [locale, path]);

  // While Google Translate is active, follow internal links with a full page
  // load so the translator works on a fresh page instead of fighting React.
  useEffect(() => {
    if (autoLang === 'en') return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a');
      const href = link?.getAttribute('href');
      if (!link || !href || !href.startsWith('/') || href.startsWith('//') || link.target === '_blank' || link.dataset.lang) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(href);
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [autoLang]);

  // Close on outside click or Escape; arrow keys move between languages.
  useEffect(() => {
    if (!open) return;
    const items = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('[data-lang]') ?? []);
    const focusTimer = window.setTimeout(() => {
      (items().find((el) => el.getAttribute('aria-current') === 'true') ?? items()[0])?.focus();
    }, 60);
    const onPointer = (e: PointerEvent) => {
      if (!panel.current?.contains(e.target as Node) && !button.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
        return;
      }
      if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
      const list = items();
      const at = list.indexOf(document.activeElement as HTMLElement);
      if (at === -1) return;
      e.preventDefault();
      const next =
        e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (at + 1) % list.length : (at - 1 + list.length) % list.length;
      list[next].focus();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const chooseOwn = (code: SiteLocale, event: React.MouseEvent) => {
    trackEvent('language_change', { language: code, mode: 'site' });
    setLanguageCookie(null);
    if (code === locale) {
      event.preventDefault();
      setOpen(false);
      if (autoLang !== 'en') restoreEnglish();
    }
  };

  const chooseAuto = async (code: string) => {
    trackEvent('language_change', { language: code, mode: 'google' });
    setOpen(false);
    if (locale !== 'en') {
      // Google Translate works from the English page.
      setLanguageCookie(code);
      window.location.assign(localePath('en', path));
      return;
    }
    setAutoLang(code);
    setBusy(true);
    const ok = await translatePage(code);
    setBusy(false);
    if (!ok) window.location.reload();
  };

  const currentCode = locale !== 'en' ? locale : autoLang;
  const current = languages.find((l) => l.code === currentCode) ?? languages[0];
  const pill =
    tone === 'light'
      ? 'border-paper/30 text-paper hover:border-paper'
      : `border-ink/15 text-ink hover:border-ink/40 ${open ? 'bg-paper' : 'bg-paper/60'}`;

  return (
    <div translate="no" className="notranslate relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${labels.button}: ${current.native}`}
        className={`inline-flex h-11 items-center gap-2 rounded-full border px-3.5 text-sm font-semibold transition-colors duration-500 ${pill}`}
      >
        <HiOutlineGlobeAlt aria-hidden="true" className={`h-[1.15rem] w-[1.15rem] ${busy ? 'animate-spin' : ''}`} />
        <span className={`max-w-26 truncate max-[359px]:hidden ${scriptFont[current.code] ?? ''}`}>{current.native}</span>
        <svg aria-hidden="true" viewBox="0 0 12 12" className={`h-2.5 w-2.5 opacity-60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      <div
        ref={panel}
        id={panelId}
        inert={!open}
        className={`fixed inset-x-3 top-19 z-70 origin-top-right rounded-[1.75rem] border border-line bg-paper p-5 text-ink shadow-[0_30px_80px_-24px_rgba(30,22,18,0.45)] transition-[opacity,transform,visibility] duration-300 ease-out-expo sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-120 sm:p-6 ${
          open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2 scale-[0.98] opacity-0'
        }`}
      >
        <p className="eyebrow text-sindoor">{labels.ownHeading}</p>
        <ul className="mt-4 grid grid-cols-3 gap-2">
          {own.map((l) => {
            const active = currentCode === l.code || (l.code === 'en' && locale === 'en' && autoLang === 'en');
            return (
              <li key={l.code}>
                <a
                  href={localePath(l.code as SiteLocale, path)}
                  hrefLang={hreflang[l.code as SiteLocale]}
                  lang={l.code}
                  data-lang={l.code}
                  aria-current={active ? 'true' : undefined}
                  onClick={(e) => chooseOwn(l.code as SiteLocale, e)}
                  className={`group flex h-full flex-col justify-between gap-3 rounded-2xl border p-3.5 transition-colors duration-300 focus-visible:outline-offset-2 ${
                    active ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink/40 hover:bg-paper-2'
                  }`}
                >
                  <span className={`text-[1.35rem] leading-tight ${scriptFont[l.code] ?? 'font-display'}`}>{l.native}</span>
                  <span className={`flex items-center justify-between text-xs ${active ? 'text-paper/70' : 'text-ink-mute'}`}>
                    {l.name}
                    {active && <span aria-hidden="true">✓</span>}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 border-t border-line pt-5">
          <p className="eyebrow text-sindoor">{labels.autoHeading}</p>
          <p className="mt-1.5 text-xs text-ink-mute">{labels.autoNote}</p>
          <ul className="mt-4 grid max-h-[42vh] grid-cols-2 gap-1 overflow-y-auto sm:max-h-none sm:grid-cols-3">
            {auto.map((l) => {
              const active = autoLang === l.code;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    lang={l.code}
                    data-lang={l.code}
                    aria-current={active ? 'true' : undefined}
                    onClick={() => chooseAuto(l.code)}
                    className={`flex w-full flex-col items-start gap-0.5 rounded-xl px-3 py-2 text-left transition-colors duration-200 ${
                      active ? 'bg-sindoor text-paper' : 'hover:bg-paper-2'
                    }`}
                  >
                    <span className="text-[1rem] leading-snug">{l.native}</span>
                    <span className={`text-[0.7rem] ${active ? 'text-paper/75' : 'text-ink-mute'}`}>{l.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
