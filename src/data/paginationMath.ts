/** Internal display calculations only; never update a consumer's state. */
function whole(value: number, fallback: number) {
  return Number.isFinite(value) ? Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor(value))) : fallback;
}
export function paginationDisplay(page: number, totalItems: number, pageSize: number) {
  const total = whole(totalItems, 0);
  const size = Math.max(1, whole(pageSize, 1));
  const totalPages = Math.ceil(total / size);
  const current = Math.min(Math.max(1, whole(page, 1)), Math.max(1, totalPages));
  const offset = (current - 1) * size;
  return { total, totalPages, current, start: total === 0 ? 0 : offset + 1, end: Math.min(total, offset + size) };
}
export function visiblePages(current: number, totalPages: number): (number | 'gap-start' | 'gap-end')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const start = Math.min(Math.max(2, current - 1), totalPages - 3);
  const end = Math.max(4, Math.min(totalPages - 1, current + 1));
  const pages: (number | 'gap-start' | 'gap-end')[] = [1];
  if (start === 3) pages.push(2);
  else if (start > 3) pages.push('gap-start');
  for (let number = start; number <= end; number += 1) pages.push(number);
  if (end === totalPages - 2) pages.push(totalPages - 1);
  else if (end < totalPages - 2) pages.push('gap-end');
  pages.push(totalPages);
  return pages;
}
