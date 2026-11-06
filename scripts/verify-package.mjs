import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, readdir, realpath, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const npmCLI = process.env.npm_execpath;
assert(npmCLI, 'Run through npm run package:verify');
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}
const npm = (args, cwd) => run(process.execPath, [npmCLI, ...args], cwd);
const json = async path => JSON.parse(await readFile(path, 'utf8'));
const expected = await json(join(root, 'scripts/public-api.json'));
const manifest = await json(join(root, 'package.json'));
assert.equal(manifest.type, 'module'); assert.equal(manifest.private, true);
assert.deepEqual(manifest.exports, { '.': { types: './dist/index.d.ts', import: './dist/index.js' }, './styles.css': './dist/styles.css' });
assert.deepEqual(manifest.sideEffects, ['./dist/styles.css']);
assert.deepEqual(manifest.peerDependencies, { react: '^19.0.0' });
assert(!manifest.dependencies && !manifest.optionalDependencies && !manifest.bundledDependencies);
assert.equal(manifest.types, manifest.exports['.'].types);
assert.equal(manifest.main, manifest.exports['.'].import);
assert.equal(manifest.module, manifest.main);

// Explicit public API inventory catches accidental exports as well as omissions.
const source = ts.createSourceFile('index.ts', await readFile(join(root, 'src/index.ts'), 'utf8'), ts.ScriptTarget.Latest, true);
const names = { components: [], types: [] };
for (const statement of source.statements) {
  assert(ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause), 'Public entry permits only explicit named exports');
  for (const specifier of statement.exportClause.elements) names[statement.isTypeOnly || specifier.isTypeOnly ? 'types' : 'components'].push(specifier.name.text);
}
for (const key of Object.keys(names)) assert.deepEqual(names[key].sort(), expected[key]);

