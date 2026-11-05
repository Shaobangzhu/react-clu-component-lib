import type { ComponentProps, ReactNode } from 'react';
export type StatCardProps = Omit<ComponentProps<'div'>, 'children'> & {
    label: string;
    value: string | number | null | undefined;
    detail?: ReactNode;
};
export function StatCard({ label, value, detail, className = '', ...props }: StatCardProps) {
    const display = value === null ? 'Not available' : (value ?? 'Not observed');
    return <div {...props} className={`clu-card clu-stat-card ${className}`}><dl className="clu-stat-list"><dt className="clu-stat-label">{label}</dt><dd className="clu-stat-value">{display}</dd></dl>{detail != null && <div className="clu-stat-detail">{detail}</div>}</div>;
}
