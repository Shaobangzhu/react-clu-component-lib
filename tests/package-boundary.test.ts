// @vitest-environment node
import { expect, it } from 'vitest';
import { build, loadConfigFromFile } from 'vite';

it('rejects a real library build that accidentally removes React externalization', async () => {
  const loaded = await loadConfigFromFile({ command: 'build', mode: 'production' }, 'vite.config.ts');
  if (!loaded) throw new Error('Missing Vite configuration');
  await expect(build({
    ...loaded.config,
    configFile: false,
    logLevel: 'silent',
    build: {
      ...loaded.config.build,
      write: false,
      rolldownOptions: { ...loaded.config.build?.rolldownOptions, external: [] },
    },
  })).rejects.toThrow('CLU must not bundle dependency runtime');
});
