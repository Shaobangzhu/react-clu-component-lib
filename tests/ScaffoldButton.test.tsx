import { createRef, StrictMode, type SubmitEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ScaffoldButton } from '../src/internal/ScaffoldButton';

describe('internal foundation scaffold', () => {
  it('renders under StrictMode with a native React 19 ref and default button type', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <StrictMode>
        <ScaffoldButton ref={ref}>Rendering proof</ScaffoldButton>
      </StrictMode>,
    );

    const button = screen.getByRole('button', { name: 'Rendering proof' });
    expect(button).toHaveAttribute('type', 'button');
    expect(ref.current).toBe(button);
  });

  it('responds to native keyboard activation without submitting its containing form', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onSubmit = vi.fn((event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
    });
    render(
      <form onSubmit={onSubmit}>
        <ScaffoldButton onClick={onClick}>Activate scaffold</ScaffoldButton>
      </form>,
    );

    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('respects disabled behavior and updates on rerender', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(
      <ScaffoldButton disabled onClick={onClick}>Disabled scaffold</ScaffoldButton>,
    );

    await user.click(screen.getByRole('button', { name: 'Disabled scaffold' }));
    expect(onClick).not.toHaveBeenCalled();

    rerender(<ScaffoldButton onClick={onClick}>Enabled scaffold</ScaffoldButton>);
    await user.click(screen.getByRole('button', { name: 'Enabled scaffold' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
