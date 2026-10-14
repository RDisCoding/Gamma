/**
 * Languages in the navbar language menu.
 *   own: true  → the site has its own, editable translation (src/i18n/<code>.ts)
 *   own: false → the English page is translated automatically by Google Translate
 * `code` is also the Google Translate language code. Add, remove or reorder
 * entries here — the menu updates automatically.
 */
export const languages = [
  { code: 'en', name: 'English', native: 'English', own: true },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', own: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', own: true },
  { code: 'mr', name: 'Marathi', native: 'मराठी', own: false },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', own: false },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', own: false },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', own: false },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', own: false },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', own: false },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', own: false },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', own: false },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', own: false },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', own: false },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي', own: false },
  { code: 'ur', name: 'Urdu', native: 'اردو', own: false },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', own: false },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];
