import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import archiveSource from '@/lib/pre-collection.json';
import type { Locale } from '@/lib/muguetli';
import styles from './archive-lookbook-page.module.css';

interface ArchiveImage { src: string; width: number; height: number; sourceFile: string }
interface ArchiveGroup { id: string; labelFa: string; labelEn: string; sourceFolder: string; images: ArchiveImage[] }
const groups = archiveSource as ArchiveGroup[];

export function ArchiveLookbookPage({ locale }: { locale: Locale }) {
  const fa = locale === 'fa';
  return <main className={styles.page} dir={fa ? 'rtl' : 'ltr'}>
    <header className={styles.hero}>
      <div><span>{fa ? 'آرشیو جداگانه / مجموعهٔ Pre' : 'SEPARATE ARCHIVE / PRE COLLECTION'}</span><h1>{fa ? 'ردّ روسری‌ها' : 'SCARF STUDIES.'}</h1></div>
      <p>{fa ? 'نماهایی از آرشیو مجموعهٔ Pre. این عکس‌ها برای دیدن طرح، پارچه و شیوهٔ پوشیدن کنار هم آمده‌اند؛ نام رسمی، اندازه و موجودی از روی آن‌ها حدس زده نشده است.' : 'A visual archive of Pre collection scarf studies. These photographs show designs and ways of wearing them; official names, sizes and availability have not been inferred from the images.'}</p>
    </header>
    <Link className={styles.feature} href={`/${locale}/archive/pistachio`}>
      <img src="/media/pre-collection/pistachio-model-front.webp" alt={fa ? 'مدل با روسری پسته‌ای، عکس اصلی آرشیو' : 'Original archive model photograph with the pistachio scarf'} width={1200} height={1800} fetchPriority="high" />
      <div><span>01 / {fa ? 'نمای ویژه' : 'FEATURED STUDY'}</span><h2>{fa ? 'روسری پسته‌ای' : 'Pistachio scarf study'}</h2><p>{fa ? 'نمای کامل اثر، عکس‌های اصلی مدل و تصویرسازی استایل جدید را در صفحهٔ اختصاصی آن ببینید.' : 'See the full scarf, original modeled photographs and new styling visualization on its dedicated page.'}</p><strong>{fa ? 'دیدن جزئیات' : 'View the story'}<ArrowUpRight size={18} /></strong></div>
    </Link>
    <section className={styles.groups} aria-labelledby="archive-groups-title">
      <div className={styles.groupsHeading}><span>{fa ? 'نگاه‌های دیگر' : 'OTHER STUDIES'}</span><h2 id="archive-groups-title">{fa ? 'صفحه‌های آرشیو' : 'From the archive'}</h2></div>
      {groups.filter(group => group.id !== 'pistachio').map((group, index) => <article key={group.id} className={styles.group}>
        <div className={styles.groupHeading}><span>{String(index + 2).padStart(2, '0')}</span><h3>{fa ? group.labelFa : group.labelEn}</h3><small>{fa ? 'عکس‌های اصلی آرشیو' : 'Original archive photographs'}</small></div>
        <div className={styles.photos}>{group.images.map((photo, photoIndex) => <figure key={photo.src}><img src={photo.src} alt={fa ? `${group.labelFa}، نمای ${photoIndex + 1}` : `${group.labelEn}, view ${photoIndex + 1}`} width={photo.width} height={photo.height} loading="lazy" /><figcaption>{String(photoIndex + 1).padStart(2, '0')} / {String(group.images.length).padStart(2, '0')}</figcaption></figure>)}</div>
      </article>)}
    </section>
    <footer className={styles.footer}><p>{fa ? 'مجموعهٔ Pre یک آرشیو جداگانه است و به شمار ۷۵ طرح پنج مجموعهٔ اصلی افزوده نمی‌شود.' : 'The Pre collection is a separate visual archive and is not included in the 75 designs across the five main collections.'}</p><Link href={`/${locale}/products`}>{fa ? 'بازگشت به فهرست آثار' : 'Back to the catalogue'}<ArrowUpRight size={17} /></Link></footer>
  </main>;
}
