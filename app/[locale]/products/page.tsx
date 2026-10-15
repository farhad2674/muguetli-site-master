import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogPage } from '@/components/catalog-page';
import { isCollectionId, isProductType } from '@/lib/catalog';
import { isLocale } from '@/lib/muguetli';

type Query = { collection?: string | string[]; type?: string | string[]; view?: string | string[] };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === 'fa' ? 'فهرست آثار پوشیدنی' : 'Wearable Art Catalogue',
    description: locale === 'fa' ? 'آثار موگه‌تلی را بر اساس مجموعه و فرم ببینید.' : 'Explore Muguetli artworks by collection and form.',
  };
}

export default async function Products({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Query> }) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  if (!isLocale(locale)) notFound();
  const rawCollection = query.collection;
  const rawType = query.type;
  const collection = typeof rawCollection === 'string' && isCollectionId(rawCollection) ? rawCollection : undefined;
  const type = typeof rawType === 'string' && isProductType(rawType) ? rawType : undefined;
  const invalidFilter = (rawCollection !== undefined && !collection) || (rawType !== undefined && !type);
  return <CatalogPage locale={locale} collection={collection} type={type} invalidFilter={invalidFilter} view={query.view === 'styled' ? 'styled' : 'textile'} />;
}
