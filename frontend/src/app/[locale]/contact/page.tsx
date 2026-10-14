import type { Metadata } from 'next';
import type { SiteLocale } from '../../../i18n/config';
import { contactMetadata, ContactView } from '../../../views/contact';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return contactMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <ContactView locale={(await params).locale as SiteLocale} />;
}
