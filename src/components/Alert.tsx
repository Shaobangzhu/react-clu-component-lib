import type { ComponentProps } from 'react';
import type { Tone } from './Badge.js';
export type AlertProps = Omit<ComponentProps<'div'>, 'role' | 'aria-live'> & {
    tone?: Tone;
    announcement?: 'off' | 'polite' | 'urgent';
};
export function Alert({ tone = 'neutral', announcement = 'off', className = '', ...props }: AlertProps) {
    return <div {...props} role={announcement === 'urgent' ? 'alert' : announcement === 'polite' ? 'status' : undefined} data-tone={tone} className={`clu-alert ${className}`}/>;
}
