import { StrictMode } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from '../src/index';
import { paginationDisplay, visiblePages } from '../src/data/paginationMath';

const cases = [
  { total: 0, page: 1, range: 'Showing 0 of 0 items', current: undefined, previous: true, next: true },
  { total: 1, page: 1, range: 'Showing 1–1 of 1 items', current: 1, previous: true, next: true },
  { total: 10, page: 1, range: 'Showing 1–10 of 10 items', current: 1, previous: true, next: true },
  { total: 11, page: 1, range: 'Showing 1–10 of 11 items', current: 1, previous: true, next: false },
  { total: 11, page: 2, range: 'Showing 11–11 of 11 items', current: 2, previous: false, next: true },
  { total: 105, page: 6, range: 'Showing 51–60 of 105 items', current: 6, previous: false, next: false },
  { total: 105, page: 11, range: 'Showing 101–105 of 105 items', current: 11, previous: false, next: true },
];
describe('controlled Pagination', () => {
  it.each(cases)('renders truthful ranges for $total items at page $page', ({ total, page, range, current, previous, next }) => {
    const change = vi.fn();
    render(<Pagination label="Record pages" page={page} totalItems={total} pageSize={10} onPageChange={change} />);
    const nav = screen.getByRole('navigation', { name: 'Record pages' });
    expect(within(nav).getByText(range)).toBeVisible();
    const previousButton = within(nav).getByRole('button', { name: 'Previous page' });
    const nextButton = within(nav).getByRole('button', { name: 'Next page' });
    expect(previousButton).toHaveProperty('disabled', previous);
    expect(nextButton).toHaveProperty('disabled', next);
    if (current === undefined) expect(nav.querySelector('[aria-current]')).toBeNull();
    else expect(within(nav).getByRole('button', { name: `Page ${String(current)}` })).toHaveAttribute('aria-current', 'page');
    expect(change).not.toHaveBeenCalled();
  });
  it('emits one request per native activation, leaves display controlled, and never submits a containing form', async () => {
    const user = userEvent.setup(); const change = vi.fn(); const submit = vi.fn();
    render(<form onSubmit={submit}><Pagination page={2} totalItems={50} pageSize={10} onPageChange={change} /></form>);
    const previous = screen.getByRole('button', { name: 'Previous page' });
    await user.tab(); expect(previous).toHaveFocus(); expect(previous).toHaveClass('clu-focus-ring');
    await user.keyboard('{Enter}'); expect(change).toHaveBeenLastCalledWith(1);
    await user.click(screen.getByRole('button', { name: 'Next page' })); expect(change).toHaveBeenLastCalledWith(3);
    await user.click(screen.getByRole('button', { name: 'Page 4' })); expect(change).toHaveBeenLastCalledWith(4);
    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(change).toHaveBeenCalledTimes(3); expect(submit).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
  });
  it('does not call consumers during rerenders, shrinkage, clamping, or StrictMode mounting', async () => {
    const user = userEvent.setup(); const change = vi.fn();
    const view = (total: number) => <StrictMode><Pagination page={8} totalItems={total} pageSize={10} onPageChange={change} /></StrictMode>;
    const { rerender } = render(view(100)); rerender(view(100)); rerender(view(11));
    expect(screen.getByText('Showing 11–11 of 11 items')).toBeVisible(); expect(change).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Previous page' })); expect(change).toHaveBeenCalledExactlyOnceWith(1);
    rerender(view(0)); expect(change).toHaveBeenCalledTimes(1); expect(screen.getByText('Showing 0 of 0 items')).toBeVisible();
  });
  it('keeps the page and callback stable when only row content would change in a consumer', () => {
    const change = vi.fn();
    const { rerender } = render(<Pagination page={3} totalItems={50} pageSize={10} onPageChange={change} />);
    rerender(<Pagination page={3} totalItems={50} pageSize={10} onPageChange={change} label="Updated list label" />);
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
    expect(change).not.toHaveBeenCalled();
  });
  it('honors disabled state for every control and skips them in tab order', async () => {
    const user = userEvent.setup(); const change = vi.fn();
    render(<><Pagination page={3} totalItems={100} pageSize={10} onPageChange={change} disabled /><button>After</button></>);
    for (const button of within(screen.getByRole('navigation')).getAllByRole('button')) { expect(button).toBeDisabled(); await user.click(button); }
    await user.tab(); expect(screen.getByRole('button', { name: 'After' })).toHaveFocus(); expect(change).not.toHaveBeenCalled();
  });
  it('renders a bounded window, endpoints and noninteractive ellipses for large counts', () => {
    render(<Pagination page={500000} totalItems={10000000} pageSize={10} onPageChange={vi.fn()} label="A long descriptive navigation label for this independent record collection" />);
    const nav = screen.getByRole('navigation', { name: /A long descriptive/ });
    expect(within(nav).getAllByRole('button').length).toBeLessThanOrEqual(9);
    expect(within(nav).getByRole('button', { name: 'Page 1' })).toBeVisible();
    expect(within(nav).getByRole('button', { name: 'Page 1000000' })).toBeVisible();
    expect(within(nav).getAllByText('More pages')).toHaveLength(2);
    expect(within(nav).queryByRole('button', { name: /More|…/ })).not.toBeInTheDocument();
  });
  it('keeps two named pagers independent', async () => {
    const user = userEvent.setup(); const first = vi.fn(); const second = vi.fn();
    render(<><Pagination label="First list" page={1} totalItems={11} pageSize={10} onPageChange={first} /><Pagination label="Second list" page={1} totalItems={11} pageSize={10} onPageChange={second} /></>);
    await user.click(within(screen.getByRole('navigation', { name: 'Second list' })).getByRole('button', { name: 'Next page' }));
    expect(first).not.toHaveBeenCalled(); expect(second).toHaveBeenCalledExactlyOnceWith(2);
  });
  it('rejects an unnamed navigation region', () => {
    expect(() => render(<Pagination label=" " page={1} totalItems={1} pageSize={10} onPageChange={vi.fn()} />)).toThrow('nonempty');
  });
});

