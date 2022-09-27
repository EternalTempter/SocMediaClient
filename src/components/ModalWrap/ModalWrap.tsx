import React, { FC } from 'react';
import styles from './ModalWrap.module.scss';

interface ModalWrapProps {
    children: React.ReactNode
    visible: boolean
    setVisible: (value: boolean) => void
    type: string
}

const ModalWrap:FC<ModalWrapProps> = ({children, setVisible, visible, type}) => {
    return (
        <div className={styles.modalWrap} onClick={() => setVisible(false)}>
            <div className={type === 'row' ? styles.modalRow : styles.modalColumn} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWrap;