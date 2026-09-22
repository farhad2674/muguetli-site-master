'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    let raf = 0;
    const updateScroll = () => ScrollTrigger.update();
    const dispose = () => { cancelAnimationFrame(raf);lenis?.off('scroll',updateScroll);lenis?.destroy();lenis=undefined; };
    const start = () => {
      dispose();
      if(reduced.matches) return;
      lenis = new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true,touchMultiplier:1.6,autoRaf:false,prevent:node=>node.closest('[data-slot="sheet-content"], [data-slot="dialog-content"]')!==null});
      lenis.on('scroll',updateScroll);
      const tick=(time:number)=>{lenis?.raf(time);raf=requestAnimationFrame(tick);};
      raf=requestAnimationFrame(tick);
    };
    // Own in-page anchors so native jumping cannot compete with the Lenis tween.
    const anchorClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, {onComplete: () => {
        history.pushState(history.state, '', url.hash);
        target.focus({preventScroll:true});
      }});
    };
    start();reduced.addEventListener('change',start);document.addEventListener('click',anchorClick);
    return()=>{dispose();reduced.removeEventListener('change',start);document.removeEventListener('click',anchorClick);};
  },[]);
  return children;
}
