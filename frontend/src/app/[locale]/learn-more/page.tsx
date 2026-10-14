import type { Metadata } from 'next';
import type { SiteLocale } from '../../../i18n/config';
import { learnMoreMetadata, LearnMoreView } from '../../../views/learn-more';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return learnMoreMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <LearnMoreView locale={(await params).locale as SiteLocale} />;
}
