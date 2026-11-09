const needs = JSON.parse(process.env.CLU_NEEDS ?? '{}');
const required = ['checks', 'components', 'visual'];
const failed = required.filter(name => needs[name]?.result !== 'success');
for (const name of required) console.log(`${name}: ${needs[name]?.result ?? 'missing'}`);
if (failed.length) { console.error(`Quality gate blocked: ${failed.join(', ')}`); process.exitCode = 1; }
