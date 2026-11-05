# Semantic tables and controlled pagination (P05)

Import `Table`, `Pagination` and their prop types from `react-clu-component-lib`. Import `react-clu-component-lib/styles.css` once; place components inside an explicit light/dark CLU theme host. Styles are already compiled. A consuming application needs neither Tailwind nor CLU source scanning.

## Table composition

```tsx
<Table.ScrollArea label="Example records table scroll area">
  <Table density="compact">
    <Table.Caption>Example records</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.HeadCell>Reference</Table.HeadCell>
        <Table.HeadCell numeric>Passed value</Table.HeadCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.HeadCell scope="row">Sample A</Table.HeadCell>
        <Table.Cell numeric>12.00 units</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</Table.ScrollArea>
```

| Member | Native element and contract |
| --- | --- |
| Table | table; native props/ref, density=comfortable (default) or compact; hoverRows=true by default |
| Table.Caption | caption; caller provides a meaningful table name, placed before the header/body |
| Table.Header / Body / Footer | thead / tbody / tfoot; native attributes, events and refs |
| Table.Row | tr; native props/ref; no click, editing or selection behavior is added |
| Table.HeadCell | th; scope defaults to col; use scope=row for row headings and native id/headers/scope for more complex associations |
| Table.Cell | td; native props/ref and unchanged React children |
| Table.HeadCell / Cell numeric | logical end alignment and tabular lining figures only; never parse, round or format a value |
| Table.ScrollArea | explicit div overflow region with required nonblank label, native ref and tabIndex=0; separate from the table to preserve its native root |
| Table.MessageRow | tr with a td spanning required colSpan (integer 1–1000); caller supplies empty/loading/error content; no inferred state or live announcement |

Keep valid native nesting: Caption, Header, Body and optional Footer under Table; Rows under sections; head/cells under Rows. A caption is preferred; a caller-provided aria-label/labelledby can name a table when appropriate. The library cannot infer header relationships from arbitrary children. See [W3C caption guidance](https://www.w3.org/WAI/tutorials/tables/caption-summary/) and [row/column header guidance](https://www.w3.org/WAI/tutorials/tables/two-headers/).

The overflow wrapper is optional. For wide columns, use it with a caller-chosen table minWidth, for example `style={{ minWidth: '58rem' }}`. There is no forced column-width schema, hidden-column behavior or layout-to-cards conversion. Body text may wrap long strings; header text wraps at natural opportunities. Numeric does not force nowrap. The named scroll area is always a tab stop by default so keyboard users can scroll it. A consumer may opt out with tabIndex=-1 when it has established scrolling is unnecessary; keep it keyboard reachable when horizontal scrolling is required.

Empty/loading messages align at the start so short messages remain visible at the left edge of an overflowing table. Pass the actual visible column count to colSpan. Use native aria-busy on Table when loading, and manage any user-facing announcement in the consuming application. Table does not choose placeholder wording, render fake data rows or probe for missing observations.

All native React 19 refs and cell attributes pass through. Sorting, filtering, row slicing, row keys, actions, links, edit forms, status interpretation, dates, money formatting and API calls stay in the application. Private `clu-table-*` classes and compound implementation details are not additional deep-import APIs. Props, composition and the documented semantic tokens are the supported interfaces.

## Pagination contract

```tsx
<Pagination
  page={page}
  totalItems={totalItems}
  pageSize={10}
  onPageChange={setPage}
  disabled={loading}
  label="Example record pages"
/>
```

All four numeric/callback props are required. Page numbers are one-based. pageSize is explicitly owned by the consumer; 10 in examples is not a library default or a backend policy. label defaults to Pagination and must not be blank; give distinct labels to multiple navigation regions. disabled defaults to false. The component intentionally has a small explicit API rather than a generic navigation or data-fetching abstraction.

Use finite safe integer inputs with totalItems>=0, pageSize>=1 and page>=1 in ordinary consumer code. To keep rendering safe when values are temporarily invalid, calculations follow this documented fallback contract:

| Input | Display-only normalization |
| --- | --- |
| totalItems | finite numbers floored and bounded to 0…Number.MAX_SAFE_INTEGER; nonfinite becomes 0 |
| pageSize | finite numbers floored and bounded to 1…Number.MAX_SAFE_INTEGER; nonfinite or nonpositive becomes 1 |
| page | finite numbers floored, then bounded to 1…max(1, totalPages); nonfinite becomes 1 |

No string coercion is performed. Negative/invalid totals produce the empty fallback; this does not establish an authoritative count or hide application errors. Represent unavailable/loading data explicitly in the consumer. Fractional/oversized inputs are tolerated for display, not recommended as an application contract.

Range text uses the normalized display page and count. Empty results show **Showing 0 of 0 items**, both boundary controls disabled, and no fake page-1 button or aria-current. Nonempty results show the actual bounded start/end range, including a short final page. Small page counts show every page; larger counts retain first/last plus a small neighborhood and noninteractive ellipses. A single omitted page is rendered as a page button instead of an ellipsis. At most seven page/ellipsis items (plus Previous/Next) render regardless of total size. Ellipses expose More pages text to assistive technology and are never buttons.

The active button has aria-current=page. Previous/Next disable at boundaries; disabled disables all buttons. Buttons use native type=button, keyboard/tab order and token focus treatment, so placing Pagination inside a form does not submit it. Display text is static rather than a constant live region. English item/button copy is intentional in this v1 API; a generic localization/render-prop framework is outside this phase.

onPageChange runs only for an enabled native button activation requesting a valid page different from the currently displayed page. It does not run on initial render, StrictMode mount, changing totals/pageSize, re-render, active-page clicks or clamping. The component has no internal page state, reconciliation effect, timers, request throttling or async deduplication. Repeated user activations are repeated requests; consumers own async request policy. It remains at the supplied page until the owner passes new props.

**Shrinking totals:** page=8, totalItems=11, pageSize=10 displays page 2 and range 11–11. The owner's page remains 8 and no callback fires. Clicking Previous requests page 1. A consumer must reconcile its own page, visible rows and server response deliberately; this component never modifies that state or slices its records. It does not reset on edits, filters or new data.

## Consumer boundaries and evidence

DGI's Pagination/pageRange, History, Merchants, UberSessions, Prop22Payments and Dashboard ranking code were inspected as read-only demand signals. History's edit-page preservation, ten-row Top Merchants/Payments/Sessions policy, intentional filter resets and backend pagination remain DGI-owned. CLU does not import any DGI types, source or domain values. The Delivery History and Merchant Summary stories use synthetic strings only; their ten-row slice is an example consumer implementation, separate from the library.

Tests cover table roles, captions, header scope/ref/attributes, message spans, overflow focus and numeric styling; pagination boundaries 0/1/10/11/larger, invalid numbers, safe-integer bounds, disabled and controlled callbacks, bounded rendering, and actual composed stories. [P05 verification](p05-verification.md) records executed checks, browser geometry and package-consumer proof.

Native semantics and automated checks do not certify accessibility. Manual screen-reader, full zoom, RTL, custom palette and actual DGI/ArcGIS integration review remain necessary. Horizontal scrolling is intentional for long datasets; caption/column names, values and controls must still be meaningful in the consuming application. Nothing in P05 publishes the package or completes the v1 release gates.
