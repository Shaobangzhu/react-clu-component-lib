import { useId } from 'react';
import type { ReactNode } from 'react';
export interface FieldControlProps {
    id: string;
    required: boolean;
    'aria-describedby': string | undefined;
    'aria-invalid': true | undefined;
}
export interface FieldProps {
    id?: string;
    label: string;
    description?: string;
    error?: string;
    required?: boolean;
    'aria-describedby'?: string;
    children: (control: FieldControlProps) => ReactNode;
}
export function Field({ id, label, description, error, required = false, children, 'aria-describedby': describedBy }: FieldProps) {
    const generated = useId();
    const controlId = id ?? generated;
    const descriptionId = `${controlId}-description`;
    const errorId = `${controlId}-error`;
    const ids = [describedBy, description ? descriptionId : undefined, error ? errorId : undefined].filter(Boolean).join(' ') || undefined;
    return <div className="clu-field"><label className="clu-field-label" htmlFor={controlId}>{required ? `${label} (required)` : label}</label>
 {description && <div id={descriptionId} className="clu-field-description">{description}</div>}
 {children({ id: controlId, required, 'aria-describedby': ids, 'aria-invalid': error ? true : undefined })}
 {error && <div id={errorId} className="clu-field-error">{error}</div>}</div>;
}
