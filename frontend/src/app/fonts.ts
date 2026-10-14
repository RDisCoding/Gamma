import {
  Hanken_Grotesk,
  Hind,
  Hind_Vadodara,
  Instrument_Serif,
  Noto_Serif_Gujarati,
  Tiro_Devanagari_Hindi,
} from 'next/font/google';

/* Latin — every page. */
export const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});
export const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' });

/* Devanagari and Gujarati display faces. One instance each, shared by every
   layout: two instances of the same family would both be declared under the
   same name and the browser could download the heavier one everywhere. On
   English pages they only draw small decorative accents. */
export const tiro = Tiro_Devanagari_Hindi({
  subsets: ['devanagari'],
  weight: '400',
  variable: '--font-tiro',
  display: 'swap',
  preload: false,
});
export const gujaratiDisplay = Noto_Serif_Gujarati({
  subsets: ['gujarati'],
  weight: '400',
  variable: '--font-noto-guj',
  display: 'swap',
  preload: false,
});

/* Gujarati and Hindi pages: body text in the script. */
export const gujaratiBody = Hind_Vadodara({
  subsets: ['gujarati'],
  weight: ['400', '600'],
  variable: '--font-body-guj',
  display: 'swap',
  preload: false,
});
export const devanagariBody = Hind({
  subsets: ['devanagari'],
  weight: ['400', '600'],
  variable: '--font-body-deva',
  display: 'swap',
  preload: false,
});

export const englishFonts = [instrument, hanken, tiro, gujaratiDisplay].map((f) => f.variable).join(' ');
export const indicFonts = [instrument, hanken, tiro, gujaratiDisplay, gujaratiBody, devanagariBody].map((f) => f.variable).join(' ');
