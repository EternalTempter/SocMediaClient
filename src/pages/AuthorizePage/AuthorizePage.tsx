import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthorizeMutation } from '../../store/socmedia/users/users.api';
import styles from './AuthorizePage.module.scss';

interface AuthorizePageProps {
    setIsAuth: (state: boolean) => void
}

const AuthorizePage:FC<AuthorizePageProps> = ({setIsAuth}) => {
    const [authorizationData, setAuthorizationData] = useState({email: '', password: ''});
    const [sendAuthorizeQuery, {error, isLoading, data}] = useAuthorizeMutation();

    const navigate = useNavigate();

    function authorize() {
        if(authorizationData.email !== '' && authorizationData.password !== ''){
            sendAuthorizeQuery({email: authorizationData.email, password: authorizationData.password, role: 'USER'})
        }
    }

    useEffect(() => {
        if(data){
            setIsAuth(true);
            localStorage.setItem('token', JSON.stringify(data.token));
            navigate('/')
        }
    }, [data]);

    return (
        <div className={styles.loginMainWrap}>
            <div className={styles.loginWrap}>
                <div className={styles.loginImageHolder}>

                </div>
                <div className={styles.loginHolder}>
                    <div className={styles.logoHolder}></div>
                    {isLoading && <h1>Идет загрузка</h1>}           
                    {error && <h1>Произошла ошибка {(JSON.stringify(error)).slice(33, -3)}</h1>}
                    <p>Войти</p>
                    <input 
                        placeholder='Введите email' 
                        type='text' value={authorizationData.email} 
                        onChange={e => setAuthorizationData({...authorizationData, email: e.target.value})}
                    /> <br/>
                    <input 
                        placeholder='Введите пароль' 
                        type='password' 
                        value={authorizationData.password}
                        onChange={e => setAuthorizationData({...authorizationData, password: e.target.value})}
                    /> <br/>
                    <button type="button" onClick={authorize}>Войти</button>
                    <div className={styles.userDontHaveAccount}>
                        <span className={styles.userDontHaveAccountLabel}>Нет аккаунта?</span>
                        <Link to='/registrate'>Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorizePage;