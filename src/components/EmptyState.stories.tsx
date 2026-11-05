import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from '../index';
const meta = { title: 'Display/EmptyState', component: EmptyState, args: { title: 'No observations yet', description: 'Adjust the filters or add a record.' } } satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const Compact: Story = { decorators: [Story => <div style={{ width: 'min(100%, 340px)' }}><Story /></div>] };
export const LongContent: Story = { args: { title: 'No observations match this long descriptive filter selection' } };
