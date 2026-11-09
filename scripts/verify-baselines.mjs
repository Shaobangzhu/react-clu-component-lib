import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const manifest=JSON.parse(await readFile('.ci/visual-baselines.json','utf8'));
const files=(await readdir('tests/visual/baselines',{recursive:true})).filter(name=>name.endsWith('.png')).map(name=>`tests/visual/baselines/${name}`).sort();
assert.equal(files.length,12);assert.deepEqual(files,manifest.files.map(item=>item.file).sort());
for (const item of manifest.files) assert.equal(createHash('sha256').update(await readFile(item.file)).digest('hex'),item.sha256,`Unreviewed baseline: ${item.file}`);
console.log('PASS 12 inspected baseline hashes; normal tests cannot update goldens.');
