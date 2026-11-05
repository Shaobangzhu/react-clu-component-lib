import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Button } from '../src/index';
it('supports React 19 refs and safe native keyboard activation', async () => {
 const user = userEvent.setup(); const ref = createRef<HTMLButtonElement>(); const click = vi.fn(); const submit = vi.fn();
 render(<form onSubmit={submit}><Button  ref={ref} onClick={click}>{'Action'}</Button></form>);
 const button = screen.getByRole('button', { name: 'Action' });
 expect(ref.current).toBe(button); expect(button).toHaveAttribute('type','button'); expect(button).toHaveClass('clu-focus-ring');
 await user.tab(); expect(button).toHaveFocus(); await user.keyboard('{Enter}'); await user.keyboard(' ');
 expect(click).toHaveBeenCalledTimes(2); expect(submit).not.toHaveBeenCalled();
});
it('blocks activation while disabled or loading, preserves name, and recovers', async () => {
 const user=userEvent.setup(); const click=vi.fn();
 const {rerender}=render(<Button  disabled onClick={click}>Action</Button>);
 await user.click(screen.getByRole('button')); expect(click).not.toHaveBeenCalled();
 rerender(<Button  loading onClick={click}>Action</Button>);
 expect(screen.getByRole('button',{name:'Action'})).toHaveAttribute('aria-busy','true');
 await user.click(screen.getByRole('button')); expect(click).not.toHaveBeenCalled();
 rerender(<Button  onClick={click}>Action</Button>);
 await user.click(screen.getByRole('button')); expect(click).toHaveBeenCalledTimes(1);
});
