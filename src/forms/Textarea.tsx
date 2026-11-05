import type { ComponentProps } from 'react';
export type TextareaProps = ComponentProps<'textarea'>;
export function Textarea({ className = '', ...props }: TextareaProps) {
    return <textarea {...props} className={`clu-control clu-focus-ring ${className}`}/>;
}
