import Link from 'next/link';
import { chapters, t, type Locale } from '@/lib/muguetli';
import { pages, type PageSlug } from '@/lib/pages';
import styles from './editorial-page.module.css';
import { editorial, services } from '@/lib/editorial';
import { ScarfGallery } from './scarf-gallery';
import { BookQuote } from './book-quote';
import { bookExcerpts, literaryElements } from '@/lib/book-story';
import { fetchCollections, fetchFeaturedProducts } from '@/lib/woocommerce';

export async function EditorialPage({ locale, slug }: { locale: Locale; slug: PageSlug }) {
  const page = pages[slug];
  const collections = slug === 'collections' ? await fetchCollections() : [];
  const products = slug === 'collections' && !collections.length ? Object.values(await fetchFeaturedProducts()).flat() : [];
  const catalog = collections.length ? collections : Array.from(new Map(products.map(p => [p.id, { id:p.id, name:p.name, image:p.image, url:p.permalink, description:'' }])).values());
  const book = (slug === 'books' || slug === 'ebook') ? editorial.book : null;
  const articles = slug === 'journal' ? editorial.articles : [];
  const hasContent = slug === 'collections' || catalog.length > 0 || Boolean(book) || articles.length > 0;
  const fa = locale === 'fa';
  const editionUrl = slug === 'ebook' ? book?.ebookUrl : book?.url;
  return (
    <main className={styles.page} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <header className={styles.hero}>
        <p>{t(page.eyebrow, locale)}</p>
        <h1 className={book ? styles.originalBookTitle : undefined} lang={book ? 'fa' : locale} dir={book ? 'rtl' : undefined}>{book ? book.originalTitle : t(page.title, locale)}</h1>
        <span>{t(page.lede, locale)}</span>
      </header>

      {catalog.length > 0 && <section className={styles.catalog}>{catalog.map(c=><a key={c.id} href={c.url}><img src={c.image} alt={c.name} width={800} height={1000} loading="lazy"/><h2>{c.name} ↗</h2>{c.description && <p>{c.description}</p>}</a>)}</section>}
      {book && <section className={styles.bookReading}>
        <div className={styles.bookIntroduction}>
          {book.image && <img src={book.image} alt={t(book.title, locale)} width={600} height={800} />}
          <div><p className={styles.bookByline}>{t(book.author, locale)} · {t(book.language, locale)}</p><h2>{t(book.subtitle, locale)}</h2><p>{t(book.synopsis, locale)}</p></div>
          <BookQuote excerpt={bookExcerpts.rebirth} locale={locale} />
        </div>
        <div className={styles.editionNotice}><div><h3>{slug === 'ebook' ? (fa ? 'نسخهٔ الکترونیکی · فارسی' : 'Digital edition · Persian') : (fa ? 'نسخهٔ چاپی · فارسی' : 'Physical edition · Persian')}</h3><p>{fa ? 'متن اصلی کتاب به زبان فارسی است.' : 'The book’s original text is Persian. English excerpts on this site are translations.'}</p></div>{editionUrl ? <a href={editionUrl}>{fa ? (slug === 'ebook' ? 'دریافت کتاب الکترونیکی' : 'خرید کتاب') : (slug === 'ebook' ? 'Get the eBook' : 'Buy the book')} ↗</a> : <span>{fa ? (slug === 'ebook' ? 'دانلود هنوز در دسترس نیست' : 'خرید هنوز در دسترس نیست') : (slug === 'ebook' ? 'Download not yet available' : 'Purchase not yet available')}</span>}</div>
        <nav className={styles.bookLinks} aria-label={fa ? 'ادامهٔ داستان' : 'Continue the story'}><Link href={`/${locale}/mythology`}>{fa ? 'چهار عنصر؛ ۲۱ مرحله' : 'Four elements. 21 stages.'} ↗</Link><Link href={`/${locale}/${slug === 'ebook' ? 'books' : 'ebook'}`}>{slug === 'ebook' ? (fa ? 'دربارهٔ نسخهٔ چاپی' : 'About the physical book') : (fa ? 'دربارهٔ نسخهٔ الکترونیکی' : 'About the eBook')} ↗</Link></nav>
      </section>}
      {articles.length > 0 && <section className={styles.catalog}>{articles.map(a=><a key={a.id} href={a.url}><img src={a.image} alt="" width={800} height={600} loading="lazy"/><small>{t(a.category,locale)}</small><h2>{t(a.title,locale)}</h2><p>{t(a.excerpt,locale)}</p></a>)}</section>}

      {slug === 'collections' && <section className={styles.suppliedCollection} aria-label={locale === 'fa' ? 'روسری‌های موگه‌تلی' : 'Muguetli scarves'}><ScarfGallery locale={locale} /></section>}
      {slug === 'about' && editorial.founder && <section className={styles.founderDetail}><img src={editorial.founder.image} alt={t(editorial.founder.name, locale)} width={853} height={1280} loading="lazy" /><div><h2>{fa ? 'از سوگ، جهانی زاده شد.' : 'From grief, a world.'}</h2><p>{t(editorial.founder.copy, locale)}</p><Link href={`/${locale}/mythology`}>{fa ? 'اندیشهٔ چهار عنصر' : 'The idea of the four elements'} ↗</Link></div></section>}

      {slug === 'mythology' && (
        <section className={styles.chapters} aria-label={locale === 'fa' ? 'چهار فصل' : 'Four chapters'}>
          {literaryElements.map((element, index) => (
            <article key={element.id} id={element.id} tabIndex={-1}>
              <img src={chapters.find(chapter => chapter.id === element.id)!.poster} alt="" width={1280} height={720} loading="lazy" />
              <div>
                <p>{new Intl.NumberFormat(fa ? 'fa-IR' : 'en', { minimumIntegerDigits: 2 }).format(index + 1)} — {t(element.name, locale)}</p>
                <h2 className={styles.elementTitle}>{t(element.title, locale)}</h2>
                <p className={styles.elementIdea}>{t(element.idea, locale)}</p>
                <BookQuote excerpt={element.excerpt} locale={locale} compact />
              </div>
            </article>
          ))}
        </section>
      )}

      <section className={styles.body}>
        {slug === 'consulting' && services.map((service,i)=><article id={`service-${i}`} key={service.title.en} style={{padding:'28px 0',borderBottom:'1px solid currentColor',scrollMarginTop:100}}><h2>{t(service.title,locale)}</h2><p>{t(service.description,locale)}</p></article>)}
        {!hasContent && page.body.map((paragraph) => <p key={paragraph.en}>{t(paragraph, locale)}</p>)}
        {slug === 'about' && <BookQuote excerpt={bookExcerpts.light} locale={locale} />}
        {slug === 'contact' && <span className={styles.pending}>{locale === 'fa' ? 'مقصد رسمی هنوز متصل نشده است.' : 'The official destination is not connected yet.'}</span>}
        <Link href={`/${locale}`}>{locale === 'fa' ? 'بازگشت به چهار مادر' : 'Return to The Four Mothers'} <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
