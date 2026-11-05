import type { Meta, StoryObj } from '@storybook/react-vite';
import { TokenGallery } from './TokenGallery';

const meta = {
  title: 'Foundations/Semantic tokens',
  component: TokenGallery,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TokenGallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Interactive: Story = {};
export const Light: Story = { parameters: { cluTheme: 'light' } };
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const Compare: Story = {
  render: () => (
    <div data-clu-theme="dark">
      <TokenGallery />
      <div data-clu-theme="light"><TokenGallery /></div>
    </div>
  ),
};
