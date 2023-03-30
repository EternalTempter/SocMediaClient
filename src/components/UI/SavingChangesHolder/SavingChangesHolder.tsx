import React, { FC } from 'react';
import Loader from '../Loader/Loader';
import styles from './SavingChangesHolder.module.scss';

interface SavingChangesHolderProps {
    label: string
}

const SavingChangesHolder:FC<SavingChangesHolderProps> = ({label}) => {
    return (
        <div className={styles.savingChangesHolderWrap}>
            <div className={styles.savingChangesHolder}>
                <Loader type='tiny'/>
                <p>{label}</p>
            </div>
        </div>
    );
};

export default SavingChangesHolder;