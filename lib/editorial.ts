import type { LocalizedText } from './muguetli';

export interface Collection { id: number; name: string; description: string; image: string; url: string }
export interface JournalArticle { id: string; title: LocalizedText; excerpt: LocalizedText; category: LocalizedText; image: string; url: string; date?: string }
export interface Book { title: LocalizedText; originalTitle: string; subtitle: LocalizedText; author: LocalizedText; synopsis: LocalizedText; format: LocalizedText; language: LocalizedText; image?: string; url?: string; ebookUrl?: string }
// Only approved editorial records belong here. Missing records remain unpublished.
export const editorial: { founder: { name: LocalizedText; role: LocalizedText; image: string; copy: LocalizedText } | null; book: Book | null; articles: JournalArticle[] } = {
  founder: {
    name: { en: 'Elnaz Bakhtiari', fa: 'الناز بختیاری' },
    role: { en: 'Author, artist & designer · Muti', fa: 'نویسنده، هنرمند و طراح · موتی' },
    image: '/media/collection/founder.jpg',
    copy: {
      en: 'Elnaz Bakhtiari, known as Muti, is an Iranian author, artist and designer. Her work brings Bakhtiari heritage, Persian mystical literature and Jungian psychology into a personal language of transformation. Muguetli gives that language form in words, images and scarves.',
      fa: 'الناز بختیاری، با نام هنری موتی، نویسنده، هنرمند و طراح ایرانی است. آثار او میراث بختیاری، ادبیات عرفانی ایران و روان‌شناسی تحلیلی را به زبانی شخصی برای دگرگونی پیوند می‌زنند. موگه‌تلی این زبان را در کلمه، تصویر و روسری زندگی می‌کند.',
    },
  },
  book: {
    title: { en: 'Zangole’am', fa: 'زنگله‌ام' },
    originalTitle: 'زنگله‌ام',
    subtitle: { fa: 'سفری از سوگ تا بیداری و رهایی', en: 'A sacred journey from grief to awakening & liberation' },
    author: { fa: 'الناز بختیاری', en: 'Elnaz Bakhtiari' },
    language: { fa: 'زبان اصلی: فارسی', en: 'Originally written in Persian' },
    format: { fa: 'کتاب چاپی و الکترونیکی', en: 'Physical book & eBook' },
    synopsis: { fa: 'زنگله‌ام، سفر مقدس گل موگه، روایت گذر از سوگ به خودشناسی است؛ سفری در ۲۱ مرحله، از سوزش در آتش و ریشه‌گرفتن در خاک تا فرو‌رفتن در ناخودآگاهِ آب و رهایی با باد.', en: 'Zangole’am, The Sacred Journey of the Lily of the Valley, follows a passage from grief to self-discovery across 21 stages: burning in fire, rooting in earth, descending into the subconscious of water and finding liberation with the wind.' },
  },
  articles: [],
};

// Descriptive labels for supplied photographs, not official product names or SKUs.
export const scarfStudies = [
  { id: 'rust', image: '/media/collection/scarf-rust.jpg', color: '#aa4329', name: { en: 'Rust border', fa: 'حاشیهٔ آجری' }, description: { en: 'An underwater world, framed in warm rust. A figure, two cats, and a sea of small stories.', fa: 'جهانی زیر آب، در قابی آجری؛ یک پیکر، دو گربه و دریایی از داستان‌های کوچک.' } },
  { id: 'red', image: '/media/collection/scarf-red.jpg', color: '#d72e3c', name: { en: 'Scarlet border', fa: 'حاشیهٔ سرخ' }, description: { en: 'A closer encounter. A portrait surrounded by bright fish, coral and deep blue.', fa: 'دیداری از نزدیک؛ چهره‌ای در میان ماهی‌های رنگارنگ، مرجان‌ها و آبی ژرف.' } },
  { id: 'indigo', image: '/media/collection/scarf-indigo.jpg', color: '#242c58', name: { en: 'Indigo border', fa: 'حاشیهٔ نیلی' }, description: { en: 'The underwater scene returns in indigo. A quieter frame for a richly imagined world.', fa: 'جهان زیر آب، این بار در قابی نیلی؛ حاشیه‌ای آرام برای دنیایی سرشار از خیال.' } },
  { id: 'olive', image: '/media/collection/scarf-olive.jpg', color: '#888d28', name: { en: 'Olive border', fa: 'حاشیهٔ زیتونی' }, description: { en: 'A figure in motion, flowing ribbons and sea life. An olive edge holds the colour together.', fa: 'پیکری در حرکت، روبان‌های روان و زندگی دریایی؛ رنگ‌ها در حاشیه‌ای زیتونی به هم می‌رسند.' } },
];
export const moreLabel: LocalizedText = { en: 'More', fa: 'بیشتر' };
export const services = [
  { title: { en: 'Personal Styling', fa: 'استایل شخصی' }, description: { en: 'Clothing and wardrobe direction.', fa: 'راهنمایی برای پوشش و کمد لباس شما.' } },
  { title: { en: 'Hair & Image Direction', fa: 'مو و هویت بصری' }, description: { en: 'Connect your hair with your overall visual identity.', fa: 'پیوند میان مو و هویت بصری شما.' } },
  { title: { en: 'Scarf Styling', fa: 'استایل روسری' }, description: { en: 'Personal ways to wear and integrate your scarves.', fa: 'روش‌های شخصی برای پوشیدن و ترکیب روسری.' } },
  { title: { en: 'Bespoke Scarf Design', fa: 'طراحی اختصاصی روسری' }, description: { en: 'Scarf design with a personal point of view.', fa: 'طراحی روسری با نگاه شخصی شما.' } },
];
export const values: LocalizedText[] = [
  { en:'Bakhtiari heritage',fa:'میراث بختیاری' },{en:'Persian mystical literature',fa:'ادبیات عرفانی ایران'},
  { en:'The inner journey',fa:'سفر درونی'},
];
