import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'lib/catalog-manifest.json'), 'utf8'));
const supplement = JSON.parse(readFileSync(join(root, 'lib/catalog-supplement.json'), 'utf8'));
const preArchive = JSON.parse(readFileSync(join(root, 'lib/pre-collection.json'), 'utf8'));
const catalogModels = JSON.parse(readFileSync(join(root, 'lib/catalog-models.json'), 'utf8'));
const collections = ['fire', 'earth', 'water', 'wind', 'calligraphy'];
const expectedDesigns = { fire: 9, earth: 12, water: 25, wind: 26, calligraphy: 3 };
const expectedOptions = { fire: 16, earth: 21, water: 44, wind: 42, calligraphy: 3 };
const expectedPhotos = { fire: 9, earth: 12, water: 17, wind: 26, calligraphy: 2 };

assert.equal(manifest.sourceSha256, '66567b839f9742420669fe069f4a6d54627c74645f432f8eaf6cd3af931d7647');
assert.equal(manifest.panels.length, 76, 'source panel count');
assert.equal(new Set(manifest.panels.map(panel => panel.id)).size, 76, 'unique source panel IDs');

const navy = manifest.panels.find(panel => panel.id === 'water-p05-cats-navy-photo');
assert.equal(navy?.mergeInto, 'water-p05-cats-navy', 'navy Water fabric view stays merged');
assert.ok(manifest.panels.some(panel => panel.id === navy.mergeInto), 'navy merge target exists');

const designPanels = manifest.panels.filter(panel => !panel.mergeInto);
assert.equal(designPanels.length, 75, 'public design count');
let totalOptions = 0;
for (const collection of collections) {
  const group = designPanels.filter(panel => panel.collection === collection);
  const options = group.reduce((sum, panel) => sum + (panel.shape === 'square' ? 2 : 1), 0);
  assert.equal(group.length, expectedDesigns[collection], `${collection} design count`);
  assert.equal(options, expectedOptions[collection], `${collection} size option count`);
  assert.ok(group.every(panel => panel.shape === 'square' || panel.shape === 'rectangle'), `${collection} shapes`);
  if (collection === 'calligraphy') assert.ok(group.every(panel => panel.shape === 'rectangle'), 'Calligraphy only uses shawls');
  totalOptions += options;
}
assert.equal(totalOptions, 126, 'public size options');

const designIds = new Map();
for (const collection of collections) {
  designPanels.filter(panel => panel.collection === collection).forEach((panel, index) => {
    designIds.set(`${collection}-${String(index + 1).padStart(2, '0')}`, panel);
  });
}

assert.ok(Array.isArray(supplement), 'supplement must be an array');
assert.equal(new Set(supplement.map(entry => entry.designId)).size, supplement.length, 'unique photo-covered design IDs');
assert.equal(supplement.length, 66, 'verified ZIP photo-covered design count');
for (const collection of collections) {
  assert.equal(supplement.filter(entry => entry.designId.startsWith(`${collection}-`)).length, expectedPhotos[collection], `${collection} photo coverage`);
}
for (const entry of supplement) {
  assert.ok(designIds.has(entry.designId), `known design ID: ${entry.designId}`);
  assert.equal(entry.sourcePanelId, designIds.get(entry.designId).id, `source panel map for ${entry.designId}`);
  assert.ok(Array.isArray(entry.media) && entry.media.length > 0, `photo media for ${entry.designId}`);
  assert.ok(entry.media.every(asset => asset.kind === 'product' || asset.kind === 'model'), `supplement media kind for ${entry.designId}`);
  assert.ok(entry.media.every(asset => asset.width > 0 && asset.height > 0 && asset.sourceFile), `supplement dimensions and provenance for ${entry.designId}`);
}
const photoCovered = new Set(supplement.map(entry => entry.designId));
for (const [id, panel] of designIds) if (panel.matchedPhoto) photoCovered.add(id);
assert.equal(photoCovered.size, 70, 'designs with any verified photograph');

assert.equal(preArchive.length, 9, 'separate Pre collection groups');
assert.equal(new Set(preArchive.map(group => group.id)).size, 9, 'unique Pre collection group IDs');
assert.equal(preArchive.flatMap(group => group.images).length, 35, 'Pre collection archive photograph count');
assert.ok(preArchive.every(group => group.labelFa && group.labelEn && group.images.length > 0), 'Pre collection group labels and imagery');

const paths = [
  ...manifest.panels.map(panel => panel.src),
  ...manifest.panels.flatMap(panel => panel.matchedPhoto ? [panel.matchedPhoto] : []),
  ...supplement.flatMap(entry => entry.media.map(asset => asset.src)),
  ...preArchive.flatMap(group => group.images.map(asset => asset.src)),
  ...catalogModels.map(entry => entry.media.src),
  '/media/pre-collection/pistachio-flatlay.webp',
  '/media/pre-collection/pistachio-model-front.webp',
  '/media/pre-collection/pistachio-model-profile.webp',
  '/media/product-models/pistachio-styling-v3.png',
];
for (const src of paths) {
  assert.match(src, /^\/media\/[a-zA-Z0-9_./-]+$/, `safe media URL: ${src}`);
  assert.ok(existsSync(join(root, 'public', src.slice(1))), `missing media file: ${src}`);
}

console.log(`Catalog valid: ${designPanels.length} designs, ${totalOptions} options, ${manifest.panels.length} source panels, ${supplement.length} ZIP photo matches, ${photoCovered.size} designs with any verified photograph, ${catalogModels.length} AI styling portraits, ${preArchive.length} Pre archive groups, ${new Set(paths).size} media files.`);
