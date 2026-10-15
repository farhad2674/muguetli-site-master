import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { collectionMeta, productHref, type Design, type MediaAsset, type SizeCode } from '@/lib/catalog';
import { t, type Locale } from '@/lib/muguetli';
import { ProductInquiry } from './product-inquiry';
import { CatalogGrid } from './catalog-page';
import { designsFor } from '@/lib/catalog';
import styles from './product-detail.module.css';

function mediaLabel(asset: MediaAsset, locale: Locale) {
  if (asset.kind === 'generated-model') return locale === 'fa' ? 'تصویرسازی استایل با هوش مصنوعی' : 'AI styling visualization';
  if (asset.kind === 'artwork') return locale === 'fa' ? 'نمای کامل اثر' : 'Full artwork';
  if (asset.kind === 'model') return locale === 'fa' ? 'نمای استایل' : 'Styling view';
  return locale === 'fa' ? 'عکس پارچه' : 'Textile photograph';
}

export function ProductDetail({ locale, design, selectedSize }: { locale: Locale; design: Design; selectedSize: SizeCode }) {
  const fa = locale === 'fa';
  const collection = collectionMeta[design.collection];
  const primary = design.media[0];
  const related = designsFor(design.collection).filter(item => item.id !== design.id).slice(0, 4);
  return <main className={styles.page} dir={fa ? 'rtl' : 'ltr'}>
    <nav className={styles.crumbs} aria-label={fa ? 'مسیر صفحه' : 'Breadcrumb'}>
      <Link href={`/${locale}/collections`}>{fa ? 'هنر پوشیدنی' : 'Wearable art'}</Link><span aria-hidden="true">/</span>
      <Link href={`/${locale}/collections/${design.collection}`}>{t(collection.name, locale)}</Link><span aria-hidden="true">/</span>
      <span aria-current="page">{t(design.title, locale)}</span>
    </nav>

    <div className={styles.layout}>
      <section className={styles.gallery} aria-label={fa ? 'تصاویر اثر' : 'Artwork images'}>
        {primary ? <figure className={styles.mainImage}>
          <img src={primary.src} alt={primary.alt ? t(primary.alt, locale) : `${t(design.title, locale)} — ${mediaLabel(primary, locale)}`} width={primary.width ?? 900} height={primary.height ?? 900} fetchPriority="high" />
          <figcaption><span>01 / {String(design.media.length).padStart(2, '0')}</span><span>{mediaLabel(primary, locale)}</span></figcaption>
        </figure> : null}
        {design.media.length > 1 && <div className={styles.moreImages}>
          {design.media.slice(1).map((asset, index) => <figure key={`${asset.src}-${index}`} id={asset.kind === 'generated-model' ? 'styling' : undefined} className={asset.kind === 'generated-model' ? styles.stylingImage : undefined}>
            {asset.kind === 'generated-model'
              ? <Image src={asset.src} alt={asset.alt ? t(asset.alt, locale) : `${t(design.title, locale)} — ${mediaLabel(asset, locale)}`} width={asset.width ?? 1024} height={asset.height ?? 1536} sizes="(min-width: 1001px) 50vw, 88vw" loading="eager" />
              : <img src={asset.src} alt={asset.alt ? t(asset.alt, locale) : `${t(design.title, locale)} — ${mediaLabel(asset, locale)}`} width={asset.width ?? 900} height={asset.height ?? 900} loading="lazy" />}
            <figcaption><span>{String(index + 2).padStart(2, '0')} / {String(design.media.length).padStart(2, '0')}</span><span>{mediaLabel(asset, locale)}</span></figcaption>
            {asset.kind === 'generated-model' && selectedSize === '50x50' && <p className={styles.stylingNote}>{fa ? 'این تصویر، ایدهٔ پوشیدن فرم روسری مربع این طرح را نشان می‌دهد.' : 'This portrait shows a styling idea for the square-scarf form of this design.'}</p>}
          </figure>)}
        </div>}
      </section>

      <aside className={styles.info}>
        <p className={styles.eyebrow}>{collection.index} / {t(collection.name, locale)} <span>·</span> {String(design.number).padStart(2, '0')}</p>
        <h1>{t(design.title, locale)}</h1>
        <p className={styles.intro}>{fa ? 'طرحی از آرشیو هنر پوشیدنی موگه‌تلی. اندازهٔ دلخواهتان را انتخاب کنید و برای جزئیات در گفت‌وگویی خصوصی بپرسید.' : 'A design from the Muguetli wearable art archive. Choose an available form and begin a private conversation for further details.'}</p>
        <div className={styles.sizeBlock}>
          <div className={styles.sizeHeader}><h2>{fa ? 'فرم و اندازه' : 'FORM & SIZE'}</h2><Link href={`/${locale}/size-guide`}>{fa ? 'راهنمای اندازه' : 'Size guide'}<ArrowUpRight size={16} /></Link></div>
          <div className={styles.sizeChoices}>
            {design.options.map(option => <Link key={option.code} href={productHref(locale, design, option.code)} aria-current={selectedSize === option.code ? 'true' : undefined}>
              <span>{t(option.label, locale)}</span><strong>{option.widthCm} × {option.heightCm} cm</strong>
            </Link>)}
          </div>
          <p className={styles.sizeNote}>{fa ? 'این‌ها گزینه‌های این طرح در فهرست‌اند، نه ادعای موجودی آماده.' : 'These are catalogue options for this design, not a claim of ready stock.'}</p>
        </div>
        <ProductInquiry key={selectedSize} locale={locale} designId={design.id} collection={design.collection} size={selectedSize} />
      </aside>
    </div>

    <section className={styles.afterword}><span>{fa ? 'دربارهٔ تصویر' : 'ABOUT THE IMAGE'}</span><p>{fa ? 'نمای کامل اثر، حاشیه‌ها و جزئیات طرح را نشان می‌دهد. تصویر دوم پیشنهادی برای استایل با کمک هوش مصنوعی است؛ برای بررسی دقیق رنگ و نقش پارچه، عکس‌های اصلی و نمای کامل را ببینید.' : 'The full artwork shows the design and its borders. The second image is an AI styling suggestion. Refer to the original photographs and full artwork for the textile’s exact colors and details.'}</p></section>
    {related.length > 0 && <section className={styles.related}><div><span>{fa ? 'در همین مجموعه' : 'IN THE SAME COLLECTION'}</span><h2>{fa ? 'اثر بعدی را پیدا کنید.' : 'Continue exploring.'}</h2></div><CatalogGrid locale={locale} items={related} /></section>}
  </main>;
}
