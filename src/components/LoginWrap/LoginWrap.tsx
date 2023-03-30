import React, { FC } from 'react';
import styles from './LoginWrap.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/svg/Logo';
import { resolve } from 'path';
import ExtendedLogo from '../../assets/svg/ExtendedLogo';

interface LoginWrapProps {
    children: React.ReactNode
}

const LoginWrap:FC<LoginWrapProps> = ({children}) => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className={styles.toast}
            />
            <div className={styles.loginMainWrap}>
                <div className={styles.loginWrap}>
                    <div className={styles.loginImageHolder}>
                        <ExtendedLogo className={styles.extendedLogo}/>
                        <p>Ellentair</p>
                    </div>   
                    <div className={styles.loginHolder}>
                        <Logo className={styles.mobileLogo}/>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginWrap;