import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readdir, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join, basename } from 'node:path';
const mode = process.argv[2];
if (!['stories', 'visual', 'candidates', 'probe'].includes(mode)) throw new Error('Expected stories, visual, candidates or probe');
if (process.env.CI && mode === 'candidates') throw new Error('CI must never update baselines');
const output = resolve('artifacts/browser', mode);
await mkdir(output, { recursive: true });
const input = await mkdtemp(join(tmpdir(),'clu-browser-input-'));
// Mount only a disposable code projection. The real workspace/.git/.env are never mounted.
const files=(await readdir('.')).filter(name=>/^(?:package(?:-lock)?\.json|tsconfig.*\.json|vite.*\.ts|vitest.*\.ts|playwright\.config\.ts|eslint\.config\.js|README\.md|\.nvmrc|\.npmrc)$/.test(name));
for(const name of [...files,'.storybook','src','tests','scripts','.ci','examples']) {
  await cp(name,join(input,name),{recursive:true,filter:path=>!['.git','node_modules','artifacts'].includes(basename(path))&&!basename(path).startsWith('.env')});
}
const run = args => {
  const child = spawnSync('docker', args, { stdio: 'inherit' });
  if (child.error) throw child.error;
  if (child.status !== 0) throw Object.assign(new Error(`Docker stage failed (${child.status ?? 1})`),{exitCode:child.status ?? 1});
};
try {
  run(['build', '--platform', 'linux/amd64', '-f', '.ci/Dockerfile.browser', '-t', 'clu-browser:p08', '.ci']);
  run(['run', '--rm', '--platform', 'linux/amd64', '--ipc=host', '-e', `CI=${mode === 'candidates' ? '' : 'true'}`, '-v', `${input}:/input:ro`, '-v', `${output}:/output`, 'clu-browser:p08', 'bash', '/input/.ci/browser-run.sh', mode]);
} catch(error) { console.error(error.message); process.exitCode=error.exitCode ?? 1; }
finally { await rm(input,{recursive:true,force:true}); }
