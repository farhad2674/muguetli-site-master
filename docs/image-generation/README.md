# Elnaz product styling portraits

## Scope and art direction

One distinct portrait for each of the 75 canonical designs in the five-collection catalog. The existing Pistachio archive portrait remains in its separate detail page. Size options belonging to the same design share its portrait.

Every generation uses `characterelnaz3.jpg` as the face reference and the corresponding original artwork as the scarf-print reference. Some prompts also include the verified textile photograph. The face collage supplies identity, not the scarf design for unrelated products.

The brief calls for natural photographic skin and fabric, recognizable facial features, varied expressions and clothing, and different studio or architectural settings. Square designs are styled as square scarves; rectangular designs as long shawls. The collection teams vary scarf knots, head and shoulder wraps, posture, hairstyle and lighting while retaining the printed motif and colorway.

These are AI styling visualizations. The original photographs and artwork remain the authoritative views of the actual textile. Small folds and printed details can differ in the generated portrait.

## Files and provenance

- Full-resolution PNGs: `public/media/product-models/elnaz/`. Filenames usually follow `{designId}.png`; reviewed revisions use versioned filenames. Each record and the application mapping identify the selected image.
- Exact prompts, reference files, built-in output paths and visual reviews: `records/{designId}.json` in this directory.
- Combined reviewed prompt set and saved outputs: [prompt-set.json](prompt-set.json).
- Application gallery mapping: `lib/catalog-models.json`.
- All images were requested through the built-in ImageGen tool; no API/CLI generation workflow is used.

## Integration

The source artwork stays first in each catalog detail gallery. The generated portrait occupies the second position with a localized AI styling caption. Remaining original photographs follow. The shop's Textile / Styled links retain collection and form filters; the Styled view opens the portrait in its detail gallery. Language switching preserves the query and anchor.

Generated portraits use Next Image to serve screen-appropriate sizes and WebP responses. The detail portrait and first shop row load eagerly for direct styling links; later cards load lazily. The selected full-resolution original is retained in the project. Images use contained display so the face and scarf are not cropped to fill cards.

## Rebuild and checks

Run `pnpm models:sync` after adding or updating reviewed records. The sync includes accepted images only, skips records awaiting review, and fails on missing files, invalid dimensions or duplicate/unknown designs. It does not generate images.

Run `pnpm models:check` to require all 75 distinct images. The validator checks exact artwork and face references, reviewed records, localized descriptions, actual PNG dimensions, unique image hashes and individual prompts. `node scripts/validate-model-gallery.mjs --partial` is available while generation is in progress.

With the app running, `node scripts/check-model-routes.mjs` verifies gallery order, the selected portrait and localized captions on 80 catalog routes plus both Pistachio archive routes. It defaults to `http://127.0.0.1:3011`; set `MODEL_QA_ORIGIN` to test another local preview.

The image review checks facial likeness, scarf motif and palette, anatomy, plausible drape, expression, wardrobe and setting. Automated integrity checks establish file coverage and provenance; they do not establish pixel-exact textile reproduction.

## Completed verification (2026-10-15)

All 75 portraits are mapped; Fire-02 and Fire-03 select their reviewed v2 images. `pnpm models:check`, `pnpm catalog:check`, `pnpm lint`, the production build (including TypeScript) and `git diff --check` passed. The production HTTP check passed all 80 catalog routes and both Pistachio archive routes. Focused desktop/mobile browser checks confirmed loaded portraits, RTL/LTR display, retained filters and sizes, preserved styling anchors, and no horizontal overflow or console errors/warnings in the tested production flow. Broader site launch checks remain in the project checklist.
