import { notFound } from 'next/navigation';
import { HomePage } from '@/components/home-page';
import { fetchFeaturedProducts, fetchCollections } from '@/lib/woocommerce';
import { isLocale, locales } from '@/lib/muguetli';
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export default async function LocaleHome({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 const [products,collections]=await Promise.all([fetchFeaturedProducts(),fetchCollections()]);
 return <HomePage locale={locale} products={products} collections={collections} shopUrl={process.env.NEXT_PUBLIC_SHOP_URL} journalUrl={process.env.NEXT_PUBLIC_JOURNAL_URL}/>;
}
