import React, { FC } from 'react';
import styles from './ButtonBar.module.scss';

interface ButtonBarProps{
    children: React.ReactNode
}

const ButtonBar:FC<ButtonBarProps> = ({children}) => {
    return (
        <div className={styles.buttonBarWrap}>
            <div className={styles.buttonBar}>
                {children}
            </div>
        </div>
    );
};

export default ButtonBar;