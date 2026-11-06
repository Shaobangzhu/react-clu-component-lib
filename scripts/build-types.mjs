import { execFileSync } from 'node:child_process';
import { readdir, readFile, unlink } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import ts from 'typescript';

execFileSync(process.execPath, [resolve('node_modules/typescript/bin/tsc'), '-p', 'tsconfig.build.json'], { stdio: 'inherit' });
// tsc also emits private implementation imports. Ship only the public type graph.
const reachable = new Set();
async function visit(file) {
  if (reachable.has(file)) return;
  reachable.add(file);
  for (const entry of ts.preProcessFile(await readFile(file, 'utf8')).importedFiles) {
    if (entry.fileName.startsWith('.')) {
      if (!entry.fileName.endsWith('.js')) throw new Error(`Declaration must use ESM .js path: ${entry.fileName}`);
      await visit(resolve(dirname(file), entry.fileName.replace(/\.js$/, '.d.ts')));
    }
  }
}
await visit(resolve('dist/index.d.ts'));
for (const entry of await readdir('dist', { recursive: true })) {
  if (entry.endsWith('.d.ts') && !reachable.has(resolve('dist', entry))) await unlink(resolve('dist', entry));
}
console.log(`Public declaration graph: ${reachable.size} files; private implementation declarations pruned.`);
