import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '../components/Button.js';
import { Dialog } from './Dialog.js';
import type { DialogProps } from './Dialog.js';

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: ReactNode;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  variant?: 'neutral' | 'destructive';
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  failureMessage?: string;
  children?: ReactNode;
  returnFocusRef?: DialogProps['returnFocusRef'];
}
export function ConfirmDialog({ open, title, description, onConfirm, onCancel, variant = 'neutral', confirmLabel = 'Confirm', cancelLabel = 'Cancel', loading = false, disabled = false, failureMessage = 'Unable to complete the action. Try again.', children, returnFocusRef }: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const inFlight = useRef(false);
  const mounted = useRef(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const busy = loading || pending;
  const confirm = async () => {
    if (inFlight.current || busy || disabled || !open) return;
    inFlight.current = true; setPending(true); setFailed(false);
    try { await onConfirm(); }
    catch { if (mounted.current) setFailed(true); }
    finally { inFlight.current = false; if (mounted.current) setPending(false); }
  };
  if (!confirmLabel.trim() || !cancelLabel.trim() || !failureMessage.trim()) throw new Error('ConfirmDialog requires nonempty action and failure labels');
  return <Dialog open={open} title={title} description={description} initialFocusRef={cancelRef} {...(returnFocusRef ? { returnFocusRef } : {})} busy={busy} onOpenChange={() => { onCancel(); }}>
    {children}
    {failed && <p className="clu-confirm-error" role="alert">{failureMessage}</p>}
    <div className="clu-dialog-actions">
      <Button ref={cancelRef} variant="secondary" disabled={busy} onClick={onCancel}>{cancelLabel}</Button>
      <Button variant={variant === 'destructive' ? 'danger' : 'primary'} disabled={disabled} loading={busy} onClick={() => { void confirm(); }}>{confirmLabel}</Button>
    </div>
  </Dialog>;
}
