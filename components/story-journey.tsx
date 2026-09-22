'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, BookOpen, Tablet } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { literaryElements, bookExcerpts } from '@/lib/book-story';
import { editorial, type Collection } from '@/lib/editorial';
import { t, type Locale } from '@/lib/muguetli';
import { BookQuote } from './book-quote';
import { ScarfGallery } from './scarf-gallery';
import { useMotionPreference } from './motion-preference';
import styles from './story-journey.module.css';

export function StoryJourney({ locale, collections, shopUrl }: { locale: Locale; collections: Collection[]; shopUrl?: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const [layoutRevision, setLayoutRevision] = useState(0);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let alive = true;
    const resized = () => { clearTimeout(timer); timer = setTimeout(() => { if (alive) setLayoutRevision(value => value + 1); }, 180); };
    window.addEventListener('resize', resized);
    void document.fonts.ready.then(resized);
    return () => { alive = false; clearTimeout(timer); window.removeEventListener('resize', resized); };
  }, []);
  const fa = locale === 'fa';
  const copy = (en: string, persian: string) => fa ? persian : en;
  const book = editorial.book;
  const groups = Array.from({ length: Math.ceil(Math.min(collections.length, 4) / 2) }, (_, i) => collections.slice(i * 2, i * 2 + 2));
  const chapterLinks = [
    ...literaryElements.map(element => ({ id: `chapter-${element.id}`, label: t(element.name, locale) })),
    { id: 'collections', label: copy('Scarves', 'روسری‌ها') },
    { id: 'books', label: copy('The book', 'کتاب') },
  ];

  useLayoutEffect(() => {
    if (reduced || !root.current || !track.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const host = root.current;
    const rail = track.current;
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = Array.from(rail.querySelectorAll<HTMLElement>('[data-panel]'));
      host.style.setProperty('--panel-width', `${host.clientWidth}px`);
      host.dataset.horizontal = 'true';
      // Never clip content at enlarged text sizes or when a translation needs more room.
      if (panels.some(panel => panel.scrollHeight > panel.clientHeight + 2)) {
        delete host.dataset.horizontal;
        return;
      }
      const reveals = panels.map(panel => Array.from(panel.querySelectorAll<HTMLElement>('[data-panel-reveal]')));
      const artwork = panels.map(panel => Array.from(panel.querySelectorAll<HTMLElement>('[data-panel-art]')));
      const overflow = () => Math.max(0, rail.scrollWidth - host.clientWidth);
      const startX = () => fa ? -overflow() : 0;
      const endX = () => fa ? 0 : -overflow();
      const movement = gsap.fromTo(rail, { x: startX }, {
        x: endX, ease: 'none',
        scrollTrigger: {
          trigger: host, start: 'top top', end: () => `+=${overflow()}`, pin: true, scrub: true,
          invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: self => {
            const position = self.progress * (panels.length - 1);
            const index = Math.min(panels.length - 1, Math.round(position));
            reveals.forEach((items, panelIndex) => {
              const visibility = Math.max(0, 1 - Math.abs(panelIndex - position));
              items.forEach(item => { item.style.opacity = String(.4 + .6 * visibility); item.style.transform = 'translateY(' + (34 * (1 - visibility)) + 'px)'; });
            });
            artwork.forEach((items, panelIndex) => items.forEach((item, i) => { item.style.transform = 'translateY(' + ((panelIndex - position) * (i ? -18 : 18)) + 'px)'; }));
            host.dataset.activeIndex = String(index);
            host.style.setProperty('--journey-progress', String(self.progress));
            host.querySelectorAll<HTMLAnchorElement>('[data-chapter-link]').forEach(link => {
              const target = panels[index]?.id;
              const active = link.hash === `#${target}` || (target === 'scarves' && link.hash === '#collections') || (target === 'editions' && link.hash === '#books');
              if (active) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current');
            });
          },
        },
      });
      const showPanel = (target: HTMLElement, focus = true, writeHistory = true) => {
        const panel = target.closest<HTMLElement>('[data-panel]');
        const index = panel ? panels.indexOf(panel) : -1;
        const trigger = movement.scrollTrigger;
        if (index < 0 || !trigger) return false;
        const position = trigger.start + index / (panels.length - 1) * (trigger.end - trigger.start);
        window.dispatchEvent(new CustomEvent('muguetli:scroll', { detail: { top: position } }));
        ScrollTrigger.update();
        if (writeHistory) history.pushState(history.state, '', `#${target.id}`);
        if (focus) { if (!target.hasAttribute('tabindex')) target.tabIndex = -1; target.focus({ preventScroll: true }); }
        return true;
      };
      const navigate = (event: Event) => {
        const id = (event as CustomEvent<{ id: string }>).detail?.id;
        const target = id ? document.getElementById(id) : null;
        if (target && host.contains(target) && showPanel(target)) event.preventDefault();
      };
      const focusPanel = (event: FocusEvent) => {
        if (event.target instanceof HTMLElement && rail.contains(event.target)) showPanel(event.target, false, false);
      };
      const restoreHash = () => {
        let id = '';
        try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
        const target = document.getElementById(id);
        if (target && host.contains(target)) showPanel(target, false, false);
      };
      window.addEventListener('muguetli:anchor', navigate);
      window.addEventListener('hashchange', restoreHash);
      window.addEventListener('popstate', restoreHash);
      rail.addEventListener('focusin', focusPanel);
      let alive = true;
      const refresh = () => { if (alive) ScrollTrigger.refresh(); };
      const images = Array.from(rail.querySelectorAll('img'));
      images.forEach(image => image.addEventListener('load', refresh));
      void document.fonts.ready.then(() => { if (alive) { refresh(); restoreHash(); } });
      window.addEventListener('pageshow', refresh);
      return () => {
        alive = false;
        images.forEach(image => image.removeEventListener('load', refresh));
        window.removeEventListener('pageshow', refresh);
        window.removeEventListener('muguetli:anchor', navigate);
        window.removeEventListener('hashchange', restoreHash);
        window.removeEventListener('popstate', restoreHash);
        rail.removeEventListener('focusin', focusPanel);
        delete host.dataset.horizontal;
      };
    });
    return () => {
      media.revert();
      rail.querySelectorAll<HTMLElement>('[data-panel-reveal], [data-panel-art]').forEach(item => {
        ['opacity', 'transform', 'translate', 'rotate', 'scale'].forEach(property => item.style.removeProperty(property));
      });
    };
  }, [reduced, fa, collections.length, layoutRevision]);

  return <section ref={root} className={styles.journey} data-journey data-active-index="0" aria-label={copy('From the elements to the everyday', 'از عناصر تا زندگی')}>
    <div className={styles.navigation}>
      <span className={styles.navCaption}>{copy('A RITE OF PASSAGE', 'یک آیین گذار')}</span>
      <nav aria-label={copy('Journey chapters', 'فصل‌های سفر')}>{chapterLinks.map(link => <a key={link.id} data-chapter-link href={`#${link.id}`}>{link.label}</a>)}</nav>
      <a className={styles.skip} href="#founder">{copy('Meet the artist', 'دیدار با هنرمند')}<ArrowDown size={15} /></a>
    </div>
    <div ref={track} className={styles.track}>
      {literaryElements.map((element, i) => <article id={`chapter-${element.id}`} tabIndex={-1} key={element.id} data-panel data-surface="dark" className={`${styles.panel} ${styles.element}`}>
        <div className={styles.elementArt}>
          <span className={styles.giantWord} aria-hidden="true">{t(element.name, locale)}</span>
          <img src={`/media/four-mothers/${element.id}-key.webp`} alt="" width={1280} height={720} loading="lazy" />
          <span className={styles.artCaption}>MUGUETLI / {String(i + 1).padStart(2, '0')}</span>
        </div>
        <div className={styles.elementCopy}>
          <p className={styles.eyebrow} data-panel-reveal>{copy('THE FOUR MOTHERS', 'چهار مادر')} / {t(element.name, locale)}</p>
          <h2 data-panel-reveal>{t(element.title, locale)}</h2>
          <div className={styles.passage} data-panel-reveal><BookQuote excerpt={element.excerpt} locale={locale} compact /></div>
          <Link className={styles.textLink} href={`/${locale}/mythology#${element.id}`}>{copy('Inside the story', 'درون داستان')}<ArrowUpRight size={17} /></Link>
        </div>
      </article>)}

      {([['rust', 'red'], ['indigo', 'olive']] as const).map((ids, i) => <article key={ids[0]} id={i ? 'scarves' : 'collections'} tabIndex={-1} data-panel data-surface="light" className={`${styles.panel} ${styles.products}`}>
        <div className={styles.productIntro} data-panel-reveal>
          <p className={styles.eyebrow}>{copy('ART, IN ANOTHER FORM', 'هنر، در شکلی دیگر')}</p>
          <h2>{i ? copy('A world in every fold.', 'در هر تا، جهانی‌ست.') : copy('Wear the story.', 'داستان را بپوش.')}</h2>
          <p>{i ? copy('Illustrated worlds. Personal expression.', 'جهان‌های مصور. بیان شخصی.') : copy('Art leaves the frame. The next chapter is yours.', 'هنر از قاب بیرون می‌آید. فصل بعدی از آنِ توست.')}</p>
          <Link className={styles.textLink} href={shopUrl || `/${locale}/collections`}>{copy('Explore the collection', 'دیدن مجموعه')}<ArrowUpRight size={17} /></Link>
        </div>
        <div className={styles.scarves}><ScarfGallery locale={locale} ids={[...ids]} cinematic /></div>
      </article>)}

      {groups.map((group, i) => <article id={`connected-collections-${i}`} key={group[0].id} tabIndex={-1} data-panel data-surface="light" className={`${styles.panel} ${styles.products}`}>
        <div className={styles.productIntro}><p className={styles.eyebrow}>MUGUETLI</p><h2>{copy('The collections', 'مجموعه‌ها')}</h2></div>
        <div className={styles.connected}>{group.map(collection => <a key={collection.id} href={collection.url}><img src={collection.image} alt={collection.name} width={600} height={600} loading="lazy" /><h3>{collection.name}<ArrowUpRight size={19} /></h3></a>)}</div>
      </article>)}

      <article id="books" tabIndex={-1} data-panel data-surface="dark" className={`${styles.panel} ${styles.book}`}>
        <div className={styles.bookIdentity} data-panel-reveal>
          <p className={styles.eyebrow}>{copy('THE STORY BEFORE THE SILK', 'داستان، پیش از پوشیدن')}</p>
          <h2 lang="fa" dir="rtl">{book?.originalTitle || 'زنگله‌ام'}</h2>
          {!fa && <p className={styles.transliteration}>Zangole’am</p>}
          <p className={styles.subtitle}>{book && t(book.subtitle, locale)}</p>
          <span className={styles.byline}>{book && t(book.author, locale)} · {copy('Originally written in Persian', 'به زبان فارسی')}</span>
          <Link href={`/${locale}/books`} className={styles.textLink}>{copy('Enter the book', 'ورود به جهان کتاب')}<ArrowUpRight size={17} /></Link>
        </div>
        <div className={styles.bookPassage} data-panel-reveal>
          <p>{book && t(book.synopsis, locale)}</p>
          <div className={styles.bookQuote}><p className={styles.eyebrow}>{copy('THE ALCHEMY OF SUFFERING', 'جواهرِ وجود و کیمیاگریِ رنج')}</p><BookQuote excerpt={bookExcerpts.rebirth} locale={locale} compact /></div>
        </div>
      </article>
      <article id="editions" tabIndex={-1} data-panel data-surface="light" className={`${styles.panel} ${styles.editions}`}>
        <div className={styles.editionHeading}><p className={styles.eyebrow}>{copy('TWO WAYS INTO ONE WORLD', 'دو راه به یک جهان')}</p><h2>{copy('Keep the story close.', 'داستان را نزدیک نگه دار.')}</h2></div>
        <div className={styles.editionGrid}>{[
          { name: copy('The physical book', 'کتاب چاپی'), title: copy('To hold.', 'برای لمس‌کردن.'), text: copy('A place on your bookshelf. A world to return to.', 'جایی در کتابخانه‌ات؛ جهانی برای بازگشتن.'), url: book?.url, href: `/${locale}/books`, icon: BookOpen },
          { name: copy('The eBook', 'کتاب الکترونیکی'), title: copy('To take along.', 'برای همراه‌داشتن.'), text: copy('The same world, wherever you find a moment to read.', 'همان جهان، هر کجا که فرصتی برای خواندن پیدا کنی.'), url: book?.ebookUrl, href: `/${locale}/ebook`, icon: Tablet },
        ].map((edition, i) => <div key={edition.name} className={styles.edition} data-panel-reveal>
          <div className={styles.editionTop}><span>0{i + 1} / {edition.name}</span><edition.icon size={27} strokeWidth={1} /></div>
          <h3>{edition.title}</h3><p>{edition.text}</p><small>{copy('Persian text', 'متن فارسی')}</small>
          {edition.url ? <a href={edition.url} className={styles.textLink}>{copy(i ? 'Get the eBook' : 'Buy the book', i ? 'دریافت کتاب' : 'خرید کتاب')}<ArrowUpRight size={17} /></a> : <><p className={styles.availability}>{copy(i ? 'Download not yet available' : 'Purchase not yet available', i ? 'دانلود هنوز در دسترس نیست' : 'خرید هنوز در دسترس نیست')}</p><Link className={styles.textLink} href={edition.href}>{copy('Read about this edition', 'دربارهٔ این نسخه')}<ArrowUpRight size={17} /></Link></>}
        </div>)}</div>
        <a className={styles.continue} href="#founder">{copy('Behind this world, a woman.', 'پشت این جهان، یک زن.')}<ArrowDown size={18} /></a>
      </article>
    </div>
    <div className={styles.progress} aria-hidden="true"><span /></div>
  </section>;
}
