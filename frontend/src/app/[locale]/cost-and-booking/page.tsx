import type { Metadata } from 'next';
import type { SiteLocale } from '../../../i18n/config';
import { costMetadata, CostView } from '../../../views/cost';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return costMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <CostView locale={(await params).locale as SiteLocale} />;
}
