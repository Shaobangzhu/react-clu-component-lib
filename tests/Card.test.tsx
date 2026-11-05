import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Card } from '../src/index';
it('Card preserves its explicit semantic contract', () => { const ref=createRef<HTMLDivElement>(); render(<Card ref={ref} header="Heading" footer="Footnote">Body</Card>); expect(ref.current).toHaveTextContent('HeadingBodyFootnote'); expect(screen.queryByRole('alert')).not.toBeInTheDocument(); });
