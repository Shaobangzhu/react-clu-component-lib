import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Field } from '../index';
const meta = { title: 'Forms/Input', component: Input, render: args => <div style={{ width: 'min(340px, 100%)' }}><Field label="Descriptive label">{control => <Input {...control} {...args}/>}</Field></div> } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: 'Synthetic sample' } };
export const Required: Story = { args: { required: true }, render: args => <Field label="Required selection" required>{control => <Input {...control} {...args}/>}</Field> };
export const Disabled: Story = { args: { disabled: true } };
export const Error: Story = { render: args => <Field label="Review this entry" error="Choose a valid value" description="A synthetic description">{control => <Input {...control} {...args}/>}</Field> };
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const LongLabel: Story = { render: args => <Field label="A long descriptive field label that should wrap safely at narrow viewport widths">{control => <Input {...control} {...args}/>}</Field> };
function ControlledExample() { const [value, setValue] = useState(''); return <Field label="Controlled value">{control => <Input {...control} value={value} onChange={event => { setValue(event.target.value); }}></Input>}</Field>; }
export const Controlled: Story = { render: () => <ControlledExample /> };
