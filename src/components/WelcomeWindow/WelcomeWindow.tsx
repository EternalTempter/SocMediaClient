import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomeWindow.module.scss';

const WelcomeWindow = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.homePageContentHello}>
            <div className={styles.logo}></div>
            <p className={styles.label}>Начните изучать возможности Сети уже сейчас!</p>
            <div className={styles.findFriends}>
                <div>
                    <img src={require('../../assets/images/people.png')}/>
                </div>
                <p>Заводи знакомства, общайся и делись впечатлениями</p>
                <button onClick={() => navigate(`/friends`)}>Искать друзей</button>
            </div>
            <div className={styles.findGroups}>
                <div>
                    <img src={require('../../assets/images/people2.png')}/>
                </div>
                <p>Собирай группы по интересам и приглашай людей</p>
                <button onClick={() => navigate(`/groups`)}>Смотреть сообщества</button>
            </div>
        </div>
    );
};

export default WelcomeWindow;