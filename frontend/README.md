# Matrugaya Tirth frontend

Static Next.js site for [matrugayatirth.com](https://www.matrugayatirth.com), in English, Gujarati and Hindi.

**SEO, analytics and content decisions are documented in [`docs/SEO-HANDOVER.md`](docs/SEO-HANDOVER.md).**

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (English), `/gu` (Gujarati) or `/hi` (Hindi).

## Production build

```bash
npm run lint
npm run build
```

The static site is generated in `out/`. `npm start` serves it locally for a final check.

## Editing the words on the site

Every word on the site lives in one file per language, all with the same structure:

| Language | File | URL |
|---|---|---|
| English (source) | `src/i18n/en.ts` | `/about` |
| Gujarati | `src/i18n/gu.ts` | `/gu/about` |
| Hindi | `src/i18n/hi.ts` | `/hi/about` |
| Telugu | `src/i18n/te.ts` | `/te/about` |
| Kannada | `src/i18n/kn.ts` | `/kn/about` |
| Tamil | `src/i18n/ta.ts` | `/ta/about` |

Find the English sentence in `en.ts`, then change the same key in the other files. Inside any text you can use `**bold**`, `*emphasis*` (red in headings), `[link text](/learn-more)` (the language prefix is added automatically) and `{phone}`. If a key is missing or misspelt in one language, `npm run build` stops and names it.

The other languages in the navbar menu (Marathi, Bengali, Malayalam and so on) are translated automatically by Google Translate from the English page. Those automatic translations happen in the visitor's browser, so Google Search never sees them — only the languages in the table above can be found in search. The list is in `src/content/languages.ts`.

**Messages sent to the purohits** (the ready-made WhatsApp texts and the email subject) always use a language the purohits read. On Gujarati and Hindi pages they come from `gu.ts` / `hi.ts`; on every other language's pages they come from `en.ts`, so a family reading the Telugu page still sends an English message. This is set by `purohitLocales` in `src/i18n/config.ts`.

### Adding another language with its own translation

1. Copy `src/i18n/en.ts` to `src/i18n/<code>.ts`, rename the export and translate the values.
2. Add the code to `siteLocales`, `prefixedLocales` and `hreflang` in `src/i18n/config.ts`, and import it in `src/i18n/index.ts`. The sitemap, hreflang links and the `/<code>/…` pages follow automatically.
3. In `src/content/languages.ts`, set `own: true` for that language.
4. Add its fonts in `src/app/fonts.ts` (and to `indicFonts`), plus a `html:lang(<code>)` block and the `:lang(<code>)` selector lists in `globals.css` if the script needs them.
5. Have a native speaker read it before it goes live.

## Where things are

| What | File |
|---|---|
| All page text, menus, FAQs, offerings, captions (per language) | `src/i18n/en.ts`, `gu.ts`, `hi.ts`, `te.ts`, `kn.ts`, `ta.ts` |
| Phone, WhatsApp, email, address, map pins, form inbox | `src/content/company.ts` |
| Menu order, site URL, "last updated" date | `src/content/site.ts` |
| Photos (files and sizes) and videos | `src/content/gallery.ts` |
| Which services have their own page | `src/content/services.ts`, `src/content/service-details.ts` |
| Testimonials (shown only when `verified: true`) | `src/content/reviews.ts` |
| Languages in the navbar menu | `src/content/languages.ts`, `src/lib/translate.ts` |
| Page layouts (shared by all languages) | `src/views/*.tsx` |
| Routes | `src/app/(en)/…` (English), `src/app/[locale]/…` (all other languages) |
| Page metadata, hreflang, structured data | `src/lib/seo.ts`, `src/lib/schema.ts` |
| robots.txt and sitemap.xml | `src/app/robots.ts`, `src/app/sitemap.ts` |
| Fonts | `src/app/fonts.ts` |
| Design tokens and motion | `src/app/globals.css` |

### Images

`next build` and `next dev` first run `scripts/optimize-images.mjs`, which writes responsive WebP versions of every JPEG/PNG in `public/gallery` and `public/img` to `public/_img/` (git-ignored). `image-loader.ts` points `<Image>` at those files, because a static export has no image server. Widths are configured in `image-widths.mjs`.

### Analytics

Vercel Analytics is always on. To add Google Analytics 4, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the Vercel project's environment variables and redeploy. Events (`click_call`, `click_whatsapp`, `directions_click`, `lead_form_submit`, `ai_referral`, `language_change`) are sent by `src/components/analytics/` and the language menu.

### Search Console and Bing verification

The Google Search Console code (HTML tag method) is in `verification.google` in `src/content/site.ts`, and the tag is output on the home page. For Bing Webmaster Tools, put its code (only the `content="…"` value) in `verification.bing` and deploy. Keep these codes in place — removing one can un-verify the site.

After changing content, update `lastUpdated` in `src/content/site.ts` and run another production build.
