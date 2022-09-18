import React, { FC } from 'react';
import styles from './ComplexButton.module.scss';

interface ComplexButtonProps {
    children: React.ReactNode
}

const ComplexButton:FC<ComplexButtonProps> = ({children}) => {
    return (
        <div className={styles.button}>
            {children}
        </div>
    );
};

export default ComplexButton;