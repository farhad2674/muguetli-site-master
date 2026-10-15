import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const origin = process.env.MODEL_QA_ORIGIN ?? 'http://127.0.0.1:3011';
const models = JSON.parse(readFileSync('lib/catalog-models.json', 'utf8'));
assert.equal(models.length, 75, 'route check requires the complete generation batch');
const failures = [];
let checked = 0;
// Each product is exercised in one locale, with the first design of each collection in both.
const tasks = models.flatMap((entry, index) => {
  const locale = index % 2 === 0 ? 'fa' : 'en';
  return [
    { entry, locale },
    ...(entry.designId.endsWith('-01') ? [{ entry, locale: locale === 'fa' ? 'en' : 'fa' }] : []),
  ];
});
async function worker() {
  while (tasks.length) {
    const { entry, locale } = tasks.shift();
    const path = `/${locale}/products/${entry.designId}`;
    try {
      const response = await fetch(`${origin}${path}`);
      assert.equal(response.status, 200, `${path} response`);
      const html = await response.text();
      const figures = [...html.matchAll(/<figure\b[^>]*>[\s\S]*?<\/figure>/g)].map(match => match[0]);
      assert.ok(figures.length >= 2, `${path} gallery length`);
      assert.ok(!figures[0].includes('id="styling"'), `${path} first image stays original`);
      assert.ok(figures[1].includes('id="styling"'), `${path} styling is the second image`);
      assert.ok(decodeURIComponent(figures[1]).includes(entry.media.src), `${path} correct portrait`);
      assert.ok(figures[1].includes(locale === 'fa' ? 'تصویرسازی استایل با هوش مصنوعی' : 'AI styling visualization'), `${path} image caption`);
      checked++;
    } catch (error) {
      failures.push(`${path}: ${error.message}`);
    }
  }
}
await Promise.all(Array.from({ length: 3 }, worker));
assert.deepEqual(failures, [], 'product route verification');
console.log(`Verified ${checked} EN/FA routes: each original image is first and the correct labeled styling portrait is second.`);
for (const locale of ['en', 'fa']) {
  const response = await fetch(`${origin}/${locale}/archive/pistachio`);
  assert.equal(response.status, 200, `${locale} Pistachio archive route`);
  const html = await response.text();
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
  const images = [...(main ?? '').matchAll(/<img\b[^>]*\ssrc="([^"]+)"/g)].map(match => match[1]);
  assert.equal(images[0], '/media/pre-collection/pistachio-model-front.webp', `${locale} archive original first`);
  assert.equal(images[1], '/media/product-models/pistachio-styling-v3.png', `${locale} archive styling second`);
}
console.log('Both Pistachio archive detail routes also retain original / generated styling order.');
