import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { StatCard } from '../src/index';
it('StatCard preserves its explicit semantic contract', () => { const {rerender}=render(<StatCard label="Value" value={0}/>); expect(screen.getByText('0')).toBeVisible(); rerender(<StatCard label="Value" value={null}/>); expect(screen.getByText('Not available')).toBeVisible(); rerender(<StatCard label="Value" value={undefined}/>); expect(screen.getByText('Not observed')).toBeVisible(); rerender(<StatCard label="Value" value="$0.00"/>); expect(screen.getByText('$0.00')).toBeVisible(); });
