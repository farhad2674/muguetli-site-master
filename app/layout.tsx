import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/estedad';
import '@fontsource-variable/vazirmatn';
import './globals.css';
import 'lenis/dist/lenis.css';
import { SmoothScroll } from '@/components/smooth-scroll';
import { MotionPreference } from '@/components/motion-preference';

export const metadata: Metadata = {
  title: { default: 'MUGUETLI — The Four Mothers', template: '%s — MUGUETLI' },
  description: 'Four passages through matter, memory and transformation. A bilingual Muguetli story in silk.',
};

const localeBootstrap = `
  (() => {
    const locale = location.pathname.split('/')[1] === 'fa' ? 'fa' : 'en';
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: localeBootstrap }} /></head>
      <body><MotionPreference><SmoothScroll>{children}</SmoothScroll></MotionPreference></body>
    </html>
  );
}
