import type { SiteLocale } from './config';
import { en, type Dictionary } from './en';
import { gu } from './gu';
import { hi } from './hi';

const dictionaries: Record<SiteLocale, Dictionary> = { en, gu, hi };

export function getDictionary(locale: SiteLocale): Dictionary {
  return dictionaries[locale];
}

/** Replaces {name} placeholders. Unknown placeholders are left as they are. */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export type { Dictionary };
export * from './config';
