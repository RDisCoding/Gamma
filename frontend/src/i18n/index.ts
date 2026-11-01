import { messageLocale, type SiteLocale } from './config';
import { en, type Dictionary } from './en';
import { gu } from './gu';
import { hi } from './hi';
import { kn } from './kn';
import { ta } from './ta';
import { te } from './te';

const dictionaries: Record<SiteLocale, Dictionary> = { en, gu, hi, te, kn, ta };

export function getDictionary(locale: SiteLocale): Dictionary {
  return dictionaries[locale];
}

/**
 * The dictionary for text a visitor sends to the purohits — WhatsApp messages
 * and the email subject — so it always arrives in a language they read.
 */
export function getMessages(locale: SiteLocale): Dictionary {
  return dictionaries[messageLocale(locale)];
}

/** Replaces {name} placeholders. Unknown placeholders are left as they are. */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export type { Dictionary };
export * from './config';
