import { readdir, readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { join, resolve, relative } from 'node:path';
const root=resolve('artifacts');const output=join(root,'upload');await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
const credential=/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----|\b(?:ghp_|github_pat_|sk-proj-)[A-Za-z0-9_-]{20,}|\bAKIA[A-Z0-9]{16}\b/g;
let files=0;
async function walk(directory) {
  for (const item of await readdir(directory,{withFileTypes:true})) {
    if(item.name==='upload'||item.name==='html'||item.name==='candidates')continue;
    const path=join(directory,item.name);
    if(item.isSymbolicLink())throw new Error('Artifact symlinks forbidden');
    if(item.isDirectory()){await walk(path);continue;}
    if(!/\.(?:png|xml|json|log|txt)$/.test(item.name))continue;
    const bytes=await readFile(path);if(bytes.length>25*1024*1024)throw new Error('Artifact too large');
    let safe;
    if(item.name.endsWith('.png')) {
      if(!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw new Error('Invalid image artifact');safe=bytes;
    } else {
      safe=bytes.toString('utf8').replace(new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*[a-zA-Z]`,'g'),'').replaceAll(resolve('.'),'<workspace>').replace(credential,'[REDACTED]');
    }
    const target=join(output,relative(root,path));await mkdir(join(target,'..'),{recursive:true});await writeFile(target,safe);files++;
  }
}
await walk(root);console.log(`Prepared ${files} bounded synthetic diagnostic files; HTML/traces/env/cache excluded.`);
