import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArchiveLookbookPage } from '@/components/archive-lookbook-page';
import { isLocale } from '@/lib/muguetli';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: locale === 'fa' ? 'آرشیو مجموعهٔ Pre' : 'Pre collection archive', description: locale === 'fa' ? 'آرشیو دیداری روسری‌های مجموعهٔ Pre.' : 'A visual archive of Pre collection scarf studies.' };
}

export default async function Archive({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ArchiveLookbookPage locale={locale} />;
}