// Strict archive allowlist derived from the reachable public declaration graph.
const declarations = new Set();
async function visit(file) {
  if (declarations.has(file)) return;
  declarations.add(file);
  const text = await readFile(join(root, file), 'utf8');
  assert(!/sourceMappingURL|reference path=/.test(text), `Unexpected declaration source reference: ${file}`);
  for (const entry of ts.preProcessFile(text).importedFiles) {
    if (entry.fileName.startsWith('.')) {
      assert(entry.fileName.endsWith('.js'), `NodeNext requires .js declaration specifiers: ${entry.fileName}`);
      const target = relative(root, resolve(root, dirname(file), entry.fileName.replace(/\.js$/, '.d.ts')));
      assert(!target.startsWith('..') && !isAbsolute(target));
      await visit(target);
    } else assert.equal(entry.fileName, 'react', `Unexpected type dependency ${entry.fileName}`);
  }
}
await visit('dist/index.d.ts');
const allowed = ['package.json', 'README.md', 'dist/index.js', 'dist/styles.css', ...declarations].sort();
const output = await mkdtemp(join(await realpath(tmpdir()), 'clu-package-'));
assert(relative(root, output).startsWith('..') && !(await realpath(output)).startsWith(`${await realpath(root)}/`));
console.log(`External verification directory: ${output}`);
const options = ['--json', '--ignore-scripts', '--pack-destination', output];
const [dry] = JSON.parse(npm(['pack', '--dry-run', ...options]));
const [packed] = JSON.parse(npm(['pack', ...options]));
for (const item of [dry, packed]) {
  assert.deepEqual(item.files.map(file => file.path).sort(), allowed, 'Archive contains missing or unexpected files');
  assert.equal(item.entryCount, allowed.length);
}
const tarball = join(output, packed.filename);
const bytes = await readFile(tarball);
assert.equal(`sha512-${createHash('sha512').update(bytes).digest('base64')}`, packed.integrity);
assert.equal(packed.integrity, dry.integrity, 'dry-run and real archive differ');
const members = run('tar', ['-tzf', tarball]).trim().split('\n');
assert.deepEqual(members.map(path => path.replace(/^package\//, '')).sort(), allowed);
assert(members.every(path => path.startsWith('package/') && !path.includes('..') && !path.includes('\\')));
assert(!run('tar', ['-tvzf', tarball]).split('\n').some(line => /^[lh]/.test(line)), 'No links allowed in package');
const unpacked = join(output, 'archive'); await mkdir(unpacked);
run('tar', ['-xzf', tarball, '-C', unpacked]);
for (const member of allowed) {
  const text = await readFile(join(unpacked, 'package', member), 'utf8');
  assert(!/-----BEGIN [A-Z ]*PRIVATE KEY-----|\bghp_[a-zA-Z0-9]{30,}|\bgithub_pat_[a-zA-Z0-9_]{30,}|\bAKIA[A-Z0-9]{16}\b|\bsk-proj-[a-zA-Z0-9_-]{30,}/.test(text), `Possible credential in ${member}`);
  if (member.startsWith('dist/')) assert(!/sourceMappingURL|sourceURL=|@import|@font-face/.test(text), `Unexpected runtime/source dependency in ${member}`);
}
const js = await readFile(join(unpacked, 'package/dist/index.js'), 'utf8');
const imports = ts.preProcessFile(js).importedFiles.map(entry => entry.fileName);
assert(imports.length > 0 && imports.every(name => /^react(?:\/|$)/.test(name)), 'Only external React runtime imports are expected');
assert(!/__CLIENT_INTERNALS|__SECRET_INTERNALS|react\.production|react\.development|requireReact/.test(js), 'Embedded React internals');
const css = await readFile(join(unpacked, 'package/dist/styles.css'), 'utf8');
assert(css.includes('--clu-') && css.includes('.clu-dialog') && css.includes('.clu-table'));

const consumer = join(output, 'consumer');
await cp(join(root, 'examples/consumer-smoke'), consumer, { recursive: true });
await cp(tarball, join(consumer, 'clu.tgz'));
const fixture = await json(join(consumer, 'package.json'));
assert.deepEqual(Object.keys(fixture.dependencies).sort(), ['react', 'react-dom']);
assert.deepEqual(Object.keys(fixture.devDependencies).sort(), ['@types/react', '@types/react-dom', 'typescript', 'vite']);
fixture.dependencies[manifest.name] = 'file:./clu.tgz';
const lock = await json(join(consumer, 'package-lock.json'));
lock.packages[''].dependencies = fixture.dependencies;
lock.packages[`node_modules/${manifest.name}`] = {
  version: manifest.version, resolved: 'file:clu.tgz', integrity: packed.integrity,
  peerDependencies: manifest.peerDependencies, engines: manifest.engines,
};
await writeFile(join(consumer, 'package.json'), `${JSON.stringify(fixture, null, 2)}\n`);
await writeFile(join(consumer, 'package-lock.json'), `${JSON.stringify(lock, null, 2)}\n`);
await writeFile(join(consumer, 'public-types.ts'), `export type { ${expected.types.join(', ')} } from '${manifest.name}';\n// @ts-expect-error Deep imports are intentionally blocked by package exports.\nimport '${manifest.name}/dist/index.js';\n// @ts-expect-error Internal scaffold is not a public API.\nimport { ScaffoldButton } from '${manifest.name}';\nvoid ScaffoldButton;\n`);
console.log(npm(['ci', '--no-fund', '--no-audit'], consumer).trim());
console.log(npm(['run', 'typecheck'], consumer).trim());
console.log(npm(['run', 'build'], consumer).trim());
const installed = join(consumer, 'node_modules', manifest.name);
assert.equal(await realpath(installed), installed, 'Packed CLU must not be a workspace symlink');
const reactPaths = [];
async function findReact(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (!item.isDirectory()) continue;
    const path = join(directory, item.name);
    if (item.name === 'react' && directory.endsWith('node_modules')) reactPaths.push(path);
    await findReact(path);
  }
}
await findReact(join(consumer, 'node_modules'));
assert.deepEqual(reactPaths, [join(consumer, 'node_modules/react')], 'Duplicate React installations');
const production = JSON.parse(npm(['ls', '--omit=dev', '--all', '--json'], consumer));
assert.deepEqual(Object.keys(production.dependencies).sort(), [manifest.name, 'react', 'react-dom'].sort());
const ssr = `import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createElement as h} from 'react';
import {renderToString} from 'react-dom/server';
import * as clu from '${manifest.name}';
assert.deepEqual(Object.keys(clu).sort(), ${JSON.stringify(expected.components)});
const require = createRequire(import.meta.url);
assert.equal(require.resolve('react'), createRequire(import.meta.resolve('${manifest.name}')).resolve('react'));
assert.equal(import.meta.resolve('${manifest.name}/styles.css').endsWith('/dist/styles.css'),true);
await assert.rejects(import('${manifest.name}/dist/index.js'),{code:'ERR_PACKAGE_PATH_NOT_EXPORTED'});
let called=0;
const html=renderToString(h('div', null,h(clu.Button,{onClick:()=>called++},'Packed button'),h(clu.Input,{defaultValue:'0'}),h(clu.Table,null,h(clu.Table.Caption,null,'Packed table'),h(clu.Table.Body,null,h(clu.Table.Row,null,h(clu.Table.Cell,{numeric:true},'12.00')))),h(clu.Pagination,{page:8,totalItems:11,pageSize:10,onPageChange:()=>called++}),h(clu.Dialog,{open:false,title:'Closed dialog',onOpenChange:()=>called++},'Preserved draft')));
assert.match(html, /type="button"/);assert.match(html, /value="0"/);assert.match(html, /<caption[^>]*>Packed table/);assert.match(html, /Showing 11–11 of 11 items/);assert.match(html, /aria-labelledby=/);assert.doesNotMatch(html, /<dialog[^>]* open/);assert.equal(called,0);
console.log('PASS public ESM/SSR, CSS export, blocked deep import, 19 APIs and shared React resolution');
`;
await writeFile(join(consumer, 'verify.mjs'), ssr);
console.log(run(process.execPath, ['verify.mjs'], consumer).trim());
const report = { name: packed.name, version: packed.version, filename: packed.filename, integrity: packed.integrity,
  shasum: packed.shasum, size: packed.size, unpackedSize: packed.unpackedSize, members: allowed, externalRuntimeImports: imports,
  consumer, reactPaths, browserReview: 'NOT RUN: serve consumer/dist and execute Run browser checks, then keyboard/interactions.' };
await writeFile(join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`PASS archive (${allowed.length} files), Bundler + NodeNext declarations, external production build, SSR, single React install.`);
console.log(`Report: ${join(output, 'report.json')}`);
console.log(`Browser: serve ${join(consumer, 'dist')} with a local static server; no browser pass is inferred by this script.`);
