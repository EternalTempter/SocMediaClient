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
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import { baseUrl } from '../../envVariables/variables';
import Options from '../../assets/svg/Options';
import Exit from '../../assets/svg/Exit';

interface MenuProps {
    visible: boolean
    setVisible: (value: boolean) => void
    close: () => void
    logoutHandler: () => void
}

const Menu:FC<MenuProps> = ({visible, setVisible, close, logoutHandler}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const {isError, isLoading, data} = useGetUserDataQuery(user.email); 

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
                <div>
                    <img src={data && baseUrl + data.image}/>
                </div>
                <p>{user.name} {user.surname}</p>   
                {/* <button className={styles.logoutButton} onClick={logoutHandler}>Выйти</button>               */}
            </div>
            <Link to={['/account/', user.email].join('')} onClick={redirect}>
                <Account className={styles.account}/>
                <p>Мой профиль</p>
            </Link>
            <Link to='/' onClick={redirect}>
                <Logo className={styles.logo}/>
                <p>Новости</p>
            </Link>
            <Link to='/groups' onClick={redirect}>
                <Group className={styles.group}/>
                <p>Группы</p>
            </Link>
            <Link to='/about' onClick={redirect}>
                <Report className={styles.about}/>
                <p>О проекте</p>
            </Link>
            <Link to='/' onClick={redirect}>
                <Options className={styles.settings}/>
                <p>Настройки</p>
            </Link>
            <Link to='' onClick={logoutHandler}>
                <Exit className={styles.exit}/>
                <p>Выйти</p>
            </Link>
        </div>
    );
};

export default Menu;