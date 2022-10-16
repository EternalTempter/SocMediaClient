import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Account from '../../assets/svg/Account';
import Group from '../../assets/svg/Group';
import { IUser } from '../../models';
import styles from './Menu.module.scss';
import jwt_decode from 'jwt-decode';
import Report from '../../assets/svg/Report';
import Logo from '../../assets/svg/Logo';
import Home from '../../assets/svg/Home';

interface MenuProps {
    visible: boolean
    setVisible: (value: boolean) => void
    close: () => void
    logoutHandler: () => void
}

const Menu:FC<MenuProps> = ({visible, setVisible, close, logoutHandler}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const rootClasses = [styles.menuWrap];
    if(visible) {
        rootClasses.push(styles.on);
    } 

    function redirect() {
        close();
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.menuHeader}>
                <div className={styles.logoWrap}>
                    <Logo className={styles.logo}/>
                </div>
                <button className={styles.logoutButton} onClick={logoutHandler}>Выйти</button>              
            </div>
            <Link to='/' onClick={redirect}>
                <Home className={styles.home}/>
                <p>Главная</p>
            </Link>
            <Link to={['/account/', user.email].join('')} onClick={redirect}>
                <Account className={styles.account}/>
                <p>Мой профиль</p>
            </Link>
            <Link to='/groups' onClick={redirect}>
                <Group className={styles.group}/>
                <p>Группы</p>
            </Link>
            <Link to='/about' onClick={redirect}>
                <Report className={styles.about}/>
                <p>О проекте</p>
            </Link>
        </div>
    );
};

export default Menu;