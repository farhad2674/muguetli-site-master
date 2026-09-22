'use client';

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { Pause, Play } from 'lucide-react';
import type { Locale } from '@/lib/muguetli';
import styles from './motion-preference.module.css';

const MotionContext = createContext({ reduced: false, manual: false, toggle: () => {} });
let storageFallback = false;
const manualSnapshot = () => { try { return localStorage.getItem('muguetli-reduced-motion') === 'true'; } catch { return storageFallback; } };
const systemSnapshot = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const serverSnapshot = () => false;
const subscribeManual = (notify: () => void) => {
  window.addEventListener('storage', notify);
  window.addEventListener('muguetli:motion', notify);
  return () => { window.removeEventListener('storage', notify); window.removeEventListener('muguetli:motion', notify); };
};
const subscribeSystem = (notify: () => void) => {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};

export function MotionPreference({ children }: { children: React.ReactNode }) {
  const manual = useSyncExternalStore(subscribeManual, manualSnapshot, serverSnapshot);
  const system = useSyncExternalStore(subscribeSystem, systemSnapshot, serverSnapshot);
  const reduced = manual || system;
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced);
  }, [reduced]);
  const toggle = () => {
    const journey = document.querySelector<HTMLElement>('[data-journey]');
    const panels = journey?.querySelectorAll<HTMLElement>('[data-panel]');
    const rect = journey?.getBoundingClientRect();
    const panel = rect && rect.top < innerHeight && rect.bottom > 0
      ? journey?.dataset.horizontal === 'true' ? panels?.[Number(journey.dataset.activeIndex || 0)] : Array.from(panels || []).find(item => { const bounds = item.getBoundingClientRect(); return bounds.top < innerHeight / 2 && bounds.bottom > innerHeight / 2; }) : undefined;
    const next = !manual;
    storageFallback = next;
    try { localStorage.setItem('muguetli-reduced-motion', String(next)); } catch { /* Storage is optional. */ }
    window.dispatchEvent(new Event('muguetli:motion'));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!panel?.isConnected) return;
      const event = new CustomEvent('muguetli:anchor', { detail: { id: panel.id }, cancelable: true });
      if (window.dispatchEvent(event)) panel.scrollIntoView({ block: 'start', behavior: 'instant' });
    }));
  };
  return <MotionContext.Provider value={{ reduced, manual, toggle }}>{children}</MotionContext.Provider>;
}

export const useMotionPreference = () => useContext(MotionContext);

export function MotionToggle({ locale }: { locale: Locale }) {
  const { reduced, manual, toggle } = useMotionPreference();
  const fa = locale === 'fa';
  return <button className={styles.toggle} type="button" onClick={toggle} aria-pressed={reduced}
    aria-label={fa ? (manual ? 'فعال‌کردن حرکت' : 'کاهش حرکت') : (manual ? 'Enable motion' : 'Reduce motion')}>
    {reduced ? <Play size={15} /> : <Pause size={15} />}
    <span>{fa ? (reduced ? 'حرکت آرام' : 'کاهش حرکت') : (reduced ? 'Motion reduced' : 'Reduce motion')}</span>
  </button>;
}
