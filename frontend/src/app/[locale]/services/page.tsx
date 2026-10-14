import type { Metadata } from 'next';
import type { SiteLocale } from '../../../i18n/config';
import { servicesMetadata, ServicesView } from '../../../views/services';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return servicesMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <ServicesView locale={(await params).locale as SiteLocale} />;
}
