import { useId } from 'react';
import type { ComponentProps } from 'react';
export interface SegmentedOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export type SegmentedControlProps = Omit<ComponentProps<'fieldset'>, 'children' | 'onChange' | 'defaultValue'> & {
    label: string;
    options: readonly SegmentedOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    required?: boolean;
    description?: string;
    error?: string;
};
export function SegmentedControl({ label, options, value, defaultValue, onValueChange, required = false, description, error, name, id, className = '', 'aria-describedby': describedBy, ...props }: SegmentedControlProps) {
    const generated = useId();
    const groupId = id ?? generated;
    const groupName = name ?? generated;
    const ids = [describedBy, description ? `${groupId}-description` : undefined, error ? `${groupId}-error` : undefined].filter(Boolean).join(' ') || undefined;
    if (new Set(options.map(option => option.value)).size !== options.length)
        throw new Error('SegmentedControl option values must be unique');
    return <fieldset {...props} id={groupId} name={name} aria-describedby={ids} className={`clu-segmented ${className}`}>
 <legend className="clu-field-label">{label}{required && ' (required)'}</legend>
 {description && <div id={`${groupId}-description`} className="clu-field-description">{description}</div>}
 <div className="clu-segmented-options">{options.map(option => <label className="clu-segment" key={option.value}>
 <input type="radio" name={groupName} value={option.value} {...(value === undefined ? { defaultChecked: defaultValue === option.value } : { checked: value === option.value })} disabled={option.disabled} required={required} aria-invalid={error ? true : undefined} aria-describedby={ids} onChange={event => { if (event.target.checked)
            onValueChange?.(event.target.value); }} className="clu-segment-radio clu-focus-ring"/>
 <span className="clu-segment-label">{option.label}</span></label>)}</div>
 {error && <div id={`${groupId}-error`} className="clu-field-error">{error}</div>}
 </fieldset>;
}
