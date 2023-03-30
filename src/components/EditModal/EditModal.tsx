import React, { FC } from 'react';
import BackArrow from '../../assets/svg/BackArrow';
import styles from './EditModal.module.scss';

interface EditModalProps {
    header: string
    children: React.ReactNode
    setVisible: (value: boolean) => void
}

const EditModal:FC<EditModalProps> = ({header, children, setVisible}) => {
    return (
        <div className={styles.editModalWrap}>
            <div className={styles.editHeader}>
                <div 
                    className={styles.returnBack} 
                    onClick={() => setVisible(false)}
                >
                    <BackArrow className={styles.backArrowIcon}/>
                    <p>Вернуться назад</p>
                </div>
                <h2>{header}</h2>
            </div>
            <div className={styles.editBody}>
                {children}
            </div>
        </div>
    );
};

export default EditModal;