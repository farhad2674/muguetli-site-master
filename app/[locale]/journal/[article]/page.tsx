import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JournalArticlePage } from '@/components/journal-article-page';
import { editorial } from '@/lib/editorial';
import { isLocale, locales } from '@/lib/muguetli';

export function generateStaticParams() {
  return locales.flatMap(locale => editorial.articles.map(article => ({ locale, article: article.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; article: string }> }): Promise<Metadata> {
  const { locale, article } = await params;
  const record = editorial.articles.find(item => item.id === article);
  if (!isLocale(locale) || !record) return {};
  return { title: record.title[locale], description: record.excerpt[locale] };
}

export default async function LocalizedArticle({ params }: { params: Promise<{ locale: string; article: string }> }) {
  const { locale, article } = await params;
  if (!isLocale(locale) || !editorial.articles.some(item => item.id === article)) notFound();
  return <JournalArticlePage locale={locale} articleId={article} />;
}
