import type { Metadata } from 'next';
import type { SiteLocale } from '../../../i18n/config';
import { thankYouMetadata, ThankYouView } from '../../../views/thank-you';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return thankYouMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <ThankYouView locale={(await params).locale as SiteLocale} />;
}
