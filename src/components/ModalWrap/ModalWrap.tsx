import React, { FC } from 'react';
import styles from './ModalWrap.module.scss';

interface ModalWrapProps {
    children: React.ReactNode
    visible: boolean
    setVisible: (value: boolean) => void
}

const ModalWrap:FC<ModalWrapProps> = ({children, setVisible, visible}) => {
    return (
        <div className={styles.modalWrap} onClick={() => setVisible(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWrap;