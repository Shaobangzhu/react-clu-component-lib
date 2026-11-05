import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Alert } from '../src/index';
it('Alert preserves its explicit semantic contract', () => { const {rerender}=render(<Alert tone="error">Error detail</Alert>); expect(screen.queryByRole('alert')).not.toBeInTheDocument(); rerender(<Alert announcement="polite">Updated</Alert>); expect(screen.getByRole('status')).toHaveTextContent('Updated'); rerender(<Alert announcement="urgent">Immediate action</Alert>); expect(screen.getByRole('alert')).toHaveTextContent('Immediate action'); });
