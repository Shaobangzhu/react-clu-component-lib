import { StrictMode, createRef, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import { Button, Dialog, Input } from '../src/index';
import { stubDialog } from './dialog-native-stub';

beforeEach(stubDialog);
function Editor({ backdrop = false, escape = true }: { backdrop?: boolean; escape?: boolean }) {
  const [open, setOpen] = useState(false);
  const target = useRef<HTMLInputElement>(null);
  return <div data-clu-theme="light"><Button onClick={() => { setOpen(true); }}>Launch</Button><Dialog open={open} title="Edit note" description="Keep this input" initialFocusRef={target} closeOnBackdrop={backdrop} closeOnEscape={escape} onOpenChange={() => { setOpen(false); }}><Input aria-label="Note" ref={target} defaultValue="Draft" /><Button onClick={() => { setOpen(false); }}>Cancel</Button></Dialog></div>;
}
it('opens from a trigger, associates stable ids, focuses explicit input, preserves draft and restores focus', async () => {
  const user = userEvent.setup(); render(<Editor />);
  const trigger = screen.getByRole('button', { name: 'Launch' });
  await user.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'Edit note' });
  expect(dialog).toHaveAccessibleDescription('Keep this input');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  const titleId = dialog.getAttribute('aria-labelledby');
  const note = screen.getByRole('textbox', { name: 'Note' });
  expect(note).toHaveFocus(); await user.type(note, ' changed');
  await user.click(screen.getByRole('button', { name: 'Cancel' })); expect(trigger).toHaveFocus();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  await user.click(trigger); expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', titleId);
  expect(note).toHaveValue('Draft changed');
});
it('uses the heading fallback, forwards a native ref, and emits Escape only as a controlled request', () => {
  const change = vi.fn(); const ref = createRef<HTMLDialogElement>();
  const { rerender } = render(<Dialog ref={ref} open title="Review" onOpenChange={change}>Content</Dialog>);
  const dialog = screen.getByRole('dialog'); expect(ref.current).toBe(dialog);
  expect(screen.getByRole('heading', { name: 'Review' })).toHaveFocus();
  expect(dialog).not.toHaveAttribute('aria-describedby');
  const cancel = new Event('cancel', { cancelable: true }); fireEvent(dialog, cancel);
  expect(cancel.defaultPrevented).toBe(true); expect(change).toHaveBeenCalledExactlyOnceWith(false, 'escape'); expect(dialog).toHaveAttribute('open');
  rerender(<Dialog ref={ref} open title="Review" closeOnEscape={false} onOpenChange={change} />);
  fireEvent(dialog, new Event('cancel', { cancelable: true })); expect(change).toHaveBeenCalledTimes(1);
});
it('requires a complete backdrop gesture, ignores inside and drag-out gestures, and respects busy', () => {
  const change = vi.fn();
  const { rerender } = render(<Dialog open title="Backdrop" closeOnBackdrop onOpenChange={change}><span>Inside</span></Dialog>);
  const dialog = screen.getByRole('dialog');
  // Native pointer coordinates/target are supplied explicitly; no geometry is implied in jsdom.
  const pointer = (target: Element, type: string, x: number) => {
    const event = new Event(type, { bubbles: true }); Object.assign(event, { button: 0, pointerId: 1, clientX: x, clientY: x }); fireEvent(target, event);
  };
  pointer(screen.getByText('Inside'), 'pointerdown', 0); pointer(dialog, 'pointerup', -10); expect(change).not.toHaveBeenCalled();
  pointer(dialog, 'pointerdown', -10); pointer(dialog, 'pointerup', -10); expect(change).toHaveBeenCalledExactlyOnceWith(false, 'backdrop');
  rerender(<Dialog open title="Backdrop" closeOnBackdrop busy onOpenChange={change} />);
  pointer(dialog, 'pointerdown', -10); pointer(dialog, 'pointerup', -10);
  fireEvent(dialog, new Event('cancel', { cancelable: true }));
  expect(screen.getByRole('button', { name: 'Close dialog' })).toBeDisabled(); expect(change).toHaveBeenCalledTimes(1);
});
it('ignores backdrop by default and does not interpret ordinary child form submits as close requests', async () => {
  const change = vi.fn(); const submit = vi.fn((event: SyntheticEvent<HTMLFormElement>) => { event.preventDefault(); }); const user = userEvent.setup();
  render(<Dialog open title="Form" onOpenChange={change}><form onSubmit={submit}><Input aria-label="Exact string" defaultValue="2026-11-05T10:01" /><Button type="submit">Save</Button></form></Dialog>);
  await user.click(screen.getByRole('button', { name: 'Save' })); expect(submit).toHaveBeenCalledTimes(1); expect(change).not.toHaveBeenCalled();
  expect(screen.getByRole('textbox')).toHaveValue('2026-11-05T10:01');
});
it('supports repeated StrictMode cycles without stale close events, duplicate requests or leaked open dialogs', async () => {
  const change = vi.fn();
  const view = (open: boolean) => <StrictMode><div data-clu-theme="light"><Dialog open={open} title="Strict" onOpenChange={change} /></div></StrictMode>;
  const { rerender, unmount } = render(view(true));
  for (let i = 0; i < 4; i++) { rerender(view(false)); rerender(view(true)); }
  await act(async () => { await Promise.resolve(); });
  expect(screen.getByRole('dialog')).toHaveAttribute('open'); expect(change).not.toHaveBeenCalled();
  const dialog = screen.getByRole<HTMLDialogElement>('dialog'); unmount(); expect(dialog.open).toBe(false);
});
it('restores a named workspace fallback on controlled close when the opener has been removed', async () => {
  const user = userEvent.setup(); const fallback = createRef<HTMLButtonElement>(); const trigger = document.createElement('button'); document.body.append(trigger); trigger.focus();
  const { rerender } = render(<><Button ref={fallback}>Workspace</Button><Dialog open title="Fallback" returnFocusRef={fallback} onOpenChange={vi.fn()} /></>);
  trigger.remove(); rerender(<><Button ref={fallback}>Workspace</Button><Dialog open={false} title="Fallback" returnFocusRef={fallback} onOpenChange={vi.fn()} /></>);
  expect(screen.getByRole('button', { name: 'Workspace' })).toHaveFocus(); await user.tab();
});
it('wraps visible Tab boundaries and keeps focus on the heading when busy leaves no controls', () => {
  vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue({ length: 1 } as DOMRectList);
  const { rerender } = render(<Dialog open title="Tab boundary" onOpenChange={vi.fn()}><Button>Last action</Button></Dialog>);
  const first = screen.getByRole('button', { name: 'Close dialog' }); const last = screen.getByRole('button', { name: 'Last action' });
  last.focus(); fireEvent.keyDown(last, { key: 'Tab' }); expect(first).toHaveFocus();
  fireEvent.keyDown(first, { key: 'Tab', shiftKey: true }); expect(last).toHaveFocus();
  rerender(<Dialog open busy title="Tab boundary" onOpenChange={vi.fn()} />);
  const heading = screen.getByRole('heading'); heading.focus(); fireEvent.keyDown(heading, { key: 'Tab' }); expect(heading).toHaveFocus();
});
it('treats an external native close as a request and restores the controlled modal until the owner closes', () => {
  const change = vi.fn(); render(<Dialog open title="Native request" onOpenChange={change} />);
  const dialog = screen.getByRole<HTMLDialogElement>('dialog');
  dialog.open = false; fireEvent(dialog, new Event('close'));
  expect(change).toHaveBeenCalledExactlyOnceWith(false, 'native'); expect(dialog.open).toBe(true);
});
