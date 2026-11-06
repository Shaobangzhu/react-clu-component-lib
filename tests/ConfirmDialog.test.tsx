import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import { ConfirmDialog } from '../src/index';
import { stubDialog } from './dialog-native-stub';
beforeEach(stubDialog);
function deferred() { let resolve!: () => void; let reject!: (error: Error) => void; const promise = new Promise<void>((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }
it('focuses Cancel first, exposes description/destructive styling, and cancellation never confirms', async () => {
  const user = userEvent.setup(); const confirm = vi.fn(); const cancel = vi.fn();
  render(<ConfirmDialog open title="Remove example?" description="Synthetic consequence" variant="destructive" onConfirm={confirm} onCancel={cancel} />);
  expect(screen.getByRole('dialog')).toHaveAccessibleDescription('Synthetic consequence');
  expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
  expect(screen.getByRole('button', { name: 'Confirm' })).toHaveAttribute('data-variant', 'danger');
  await user.click(screen.getByRole('button', { name: 'Cancel' })); expect(cancel).toHaveBeenCalledOnce(); expect(confirm).not.toHaveBeenCalled();
});
it('locks duplicate async confirmation and dismissal until success; successful closure remains consumer-owned', async () => {
  const job = deferred(); const confirm = vi.fn(() => job.promise); const cancel = vi.fn(); const user = userEvent.setup();
  render(<ConfirmDialog open title="Apply?" description="Confirm once" onConfirm={confirm} onCancel={cancel} />);
  const button = screen.getByRole('button', { name: 'Confirm' });
  fireEvent.click(button); fireEvent.click(button); expect(confirm).toHaveBeenCalledOnce();
  for (const control of screen.getAllByRole('button')) expect(control).toBeDisabled();
  expect(screen.getByRole('heading')).toHaveFocus();
  fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true })); expect(cancel).not.toHaveBeenCalled();
  await act(async () => { job.resolve(); await job.promise; }); expect(button).toBeEnabled(); expect(screen.getByRole('dialog')).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Cancel' })); expect(cancel).toHaveBeenCalledOnce();
});
it('preserves content after rejected confirmation, reports a safe error and allows an intentional retry', async () => {
  const job = deferred(); const confirm = vi.fn().mockReturnValueOnce(job.promise).mockResolvedValue(undefined);
  render(<ConfirmDialog open title="Retry?" description="Keep content" onConfirm={confirm} onCancel={vi.fn()}><p>Review stays present</p></ConfirmDialog>);
  fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
  await act(async () => { job.reject(new Error('private server payload')); await job.promise.catch(() => undefined); });
  expect(screen.getByRole('alert')).toHaveTextContent('Unable to complete the action. Try again.'); expect(screen.queryByText(/private server/)).not.toBeInTheDocument();
  expect(screen.getByText('Review stays present')).toBeVisible();
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Confirm' })); await Promise.resolve(); });
  expect(confirm).toHaveBeenCalledTimes(2); expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
it('disables confirm without blocking cancellation; loading blocks every dismissal', async () => {
  const confirm = vi.fn(); const cancel = vi.fn(); const user = userEvent.setup();
  const { rerender } = render(<ConfirmDialog open title="Blocked?" description="Not eligible" disabled onConfirm={confirm} onCancel={cancel} />);
  await user.click(screen.getByRole('button', { name: 'Confirm' })); expect(confirm).not.toHaveBeenCalled(); expect(screen.getByRole('button', { name: 'Cancel' })).toBeEnabled();
  rerender(<ConfirmDialog open title="Blocked?" description="Pending" loading onConfirm={confirm} onCancel={cancel} />);
  for (const control of screen.getAllByRole('button')) expect(control).toBeDisabled();
});
it('settles pending work after unmount without invoking cancel or reopening a modal', async () => {
  const job = deferred(); const cancel = vi.fn(); const confirm = vi.fn(() => job.promise);
  const { unmount } = render(<ConfirmDialog open title="Unmount pending" description="Example" onConfirm={confirm} onCancel={cancel} />);
  fireEvent.click(screen.getByRole('button', { name: 'Confirm' })); const dialog = screen.getByRole<HTMLDialogElement>('dialog'); unmount();
  await act(async () => { job.resolve(); await job.promise; }); expect(dialog.open).toBe(false); expect(confirm).toHaveBeenCalledOnce(); expect(cancel).not.toHaveBeenCalled();
});
