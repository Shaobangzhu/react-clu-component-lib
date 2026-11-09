import { defineConfig } from '@playwright/test';
if (process.env.CI && (process.argv.some(arg => arg.startsWith('--update-snapshots')) || process.env.CLU_UPDATE_BASELINES)) throw new Error('CI cannot update golden screenshots');
export default defineConfig({
  testDir:'tests/browser',outputDir:'artifacts/playwright/results',
  snapshotPathTemplate:'{testDir}/../visual/baselines/{projectName}/{arg}{ext}',
  updateSnapshots:process.env.CLU_UPDATE_BASELINES ? 'all' : 'none',
  fullyParallel:false,workers:1,retries:0,forbidOnly:true,
  reporter:[['list'],['junit',{outputFile:'artifacts/playwright/results.xml'}],['html',{outputFolder:'artifacts/playwright/html',open:'never'}]],
  expect:{toHaveScreenshot:{maxDiffPixels:0,threshold:0,animations:'disabled',caret:'hide',scale:'css'}},
  use:{baseURL:'http://127.0.0.1:6010',browserName:'chromium',locale:'en-US',timezoneId:'UTC',colorScheme:'light',reducedMotion:'reduce',deviceScaleFactor:1,trace:'off',video:'off',screenshot:'only-on-failure'},
  projects:[{name:'desktop',use:{viewport:{width:1280,height:800}}},{name:'mobile',use:{viewport:{width:390,height:844}}}],
  webServer:{command:'node scripts/serve-storybook.mjs',url:'http://127.0.0.1:6010',reuseExistingServer:false},
});
