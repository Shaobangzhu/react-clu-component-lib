import type { ComponentProps } from 'react';
export type Tone = 'neutral' | 'success' | 'warning' | 'error' | 'unknown';
export type BadgeProps = Omit<ComponentProps<'span'>, 'children'> & {
    tone?: Tone;
    children: string;
};
export function Badge({ tone = 'neutral', children, className = '', ...props }: BadgeProps) {
    return <span {...props} data-tone={tone} className={`clu-badge ${className}`}>{children}</span>;
}
