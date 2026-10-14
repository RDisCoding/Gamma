import type { Metadata } from 'next';
import type { SiteLocale } from '../../../i18n/config';
import { guideMetadata, GuideView } from '../../../views/guide';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return guideMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <GuideView locale={(await params).locale as SiteLocale} />;
}
