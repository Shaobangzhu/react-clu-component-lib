import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { StatusIndicator } from '../src/index';
it('StatusIndicator preserves its explicit semantic contract', () => { const {rerender}=render(<StatusIndicator status="not_yet_verified"/>); expect(screen.getByText('Not yet verified')).toBeVisible(); rerender(<StatusIndicator status="not_configured"/>); expect(screen.getByText('Not configured')).toBeVisible(); rerender(<StatusIndicator status="unavailable"/>); expect(screen.getByText('Unavailable')).toHaveAttribute('data-tone','error'); });
