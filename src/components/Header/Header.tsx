import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/Logo';
import styles from './Header.module.scss';
import BurgerMenu from '../../assets/svg/BurgerMenu';

interface HeaderProps {
    openMobileMenuHandler: () => void
}

const Header:FC<HeaderProps> = ({openMobileMenuHandler}) => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Logo className={styles.logoIcon}/>
                <p>Ellentair</p>
            </div>
            <div className={styles.login}>
                <Link 
                    to='/auth' 
                    className={styles.login}
                >
                    Войти
                </Link>
                <Link 
                    to='/registration' 
                    className={styles.register}
                >
                    Зарегистрироваться
                </Link>
                <div onClick={() => openMobileMenuHandler()}>
                    <BurgerMenu className={styles.burgerMenuIcon}/>
                </div>
            </div>
        </div>
    );
};

export default Header;