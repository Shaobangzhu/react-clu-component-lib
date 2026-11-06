import { StrictMode, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Alert, Button, Dialog, Field, Input } from '../index';

function Editor({ long = false, backdrop = false, locked = false, removeTrigger = false }: { long?: boolean; backdrop?: boolean; locked?: boolean; removeTrigger?: boolean }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Synthetic note');
  const [error, setError] = useState(false);
  const [saves, setSaves] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const fallback = useRef<HTMLButtonElement>(null);
  return <StrictMode><section style={{ padding: 'var(--clu-space-6)', color: 'var(--clu-text)', fontFamily: 'var(--clu-font-sans)' }}>
    {(!removeTrigger || !open) && <Button onClick={() => { setOpen(true); }}>Open editor</Button>}
    <Button ref={fallback} variant="secondary">Workspace fallback</Button>
    <p>Successful saves: {saves}</p>
    <Dialog open={open} onOpenChange={() => { setOpen(false); }} title="Review synthetic metadata with a long descriptive heading" description="Changes are saved only by the form submit action. Escape never saves." initialFocusRef={input} {...(removeTrigger ? { returnFocusRef: fallback } : {})} closeOnBackdrop={backdrop} closeOnEscape={!locked}>
      <form onSubmit={event => { event.preventDefault(); if (value === 'fail') { setError(true); return; } setSaves(count => count + 1); setError(false); setOpen(false); }}>
        <Field label="Note">{control => <Input {...control} ref={input} value={value} onChange={event => { setValue(event.target.value); }} />}</Field>
        {long && Array.from({ length: 18 }, (_, i) => <p key={i}>Section {i + 1}: Synthetic long-form instructions remain inside the scrollable dialog. Enter “fail” in Note to show a recoverable error without losing input.</p>)}
        {error && <Alert tone="error">Synthetic validation failed. Your note is preserved.</Alert>}
        <div className="clu-dialog-actions"><Button variant="secondary" onClick={() => { setOpen(false); }}>Cancel editing</Button><Button type="submit">Save note</Button></div>
      </form>
    </Dialog>
  </section></StrictMode>;
}
const meta = { title: 'Overlays/Dialog', component: Editor, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Editor>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Form: Story = {};
export const LongForm: Story = { args: { long: true } };
export const Dark: Story = { args: { long: true }, parameters: { cluTheme: 'dark' } };
export const BackdropDismissal: Story = { args: { backdrop: true } };
export const ExplicitDismissal: Story = { args: { locked: true } };
export const RemovedTrigger: Story = { args: { removeTrigger: true } };
export const FocusContract: Story = { play: async ({ canvasElement, userEvent }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button', { name: 'Open editor' });
  await userEvent.click(trigger);
  const dialog = await canvas.findByRole('dialog');
  await expect(within(dialog).getByRole('textbox', { name: 'Note' })).toHaveFocus();
  await expect(dialog).toHaveAccessibleDescription('Changes are saved only by the form submit action. Escape never saves.');
  await userEvent.tab();
  await userEvent.tab();
  await userEvent.tab();
  await expect(within(dialog).getByRole('button', { name: 'Close dialog' })).toHaveFocus();
  await userEvent.tab({ shift: true });
  await expect(within(dialog).getByRole('button', { name: 'Save note' })).toHaveFocus();
  await userEvent.click(within(dialog).getByRole('button', { name: 'Cancel editing' }));
  await expect(trigger).toHaveFocus();
  await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
} };
