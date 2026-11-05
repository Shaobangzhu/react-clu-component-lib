import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Skeleton } from '../src/index';
it('Skeleton preserves its explicit semantic contract', () => { render(<Skeleton data-testid="skeleton"/>); expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden','true'); expect(screen.queryByRole('status')).not.toBeInTheDocument(); });
