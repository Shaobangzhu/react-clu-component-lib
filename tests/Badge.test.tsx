import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Badge } from '../src/index';
it('Badge preserves its explicit semantic contract', () => { render(<Badge tone="warning">Needs review</Badge>); expect(screen.getByText('Needs review')).toHaveAttribute('data-tone','warning'); expect(screen.queryByRole('status')).not.toBeInTheDocument(); });
