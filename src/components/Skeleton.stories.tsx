import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '../index';
const meta = { title: 'Display/Skeleton', component: Skeleton, args: { style: { width: '12rem' } } } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const Compact: Story = { decorators: [Story => <div style={{ width: 'min(100%, 340px)' }}><Story /></div>] };
export const LongContent: Story = { args: {} };
