import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, Field } from '../index';
const meta = { title: 'Forms/Select', component: Select, render: args => <div style={{ width: 'min(340px, 100%)' }}><Field label="Descriptive label">{control => <Select {...control} {...args}><option value="">Choose an option</option><option value="one">Option one</option><option value="two">Option two</option></Select>}</Field></div> } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: 'one' } };
export const Required: Story = { args: { required: true }, render: args => <Field label="Required selection" required>{control => <Select {...control} {...args}><option value="">Choose an option</option><option value="one">Option one</option><option value="two">Option two</option></Select>}</Field> };
export const Disabled: Story = { args: { disabled: true } };
export const Error: Story = { render: args => <Field label="Review this entry" error="Choose a valid value" description="A synthetic description">{control => <Select {...control} {...args}><option value="">Choose an option</option><option value="one">Option one</option><option value="two">Option two</option></Select>}</Field> };
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const LongLabel: Story = { render: args => <Field label="A long descriptive field label that should wrap safely at narrow viewport widths">{control => <Select {...control} {...args}><option value="">Choose an option</option><option value="one">Option one</option><option value="two">Option two</option></Select>}</Field> };
function ControlledExample() { const [value, setValue] = useState(''); return <Field label="Controlled value">{control => <Select {...control} value={value} onChange={event => { setValue(event.target.value); }}><option value="">Choose an option</option><option value="one">Option one</option><option value="two">Option two</option></Select>}</Field>; }
export const Controlled: Story = { render: () => <ControlledExample /> };
