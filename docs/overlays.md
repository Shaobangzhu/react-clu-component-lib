# Controlled overlays (P06)

Import `Dialog`, `ConfirmDialog` and their prop types only from `@shaobangzhu/clu-ui`; import `@shaobangzhu/clu-ui/styles.css` explicitly. Render inside an existing `[data-clu-theme="light|dark"]` host. No portal, ReactDOM runtime import, overlay dependency or Tailwind installation is required.

## Dialog

```tsx
const initial = useRef<HTMLInputElement>(null);
const fallback = useRef<HTMLButtonElement>(null);

<Button ref={fallback} onClick={() => setOpen(true)}>Edit note</Button>
<Dialog
  open={open}
  onOpenChange={() => setOpen(false)}
  title="Edit note"
  description="Save only when your changes are ready."
  initialFocusRef={initial}
  returnFocusRef={fallback}
>
  <form onSubmit={submit}>
    <Field label="Note">{control => <Input {...control} ref={initial} />}</Field>
    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
    <Button type="submit">Save</Button>
  </form>
</Dialog>
```

`open` is required and controlled. `onOpenChange(false, reason)` requests dismissal, with reason `escape`, `backdrop`, `close-button` or `native`. The owner changes open; ignoring a request leaves the modal open. The component never requests true or saves a child form. Use a stable ref object for each focus prop: changing either ref object while open intentionally starts a new focus lifecycle. Avoid inline ref objects.

| Prop | Contract |
| --- | --- |
| title | Required nonblank string; rendered h2 with stable useId association |
| description | Optional React content with its own generated aria-describedby ID; omit for very long structured forms where a short summary is unsuitable |
| children | Preserved while closed; native forms, values, validation and steps belong to the owner |
| initialFocusRef | Optional native focus target inside the dialog; connected, enabled and focusable; otherwise heading is focused |
| returnFocusRef | Optional explicit native return/fallback target; snapshot at opening |
| closeOnEscape | Defaults true; native cancel is prevented and converted into a controlled request |
| closeOnBackdrop | Defaults false; when enabled, requires a primary pointer gesture starting and ending outside the dialog bounds; content clicks and drag-out gestures do not dismiss |
| busy | Defaults false; disables built-in close and all dismissal requests, and focuses the heading so disabling active form controls does not leave focus on the document |
| closeLabel | Defaults Close dialog; required nonblank accessible name for the built-in close button |
| ref / native props | React 19 native HTMLDialogElement ref and native attributes/events; generated open, close/cancel, heading/description associations are owned by this API |

`showModal()` places the dialog in the native top layer and makes the rest of the containing document inert ([MDN showModal reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)). The component checks native open state before show/close. Cleanup closes an open element and restores focus, including StrictMode's setup/cleanup cycle. Queued close events from a previous cycle are ignored when closed by props or already reopened. A native method=dialog submission or imperative close is converted back into a `native` request while open remains true; it never confirms an action. Use props and ordinary submit handlers for predictable controlled forms instead of calling native show/close methods.

Focus returns first to the explicit return target, then the previously focused trigger, when still connected and focusable. If both are unavailable, the nearest connected CLU theme host receives temporary tabindex=-1 focus; the last fallback is document.body. The original tabindex is restored immediately. Prefer an explicit surviving workspace button through returnFocusRef when removing the trigger; the RemovedTrigger story demonstrates this. No global styles, overflow mutation or persistent tabindex changes are installed.

Native Chromium testing exposed a document-focus stop after the last dialog control. A local keydown guard therefore wraps Tab and Shift+Tab at visible enabled native boundaries, including radio-group tab stops, and uses the heading when no controls are available. It does not replace native modal isolation. Consumer onKeyDown runs first and may prevent default. Standard light-DOM controls are the v1 target; nested modal stacks, cross-frame focus delegation and custom shadow-root widget navigation are not established contracts.

The dialog has a viewport-constrained scrollable surface, overscroll containment and no closing animation. The entire surface scrolls so arbitrary child forms need no structural rewrite. Theme styles remain under the existing host and use semantic tokens. No document scroll-lock manager is added. Native inertness blocks background interaction; programmatic consumer scrolling and embedding contexts remain consumer responsibilities.

## ConfirmDialog

```tsx
<ConfirmDialog
  open={confirming}
  title="Remove example?"
  description="Review the consequence before continuing."
  variant="destructive"
  confirmLabel="Remove item"
  onCancel={() => setConfirming(false)}
  onConfirm={async () => {
    await performConsumerAction(); // reject on failure
    setConfirming(false);          // success closure belongs to the owner
  }}
/>
```

Required: open, title, description, onConfirm and onCancel. Optional:

- variant: neutral (default) or destructive; controls generic confirm button styling only.
- confirmLabel/cancelLabel: Confirm/Cancel defaults; nonblank labels required.
- disabled: disables only confirmation; cancellation remains available.
- loading: external pending state; blocks confirmation and dismissal.
- failureMessage: safe rejection text, default Unable to complete the action. Try again.; never displays raw exception payloads.
- children: optional additional review/error content; no automatic domain validation.
- returnFocusRef: same explicit fallback contract as Dialog.

Cancel is the initial focus target; during loading the heading is used instead. Escape, built-in close and Cancel all invoke onCancel only when idle; backdrop dismissal is disabled. Every action button is type=button.

onConfirm may return void or a Promise<void>. A synchronous ref lock prevents overlapping invocations before the next render; local pending state disables controls until settlement. Throws/rejections leave the dialog and children present, announce the safe failure message once through role=alert and permit an intentional retry. Success does not auto-close: the consumer controls open in its callback. Catching an error and returning normally is therefore the consumer's own decision. The library does not perform records mutations, cancel requests or undo external effects.

Pending work belongs to the mounted ConfirmDialog instance. If the owner forcibly closes/reopens it before settlement, the in-flight lock remains; errors persist until the next confirmation attempt or unmount. It does not silently clear application errors or form data. When switching to a different logical operation, use an appropriate consumer key/remount and manage outstanding application requests. After unmount, promise settlement never updates local state, calls cancel or reopens an overlay. External work can still finish; the consumer owns its lifecycle.

## Browser/testing limits and review

Modern browsers must implement native HTMLDialogElement.showModal/close, modal inertness and top-layer rendering. No nonmodal fallback/polyfill is shipped; unsupported browsers must be handled by the host before mounting an open dialog. Only the available in-app Chromium browser was executed here; Firefox, Safari, touch-specific pointer behavior, screen readers, full zoom/forced colors and embedded iframe integration remain unverified. A modal isolates its containing document, not an embedding parent document. Full accessibility certification is not inferred from markup or these tests.

jsdom lacks the native modal algorithm. Unit tests use an explicit local show/close stub for React event/lifecycle tests; they do not claim to test inertness, native Escape or geometry. The FocusContract Storybook play test checks opening, association, initial focus, both Tab edges and return focus in a real browser. Native keyboard Escape, compact scrolling, async states and fallback were also reviewed through actual browser interactions. See [P06 verification](p06-verification.md).

Reviewer checklist:

- [ ] Review Escape/backdrop choices against each consuming form's unsaved-change policy; Escape must never call submit/confirm.
- [ ] Confirm initial/return focus targets survive the intended save/cancel/removal flow.
- [ ] Ensure consumer pending/error handling returns or rejects its promise deliberately and closes only after intended success.
- [ ] Check long/stepped form content at 390px; keep domain validation, date conversion and request cancellation in the consumer.
- [ ] Review browser/screen-reader support for the actual deployment and embedding environment.
