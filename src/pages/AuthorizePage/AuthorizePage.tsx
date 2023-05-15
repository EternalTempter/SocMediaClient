import React, { FC, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginWrap from '../../components/LoginWrap/LoginWrap';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import SavingChangesHolder from '../../components/UI/SavingChangesHolder/SavingChangesHolder';
import { notifyError } from '../../helpers/helpers';
import { useAuthorizeMutation } from '../../store/socmedia/users/users.api';
import styles from './AuthorizePage.module.scss';
import { IUser } from '../../models';

interface AuthorizePageProps {
    setIsAuth: (state: boolean) => void
}

const AuthorizePage:FC<AuthorizePageProps> = ({setIsAuth}) => {
    const [sendAuthorizeQuery, {error, isError, isLoading, data}] = useAuthorizeMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    function validatePassword() {
        setIsPasswordError(password.length > 31 || password.length < 7);
    }

    function validateEmail() {
        setIsEmailError(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)));
    }

    const navigate = useNavigate();

    function authorize() {
        if(email !== '' && password !== ''){
            sendAuthorizeQuery({email: email, password: password, role: 'USER'})
        }
    }

    useEffect(() => {
        if (isError) notifyError(`${(JSON.stringify(error)).slice(33, -3)}`);
    }, [isError])

    useEffect(() => {
        if(data){
            setIsAuth(true);
            localStorage.setItem('token', JSON.stringify(data.token));
            const user : IUser = jwt_decode(localStorage.getItem('token') || '');
            navigate(`/account/${user.email}`);
            // navigate('/activate');
        }
    }, [data]);

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
        <LoginWrap>
            {isLoading && 
                <SavingChangesHolder label="Вход в аккаунт"/>
            }           
            <p className={styles.label}>Войти</p>
            <div className={!isEmailError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                {isEmailError && <span className={styles.error}>Введен неправильный формат почты</span>}
                <input 
                    placeholder='Введите email' 
                    type='email' 
                    className={isEmailError ? [styles.input, styles.error].join(' ') : styles.input}
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    onBlur={validateEmail}
                /> 
            </div>
            <div className={!isPasswordError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                {isPasswordError && <span className={styles.error}>Допустимая длина пароля от 8 до 32 символов</span>}
                <PasswordInput
                    placeholder='Введите пароль'
                    value={password}
                    onChange={setPassword}
                    validatePassword={validatePassword}
                    isPasswordError={isPasswordError}
                />
            </div>
            <button 
                type="button" 
                onClick={authorize}
                className={styles.authorizeButton}
            >Войти</button>
            <div className={styles.userDontHaveAccount}>
                <span className={styles.userDontHaveAccountLabel}>Нет аккаунта?</span>
                <Link to='/registrate'>Зарегистрироваться</Link>
            </div>
        </LoginWrap>
        </>
    );
};

export default AuthorizePage;