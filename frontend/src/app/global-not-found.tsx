import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import BinduMark from '../components/site/BinduMark';
import { englishFonts } from './fonts';

/* Shown for any unknown URL (static export writes it to 404.html). */
export const metadata: Metadata = {
  title: 'Page not found | Matrugaya Tirth',
  robots: { index: false, follow: true },
};

const links = [
  { href: '/', label: 'Home' },
  { href: '/matrugaya-pooja-guide', label: 'Matrugaya Pooja guide' },
  { href: '/contact', label: 'Contact' },
  { href: '/gu', label: 'ગુજરાતી' },
  { href: '/hi', label: 'हिन्दी' },
];

export default function GlobalNotFound() {
  return (
    <html lang="en-IN" className={englishFonts}>
      <body className="grain">
        <main className="flex min-h-screen flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1440px]">
            <Link href="/" className="inline-flex items-center gap-3 text-ink">
              <BinduMark className="h-9 w-7" />
              <span className="font-wordmark text-2xl">Matrugaya Tirth</span>
            </Link>
            <p className="eyebrow mt-16 text-sindoor">404</p>
            <h1 className="display-lg mt-6 max-w-[16ch] text-ink">
              This page has <em className="text-sindoor">moved or gone</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-ink-soft">The page you were looking for isn’t here. These are the most useful places to continue:</p>
            <ul className="mt-10 flex flex-wrap gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-12 items-center rounded-full border border-ink/20 px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </body>
    </html>
  );
}
