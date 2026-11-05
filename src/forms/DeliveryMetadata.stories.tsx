import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, Input, Textarea, Select, Checkbox, SegmentedControl, Button } from '../index';
function SyntheticForm() {
    const [reference, setReference] = useState('Sample A');
    const [result, setResult] = useState('');
    return <form style={{ display: 'grid', gap: 'var(--clu-space-4)', maxWidth: '38rem', padding: 'var(--clu-space-6)', background: 'var(--clu-surface-canvas)', color: 'var(--clu-text)', fontFamily: 'var(--clu-font-sans)' }} onSubmit={event => { event.preventDefault(); setResult('Synthetic form submitted'); }}>
 <h1>Delivery metadata · synthetic</h1>
 <Field label="Reference" required description="Generic synthetic text only">{control => <Input {...control} name="reference" value={reference} onChange={e => { setReference(e.target.value); }} maxLength={80}/>}</Field>
 <Field label="Local timestamp" description="The consumer owns timezone interpretation">{control => <Input {...control} name="timestamp" type="datetime-local" step="60" defaultValue="2026-11-05T09:30"/>}</Field>
 <Field label="Category" required>{control => <Select {...control} name="category" defaultValue=""><option value="">Choose a category</option><option value="a">Category A</option><option value="b">Category B</option></Select>}</Field>
 <Field label="Quantity" description="Empty and zero remain distinct">{control => <Input {...control} type="number" name="quantity" min="0" step="0.01"/>}</Field>
 <Field label="Notes">{control => <Textarea {...control} name="notes" rows={3} maxLength={200}/>}</Field>
 <Checkbox label="Include optional metadata" name="include" description="This checkbox has native form semantics"/>
 <SegmentedControl name="view" label="Presentation" defaultValue="summary" options={[{ value: 'summary', label: 'Summary' }, { value: 'detail', label: 'Detailed description' }, { value: 'later', label: 'Unavailable option', disabled: true }]}/>
 <Button type="submit">Submit synthetic form</Button><output>{result}</output>
 </form>;
}
const meta = { title: 'Forms/Delivery metadata (synthetic)', component: SyntheticForm, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof SyntheticForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Light: Story = {};
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
