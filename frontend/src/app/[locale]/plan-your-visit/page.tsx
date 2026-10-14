import type { Metadata } from 'next';
import type { SiteLocale } from '../../../i18n/config';
import { visitMetadata, VisitView } from '../../../views/visit';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return visitMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <VisitView locale={(await params).locale as SiteLocale} />;
}
