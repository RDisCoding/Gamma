import '../globals.css';
import type { Metadata, Viewport } from 'next';
import SiteShell from '../../components/site/SiteShell';
import { site } from '../../content/site';
import { getDictionary } from '../../i18n';
import { englishFonts } from '../fonts';

const t = getDictionary('en');

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: t.home.meta.title,
  description: t.company.shortDescription,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = { themeColor: '#f6efe3', width: 'device-width', initialScale: 1 };

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell locale="en" fontClassName={englishFonts}>
      {children}
    </SiteShell>
  );
}
