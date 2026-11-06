import { StrictMode, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ConfirmDialog } from '../index';
function Confirmation({ destructive = false, disabled = false, loading = false, fail = false }: { destructive?: boolean; disabled?: boolean; loading?: boolean; fail?: boolean }) {
  const [open, setOpen] = useState(false);
  const [calls, setCalls] = useState(0);
  return <StrictMode><section style={{ padding: 'var(--clu-space-6)', color: 'var(--clu-text)', fontFamily: 'var(--clu-font-sans)' }}>
    <Button onClick={() => { setOpen(true); }}>Review action</Button>
    <p>Consumer confirmations: {calls}</p>
    <ConfirmDialog open={open} title={destructive ? 'Remove synthetic item?' : 'Apply this synthetic change?'} description="This example has no application records. Only the confirm callback performs the simulated action." variant={destructive ? 'destructive' : 'neutral'} disabled={disabled} loading={loading} confirmLabel={destructive ? 'Remove item' : 'Apply change'} onCancel={() => { setOpen(false); }} onConfirm={async () => {
      setCalls(count => count + 1);
      await new Promise<void>(resolve => { setTimeout(resolve, 700); });
      if (fail) throw new Error('Synthetic failure');
      setOpen(false);
    }} />
  </section></StrictMode>;
}
const meta = { title: 'Overlays/ConfirmDialog', component: Confirmation, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Confirmation>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Neutral: Story = {};
export const Destructive: Story = { args: { destructive: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const Failure: Story = { args: { fail: true } };
export const Dark: Story = { args: { destructive: true }, parameters: { cluTheme: 'dark' } };
