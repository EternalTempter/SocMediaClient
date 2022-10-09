import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Account from '../../assets/svg/Account';
import Group from '../../assets/svg/Group';
import { IUser } from '../../models';
import styles from './Menu.module.scss';
import jwt_decode from 'jwt-decode';

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
            <Link to='/' onClick={redirect}>
                <img src=""/>
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
                <img src=""/>
                <p>О проекте</p>
            </Link>
            <button className={styles.logoutButton} onClick={logoutHandler}>Выйти</button>
        </div>
    );
};

export default Menu;