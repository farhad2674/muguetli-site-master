import type { MetadataRoute } from 'next';
import { locales } from '@/lib/muguetli';
import { pageSlugs } from '@/lib/pages';
import { editorial } from '@/lib/editorial';
import { collectionIds, publishedDesigns } from '@/lib/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
  return locales.flatMap((locale) => [
    { url: `${origin}/${locale}`, priority: 1, changeFrequency: 'weekly' as const },
    ...pageSlugs.map((slug) => ({ url: `${origin}/${locale}/${slug}`, priority: slug === 'mythology' ? .8 : .5, changeFrequency: 'monthly' as const })),
    { url: `${origin}/${locale}/products`, priority: .7, changeFrequency: 'monthly' as const },
    { url: `${origin}/${locale}/archive`, priority: .4, changeFrequency: 'monthly' as const },
    { url: `${origin}/${locale}/archive/pistachio`, priority: .4, changeFrequency: 'monthly' as const },
    ...collectionIds.map(collection => ({ url: `${origin}/${locale}/collections/${collection}`, priority: .6, changeFrequency: 'monthly' as const })),
    ...publishedDesigns.map(design => ({ url: `${origin}/${locale}/products/${design.slug}`, priority: .6, changeFrequency: 'monthly' as const })),
    ...editorial.articles.map(article => ({ url: `${origin}/${locale}/journal/${article.id}`, priority: .5, changeFrequency: 'monthly' as const })),
  ]);
}
