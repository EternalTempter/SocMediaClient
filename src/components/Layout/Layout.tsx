import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../models';
import { useGetAllNotificationsQuery } from '../../store/socmedia/friends/friends.api';
import Notifications from '../Notifications/Notifications';
import jwt_decode from 'jwt-decode';
import styles from './Layout.module.scss';
import Chat from '../../assets/svg/Chat';
import News from '../../assets/svg/News';
import Account from '../../assets/svg/Account';
import Friends from '../../assets/svg/Friends';
import Group from '../../assets/svg/Group';
import NotificationsSvg from '../../assets/svg/NotificationsSvg';
import Menu from '../Menu/Menu';
import BurgerMenu from '../../assets/svg/BurgerMenu';

interface LayoutProps {
    setIsAuth: (state: boolean) => void
}

const Layout:FC<LayoutProps> = ({setIsAuth}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    const [areNotificationsVisible, setAreNotificationsVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const {isLoading, isError, data, refetch} = useGetAllNotificationsQuery(user.email, {
        pollingInterval: 5000
    });

    function close() {
        setIsMenuVisible(false)
        setAreNotificationsVisible(false)
    }

    function logoutHandler() {
        setIsAuth(false);
        localStorage.removeItem('token');
        navigate('/auth');
    }

    return (
        <>
            <Notifications visible={areNotificationsVisible} setVisible={setAreNotificationsVisible} refetch={refetch}/>
            <Menu close={close} visible={isMenuVisible} setVisible={setIsMenuVisible} logoutHandler={logoutHandler}/>
            <div className={styles.mobileViewNavBar}>
                <Link to='/news' onClick={close}>
                    <News className={styles.news}/>
                </Link>
                <Link to='/friends' onClick={close}>
                    <Friends className={styles.friends}/>
                </Link>
                <Link to='/messages' onClick={close}>
                    <Chat className={styles.chat}/>
                </Link>
                <div onClick={() => setAreNotificationsVisible(true)}>
                    {data && data.filter(elem => elem.profile_to === user.email && elem.status !== 'REJECTED').length > 0 ? 
                        <NotificationsSvg className={styles.notifications} secondClassName={styles.active}/>
                        : 
                        <NotificationsSvg className={styles.notifications}/> 
                    }
                </div>
                <div onClick={() => setIsMenuVisible(true)} className={styles.burgerMenu}>
                    <BurgerMenu className={styles.burgerMenu}/>
                </div>
            </div>
            <nav className={[styles.leftNavbar, styles.navbar].join(' ')}>
                <Link to='/'>
                    <img src=""/>
                    Лого
                </Link>
                <Link to='/messages'>
                    <Chat className={styles.chat}/>
                </Link>
                <Link to='/news'>
                    <News className={styles.news}/>
                </Link>
                <Link to={['/account/', user.email].join('')}>
                    <Account className={styles.account}/>
                </Link>
            </nav>
            <nav className={[styles.rightNavbar, styles.navbar].join(' ')}>
                <Link to='/friends'>
                    <Friends className={styles.friends}/>
                </Link>
                <div onClick={() => setAreNotificationsVisible(true)}>
                    {data && data.filter(elem => elem.profile_to === user.email && elem.status !== 'REJECTED').length > 0 ? 
                        <NotificationsSvg className={styles.notifications} secondClassName={styles.active}/>
                        : 
                        <NotificationsSvg className={styles.notifications}/> 
                    }
                </div>
                <Link to='/groups'>
                    <Group className={styles.group}/>
                </Link>
                <Link to='/about'>
                    <img src=""/>
                    О проекте
                </Link>
            </nav>
        </>
    );
};

export default Layout;