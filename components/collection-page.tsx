import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { editorialCollections } from '@/lib/editorial';
import { artworkFor, collectionMeta, designsFor, isCollectionId } from '@/lib/catalog';
import { literaryElements } from '@/lib/book-story';
import { t, type Locale } from '@/lib/muguetli';
import { CatalogGrid } from './catalog-page';
import styles from './collection-page.module.css';

export function CollectionPage({ locale, collectionId }: { locale: Locale; collectionId: string }) {
  const fa = locale === 'fa';
  if (!isCollectionId(collectionId)) return null;
  const collection = editorialCollections.find(item => item.name.toLowerCase() === collectionId.toLowerCase());
  const meta = collectionMeta[collectionId];
  const items = designsFor(collectionId);
  const element = literaryElements.find(item => item.id === (collectionId === 'wind' ? 'air' : collectionId));
  const label = t(meta.name, locale);
  const description = element ? t(element.idea, locale) : t(meta.statement, locale);
  const image = collection?.image ?? (items[0] && (artworkFor(items[0])?.src ?? items[0].media[0]?.src));
  return <main className={styles.page} dir={fa ? 'rtl' : 'ltr'}>
    <header className={styles.hero}>
      <div><p>{fa ? 'موگه‌تلی / هنر پوشیدنی' : 'MUGUETLI / WEARABLE ART'}</p><h1>{label}</h1><span>{t(meta.statement, locale)}</span></div>
      {image && <img src={image} alt={label} width={1280} height={720} fetchPriority="high" />}
    </header>
    <section className={styles.story}>
      <div><span>{fa ? 'یک فصل از زنگله‌ام' : 'A CHAPTER FROM ZANGOLE’AM'}</span><h2>{element ? t(element.title, locale) : label}</h2></div>
      <p>{description}</p>
    </section>
    <section className={styles.catalog}>
      <div className={styles.catalogHeader}><p>{fa ? 'آرشیو شماره‌گذاری‌شده' : 'NUMBERED ARCHIVE'}</p><h2>{fa ? 'آثار این مجموعه' : 'The artworks'}</h2><Link href={`/${locale}/products?collection=${collectionId}`}>{fa ? 'دیدن در فهرست آثار' : 'View in catalogue'}<ArrowUpRight size={17} /></Link></div>
      <CatalogGrid locale={locale} items={items} />
    </section>
    <nav className={styles.footerNav}><Link href={`/${locale}/collections`}>{fa ? 'بازگشت به مجموعه‌ها' : 'Back to collections'}<ArrowUpRight size={17} /></Link><Link href={`/${locale}/size-guide`}>{fa ? 'راهنمای اندازه' : 'Size guide'}<ArrowUpRight size={17} /></Link></nav>
  </main>;
}
