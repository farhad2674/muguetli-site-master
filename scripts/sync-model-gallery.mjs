import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const recordsPath = join(root, 'docs/image-generation/records');
const manifest = JSON.parse(readFileSync(join(root, 'lib/catalog-manifest.json'), 'utf8'));
const counters = {};
const ids = manifest.panels.filter(panel => !panel.mergeInto).map(panel => {
  counters[panel.collection] = (counters[panel.collection] ?? 0) + 1;
  return `${panel.collection}-${String(counters[panel.collection]).padStart(2, '0')}`;
});
const records = existsSync(recordsPath)
  ? readdirSync(recordsPath).filter(file => file.endsWith('.json')).map(file => JSON.parse(readFileSync(join(recordsPath, file), 'utf8').replace(/^\uFEFF/, '')))
  : [];
assert.equal(new Set(records.map(record => record.designId)).size, records.length, 'duplicate design records');
const accepted = records.filter(record => record.qa?.status === 'accepted' || record.qa?.verdict === 'pass');
for (const record of accepted) {
  assert.ok(ids.includes(record.designId), `unknown design ${record.designId}`);
  assert.match(record.src, /^\/media\/product-models\/elnaz\/[a-z0-9-]+\.(png|webp|jpe?g)$/);
  assert.ok(existsSync(join(root, 'public', record.src.slice(1))), `missing file ${record.src}`);
  assert.ok(record.width > 0 && record.height > 0, `dimensions for ${record.designId}`);
  assert.equal(record.method, 'built-in-imagegen', `generation method for ${record.designId}`);
  assert.ok(record.prompt?.length > 100, `prompt for ${record.designId}`);
  assert.ok(record.qa?.status === 'accepted' || record.qa?.verdict === 'pass', `visual review for ${record.designId}`);
}
const output = ids.flatMap(id => {
  const record = accepted.find(item => item.designId === id);
  if (!record) return [];
  return [{
    designId: id,
    media: {
      src: record.src,
      kind: 'generated-model',
      width: record.width,
      height: record.height,
      alt: {
        en: `AI styling portrait of Elnaz wearing the ${id} scarf design`,
        fa: `تصویرسازی استایل الناز با طرح ${id}`,
      },
      sourceFile: `Built-in ImageGen; docs/image-generation/records/${id}.json`,
    },
  }];
});
writeFileSync(join(root, 'lib/catalog-models.json'), `${JSON.stringify(output, null, 2)}\n`);
if (existsSync(recordsPath)) {
  const promptSet = output.map(entry => {
    const record = accepted.find(item => item.designId === entry.designId);
    return {
      designId: record.designId,
      method: record.method,
      output: `public${record.src}`,
      prompt: record.prompt,
      references: record.references ?? record.referencePaths,
      qa: record.qa,
    };
  });
  writeFileSync(join(root, 'docs/image-generation/prompt-set.json'), `${JSON.stringify(promptSet, null, 2)}\n`);
}
console.log(`Styling gallery synced: ${output.length}/${ids.length} designs; ${records.length - accepted.length} records awaiting review. Missing: ${ids.filter(id => !output.some(entry => entry.designId === id)).join(', ') || 'none'}.`);
