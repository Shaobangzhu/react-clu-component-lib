import { useState } from 'react';
import { fn } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Pagination } from '../index';
const meta = { title: 'Data/Pagination', component: Pagination, decorators: [Story => <div style={{ maxWidth: '60rem', minWidth: 0, padding: 'var(--clu-space-6)', background: 'var(--clu-surface-canvas)', color: 'var(--clu-text)' }}><Story /></div>], args: { page: 1, totalItems: 105, pageSize: 10, onPageChange: fn() } } satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const First: Story = {};
export const Middle: Story = { args: { page: 6 } };
export const Last: Story = { args: { page: 11 } };
export const Empty: Story = { args: { totalItems: 0 } };
export const OneItem: Story = { args: { totalItems: 1 } };
export const TenItems: Story = { args: { totalItems: 10 } };
export const ElevenItems: Story = { args: { totalItems: 11, page: 2 } };
export const LargeTotal: Story = { args: { totalItems: 10000000, page: 500000 } };
export const Disabled: Story = { args: { page: 6, disabled: true } };
export const Dark: Story = { args: { page: 6 }, parameters: { cluTheme: 'dark' } };
export const LongLabel: Story = { args: { page: 6, label: 'Pagination for this long descriptive record collection, independent of all other navigation regions' } };
function ControlledSpecimen() {
  const [page, setPage] = useState(8); const [total, setTotal] = useState(105);
  return <div style={{ display: 'grid', gap: 'var(--clu-space-4)', maxWidth: '50rem' }}>
    <p>Consumer page state: {page}. A smaller total changes display only until the consumer handles a request.</p>
    <Button onClick={() => { setTotal(11); }}>Shrink total to 11</Button>
    <Button onClick={() => { setTotal(105); }}>Restore total to 105</Button>
    <Pagination page={page} totalItems={total} pageSize={10} onPageChange={setPage} />
  </div>;
}
export const Controlled: Story = { render: () => <ControlledSpecimen /> };
