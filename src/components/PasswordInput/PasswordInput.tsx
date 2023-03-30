import React, { FC, useState } from 'react';
import ClosedEye from '../../assets/svg/ClosedEye';
import View from '../../assets/svg/View';
import styles from './PasswordInput.module.scss';

interface PasswordInputProps {
    value: string
    onChange: (value: string) => void
    placeholder: string
    validatePassword: () => void
    isPasswordError: boolean
}

const PasswordInput:FC<PasswordInputProps> = ({value, onChange, placeholder, validatePassword, isPasswordError}) => {
    const [passwordInputType, setPasswordInputType] = useState('password');
    function togglePasswordHandler() {
        if(passwordInputType === 'password') setPasswordInputType('text');
        else setPasswordInputType('password');
    }
    return (
        <div className={styles.passwordBox}>
            <input 
                placeholder={placeholder}
                type={passwordInputType}
                value={value}
                onChange={e => onChange(e.target.value)}
                className={isPasswordError ? [styles.input, styles.error].join(' ') : styles.input}
                onBlur={validatePassword}
            />
            <div className={styles.viewIconWrap} onClick={togglePasswordHandler}>
                {passwordInputType === 'password' 
                    ?
                <View className={styles.viewIcon}/> 
                    :
                <ClosedEye className={styles.viewIcon}/>
                }
            </div>
        </div>
    );
};

export default PasswordInput;