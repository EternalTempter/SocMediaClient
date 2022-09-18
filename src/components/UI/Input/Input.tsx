import React, { FC } from 'react';
import Search from '../../../assets/svg/Search';
import styles from './Input.module.scss';

interface InputProps {
    placeholder: string
    value: string
    onChange: (value: string) => void
}

const Input:FC<InputProps> = ({placeholder, value, onChange}) => {
    return (
        <div className={styles.inputWrap}>
            <input 
                className={styles.input} 
                placeholder={placeholder} 
                value={value} 
                onChange={e => onChange(e.target.value)}
            />
            <div>
                <Search className={styles.search}/>
            </div>
        </div>
    );
};

export default Input;