import type { Locale } from '@/lib/muguetli';
import styles from './story-ribbon.module.css';

export function StoryRibbon({ locale, light = false }: { locale: Locale; light?: boolean }) {
  const fa = locale === 'fa';
  const text = light ? (fa ? 'از جنس نور' : 'Crafted of pure light') : (fa ? 'از سوگ تا بیداری و رهایی' : 'From grief to awakening & liberation');
  return <section className={`${styles.ribbon} ${light ? styles.light : ''}`} data-ribbon data-surface="light" aria-label={fa ? 'از جهان زنگله‌ام' : 'From the world of Zangole’am'}>
    <div className={styles.caption}><span>{fa ? 'موگه‌تلی / یک آیین گذار' : 'MUGUETLI / A RITE OF PASSAGE'}</span><span>{light ? (fa ? '۰۲ / نور' : '02 / LIGHT') : (fa ? '۰۱ / دگرگونی' : '01 / TRANSFORMATION')}</span></div>
    <div className={styles.viewport}><div className={styles.line} data-ribbon-line><h2>{text}<span aria-hidden="true"> · </span></h2><span aria-hidden="true">{text} · </span></div></div>
    {light && !fa && <p lang="fa" dir="rtl">«همیشه خودم رو توی آغوش و دست‌های نگه‌دارنده‌ی خدا، از جنس نور حس کردم.»</p>}
    <p>{light ? (fa ? '«همیشه خودم رو توی آغوش و دست‌های نگه‌دارنده‌ی خدا، از جنس نور حس کردم.»' : '“I have always felt myself held closely in the embracing, sustaining hands of God—hands crafted of pure light.”') : (fa ? 'آتش، خاک، آب و باد؛ چهار زبان برای دگرگونی.' : 'Fire, earth, water and wind. Four languages of transformation.')}</p>
    {light && <small>{fa ? 'از زنگله‌ام — الناز بختیاری' : 'From Zangole’am — Elnaz Bakhtiari · English translation'}</small>}
  </section>;
}
