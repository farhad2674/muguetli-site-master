'use client';
import { useEffect,useRef,type RefObject } from 'react';
import type { Locale } from '@/lib/muguetli';
import styles from './canvas-hero.module.css';

const beats = [
 {tag:['01 / MATTER','۰۱ / ماده'],lines:[['What you','carry becomes','silk.'],['آنچه از','سر می‌گذرانی،','ابریشم می‌شود.']],body:['Memory, heritage, transformation. Enter a world where the story becomes something you wear.','حافظه، میراث، دگرگونی. به جهانی قدم بگذار که داستانش را می‌پوشی.']},
 {tag:['02 / MEMORY','۰۲ / حافظه'],lines:[['A story','beneath every','fold.'],['در پسِ','هر تا،','داستانی‌ست.']],body:['Art and personal mythology, carried beyond the frame. Find the piece that speaks your language.','هنر و اسطوره‌های شخصی، فراتر از قاب. اثری را پیدا کن که به زبان تو سخن می‌گوید.']},
 {tag:['03 / TRANSFORMATION','۰۳ / دگرگونی'],lines:[['Wear what','transformed','you.'],['آنچه','دگرگونت کرد،','بپوش.']],body:['The story continues in our collections, in your personal style, and in the world you make your own.','داستان در مجموعه‌ها، در استایل شخصی تو و در جهانی که از آنِ خود می‌کنی ادامه دارد.']},
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
    {i===0?<h1 className="text-5xl md:text-6xl xl:text-7xl">{beat.lines[language].map((line,j)=>j===2?<em key={line}>{line}</em>:<span key={line}>{line}</span>)}</h1>:<h2 className="text-5xl md:text-6xl xl:text-7xl">{beat.lines[language].map((line,j)=>j===2?<em key={line}>{line}</em>:<span key={line}>{line}</span>)}</h2>}
    <p>{beat.body[language]}</p>
  </div>)}
 </div>;
}
