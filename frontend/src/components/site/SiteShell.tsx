import Script from 'next/script';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { getDictionary, hreflang, type SiteLocale } from '../../i18n';
import EnquiryTracking from '../analytics/EnquiryTracking';
import MotionProvider from '../motion/MotionProvider';
import Footer from './Footer';
import Header, { type HeaderText } from './Header';
import MobileActionBar from './MobileActionBar';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Marks the document as JS-capable before first paint so scroll reveals can
// start hidden. If the app has not booted after 4s, the class is removed and
// everything is shown regardless.
const bootScript = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__motionReady)document.documentElement.classList.remove('js')},4000);`;

/** The <html> document shared by every language's root layout. */
export default function SiteShell({ locale, fontClassName, children }: { locale: SiteLocale; fontClassName: string; children: ReactNode }) {
  const t = getDictionary(locale);
  const headerText: HeaderText = {
    common: t.common,
    nav: t.nav,
    tagline: t.brand.tagline,
    header: t.header,
    languageMenu: t.languageMenu,
    meetingPointName: t.company.meetingPointName,
    scamShort: t.scam.short,
  };

  return (
    <html lang={hreflang[locale]} suppressHydrationWarning className={fontClassName}>
      {/* This component is the root layout's document, so a plain <head> is correct here. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="grain">
        <Header locale={locale} text={headerText} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <MobileActionBar locale={locale} />
        <MotionProvider />
        <EnquiryTracking />
        <Analytics />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
