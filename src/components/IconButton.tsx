import type { ButtonProps } from './Button.js';
import { Button } from './Button.js';
export type IconButtonProps = Omit<ButtonProps, 'aria-label' | 'aria-labelledby'> & {
    'aria-label': string;
};
export function IconButton({ children, className = '', ...props }: IconButtonProps) {
    if (!props['aria-label'].trim())
        throw new Error('IconButton requires a nonempty aria-label');
    return <Button {...props} className={`clu-icon-button ${className}`}><span aria-hidden="true">{children}</span></Button>;
}
