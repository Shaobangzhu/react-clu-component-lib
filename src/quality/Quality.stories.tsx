import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Alert, Button, Dialog, Field, Input, Pagination, SegmentedControl, Table } from '../index';
function Fixture() {
  const [count, setCount] = useState(0); const [choice, setChoice] = useState('summary'); const [page, setPage] = useState(1); const [open, setOpen] = useState(false);
  const initial = useRef<HTMLInputElement>(null);
  return <main data-testid="quality-fixture" style={{ padding:'var(--clu-space-6)', background:'var(--clu-surface-canvas)', color:'var(--clu-text)', fontFamily:'var(--clu-font-sans)', display:'grid',gap:'var(--clu-space-4)',minHeight:'100vh',boxSizing:'border-box' }}>
    <h1 style={{margin:0}}>CLU synthetic quality fixture</h1>
    <div style={{display:'flex',gap:'var(--clu-space-3)',flexWrap:'wrap'}}><Button onClick={() => { setCount(value => value + 1); }}>Activate {count}</Button><Button disabled>Disabled action</Button></div>
    <SegmentedControl label="Presentation" value={choice} onValueChange={setChoice} options={[{value:'summary',label:'Summary'},{value:'detail',label:'Detail'},{value:'unavailable',label:'Disabled option',disabled:true}]} />
    <p style={{margin:0}}>Selected: {choice}</p>
    <Field label="Synthetic reference" error="Enter a reference before continuing.">{control => <Input {...control} defaultValue="" />}</Field>
    <Alert tone="warning">Synthetic review message. No real operations or personal information.</Alert>
    <Table.ScrollArea label="Empty synthetic table"><Table density="compact"><Table.Caption>Synthetic empty records</Table.Caption><Table.Header><Table.Row><Table.HeadCell>Reference</Table.HeadCell><Table.HeadCell numeric>Passed value</Table.HeadCell></Table.Row></Table.Header><Table.Body><Table.MessageRow colSpan={2}>No observations available.</Table.MessageRow></Table.Body></Table></Table.ScrollArea>
    <Pagination page={page} totalItems={11} pageSize={10} onPageChange={setPage} label="Synthetic pages" />
    <Button onClick={() => { setOpen(true); }}>Open quality dialog</Button>
    <Dialog open={open} title="Synthetic review dialog" description="Only explicit form actions save data." onOpenChange={() => { setOpen(false); }} initialFocusRef={initial}>
      <div style={{display:'grid',gap:'var(--clu-space-4)'}}><Field label="Review note">{control => <Input {...control} ref={initial} defaultValue="Synthetic draft" />}</Field>
      <Button onClick={() => { setOpen(false); }}>Cancel review</Button></div>
    </Dialog>
  </main>;
}
const meta = { title:'Quality/Deterministic',component:Fixture,parameters:{layout:'fullscreen'} } satisfies Meta<typeof Fixture>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Light: Story = { parameters:{cluTheme:'light'} };
export const Dark: Story = { parameters:{cluTheme:'dark'} };
export const Interactions: Story = { play: async ({canvasElement,userEvent}) => {
  const canvas=within(canvasElement);
  await userEvent.click(canvas.getByRole('button',{name:'Activate 0'}));
  await expect(canvas.getByRole('button',{name:'Activate 1'})).toBeVisible();
  await userEvent.click(canvas.getByRole('radio',{name:'Detail'}));
  await expect(canvas.getByText('Selected: detail')).toBeVisible();
  await userEvent.click(canvas.getByRole('button',{name:'Next page'}));
  await expect(canvas.getByText('Showing 11–11 of 11 items')).toBeVisible();
  await userEvent.click(canvas.getByRole('button',{name:'Open quality dialog'}));
  const dialog=within(canvas.getByRole('dialog'));
  await expect(dialog.getByRole('textbox',{name:'Review note'})).toHaveFocus();
} };
