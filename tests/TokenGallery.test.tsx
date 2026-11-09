import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import preview from '../.storybook/preview';
import * as stories from '../src/foundations/TokenGallery.stories';

const { Light, Dark, Compare } = composeStories(stories, preview);
it('renders fixed themes on local hosts without mutating the document theme', () => {
  const { rerender } = render(<Light />);
  expect(screen.getByRole('article', { name: 'CLU token gallery' }).closest('[data-clu-theme]')).toHaveAttribute('data-clu-theme', 'light');
  rerender(<Dark />);
  expect(screen.getByRole('article', { name: 'CLU token gallery' }).closest('[data-clu-theme]')).toHaveAttribute('data-clu-theme', 'dark');
  expect(document.body).not.toHaveAttribute('data-clu-theme');
  expect(document.documentElement).not.toHaveAttribute('data-clu-theme');
});
it('keeps nested light and dark hosts independent and notes anchors unique', () => {
  render(<Compare />);
  const galleries = screen.getAllByRole('article', { name: /^(?:Dark|Light) token gallery$/ });
  expect(galleries[0]?.closest('[data-clu-theme]')).toHaveAttribute('data-clu-theme', 'dark');
  expect(galleries[1]?.closest('[data-clu-theme]')).toHaveAttribute('data-clu-theme', 'light');
  const links = screen.getAllByRole('link', { name: 'Review notes' });
  expect(links[0]?.getAttribute('href')).not.toBe(links[1]?.getAttribute('href'));
});
