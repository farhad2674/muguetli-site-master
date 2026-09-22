import type { LocalizedText } from './muguetli';
import { founderStory } from './book-story';

export const pageSlugs = ['mythology', 'about', 'contact', 'privacy', 'accessibility', 'cookies', 'collections', 'consulting', 'books', 'ebook', 'nfts', 'journal'] as const;
export type PageSlug = typeof pageSlugs[number];
export const isPageSlug = (value: string): value is PageSlug => pageSlugs.includes(value as PageSlug);

type PageCopy = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  lede: LocalizedText;
  body: LocalizedText[];
};

export const pages: Record<PageSlug, PageCopy> = {
  collections: {
    eyebrow: { en: 'MUGUETLI / COLLECTIONS', fa: 'موگه‌تلی / مجموعه‌ها' },
    title: { en: 'WEAR THE STORY', fa: 'داستان را بپوش' },
    lede: { en: 'Artworks made to live beyond the frame.', fa: 'آثاری برای زندگی، فراتر از قاب.' },
    body: [{ en: 'The catalog is not available in this preview yet. Please return to discover the collections when the store opens here.', fa: 'فهرست محصولات هنوز در این پیش‌نمایش در دسترس نیست. مجموعه‌ها پس از اتصال فروشگاه در اینجا نمایش داده می‌شوند.' }],
  },
  consulting: {
    eyebrow: { en: 'MUGUETLI / CREATIVE CONSULTING', fa: 'موگه‌تلی / مشاورهٔ خلاق' },
    title: { en: 'BECOME YOUR OWN MUSE', fa: 'خودت الهام‌بخش باش' },
    lede: { en: 'Your clothes. Your image. Your way of being seen.', fa: 'لباس تو. تصویر تو. شیوهٔ دیده‌شدن تو.' },
    body: [{ en: 'Consultation booking is not available in this preview yet.', fa: 'رزرو مشاوره هنوز در این پیش‌نمایش در دسترس نیست.' }],
  },
  books: {
    eyebrow: { en: 'MUGUETLI / BOOKS', fa: 'موگه‌تلی / کتاب‌ها' },
    title: { en: 'Zangole’am — The Physical Book', fa: 'زنگله‌ام — کتاب چاپی' },
    lede: { en: 'The Sacred Journey of the Lily of the Valley. A Persian book by Elnaz Bakhtiari.', fa: 'سفر مقدس گل موگه؛ کتابی به زبان فارسی، نوشتهٔ الناز بختیاری.' },
    body: [],
  },
  ebook: {
    eyebrow: { en: 'MUGUETLI / EBOOK', fa: 'موگه‌تلی / کتاب الکترونیکی' },
    title: { en: 'Zangole’am — The eBook', fa: 'زنگله‌ام — کتاب الکترونیکی' },
    lede: { en: 'Zangole’am in Persian. The digital edition of Elnaz Bakhtiari’s journey from grief to awakening.', fa: 'نسخهٔ دیجیتال زنگله‌ام به زبان فارسی؛ روایت الناز بختیاری از سوگ تا بیداری.' },
    body: [],
  },
  nfts: {
    eyebrow: { en: 'MUGUETLI / DIGITAL ART', fa: 'موگه‌تلی / هنر دیجیتال' },
    title: { en: 'ART, IN ANOTHER FORM', fa: 'هنر، در شکلی دیگر' },
    lede: { en: 'NFTs', fa: 'ان‌اف‌تی' },
    body: [{ en: 'Digital artworks are not available in this preview yet.', fa: 'آثار دیجیتال هنوز در این پیش‌نمایش در دسترس نیستند.' }],
  },
  journal: {
    eyebrow: { en: 'MUGUETLI / JOURNAL', fa: 'موگه‌تلی / ژورنال' },
    title: { en: 'NOTES FROM OUR WORLD', fa: 'یادداشت‌هایی از جهان ما' },
    lede: { en: 'Stories are taking shape.', fa: 'داستان‌ها در حال شکل‌گرفتن‌اند.' },
    body: [{ en: 'Our journal will appear here when published.', fa: 'یادداشت‌های منتشرشده در اینجا قرار می‌گیرند.' }],
  },
  mythology: {
    eyebrow: { en: 'ZANGOLE’AM / THE FOUR ELEMENTS', fa: 'زنگله‌ام / چهار عنصر' },
    title: { en: 'THE ALCHEMY OF THE SOUL', fa: 'کیمیاگری جان' },
    lede: {
      en: 'Fire, earth, water, wind. A journey across 21 stages, from grief to awakening and liberation.',
      fa: 'آتش، خاک، آب، باد؛ سفری در ۲۱ مرحله، از سوگ تا بیداری و رهایی.',
    },
    body: [
      {
        en: 'The four elements form the symbolic landscape of Zangole’am, written in Persian by Elnaz Bakhtiari. They connect the book’s inner journey with Muguetli’s visual world.',
        fa: 'چهار عنصر، جغرافیای نمادین زنگله‌ام را می‌سازند؛ اثری به زبان فارسی از الناز بختیاری که سفر درونی کتاب را به جهان تصویری موگه‌تلی پیوند می‌دهد.',
      },
    ],
  },
  about: {
    eyebrow: { en: 'MUGUETLI / THE AUTHOR & ARTIST', fa: 'موگه‌تلی / نویسنده و آفریننده' },
    title: { en: 'ELNAZ BAKHTIARI', fa: 'الناز بختیاری' },
    lede: {
      en: 'Muti. Author, artist and designer at the meeting of Bakhtiari heritage, Persian mysticism and the inner journey.',
      fa: 'موتی؛ نویسنده، هنرمند و طراح در تلاقی میراث بختیاری، عرفان ایرانی و سفر درونی.',
    },
    body: founderStory,
  },
  contact: {
    eyebrow: { en: 'CONTACT & STOCKISTS / 03', fa: 'ارتباط و فروشگاه‌ها / ۰۳' },
    title: { en: 'WHERE THE SILK FINDS YOU', fa: 'جایی که ابریشم تو را پیدا می‌کند' },
    lede: {
      en: 'Official contact and stockist details are being prepared for this standalone experience.',
      fa: 'اطلاعات رسمی ارتباط و فروشگاه‌های عرضه‌کننده برای این تجربهٔ مستقل در حال آماده‌سازی است.',
    },
    body: [
      {
        en: 'No inquiry form collects information until an official Muguetli destination is connected.',
        fa: 'تا زمان اتصال مقصد رسمی موگه‌تلی، هیچ فرم پرسشی اطلاعات شما را جمع‌آوری نمی‌کند.',
      },
    ],
  },
  privacy: {
    eyebrow: { en: 'UTILITY / PRIVACY', fa: 'اطلاعات / حریم خصوصی' },
    title: { en: 'PRIVACY, WITHOUT SHADOWS', fa: 'حریم خصوصی، بی‌ابهام' },
    lede: {
      en: 'This marketing site stores only your chosen language on your device.',
      fa: 'این وب‌سایت بازاریابی تنها زبان انتخابی شما را روی دستگاهتان ذخیره می‌کند.',
    },
    body: [
      {
        en: 'The site does not currently provide accounts, checkout, contact forms or analytics. WordPress commerce destinations maintain their own policies.',
        fa: 'این سایت در حال حاضر حساب کاربری، پرداخت، فرم تماس یا تحلیل‌گر ندارد. مقصدهای تجاری وردپرس سیاست‌های مستقل خود را دارند.',
      },
    ],
  },
  accessibility: {
    eyebrow: { en: 'UTILITY / ACCESSIBILITY', fa: 'اطلاعات / دسترسی‌پذیری' },
    title: { en: 'EVERY PASSAGE STAYS OPEN', fa: 'هر گذر، باز می‌ماند' },
    lede: {
      en: 'The complete story remains readable and navigable without scroll animation, pointer interaction or video.',
      fa: 'تمام داستان بدون انیمیشن اسکرول، تعامل نشانگر یا ویدئو نیز خوانا و قابل پیمایش می‌ماند.',
    },
    body: [
      {
        en: 'Keyboard navigation, visible focus, reduced motion and responsive type are part of the core experience.',
        fa: 'پیمایش با صفحه‌کلید، تمرکز دیداری، حرکت کاهش‌یافته و تایپ پاسخ‌گو بخشی از تجربهٔ اصلی‌اند.',
      },
    ],
  },
  cookies: {
    eyebrow: { en: 'UTILITY / COOKIES', fa: 'اطلاعات / کوکی‌ها' },
    title: { en: 'ONE CHOICE, REMEMBERED', fa: 'یک انتخاب، به خاطر سپرده‌شده' },
    lede: {
      en: 'The language cookie remembers English or Persian for one year.',
      fa: 'کوکی زبان، انتخاب فارسی یا انگلیسی را برای یک سال به خاطر می‌سپارد.',
    },
    body: [
      {
        en: 'It is a device preference, not an identity. No advertising or analytics cookies are installed by this site.',
        fa: 'این یک ترجیح دستگاه است، نه هویت شما. این سایت هیچ کوکی تبلیغاتی یا تحلیلی نصب نمی‌کند.',
      },
    ],
  },
};
