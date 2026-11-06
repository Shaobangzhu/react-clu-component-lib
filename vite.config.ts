import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'clu-runtime-boundary',
    apply: config => Boolean(config.build?.lib),
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk') continue;
        for (const id of Object.keys(output.modules)) {
          if (id.includes('/node_modules/') && /\.[cm]?[jt]sx?(?:\?|$)/.test(id)) {
            throw new Error(`CLU must not bundle dependency runtime: ${id}`);
          }
        }
      }
    },
  }],
  build: {
    target: 'es2022',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: true,
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        styles: fileURLToPath(new URL('./src/styles/index.css', import.meta.url)),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: 'styles',
    },
    rolldownOptions: {
      // Include JSX runtimes and ReactDOM subpaths; never embed a React runtime.
      external: /^react(?:-dom)?(?:\/|$)/,
    },
  },
});
