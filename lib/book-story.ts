import type { ElementId, LocalizedText } from './muguetli';

// Book passages and biography supplied by the user, September 22, 2026.
// Numbered references in the brief have no supplied bibliography/page mapping;
// attribute excerpts to the book and author without presenting them as verified page numbers.
export interface BookExcerpt { text: LocalizedText }
export const bookExcerpts = {
  rebirth: { text: {
    fa: 'در آتش درون خود سوختم و تماماً دانه‌ای گداخته شدم، چون یاقوت. مُردم از خودم و متولد شدم در یاقوت.',
    en: 'I burned in my inner fire until I became a fully molten seed, like a ruby. I died to my former self and was reborn within the ruby.',
  } },
  water: { text: {
    fa: 'عمیق و عمیق‌تر بشم توی روانم، تا جایی که جاری بشم در ناخودآگاهم.',
    en: 'Sinking deeper into my psyche, until I flow seamlessly into my subconscious.',
  } },
  light: { text: {
    fa: 'همیشه خودم رو توی آغوش و دست‌های نگه‌دارنده‌ی خدا، از جنس نور حس کردم.',
    en: 'I have always felt myself held closely in the embracing, sustaining hands of God—hands crafted of pure light.',
  } },
} satisfies Record<string, BookExcerpt>;

export interface LiteraryElement {
  id: ElementId;
  name: LocalizedText;
  title: LocalizedText;
  idea: LocalizedText;
  excerpt: BookExcerpt;
}

// Literary order is independent of the approved hero film's visual cue order.
export const literaryElements: LiteraryElement[] = [
  {
    id: 'fire', name: { fa: 'آتش', en: 'Fire' },
    title: { fa: 'آفرینش از راه سوختن آگاهانه', en: 'Creation through conscious burning' },
    idea: { fa: 'آتش در روایت زنگله‌ام، گذر از منِ قدیمی است؛ ترس‌ها و وابستگی‌ها می‌سوزند و از دل فشار، دانه‌ای یاقوتی پدید می‌آید. رنج، مادهٔ دگرگونی می‌شود.', en: 'In Zangole’am, fire marks the passage beyond the old self. Fears and attachments burn away; under pressure, a ruby seed emerges. Suffering becomes the material of transformation.' },
    excerpt: { text: { fa: 'من پیش از آنکه قربانی شوم، خودم آتش را انتخاب کردم. پیش از آنکه جهان مرا بسوزاند، من خودم را سوزاندم.', en: 'Before I became a victim, I chose the fire myself. Before the world could burn me, I set myself ablaze.' } },
  },
  {
    id: 'earth', name: { fa: 'خاک', en: 'Earth' },
    title: { fa: 'ریشه‌دواندن در حقیقت', en: 'Rooting in truth' },
    idea: { fa: 'دانهٔ یاقوتی در آغوش مادر زمین ریشه می‌دواند و پیکری میان انسان و گیاه جوانه می‌زند. خاک، فصل حافظهٔ نیاکان، بازسازی و دردهای قدکشیدن است.', en: 'The ruby seed takes root in Mother Earth, becoming a being between human and plant. Earth is the chapter of ancestral memory, rebuilding and the growing pains of a new self.' },
    excerpt: { text: { fa: 'همزمان که دارم قد می‌کشم، می‌تونم خلوت خودم رو داشته باشم.', en: 'Even as I stretch upward, I claim my own sacred solitude.' } },
  },
  {
    id: 'water', name: { fa: 'آب', en: 'Water' },
    title: { fa: 'یگانگی با روان', en: 'At one with the inner world' },
    idea: { fa: 'آب، رویارویی با سوگ و لایه‌های عمیق ناخودآگاه است. در جهان نمادین کتاب، تن‌سپردن به دریا به بیداری در اعماق و توازن نیروهای زنانه و مردانهٔ وجود می‌رسد.', en: 'Water opens onto grief, memory and the depths of the subconscious. In the book’s symbolic world, surrender to the sea leads to awakening below the surface and a balance of feminine and masculine energies.' },
    excerpt: bookExcerpts.water,
  },
  {
    id: 'air', name: { fa: 'باد', en: 'Wind' },
    title: { fa: 'رهایی در آغوش شمس', en: 'Liberation in the embrace of Shams' },
    idea: { fa: 'باد، فصل رهاکردن نقاب‌ها و عروج است. قهرمان از پله‌های هفت‌گانهٔ بلوغ می‌گذرد و در روشنایی، به شمس درونی و آرامشی پیوندخورده با یاد امین می‌رسد.', en: 'Wind is the chapter of release and ascent. Across seven stages of spiritual maturity, the protagonist sheds worldly masks and reaches her inner Shams: a luminous peace intertwined with the memory of Amin.' },
    excerpt: { text: { fa: 'این بار در بستر باد و رهایی، منِ این تنِ آگاه‌شده و پرُآب را به آغوش شمس درونم می‌سپارم؛ جایی که ققنوسِ ابرِ آگاهی با عمری جاودانه بال‌وپرهایش را گشوده و برایمان مأمنی فراهم کرده است.', en: 'This time, upon the bed of wind and liberation, I entrust this awakened self... to the embrace of my inner Shams; where the phoenix of the cloud of consciousness has unfolded its wings eternally, creating a sanctuary for us.' } },
  },
];

export const founderStory: LocalizedText[] = [
  { fa: 'آغاز زنگله‌ام با سوگ از دست دادن برادرش، امین، گره خورده است. الناز این تجربه را به روایتی از خودشناسی و دگرگونی بدل کرد؛ سفری که در آن آتش، خاک، آب و باد زبان عبور از رنج می‌شوند.', en: 'Zangole’am began in the grief of losing her brother, Amin. Elnaz transformed that experience into a narrative of self-discovery, with fire, earth, water and wind becoming a language for moving through loss.' },
  { fa: 'این جهان در ۲۱ مرحله روایت می‌شود و از متن به ۲۱ قاب هنری، روسری‌های مصور و صدا گسترش می‌یابد. در موگه‌تلی، ادبیات، تصویر و پوشش شکل‌های گوناگون یک داستان‌اند.', en: 'The world unfolds across 21 stages, extending from the written story into 21 artwork frames, illustrated scarves and sound. In Muguetli, literature, image and clothing are different forms of the same story.' },
];
