import type { ComponentProps } from 'react';
import './ScaffoldButton.css';

/** Internal rendering proof only; this is not the planned public Button API. */
export function ScaffoldButton({
  type = 'button',
  className,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      type={type}
      className={['clu-scaffold-button', className].filter(Boolean).join(' ')}
    />
  );
}
