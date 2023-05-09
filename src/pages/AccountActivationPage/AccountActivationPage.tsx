import React, { FC, useEffect } from 'react';
import LoginWrap from '../../components/LoginWrap/LoginWrap';
import styles from './AccountActivationPage.module.scss';
import CheckMark from '../../assets/svg/CheckMark';
import { IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import { useCheckIsActivatedQuery } from '../../store/socmedia/users/users.api';
import { useNavigate } from 'react-router-dom';

interface AccountActivationPageProps {
    setIsActivated: (value: boolean) => void
}

const AccountActivationPage:FC<AccountActivationPageProps> = ({setIsActivated}) => {
    const navigate = useNavigate();

    const {data} = useCheckIsActivatedQuery({email: jwt_decode<IUser>(localStorage.getItem('token') || '').email}, {
        skip: jwt_decode<IUser>(localStorage.getItem('token') || '').is_activated === true,
        pollingInterval: 5000
    });

    useEffect(() => {
        if(data && data !== false) {
            localStorage.setItem('token', JSON.stringify(data.token));
            setIsActivated(true);
            navigate(`/account/${jwt_decode<IUser>(localStorage.getItem('token') || '').email}`)
        }
    }, [data])

    useEffect(() => {
        if(jwt_decode<IUser>(localStorage.getItem('token') || '').is_activated === true) {
            setIsActivated(true);
            navigate(`/account/${jwt_decode<IUser>(localStorage.getItem('token') || '').email}`)
        }
    }, [])

    return (
        <LoginWrap>
            <div className={styles.activateInfo}>
                <CheckMark className={styles.checkMarkIcon}/>
                <h1>Подтведите почту</h1>
                <p>На вашу почту пришло сообщение, перейдите по ссылке в письме чтобы активировать аккаунт.</p>
            </div>
        </LoginWrap>
    );
};

export default AccountActivationPage;