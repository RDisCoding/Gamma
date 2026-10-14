import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isServiceSlug, serviceDetailMetadata, ServiceDetailView, serviceSlugs } from '../../../../views/service-detail';

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return isServiceSlug(slug) ? serviceDetailMetadata('en', slug) : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  return <ServiceDetailView locale="en" slug={slug} />;
}
