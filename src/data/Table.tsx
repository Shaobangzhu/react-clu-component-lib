import type { ComponentProps, ReactNode } from 'react';

export type TableProps = ComponentProps<'table'> & {
  density?: 'compact' | 'comfortable';
  hoverRows?: boolean;
};
export type TableHeadCellProps = ComponentProps<'th'> & { numeric?: boolean };
export type TableCellProps = ComponentProps<'td'> & { numeric?: boolean };
export type TableScrollAreaProps = Omit<ComponentProps<'div'>, 'aria-label' | 'role'> & { label: string };
export type TableMessageRowProps = Omit<ComponentProps<'tr'>, 'children'> & { colSpan: number; children: ReactNode };

function TableRoot({ density = 'comfortable', hoverRows = true, className = '', ...props }: TableProps) {
  return <table {...props} data-density={density} data-hover-rows={hoverRows} className={`clu-table ${className}`} />;
}
function Header({ className = '', ...props }: ComponentProps<'thead'>) {
  return <thead {...props} className={`clu-table-header ${className}`} />;
}
function Body({ className = '', ...props }: ComponentProps<'tbody'>) {
  return <tbody {...props} className={`clu-table-body ${className}`} />;
}
function Footer({ className = '', ...props }: ComponentProps<'tfoot'>) {
  return <tfoot {...props} className={`clu-table-footer ${className}`} />;
}
function Row({ className = '', ...props }: ComponentProps<'tr'>) {
  return <tr {...props} className={`clu-table-row ${className}`} />;
}
function HeadCell({ numeric = false, scope = 'col', className = '', ...props }: TableHeadCellProps) {
  return <th {...props} scope={scope} data-numeric={numeric} className={`clu-table-head-cell ${className}`} />;
}
function Cell({ numeric = false, className = '', ...props }: TableCellProps) {
  return <td {...props} data-numeric={numeric} className={`clu-table-cell ${className}`} />;
}
function Caption({ className = '', ...props }: ComponentProps<'caption'>) {
  return <caption {...props} className={`clu-table-caption ${className}`} />;
}
function ScrollArea({ label, tabIndex = 0, className = '', ...props }: TableScrollAreaProps) {
  if (!label.trim()) throw new Error('Table.ScrollArea requires a nonempty label');
  return <div {...props} role="region" aria-label={label} tabIndex={tabIndex} className={`clu-table-scroll clu-focus-ring ${className}`} />;
}
function MessageRow({ colSpan, children, className = '', ...props }: TableMessageRowProps) {
  if (!Number.isInteger(colSpan) || colSpan < 1 || colSpan > 1000) throw new Error('Table.MessageRow colSpan must be an integer from 1 to 1000');
  return <tr {...props} className={`clu-table-row ${className}`}><td colSpan={colSpan} className="clu-table-cell clu-table-message">{children}</td></tr>;
}

export const Table = Object.assign(TableRoot, { Header, Body, Footer, Row, HeadCell, Cell, Caption, ScrollArea, MessageRow });
