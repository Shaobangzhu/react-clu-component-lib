import { createElement } from 'react';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';

const preview: Preview = {
  initialGlobals: { cluTheme: 'light' },
  globalTypes: {
    cluTheme: {
      description: 'Local CLU story theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }],
        dynamicTitle: true,
      },
    },
  },
  decorators: [(Story, context) => {
    const theme: unknown = context.parameters.cluTheme ?? context.globals.cluTheme;
    return createElement('div', { 'data-clu-theme': theme === 'dark' ? 'dark' : 'light', style: { background: 'var(--clu-surface-canvas)', color: 'var(--clu-text)', padding: 'var(--clu-space-4)', fontFamily: 'var(--clu-font-sans)' } }, createElement(Story));
  }],
  parameters: { layout: 'centered', a11y: { test: 'error' } },
};
export default preview;
