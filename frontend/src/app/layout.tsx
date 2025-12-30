import './globals.css';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TirthGaya Services',
  description: 'Professional Pandit Services for all your spiritual needs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                // This function is called by Google Translate script
                // The actual initialization happens in Navbar component
              }
            `,
          }}
        />
        <script
          type="text/javascript"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ScrollToTop />
        <Navbar />
        {/* We add padding-top so the fixed Navbar doesn't cover content */}
        <main className="min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}