import type { MetadataRoute } from 'next';
import { locales } from '@/lib/muguetli';
import { pageSlugs } from '@/lib/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
  return locales.flatMap((locale) => [
    { url: `${origin}/${locale}`, priority: 1, changeFrequency: 'weekly' as const },
    ...pageSlugs.map((slug) => ({ url: `${origin}/${locale}/${slug}`, priority: slug === 'mythology' ? .8 : .5, changeFrequency: 'monthly' as const })),
  ]);
}
