import React, { FC } from 'react';
import Search from '../../../assets/svg/Search';
import styles from './Input.module.scss';

interface InputProps {
    placeholder: string
    value: string
    onChange: (value: string) => void
    type: string
}

const Input:FC<InputProps> = ({placeholder, value, onChange, type}) => {
    return (
        <div className={type === 'regular' ? styles.inputWrap : [styles.inputWrap, styles.shortened].join(' ')}>
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