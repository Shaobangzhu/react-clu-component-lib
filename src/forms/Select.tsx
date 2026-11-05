import type { ComponentProps } from 'react';
export type SelectProps = ComponentProps<'select'>;
export function Select({ className = '', ...props }: SelectProps) {
    return <select {...props} className={`clu-control clu-focus-ring ${className}`}/>;
}
