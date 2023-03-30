import React, { FC } from 'react';
import Search from '../../../assets/svg/Search';
import styles from './ComplexInput.module.scss';

interface ComplexInputProps {
    onChange: (value: string) => void
    value: string
    placeholder: string
}

const ComplexInput:FC<ComplexInputProps> = ({onChange, value, placeholder}) => {
    return (
        <div className={styles.inputBox}>
            <div className={styles.inputName}>Поиск:</div>
            <input 
                type="text" 
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                value={value}
            />
            <div className={styles.inputSearcher}>
                <Search className={styles.searchIcon}/>
            </div>
        </div>
    );
};

export default ComplexInput;