import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/muguetli';
import { PreCollectionInquiry } from './pre-collection-inquiry';
import styles from './pre-collection-page.module.css';

const gallery = [
  { src: '/media/pre-collection/pistachio-model-front.webp', width: 1200, height: 1800, label: { en: 'Original modeled scarf, front view', fa: 'نمای روبه‌روی مدل با روسری اصلی' }, detail: { en: 'Original archive modeled photograph', fa: 'عکس اصلی مدل از آرشیو' } },
  { src: '/media/product-models/pistachio-styling-v3.png', width: 1024, height: 1536, label: { en: 'Scarf styling on Elnaz, AI-assisted visualization', fa: 'استایل روسری روی الناز، تصویرسازی با کمک هوش مصنوعی' }, detail: { en: 'AI-assisted styling visualization', fa: 'تصویرسازی استایل با کمک هوش مصنوعی' } },
  { src: '/media/pre-collection/pistachio-flatlay.webp', width: 1024, height: 1024, label: { en: 'Archive scarf, full flatlay', fa: 'نمای کامل روسری آرشیوی' }, detail: { en: 'Uncropped archive flatlay', fa: 'نمای کامل بدون برش از آرشیو' } },
  { src: '/media/pre-collection/pistachio-model-profile.webp', width: 1200, height: 1800, label: { en: 'Original modeled scarf, profile view', fa: 'نمای نیم‌رخ مدل با روسری اصلی' }, detail: { en: 'Original archive photograph', fa: 'عکس اصلی آرشیو' } },
] as const;

export function PreCollectionPage({ locale }: { locale: Locale }) {
  const fa = locale === 'fa';
  return <main className={styles.page} dir={fa ? 'rtl' : 'ltr'}>
    <nav className={styles.crumbs} aria-label={fa ? 'مسیر صفحه' : 'Breadcrumb'}><Link href={`/${locale}/products`}>{fa ? 'فهرست آثار' : 'Catalogue'}</Link><span>/</span><span aria-current="page">{fa ? 'آرشیو Pre' : 'Pre collection archive'}</span></nav>
    <header className={styles.hero}>
      <div><span>{fa ? 'آرشیو / مجموعهٔ Pre' : 'ARCHIVE / PRE COLLECTION'}</span><h1>{fa ? 'روسری پسته‌ای' : 'Pistachio scarf study'}</h1><p>{fa ? 'روسری‌ای از آرشیو مجموعهٔ Pre؛ با نمای کامل پارچه، عکس‌های واقعی مدل و یک تصویرسازی استایل جدید.' : 'A scarf from the Pre collection archive, shown through its full flatlay, original modeled photographs and one new styling visualization.'}</p><p className={styles.archiveNote}>{fa ? 'این اثر بخشی از آرشیو جداگانه است و در شماره‌گذاری ۷۵ طرح پنج مجموعهٔ اصلی حساب نمی‌شود.' : 'This is a separate archive piece. It is not counted among the 75 numbered designs in the five main collections.'}</p></div>
      <img src={gallery[0].src} alt={gallery[0].label[locale]} width={gallery[0].width} height={gallery[0].height} fetchPriority="high" />
    </header>
    <section className={styles.gallery} aria-label={fa ? 'تصاویر روسری' : 'Scarf gallery'}>
      <div className={styles.galleryHeading}><span>{fa ? 'دیدن اثر' : 'THE GALLERY'}</span><h2>{fa ? 'یک روسری، چند نگاه.' : 'One scarf, several views.'}</h2></div>
      {gallery.slice(1).map((item, index) => <figure key={item.src} className={index === 0 ? styles.generated : undefined}><img src={item.src} alt={item.label[locale]} width={item.width} height={item.height} loading="lazy" /><figcaption><span>{String(index + 2).padStart(2, '0')} / 04</span><strong>{item.detail[locale]}</strong></figcaption></figure>)}
    </section>
    <div className={styles.infoGrid}><div><span>{fa ? 'یادداشت آرشیوی' : 'ARCHIVE NOTE'}</span><p>{fa ? 'برای وفاداری به اثر، تصویر نمای کامل بدون برش نمایش داده شده است. تصویرسازی استایل با کمک هوش مصنوعی ساخته شده و عکس محصول یا سند دقیق جنس و ابعاد نیست.' : 'The full scarf image is shown without cropping. The AI-assisted styling image is a visualization, not a product photograph or a record of exact fabric and dimensions.'}</p></div><PreCollectionInquiry locale={locale} /></div>
    <Link className={styles.backLink} href={`/${locale}/products`}>{fa ? 'بازگشت به فهرست آثار' : 'Back to the catalogue'}<ArrowUpRight size={17} /></Link>
  </main>;
}
