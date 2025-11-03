import React, { FC } from 'react';
import classNames from 'classnames';

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
    title: string;
    description?: string;
    type?: AlertType;
    /** 关闭alert时, 触发的事件 */
    onClose?: () => void;
    /** 是否显示关闭图标 */
    closable?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
    const { title, description, type, onClose, closable } = props;
    const classes = classNames("clu-alert", {
        [`clu-alert-${type}`]: type,
    });
    const titleClass = classNames("clu-alert-title", {
        "bold-title": description,
    });
    const handleClose = (e: React.MouseEvent) => {
        if (onClose) {
            onClose();
        }
    }
    return (
        <div className={classes}>
            <span className={titleClass}>{title}</span>
            {description && <p className='clu-alert-desc'>{description}</p>}
            {closable && (
                <span className="clu-alert-close" onClick={handleClose}>X</span>
            )}
        </div>
    );
}

Alert.defaultProps = {
    type: "default",
    closable: true,
};
export default Alert;