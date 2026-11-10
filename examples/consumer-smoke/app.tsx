import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Alert, Button, Dialog, Field, Input, Pagination, SegmentedControl, StatusIndicator, Table } from '@shaobangzhu/clu-ui';
import type { DialogProps, PaginationProps, TableProps } from '@shaobangzhu/clu-ui';
import './host.css';
import '@shaobangzhu/clu-ui/styles.css';

function HostControls({ id }: { id: string }) {
  return <div className="smoke-controls" id={id}>
    <button>Host button</button><input aria-label={`${id} host input`} defaultValue="Host value" />
    <button className="esri-widget">Simulated ArcGIS</button><button className="calcite-button">Simulated Calcite</button>
    <div className="card">Host card</div><table className="table"><tbody><tr><td>Host table</td></tr></tbody></table>
  </div>;
}
function App() {
  const [page, setPage] = useState(1); const [mode, setMode] = useState('summary');
  const [open, setOpen] = useState(false); const [clicks, setClicks] = useState(0);
  const [result, setResult] = useState('Not run');
  const [note, setNote] = useState('Packed value'); const [theme, setTheme] = useState<'light' | 'dark'>('light'); const [blockedCalls, setBlockedCalls] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null); const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null); const tableRef = useRef<HTMLTableElement>(null);
  const groupRef = useRef<HTMLFieldSetElement>(null); const modalInput = useRef<HTMLInputElement>(null);
  const props: DialogProps = { open, title: 'Packed consumer dialog', description: 'Native modal from an installed tarball.', onOpenChange: setOpen, initialFocusRef: modalInput, ref: dialogRef };
  const pagination: PaginationProps = { page, totalItems: 11, pageSize: 10, onPageChange: setPage };
  const table: TableProps = { density: 'compact', ref: tableRef };
  function checkStyles() {
    const failures: string[] = [];
    const check = (ok: boolean, message: string) => { if (!ok) failures.push(message); };
    for (const id of ['outside', 'inside']) {
      const host = document.getElementById(id)!;
      const ordinary = getComputedStyle(host.querySelector('button')!);
      check(ordinary.backgroundColor === 'rgb(240, 210, 170)' && ordinary.paddingTop === '7px' && ordinary.borderTopWidth === '3px' && ordinary.boxSizing === 'content-box', `${id} generic button changed`);
      const input = getComputedStyle(host.querySelector('input')!);
      check(input.backgroundColor === 'rgb(250, 240, 210)' && input.paddingTop === '7px' && input.boxSizing === 'content-box', `${id} generic input changed`);
      for (const name of ['.esri-widget', '.calcite-button']) {
        const style = getComputedStyle(host.querySelector(name)!);
        check(style.backgroundColor === 'rgb(30, 70, 120)' && style.paddingTop === '9px' && style.borderRadius === '1px', `${id} ${name} changed`);
      }
      check(getComputedStyle(host.querySelector('.card')!).backgroundColor === 'rgb(215, 225, 235)', `${id} generic card changed`);
      check(getComputedStyle(host.querySelector('.table')!).borderSpacing === '5px', `${id} generic table changed`);
    }
    check(getComputedStyle(buttonRef.current!).backgroundColor === (theme === 'light' ? 'rgb(18, 100, 95)' : 'rgb(142, 217, 201)'), 'CLU button CSS absent');
    check(getComputedStyle(document.querySelector('[data-numeric="true"].clu-table-cell')!).textAlign === 'end', 'numeric alignment absent');
    check([buttonRef, inputRef, dialogRef, tableRef, groupRef].every(ref => ref.current instanceof HTMLElement), 'native refs missing');
    setResult(failures.length ? `FAIL: ${failures.join('; ')}` : 'PASS: compiled CSS, 12 host selector checks, numeric alignment and 5 native refs');
  }
  return <main className="smoke-shell"><h1>CLU packed consumer</h1><p>Production dependencies: packed CLU + React + ReactDOM. No Tailwind or source aliases.</p>
    <HostControls id="outside" />
    <section data-clu-theme={theme} className="smoke-panel smoke-layout" style={{background:'var(--clu-surface-canvas)',color:'var(--clu-text)'}}>
      <Button variant="secondary" onClick={() => setTheme(value => value === 'light' ? 'dark' : 'light')}>Use {theme === 'light' ? 'dark' : 'light'} theme</Button>
      <HostControls id="inside" />
      <Button ref={buttonRef} onClick={() => setClicks(value => value + 1)}>Count {clicks}</Button>
      <Field label="Synthetic note">{control => <Input {...control} ref={inputRef} value={note} onChange={event => setNote(event.target.value)} />}</Field>
      <p>Controlled note: {note || "(empty)"}</p>
      <Button disabled onClick={() => setBlockedCalls(value => value + 1)}>Disabled action</Button>
      <Button loading onClick={() => setBlockedCalls(value => value + 1)}>Pending action</Button>
      <p>Blocked action calls: {blockedCalls}</p>
      <StatusIndicator status="not_yet_verified" />
      <Alert tone="error">Synthetic review error. No provider was contacted.</Alert>
      <Field label="Synthetic invalid reference" error="Review this synthetic field.">{control => <Input {...control} defaultValue="" />}</Field>
      <SegmentedControl ref={groupRef} label="View" value={mode} onValueChange={setMode} options={[{value:'summary',label:'Summary'},{value:'detail',label:'Detail'}]} />
      <p>Selected view: {mode}</p>
      <Table.ScrollArea label="Packed table scroll"><Table {...table}><Table.Caption>Independent packed records</Table.Caption><Table.Header><Table.Row><Table.HeadCell>Reference</Table.HeadCell><Table.HeadCell numeric>Value</Table.HeadCell></Table.Row></Table.Header><Table.Body><Table.Row><Table.HeadCell scope="row">Sample {page}</Table.HeadCell><Table.Cell numeric>12.00 units</Table.Cell></Table.Row></Table.Body></Table></Table.ScrollArea>
      <Pagination {...pagination} />
      <Button onClick={() => setOpen(true)}>Open packed dialog</Button>
      <Dialog {...props}><div style={{display:"grid",gap:"var(--clu-space-4)"}}><Field label="Modal note">{control => <Input {...control} ref={modalInput} defaultValue="Preserved draft" />}</Field><Button onClick={() => setOpen(false)}>Cancel packed dialog</Button></div></Dialog>
      <Button variant="secondary" onClick={checkStyles}>Run browser checks</Button><output aria-live="polite">{result}</output>
    </section>
  </main>;
}
const root = document.getElementById('root'); if (!root) throw new Error('Missing consumer root');
createRoot(root).render(<App />);
