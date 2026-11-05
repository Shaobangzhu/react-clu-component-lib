import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination, Table } from '../index';

interface SpecimenProps { kind?: 'delivery' | 'merchant'; empty?: boolean; loading?: boolean; density?: 'compact' | 'comfortable'; hoverRows?: boolean }
function SyntheticTable({ kind = 'delivery', empty = false, loading = false, density = 'compact', hoverRows = true }: SpecimenProps) {
  const [page, setPage] = useState(1);
  // These rows and this slice belong to the example consumer, never to CLU Table/Pagination.
  const rows = empty ? [] : Array.from({ length: 37 }, (_, index) => ({
    reference: `Sample ${String(index + 1).padStart(2, '0')}`,
    subject: kind === 'delivery' ? 'Synthetic merchant Alpha' : `Synthetic merchant ${String(index + 1)}`,
    detail: 'Long descriptive metadata supplied by the example consumer; no private addresses or domain types.',
    quantity: '12.00',
    status: 'Example observation',
  }));
  const title = kind === 'delivery' ? 'Delivery History' : 'Merchant Summary';
  return <section style={{ display: 'grid', gap: 'var(--clu-space-4)', minWidth: 0, padding: 'var(--clu-space-6)', background: 'var(--clu-surface-canvas)', color: 'var(--clu-text)', fontFamily: 'var(--clu-font-sans)' }}>
    <h1 style={{ margin: 0 }}>{title}</h1>
    <p style={{ margin: 0 }}>Synthetic records · scroll for all columns · the example consumer chooses 10 rows per page</p>
    <Table.ScrollArea label={`${title} table scroll area`}>
      <Table density={density} hoverRows={hoverRows} style={{ minWidth: '58rem' }} aria-busy={loading}>
        <Table.Caption>{title} — synthetic data</Table.Caption>
        <Table.Header><Table.Row><Table.HeadCell>Reference</Table.HeadCell><Table.HeadCell>Merchant</Table.HeadCell><Table.HeadCell>Description</Table.HeadCell><Table.HeadCell numeric>Quantity (units)</Table.HeadCell><Table.HeadCell>Observation</Table.HeadCell></Table.Row></Table.Header>
        <Table.Body>{loading ? <Table.MessageRow colSpan={5}>Loading records…</Table.MessageRow> : rows.length === 0 ? <Table.MessageRow colSpan={5}>No records to display.</Table.MessageRow> : rows.slice((page - 1) * 10, page * 10).map(row => <Table.Row key={row.reference}><Table.HeadCell scope="row">{row.reference}</Table.HeadCell><Table.Cell>{row.subject}</Table.Cell><Table.Cell>{row.detail}</Table.Cell><Table.Cell numeric>{row.quantity}</Table.Cell><Table.Cell>{row.status}</Table.Cell></Table.Row>)}</Table.Body>
      </Table>
    </Table.ScrollArea>
    <Pagination page={page} totalItems={rows.length} pageSize={10} onPageChange={setPage} disabled={loading} label={`${title} pages`} />
  </section>;
}
const meta = { title: 'Data/Table', component: SyntheticTable, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof SyntheticTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const DeliveryHistory: Story = {};
export const MerchantSummary: Story = { args: { kind: 'merchant' } };
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
export const Empty: Story = { args: { empty: true } };
export const Loading: Story = { args: { loading: true } };
export const Comfortable: Story = { args: { density: 'comfortable' } };
export const NoHover: Story = { args: { hoverRows: false } };
export const LongColumns: Story = { args: { kind: 'merchant', density: 'comfortable' } };
