# Muguetli future-task checklist

Audit status: the editorial interface and 75-design catalog are implemented. Inquiry delivery, final content, and launch QA remain open. Use this checklist as the implementation and launch gate.

Legend: `[x]` complete and verified, `[~]` partially implemented, `[ ]` pending.

## Already completed

- [x] White editorial content system with purple/green brand tokens, outlined controls, bilingual presentation, and RTL support.
- [x] Five-section navigation: Philosophy & Journal, Wearable Art, Form & Embodiment, About Elnaz Bakhtiari, and Private Consultation.
- [x] Elnaz Bakhtiari naming, Narrative Textile & Image Architect title, Zangole'am book identity, slogan, and four Atelier services.
- [x] Homepage hero frame animation, scroll storytelling, horizontal elemental journey, collection transition, book section, founder section, Atelier section, journal section, and footer.
- [x] Fire -> Earth -> Water -> Wind literary order, with the animation asset identifier `air` kept separate from the public label Wind.
- [x] Local collection-story routes, bilingual journal article routes, size guide, and honest unavailable states when contact configuration is missing.
- [x] No public prices, cart, checkout, Concept Editions, or Muti public copy in the active UI.
- [x] `pnpm lint`, TypeScript `--noEmit`, production build, and `git diff --check` pass.
- [x] Live smoke checks pass for `/en`, `/fa`, `/en/collections`, `/fa/collections/fire`, `/en/size-guide`, `/en/contact`, and the three journal routes.

## 1. Catalog foundation - implemented from verified source

- [x] Define shared typed `Design`, `SizeOption`, `MediaAsset`, `SourceReference`, and `InquiryContext` models.
- [x] Register all 76 source-panel references from `3-طرح-ها.pdf`; the PDF SHA-256 matches the verified manifest.
- [x] Create the 75 public design records: Fire 9, Earth 12, Water 25, Wind 26, Calligraphy 3.
- [x] Merge the two navy Water representations into one public record with both source assets and an internal review flag.
- [x] Add the five public collection entry points, including Calligraphy.
- [x] Add stable neutral IDs, collection-specific numbering, shape, localized fallback text, publication state, media, and PDF page/panel references. Official names and narratives remain pending owner approval.
- [x] Encode the 126 size options and enforce shape rules: 50x50 cm pocket square, 90x90 cm square scarf, 180x70 cm shawl, and Calligraphy shawls only.
- [x] Show artwork panels and product photographs as different media kinds with uncropped, contained display.
- [x] Reuse the four matching Water photographs without image zoom.
- [x] Add `pnpm catalog:check` for source panels, public designs, options, collection counts, Water merge, Calligraphy constraints, photo coverage, archive groups, and local media paths.

Photo coverage: 66 of 75 catalog designs have verified photographs from `elnaz new.7z` (131 photos). The four previously matched Water photographs bring total verified photo coverage to 70 of 75; five designs currently have source artwork only. The separate Pre collection archive contains nine groups and 35 photographs; it is not a sixth counted collection.

## 2. Catalog routes and discoverability - implemented, focused browser QA passed

- [x] Implement `/products?collection=...&type=...` with combined filters and localized empty states.
- [x] Implement `/products/[slug]?size=...` with artwork and photograph gallery, supported-size selection, and contextual inquiry CTA.
- [~] Connect the homepage Water gallery, menu, collections, filters, detail pages, and sitemap to the catalog. Review all journal and size-guide cross-links during final browser QA.
- [~] Preserve nested routes, active filters, and selected sizes during English/Persian switching in code; live rapid-switch QA remains pending.
- [x] Add localized product metadata, canonical language links, and sitemap entries for every published catalog record.
- [x] Verify invalid product and collection routes, and an unsupported product size, return 404.
- [x] Add a separate Pre collection lookbook and pistachio detail with original flatlay/model photographs and a clearly labeled AI-assisted second styling image, without claiming size, material, availability, or price.

### Elnaz styling gallery - added 2026-10-15

- [x] Generate and visually review 75 distinct styling portraits using the supplied Elnaz face and each design's own artwork, covering all five collections and 126 size options.
- [x] Keep the original artwork first and place the reviewed portrait second on every catalog detail page, with localized AI styling captions.
- [x] Add Textile / Styled shop views with collection, form, language and selected-size preservation. Square-scarf styling is explicitly distinguished from the 50x50 pocket-square option.
- [x] Retain exact prompts, references, output paths, image dimensions and review notes in `docs/image-generation/records/`; generate a combined prompt set and application mapping from accepted records.
- [x] Verify 75 distinct portrait files, face/artwork references, dimensions and localized descriptions with `pnpm models:check`; verify all 325 mapped media files with `pnpm catalog:check`.
- [x] Pass the final production build and lint. Verify original/portrait order and correct localized captions on 80 catalog routes and both Pistachio archive routes using `scripts/check-model-routes.mjs`.
- [x] Check the complete Styled shop on desktop and a representative detail at 390px: portraits load, no horizontal overflow, 90x90 selection and styling anchor survive Persian-to-English switching, and the tested production browser session has no errors or warnings.

