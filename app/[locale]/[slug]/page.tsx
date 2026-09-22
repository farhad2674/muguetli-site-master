import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditorialPage } from '@/components/editorial-page';
import { isLocale, locales, t } from '@/lib/muguetli';
import { isPageSlug, pages, pageSlugs } from '@/lib/pages';

export function generateStaticParams() {
  return locales.flatMap((locale) => pageSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isPageSlug(slug)) return {};
  return { title: t(pages[slug].title, locale), description: t(pages[slug].lede, locale) };
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isPageSlug(slug)) notFound();
  return <EditorialPage locale={locale} slug={slug} />;
}
