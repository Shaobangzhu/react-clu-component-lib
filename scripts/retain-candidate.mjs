import assert from 'node:assert/strict';
import { constants } from 'node:fs';
import { chmod, copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { dirname, resolve, join } from 'node:path';
const run=args=>{const r=spawnSync(args[0],args.slice(1),{encoding:'utf8',maxBuffer:8*1024*1024});if(r.error)throw r.error;if(r.status!==0)throw new Error(`${args[0]} exited ${r.status}: ${r.stderr}`);return r.stdout;};
const git=process.env.CLU_GIT??'git';
const resume=process.argv[4]==='--resume-incomplete';assert(process.argv[4]===undefined||resume);
const reportPath=resolve(process.argv[2]);const report=JSON.parse(await readFile(reportPath,'utf8'));
const source=resolve(dirname(reportPath),report.filename);const bytes=await readFile(source);
const integrity=`sha512-${createHash('sha512').update(bytes).digest('base64')}`;
assert.equal(integrity,report.integrity,'Actual bytes must match npm pack integrity');
const browserDirectory=resolve(process.argv[3]);
const browser=JSON.parse(await readFile(join(browserDirectory,'browser-results.json'),'utf8'));
assert.equal(browser.integrity,integrity,'Browser verification must test these exact archive bytes');
const consumerLock=await readFile(join(report.consumer,'package-lock.json'));
assert.equal(browser.lockSHA256,createHash('sha256').update(consumerLock).digest('hex'),'Retain the exact consumer lock used in the browser');
assert.equal(`sha512-${createHash('sha512').update(await readFile(join(report.consumer,'clu.tgz'))).digest('base64')}`,integrity);
assert.equal(browser.cssScoped,true);assert.equal(browser.tailwindRequired,false);assert.equal(browser.contexts.length,4);
assert.deepEqual(browser.contexts.map(context=>`${context.viewport.width}-${context.theme}`).sort(),['1280-dark','1280-light','390-dark','390-light']);
for(const context of browser.contexts){assert.equal(context.hostSentinels,12);assert.equal(context.nativeRefs,5);for(const key of ['controlledEmptyAndZero','disabledLoading','errorUnknown','nativeKeyboard','modalRestoreAndDraft'])assert.equal(context[key],true);}
const browserFiles=(await readdir(browserDirectory)).filter(file=>file==='browser-results.json'||/^\d+-(light|dark)-(consumer|dialog)\.png$/.test(file));
assert.equal(browserFiles.length,9,'Four contexts must include eight reviewable screenshots');
const current=JSON.parse(await readFile('package.json','utf8'));
assert.equal(current.name,report.name);assert.equal(current.version,report.version);assert.match(current.version,/^\d+\.\d+\.\d+-rc\.\d+$/);assert.equal(current.private,true);assert.equal(current.license,'UNLICENSED');
const members=run(['tar','-tzf',source]).trim().split('\n');assert.deepEqual(members.map(name=>name.replace(/^package\//,'')).sort(),report.members);
assert(!run(['tar','-tvzf',source]).split('\n').some(line=>/^[lh]/.test(line)));
const manifest=[];
for(const member of members){assert(member.startsWith('package/')&&!member.includes('..'));const content=spawnSync('tar',['-xOf',source,member],{maxBuffer:8*1024*1024});assert.equal(content.status,0);manifest.push({file:member.slice(8),size:content.stdout.length,sha256:createHash('sha256').update(content.stdout).digest('hex')});}
const archived=JSON.parse(run(['tar','-xOf',source,'package/package.json']));assert.deepEqual(archived,current);
// Resolve provenance before creating the artifact, so a broken local Git
// executable cannot leave a half-written evidence directory on a normal run.
const diff=run([git,'diff','--binary','HEAD']);
const sourceCommit=run([git,'rev-parse','HEAD']).trim();const branch=run([git,'branch','--show-current']).trim();
const untracked=run([git,'ls-files','--others','--exclude-standard','-z']).split('\0').filter(Boolean);
const id=createHash('sha256').update(bytes).digest('hex').slice(0,12);
await mkdir('artifacts/prerelease',{recursive:true});const directory=resolve('artifacts/prerelease',`${report.name}-${report.version}-${id}`);
const retained=join(directory,report.filename);
if(resume){assert.deepEqual(await readdir(directory),[report.filename],'Only an incomplete directory containing the untouched tarball can resume');assert.deepEqual(await readFile(retained),bytes,'Resuming must preserve the already retained bytes');}
else{await mkdir(directory);await copyFile(source,retained,constants.COPYFILE_EXCL);await chmod(retained,0o444);}
assert.equal(`sha512-${createHash('sha512').update(await readFile(retained)).digest('base64')}`,integrity);
await writeFile(join(directory,'release-preparation.patch'),diff);const untrackedManifest=[];
for(const file of untracked){const data=await readFile(file);untrackedManifest.push({file,sha256:createHash('sha256').update(data).digest('hex')});const destination=resolve(directory,'untracked-preparation',file);await mkdir(dirname(destination),{recursive:true});await copyFile(file,destination,constants.COPYFILE_EXCL);}
await writeFile(join(directory,'npm-pack-verification.json'),JSON.stringify(report,null,2)+'\n');
await mkdir(join(directory,'browser'));const browserEvidence=[];
for(const file of browserFiles){const data=await readFile(join(browserDirectory,file));await copyFile(join(browserDirectory,file),join(directory,'browser',file),constants.COPYFILE_EXCL);browserEvidence.push({file:`browser/${file}`,sha256:createHash('sha256').update(data).digest('hex')});}
await mkdir(join(directory,'consumer'));const consumerEvidence=[];
for(const file of ['package.json','package-lock.json','app.tsx','public-types.ts','tsconfig.json','tsconfig.nodenext.json','host.css','index.html','verify.mjs']){const data=await readFile(join(report.consumer,file));await copyFile(join(report.consumer,file),join(directory,'consumer',file),constants.COPYFILE_EXCL);consumerEvidence.push({file:`consumer/${file}`,sha256:createHash('sha256').update(data).digest('hex')});}
const candidate={status:'provisional-private-license-and-distribution-unapproved',name:report.name,version:report.version,private:true,license:'UNLICENSED',path:retained,size:bytes.length,integrity,npmReportedIntegrity:report.integrity,integrityMatches:true,sourceCommit,branch,gitExecutable:git,retentionResumedFromIncompleteEvidence:resume,uncommittedTrackedDiffSHA256:createHash('sha256').update(diff).digest('hex'),untrackedPreparation:untrackedManifest,archiveManifest:manifest.sort((a,b)=>a.file.localeCompare(b.file)),browserVerification:browser,browserEvidence,externalConsumer:{lockSHA256:browser.lockSHA256,files:consumerEvidence},publicationApproved:false,distributed:false,proposedRegistry:'https://registry.npmjs.org',proposedChannel:'next',proposedAccess:'public',blockers:['owner approval of final identity/license','npm authentication and verified publishing rights','private flag must be explicitly approved for change; changed metadata requires a new verified candidate'],repackPolicy:'Never replace this tarball. Any rebuild/repack or metadata change is a new candidate requiring renewed verification/approval.'};
await writeFile(join(directory,'candidate.json'),JSON.stringify(candidate,null,2)+'\n');console.log(JSON.stringify({directory,path:retained,integrity,size:bytes.length,sourceCommit:candidate.sourceCommit,status:candidate.status},null,2));
