import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { EmptyState } from '../src/index';
it('EmptyState preserves its explicit semantic contract', () => { render(<><EmptyState title="No records" description="Try another filter" action={<button>Retry</button>}/><EmptyState title="No matches"/></>); expect(screen.getByRole('region',{name:'No records'})).toHaveTextContent('Try another filter'); expect(screen.getByRole('region',{name:'No matches'})).toBeVisible(); expect(screen.getByRole('button',{name:'Retry'})).toBeEnabled(); });