Generated styling illustrates how the scarves can be worn. Original artwork and textile photographs remain the source for exact printed details; fine lettering may differ in AI imagery.

## 3. Inquiry implementation - pending

- [~] Add contextual WhatsApp/copy inquiry for catalog products and the Pre archive study; a shared builder for services, books, and general inquiries remains pending.
- [x] Include Persian design reference, collection, selected form/size, optional customer name, and canonical page URL in product messages.
- [ ] Implement `POST /api/inquiries` with Node runtime and SMTP transport.
- [ ] Validate name, reply email, subject, message, locale, and optional context server-side.
- [ ] Add throttling, honeypot, duplicate-submit prevention, accessible pending/error/success states, and preserved form content on failure.
- [ ] Keep SMTP credentials server-only and exclude message contents from logs.
- [ ] Test valid submission, invalid input, throttling, provider failure, missing configuration, and controlled inbox delivery.
- [x] Keep the current honest unavailable state until verified WhatsApp and SMTP values are supplied.

## 4. Intro, motion, and media acceptance - partial

- [~] Preserve the current hero and horizontal motion while retaining reduced-motion, static, resize, and offscreen behavior.
- [ ] Mount or replace the planned intro experience so it appears on the first homepage visit per session, is immediately skippable, and does not replay in the same session.
- [ ] Verify skip behavior on user action, playback failure, and reduced-motion preference.
- [ ] Verify idle pause/freeze, forward and reverse scrubbing, progressive loading, poster fallback, and explicit white canvas clearing.
- [ ] Reconcile the current dark hero presentation with the plan's white-background transition requirement without damaging protected artwork.
- [ ] Validate representative white-background media frames and the complete manifest before launch.

## 5. Accessibility, responsive QA, and content QA - pending

- [ ] Test desktop, tablet, mobile, and 200% zoom layouts.
- [ ] Test keyboard navigation, hamburger focus trap, Escape dismissal, focus return, skip links, and dialog focus behavior.
- [ ] Test no-JavaScript reading flow and failed-media fallbacks.
- [ ] Test rapid locale switching on `/`, nested routes, collection routes, journal routes, filters, and selected sizes.
- [ ] Test reduced-motion mode and the manual motion toggle across every animated section.
- [ ] Remove or resolve stale/unmounted duplicate components and verify there are no broken placeholder links.
- [ ] Recheck privacy/cookie language after inquiry storage and session-intro behavior are implemented.

## 6. Final content handoff and delivery - pending external inputs

- [ ] Receive Elnaz's final artwork names, stories, photographs, material/care details, audio files, and verified platform URLs.
- [ ] Supply and verify the official WhatsApp number, site URL, SMTP host/port/security, sender, recipient, and credentials outside version control.
- [ ] Complete the content handoff documentation and page-indexed PDF requirements checklist.
- [ ] Run the final catalog, route, browser, motion, accessibility, and SMTP test suites with production-like configuration.
- [ ] Deploy only after the separate deployment authorization is given.

## Current audit evidence (2026-10-15)

- All 75 Elnaz styling portraits are selected and mapped, including the revised Fire-02/03 portraits. The final production preview for this pass runs at `http://127.0.0.1:3010`; exact prompts and saved outputs are in `docs/image-generation/prompt-set.json`. This is a local preview, not a deployment.
- Passing after this catalog pass: `node scripts/validate-catalog.mjs`, `pnpm lint`, `node node_modules/typescript/bin/tsc --noEmit`, production `next build`, and `git diff --check`.
- Production HTTP smoke checks return 200 for filtered EN/FA shop routes, product detail routes, Calligraphy collection, Pre archive/lookbook and pistachio detail; invalid product/collection and unsupported size return 404.
- Focused browser QA confirms Water + long-shawl filtering (six results), Persian RTL, query/size preserving locale links, Fire artwork/product/model gallery labels and loaded media, the original/generated/flatlay/second-original pistachio gallery order, responsive presentation, and no browser errors or warnings. Broader accessibility and motion checks remain open below.
- Still pending: `app/api/inquiries`, verified WhatsApp/SMTP configuration, final official product copy, broad browser/accessibility/motion QA, and deployment authorization.
