import Link from 'next/link';
import { ArrowUpRight, ArrowDown, BookOpen, Tablet } from 'lucide-react';
import { CanvasHero } from './canvas-hero';
import { EditorialMotion } from './editorial-motion';
import { ScarfGallery } from './scarf-gallery';
import { BookQuote } from './book-quote';
import { bookExcerpts, literaryElements } from '@/lib/book-story';
import { t, type ElementId, type FeaturedProduct, type Locale } from '@/lib/muguetli';
import { editorial, services, values, type Collection } from '@/lib/editorial';
import styles from './home-page.module.css';

export function HomePage({ locale, products, collections, shopUrl, journalUrl }: { locale: Locale; products: Partial<Record<ElementId, FeaturedProduct[]>>; collections: Collection[]; shopUrl?: string; journalUrl?: string }) {
  const fa = locale === 'fa';
  const copy = (en: string, faText: string) => fa ? faText : en;
  const number = (n: number) => new Intl.NumberFormat(fa ? 'fa-IR' : 'en', { minimumIntegerDigits: 2 }).format(n);
  const pieces = Array.from(new Map(Object.values(products).flat().filter(Boolean).map(p => [p.id, p])).values());
  const cards = collections.length ? collections : pieces.map(p => ({ id: p.id, name: p.name, image: p.image, description: '', url: p.permalink }));
  const book = editorial.book;

  return <main>
    <CanvasHero locale={locale} />
    <EditorialMotion locale={locale}>
      <section id="collections" tabIndex={-1} className={styles.collections} aria-labelledby="collection-title">
        <div className={styles.intro} data-intro>
          <div className={styles.introStage}>
            <p className={styles.kicker}>{copy('01 / ART, IN ANOTHER FORM', '۰۱ / هنر، در شکلی دیگر')}</p>
            <img className={styles.floatLeft} data-float-left src="/media/collection/scarf-rust.jpg" alt="" width={1280} height={1280} loading="lazy" />
            <h2 id="collection-title" className={styles.introTitle}><span data-intro-line>{copy('WEAR THE', 'داستان را')}</span><em data-intro-line>{copy('STORY.', 'بپوش.')}</em></h2>
            <img className={styles.floatRight} data-float-right src="/media/collection/scarf-olive.jpg" alt="" width={1280} height={1280} loading="lazy" />
            <div className={styles.introFoot}><p>{copy('Art leaves the frame.\nThe next chapter is yours.', 'هنر از قاب بیرون می‌آید.\nفصل بعدی از آنِ توست.')}</p><a href="#scarves">{copy('Discover the scarves', 'کشف روسری‌ها')}<ArrowDown size={17} /></a></div>
          </div>
        </div>
        <div id="scarves" tabIndex={-1} className={styles.collectionBody}>
          <div className={styles.collectionHeading} data-reveal><h3>{copy('In the mirror', 'در آیینهٔ آب،')}<br /><em>{copy('of water.', 'رو به خویشتن.')}</em></h3><div className={styles.collectionStory}><BookQuote excerpt={bookExcerpts.water} locale={locale} compact /></div></div>
          <ScarfGallery locale={locale} />
          {cards.length > 0 && <div className={styles.connectedCollections}><h3>{copy('Explore the collections', 'دیدن مجموعه‌ها')}</h3><div>{cards.slice(0, 4).map(c => <a key={c.id} href={c.url}><img src={c.image} alt={c.name} width={500} height={500} loading="lazy" /><span>{c.name}<ArrowUpRight size={18} /></span></a>)}</div></div>}
          <div className={styles.sectionBottom}><span>{copy('Illustrated worlds. Personal expression.', 'جهان‌های مصور. بیان شخصی.')}</span><Link href={shopUrl || `/${locale}/collections`} className={styles.textLink}>{copy(shopUrl ? 'Visit the shop' : 'Explore the collection', shopUrl ? 'رفتن به فروشگاه' : 'دیدن مجموعه')}<ArrowUpRight size={18} /></Link></div>
        </div>
      </section>

      <section id="books" tabIndex={-1} className={styles.book} aria-labelledby="book-title">
        <div className={styles.sectionTop}><span>{copy('02 / ZANGOLE’AM', '۰۲ / زنگله‌ام')}</span><span>{copy('ORIGINALLY WRITTEN IN PERSIAN', 'سفر مقدس گل موگه')}</span></div>
        <div className={styles.bookHeading}>
          <div data-reveal><h2 id="book-title" className={styles.originalBookTitle} lang="fa" dir="rtl">{book?.originalTitle}</h2>{!fa && <p className={styles.transliteratedTitle}>Zangole’am</p>}<p className={styles.bookSubtitle}>{book && t(book.subtitle, locale)}</p></div>
          <p data-reveal>{book ? t(book.synopsis, locale) : copy('Another way into the world of Muguetli. On a page. On your screen.', 'راهی دیگر به جهان موگه‌تلی؛ روی کاغذ، روی صفحهٔ نمایش.')}</p>
        </div>
        {book && <div className={styles.bookRecord} data-reveal>{book.image && <img src={book.image} alt={t(book.title, locale)} width={600} height={800} loading="lazy" />}<p>{t(book.author, locale)} · {t(book.language, locale)}</p><Link className={styles.textLink} href={`/${locale}/books`}>{copy('Enter the book', 'ورود به جهان کتاب')}<ArrowUpRight size={18} /></Link></div>}
        <div className={styles.bookManifesto} data-reveal><p className={styles.kicker}>{copy('THE ALCHEMY OF SUFFERING', 'جواهرِ وجود و کیمیاگریِ رنج')}</p><BookQuote excerpt={bookExcerpts.rebirth} locale={locale} /></div>
        <nav className={styles.elementLinks} aria-label={copy('The four elements of the book', 'چهار عنصر کتاب')}>{literaryElements.map(element => <Link key={element.id} href={`/${locale}/mythology#${element.id}`}>{t(element.name, locale)}<ArrowUpRight size={15} /></Link>)}</nav>
        <div className={styles.editions}>
          {[{ label: copy('THE PHYSICAL BOOK', 'کتاب چاپی'), title: copy('To hold.', 'برای لمس‌کردن.'), description: copy('A place on your bookshelf. A world to return to.', 'جایی در کتابخانه‌ات؛ جهانی برای بازگشتن.'), link: book?.url, action: copy('Buy the book', 'خرید کتاب'), icon: BookOpen }, { label: copy('THE EBOOK', 'کتاب الکترونیکی'), title: copy('To take along.', 'برای همراه‌داشتن.'), description: copy('The same world, wherever you find a moment to read.', 'همان جهان، هر کجا که فرصتی برای خواندن پیدا کنی.'), link: book?.ebookUrl, action: copy('Get the eBook', 'دریافت کتاب الکترونیکی'), icon: Tablet }].map((edition, i) => <article key={edition.label} className={styles.edition} data-edition>
            <div className={styles.editionTop}><span>{number(i + 1)} / {edition.label}</span><edition.icon size={26} strokeWidth={1} /></div>
            <h3>{edition.title}</h3><p>{edition.description}</p><span className={styles.editionLanguage}>{copy('Persian text', 'متن فارسی')}</span>
            {edition.link ? <a className={styles.textLink} href={edition.link}>{edition.action}<ArrowUpRight size={18} /></a> : <><div className={styles.editionStatus}><span className={styles.statusDot} />{copy(i ? 'Download not yet available' : 'Purchase not yet available', i ? 'دانلود هنوز در دسترس نیست' : 'خرید هنوز در دسترس نیست')}</div><Link className={styles.textLink} href={`/${locale}/${i ? 'ebook' : 'books'}`}>{copy('Read about this edition', 'دربارهٔ این نسخه')}<ArrowUpRight size={18} /></Link></>}
          </article>)}
        </div>
      </section>

      <section id="founder" tabIndex={-1} className={styles.founder} aria-labelledby="founder-title">
        <div className={styles.founderArt} data-portrait><img src={editorial.founder?.image || '/media/collection/founder.jpg'} alt={copy('Elnaz Bakhtiari wearing a Muguetli scarf', 'الناز بختیاری با روسری موگه‌تلی')} width={853} height={1280} loading="lazy" /></div>
        <div className={styles.founderCopy}>
          <p className={styles.kicker} data-reveal>{copy('03 / THE WOMAN BEHIND THE WORLD', '۰۳ / زنی پشت این جهان')}</p>
          <h2 id="founder-title" data-reveal>{copy('Elnaz', 'الناز')}<br /><em>{copy('Bakhtiari', 'بختیاری')}</em></h2>
          <p className={styles.founderRole}>{editorial.founder && t(editorial.founder.role, locale)}</p>
          <p className={styles.founderText} data-reveal>{editorial.founder && t(editorial.founder.copy, locale)}</p>
          <div className={styles.values}>{values.slice(0, 3).map((value, i) => <div key={value.en}><span className={styles.rule} data-line /><small>{number(i + 1)}</small><span>{t(value, locale)}</span></div>)}</div>
          <Link className={styles.textLink} href={`/${locale}/about`}>{copy('Her story & the four elements', 'داستان او و اندیشهٔ چهار عنصر')}<ArrowUpRight size={18} /></Link>
        </div>
        <div className={styles.founderCaption}><span>MUGUETLI / {copy('THE FOUNDER', 'بنیان‌گذار')}</span><span>{copy('Art as a way of being.', 'هنر، شیوه‌ای برای بودن.')}</span></div>
      </section>

      <section id="atelier" tabIndex={-1} className={styles.consulting} aria-labelledby="atelier-title">
        <div className={styles.sectionTop}><span>{copy('04 / THE ATELIER', '۰۴ / آتلیه')}</span><span>{copy('STYLING & CREATIVE CONSULTING', 'استایل و مشاورهٔ خلاق')}</span></div>
        <div className={styles.consultingHead}><h2 id="atelier-title" data-reveal>{copy('BECOME YOUR', 'خودت')}<br /><em>{copy('OWN MUSE.', 'الهام‌بخش باش.')}</em></h2><p data-reveal>{copy('Your clothes. Your image.\nYour way of being seen.', 'لباس تو. تصویر تو.\nشیوهٔ دیده‌شدن تو.')}</p></div>
        <div className={styles.services}>{services.map((service, i) => <Link href={`/${locale}/consulting#service-${i}`} key={service.title.en} className={styles.service}><span className={styles.rule} data-line /><span className={styles.serviceNumber}>{number(i + 1)}</span><h3 data-reveal>{t(service.title, locale)}</h3><p>{t(service.description, locale)}</p><ArrowUpRight strokeWidth={1} /></Link>)}</div>
        <Link className={styles.textLink} href={`/${locale}/consulting`}>{copy('Explore the atelier', 'کشف آتلیه')}<ArrowUpRight size={20} /></Link>
      </section>

      <section className={styles.journal} id="journal" tabIndex={-1} aria-labelledby="journal-title">
        <div className={styles.journalHeading} data-reveal><div><p className={styles.kicker}>{copy('05 / NOTES FROM OUR WORLD', '۰۵ / یادداشت‌هایی از جهان ما')}</p><h2 id="journal-title">{copy('The journal', 'ژورنال')}<em>.</em></h2></div><Link className={styles.textLink} href={journalUrl || `/${locale}/journal`}>{copy('All stories', 'همهٔ داستان‌ها')}<ArrowUpRight size={19} /></Link></div>
        {editorial.articles.length ? <div className={styles.journalGrid}>{editorial.articles.slice(0, 3).map(a => <a href={a.url} key={a.id} data-reveal><img src={a.image} alt="" width={700} height={500} loading="lazy" /><small>{t(a.category, locale)}</small><h3>{t(a.title, locale)}</h3><p>{t(a.excerpt, locale)}</p></a>)}</div> : <p className={styles.journalNote}>{copy('Stories are taking shape. New notes will appear here.', 'داستان‌ها در حال شکل‌گرفتن‌اند. یادداشت‌های تازه اینجا منتشر می‌شوند.')}</p>}
      </section>
    </EditorialMotion>
  </main>;
}
