import React, { FC } from 'react';
import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
    setVisible: (value: boolean) => void
    executeAfterConfirm: () => void
    label: string
}

const ConfirmationModal:FC<ConfirmationModalProps> = ({label, executeAfterConfirm, setVisible}) => {
    return (
        <div>
            <p className={styles.label}>{label}</p>
            <div>
                <button className={styles.deleteButton} onClick={executeAfterConfirm}>Удалить</button>
                <button className={styles.button} onClick={() => setVisible(false)}>Отменить</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;