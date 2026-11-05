import { Button } from '../components/Button';
import { paginationDisplay, visiblePages } from './paginationMath';

export interface PaginationProps {
  page: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  label?: string;
}
export function Pagination({ page, totalItems, pageSize, onPageChange, disabled = false, label = 'Pagination' }: PaginationProps) {
  if (!label.trim()) throw new Error('Pagination requires a nonempty navigation label');
  const display = paginationDisplay(page, totalItems, pageSize);
  const request = (target: number) => {
    if (!disabled && target !== display.current && target >= 1 && target <= display.totalPages) onPageChange(target);
  };
  return <nav className="clu-pagination" aria-label={label}>
    <p className="clu-pagination-summary">{display.total === 0 ? 'Showing 0 of 0 items' : `Showing ${String(display.start)}–${String(display.end)} of ${String(display.total)} items`}</p>
    <ul className="clu-pagination-list">
      <li><Button variant="secondary" aria-label="Previous page" disabled={disabled || display.current <= 1} onClick={() => { request(display.current - 1); }}>Previous</Button></li>
      {visiblePages(display.current, display.totalPages).map(item => <li key={item}>{typeof item === 'number'
        ? <Button variant={item === display.current ? 'primary' : 'secondary'} aria-label={`Page ${String(item)}`} aria-current={item === display.current ? 'page' : undefined} disabled={disabled} onClick={() => { request(item); }}>{item}</Button>
        : <span className="clu-pagination-gap"><span aria-hidden="true">…</span><span className="clu-data-visually-hidden">More pages</span></span>}</li>)}
      <li><Button variant="secondary" aria-label="Next page" disabled={disabled || display.totalPages === 0 || display.current >= display.totalPages} onClick={() => { request(display.current + 1); }}>Next</Button></li>
    </ul>
  </nav>;
}
