import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import preview from '../.storybook/preview';
import * as tableStories from '../src/data/Table.stories';
import * as paginationStories from '../src/data/Pagination.stories';
const { DeliveryHistory, MerchantSummary, Dark, Empty, Loading } = composeStories(tableStories, preview);
const { Controlled } = composeStories(paginationStories, preview);

it('uses an example-owned ten-row slice and controlled page requests in the actual Delivery History story', async () => {
  const user = userEvent.setup(); render(<DeliveryHistory />);
  const table = screen.getByRole('table', { name: 'Delivery History — synthetic data' });
  expect(within(table).getAllByRole('row')).toHaveLength(11);
  expect(within(table).getByRole('rowheader', { name: 'Sample 01' })).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Next page' }));
  expect(within(table).getByRole('rowheader', { name: 'Sample 11' })).toBeVisible();
  expect(screen.getByText('Showing 11–20 of 37 items')).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Page 4' }));
  expect(within(table).getAllByRole('row')).toHaveLength(8);
  expect(screen.getByText('Showing 31–37 of 37 items')).toBeVisible();
});
it('renders the Merchant Summary and a fixed local dark theme without global theme mutation', () => {
  const { unmount } = render(<MerchantSummary />);
  expect(screen.getByRole('table', { name: 'Merchant Summary — synthetic data' })).toBeVisible();
  unmount(); render(<Dark />);
  expect(screen.getByRole('table').closest('[data-clu-theme]')).toHaveAttribute('data-clu-theme', 'dark');
  expect(document.body).not.toHaveAttribute('data-clu-theme');
});
it('shows truthful empty and loading story states', () => {
  const { unmount } = render(<Empty />);
  expect(screen.getByRole('cell', { name: 'No records to display.' })).toBeVisible();
  expect(screen.getByText('Showing 0 of 0 items')).toBeVisible(); unmount(); render(<Loading />);
  expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
  for (const button of within(screen.getByRole('navigation')).getAllByRole('button')) expect(button).toBeDisabled();
});
it('demonstrates display clamping without changing example consumer state on total shrinkage', async () => {
  const user = userEvent.setup(); render(<Controlled />);
  await user.click(screen.getByRole('button', { name: 'Shrink total to 11' }));
  expect(screen.getByText(/Consumer page state: 8/)).toBeVisible();
  expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
  await user.click(screen.getByRole('button', { name: 'Previous page' }));
  expect(screen.getByText(/Consumer page state: 1\./)).toBeVisible();
});
