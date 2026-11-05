import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, Input } from '../index';
const meta = { title: 'Forms/Field', component: Field, args: { label: 'Reference', children: control => <Input {...control}/> } } satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Required: Story = { args: { required: true } };
export const Error: Story = { args: { description: 'Synthetic guidance', error: 'Review this entry' } };
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const LongLabel: Story = { args: { label: 'A long label that must remain readable when zoomed or displayed on a compact screen' } };
export const Filled: Story = { args: { children: control => <Input {...control} defaultValue="Sample"/> } };
export const Disabled: Story = { args: { children: control => <Input {...control} disabled/> } };

function ControlledField(){ const [value,setValue]=useState('');return <Field label="Controlled native child">{control=><input {...control} value={value} onChange={event=>{setValue(event.target.value);}}/>}</Field>; }
export const Controlled:Story={render:()=> <ControlledField/>};
