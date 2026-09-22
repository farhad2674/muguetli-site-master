import { notFound } from 'next/navigation';
import { SiteChrome } from '@/components/site-chrome';
import { isLocale } from '@/lib/muguetli';
import { fetchCollections } from '@/lib/woocommerce';
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 const collections=await fetchCollections();
 return <SiteChrome locale={locale} collections={collections} shopUrl={process.env.NEXT_PUBLIC_SHOP_URL} journalUrl={process.env.NEXT_PUBLIC_JOURNAL_URL}>{children}</SiteChrome>;
}
