import React, { FC, useEffect, useState } from 'react';
import { useRegistrateMutation } from '../../store/socmedia/users/users.api';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './RegistratePage.module.scss';
import { useLazySetDefaultUserDataQuery } from '../../store/socmedia/userData/userData.api';
import LoginWrap from '../../components/LoginWrap/LoginWrap';
import View from '../../assets/svg/View';
import ClosedEye from '../../assets/svg/ClosedEye';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { notifyAlert, notifyError } from '../../helpers/helpers';
import { isErrored } from 'stream';
import SavingChangesHolder from '../../components/UI/SavingChangesHolder/SavingChangesHolder';

interface RegistratePageProps {
    setIsAuth: (state: boolean) => void
    setIsWelcomeWindowVisible: (value: boolean) => void
}

const RegistratePage:FC<RegistratePageProps> = ({setIsAuth, setIsWelcomeWindowVisible}) => {
    const navigate = useNavigate();

    const [registrationData, setRegistrationData] = useState({email: '', name: '', surname: ''});
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [password, setPassword] = useState('');
    const [sendRegistrateQuery, {isLoading, data, isError, error}] = useRegistrateMutation();
    const [setDefaultUserData] = useLazySetDefaultUserDataQuery();

    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isPasswordRepeatError, setIsPasswordRepeatError] = useState(false);
    const [isNameError, setIsNameError] = useState(false);
    const [isSurnameError, setIsSurnameError] = useState(false);

    function registrate() {
        if(
            (registrationData.email !== '' && !isEmailError) && 
            (password !== '' && !isPasswordError) && 
            (passwordRepeat !== '' && !isPasswordRepeatError) && 
            (registrationData.name !== '' && !isNameError) && 
            (registrationData.surname !== '' && !isSurnameError)
        ){
            sendRegistrateQuery({
                email: registrationData.email,
                password: password, 
                role: 'USER', 
                name: registrationData.name, 
                surname: registrationData.surname
            });
        }
        else notifyAlert('Правильно заполните все поля!');
    }

    function validateName() {
        setIsNameError(registrationData.name.length > 20 || registrationData.name.length < 1);
    }

    function validateSurname() {
        setIsSurnameError(registrationData.surname.length > 20 || registrationData.surname.length < 1);
    }

    function validateEmail() {
        setIsEmailError(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registrationData.email)));
    }

    function validatePassword() {
        setIsPasswordError(password.length > 31 || password.length < 7);
    }

    function validatePasswordRepeat() {
        setIsPasswordRepeatError(password !== passwordRepeat);
    }

    useEffect(() => {
        if (isError) notifyError(`${(JSON.stringify(error)).slice(33, -3)}`);
    }, [isError])

    useEffect(() => {
        if(data) {
            localStorage.setItem('token', JSON.stringify(data.token));
            setDefaultUserData(registrationData.email);
            setIsAuth(true);
            setIsWelcomeWindowVisible(false);
            navigate('/activate');
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
            <SavingChangesHolder label="Создание аккуанта"/>
        }           
            <p className={styles.label}>Регистрация</p>
            <div className={!isNameError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                {isNameError && <span className={styles.error}>Допустимая длина от 1 до 20 символов</span>}
                <input 
                    placeholder='Введите имя' 
                    type='text' 
                    value={registrationData.name}
                    onChange={e => setRegistrationData({...registrationData, name: e.target.value})}
                    className={isNameError ? [styles.input, styles.error].join(' ') : styles.input}
                    onBlur={validateName}
                />
            </div>
            <div className={!isSurnameError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                {isSurnameError && <span className={styles.error}>Допустимая длина от 1 до 20 символов</span>}
                <input 
                    placeholder='Введите фамилию' 
                    type='text' 
                    value={registrationData.surname}
                    onChange={e => setRegistrationData({...registrationData, surname: e.target.value})}
                    className={isSurnameError ? [styles.input, styles.error].join(' ') : styles.input}
                    onBlur={validateSurname}
                />
            </div>
            <div className={!isEmailError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                {isEmailError && <span className={styles.error}>Введен неправильный формат почты</span>}
                <input
                    placeholder='Введите email' 
                    type='email' 
                    value={registrationData.email} 
                    onChange={e => setRegistrationData({...registrationData, email: e.target.value})}
                    className={isEmailError ? [styles.input, styles.error].join(' ') : styles.input}
                    onBlur={validateEmail}
                />
            </div>
            <div className={!isPasswordError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                {isPasswordError && <span className={styles.error}>Допустимая длина от 8 до 32 символов</span>}
                <PasswordInput
                    placeholder='Введите пароль'
                    value={password}
                    onChange={setPassword}
                    validatePassword={validatePassword}
                    isPasswordError={isPasswordError}
                />
            </div>
            <div className={!isPasswordRepeatError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                {isPasswordRepeatError && <span className={styles.error}>Пароли не совпадают</span>}
                <PasswordInput
                    placeholder='Повторите пароль'
                    value={passwordRepeat}
                    onChange={setPasswordRepeat}
                    validatePassword={validatePasswordRepeat}
                    isPasswordError={isPasswordRepeatError}
                />
            </div>
            <button 
                type="button" 
                onClick={registrate}
                className={styles.registrateButton}
            >Зарегистрироваться</button>
            <div className={styles.userDontHaveAccount}>
                <span className={styles.userDontHaveAccountLabel}>Уже есть аккаунт?</span>
                <Link to='/auth'>Войти</Link>
            </div>
        </LoginWrap>
        </>
    );
};

export default RegistratePage;