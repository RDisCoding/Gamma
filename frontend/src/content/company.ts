/*
 * Business facts that are the same in every language: phone numbers, email,
 * address (as used in structured data), map pins and the enquiry form inbox.
 * All wording shown on the site lives in src/i18n/en.ts, gu.ts and hi.ts.
 *
 * Confirmed by the owner on 14 Oct 2026.
 */
export const company = {
  name: 'Matrugaya Tirth',
  // "Sidhpur Matrugaya Pandit" was removed: it is another business's name.
  alternateNames: ['Matrugaya Tirth Sidhpur', 'માતૃગયા તીર્થ', 'मातृगया तीर्थ'],
  phoneDisplay: '+91 98795 16707',
  phoneE164: '+919879516707',
  whatsappE164: '+919879516707',
  email: 'matrugayatirth@gmail.com',
  postalAddress: {
    street: 'Uplisheri, near Nilkanth Mahadev, Brahmania Pole',
    locality: 'Siddhpur',
    district: 'Patan',
    region: 'Gujarat',
    postalCode: '384151',
    country: 'IN',
  },
  /** The purohits' home near Ashapuri Mata, where families meet them first. */
  meetingPoint: {
    lat: 23.91662,
    lng: 72.37701,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=23.91662021%2C72.37700854',
    embedUrl: 'https://www.google.com/maps?q=23.91662021,72.37700854&z=17&output=embed',
  },
  ritualLocation: {
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bindu+Sarovar%2C+Siddhpur%2C+Gujarat',
    embedUrl: 'https://www.google.com/maps?q=Bindu+Sarovar,+Siddhpur,+Gujarat&output=embed',
  },
  /** Languages the purohits speak (structured data). */
  languages: ['Gujarati', 'Hindi', 'English'],
  purohits: [
    { name: 'Shri Alkeshbhai Dave', phoneDisplay: '+91 98795 16707', phoneE164: '+919879516707' },
    { name: 'Shri Hiteshbhai Pandya (Patil)', phoneDisplay: '+91 85113 04407', phoneE164: '+918511304407' },
  ],
  formEndpoint: 'https://formsubmit.co/matrugayatirth@gmail.com',
  // Quotes are given on request; add rows (in every language file) only if fixed prices are published.
  priceGuide: [] as { label: string; amount: string; includes: string }[],
  googleBusinessProfileUrl: null as string | null,
};
