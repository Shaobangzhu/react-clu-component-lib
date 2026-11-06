import { useId, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import type { ComponentProps, ReactNode, RefObject } from 'react';
import { Button } from '../components/Button.js';

export type DialogCloseReason = 'escape' | 'backdrop' | 'close-button' | 'native';
export type DialogProps = Omit<ComponentProps<'dialog'>, 'open' | 'title' | 'onClose' | 'onCancel' | 'children' | 'aria-labelledby' | 'aria-describedby'> & {
  open: boolean;
  onOpenChange: (open: false, reason: DialogCloseReason) => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  busy?: boolean;
  closeLabel?: string;
};

function focus(element: HTMLElement | null | undefined) {
  if (!element?.isConnected || element.matches(':disabled') || element.closest('[inert]')) return false;
  element.focus({ preventScroll: true });
  return element.ownerDocument.activeElement === element;
}
function restoreFocus(preferred: HTMLElement | null | undefined, previous: HTMLElement | null, host: HTMLElement | null, document: Document) {
  if (focus(preferred) || focus(previous)) return;
  const fallback = host?.isConnected ? host : document.body;
  const original = fallback.getAttribute('tabindex');
  fallback.tabIndex = -1;
  fallback.focus({ preventScroll: true });
  if (original === null) fallback.removeAttribute('tabindex');
  else fallback.setAttribute('tabindex', original);
}

function tabStops(dialog: HTMLDialogElement) {
  return [...dialog.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href], summary, iframe, [tabindex], [contenteditable="true"]')]
    .filter(element => element.tabIndex >= 0 && !element.matches(':disabled') && !element.closest('[hidden], [inert]') && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden')
    .sort((a, b) => (a.tabIndex > 0 ? a.tabIndex : Infinity) - (b.tabIndex > 0 ? b.tabIndex : Infinity))
    .filter((element, _index, stops) => {
      if (!(element instanceof HTMLInputElement) || element.type !== 'radio' || !element.name) return true;
      const group = stops.filter(other => other instanceof HTMLInputElement && other.type === 'radio' && other.name === element.name && other.form === element.form);
      return element === (group.find(radio => radio instanceof HTMLInputElement && radio.checked) ?? group[0]);
    });
}

export function Dialog({ open, onOpenChange, title, description, children, initialFocusRef, returnFocusRef, closeOnEscape = true, closeOnBackdrop = false, busy = false, closeLabel = 'Close dialog', className = '', ref, ...props }: DialogProps) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const backdropPointer = useRef<number | null>(null);
  useImperativeHandle(ref, () => {
    if (!dialogRef.current) throw new Error('Dialog ref is unavailable');
    return dialogRef.current;
  }, []);
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const document = dialog.ownerDocument;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const host = dialog.closest<HTMLElement>('[data-clu-theme]');
    const returnTarget = returnFocusRef?.current;
    if (!dialog.open) dialog.showModal();
    const initial = initialFocusRef?.current;
    if (!initial || !dialog.contains(initial) || !focus(initial)) focus(headingRef.current);
    dialog.scrollTop = 0;
    return () => {
      // Native close events are queued; the handler ignores them after a reopen.
      if (dialog.open) dialog.close();
      backdropPointer.current = null;
      restoreFocus(returnTarget, previous, host, document);
    };
  }, [open, initialFocusRef, returnFocusRef]);

  useLayoutEffect(() => {
    if (open && busy) focus(headingRef.current);
  }, [open, busy]);

  if (!title.trim() || !closeLabel.trim()) throw new Error('Dialog requires nonempty title and closeLabel');
  const requestClose = (reason: DialogCloseReason) => { if (!busy) onOpenChange(false, reason); };
  const outside = (event: React.PointerEvent<HTMLDialogElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return event.target === event.currentTarget && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
  };
  return <dialog {...props} ref={dialogRef} className={`clu-dialog ${className}`} aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={description == null ? undefined : `${id}-description`} aria-busy={busy || undefined}
    onKeyDown={event => {
      props.onKeyDown?.(event);
      if (event.defaultPrevented || event.key !== 'Tab') return;
      const dialog = event.currentTarget;
      const stops = tabStops(dialog);
      const first = stops[0]; const last = stops[stops.length - 1];
      const active = dialog.ownerDocument.activeElement;
      if (!first || !last) { event.preventDefault(); focus(headingRef.current); }
      else if (event.shiftKey && (active === first || !stops.includes(active as HTMLElement))) { event.preventDefault(); focus(last); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); focus(first); }
    }}
    onCancel={event => { event.preventDefault(); if (closeOnEscape) requestClose('escape'); }}
    onClose={event => {
      if (open && !event.currentTarget.open) {
        // Native method=dialog or imperative close is a request, not state ownership.
        event.currentTarget.showModal();
        requestClose('native');
      }
    }}
    onPointerDown={event => { props.onPointerDown?.(event); backdropPointer.current = !event.defaultPrevented && event.button === 0 && outside(event) ? event.pointerId : null; }}
    onPointerUp={event => {
      props.onPointerUp?.(event);
      const beganOutside = backdropPointer.current === event.pointerId;
      backdropPointer.current = null;
      if (!event.defaultPrevented && beganOutside && outside(event) && closeOnBackdrop) requestClose('backdrop');
    }}
    onPointerCancel={event => { backdropPointer.current = null; props.onPointerCancel?.(event); }}>
    <header className="clu-dialog-header">
      <h2 ref={headingRef} id={`${id}-title`} tabIndex={-1} className="clu-dialog-title clu-focus-ring">{title}</h2>
      <Button variant="quiet" aria-label={closeLabel} disabled={busy} onClick={() => { requestClose('close-button'); }}>×</Button>
    </header>
    {description != null && <div id={`${id}-description`} className="clu-dialog-description">{description}</div>}
    <div className="clu-dialog-content">{children}</div>
  </dialog>;
}
