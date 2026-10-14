/*
 * Google Translate website widget, loaded only once a visitor picks a language.
 *
 * How it works: the chosen language is stored in Google's `googtrans` cookie
 * (so it carries across pages and visits), the widget is loaded into a hidden
 * container, and its language list is driven programmatically once the list
 * has actually loaded.
 */
import { languages } from '../content/languages';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (options: Record<string, unknown>, elementId: string) => unknown;
      };
    };
  }
}

const HOLDER_ID = 'google_translate_element_hidden';
let loading: Promise<void> | null = null;

export function currentLanguage(): string {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[a-z-]+\/([a-z-]+)/i);
  return match && match[1] !== 'en' ? match[1] : 'en';
}

function cookieDomains(): string[] {
  const host = window.location.hostname;
  const isIp = /^[\d.]+$/.test(host) || host.includes(':');
  if (!host.includes('.') || isIp) return [''];
  return ['', `.${host.replace(/^www\./, '')}`];
}

export function setLanguageCookie(code: string | null) {
  for (const domain of cookieDomains()) {
    const scope = `; path=/${domain ? `; domain=${domain}` : ''}`;
    document.cookie = code
      ? `googtrans=/en/${code}${scope}; max-age=31536000; SameSite=Lax`
      : `googtrans=${scope}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

/**
 * Google Translate replaces text nodes with its own <font> elements. When React
 * later updates or removes one of those nodes it can throw and blank the page.
 * These guards make removeChild/insertBefore tolerate nodes that have moved —
 * the widely used workaround for facebook/react#11538.
 */
function guardDomAgainstTranslate() {
  const proto = Node.prototype as Node & { __mtPatched?: boolean };
  if (proto.__mtPatched) return;
  proto.__mtPatched = true;
  const originalRemove = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemove.call(this, child) as T;
  };
  const originalInsert = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return originalInsert.call(this, node, null) as T;
    return originalInsert.call(this, node, ref) as T;
  };
}

function loadWidget(): Promise<void> {
  if (loading) return loading;
  guardDomAgainstTranslate();
  loading = new Promise((resolve) => {
    window.googleTranslateElementInit = () => {
      const Ctor = window.google?.translate?.TranslateElement;
      if (Ctor && !document.getElementById(HOLDER_ID)?.childElementCount) {
        let holder = document.getElementById(HOLDER_ID);
        if (!holder) {
          holder = document.createElement('div');
          holder.id = HOLDER_ID;
          document.body.appendChild(holder);
        }
        new Ctor(
          { pageLanguage: 'en', includedLanguages: languages.filter((l) => !l.own).map((l) => l.code).join(','), autoDisplay: false },
          HOLDER_ID,
        );
      }
      resolve();
    };
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
  return loading;
}

function waitFor<T>(check: () => T | null, timeoutMs: number): Promise<T | null> {
  return new Promise((resolve) => {
    const started = Date.now();
    const tick = () => {
      const value = check();
      if (value) return resolve(value);
      if (Date.now() - started > timeoutMs) return resolve(null);
      setTimeout(tick, 100);
    };
    tick();
  });
}

/** Translates the page into `code`. Resolves false if the widget could not be driven. */
export async function translatePage(code: string): Promise<boolean> {
  setLanguageCookie(code);
  await loadWidget();
  // The widget's <select> exists before its options do — wait for the option
  // we need, otherwise the change is silently ignored.
  const combo = await waitFor(() => {
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    return select?.querySelector(`option[value="${code}"]`) ? select : null;
  }, 10000);
  if (!combo) return false;
  if (combo.value !== code) {
    combo.value = code;
    combo.dispatchEvent(new Event('change', { bubbles: true }));
  }
  return true;
}

/** Back to the original English page. A reload is the only reliable way to undo the widget. */
export function restoreEnglish() {
  setLanguageCookie(null);
  window.location.reload();
}
