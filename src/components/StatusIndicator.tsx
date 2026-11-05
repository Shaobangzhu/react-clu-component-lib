import type { ComponentProps } from 'react';
import { Badge } from './Badge';
const states = {
    operational: { label: 'Operational', tone: 'success' },
    degraded: { label: 'Degraded', tone: 'warning' },
    unavailable: { label: 'Unavailable', tone: 'error' },
    not_yet_verified: { label: 'Not yet verified', tone: 'unknown' },
    not_configured: { label: 'Not configured', tone: 'neutral' },
} as const;
export type StatusIndicatorProps = Omit<ComponentProps<'span'>, 'children'> & {
    status: keyof typeof states;
};
export function StatusIndicator({ status, ...props }: StatusIndicatorProps) {
    const state = states[status];
    return <Badge {...props} tone={state.tone}>{state.label}</Badge>;
}
