import type { LocalizedText } from './muguetli';
import { founderStory } from './book-story';

export const pageSlugs = ['mythology', 'about', 'contact', 'privacy', 'accessibility', 'cookies', 'collections', 'consulting', 'books', 'ebook', 'nfts', 'journal', 'size-guide'] as const;
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
    body: [{ en: 'Fire, Earth, Water and Wind are four ways into the Muguetli catalogue. Browse by the element that speaks to you, then begin a private inquiry for the artwork and size that belongs in your story.', fa: 'آتش، خاک، آب و باد چهار راه ورود به فهرست موگه‌تلی‌اند. از عنصری شروع کنید که با شما حرف می‌زند و سپس برای اثر و اندازهٔ مناسب، گفت‌وگویی خصوصی را آغاز کنید.' }],
  },
  consulting: {
    eyebrow: { en: 'MUGUETLI / CREATIVE CONSULTING', fa: 'موگه‌تلی / مشاورهٔ خلاق' },
    title: { en: 'BECOME YOUR OWN MUSE', fa: 'خودت الهام‌بخش باش' },
    lede: { en: 'Your clothes. Your image. Your way of being seen.', fa: 'لباس تو. تصویر تو. شیوهٔ دیده‌شدن تو.' },
    body: [{ en: 'The Atelier is a private conversation about the architecture of your presence: wardrobe, hair, silhouette and narrative textile.', fa: 'آتلیه گفت‌وگویی خصوصی دربارهٔ معماری حضور شماست: کمد لباس، مو، سیلوئت و منسوجات روایی.' }],
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
    lede: { en: 'Notes on form, memory, philosophy and the ways an image enters daily life.', fa: 'یادداشت‌هایی دربارهٔ فرم، حافظه، فلسفه و راه‌هایی که تصویر وارد زندگی روزمره می‌شود.' },
    body: [{ en: 'Read slowly. Return to the catalogue when a passage begins to feel wearable.', fa: 'آرام بخوانید؛ وقتی جمله‌ای پوشیدنی شد، به فهرست آثار برگردید.' }],
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
      en: 'Narrative Textile & Image Architect at the meeting of Bakhtiari heritage, Persian mysticism and the inner journey.',
      fa: 'معمار روایت، منسوجات و تصویر در تلاقی میراث بختیاری، عرفان ایرانی و سفر درونی.',
    },
    body: founderStory,
  },
  contact: {
    eyebrow: { en: 'MUGUETLI / PRIVATE INQUIRIES', fa: 'موگه‌تلی / پرسش‌های خصوصی' },
    title: { en: 'BEGIN A PRIVATE CONVERSATION', fa: 'گفت‌وگویی خصوصی را آغاز کنید' },
    lede: { en: 'For an artwork, a book edition or a bespoke Atelier commission.', fa: 'برای یک اثر، نسخه‌ای از کتاب یا سفارشی اختصاصی از آتلیه.' },
    body: [{ en: 'Tell us what has found you. We will keep the first step clear and personal.', fa: 'بگویید چه چیزی شما را پیدا کرده است؛ قدم اول را روشن و شخصی نگه می‌داریم.' }],
  },
  'size-guide': {
    eyebrow: { en: 'MUGUETLI / SIZE GUIDE', fa: 'موگه‌تلی / راهنمای اندازه' },
    title: { en: 'THREE SIZES, THREE GESTURES', fa: 'سه اندازه، سه شیوهٔ حضور' },
    lede: { en: 'Choose the scale that gives the artwork room to live.', fa: 'مقیاسی را انتخاب کنید که به اثر فرصت زندگی‌کردن بدهد.' },
    body: [{ en: 'Pocket square 50 × 50 cm. Square scarf 90 × 90 cm. Shawl 180 × 70 cm. These are catalogue size options, not inventory claims.', fa: 'دستمال جیبی ۵۰×۵۰ سانتی‌متر. روسری مربع ۹۰×۹۰ سانتی‌متر. شال ۱۸۰×۷۰ سانتی‌متر. این‌ها گزینه‌های اندازه در فهرست آثارند، نه ادعای موجودی.' }],
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
