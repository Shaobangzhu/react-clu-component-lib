import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScaffoldButton } from './ScaffoldButton';

const meta = {
  title: 'Foundation/Internal scaffold (not a public Button)',
  component: ScaffoldButton,
  args: { children: 'React 19 scaffold' },
  parameters: {
    docs: {
      description: {
        component: 'Internal P01 rendering proof. Public components start in later PRs.',
      },
    },
  },
} satisfies Meta<typeof ScaffoldButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RenderingProof: Story = {};
