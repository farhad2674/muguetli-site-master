# Muguetli — canvas film website

Local preview: http://localhost:3000/en and http://localhost:3000/fa.

## Run

Next.js 16.3.5 App Router, React, TypeScript, Tailwind 4, Lenis, and GSAP. The installed Next.js documentation was read before new components were written. Fonts are self-hosted Inter, Vazirmatn, and Estedad, with the existing system editorial serif stack.

```
pnpm dev
pnpm build
pnpm lint
```

If a sandbox's pnpm dependency-store check interrupts scripts, direct equivalents are `node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3000`, `node node_modules/next/dist/bin/next build`, and `node node_modules/oxlint/bin/oxlint`.

## Source and extraction

The approved source is `C:/Users/Farhad/Downloads/16738.mp4`. The corrected order is **Water → Fire → Earth → Air**, preserving the original organic transitions. Only the first 0.9 seconds of the opening overview are trimmed. The source remains untouched; the derivative is `public/media/four-mothers/continuous-film.mp4`.

FFmpeg 9.0.2 was installed with winget. ffprobe measured the corrected film at 9.125 seconds. The requested formula selects 30 fps. The extractor counted **274** contiguous JPEG files at **1920 × 1080**, quality 4, **20,667,865 bytes** total. See `public/hero/manifest.json` and generated `lib/hero-frames.ts`.

To reproduce the approved sequence, run:

```
node scripts/prepare-film.mjs "C:/Users/Farhad/Downloads/16738.mp4"
node scripts/extract-hero.mjs public/media/four-mothers/continuous-film.mp4
```

The default input is `final.mp4`. An explicit path is also accepted: `node scripts/extract-hero.mjs path/to/video.mp4`. `FFMPEG_PATH` and `FFPROBE_PATH` can specify executable paths when they are not on PATH. Missing input fails before existing frames are touched. Cleanup is restricted to numbered JPEGs in the verified project frame directory. Counts over 600 trigger re-extraction at a lower rate. Frame count is generated from files, never guessed.

## Motion controls

- **Speed:** `SCROLL_VH = 600` in `components/canvas-hero.tsx`. Increase for a longer/slower journey; decrease for a shorter/faster one.
- Desktop: 600vh track, sticky 100svh canvas, all frame images requested with async decoding. The server render includes an eager, high-priority first-frame poster under the canvas.
- Visible animation frames derive progress from track geometry, ease the floating frame with factor 0.1, then blend floor and next frames. Canvas uses cover scaling and a DPR cap of 2. IntersectionObserver stops the canvas RAF off screen.
- Cursor tilt settles during the first six frame positions. Three DOM typography beats read the same eased progress and rotate independently in perspective, without opacity fades.
- Lenis: one RAF, duration 1.2, exponential easing, smooth wheel, touch multiplier 1.6, ScrollTrigger synchronization. Skipped for reduced motion.
- Widths ≤768px or reduced motion: one 100svh first-frame image. The sequence-loading effect cannot run until matchMedia selects desktop.
- Products, founder, consulting, book, journal, and footer use normal document flow. Section reveals and restrained image parallax honor reduced motion.

## Content connections

The local project has no configured store origin or article records. User-supplied book and founder content is recorded in `lib/editorial.ts` and `lib/book-story.ts`. The book cover, purchase and download links are still unconfigured. Product labels describe the supplied images; sizes, materials and official product names remain unconfigured.

- Configure `.env.example` values in `.env`. `WORDPRESS_STORE_API_URL` is the WooCommerce origin. `WOO_CATEGORY_*` selects categories. `NEXT_PUBLIC_SHOP_URL` and `NEXT_PUBLIC_JOURNAL_URL` must be real destinations.
- Homepage collections and the visual Products mega menu share the existing WooCommerce adapter. No duplicate hardcoded catalog is created.
- Add approved founder, book, and journal records to `lib/editorial.ts`. Book title, author, synopsis, cover, format, and purchase URLs render from that record only. Journal supports three approved entries.
- Only the four confirmed styling services are shown. Consulting leads to its dedicated page. Unconfigured booking remains unavailable.
- `moreLabel` configures More. Mobile uses accessible sheet and accordion primitives with Escape and focus handling.

## Validation

Production build, TypeScript, and lint checks passed. Live browser QA covers frame loading, forward/reverse fractional scrubbing, synchronized text, held frames, hero release, navigation, responsive layout, and console output. Real catalog and editorial integration cannot be verified without their sources. This is a local preview; no deployment was performed.

## September 22 editorial redesign

The canvas hero is preserved. Post-hero sections now use GSAP timelines with `scrub: true`: the scarf opening, alternating product movements, text entrances, rules, edition panels and founder portrait all reverse with scroll position. The motion control restores the complete static layout; OS reduced-motion skips all editorial timelines. Mobile uses shorter movement distances and a single-column product layout.

The four supplied scarf photographs and the founder portrait live in `public/media/collection/`. Scarf labels describe visible border colours, not official catalog names. Accessible close-up dialogs show the full images and preserve unavailable size/material/purchase states. The collections destination shares this gallery; the about page uses the supplied founder portrait and brand idea. Book and eBook panels are separate, with unavailable purchase/download states until their official links are supplied. The compact footer contains a sitemap, information links and language switch.

Validation: Next production build, Workers/Vite build, lint (29 files, zero diagnostics) and TypeScript passed; homepage, collection, founder, book, ebook and utility routes and new media returned HTTP 200. No browser interaction QA was performed during this redesign.



## Book and founder source copy

The supplied September 22 brief identifies **زنگله‌ام / Zangole’am** as a Persian book by **الناز بختیاری / Elnaz Bakhtiari**, with artist name **موتی / Muti**. The Persian title and original quotations appear on both locale versions; the English site additionally displays translated excerpts. The book’s original language does not change the user’s chosen site locale or imply an English edition is available.

The homepage uses the water excerpt for the scarves, the ruby/rebirth excerpt for the book manifesto, and the supplied artist biography for the founder. Book and eBook pages contain the title, author, synopsis, language, attributed excerpt and separate edition status. The about page describes the personal origin of the work. The mythology page follows the literary Fire → Earth → Water → Wind sequence across the four explanations and excerpts, independently of the unchanged canvas film.

The numbered references in the supplied copy have no source bibliography/page mapping; they are not displayed as verified page citations. Quotations are attributed to the book and author. Cover artwork, format specifications and commercial links are not invented.

Latest checks: Next production build including TypeScript passed; lint passed for 31 files with zero diagnostics; all 10 changed EN/FA routes returned 200 and passed content, original-language markup, anchor and literary-order checks. No browser interaction QA or publication was performed for this content update.
