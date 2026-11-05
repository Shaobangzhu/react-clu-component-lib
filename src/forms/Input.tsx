import type { ComponentProps } from 'react';
export type InputProps = ComponentProps<'input'>;
export function Input({ className = '', ...props }: InputProps) {
    return <input {...props} className={`clu-control clu-focus-ring ${className}`}/>;
}
