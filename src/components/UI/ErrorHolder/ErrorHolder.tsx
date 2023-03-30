import React, { FC } from 'react';
import Error from '../../../assets/svg/Error';
import Button from '../Button/Button';
import styles from './ErrorHolder.module.scss';

interface ErrorHolderProps {
    label: string
    refetch: () => void;
}

const ErrorHolder:FC<ErrorHolderProps> = ({refetch, label}) => {
    return (
        <div className={styles.errorHolder}>
            <Error className={styles.errorIcon}/>
            <p>{label}</p>
            <Button 
                onClick={refetch} 
                isActive={false}
            >Обновить</Button>
        </div>
    );
};

export default ErrorHolder;