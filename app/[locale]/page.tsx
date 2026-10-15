import { notFound } from 'next/navigation';
import { HomePage } from '@/components/home-page';
import { editorialCollections } from '@/lib/editorial';
import { isLocale, locales } from '@/lib/muguetli';
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export default async function LocaleHome({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 return <HomePage locale={locale} products={{}} collections={editorialCollections}/>;
}
