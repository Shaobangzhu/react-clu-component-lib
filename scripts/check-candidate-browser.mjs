import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
const report=JSON.parse(await readFile(process.argv[2],'utf8'));
const output=resolve(process.argv[3]);await mkdir(dirname(output),{recursive:true});await mkdir(output);
const input=await mkdtemp(join(tmpdir(),'clu-candidate-browser-'));
const sri=bytes=>`sha512-${createHash('sha512').update(bytes).digest('base64')}`;
assert.equal(sri(await readFile(resolve(report.consumer,'clu.tgz'))),report.integrity);
await mkdir(join(input,'tools/scripts'),{recursive:true});await mkdir(join(input,'consumer'));
for(const file of ['package.json','package-lock.json'])await cp(file,join(input,'tools',file));
await cp('scripts/candidate-browser-test.mjs',join(input,'tools/scripts/candidate-browser-test.mjs'));
for(const file of ['package.json','package-lock.json','app.tsx','public-types.ts','tsconfig.json','tsconfig.nodenext.json','host.css','index.html','verify.mjs','clu.tgz']) await cp(resolve(report.consumer,file),join(input,'consumer',file));
const run=args=>{const child=spawnSync('docker',args,{stdio:'inherit'});if(child.error)throw child.error;if(child.status!==0)throw Object.assign(new Error('Candidate browser verification failed'),{exitCode:child.status??1});};
try {
  run(['build','--platform','linux/amd64','-f','.ci/Dockerfile.browser','-t','clu-browser:p08','.ci']);
  run(['run','--rm','--platform','linux/amd64','--ipc=host','-e','CI=true','-v',`${input}:/input:ro`,'-v',`${output}:/output`,'clu-browser:p08','bash','-e','-o','pipefail','-c',
    'cp -R /input/tools /tools; cp -R /input/consumer /consumer; cd /tools; npm ci --strict-peer-deps --no-fund --no-audit; cd /consumer; npm ci --strict-peer-deps --no-fund --no-audit; npm run typecheck; npm run build; node verify.mjs; cd /tools; node scripts/candidate-browser-test.mjs /consumer /output']);
} catch(error){console.error(error.message);process.exitCode=error.exitCode??1;}
finally{await rm(input,{recursive:true,force:true});}
