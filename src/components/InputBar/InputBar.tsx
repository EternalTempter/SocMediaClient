import React, { FC } from 'react';
import styles from './InputBar.module.scss';

interface InputBarProps {
    type: string
    children: React.ReactNode
}

const InputBar:FC<InputBarProps> = ({children, type}) => {
    return (
        <div className={type === "regular" ? styles.inputBar : [styles.inputBar, styles.shortened].join(' ')}>
            {children}
        </div>
    );
};

export default InputBar;