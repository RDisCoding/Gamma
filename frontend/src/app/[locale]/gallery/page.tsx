import type { Metadata } from 'next';
import type { SiteLocale } from '../../../i18n/config';
import { galleryMetadata, GalleryView } from '../../../views/gallery';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return galleryMetadata((await params).locale as SiteLocale);
}

export default async function Page({ params }: Props) {
  return <GalleryView locale={(await params).locale as SiteLocale} />;
}
