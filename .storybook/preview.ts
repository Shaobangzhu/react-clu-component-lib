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
    return createElement('div', { 'data-clu-theme': theme === 'dark' ? 'dark' : 'light' }, createElement(Story));
  }],
  parameters: { layout: 'centered' },
};
export default preview;
