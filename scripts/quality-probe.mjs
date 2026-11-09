import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
const directory=await mkdtemp(join(tmpdir(),'clu-failure-probe-'));
await writeFile(join(directory,'intentional.test.mjs'),"import test from 'node:test';import assert from 'node:assert/strict';test('intentional synthetic failure',()=>assert.equal(1,2));\n");
const child=spawnSync('bash',['-c','set -o pipefail; "$1" --test intentional.test.mjs 2>&1 | tee execution.log','probe',process.execPath],{cwd:directory,encoding:'utf8'});
assert.equal(child.status,1,'tee must preserve the failing test status');
const custom=spawnSync('bash',['-c','set -o pipefail; "$1" -e "process.exit(23)" 2>&1 | tee custom.log','probe',process.execPath],{cwd:directory,encoding:'utf8'});
assert.equal(custom.status,23);
const success={checks:{result:'success'},components:{result:'success'},visual:{result:'success'}};
const cases=[['success',success,0],...['failure','skipped','cancelled'].map(result=>[result,{...success,components:{result}},1]),['missing',{},1]];
const outcomes=[];
for (const [name,needs,expected] of cases) {
  const result=spawnSync(process.execPath,[resolve('scripts/quality-gate.mjs')],{env:{...process.env,CLU_NEEDS:JSON.stringify(needs)},encoding:'utf8'});
  assert.equal(result.status,expected);outcomes.push({name,exitCode:result.status});
}
await mkdir('artifacts/probe',{recursive:true});
await writeFile('artifacts/probe/intentional-failure.txt',child.stdout);
await writeFile('artifacts/probe/summary.json',JSON.stringify({intentionalFailureExit:child.status,customExit:custom.status,aggregate:outcomes,disposable:true},null,2));
console.log('PASS: disposable real failing test stayed failed through tee; exit 23 preserved; gate rejects failure/skipped/cancelled/missing.');
