import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
export default defineConfig({
  test: {
    reporters: ['default', ['junit', { outputFile: 'artifacts/storybook/results.xml' }]],
    projects: [{
      plugins: [storybookTest({ configDir: fileURLToPath(new URL('./.storybook', import.meta.url)) })],
      test: {
        name: 'storybook',
        browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] },
      },
    }],
  },
});
