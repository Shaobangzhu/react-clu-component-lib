import type { ComponentProps } from 'react';
export type ButtonProps = ComponentProps<'button'> & {
    variant?: 'primary' | 'secondary' | 'quiet' | 'danger';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
};
export function Button({ variant = 'primary', size = 'medium', loading = false, disabled, type = 'button', className = '', children, ...props }: ButtonProps) {
    return <button {...props} type={type} disabled={disabled === true || loading} aria-busy={loading || undefined} data-variant={variant} data-size={size} className={`clu-button clu-focus-ring ${className}`}>{loading && <span aria-hidden="true">… </span>}{children}</button>;
}
