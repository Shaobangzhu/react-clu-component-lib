# Form controls (P04)

Import Field, Input, Textarea, Select, Checkbox and SegmentedControl (and their prop types) from `@shaobangzhu/clu-ui`. Import `@shaobangzhu/clu-ui/styles.css` once and place controls inside an explicit CLU light/dark theme host. Consumers do not install Tailwind. Existing display exports are unchanged. See [verified consumer adoption](consumer-integration.md) for intentionally retained DGI controls.

## Field: explicit association

```tsx
<Field label="Reference" required description="Use a synthetic identifier" error={error}>
  {control => <Input {...control} name="reference" value={value} onChange={e => setValue(e.target.value)} />}
</Field>
```

Field's required render function receives `id`, `required`, `aria-describedby` and `aria-invalid`. Spread these onto exactly one labelable native control, without overriding them. No cloneElement, hidden context or implicit value injection is used. It also works with plain input/select/textarea. Field uses React useId unless an explicit control id is supplied. The supplied id belongs to the control, not the Field container; explicit IDs must be unique in the document. Description/error IDs derive from it and remain stable across rerenders. External description IDs can be supplied through Field's `aria-describedby`.

Required is visible text plus a native required attribute, not a color or asterisk alone. An error sets aria-invalid and joins its text to the description; it does not create a live region or replace native validity. Consumers own when to display/announce validation and move focus. Supply meaningful, nonempty labels and guidance. Field has no value, disabled, validation engine, automatic focus or submission API; those belong to its child/control or consumer. Checkbox and SegmentedControl already supply their own labels, so do not wrap them in Field.

## Native values, modes and refs

Input, Textarea and Select expose native React element props including React 19 DOM refs. Input preserves type, min/max/step/required/disabled/readOnly and inputMode. Textarea preserves rows/maxLength; Select accepts ordinary option/optgroup children, disabled options, multiple and native selection behavior. Empty native values are empty strings; choose an explicit empty option for a select. Null is not a supported native controlled value and is not converted into zero or empty text.

Use value/onChange (or checked/onChange for Checkbox) for controlled use; initialize text values to `''` and checkbox state to a boolean. Use defaultValue/defaultChecked for uncontrolled use. Do not switch modes during a mounted control's lifetime, and do not pass both controlled and default props. CLU creates no mirrored local value state and does not coerce events, trim strings, parse numbers or restore default values on user edits. Native form reset affects uncontrolled values; controlled values must be reset by their owner.

Datetime-local values remain valid local datetime strings exactly as provided to React. The browser still owns native serialization, input sanitization, display locale, stepping and constraint validation. A local datetime is not an instant. CLU performs no Date construction, timezone conversion, DST fold/gap interpretation or minute normalization; those remain consumer responsibilities.

## Checkbox and selection

Checkbox requires a label; optional description/error/required are wired through Field. It has true checkbox checked/defaultChecked semantics and forwards object or callback refs, including React 19 cleanup callbacks. An explicit indeterminate flag sets the DOM-only indeterminate property when attached or when that flag changes. Native activation clears indeterminate; the consumer should update its flag in onChange when managing mixed state. This property is applied on client attachment, not serialized by SSR. Native checked state and form submission remain separate from mixed presentation; no manually overridden aria-checked is accepted.

SegmentedControl is a fieldset/legend containing real labelled radio inputs. Its ref targets the fieldset. It supports options with string value/label and optional disabled, a name (generated uniquely if absent), required, disabled, description/error, value/defaultValue and onValueChange. Values must be unique. Controlled value `''` can represent no selected option unless an option explicitly has that value. No default selection is invented. Provide a stable name for consumer FormData; generated names avoid collisions between independent groups.

Native radios own arrow-key movement, wrapping, disabled-option skipping and single tab-stop behavior. Tab enters the checked option (or browser-selected entry point when none checked) and exits the group. onValueChange runs only from the newly checked radio's change event, not during rerender. No buttons with aria-pressed, roving custom tabindex, popup portal, internal store or implicit submit are used. A required group uses native radio required attributes; a disabled fieldset disables its descendants.

## Native-control tradeoffs

Native date/time and select controls retain keyboard, mobile input methods, browser validation and OS accessibility behavior with a small dependency surface. Their popup appearance, locale, unselected-radio tab entry and assistive-technology details vary by browser/OS. CLU does not promise pixel-identical calendar menus or replace them with a custom calendar/select. The private `--clu-internal-control-scheme` hint styles only CLU controls' native chrome according to the nearest theme host; it does not set global color-scheme or affect unrelated widgets.

Forms submit through native HTML. These components do not call submit(), add implicit buttons, intercept Enter, debounce requests or deduplicate business operations. Unit tests verify one submit per activation; consumers still own async duplicate-request prevention. Button defaults remain type=button; set type=submit explicitly.

The synthetic Delivery metadata story uses only generic sample strings and a local timestamp. DGI demand references were read-only: its Delivery/Session/Payment/Merchant dialogs, Dashboard filters and AskDgi. No domain types, validation, addresses, conversion code or source implementations were copied. Screen-reader review, full zoom and cross-browser/device testing remain necessary; the executed checks are recorded separately.
