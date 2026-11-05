import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Button, Table } from '../src/index';

it('preserves native caption, column headers, row headers and numeric cell attributes', () => {
  render(<Table density="compact"><Table.Caption>Synthetic records</Table.Caption><Table.Header><Table.Row><Table.HeadCell>Reference</Table.HeadCell><Table.HeadCell numeric id="value-heading">Value</Table.HeadCell></Table.Row></Table.Header><Table.Body><Table.Row><Table.HeadCell scope="row">Sample A</Table.HeadCell><Table.Cell numeric headers="value-heading">0.00 units</Table.Cell></Table.Row></Table.Body><Table.Footer><Table.Row><Table.Cell colSpan={2}>Consumer-provided footer</Table.Cell></Table.Row></Table.Footer></Table>);
  const table = screen.getByRole('table', { name: 'Synthetic records' });
  expect(table).toHaveAttribute('data-density', 'compact');
  expect(within(table).getByRole('columnheader', { name: 'Reference' })).toHaveAttribute('scope', 'col');
  expect(within(table).getByRole('columnheader', { name: 'Value' })).toHaveAttribute('data-numeric', 'true');
  expect(within(table).getByRole('rowheader', { name: 'Sample A' })).toHaveAttribute('scope', 'row');
  const cell = within(table).getByRole('cell', { name: '0.00 units' });
  expect(cell).toHaveAttribute('data-numeric', 'true'); expect(cell).toHaveAttribute('headers', 'value-heading');
  expect(within(table).getAllByRole('rowgroup')).toHaveLength(3);
});
it('forwards React 19 native refs and supports header ids for complex associations', () => {
  const table = createRef<HTMLTableElement>(); const header = createRef<HTMLTableSectionElement>(); const row = createRef<HTMLTableRowElement>(); const th = createRef<HTMLTableCellElement>(); const td = createRef<HTMLTableCellElement>(); const caption = createRef<HTMLTableCaptionElement>();
  render(<Table ref={table}><Table.Caption ref={caption}>Ref specimen</Table.Caption><Table.Header ref={header}><Table.Row ref={row}><Table.HeadCell id="column-value" ref={th}>Value</Table.HeadCell></Table.Row></Table.Header><Table.Body><Table.Row><Table.Cell headers="column-value" ref={td}>Passed unchanged</Table.Cell></Table.Row></Table.Body></Table>);
  expect(table.current).toBe(screen.getByRole('table')); expect(caption.current?.tagName).toBe('CAPTION'); expect(header.current?.tagName).toBe('THEAD'); expect(row.current?.tagName).toBe('TR'); expect(th.current?.tagName).toBe('TH'); expect(td.current?.tagName).toBe('TD');
});
it('renders empty/loading rows with caller-owned column spans and no automatic announcements', () => {
  const { rerender } = render(<Table><Table.Caption>Empty list</Table.Caption><Table.Body><Table.MessageRow colSpan={4}>No records match</Table.MessageRow></Table.Body></Table>);
  expect(screen.getByRole('cell', { name: 'No records match' })).toHaveAttribute('colspan', '4');
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  rerender(<Table aria-busy="true"><Table.Caption>Loading list</Table.Caption><Table.Body><Table.MessageRow colSpan={4}>Loading records…</Table.MessageRow></Table.Body></Table>);
  expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true'); expect(screen.getByRole('cell', { name: 'Loading records…' })).toBeVisible(); expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
it('provides an explicitly named keyboard-focusable overflow region before row controls', async () => {
  const user = userEvent.setup(); const ref = createRef<HTMLDivElement>();
  render(<Table.ScrollArea label="Record table scroll area" ref={ref}><Table><Table.Caption>Long columns</Table.Caption><Table.Body><Table.Row><Table.Cell>A long unformatted label supplied by the consumer</Table.Cell><Table.Cell><Button>Inspect</Button></Table.Cell></Table.Row></Table.Body></Table></Table.ScrollArea>);
  const region = screen.getByRole('region', { name: 'Record table scroll area' });
  expect(ref.current).toBe(region); expect(region).toHaveClass('clu-focus-ring');
  await user.tab(); expect(region).toHaveFocus(); await user.tab(); expect(screen.getByRole('button', { name: 'Inspect' })).toHaveFocus();
});
it('keeps density, hover and rendered rows externally controlled', () => {
  const { rerender } = render(<Table aria-label="Rows"><Table.Body><Table.Row><Table.Cell>Original text</Table.Cell></Table.Row></Table.Body></Table>);
  expect(screen.getByRole('table')).toHaveAttribute('data-density', 'comfortable');
  rerender(<Table aria-label="Rows" density="compact" hoverRows={false}><Table.Body><Table.Row><Table.Cell>Edited text</Table.Cell></Table.Row></Table.Body></Table>);
  expect(screen.getByRole('table')).toHaveAttribute('data-hover-rows', 'false'); expect(screen.getByRole('cell')).toHaveTextContent('Edited text'); expect(screen.getAllByRole('row')).toHaveLength(1);
});
it('rejects invalid message spans and empty scroll-region names', () => {
  expect(() => render(<Table><Table.Body><Table.MessageRow colSpan={0}>Invalid span</Table.MessageRow></Table.Body></Table>)).toThrow('colSpan');
  expect(() => render(<Table.ScrollArea label=" "><Table /></Table.ScrollArea>)).toThrow('nonempty');
});
