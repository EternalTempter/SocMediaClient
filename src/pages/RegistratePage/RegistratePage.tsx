import React, { FC, useEffect, useState } from 'react';
import { useRegistrateMutation } from '../../store/socmedia/users/users.api';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './RegistratePage.module.scss';
import { useLazySetDefaultUserDataQuery } from '../../store/socmedia/userData/userData.api';
import LoginWrap from '../../components/LoginWrap/LoginWrap';

interface RegistratePageProps {
    setIsAuth: (state: boolean) => void
}

const RegistratePage:FC<RegistratePageProps> = ({setIsAuth}) => {
    const navigate = useNavigate();

    const [registrationData, setRegistrationData] = useState({email: '', password: '', name: '', surname: ''});
    const [sendRegistrateQuery, {isLoading, data, error}] = useRegistrateMutation();
    const [setDefaultUserData, {isLoading: isUserDataLoading, data: userData, isError: isUserDataError}] = useLazySetDefaultUserDataQuery();

    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isNameError, setIsNameError] = useState(false);
    const [isSurnameError, setIsSurnameError] = useState(false);

    function registrate() {
        if(
            (registrationData.email !== '' && !isEmailError) && 
            (registrationData.password !== '' && !isPasswordError) && 
            (registrationData.name !== '' && !isNameError) && 
            (registrationData.surname !== '' && !isSurnameError)
        ){
            sendRegistrateQuery({
                email: registrationData.email,
                password: registrationData.password, 
                role: 'USER', 
                name: registrationData.name, 
                surname: registrationData.surname
            });
            setDefaultUserData(registrationData.email);
        }
        else notify();
    }

    function notify() {
        toast.warn('Правильно заполните все поля!', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function validateName() {
        setIsNameError(registrationData.name.length > 15 || registrationData.name.length < 1);
    }

    function validateSurname() {
        setIsSurnameError(registrationData.surname.length > 15 || registrationData.surname.length < 1);
    }

    function validateEmail() {
        setIsEmailError(!(registrationData.email.includes('.') && registrationData.email.includes('@')));
    }

    function validatePassword() {
        setIsPasswordError(registrationData.password.length > 31 || registrationData.password.length < 7);
    }

    function handleNameChange(e: any) {
        setRegistrationData({...registrationData, name: e.target.value})
        validateName();
    }

    function handleSurnameChange(e: any) {
        setRegistrationData({...registrationData, surname: e.target.value})
        validateSurname()
    }

    function handleEmailChange(e: any) {
        setRegistrationData({...registrationData, email: e.target.value})
        validateEmail()
    }

    function handlePasswordChange(e: any) {
        setRegistrationData({...registrationData, password: e.target.value})
        validatePassword()
    }

    useEffect(() => {
        if(data) {
            setIsAuth(true);
            localStorage.setItem('token', JSON.stringify(data.token));
            navigate('/');
        }
    }, [data]);

    return (
        <LoginWrap>
            {isLoading && <h1 className={styles.info}>Идет загрузка</h1>}           
            {error && <h1 className={styles.info}>Произошла ошибка {(JSON.stringify(error)).slice(33, -3)}</h1>}
            <p className={styles.label}>Регистрация</p>
            {isEmailError && <p className={styles.inputLabel}>Обязательное содержание символов @ и .</p>}
            <input
                placeholder='Введите email' 
                type='text' 
                value={registrationData.email} 
                onChange={e => handleEmailChange(e)}
                className={isEmailError ? [styles.input, styles.error].join(' ') : styles.input}
                onBlur={validateEmail}
            /> <br/>
            {isPasswordError && <p className={styles.inputLabel}>Допустимая длина от 8 до 32 символов</p>}
            <input 
                placeholder='Введите пароль' 
                type='password' 
                value={registrationData.password}
                onChange={e => handlePasswordChange(e)}
                className={isPasswordError ? [styles.input, styles.error].join(' ') : styles.input}
                onBlur={validatePassword}
            /> <br/>
            {isNameError && <p className={styles.inputLabel}>Допустимая длина от 2 до 16 символов</p>}
            <input 
                placeholder='Введите имя' 
                type='text' 
                value={registrationData.name}
                onChange={e => handleNameChange(e)}
                className={isNameError ? [styles.input, styles.error].join(' ') : styles.input}
                onBlur={validateName}
            /> <br/>
            {isSurnameError && <p className={styles.inputLabel}>Допустимая длина от 2 до 16 символов</p>}
            <input 
                placeholder='Введите фамилию' 
                type='text' 
                value={registrationData.surname}
                onChange={e => handleSurnameChange(e)}
                className={isSurnameError ? [styles.input, styles.error].join(' ') : styles.input}
                onBlur={validateSurname}
            /> <br/>
            <button type="button" onClick={registrate}>Зарегистрироваться</button>
            <div className={styles.userDontHaveAccount}>
                <span className={styles.userDontHaveAccountLabel}>Уже есть аккаунт?</span>
                <Link to='/auth'>Войти</Link>
            </div>
        </LoginWrap>
    );
};

export default RegistratePage;