import type { ComponentProps } from 'react';
export type SkeletonProps = Omit<ComponentProps<'span'>, 'children' | 'aria-hidden' | 'role' | 'aria-live' | 'tabIndex'>;
export function Skeleton({ className = '', ...props }: SkeletonProps) {
    return <span {...props} aria-hidden="true" className={`clu-skeleton ${className}`}/>;
}
