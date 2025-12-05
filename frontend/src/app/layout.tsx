import './globals.css';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pandit Services',
  description: 'Professional Pandit Services for all your spiritual needs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ScrollToTop />
        <Navbar />
        {/* We add padding-top so the fixed Navbar doesn't cover content */}
        <main className="pt-20 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}