import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../index';
const meta = { title: 'Forms/Checkbox', component: Checkbox, args: { label: 'Include this option' } } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Filled: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Required: Story = { args: { required: true } };
export const Error: Story = { args: { error: 'Confirm the selection', description: 'Synthetic guidance' } };
export const Mixed: Story = { args: { indeterminate: true } };
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const LongLabel: Story = { args: { label: 'Include this option with a longer descriptive explanation that must wrap on small screens' } };
function Example() { const [checked, setChecked] = useState(false); return <Checkbox label="Controlled checkbox" checked={checked} onChange={e => { setChecked(e.target.checked); }}/>; }
export const Controlled: Story = { render: () => <Example /> };
