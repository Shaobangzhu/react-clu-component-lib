import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea, Field } from '../index';
const meta = { title: 'Forms/Textarea', component: Textarea, render: args => <div style={{ width: 'min(340px, 100%)' }}><Field label="Descriptive label">{control => <Textarea {...control} {...args}/>}</Field></div> } satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: 'Synthetic sample' } };
export const Required: Story = { args: { required: true }, render: args => <Field label="Required selection" required>{control => <Textarea {...control} {...args}/>}</Field> };
export const Disabled: Story = { args: { disabled: true } };
export const Error: Story = { render: args => <Field label="Review this entry" error="Choose a valid value" description="A synthetic description">{control => <Textarea {...control} {...args}/>}</Field> };
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const LongLabel: Story = { render: args => <Field label="A long descriptive field label that should wrap safely at narrow viewport widths">{control => <Textarea {...control} {...args}/>}</Field> };
function ControlledExample() { const [value, setValue] = useState(''); return <Field label="Controlled value">{control => <Textarea {...control} value={value} onChange={event => { setValue(event.target.value); }}></Textarea>}</Field>; }
export const Controlled: Story = { render: () => <ControlledExample /> };
