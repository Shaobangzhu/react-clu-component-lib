import { useId } from 'react';
import type { ComponentProps, ReactNode } from 'react';
export type EmptyStateProps = Omit<ComponentProps<'section'>, 'title' | 'children'> & {
    title: string;
    description?: ReactNode;
    action?: ReactNode;
};
export function EmptyState({ title, description, action, className = '', ...props }: EmptyStateProps) {
    const titleId = useId();
    return <section aria-labelledby={titleId} {...props} className={`clu-empty-state ${className}`}><h2 id={titleId} className="clu-empty-title">{title}</h2>{description != null && <div className="clu-empty-description">{description}</div>}{action != null && <div className="clu-empty-action">{action}</div>}</section>;
}