describe('safe internal display calculations', () => {
  it.each([
    { page: -2, total: -1, size: 0, expected: [0, 0, 0, 1] },
    { page: NaN, total: Infinity, size: NaN, expected: [0, 0, 0, 1] },
    { page: Infinity, total: 11, size: -10, expected: [1, 1, 11, 1] },
    { page: 2.9, total: 11.9, size: 10.9, expected: [11, 11, 11, 2] },
    { page: 100, total: 11, size: 10, expected: [11, 11, 11, 2] },
    { page: 0, total: 11, size: 10, expected: [1, 10, 11, 1] },
    { page: 2, total: 11, size: 5, expected: [6, 10, 11, 2] },
  ])('normalizes $page / $total / $size only for display', ({ page, total, size, expected }) => {
    const display = paginationDisplay(page, total, size);
    expect([display.start, display.end, display.total, display.current]).toEqual(expected);
  });
  it('maintains bounded sorted unique windows and safe ranges across boundary inputs', () => {
    for (const total of [0, 1, 7, 8, 10, 11, 77, 100, 1000000, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE]) {
      for (const size of [1, 3, 10, 1000, Number.MAX_SAFE_INTEGER]) {
        for (const page of [-1, 1, 2, 4, 8, 500000, Number.MAX_SAFE_INTEGER]) {
          const display = paginationDisplay(page, total, size);
          const window = visiblePages(display.current, display.totalPages);
          const numbers = window.filter(item => typeof item === 'number');
          expect(window.length).toBeLessThanOrEqual(7);
          expect(new Set(window).size).toBe(window.length);
          expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
          if (display.totalPages > 0) {
            expect(numbers).toContain(1); expect(numbers).toContain(display.totalPages); expect(numbers).toContain(display.current);
          }
          for (const number of [display.start, display.end, display.total, ...numbers]) expect(Number.isSafeInteger(number)).toBe(true);
          expect(display.start).toBeLessThanOrEqual(display.end); expect(display.end).toBeLessThanOrEqual(display.total);
        }
      }
    }
  });
});
