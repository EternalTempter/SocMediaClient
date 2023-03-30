import React, { FC } from 'react';
import styles from './AlertHolder.module.scss';

interface AlertHolder {
    icon: React.ReactNode
    label: string
    button?: React.ReactNode
}

const AlertHolder:FC<AlertHolder> = ({icon, label, button}) => {
    return (
        <div className={styles.alertHolder}>
            {icon}
            <p>{label}</p>
            {button}
        </div>
    );
};

export default AlertHolder;