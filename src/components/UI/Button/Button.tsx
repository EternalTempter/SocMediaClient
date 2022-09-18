import React, { FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps{
    onClick: () => void
    isActive: boolean
    children: React.ReactNode
}

const Button:FC<ButtonProps> = ({onClick, isActive, children}) => {
    return (
        <button onClick={onClick} className={isActive ? [styles.button, styles.active].join(' ') : styles.button}>
            {children}
        </button>
    );
};

export default Button;