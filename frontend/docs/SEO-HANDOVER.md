# matrugayatirth.com — SEO, AI search & redesign handover

**Prepared:** 14 October 2026 · **Scope:** audit, implementation and QA of the website in `frontend/`.
**Status:** implemented and tested locally; **not yet deployed** — several items need the owner's confirmation first (see §10).

> Nothing here guarantees rankings, AI citations or a number of enquiries. The work makes the site
> accurate, crawlable, fast and measurable; results must be judged from Search Console, Bing and
> enquiry data over the next 30/60/90 days (§8).

---

## Contents

1. [Baseline audit](#1-baseline-audit)
2. [Competitors and keyword map](#2-competitors-and-keyword-map)
3. [Information architecture](#3-information-architecture)
4. [What was changed in the code](#4-what-was-changed-in-the-code)
5. [Page inventory](#5-page-inventory)
6. [Technical SEO configuration](#6-technical-seo-configuration)
7. [AI search and local discovery](#7-ai-search-and-local-discovery)
8. [Measurement](#8-measurement)
9. [QA results](#9-qa-results)
10. [Owner verification checklist](#10-owner-verification-checklist)
11. [Outstanding dependencies and the next 90 days](#11-outstanding-dependencies-and-the-next-90-days)
12. [How to update the site](#12-how-to-update-the-site)
13. [Fact sources](#13-fact-sources)

---

## 1. Baseline audit

Checked on 14 Oct 2026 against the live site (Vercel, Next.js 16.0.7 static export) and the repository.
"Verified" means tested directly; nothing below is assumed from general SEO checklists.

### 1A. Technical SEO

| # | Check | Live result (before) | Severity | Resolution | Status |
|---|---|---|---|---|---|
| 1 | Public pages respond | `/`, `/services`, `/learn-more`, `/gallery` → 200. `/about`, `/contact` → 404 (did not exist) | — | New pages created | Done |
| 2 | HTTPS & canonical host | `http://www` → 308 → `https://www` ✔. **`https://matrugayatirth.com` → 307 (temporary)** to www; `http://` apex takes 2 hops (308 → 307) | Medium | Vercel → Project → Domains → apex → redirect to `www` with **308 Permanent** | **Owner / Vercel access** |
| 3 | Crawlable internal links | Only 4 routes; nav used `/#about`, `/#reviews` anchors; no footer link list | Medium | Crawlable header menu + footer link columns + related links on every page | Done |
| 4 | robots.txt | **404** | High | `src/app/robots.ts` → `/robots.txt` | Done |
| 5 | XML sitemap | **404** | High | `src/app/sitemap.ts` → `/sitemap.xml` (12 URLs) | Done |
| 6 | Canonical tags | **None** on any page | High | Self-referencing canonicals on every page | Done |
| 7 | noindex / robots meta | None found ✔ | — | `/thank-you` deliberately `noindex, follow` | Done |
| 8 | Content in HTML | Yes — static export renders all text server-side ✔ | — | Kept; scroll animations never hide text without JS | Done |
| 9 | Mobile links & forms | Phone/WhatsApp links worked. **Two different form inboxes**: homepage → `matrugayatirth@gmail.com`, other pages → `matrugayatirthboss@gmail.com` | High | One form endpoint in `company.ts` | Done — **owner to confirm inbox** |
| 10 | Duplicate / thin pages | 14 services shown as 1–2 lines each, no URLs; no duplicates | Medium | Services hub + 3 genuine detail pages | Done |
| 11 | Titles, descriptions, OG | **Every page:** title "Matrugaya Tirth", description "Professional Pandit Services for all your spiritual needs."; no Open Graph, no JSON-LD | High | Unique titles/descriptions; OG + Twitter cards; 1200×630 OG image from a real photo | Done |
| 12 | Headings & alt text | Heading order failures; nested `<main>`; alt text like "About", "Pooja"; map iframe titled "Ashapuri Mata Location" | Medium | One H1 per page, logical H2/H3, descriptive alt text | Done |
| 13 | Mobile performance (lab) | **Home: LCP 16.8 s, 11.1 MB** (7 MB decorative video + 1–2.5 MB PNGs, `images.unoptimized`) | High | See §6 Performance | Done |
| 14 | Third-party scripts | Google Translate loaded on every page + a 100 ms polling loop and full-DOM MutationObserver | Medium | Translate loads only when a visitor picks a language | Done |
| 15 | Map | Embed pinned "Ashapuri Mata" at 23.91662, 72.37701 — **~1.6 km from Bindu Sarovar**, no temple of that name in OpenStreetMap | High | Map now points to Bindu Sarovar; loads on click | Done — **owner to confirm pins** |

### 1B. Performance (Lighthouse 12.6, mobile lab, simulated throttling)

Before = live site. After = production build served locally (Vercel's CDN and Brotli should do at least as well).
Lab numbers are diagnostic; judge real users by Search Console's Core Web Vitals report (field data was unavailable — the PageSpeed API quota was exhausted and no Search Console access).

| Page | Perf before → after | LCP before → after | Page weight before → after | A11y | SEO |
|---|---|---|---|---|---|
| Home | 70 → 87 (desktop 100) | 16.8 s → 3.8 s (observed unthrottled: 0.2 s) | 11,062 KB → 604 KB | 89 → 100 | 91 → 100 |
| Services | 75 → 92 | 8.9 s → 3.3 s | 7,116 KB → ~420 KB | 94 → 100 | 100 → 100 |
| Learn more | 99 → 91* | 1.4 s → 3.4 s* | 287 KB → ~500 KB* | 96 → 100 | 100 → 100 |

\*Learn-more was a short text page; it is now a long, sourced article with an image, so it is heavier. Its observed LCP is 0.23 s.
CLS is 0 on every page. Remaining mobile cost is mainly React hydration and network simulation; there is no single large fix left.

### 1C. Content, identity and trust (verified issues)

| Issue found | Evidence | Severity | What was done |
|---|---|---|---|
| About text named **another business** | Live about text: "Sidhpur Matrugaya Pandit, operating at Bindu Sarovar Mukti Dham Road". That name and street match a competitor's Justdial listing (Prashant Hariprasad Pandya) | **Critical** | Removed; also removed from structured data |
| Unsupported claims "40+ Years Experience", "100000+ Happy Devotees" | No evidence on the site or in public sources | High | Removed pending evidence (§10) |
| Testimonials of unknown origin | 3 five-star reviews, no source; one says "my **father's** Matrugaya" | High | Hidden (`verified: false`) until origin/permission confirmed |
| Price "₹5,000 to ₹25,000 or more" | Not confirmed as current | Medium | Hidden; cost page explains factors and has a ready-made price table that appears once figures are confirmed |
| FAQ contradictions | "On the banks of the holy Saraswati River" vs Bindu Sarovar; "any time after the mother's demise"; "complete transportation services" | Medium | FAQs rewritten, answer-first, hedged where tradition varies |
| `/learn-more` factual errors | "Nabhigaya = Siddhpur" (Nabhi-gaya is Jajpur, Odisha); "since 2007" (works date from ~2012, museum 2017); celebrity list unverified; Garuda Purana and Rigveda claims unverified; "first marriage of this world" contradicts the Bhagavatam; the "Punah-rupi" verse is Shankaracharya's *Bhaja Govindam*, not Kapila's teaching | High | Page rewritten with every section labelled **Scripture / Tradition / History** and linked sources (§13) |
| Stock/third-party images shown as services | `16_sanskar.png` and `uttar_kriya.png` carry watermarks; several look AI-generated; `gallery/10.png` is a watermarked deity image of unknown origin | Medium | No longer displayed. Only the ritual photos supplied with the site are used |
| Identity ambiguity | "Matrugaya Tirth" is also the generic name of the place; matrugaya.com uses "Matrugaya Tirth Kshetra" in its schema | High | Clear identity statement on every page footer, About page and FAQ: tirth purohits, **not** the official Bindu Sarovar / government site |
| Second purohit's numbers differ elsewhere | `/learn-more` lists Shri Hiteshbhai Pandya (Patil) at 8511304407; siddhpurmatrugaya.com lists a Hiteshkumar Pandya "Patil" at 9825504407 / 9512145318 | Medium | Kept as on the old site — **owner to confirm** relationship and number |

### 1D. Search performance baseline — access needed

No Google Search Console, Google Analytics, Bing Webmaster Tools or Google Business Profile access was available, so **no query, click, ranking or conversion data was used or invented.** What could be observed publicly:

- A general web search engine had crawled the homepage (title "Matrugaya Tirth"); `/services`, `/learn-more` and `/gallery` never appeared in results.
- No external citations of the phone numbers, email, purohit names or Uplisheri address were found (Justdial masks numbers; Google Maps could not be read).
- `site:` and quoted-domain searches returned nothing — confirm in Search Console.

To establish the real baseline, the owner should provide (§11): Search Console (Domain property) access, Bing Webmaster Tools access, a GA4 property, and Google Business Profile manager access.

---

## 2. Competitors and keyword map

Research method: fetched each site's pages and parsed titles, meta tags, headings and JSON-LD; searched the target queries with a US-based engine (positions are indicative, not Google India).

### 2A. Comparison

| Competitor | Strengths | Content or service gaps | Opportunity for Matrugaya Tirth | Priority |
|---|---|---|---|---|
| matrugaya.com (Pandit Gauravkumar Pandya) | ~37 landing pages; eligibility table; named three-generation lineage with photos; travel/food/stay page; LocalBusiness + Person + FAQ schema; strong contact form | Thin, templated service pages; no prices or deposit terms; brand name close to ours | Distinct identity statement and consistent NAP; fewer but genuinely useful pages; transparent cost page | P0 |
| matrugayashraddhpooja.in (Pandit Daxesh Pandya) | Deepest FAQ/NRI/eligibility content; ₹1,000 advance and "2 families a day" stated; real Marathi pages with hreflang; rich schema | Key copy in builder embeds (weaker crawling); inconsistent durations and distances | Server-rendered guide that answers the same questions directly; clear booking terms once confirmed | P0 |
| matrugayapujasiddhpur.com | Package pitch (stay/food/transport); group pooja; state pages | Lorem-ipsum still live; no meta description; six H1s; broken WhatsApp/tel links | Out-rank on quality and reliability | P1 |
| matrugayasiddhpur.com / sidhpurmatrugaya.com | Old domains; sidhpurmatrugaya.com names real stays and has a CPREEC backlink | Garbled machine-translated copy; no schema | Low threat; a better stay guide; pitch the same CPREEC page | P2 |
| siddhpurmatrugaya.com (Hiteshkumar Pandya "Patil") | 35-years claim; 4 languages | Thin pages | If affiliated, cross-link and align numbers | P1 (owner) |
| Inditales (travel blog) | Authority; detailed temple-complex description | No ritual, priest or cost information | Outreach for a "practical guide" link | P2 |
| Wikipedia / Wikivoyage / Gujarat Tourism / patan.nic.in | Entity authority; rank for almost every query | No providers; Wikivoyage "Sleep" empty | Cite them; be the practical complement | P2 |

Competitors commonly cover what our site lacked: eligibility (daughters, other relatives), when to perform, step-by-step vidhi, what to bring, booking mechanics, travel and stay, Matrugaya vs Gaya, named priests. Contradictions between them (e.g. whether a husband may perform it for his wife; 2 vs 4 hours) are why our pages state that **practice varies and the purohit confirms** instead of copying a rule.

### 2B. Keyword map (one primary page per intent)

| Cluster | Primary intent | Target page | Supporting questions | Internal links | Conversion |
|---|---|---|---|---|---|
| Matrugaya pooja / puja Siddhpur / Sidhpur; matru shraddh Siddhpur; book Matrugaya pooja | Transactional, local | **`/` (primary landing page)** | Where, who conducts it, how long, how to book | Guide, cost, visit, about | WhatsApp / call |
| What is Matrugaya pooja; vidhi; who can perform; daughters; samagri; how long; when | Informational | `/matrugaya-pooja-guide` | Eligibility, timing, steps, duration, what to bring | Home, learn-more, cost, visit | WhatsApp |
| Matrugaya pooja cost / price / dakshina | Commercial | `/cost-and-booking` | Price factors, advance, what a quote includes | Guide, services | Quote request |
| Bindu Sarovar significance; Matru Gaya; Kapila Devahuti | Informational | `/learn-more` | Scripture vs tradition vs history | Guide, gallery | — |
| How to reach Bindu Sarovar / Siddhpur; where to stay | Travel | `/plan-your-visit` | Train, air, road, stay, timing | Guide, cost, contact | Confirm on WhatsApp |
| Matrugaya pandit / purohit Siddhpur | Local | `/about` (+ home) | Who are they, languages | Contact | Call |
| Pind daan / tarpan Siddhpur (and "Matrugaya pind daan") | Transactional | `/services/pind-daan-tarpan` | Siddhpur vs Gaya, Bihar | Guide | WhatsApp |
| Narayan bali Siddhpur | Transactional | `/services/narayan-bali` | When appropriate | Services | WhatsApp |
| Tripindi shraddha Siddhpur | Transactional | `/services/tripindi-shraddha` | Difference from Matrugaya | Services | WhatsApp |
| Contact / phone number | Navigational | `/contact` | Hours, addresses | — | Call / form |

Spelling variants (Siddhpur/Sidhpur, Pooja/Puja, Shraddha/Shraddh/Shradh, Matrugaya/Matru Gaya) appear naturally in copy and "also called" lines — **no page per spelling**. Hindi/Gujarati demand could not be measured; see §7C.

---

## 3. Information architecture

| URL | Before | After — role | Why a separate URL |
|---|---|---|---|
| `/` | Mixed homepage, 40+/100000+ badges, video hero | **Primary page for "Matrugaya Pooja in Siddhpur"**: identity, place, how a visit works, rites, travel, FAQ, enquiry builder | Main transactional intent |
| `/matrugaya-pooja-guide` | — | Complete informational guide | Different intent (learning, not booking); avoids a near-duplicate of `/` |
| `/learn-more` | History page with errors | Sourced significance page (URL kept) | Existing URL; distinct "significance" intent |
| `/services` | 14 cards, no detail | Hub grouped into ancestral rites / other pujas | Overview |
| `/services/pind-daan-tarpan`, `/narayan-bali`, `/tripindi-shraddha` | — | Detail pages | Distinct rites with distinct searches; others stay on the hub until there is enough real information |
| `/plan-your-visit` | — | Travel and stay | Distinct travel intent |
| `/cost-and-booking` | — | Price factors, questions to ask, booking | Distinct commercial intent |
| `/about` | `/#about` section | Who the purohits are | Trust and identity |
| `/contact` | Footer section | NAP, map, both enquiry options | Navigational |
| `/gallery` | Gallery + videos | Real photos with accurate captions; third-party videos labelled | Kept |
| `/thank-you` | — | Form confirmation (`noindex`) | Measures completed form leads |

Every page also exists in **Gujarati (`/gu/…`) and Hindi (`/hi/…`)** with its own translated title, description, headings and structured data. Each page links its three versions with `hreflang` (`en-IN`, `gu-IN`, `hi-IN`, `x-default` → English), and the sitemap lists all 36 indexable URLs with their alternates.

No redirects were needed: every existing URL is kept.

---

## 4. What was changed in the code

All work is uncommitted in the working tree. A previous session had left empty files (`service-pages.ts`, `about/page.tsx`, `contact/page.tsx`, `robots.ts`, `sitemap.ts`, `og-image.svg`) that broke the build; these were written properly or removed.

**Configuration**
- `next.config.ts` — custom image loader for the static export; widths from `image-widths.mjs`.
- `image-loader.ts`, `image-widths.mjs`, `scripts/optimize-images.mjs` — build-time WebP variants in `public/_img/` (git-ignored).
- `package.json` — `prebuild`/`predev` run the image script; `next` and `eslint-config-next` 16.0.7 → **16.3.8** (clears the Next.js security advisories); added `lenis` 1.3.26; `sharp` 0.35.5 (dev).
- `vercel.json` — cache headers for `/_img/*`, basic security headers.
- `.gitignore` — `public/_img/`.

**App (`src/app`)** — `layout.tsx` (fonts, metadata base, header/footer, analytics), `template.tsx` (route transition), `globals.css` (design system + motion), `page.tsx`, and new routes: `matrugaya-pooja-guide`, `plan-your-visit`, `cost-and-booking`, `about`, `contact`, `services/[slug]`, `thank-you`, `not-found.tsx`, `robots.ts`, `sitemap.ts`. `learn-more`, `services`, `gallery` rewritten.

**Content (`src/content`)** — `company.ts` (single source of truth, with owner-to-confirm notes), `site.ts`, `faqs.ts`, `services.ts`, `service-details.ts`, `gallery.ts` (photos + videos), `reviews.ts` (hidden until verified), `travel.ts`, `types.ts`. Removed: `learn-more.ts`, `videos.ts`, empty `service-pages.ts`.

**Components & libraries** — `components/site/*` (Header with full-screen menu, Footer, MobileActionBar, LanguagePicker, BinduMark), `components/ui/*` (CtaLink, PageHero, SectionHeading, FaqList, Marquee, RotatingSeal, MapFacade, EnquiryBuilder, EmailEnquiryForm, RelatedLinks, ReviewNote, Toc), `components/motion/MotionProvider.tsx`, `components/analytics/*`, `components/seo/JsonLd.tsx`, `lib/seo.ts`, `lib/schema.ts`, `lib/analytics.ts`, `lib/contact.ts`. Removed: old Navbar, FloatingActions, LocationMap, ScrollToTop and the three `*Client.tsx` files with duplicated footers.

**Assets** — `public/og-image.jpg` (1200×630, from a real ritual photo).

**Design** — editorial redesign: warm paper / sindoor / marigold palette, Instrument Serif + Hanken Grotesk (Devanagari and Gujarati accents), temple-arch image frames, a rotating "Matru Gaya" seal, script marquee, full-screen menu, scroll-scrubbed reveals (pure CSS where supported), Lenis smooth scrolling, parallax, and a sticky mobile call/WhatsApp bar. All motion is disabled for visitors who prefer reduced motion.

---

## 5. Page inventory

| URL | `<title>` | H1 | JSON-LD |
|---|---|---|---|
| `/` | Matrugaya Pooja in Siddhpur, Gujarat \| Matrugaya Tirth | Matrugaya Pooja in Siddhpur, Gujarat | LocalBusiness, WebSite, Person ×2, WebPage, FAQPage |
| `/matrugaya-pooja-guide` | Matrugaya Pooja Guide: Vidhi, Eligibility & Samagri | Matrugaya Pooja, step by step | Article, BreadcrumbList, FAQPage |
| `/learn-more` | Significance of Bindu Sarovar & Matru Gaya, Siddhpur | Why Siddhpur is Matru Gaya | Article, BreadcrumbList |
| `/plan-your-visit` | How to Reach Bindu Sarovar, Siddhpur \| Visit Guide | Getting to Bindu Sarovar | Article, BreadcrumbList |
| `/cost-and-booking` | Matrugaya Pooja Cost & Booking in Siddhpur \| Matrugaya Tirth | A clear quote, before you travel | WebPage, BreadcrumbList, FAQPage |
| `/services` | Shraddha Rituals & Pujas in Siddhpur \| Matrugaya Tirth | Rites we conduct in Siddhpur | CollectionPage, BreadcrumbList |
| `/services/pind-daan-tarpan` | Pind Daan & Tarpan in Siddhpur, Gujarat \| Matrugaya Tirth | Pind Daan & Tarpan | WebPage, Service, BreadcrumbList, FAQPage |
| `/services/narayan-bali` | Narayan Bali Shraddha in Siddhpur, Gujarat \| Matrugaya Tirth | Narayan Bali Shraddha | WebPage, Service, BreadcrumbList, FAQPage |
| `/services/tripindi-shraddha` | Tripindi Shraddha in Siddhpur, Gujarat \| Matrugaya Tirth | Tripindi Shraddha | WebPage, Service, BreadcrumbList, FAQPage |
| `/about` | About Us: Tirth Purohits in Siddhpur \| Matrugaya Tirth | Tirth purohits of Siddhpur | LocalBusiness, Person ×2, AboutPage, BreadcrumbList |
| `/contact` | Contact the Purohits, Siddhpur \| Matrugaya Tirth | Speak to a purohit | LocalBusiness, ContactPage, BreadcrumbList |
| `/gallery` | Gallery: Rituals at Bindu Sarovar \| Matrugaya Tirth | At Bindu Sarovar, Siddhpur | CollectionPage, BreadcrumbList |
| `/thank-you` | Thank you \| Matrugaya Tirth (noindex) | Thank you. We will be in touch. | — |

---

## 6. Technical SEO configuration

**Canonical strategy.** `https://www.matrugayatirth.com` without trailing slash (matches Vercel's existing behaviour). `metadataBase` + `alternates.canonical` on every page via `lib/seo.ts`. Fix the apex 307 in Vercel (§1A #2).

**robots.txt** (`src/app/robots.ts`): all search and AI-search crawlers allowed; training crawlers in a separate group controlled by one switch (§7A); sitemap declared.

**sitemap.xml** (`src/app/sitemap.ts`): the 12 indexable URLs with `lastmod` from `site.lastUpdated`. Submit it in Search Console and Bing after deployment.

**Metadata.** Unique title and description per page; Open Graph + Twitter `summary_large_image`; `lang="en-IN"`; theme colour.

**Structured data** (`lib/schema.ts`). Only information visible on the page:
- `LocalBusiness` (name, alternate name, description, URL, image, telephone, email, postal address, area served, languages, members). **Deliberately omitted:** `geo`, `openingHoursSpecification`, `priceRange`, `aggregateRating` — not verified.
- `Person` for the two purohits; `Service` on rite pages; `Article` on guides (author/publisher = the organisation; add a named reviewer once the purohit reviews them); `BreadcrumbList`; `WebSite`/`WebPage`.
- `FAQPage` mirrors visible FAQs for machine readability only. **Google retired FAQ rich results on 7 May 2026**, so do not expect a search feature from it.
- Validated with the Schema.org validator: **0 errors, 0 warnings** (home, guide, about, service page). Run Google's Rich Results Test on the live URLs after deployment.

**Performance.**
- Images: build-time WebP at 10 widths with correct `sizes`; the hero image is `priority`; others lazy. Example: `aboutus2.png` 1.9 MB → 78–146 KB.
- Removed the 7 MB decorative hero video (a stock mandala loop).
- Google Maps (~1 MB) loads only when a visitor taps "Show map here"; "Open in Google Maps" works immediately.
- Google Translate loads only when a language is chosen; the 100 ms polling loop is gone.
- Fonts self-hosted by `next/font`; Devanagari/Gujarati accents use `display: optional` (no layout shift).
- Scroll reveals are pure CSS scroll-driven animations in Chrome/Edge/Safari 26+, so anything on screen at load paints immediately (observed LCP ≈ first paint). `content-visibility: auto` on light below-the-fold home sections. No blur effects on mobile.
- CLS 0 on all pages.

**Accessibility.** One H1 per page, skip link, labelled forms, `<details>` FAQs, visible focus rings, ≥ 24 px targets, full-screen menu is `inert` and hidden when closed (Escape closes it and returns focus), reduced-motion respected, all text ≥ WCAG AA contrast.

---

## 7. AI search and local discovery

### 7A. Crawler access decisions

| Crawler | Purpose | Setting |
|---|---|---|
| Googlebot, Bingbot | Search (Bing also grounds Copilot) | Allowed |
| OAI-SearchBot, ChatGPT-User | ChatGPT search / user-requested fetches | Allowed |
| Claude-SearchBot, Claude-User | Claude search / user-requested fetches | Allowed |
| PerplexityBot | Perplexity search index | Allowed |
| GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot | Model training (Google-Extended also covers Gemini grounding) | **Allowed (unchanged) — owner decision.** Set `ALLOW_AI_TRAINING_CRAWLERS = false` in `src/app/robots.ts` to opt out; search visibility is unaffected |

On 14 Oct 2026 the live site returned 200 to requests carrying the Googlebot, Bingbot, OAI-SearchBot, GPTBot, ClaudeBot, Claude-SearchBot and PerplexityBot user-agent strings, so no Vercel firewall rule blocks them by user agent today. (This cannot prove IP-based rules are absent — confirm in Vercel → Firewall, and check Search Console/Bing crawl stats after deployment.) If Vercel Bot Protection or a firewall is enabled later, allow these crawlers. No `llms.txt` or special AI markup was added — Google's AI guidance (updated 10 Jul 2026) says none is needed.

**How the content is shaped for AI answers** (without writing "for AI"): each page opens with a direct answer in bold, headings are the questions families ask, tradition is labelled as tradition with sources, and the identity statement says exactly who the visitor is contacting.

### 7B. Google Business Profile (owner action)

Whether a profile exists could not be determined. Before creating one, search Google Maps for the phone number and name, and check for profiles a previous agency may have created.

- **Name:** exactly as used in real life (`company.name`, currently "Matrugaya Tirth") — no added keywords.
- **Category:** choose the closest genuine category (e.g. "Religious organization" or a priest/religious-services category, whichever Google offers and is accurate) — avoid "Hindu temple", which would misrepresent the business.
- **Address vs service area:** if families do not visit the Uplisheri address, hide the address and set a service area of Siddhpur; otherwise show it. Do **not** place the pin on Bindu Sarovar unless the business is located there.
- **Phone, website, hours:** match the site (+91 98795 16707; `https://www.matrugayatirth.com`; hours only once confirmed).
- **Photos:** the real ritual photos and the purohits; no stock images.
- **Reviews:** ask families after the rite, with a short link; never pay for or script reviews; reply to every review. Once the profile exists, set `googleBusinessProfileUrl` in `company.ts` (it is then added to `sameAs` and can be linked from the About page).

### 7C. Citations, outreach and languages

Legitimate opportunities (in priority order): Justdial/IndiaMART-style listings **only** with consistent NAP; Inditales (practical-guide link request); ecoheritage.cpreec.org's Siddhpur page (lists a competitor); Wikivoyage's empty Siddhpur "Sleep"/"Do" sections (factual edits, no promotion); Gujarati news features (Gujarat Samachar, DeshGujarat) around Kartik season; YouTube creators who film Bindu Sarovar (offer to explain the rite on camera). Avoid paid links, link farms and mass directory submissions.

**Languages (owner's choice: "both").**
- **Own, editable translations** for Gujarati and Hindi — every word on the site lives in `src/i18n/en.ts`, `gu.ts` and `hi.ts` (same keys in each). These are real pages at `/gu/…` and `/hi/…`, so they can rank in Gujarati and Hindi searches. They were drafted with AI using a fixed glossary (so "Matrugaya" is always માતૃગયા / मातृगया) and **must be read by the owner before launch** (§10).
- **Google Translate for 13 more languages** (Marathi, Bengali, Telugu, Tamil, Kannada, Malayalam, Punjabi, Odia, Assamese, Nepali, Sindhi, Urdu, Sanskrit) — it translates the English page in the browser, is labelled "automatic" in the menu, and is not indexed. The choice is stored in Google's `googtrans` cookie; while active, internal links load as full pages so the translator and React never fight over the same text (`src/lib/translate.ts`).
- The language menu (`src/components/site/LanguagePicker.tsx`) lists both groups; the list itself is in `src/content/languages.ts`. To promote a language from automatic to owned, see the README ("Adding another language").

---

## 8. Measurement

### 8A. Events (implemented and tested)

| Event | Fires when | Parameters |
|---|---|---|
| `click_call` | Any `tel:` link is clicked | `cta_location` (hero, header, footer, mobile_bar, menu, contact_page, …), `page_path` |
| `click_whatsapp` | Any `wa.me` link is clicked | same |
| `directions_click` | Any Google Maps link is clicked | same |
| `lead_form_submit` | `/thank-you` loads **after** a form submit (counted once; not on reload) | `form_location`, `page_path` |
| `ai_referral` | First page view of a session arriving from chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com or claude.ai (referrer or `utm_source`) | `ai_source` |

No names, phone numbers or message text are ever sent. **A click is an enquiry opportunity, not a booking.**

**To switch on GA4:** create a GA4 property, then set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX` in Vercel → Project → Settings → Environment Variables and redeploy. Mark `click_whatsapp`, `click_call` and `lead_form_submit` as key events. Vercel Analytics also receives the events (custom events need a Vercel Pro plan to view).

**Confirmed bookings** cannot be seen by the website. Keep a simple sheet: date of enquiry · how they found us (ask!) · first channel (WhatsApp/call/form) · rite · booked yes/no · date of rite.

### 8B. Search Console & Bing

1. Add a **Domain** property for `matrugayatirth.com` (DNS verification) — covers www/apex/http/https.
2. Submit `https://www.matrugayatirth.com/sitemap.xml`; request indexing for `/`, `/matrugaya-pooja-guide`, `/plan-your-visit`, `/cost-and-booking`.
3. Bing Webmaster Tools: import from Search Console, submit the sitemap, enable **AI Performance** (citations in Copilot/Bing AI answers).
4. Check Search Console's "Generative AI performance" report where available.

### 8C. Monthly report (one page)

| Section | Metric | Source |
|---|---|---|
| Visibility | Clicks, impressions, CTR, avg. position — split **branded** ("matrugaya tirth", "matrugayatirth") vs **non-branded** | Search Console |
| Intent groups | Clicks/impressions for each keyword cluster in §2B, by landing page | Search Console (regex filters) |
| AI | Bing AI citations & cited pages; `ai_referral` sessions by source | Bing WMT, GA4 |
| Local | Profile views, calls, direction requests, website clicks, new reviews | Google Business Profile |
| Enquiries | `click_whatsapp`, `click_call`, `lead_form_submit` by landing page and source | GA4 |
| Outcomes | Enquiries → confirmed bookings (from the bookings sheet) | Owner |
| Health | Indexed pages, Core Web Vitals (mobile), crawl errors | Search Console |
| Actions | 3 things to do next month | — |

Review at **30, 60 and 90 days** after deployment against the first month's numbers (the baseline). AI answers vary by query, date and user, so treat manual spot-checks as anecdotes, not measurements.

---

## 9. QA results

Tested on the production build (`npm run build`) served locally, 14 Oct 2026.

| Test | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | Pass |
| ESLint | Pass |
| Production build (Next 16.3.8, static export) | Pass — 18 routes |
| `npm audit --omit=dev` | 0 vulnerabilities (dev-only `braces` advisory remains; fix requires a breaking `--force`) |
| Internal links & `#anchors` (all pages) | 0 broken |
| External citation links (12) | All return 200 |
| Titles / H1 / canonical / robots meta | Unique per page; 1 H1 each; `/thank-you` noindex |
| JSON-LD | Parses on every page; Schema.org validator 0 errors / 0 warnings |
| Lighthouse mobile (lab) | Perf 82–92 · Accessibility **100** · Best practices 96* · SEO **100** |
| Lighthouse desktop (lab) | Perf 98–100 · Accessibility **100** · SEO **100** |
| Gujarati / Hindi pages (lab, mobile, median of 3) | Perf 78 / 76 (English 83 in the same runs) · Accessibility **100** · SEO **100**. The gap is the script fonts (~70–80 KB) and heavier text layout |
| Language versions | 36 indexable pages (12 × en/gu/hi), each with `lang`, canonical and `hreflang` alternates; sitemap lists all with alternates; Schema.org validator 0 errors on gu/hi pages |
| Language menu | en → gu → Tamil (Google) → hi → en tested end-to-end: correct URLs, `lang`, translated headings, cookie cleared when switching to an owned language, no page errors |
| Horizontal overflow at 390 px and 1440 px | None on any page |
| Enquiry events (headless Chrome, `gtag` stubbed, FormSubmit blocked) | All five events fire with correct parameters; lead counted once |
| Menu | Opens/closes, Escape returns focus, background locked, `inert`/hidden when closed |
| Reduced motion | All content visible, no animations |
| No-JS | All text present in HTML; reveals never hide content without JS |

\*The only best-practice flag is the `/_vercel/insights` script 404, which exists only off Vercel.

**Not tested here (needs a deployment or access):** real phones (iOS Safari / Android Chrome), FormSubmit delivery to the inbox, Google's Rich Results Test and URL Inspection, field Core Web Vitals.

---

## 10. Owner answers (14 Oct 2026) and what is still open

**Answered and applied to the site**

| Topic | Owner's answer | Where it is on the site |
|---|---|---|
| Business name | "Matrugaya Tirth" | `company.name` |
| Address / meeting point | Families come to the purohits' home in Uplisheri, near Ashapuri Mata (the old map pin, 23.91662, 72.37701), then go to Bindu Sarovar together. Agents at Bindu Sarovar approach visitors, so families should call and come to the house first | `company.meetingPoint`, `touts` warning on home, visit, contact pages and FAQ; LocalBusiness `geo` |
| Purohits | Shri Alkeshbhai Dave (+91 98795 16707) and Shri Hiteshbhai Pandya (Patil) (+91 85113 04407); About photo shows Alkeshbhai (left) and Hiteshbhai (right) | `company.purohits`, `purohitPortrait` caption |
| Enquiry inbox | matrugayatirth@gmail.com | `company.formEndpoint` |
| Hours | No fixed hours — call anytime; call before visiting | `company.callTimes` |
| Services | All 14 offered; rites can also be performed online | `services.ts`, guide and FAQ |
| Languages spoken | Gujarati, Hindi, English; the website itself should be readable in every language in the menu | `company.languages`; navbar language menu (`content/languages.ts`) |
| Duration | About 3–4 hours | Guide, FAQ |
| Samagri, priests, extras | Families may bring their own samagri or the purohits arrange it (dakshina accordingly); priests arranged as needed; extras listed separately | `content/offerings.ts` → cost page "Additional offerings" |
| Hotel / travel / guide | Arranged on request, charged separately | FAQ, cost and visit pages |
| Booking | Advance payment confirms the booking; prices on request | Cost page, FAQ |
| Government booking | Not part of the Gujarat Pavitra Yatradham Vikas Board system — private arrangements | Cost page and FAQ |
| "40+ years", "1,00,000+ devotees" | Keep (no documentary records, stated by the owner) | `company.stats` on home and About |
| Testimonials, gallery photos | Permission confirmed | `reviews.ts` (`verified: true`) |
| Stock images | Delete unused | 14 files removed from `public/img/` |
| AI training crawlers | Allow | `ALLOW_AI_TRAINING_CRAWLERS = true` |
| Google Business Profile | None exists yet | §7B — create one |

**Still open**
- [ ] Read the Gujarati and Hindi versions (`/gu`, `/hi`) and correct any wording in `src/i18n/gu.ts` / `hi.ts` — especially religious terms, the scam warning and the WhatsApp message templates.
- [ ] Purohit review of `/matrugaya-pooja-guide`, `/services/*` and `/learn-more`; then add "Reviewed by" to those pages.
- [ ] Create the Google Business Profile (§7B) and set `googleBusinessProfileUrl` in `company.ts`.
- [ ] Account work in §11.

## 11. Outstanding dependencies and the next 90 days

**Needed from the owner / accounts:** Vercel project access (apex 308 redirect, `NEXT_PUBLIC_GA_MEASUREMENT_ID`), Search Console (Domain property), Bing Webmaster Tools, GA4, Google Business Profile manager access, and the §10 answers.

**Before deploying:** ideally complete the purohit review (§10), then deploy and run the post-deploy checks:
`curl -I https://matrugayatirth.com/` (expect 308) · `/robots.txt` and `/sitemap.xml` return 200 · Rich Results Test on `/`, the guide and a service page · URL Inspection → Request indexing · a real test enquiry by form, WhatsApp and call from a phone.

| When | Priority work |
|---|---|
| Days 0–14 (P0) | Owner answers; deploy; 308 redirect; Search Console + Bing + GA4 set up; sitemap submitted; Business Profile claimed/created and aligned; first month = baseline |
| Days 15–45 (P1) | Publish confirmed prices/booking terms; add purohit reviewer names; permissioned testimonials or Google review link; replace the remaining stock imagery with real photos (purohits, the precinct, a family consent-cleared ceremony); start review requests after every rite |
| Days 46–90 (P2) | Use Search Console queries to decide the next guide (likely "Matrugaya vs Gaya" or an NRI/out-of-state planning guide); a short original video explaining the rite (then add VideoObject); first reviewed Gujarati or Hindi page; outreach to Inditales, CPREEC, Gujarati media before Kartik |

---

## 12. How to update the site

- **Any words on the site, in any language:** `src/i18n/en.ts` (English), `gu.ts` (Gujarati), `hi.ts` (Hindi). Change the same key in each file. Formatting: `**bold**`, `*emphasis*`, `[link](/path)`, `{phone}`. A missing or misspelt key stops the build and names it.
- **Phone, WhatsApp, email, address, map pins, form inbox:** `src/content/company.ts`. Prices: add rows to `priceGuide` and the table appears on `/cost-and-booking`.
- **Services:** names and text in the language files (`services.groups`, `serviceDetail.items`); which ones get their own page in `src/content/services.ts` and `service-details.ts`.
- **Photos:** add the file to `public/gallery/`, an entry (real dimensions) to `src/content/gallery.ts`, and its `alt`/`caption` under `gallery.images` in each language file. Responsive WebP versions are generated on the next `npm run dev` / `npm run build`.
- **Testimonials:** `src/content/reviews.ts` — set `verified: true` and `source` only with permission.
- **Languages in the menu:** `src/content/languages.ts`.
- **After any content change:** update `lastUpdated` in `src/content/site.ts` (drives "Last updated" and the sitemap), then `npm run lint && npm run build`.

---

## 13. Fact sources

| Fact used on the site | Source |
|---|---|
| Bindu Sarovar, Kardama, Devahuti, Kapila (SB 3.21–3.33; 3.21.38–39; 3.25.5; 3.33.31) | vedabase.io, Srimad Bhagavatam Canto 3 |
| "Among perfected beings I am Kapila" | Bhagavad Gita 10.26 (vedabase.io) |
| Siddhpur as Matru Gaya; Panch Sarovar; three kunds (Gyan Vapika, Alpa Sarovar, Bindu Sarovar); Parashurama tradition; Kartik fair; ~103 km from Ahmedabad | gujarattourism.com/north-zone/patan/sidhpur.html |
| Bindu Sarovar as Matru Tarpan place; ~115 km from Ahmedabad airport | patan.nic.in |
| ~47,100 families in a year; ~200 families at once; facilities; e-rickshaws; peak months; works from ~2012 | english.loktej.com (24 Sep 2024, citing the Gujarat Pavitra Yatradham Vikas Board) |
| Online shraddh booking/queue system | english.gujaratsamachar.com (Jan 2024) — verify before relying on it |
| Shristhal Sangrahalay opened 2017 | Wikipedia |
| Rudra Mahalaya, ASI-protected, 12th century | Wikipedia; Gujarat Tourism |
| Genealogy registers of the Audichya Sahastra Gor Mandal | ETV Bharat Gujarati (6 Oct 2021) |
| Siddhpur station (SID), Ahmedabad–Palanpur–Delhi line | Wikipedia; RailYatri |
| Road distances (Mehsana ~37, Palanpur ~33, Patan ~28, Gandhinagar ~95 km); Bindu Sarovar at 23.90883, 72.36363 | OpenStreetMap / OSRM routing, 14 Oct 2026 |
| SH-41 Ahmedabad–Mehsana–Siddhpur–Palanpur | Wikipedia, list of state highways in Gujarat |
| Gangasagar Mela at Makar Sankranti | Wikipedia |
| *Punarapi jananam…* is from *Bhaja Govindam* | arunachala.org archive; Wikipedia |
