export type Locale = 'en' | 'fa';
export type ElementId = 'fire' | 'earth' | 'water' | 'air';
export type StoryBeat = ElementId | 'intro' | 'return' | 'finale';

export interface LocalizedText { en: string; fa: string; }
export interface HistoricalSource {
  title: LocalizedText;
  author?: LocalizedText;
  url: string;
  sourceType: 'book' | 'article' | 'archive' | 'museum' | 'other';
  isDirectQuote: boolean;
}
export interface VideoCue {
  element: ElementId;
  scrollStart: number;
  scrollEnd: number;
  videoStart: number;
  videoEnd: number;
  productReveal: number;
}
export interface ElementChapter {
  id: ElementId;
  index: number;
  name: LocalizedText;
  title: LocalizedText;
  microLine: LocalizedText;
  wooCategory: string;
  poster: string;
  cue: VideoCue;
}
export interface FeaturedProduct {
  id: number;
  name: string;
  image: string;
  price?: { value: number; currency: string };
  permalink: string;
}

export const locales: Locale[] = ['en', 'fa'];
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const t = (text: LocalizedText, locale: Locale) => text[locale];

export const chapters: ElementChapter[] = [
  {
    id: 'water', index: 1, name: { en: 'WATER', fa: 'آب' },
    title: { en: 'SURRENDER', fa: 'تن‌سپاری' },
    microLine: { en: 'What sinks returns transformed.', fa: 'آنچه فرو می‌رود، دگرگون بازمی‌گردد.' },
    wooCategory: 'water', poster: '/media/four-mothers/water-key.webp',
    cue: { element: 'water', scrollStart: .08, scrollEnd: .27, videoStart: .9, videoEnd: 2.42, productReveal: .2 },
  },
  {
    id: 'fire', index: 2, name: { en: 'FIRE', fa: 'آتش' },
    title: { en: 'PURIFICATION', fa: 'پالایش' },
    microLine: { en: 'What must end becomes essence.', fa: 'آنچه باید پایان یابد، به جوهر بدل می‌شود.' },
    wooCategory: 'fire', poster: '/media/four-mothers/fire-key.webp',
    cue: { element: 'fire', scrollStart: .31, scrollEnd: .5, videoStart: 2.45, videoEnd: 4.42, productReveal: .43 },
  },
  {
    id: 'earth', index: 3, name: { en: 'EARTH', fa: 'خاک' },
    title: { en: 'ANCESTRAL MEMORY', fa: 'حافظهٔ نیاکان' },
    microLine: { en: 'What remains takes root.', fa: 'آنچه می‌ماند، ریشه می‌دواند.' },
    wooCategory: 'earth', poster: '/media/four-mothers/earth-key.webp',
    cue: { element: 'earth', scrollStart: .54, scrollEnd: .73, videoStart: 4.5, videoEnd: 7.42, productReveal: .66 },
  },
  {
    id: 'air', index: 4, name: { en: 'AIR', fa: 'باد' },
    title: { en: 'LIBERATION', fa: 'رهایی' },
    microLine: { en: 'What was carried becomes light.', fa: 'آنچه بر دوش بود، سبک می‌شود.' },
    wooCategory: 'air', poster: '/media/four-mothers/air-key.webp',
    cue: { element: 'air', scrollStart: .77, scrollEnd: .94, videoStart: 7.45, videoEnd: 10, productReveal: .88 },
  },
];

export const siteCopy = {
  brand: 'MUGUETLI',
  heroHook: { en: 'WHAT YOU SURVIVE BECOMES SILK.', fa: 'آنچه از سر می‌گذرانی، ابریشم می‌شود.' },
  mothers: { en: 'THE FOUR MOTHERS', fa: 'چهار مادر' },
  intro: { en: 'Four passages through matter, memory and transformation.', fa: 'چهار گذر از ماده، حافظه و دگرگونی.' },
  finale: { en: 'WEAR WHAT TRANSFORMED YOU.', fa: 'آنچه دگرگونت کرد، بپوش.' },
  explore: { en: 'Explore the collections', fa: 'دیدن مجموعه‌ها' },
  mythology: { en: 'Enter the mythology', fa: 'ورود به اسطوره' },
  skip: { en: 'Skip story', fa: 'عبور از داستان' },
  pending: { en: 'Store connection pending', fa: 'اتصال فروشگاه در انتظار است' },
} satisfies Record<string, string | LocalizedText>;

export const navigation = [
  { slug: '', label: { en: 'Home', fa: 'خانه' } },
  { slug: 'mythology', label: { en: 'Mythology', fa: 'اسطوره' } },
  { slug: 'about', label: { en: 'About', fa: 'درباره' } },
  { slug: 'contact', label: { en: 'Contact', fa: 'ارتباط' } },
] as const;

