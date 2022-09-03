import React, { FC, useEffect, useState } from 'react';
import { useRegistrateMutation } from '../../store/socmedia/users/users.api';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegistratePage.module.scss';
import { useLazySetDefaultUserDataQuery } from '../../store/socmedia/userData/userData.api';

interface RegistratePageProps {
    setIsAuth: (state: boolean) => void
}

const RegistratePage:FC<RegistratePageProps> = ({setIsAuth}) => {
    const navigate = useNavigate();

    const [registrationData, setRegistrationData] = useState({email: '', password: '', name: '', surname: ''});
    const [sendRegistrateQuery, {isLoading, data, error}] = useRegistrateMutation();
    const [setDefaultUserData, {isLoading: isUserDataLoading, data: userData, isError: isUserDataError}] = useLazySetDefaultUserDataQuery();

    function registrate() {
        if(registrationData.email !== '' && registrationData.password !== '' && registrationData.name !== '' && registrationData.surname !== ''){
            sendRegistrateQuery({
                email: registrationData.email,
                password: registrationData.password, 
                role: 'USER', 
                name: registrationData.name, 
                surname: registrationData.surname
            });
            setDefaultUserData(registrationData.email);
        }
    }
    useEffect(() => {
        if(data) {
            setIsAuth(true);
            localStorage.setItem('token', JSON.stringify(data.token));
            navigate('/');
        }
    }, [data]);
    return (
                <div className={styles.loginWrap}>
                <div className={styles.loginImageHolder}>
    
                </div>
                <div className={styles.loginHolder}>
                    <div className={styles.logoHolder}></div>
                    {isLoading && <h1>Идет загрузка</h1>}           
                    {error && <h1>Произошла ошибка {(JSON.stringify(error)).slice(33, -3)}</h1>}
                    <p>Регистрация</p>
                    <input
                        placeholder='Введите email' 
                        type='text' value={registrationData.email} 
                        onChange={e => setRegistrationData({...registrationData, email: e.target.value})}
                    /> <br/>
                    <input 
                        placeholder='Введите пароль' 
                        type='password' 
                        value={registrationData.password}
                        onChange={e => setRegistrationData({...registrationData, password: e.target.value})}
                    /> <br/>
                    <input 
                        placeholder='Введите имя' 
                        type='text' 
                        value={registrationData.name}
                        onChange={e => setRegistrationData({...registrationData, name: e.target.value})}
                    /> <br/>
                    <input 
                        placeholder='Введите фамилию' 
                        type='text' 
                        value={registrationData.surname}
                        onChange={e => setRegistrationData({...registrationData, surname: e.target.value})}
                    /> <br/>
                    <button type="button" onClick={registrate}>Зарегистрироваться</button>
                    <div className={styles.userDontHaveAccount}>
                        <span className={styles.userDontHaveAccountLabel}>Уже есть аккаунт?</span>
                        <Link to='/auth'>Войти</Link>
                    </div>
                </div>
            </div>
    );
};

export default RegistratePage;