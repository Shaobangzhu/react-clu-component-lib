import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../index';
const meta = { title: 'Display/Card', component: Card, args: { header: 'Overview', children: 'Panel content', footer: 'Supporting detail' } } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const Compact: Story = { decorators: [Story => <div style={{ width: 'min(100%, 340px)' }}><Story /></div>] };
export const LongContent: Story = { args: { children: 'A long descriptive label that must remain readable on compact screens and at increased zoom' } };
