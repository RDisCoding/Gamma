import type { Metadata } from 'next';
import type { SiteLocale } from '../../i18n/config';
import { homeMetadata, HomeView } from '../../views/home';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return homeMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <HomeView locale={(await params).locale as SiteLocale} />;
}
