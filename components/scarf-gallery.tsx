'use client';

import { ArrowUpRight, X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { scarfStudies } from '@/lib/editorial';
import { t, type Locale } from '@/lib/muguetli';
import styles from './scarf-gallery.module.css';

export function ScarfGallery({ locale }: { locale: Locale }) {
  const fa = locale === 'fa';
  return <div className={styles.grid}>
    {scarfStudies.map((scarf, index) => <article key={scarf.id} className={styles.card} id={`scarf-${scarf.id}`}>
      <Dialog>
        <div className={styles.imageMotion} data-scarf>
          <DialogTrigger className={styles.imageButton} aria-label={`${fa ? 'نمای نزدیک' : 'View scarf'}: ${t(scarf.name, locale)}`}>
            <img src={scarf.image} alt={t(scarf.description, locale)} width={1280} height={1280} loading="lazy" />
            <span className={styles.view}>{fa ? 'از نزدیک' : 'A closer look'}<ArrowUpRight size={18} /></span>
          </DialogTrigger>
        </div>
        <div className={styles.caption}>
          <span className={styles.index}>{new Intl.NumberFormat(fa ? 'fa-IR' : 'en', { minimumIntegerDigits: 2 }).format(index + 1)}</span>
          <div><h3>{t(scarf.name, locale)}</h3><p>{t(scarf.description, locale)}</p></div>
          <span className={styles.swatch} style={{ background: scarf.color }} aria-hidden="true" />
        </div>
        <DialogContent className={styles.dialog} showCloseButton={false} dir={fa ? 'rtl' : 'ltr'}>
          <DialogClose className={styles.close} aria-label={fa ? 'بستن' : 'Close'}><X size={21} /></DialogClose>
          <img className={styles.detailImage} src={scarf.image} alt={t(scarf.description, locale)} width={1280} height={1280} />
          <div className={styles.details}>
            <span className={styles.detailLabel}>MUGUETLI / {fa ? 'روسری' : 'SCARVES'}</span>
            <DialogTitle className={styles.title}>{t(scarf.name, locale)}</DialogTitle>
            <DialogDescription className={styles.description}>{t(scarf.description, locale)}</DialogDescription>
            <p className={styles.availability}>{fa ? 'اطلاعات اندازه، جنس و خرید به‌زودی اعلام می‌شود.' : 'Size, material and purchase details are yet to be announced.'}</p>
          </div>
        </DialogContent>
      </Dialog>
    </article>)}
  </div>;
}
