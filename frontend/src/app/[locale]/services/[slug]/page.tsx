import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SiteLocale } from '../../../../i18n/config';
import { isServiceSlug, serviceDetailMetadata, ServiceDetailView, serviceSlugs } from '../../../../views/service-detail';

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return isServiceSlug(slug) ? serviceDetailMetadata(locale as SiteLocale, slug) : {};
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  return <ServiceDetailView locale={locale as SiteLocale} slug={slug} />;
}
