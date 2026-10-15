import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { editorial } from '@/lib/editorial';
import { t, type Locale } from '@/lib/muguetli';
import styles from './journal-article-page.module.css';

export function JournalArticlePage({ locale, articleId }: { locale: Locale; articleId: string }) {
  const article = editorial.articles.find(item => item.id === articleId);
  if (!article) return null;
  const fa = locale === 'fa';
  const related = editorial.articles.filter(item => item.id !== article.id).slice(0, 2);
  return <main className={styles.page} dir={fa ? 'rtl' : 'ltr'}>
    <header className={styles.hero}><p>{t(article.category, locale)}</p><h1>{t(article.title, locale)}</h1><span>{t(article.excerpt, locale)}</span></header>
    <article className={styles.article}><img src={article.image} alt="" width={1280} height={960} fetchPriority="high" /><div><p>{fa ? 'این یادداشت یک راهنمای عمومی است؛ داستان شخصی هر اثر جداگانه در گفت‌وگوی خصوصی شکل می‌گیرد.' : 'This is a general styling guide. The personal story of each artwork begins in a private conversation.'}</p><p>{fa ? 'به تصویر فرصت بدهید، سپس فرم را با حرکت خودتان پیدا کنید. اندازه، نسبت و جای قرارگرفتن پارچه بخشی از روایت‌اند؛ قانون نهایی، حس شماست.' : 'Give the image room first, then let the form find your movement. Scale, proportion and placement are part of the narrative; your sense of self is the final rule.'}</p><Link href={`/${locale}/collections`}>{fa ? 'دیدن فهرست آثار' : 'Browse the catalogue'}<ArrowUpRight size={17} /></Link></div></article>
    <section className={styles.related}><p>{fa ? 'ادامهٔ ژورنال' : 'CONTINUE READING'}</p><div>{related.map(item => <Link key={item.id} href={`/${locale}/journal/${item.id}`}><span>{t(item.category, locale)}</span><h2>{t(item.title, locale)}</h2><ArrowUpRight size={18} /></Link>)}</div></section>
  </main>;
}
