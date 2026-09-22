'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { Sheet,SheetTrigger,SheetContent,SheetTitle,SheetDescription,SheetClose } from '@/components/ui/sheet';
import { NavigationMenu,NavigationMenuList,NavigationMenuItem,NavigationMenuTrigger,NavigationMenuContent,NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Accordion,AccordionItem,AccordionTrigger,AccordionContent } from '@/components/ui/accordion';
import { t,type Locale } from '@/lib/muguetli';
import { moreLabel,type Collection } from '@/lib/editorial';
import styles from './site-chrome.module.css';
import { MotionToggle, useMotionPreference } from './motion-preference';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function RollingLabel({ children }: { children: string }) {
 return <span className={styles.rollingLabel}><span>{children}</span><span aria-hidden="true">{children}</span></span>;
}

export function SiteChrome({locale,shopUrl,journalUrl,collections,children}:{locale:Locale;shopUrl?:string;journalUrl?:string;collections:Collection[];children:React.ReactNode}){
 const pathname=usePathname();const fa=locale==='fa';const home=`/${locale}`;const other=fa?'en':'fa';
 const [open,setOpen]=useState(false);const headerRef=useRef<HTMLElement>(null);
 const footerRef=useRef<HTMLElement>(null);const {reduced}=useMotionPreference();
 useEffect(()=>{
  if(reduced||!footerRef.current)return;
  gsap.registerPlugin(ScrollTrigger);
  const context=gsap.context(()=>{gsap.fromTo('[data-footer-mark]',{y:24},{y:0,ease:'none',scrollTrigger:{trigger:footerRef.current,start:'top bottom',end:'top 75%',scrub:true}});},footerRef);
  return()=>context.revert();
 },[reduced]);
 useEffect(()=>{
  document.documentElement.lang=locale;
  document.documentElement.dir=locale==='fa'?'rtl':'ltr';
 },[locale]);
 const copy=(en:string,faText:string)=>fa?faText:en;
 const more=[{slug:'nfts',name:'NFTs',fa:'ان‌اف‌تی'},{slug:'books',name:'Books',fa:'کتاب‌ها'},{slug:'ebook',name:'eBook',fa:'کتاب الکترونیکی'},{slug:'consulting',name:'Consulting',fa:'مشاوره'}];
 useEffect(()=>{
  let frame=0;
  const update=()=>{frame=0;const story=document.querySelector('main>section');const rect=story?.getBoundingClientRect();const commerce=pathname!==home||!rect?1:Math.max(0,Math.min(1,rect.height<=innerHeight+1?-rect.top/180:(innerHeight-rect.bottom+180)/180));headerRef.current?.style.setProperty('--commerce',String(commerce));headerRef.current?.style.setProperty('--shrink',String(Math.min(1,scrollY/350)));const surface=document.elementsFromPoint(innerWidth/2,160).map(el=>el.closest<HTMLElement>('[data-surface]')).find(Boolean);if(headerRef.current)headerRef.current.dataset.surface=surface?.dataset.surface||'light';};
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);return()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);cancelAnimationFrame(frame);};
 },[pathname,home]);
 const productsContent=<div className={styles.mega}><div className={styles.megaHead}><span>{copy('COLLECTIONS','مجموعه‌ها')}</span><a href={shopUrl||`${home}/collections`}>{copy('Shop All','همهٔ محصولات')}<ArrowUpRight size={16}/></a></div>{collections.length?<div className={styles.megaCards}>{collections.slice(0,6).map(c=><NavigationMenuLink key={c.id} href={c.url} className={styles.megaCard}><img src={c.image} alt="" width={400} height={400}/><span>{c.name}</span></NavigationMenuLink>)}</div>:<div className={styles.megaEmpty}><img src="/media/collection/scarf-red.jpg" alt="" width={1280} height={1280}/><div><p>{copy('Wear the story.','داستان را بپوش.')}</p><span>{copy('Illustrated scarves. A world in every fold.','روسری‌های مصور؛ جهانی در هر تا.')}</span><NavigationMenuLink href={`${home}/collections`}>{copy('Explore Collections','دیدن مجموعه‌ها')}<ArrowUpRight size={17}/></NavigationMenuLink></div></div>}</div>;
 return <>
 <a href="#main-content" className={styles.skipContent}>{copy('Skip navigation','عبور از ناوبری')}</a>
 <header ref={headerRef} className={styles.header}>
  <Link className={styles.brand} href={home}>MUGUETLI<span>{copy('ART IN TRANSFORMATION','هنر در دگرگونی')}</span></Link>
  <div className={styles.desktop}>
   <NavigationMenu align="center" aria-label={copy('Primary navigation','ناوبری اصلی')}><NavigationMenuList className={styles.navList}>
    <NavigationMenuItem><NavigationMenuTrigger className={styles.navLink}><RollingLabel>{copy('Products','محصولات')}</RollingLabel></NavigationMenuTrigger><NavigationMenuContent>{productsContent}</NavigationMenuContent></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href={journalUrl||`${home}/journal`} className={styles.navLink}><RollingLabel>{copy('Articles','مقاله‌ها')}</RollingLabel></NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuTrigger className={styles.navLink}><RollingLabel>{t(moreLabel,locale)}</RollingLabel></NavigationMenuTrigger><NavigationMenuContent><div className={styles.moreMenu}>{more.map(m=><NavigationMenuLink href={`${home}/${m.slug}`} key={m.slug}>{fa?m.fa:m.name}<ArrowUpRight size={16}/></NavigationMenuLink>)}</div></NavigationMenuContent></NavigationMenuItem>
   </NavigationMenuList></NavigationMenu>
  </div>
  <div className={styles.utilities}><MotionToggle locale={locale} /><Link className={styles.language} href={pathname.replace(/^\/(en|fa)/,`/${other}`)} onClick={()=>{document.cookie=`muguetli_locale=${other}; Max-Age=31536000; Path=/; SameSite=Lax`;}}>{fa?'EN':'FA'}</Link>{shopUrl&&<a href={shopUrl} aria-label={copy('Shop','فروشگاه')}><ShoppingBag size={19} strokeWidth={1.3}/></a>}
   <a className={styles.exploreCta} href={pathname===home?'#collections':`${home}/collections`}><span>{copy('Explore','کاوش')}</span><span className={styles.arrowBadge}><ArrowUpRight size={16}/></span></a>
   <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger className={styles.menuButton} aria-label={copy('Open navigation menu','باز کردن فهرست')} aria-expanded={open} aria-controls="muguetli-menu"><svg viewBox="0 0 32 24" aria-hidden="true"><path d="M2 7 Q15 5 29 7"/><path d="M7 16 Q18 18 30 16"/></svg></SheetTrigger>
    <SheetContent id="muguetli-menu" side="right" showCloseButton={false} className={styles.mobileMenu} dir={fa?'rtl':'ltr'}>
     <div className={styles.menuTop}><SheetTitle>MUGUETLI</SheetTitle><SheetClose className={styles.menuButton} aria-label={copy('Close navigation menu','بستن فهرست')}><svg viewBox="0 0 32 24" aria-hidden="true" className={styles.closeIcon}><path d="M5 3 L27 21"/><path d="M5 21 L27 3"/></svg></SheetClose></div>
     <SheetDescription className={styles.menuDescription}>{copy('A world of art, memory and transformation.','جهانی از هنر، حافظه و دگرگونی.')}</SheetDescription>
     <nav><Link onClick={()=>setOpen(false)} href={home} className={styles.mobileLink}>{copy('Home','خانه')}</Link>
      <Accordion><AccordionItem value="products"><AccordionTrigger className={styles.mobileLink}>{copy('Products','محصولات')}</AccordionTrigger><AccordionContent><div className={styles.mobileCollections}>{collections.map(c=><a onClick={()=>setOpen(false)} href={c.url} key={c.id}><img src={c.image} alt="" width={120} height={120}/><span>{c.name}</span></a>)}<a onClick={()=>setOpen(false)} href={shopUrl||`${home}/collections`}>{copy('Explore Collections','دیدن مجموعه‌ها')} ↗</a></div></AccordionContent></AccordionItem></Accordion>
      <Link onClick={()=>setOpen(false)} href={journalUrl||`${home}/journal`} className={styles.mobileLink}>{copy('Articles','مقاله‌ها')}</Link>
      <Accordion><AccordionItem value="more"><AccordionTrigger className={styles.mobileLink}>{t(moreLabel,locale)}</AccordionTrigger><AccordionContent><div className={styles.mobileMore}>{more.map(m=><Link onClick={()=>setOpen(false)} href={`${home}/${m.slug}`} key={m.slug}>{fa?m.fa:m.name}<ArrowUpRight size={16}/></Link>)}</div></AccordionContent></AccordionItem></Accordion>
     </nav><div className={styles.menuBottom}>MATTER · MEMORY · METAMORPHOSIS</div>
    </SheetContent>
   </Sheet>
  </div>
 </header>
 <div id="main-content" tabIndex={-1}>{children}</div>
 <footer ref={footerRef} className={styles.footer} data-surface="dark">
  <div className={styles.footerTop}>
   <div className={styles.footerIdentity}><Link href={home} className={styles.footerLogo} data-footer-mark>MUGUETLI</Link><p>{copy('A world to wear. A story to live.','جهانی برای پوشیدن. داستانی برای زیستن.')}</p><a className={styles.backToTop} href="#main-content">{copy('Back to top','بازگشت به بالا')} ↑</a></div>
   <nav aria-label={copy('Sitemap','نقشهٔ سایت')} className={styles.footerMap}><h2>{copy('SITEMAP','نقشهٔ سایت')}</h2><div><Link href={home}>{copy('Home','خانه')}</Link><Link href={shopUrl||`${home}/collections`}>{copy('Scarves & collections','روسری‌ها و مجموعه‌ها')}</Link><Link href={`${home}/books`}>{copy('Physical book','کتاب چاپی')}</Link><Link href={`${home}/ebook`}>{copy('eBook','کتاب الکترونیکی')}</Link><Link href={`${home}/about`}>{copy('Founder & story','بنیان‌گذار و داستان')}</Link><Link href={`${home}/consulting`}>{copy('The atelier','آتلیه')}</Link><Link href={journalUrl||`${home}/journal`}>{copy('Journal','ژورنال')}</Link><Link href={`${home}/nfts`}>{copy('Digital art','هنر دیجیتال')}</Link><Link href={`${home}/mythology`}>{copy('The Four Mothers','چهار مادر')}</Link></div></nav>
   <nav aria-label={copy('Information','اطلاعات')} className={styles.footerInfo}><h2>{copy('INFORMATION','اطلاعات')}</h2><Link href={`${home}/contact`}>{copy('Contact','ارتباط')}</Link><Link href={`${home}/privacy`}>{copy('Privacy','حریم خصوصی')}</Link><Link href={`${home}/accessibility`}>{copy('Accessibility','دسترسی‌پذیری')}</Link><Link href={`${home}/cookies`}>{copy('Cookies','کوکی‌ها')}</Link></nav>
  </div>
  <div className={styles.footerBottom}><span>© {new Date().getFullYear()} MUGUETLI</span><span>{copy('ART IN TRANSFORMATION','هنر در دگرگونی')}</span><Link href={pathname.replace(/^\/(en|fa)/,`/${other}`)} onClick={()=>{document.cookie=`muguetli_locale=${other}; Max-Age=31536000; Path=/; SameSite=Lax`;}}>{fa?'English':'فارسی'} ↗</Link></div>
 </footer>
 </>;
}


