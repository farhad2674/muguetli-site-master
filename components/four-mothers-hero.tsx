'use client';

import { useEffect, useRef, useState } from 'react';
import { Flame, Sprout, Waves, Wind, ArrowDown, ArrowUpRight } from 'lucide-react';
import { chapters, t, type Locale } from '@/lib/muguetli';
import styles from './four-mothers-hero.module.css';

const icons = [Waves, Flame, Sprout, Wind];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
// Match narrative labels to the newly assembled film, not the old master.
const stops = [0, .17, .39, .78];
const keyframes = [0, .26, .64, .96];
const activeAt = (p: number) => p < stops[1] ? 0 : p < stops[2] ? 1 : p < stops[3] ? 2 : 3;

export function FourMothersHero({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const [manualReduced, setManualReduced] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!section || !stage || !video) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 760px)');
    let frame = 0, target = 0, rendered = 0, inView = true, last = -1;
    const measure = () => {
      const rect = section.getBoundingClientRect();
      target = clamp(-rect.top / Math.max(1, section.offsetHeight - innerHeight));
      inView = rect.bottom > 0 && rect.top < innerHeight;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const draw = () => {
      frame = 0;
      if (reduced.matches || manualReduced) return;
      rendered += (target - rendered) * .18;
      if (Math.abs(target-rendered) < .0001) rendered=target;
      const filmProgress=clamp(rendered / .91);
      const chapter=activeAt(filmProgress);
      if(chapter !== last) { last=chapter;setActive(chapter); }
      stage.style.setProperty('--progress',String(rendered));
      stage.style.setProperty('--exit',String(clamp((rendered-.89)/.11)));
      stage.style.setProperty('--title-exit',String(clamp((rendered-.86)/.06)));
      stage.dataset.chapter=chapters[chapter].id;
      document.documentElement.style.setProperty('--hero-progress',String(rendered));
      const nextTime = filmProgress * Math.max(0,(video.duration || 6.08)-.045);
      // Serialize seeks. Reassigning currentTime while seeking can starve decoding.
      if(!mobile.matches && inView && video.readyState>=2 && !video.seeking && Math.abs(video.currentTime-nextTime)>.025) video.currentTime=nextTime;
      if(inView && (Math.abs(target-rendered)>.0001 || (!mobile.matches && video.readyState>=2 && Math.abs(video.currentTime-nextTime)>.04))) frame=requestAnimationFrame(draw);
    };
    const mode = () => {
      setStaticMode(reduced.matches || manualReduced);
      if(!mobile.matches && !reduced.matches && !manualReduced && !video.getAttribute('src')) { video.src='/media/four-mothers/continuous-film.mp4'; video.load(); }
      if(mobile.matches || reduced.matches || manualReduced) { video.removeAttribute('src');video.load(); }
      measure();
    };
    video.addEventListener('loadeddata',measure);
    video.addEventListener('seeked',measure);
    window.addEventListener('scroll',measure,{passive:true});
    window.addEventListener('resize',measure);
    reduced.addEventListener('change',mode);mobile.addEventListener('change',mode);
    mode();
    return()=>{ cancelAnimationFrame(frame);window.removeEventListener('scroll',measure);window.removeEventListener('resize',measure);reduced.removeEventListener('change',mode);mobile.removeEventListener('change',mode);video.removeEventListener('loadeddata',measure);video.removeEventListener('seeked',measure);document.documentElement.style.removeProperty('--hero-progress'); };
  },[manualReduced]);

  const number=(n:number)=>new Intl.NumberFormat(locale==='fa'?'fa-IR':'en',{minimumIntegerDigits:2}).format(n);
  const skip=()=>{ const el=document.getElementById('collections');el?.scrollIntoView({behavior:'instant'});el?.focus({preventScroll:true}); };
  const jump=(index:number)=>{const el=sectionRef.current;if(el)window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top+keyframes[index]*.91*(el.offsetHeight-innerHeight),behavior:'smooth'});};

  return <section ref={sectionRef} className={styles.story} data-static={staticMode || undefined} aria-label={locale==='fa'?'چهار مادر':'The Four Mothers'}>
    <p className="sr-only">{locale==='fa'?'چهار مادر. سفری با عناصر در جهان موگه‌تلی.':'The Four Mothers. An elemental journey through the world of Muguetli.'}</p>
    <div className={styles.stage} ref={stageRef} data-chapter="fire">
      <div className={styles.art} aria-hidden="true">
        <video ref={videoRef} className={styles.video} poster="/media/four-mothers/fire-key.webp" muted playsInline preload="metadata" onError={()=>setFailed(true)} style={failed?{display:'none'}:undefined}/>
        <div className={styles.stills} data-fallback={failed || undefined}>{chapters.map((c,i)=><img key={c.id} src={`/media/four-mothers/${c.id}-key.webp`} alt="" width={1280} height={720} fetchPriority={i===0?'high':'auto'} loading={i===0?'eager':'lazy'} data-active={i===active || undefined}/>)}</div>
      </div>
      <div className={styles.topline}><span>{locale==='fa'?'ماده، حافظه، دگرگونی':'MATTER. MEMORY. METAMORPHOSIS.'}</span><button onClick={()=>{setManualReduced(true);sectionRef.current?.scrollIntoView({behavior:'instant'});}}>{locale==='fa'?'داستان بدون حرکت':'Read without animation'}</button></div>
      <div className={styles.copy}>
        {chapters.map((chapter,i)=>{const Icon=icons[i];return <div className={styles.chapter} key={chapter.id} data-active={active===i || undefined} aria-hidden={active!==i}>
          <p className={styles.eyebrow}><Icon size={19} strokeWidth={1.25}/><span>{number(i+1)} / {t(chapter.name,locale)}</span></p>
          {i===0?<h1 className={styles.title}><span>{t(chapter.title,locale)}</span></h1>:<h2 className={styles.title}><span>{t(chapter.title,locale)}</span></h2>}
          <p className={styles.line}>{t(chapter.microLine,locale)}</p>
        </div>})}
      </div>
      <span className={styles.sideNote}>{locale==='fa'?'جهان موگه‌تلی':'THE WORLD OF MUGUETLI'}</span>
      <div className={styles.bottom}>
        <span className={styles.scrollHint}><ArrowDown size={16}/>{locale==='fa'?'با اسکرول، دگرگون کن':'SCROLL TO TRANSFORM'}</span>
        <nav className={styles.chapters} aria-label={locale==='fa'?'فصل‌های داستان':'Story chapters'}>{chapters.map((c,i)=><button key={c.id} onClick={()=>jump(i)} aria-label={t(c.name,locale)} aria-current={i===active?'step':undefined}><span>{number(i+1)}</span><i/></button>)}</nav>
        <button className={styles.skip} onClick={skip}>{locale==='fa'?'دیدن مجموعه‌ها':'Skip to collections'}<ArrowUpRight size={16}/></button>
      </div>
      <div className={styles.exit} aria-hidden="true"><span>MUGUETLI</span><h2>{locale==='fa'?'چهار مادر':'THE FOUR MOTHERS'}</h2><p>{locale==='fa'?'سفری با عناصر در جهان موگه‌تلی.':'An elemental journey through the world of Muguetli.'}</p><ArrowDown size={22}/></div>
      <div className={styles.progress} aria-hidden="true"/>
    </div>
    <div className={styles.staticStory}>
      {manualReduced && <button className={styles.restoreMotion} onClick={()=>{setManualReduced(false);sectionRef.current?.scrollIntoView({behavior:'instant'});}}>{locale==='fa'?'بازگشت به داستان متحرک':'Return to scroll story'}</button>}
      {chapters.map((c,i)=><article key={c.id}><img src={`/media/four-mothers/${c.id}-key.webp`} width={1280} height={720} alt={t(c.name,locale)} loading={i===0?'eager':'lazy'}/><div><p>{number(i+1)} / {t(c.name,locale)}</p>{i===0?<h1>{t(c.title,locale)}</h1>:<h2>{t(c.title,locale)}</h2>}<p>{t(c.microLine,locale)}</p></div></article>)}
      <footer className={styles.staticFinale}><h2>{locale==='fa'?'چهار مادر':'THE FOUR MOTHERS'}</h2><p>{locale==='fa'?'سفری با عناصر در جهان موگه‌تلی.':'An elemental journey through the world of Muguetli.'}</p></footer>
    </div>
  </section>;
}
