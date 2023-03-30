import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ExtendedLogo from '../../assets/svg/ExtendedLogo';
import Friends from '../../assets/svg/Friends';
import Group from '../../assets/svg/Group'; 
import styles from './WelcomeWindow.module.scss';

interface WelcomeWindowProps {
    setIsWelcomeWindowVisible: (value: boolean) => void
}

const WelcomeWindow:FC<WelcomeWindowProps> = ({setIsWelcomeWindowVisible}) => {
    const navigate = useNavigate();

    function locateFriendsPageHandler() {
        setIsWelcomeWindowVisible(false);
        navigate(`/friends`);
    }

    function locateGroupsPageHandler() {
        setIsWelcomeWindowVisible(false);
        navigate(`/groups`);
    }
    return (
        <div className={styles.welcomeWrap}>
            <div className={styles.homePageContentHello}>
                <div className={styles.header}>
                    <p className={styles.welcome}>Добро пожаловать в <span>Ellentair</span></p>
                    <div className={styles.logo}>
                        <ExtendedLogo className={styles.logoIcon}/>
                    </div>
                </div>
                <p className={styles.label}>Начните изучать возможности Сети уже сейчас!</p>
                <div className={styles.body}>
                    <div className={styles.findFriends}>
                        <div className={styles.findFriendsInfo}>
                            <div>
                                <Friends className={styles.friendsIcon}/>
                            </div>
                            <p>Заводи знакомства, общайся и делись впечатлениями</p>
                        </div>
                        <button onClick={locateFriendsPageHandler}>Искать друзей</button>
                    </div>
                    <div className={styles.findGroups}>
                        <div className={styles.findGroupsInfo}>
                            <div>
                                <Group className={styles.groupIcon}/>
                            </div>
                            <p>Собирай группы по интересам и приглашай людей</p>
                        </div>
                        <button onClick={locateGroupsPageHandler}>Искать сообщества</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeWindow;