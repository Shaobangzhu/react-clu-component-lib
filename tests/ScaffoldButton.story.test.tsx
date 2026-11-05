import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import * as stories from '../src/internal/ScaffoldButton.stories';

const { RenderingProof } = composeStories(stories);

it('renders the actual Storybook story with its configured args', () => {
  render(<RenderingProof />);
  expect(screen.getByRole('button', { name: 'React 19 scaffold' })).toBeEnabled();
});
