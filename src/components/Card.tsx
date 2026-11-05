import type { ComponentProps, ReactNode } from 'react';
export type CardProps = ComponentProps<'div'> & {
    header?: ReactNode;
    footer?: ReactNode;
};
export function Card({ header, footer, children, className = '', ...props }: CardProps) {
    return <div {...props} className={`clu-card ${className}`}>{header != null && <div className="clu-card-header">{header}</div>}<div className="clu-card-content">{children}</div>{footer != null && <div className="clu-card-footer">{footer}</div>}</div>;
}
