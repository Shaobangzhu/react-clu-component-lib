import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
const checks=[['production',['--omit=dev'],'moderate'],['full',[],'high']];
const summaries=[];let status=0;
for (const [name,args,level] of checks) {
  const result=spawnSync(process.execPath,[process.env.npm_execpath,'audit','--json',`--audit-level=${level}`,...args],{encoding:'utf8'});
  if(result.error)throw result.error;
  const report=JSON.parse(result.stdout);
  if(report.error || !report.metadata) throw new Error(`Audit ${name} failed: ${report.error?.summary ?? result.stderr}`);
  summaries.push({name,blockingLevel:level,exitCode:result.status,vulnerabilities:report.metadata.vulnerabilities,advisories:Object.entries(report.vulnerabilities ?? {}).map(([name,value])=>({name,severity:value.severity,via:value.via.filter(item=>typeof item==='object').map(item=>({title:item.title,url:item.url}))}))});
  if(result.status!==0)status=result.status ?? 1;
}
await mkdir('artifacts/security',{recursive:true});await writeFile('artifacts/security/summary.json',JSON.stringify(summaries,null,2));
console.log(JSON.stringify(summaries,null,2));process.exitCode=status;
