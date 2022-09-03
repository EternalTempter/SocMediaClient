import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../models';
import { useGetAllNotificationsQuery } from '../../store/socmedia/friends/friends.api';
import Notifications from '../Notifications/Notifications';
import jwt_decode from 'jwt-decode';
import styles from './Layout.module.scss';

const Layout = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [areNotificationsVisible, setAreNotificationsVisible] = useState(false);

    const {isLoading, isError, data} = useGetAllNotificationsQuery(user.email, {
        pollingInterval: 5000
    });

    return (
        <>
            <Notifications visible={areNotificationsVisible} setVisible={setAreNotificationsVisible}/>
            <nav className={[styles.leftNavbar, styles.navbar].join(' ')}>
                <Link to='/'>
                    <img src=""/>
                    Домой
                </Link>
                <Link to='/messages'>
                    <img src=""/>
                    Сообщения
                </Link>
                <Link to='/news'>
                    <img src=""/>
                    Посты
                </Link>
                    <Link to={['/account/', user.email].join('')}>
                    <img src=""/>
                    Аккаунт
                </Link>
            </nav>
            <nav className={[styles.rightNavbar, styles.navbar].join(' ')}>
                <Link to='/friends'>
                    <img src=""/>
                    Друзья
                </Link>
                <button onClick={() => setAreNotificationsVisible(true)}>{data && data ? 'Уведомления' : 'Новое уведомление'}</button>
                <Link to='/groups'>
                    <img src=""/>
                    Группы
                </Link>
                <Link to='/'>
                    <img src=""/>
                    Затычка
                </Link>
            </nav>
        </>
    );
};

export default Layout;