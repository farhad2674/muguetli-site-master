import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PreCollectionPage } from '@/components/pre-collection-page';
import { isLocale, locales } from '@/lib/muguetli';

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  const path = `/${locale}/archive/pistachio`;
  return { title: locale === 'fa' ? 'روسری پسته‌ای / آرشیو Pre' : 'Pistachio scarf / Pre collection archive', description: locale === 'fa' ? 'نمای کامل روسری آرشیوی و عکس‌های استایل آن.' : 'An archive scarf, its original photographs and an AI-assisted styling visualization.', alternates: { canonical: origin ? `${origin}${path}` : path, languages: { en: origin ? `${origin}/en/archive/pistachio` : '/en/archive/pistachio', fa: origin ? `${origin}/fa/archive/pistachio` : '/fa/archive/pistachio' } } };
}

export default async function PistachioArchive({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PreCollectionPage locale={locale} />;
}
