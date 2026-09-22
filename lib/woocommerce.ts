import type { ElementId, FeaturedProduct } from './muguetli';

type WooProduct = {
  id?: number;
  name?: string;
  permalink?: string;
  images?: Array<{ src?: string }>;
  prices?: { price?: string; currency_code?: string; currency_minor_unit?: number };
};

function allowedUrl(value: string, origin: URL) {
  try { return ['http:', 'https:'].includes(new URL(value).protocol) && new URL(value).host === origin.host; } catch { return false; }
}

export async function fetchFeaturedProducts(): Promise<Partial<Record<ElementId, FeaturedProduct[]>>> {
  const apiBase = process.env.WORDPRESS_STORE_API_URL;
  if (!apiBase) return {};

  let origin: URL;
  try { origin = new URL(apiBase); } catch { return {}; }

  const result: Partial<Record<ElementId, FeaturedProduct[]>> = {};
  const elements: ElementId[] = ['water', 'fire', 'earth', 'air'];

  await Promise.all(elements.map(async (element) => {
    const category = process.env[`WOO_CATEGORY_${element.toUpperCase()}`] ?? element;
    try {
      const url = new URL('/wp-json/wc/store/v1/products', origin);
      url.searchParams.set('category', category);
      url.searchParams.set('per_page', '3');
      const response = await fetch(url, { signal: AbortSignal.timeout(5000), next: { revalidate: 300 } });
      if (!response.ok) return;
      const data = (await response.json()) as WooProduct[];
      if (!Array.isArray(data)) return;
      result[element] = data.flatMap((product) => {
        if (!product || typeof product !== 'object') return [];
        const permalink = product.permalink ?? '';
        const image = product.images?.[0]?.src ?? '';
        if (!Number.isInteger(product.id) || (product.id ?? 0) <= 0 || typeof product.name !== 'string' || !product.name.trim() || !allowedUrl(permalink, origin)) return [];
        if (!image || !allowedUrl(image, origin)) return [];
        const minor = product.prices?.currency_minor_unit ?? 2;
        const rawPrice = Number(product.prices?.price);
        const currency = product.prices?.currency_code ?? '';
        return [{
          id: product.id!,
          name: product.name.replace(/<[^>]*>/g, ''),
          image,
          permalink,
          price: product.prices?.price !== '' && Number.isFinite(rawPrice) && rawPrice >= 0 && Number.isInteger(minor) && minor >= 0 && minor <= 6 && /^[A-Z]{3}$/.test(currency)
            ? { value: rawPrice / 10 ** minor, currency }
            : undefined,
        }];
      });
    } catch {
      result[element] = [];
    }
  }));

  return result;
}

/** Collections are read from the same WooCommerce catalog as products. */
export async function fetchCollections(): Promise<import('./editorial').Collection[]> {
  const base = process.env.WORDPRESS_STORE_API_URL;
  if (!base) return [];
  try {
    const origin = new URL(base);
    if(!['http:','https:'].includes(origin.protocol)) return [];
    const response=await fetch(new URL('/wp-json/wc/store/v1/products/categories?per_page=6&hide_empty=true',origin),{signal:AbortSignal.timeout(5000),next:{revalidate:300}});
    if(!response.ok) return [];
    const data=await response.json();
    if(!Array.isArray(data)) return [];
    return data.flatMap(c=>{
      if (!c || typeof c !== 'object') return [];
      if(!Number.isInteger(c.id)||typeof c.name!=='string'||typeof c.permalink!=='string'||!allowedUrl(c.permalink,origin)||!c.image?.src||!allowedUrl(c.image.src,origin))return [];
      return [{id:c.id,name:c.name.replace(/<[^>]*>/g,''),description:typeof c.description==='string'?c.description.replace(/<[^>]*>/g,''):'',image:c.image.src,url:c.permalink}];
    });
  } catch { return []; }
}

