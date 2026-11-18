import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';

// Portfolio/demo policy: runtime dependency vulnerabilities block; dev-tool findings are reported.
// Audit/registry failures still fail the job. Do not confuse report-only with a clean audit.
const checks = [
  { name: 'production', args: ['--omit=dev'], level: 'moderate', enforcement: 'blocking' },
  { name: 'full', args: [], level: 'high', enforcement: 'report-only' },
];
const summaries = [];
let status = 0;

for (const { name, args, level, enforcement } of checks) {
  const result = spawnSync(process.execPath, [process.env.npm_execpath, 'audit', '--json', `--audit-level=${level}`, ...args], { encoding: 'utf8' });
  if (result.error) throw result.error;
  let report;
  try { report = JSON.parse(result.stdout); }
  catch { throw new Error(`Audit ${name} returned invalid JSON: ${result.stderr}`); }
  if (report.error || !report.metadata?.vulnerabilities || ![0, 1].includes(result.status)) {
    throw new Error(`Audit ${name} failed unexpectedly: ${report.error?.summary ?? result.stderr}`);
  }

  const vulnerabilities = report.metadata.vulnerabilities;
  const thresholdLevels = level === 'moderate' ? ['moderate', 'high', 'critical'] : ['high', 'critical'];
  const thresholdFindings = thresholdLevels.reduce((sum, key) => sum + (vulnerabilities[key] ?? 0), 0);
  if ((result.status === 1) !== (thresholdFindings > 0)) {
    throw new Error(`Audit ${name} exit code did not match vulnerability findings`);
  }

  summaries.push({
    name, auditLevel: level, enforcement, exitCode: result.status, vulnerabilities,
    advisories: Object.entries(report.vulnerabilities ?? {}).map(([packageName, value]) => ({
      name: packageName, severity: value.severity,
      via: (value.via ?? []).filter(item => typeof item === 'object').map(item => ({ title: item.title, url: item.url })),
    })),
  });
  if (enforcement === 'blocking' && thresholdFindings > 0) status = 1;
}

await mkdir('artifacts/security', { recursive: true });
await writeFile('artifacts/security/summary.json', JSON.stringify(summaries, null, 2));
console.log(JSON.stringify(summaries, null, 2));
for (const summary of summaries) {
  if (summary.enforcement === 'report-only' && summary.exitCode === 1) {
    const { moderate = 0, high = 0, critical = 0 } = summary.vulnerabilities;
    console.warn(`::warning title=Dev dependency audit (non-blocking)::Full dependency audit found ${moderate} moderate, ${high} high, ${critical} critical affected package entries. Demo policy: report only; review artifacts/security/summary.json and docs/ci-quality.md.`);
  }
}
process.exitCode = status;
