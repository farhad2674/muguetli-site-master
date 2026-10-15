import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CollectionPage } from '@/components/collection-page';
import { collectionIds, collectionMeta, isCollectionId } from '@/lib/catalog';
import { isLocale, locales } from '@/lib/muguetli';

export function generateStaticParams() {
  return locales.flatMap(locale => collectionIds.map(collection => ({ locale, collection })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; collection: string }> }): Promise<Metadata> {
  const { locale, collection } = await params;
  if (!isLocale(locale) || !isCollectionId(collection)) return {};
  const record = collectionMeta[collection];
  return { title: record.name[locale], description: record.statement[locale] };
}

export default async function LocalizedCollection({ params }: { params: Promise<{ locale: string; collection: string }> }) {
  const { locale, collection } = await params;
  if (!isLocale(locale) || !isCollectionId(collection)) notFound();
  return <CollectionPage locale={locale} collectionId={collection} />;
}
