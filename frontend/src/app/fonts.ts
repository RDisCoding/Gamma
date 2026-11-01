import {
  Hanken_Grotesk,
  Hind,
  Hind_Guntur,
  Hind_Madurai,
  Hind_Vadodara,
  Instrument_Serif,
  Noto_Sans_Kannada,
  Noto_Serif_Gujarati,
  Tiro_Devanagari_Hindi,
  Tiro_Kannada,
  Tiro_Tamil,
  Tiro_Telugu,
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

/* Telugu, Kannada and Tamil pages: a Tiro display face for headings (as for
   Hindi) and a plain sans for body text. Only downloaded on those pages. */
export const teluguDisplay = Tiro_Telugu({ subsets: ['telugu'], weight: '400', variable: '--font-tiro-te', display: 'swap', preload: false });
export const kannadaDisplay = Tiro_Kannada({ subsets: ['kannada'], weight: '400', variable: '--font-tiro-kn', display: 'swap', preload: false });
export const tamilDisplay = Tiro_Tamil({ subsets: ['tamil'], weight: '400', variable: '--font-tiro-ta', display: 'swap', preload: false });
export const teluguBody = Hind_Guntur({ subsets: ['telugu'], weight: ['400', '600'], variable: '--font-body-te', display: 'swap', preload: false });
export const kannadaBody = Noto_Sans_Kannada({ subsets: ['kannada'], variable: '--font-body-kn', display: 'swap', preload: false });
export const tamilBody = Hind_Madurai({ subsets: ['tamil'], weight: ['400', '600'], variable: '--font-body-ta', display: 'swap', preload: false });

export const englishFonts = [instrument, hanken, tiro, gujaratiDisplay].map((f) => f.variable).join(' ');
export const indicFonts = [
  instrument,
  hanken,
  tiro,
  gujaratiDisplay,
  gujaratiBody,
  devanagariBody,
  teluguDisplay,
  kannadaDisplay,
  tamilDisplay,
  teluguBody,
  kannadaBody,
  tamilBody,
]
  .map((f) => f.variable)
  .join(' ');
