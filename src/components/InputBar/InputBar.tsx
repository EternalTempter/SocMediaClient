import React, { FC } from 'react';
import styles from './InputBar.module.scss';

interface InputBarProps {
    children: React.ReactNode
}

const InputBar:FC<InputBarProps> = ({children}) => {
    return (
        <div className={styles.inputBar}>
            {children}
        </div>
    );
};

export default InputBar;