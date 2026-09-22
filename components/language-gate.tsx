'use client';

import { useEffect, useState } from 'react';
import styles from './language-gate.module.css';

export function LanguageGate() {
  const [leaving, setLeaving] = useState<'en' | 'fa' | null>(null);

  useEffect(() => {
    const saved = document.cookie.split('; ').find((item) => item.startsWith('muguetli_locale='))?.split('=')[1];
    if (saved === 'en' || saved === 'fa') window.location.replace(`/${saved}`);
  }, []);

  function choose(locale: 'en' | 'fa') {
    setLeaving(locale);
    document.cookie = `muguetli_locale=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`;
    window.setTimeout(() => window.location.assign(`/${locale}`), 820);
  }

  return (
    <main className={styles.gate} data-leaving={leaving ?? undefined}>
      <div className={styles.orbit} aria-hidden="true">
        <span>FIRE</span><span>خاک</span><span>WATER</span><span>باد</span>
      </div>
      <header className={styles.header}>
        <span className={styles.brand}>MUGUETLI</span>
        <span className={styles.edition}>THE FOUR MOTHERS — 01</span>
      </header>
      <section className={styles.center} aria-labelledby="language-heading">
        <p className={styles.eyebrow}>A STORY IN TWO TONGUES</p>
        <h1 id="language-heading"><span>HOW SHOULD THE</span><em>STORY SPEAK?</em></h1>
        <p className={styles.faPrompt} lang="fa" dir="rtl">داستان با کدام زبان با تو سخن بگوید؟</p>
        <div className={styles.choices}>
          <button type="button" onClick={() => choose('en')}>
            <span className={styles.number}>01</span><span>English</span><span aria-hidden="true">↗</span>
          </button>
          <button type="button" onClick={() => choose('fa')} lang="fa" dir="rtl">
            <span className={styles.number}>۰۲</span><span>فارسی</span><span aria-hidden="true">↖</span>
          </button>
        </div>
      </section>
      <div className={styles.threshold} aria-hidden="true" />
      <p className={styles.note}>MATTER · MEMORY · TRANSFORMATION</p>
    </main>
  );
}
