'use client';
import { useEffect,useRef,type RefObject } from 'react';
import type { Locale } from '@/lib/muguetli';
import styles from './canvas-hero.module.css';

const beats = [
 {tag:['01 / ARRIVAL','۰۱ / ورود'],lines:[['From the heights','we came, to the','heights we ascend.'],['ما ز','بالاییم و بالا','می‌رویم.']],body:['A world of matter, memory and transformation begins here.','جهانی از ماده، حافظه و دگرگونی از همین‌جا آغاز می‌شود.']},
 {tag:['02 / TRANSLATION','۰۲ / ترجمه'],lines:[['A story becomes','image, then','form.'],['داستان به تصویر،','و تصویر به','فرم بدل می‌شود.']],body:['Language becomes image; image becomes something you can carry.','زبان به تصویر بدل می‌شود؛ تصویر به چیزی که می‌توانی با خود حمل کنی.']},
 {tag:['03 / EMBODIMENT','۰۳ / تجسّم'],lines:[['Wear what','transformed','you.'],['آنچه','دگرگونت کرد،','بپوش.']],body:['Enter the catalogue, the Atelier and a private conversation when the story finds you.','وقتی داستان تو را پیدا کرد، وارد فهرست آثار، آتلیه و گفت‌وگویی خصوصی شو.']},
];

export function TextDrum({progress,active,enabled,locale}:{progress:RefObject<number>;active:RefObject<boolean>;enabled:boolean;locale:Locale}) {
 const elements=useRef<(HTMLDivElement|null)[]>([]);
 useEffect(()=>{
   if(!enabled)return;
   let raf=0;
   const draw=()=>{
     if(active.current){
       const position=progress.current*(beats.length-1);
       elements.current.forEach((el,i)=>{if(!el)return;const offset=i-position;
         el.style.transform=`translateY(-50%) perspective(900px) translateY(${offset*.82*innerHeight}px) translateZ(${-Math.abs(offset)*.3*innerHeight}px) rotateX(${-offset*58}deg)`;
         el.setAttribute('aria-hidden',String(Math.abs(offset)>.5));
       });
     }
     raf=requestAnimationFrame(draw);
   };
   raf=requestAnimationFrame(draw);return()=>cancelAnimationFrame(raf);
 },[progress,active,enabled]);
 const language=locale==='fa'?1:0;
 return <div className={styles.drum} aria-label={locale==='fa'?'داستان موگه‌تلی':'The Muguetli story'}>
  {beats.map((beat,i)=><div key={beat.tag[0]} ref={el=>{elements.current[i]=el;}} className={styles.beat} aria-hidden={i!==0} style={{transform:`translateY(-50%) perspective(900px) translateY(${i*82}vh) translateZ(${-i*30}vh) rotateX(${-i*58}deg)`}}>
    <span className={styles.beatPill}>{beat.tag[language]}</span>
    {i===0?<h1 className="text-5xl md:text-6xl xl:text-7xl">{beat.lines[language].map((line,j)=>j===2?<span className={styles.beatAccent} key={line}>{line}</span>:<span key={line}>{line}</span>)}</h1>:<h2 className="text-5xl md:text-6xl xl:text-7xl">{beat.lines[language].map((line,j)=>j===2?<span className={styles.beatAccent} key={line}>{line}</span>:<span key={line}>{line}</span>)}</h2>}
    <p>{beat.body[language]}</p>
  </div>)}
 </div>;
}
