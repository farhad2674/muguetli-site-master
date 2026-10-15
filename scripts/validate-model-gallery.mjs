import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const readJson = path => JSON.parse(readFileSync(join(root, path), 'utf8').replace(/^\uFEFF/, ''));
const panels = readJson('lib/catalog-manifest.json').panels.filter(panel => !panel.mergeInto);
const models = readJson('lib/catalog-models.json');
const counts = {};
const designPanels = new Map(panels.map(panel => {
  counts[panel.collection] = (counts[panel.collection] ?? 0) + 1;
  return [`${panel.collection}-${String(counts[panel.collection]).padStart(2, '0')}`, panel];
}));
const partial = process.argv.includes('--partial');
assert.equal(new Set(models.map(entry => entry.designId)).size, models.length, 'unique modeled designs');
if (!partial) assert.equal(models.length, designPanels.size, 'every catalog design has its own styled image');
const hashes = new Set();
const prompts = new Set();
for (const entry of models) {
  const panel = designPanels.get(entry.designId);
  assert.ok(panel, `known design ${entry.designId}`);
  const record = readJson(`docs/image-generation/records/${entry.designId}.json`);
  assert.equal(record.src, entry.media.src, `matching image reference for ${entry.designId}`);
  assert.equal(entry.media.kind, 'generated-model', `honest media label for ${entry.designId}`);
  assert.equal(record.method, 'built-in-imagegen', `built-in generation for ${entry.designId}`);
  assert.ok(record.qa?.status === 'accepted' || record.qa?.verdict === 'pass', `visual review for ${entry.designId}`);
  const references = (record.references ?? record.referencePaths ?? []).map(path => path.replaceAll('\\', '/'));
  assert.ok(references.some(path => path.endsWith('/characterelnaz3.jpg')), `supplied face reference for ${entry.designId}`);
  assert.ok(references.some(path => path.endsWith(panel.src)), `correct artwork reference for ${entry.designId}`);
  assert.ok(entry.media.alt.en && entry.media.alt.fa, `localized description for ${entry.designId}`);
  assert.match(entry.media.src, /^\/media\/product-models\/elnaz\/[a-z0-9-]+\.png$/, `local PNG path for ${entry.designId}`);
  const bytes = readFileSync(join(root, 'public', entry.media.src.slice(1)));
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG', `PNG format for ${entry.designId}`);
  assert.equal(bytes.readUInt32BE(16), entry.media.width, `actual width for ${entry.designId}`);
  assert.equal(bytes.readUInt32BE(20), entry.media.height, `actual height for ${entry.designId}`);
  assert.ok(Math.min(entry.media.width, entry.media.height) >= 768 && entry.media.width * entry.media.height >= 1_000_000, `usable resolution for ${entry.designId}`);
  hashes.add(createHash('sha256').update(bytes).digest('hex'));
  prompts.add(record.prompt);
}
assert.equal(hashes.size, models.length, 'each design has a distinct generated image');
assert.equal(prompts.size, models.length, 'each design has a tailored prompt');
console.log(`Model gallery valid: ${models.length}/${designPanels.size} distinct images with correct artwork and face references, localized labels, dimensions and visual-review records.`);
