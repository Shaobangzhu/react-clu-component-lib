import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Dedicated config keeps Vite's library output settings out of the test runner.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: { provider: 'v8', include: ['src/components/**', 'src/forms/**', 'src/data/**', 'src/overlays/**'], exclude: ['**/*.stories.tsx'], reporter: ['text', 'json-summary'], reportsDirectory: 'artifacts/coverage', thresholds: { lines: 90, statements: 90, functions: 85, branches: 80 } },
    css: true,
    clearMocks: true,
    restoreMocks: true,
  },
});
