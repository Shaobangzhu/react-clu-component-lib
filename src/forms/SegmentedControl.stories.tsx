import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from '../index';
const options = [{ value: 'first', label: 'First' }, { value: 'second', label: 'Second' }, { value: 'third', label: 'Disabled', disabled: true }];
const meta = { title: 'Forms/SegmentedControl', component: SegmentedControl, args: { label: 'Presentation', options } } satisfies Meta<typeof SegmentedControl>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: 'first' } };
export const Disabled: Story = { args: { disabled: true } };
export const Required: Story = { args: { required: true } };
export const Error: Story = { args: { error: 'Select one option', description: 'Only a single choice is allowed' } };
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const LongLabel: Story = { args: { label: 'A long legend for this single-choice selection', options: [{ value: 'a', label: 'First option with a long description' }, { value: 'b', label: 'Second long option' }] } };
function Example() { const [value, setValue] = useState('first'); return <SegmentedControl label="Controlled selection" options={options} value={value} onValueChange={setValue}/>; }
export const Controlled: Story = { render: () => <Example /> };
