import { createRef, StrictMode, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Field, Input, Textarea, Select, Checkbox, SegmentedControl, Button } from '../src/index';
it('links stable unique IDs, external guidance, required and error to a native control', async () => {
    const user = userEvent.setup();
    const tree = (error: string) => <><span id="external">External help</span><Field label="Reference" required description="Description" error={error} aria-describedby="external">{control => <Input {...control}/>}</Field><Field label="Other">{control => <input {...control}/>}</Field></>;
    const { rerender } = render(tree('Review entry'));
    const input = screen.getByRole('textbox', { name: 'Reference (required)' });
    const id = input.id;
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('External help Description Review entry');
    expect(new Set(Array.from(document.querySelectorAll('[id]')).map(node => node.id)).size).toBe(document.querySelectorAll('[id]').length);
    await user.click(screen.getByText('Reference (required)'));
    expect(input).toHaveFocus();
    rerender(tree(''));
    expect(input.id).toBe(id);
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).toHaveAccessibleDescription('External help Description');
});
it('preserves datetime-local strings, constraints and native input refs on controlled rerender', () => {
    const ref = createRef<HTMLInputElement>();
    const change = vi.fn();
    const { rerender } = render(<Input aria-label="Timestamp" ref={ref} type="datetime-local" step="60" min="2026-01-01T00:00" max="2026-12-31T23:59" value="2026-11-01T01:30" onChange={change} required/>);
    expect(ref.current?.value).toBe('2026-11-01T01:30');
    expect(ref.current).toHaveAttribute('step', '60');
    expect(ref.current).toBeRequired();
    rerender(<Input aria-label="Timestamp" ref={ref} type="datetime-local" value="2026-03-08T02:30" onChange={change}/>);
    expect(ref.current?.value).toBe('2026-03-08T02:30');
    expect(change).not.toHaveBeenCalled();
});
it('keeps number emptiness distinct from zero without converting event values', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const values: string[] = [];
    render(<Input type="number" aria-label="Quantity" ref={ref} min="0" max="10" step="0.01" onChange={e => values.push(e.target.value)}/>);
    expect(ref.current?.value).toBe('');
    await user.type(screen.getByRole('spinbutton'), '0');
    expect(values).toEqual(['0']);
    await user.clear(screen.getByRole('spinbutton'));
    expect(values.at(-1)).toBe('');
});
it('preserves textarea rows, maxlength, ref and controlled values including empty string', () => {
    const ref = createRef<HTMLTextAreaElement>();
    const onChange = vi.fn();
    const { rerender } = render(<Textarea aria-label="Notes" ref={ref} rows={4} maxLength={20} value="Sample" onChange={onChange}/>);
    expect(ref.current).toHaveAttribute('rows', '4');
    expect(ref.current).toHaveAttribute('maxlength', '20');
    expect(ref.current).toHaveValue('Sample');
    rerender(<Textarea aria-label="Notes" ref={ref} value="" onChange={onChange}/>);
    expect(ref.current).toHaveValue('');
    expect(onChange).not.toHaveBeenCalled();
});
it('uses native select option, disabled and controlled empty-value semantics', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLSelectElement>();
    const change = vi.fn();
    const options = <><option value="">None</option><option value="a">A</option><option value="b" disabled>B</option></>;
    const { unmount } = render(<Select aria-label="Category" ref={ref} defaultValue="">{options}</Select>);
    await user.selectOptions(screen.getByRole('combobox'), 'a');
    expect(ref.current).toHaveValue('a');
    await user.selectOptions(screen.getByRole('combobox'), 'b');
    expect(ref.current).toHaveValue('a');
    unmount();
    const { rerender } = render(<Select aria-label="Category" ref={ref} value="a" onChange={change}>{options}</Select>);
    rerender(<Select aria-label="Category" ref={ref} value="" onChange={change}>{options}</Select>);
    expect(ref.current).toHaveValue('');
});
it('supports checkbox label focus, keyboard, error and controlled rerender', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const change = vi.fn();
    const { rerender } = render(<Checkbox ref={ref} label="Confirm" checked={false} onChange={change} required error="Confirmation needed"/>);
    const checkbox = screen.getByRole('checkbox', { name: 'Confirm (required)' });
    expect(ref.current).toBe(checkbox);
    expect(checkbox).toHaveAccessibleDescription('Confirmation needed');
    expect(checkbox).toBeRequired();
    await user.tab();
    expect(checkbox).toHaveFocus();
    await user.keyboard(' ');
    expect(change).toHaveBeenCalledTimes(1);
    expect(checkbox).not.toBeChecked();
    rerender(<Checkbox label="Confirm" checked onChange={change}/>);
    expect(screen.getByRole('checkbox')).toBeChecked();
});
it('applies explicit indeterminate state and preserves React 19 callback-ref cleanup', () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { rerender, unmount } = render(<StrictMode><Checkbox label="Mixed" ref={ref} indeterminate/></StrictMode>);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
    const before = cleanup.mock.calls.length;
    rerender(<StrictMode><Checkbox label="Mixed" ref={ref} indeterminate={false}/></StrictMode>);
    expect(screen.getByRole('checkbox')).not.toBePartiallyChecked();
    unmount();
    expect(cleanup.mock.calls.length).toBeGreaterThan(before);
});
const options = [{ value: 'a', label: 'First' }, { value: 'b', label: 'Disabled', disabled: true }, { value: 'c', label: 'Third' }];
it('navigates native radios with arrows, skips disabled options and exits with Tab', async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    render(<><SegmentedControl name="choice" label="Presentation" options={options} defaultValue="a" onValueChange={changed}/><Button>After</Button></>);
    await user.tab();
    expect(screen.getByRole('radio', { name: 'First' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: 'Third' })).toHaveFocus();
    expect(screen.getByRole('radio', { name: 'Third' })).toBeChecked();
    expect(changed).toHaveBeenCalledExactlyOnceWith('c');
    await user.tab();
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
});
it('keeps segmented groups independent and supports controlled rerenders and fieldset refs', () => {
    const ref = createRef<HTMLFieldSetElement>();
    const changed = vi.fn();
    const { rerender } = render(<SegmentedControl ref={ref} label="Choice" options={options} value="a" onValueChange={changed} error="Review selection" required/>);
    expect(ref.current).toBe(screen.getByRole('group', { name: 'Choice (required)' }));
    expect(screen.getByRole('radio', { name: 'First' })).toHaveAccessibleDescription('Review selection');
    rerender(<><SegmentedControl label="Choice" options={options} value="c" onValueChange={changed}/><SegmentedControl label="Other" options={options} defaultValue="a"/></>);
    expect(screen.getAllByRole('radio', { name: 'Third' })[0]).toBeChecked();
    expect(screen.getAllByRole('radio', { name: 'First' })[1]).toBeChecked();
    expect(changed).not.toHaveBeenCalled();
});
it('submits native FormData once with no implicit values or date transformations and resets uncontrolled fields', async () => {
    const user = userEvent.setup();
    const submitted = vi.fn();
    render(<form onSubmit={event => { event.preventDefault(); submitted(new FormData(event.currentTarget)); }}>
 <Input aria-label="Reference" name="reference" defaultValue="A" required/><Input name="timestamp" type="datetime-local" defaultValue="2026-11-01T01:30"/>
 <Textarea aria-label="Notes" name="notes" defaultValue=""/><Checkbox name="include" label="Include" defaultChecked/><Checkbox name="disabled" label="Disabled checkbox" defaultChecked disabled/>
 <SegmentedControl name="choice" label="Choice" options={options} defaultValue="a"/><Button type="submit">Submit</Button><Button type="reset">Reset</Button><Button>Non-submit</Button></form>);
    await user.type(screen.getByRole('textbox', { name: 'Reference' }), 'B');
    await user.click(screen.getByRole('button', { name: 'Non-submit' }));
    expect(submitted).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submitted).toHaveBeenCalledTimes(1);
    const data = submitted.mock.calls[0]?.[0] as FormData;
    expect(Object.fromEntries(data)).toEqual({ reference: 'AB', timestamp: '2026-11-01T01:30', notes: '', include: 'on', choice: 'a' });
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByRole('textbox', { name: 'Reference' })).toHaveValue('A');
});
it('leaves native validity, readOnly and disabled handling to the browser', async () => {
    const user = userEvent.setup();
    const submit = vi.fn();
    render(<form onSubmit={e => { e.preventDefault(); submit(); }}><Input aria-label="Required" required/><Input aria-label="Read only" readOnly defaultValue="Locked"/><Textarea aria-label="Disabled notes" disabled/><Button type="submit">Send</Button></form>);
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(submit).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox', { name: 'Required' })).toBeInvalid();
    await user.type(screen.getByRole('textbox', { name: 'Read only' }), 'change');
    expect(screen.getByRole('textbox', { name: 'Read only' })).toHaveValue('Locked');
    await user.type(screen.getByRole('textbox', { name: 'Required' }), 'Valid');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(submit).toHaveBeenCalledTimes(1);
});
it('reports controlled edits without internal mirrors or mode changes', async () => {
    function Example() { const [value, setValue] = useState(''); return <Input aria-label="Controlled" value={value} onChange={e => { setValue(e.target.value); }}/>; }
    const user = userEvent.setup();
    render(<Example />);
    await user.type(screen.getByRole('textbox'), 'abc');
    expect(screen.getByRole('textbox')).toHaveValue('abc');
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
    expect(screen.getByRole('textbox')).toHaveValue('');
});
