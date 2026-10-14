import type { Metadata } from 'next';
import type { SiteLocale } from '../../../i18n/config';
import { aboutMetadata, AboutView } from '../../../views/about';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return aboutMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <AboutView locale={(await params).locale as SiteLocale} />;
}
