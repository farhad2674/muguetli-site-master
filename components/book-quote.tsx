import type { BookExcerpt } from '@/lib/book-story';
import type { Locale } from '@/lib/muguetli';
import styles from './book-quote.module.css';

export function BookQuote({ excerpt, locale, compact = false }: { excerpt: BookExcerpt; locale: Locale; compact?: boolean }) {
  return <figure className={`${styles.quote} ${compact ? styles.compact : ''}`}>
    <blockquote>
      <p className={styles.original} lang="fa" dir="rtl">«{excerpt.text.fa}»</p>
      {locale === 'en' && <p className={styles.translation} lang="en" dir="ltr">“{excerpt.text.en}”</p>}
    </blockquote>
    <figcaption>{locale === 'fa' ? 'از زنگله‌ام — الناز بختیاری' : 'From Zangole’am — Elnaz Bakhtiari · English translation'}</figcaption>
  </figure>;
}
