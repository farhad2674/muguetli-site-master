import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product-detail';
import { designBySlug, isSizeCode, publishedDesigns } from '@/lib/catalog';
import { isLocale, locales, t } from '@/lib/muguetli';

type Params = Promise<{ locale: string; slug: string }>;
type Query = Promise<{ size?: string | string[] }>;

export function generateStaticParams() {
  return locales.flatMap(locale => publishedDesigns.map(design => ({ locale, slug: design.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const design = designBySlug(slug);
  if (!isLocale(locale) || !design) return {};
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  const path = `/${locale}/products/${slug}`;
  return {
    title: t(design.title, locale),
    description: locale === 'fa' ? `طرح ${design.id} از مجموعهٔ هنر پوشیدنی موگه‌تلی.` : `${design.id} from the Muguetli wearable art archive.`,
    alternates: {
      canonical: origin ? `${origin}${path}` : path,
      languages: { en: origin ? `${origin}/en/products/${slug}` : `/en/products/${slug}`, fa: origin ? `${origin}/fa/products/${slug}` : `/fa/products/${slug}` },
    },
  };
}

export default async function Product({ params, searchParams }: { params: Params; searchParams: Query }) {
  const [{ locale, slug }, query] = await Promise.all([params, searchParams]);
  const design = designBySlug(slug);
  if (!isLocale(locale) || !design) notFound();
  const requestedSize = query.size;
  if (requestedSize !== undefined && (typeof requestedSize !== 'string' || !isSizeCode(requestedSize) || !design.options.some(option => option.code === requestedSize))) notFound();
  const selectedSize = typeof requestedSize === 'string' && isSizeCode(requestedSize) ? requestedSize : design.options[0].code;
  return <ProductDetail locale={locale} design={design} selectedSize={selectedSize} />;
}
