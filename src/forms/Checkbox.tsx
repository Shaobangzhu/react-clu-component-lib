import { useCallback } from 'react';
import type { ComponentProps } from 'react';
import { Field } from './Field';
export type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'children' | 'aria-checked'> & {
    label: string;
    description?: string;
    error?: string;
    indeterminate?: boolean;
};
export function Checkbox({ label, description, error, indeterminate = false, id, required, ref, className = '', 'aria-describedby': describedBy, ...props }: CheckboxProps) {
    const attach = useCallback((node: HTMLInputElement | null) => {
        if (node)
            node.indeterminate = indeterminate;
        if (typeof ref === 'function')
            return ref(node);
        if (ref)
            ref.current = node;
    }, [indeterminate, ref]);
    return <Field label={label} {...(id === undefined ? {} : { id })} {...(description === undefined ? {} : { description })} {...(error === undefined ? {} : { error })} {...(required === undefined ? {} : { required })} {...(describedBy === undefined ? {} : { 'aria-describedby': describedBy })}>
 {control => <input {...props} {...control} ref={attach} type="checkbox" aria-invalid={error ? true : props['aria-invalid']} className={`clu-checkbox clu-focus-ring ${className}`}/>}
 </Field>;
}
