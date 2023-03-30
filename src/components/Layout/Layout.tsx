import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
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
import Question from '../../assets/svg/Question';
import { useCheckForNewMessagesQuery } from '../../store/socmedia/messages/messages.api';
import Logo from '../../assets/svg/Logo';
import Exit from '../../assets/svg/Exit';
import WelcomeWindow from '../WelcomeWindow/WelcomeWindow';
import Options from '../../assets/svg/Options';

interface LayoutProps {
    setIsAuth: (state: boolean) => void
    isWelcomeWindowVisible: boolean
    setIsWelcomeWindowVisible: (value: boolean) => void
}

const Layout:FC<LayoutProps> = ({setIsAuth, isWelcomeWindowVisible, setIsWelcomeWindowVisible}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    const location = useLocation();

    const [areNotificationsVisible, setAreNotificationsVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isHiddenMobileViewNavBar, setIsHiddenMobileViewNavBar] = useState(false);

    const {isLoading, isError, data, refetch} = useGetAllNotificationsQuery(user.email, {
        pollingInterval: 5000
    });

    const {isLoading: isNewMessagesLoading, isError: isNewMessagesError, data: newMessagesData} = useCheckForNewMessagesQuery(user.email, {
        pollingInterval: 750
    })

    function close() {
        setIsMenuVisible(false)
        setAreNotificationsVisible(false)
        if(isWelcomeWindowVisible) setIsWelcomeWindowVisible(false);
    }

    function closeWelcomeWindow() {
        if(isWelcomeWindowVisible) setIsWelcomeWindowVisible(false);
    }

    function logoutHandler() {
        if(isWelcomeWindowVisible) setIsWelcomeWindowVisible(false);
        setIsAuth(false);
        localStorage.removeItem('token');
        navigate('/auth');
    }

    useEffect(() => {
        if(location && location.pathname === '/chat') setIsHiddenMobileViewNavBar(true)
        else setIsHiddenMobileViewNavBar(false)
    }, [location])

    return (
        <>
        {isWelcomeWindowVisible && 
            <WelcomeWindow setIsWelcomeWindowVisible={setIsWelcomeWindowVisible}/>
        }
            <Notifications 
                visible={areNotificationsVisible} 
                setVisible={setAreNotificationsVisible} 
                refetch={refetch}
            />
            <Menu 
                close={close} 
                visible={isMenuVisible} 
                setVisible={setIsMenuVisible} 
                logoutHandler={logoutHandler}
            />
            <div className={isHiddenMobileViewNavBar 
                    ? 
                        [styles.mobileViewNavBar, styles.off].join(' ') 
                    :
                        styles.mobileViewNavBar
                }>
                <Link to='/news' onClick={close}>
                    <News className={styles.news}/>
                </Link>
                <Link to='/friends' onClick={close}>
                    <Friends className={styles.friends}/>
                </Link>
                <Link to='/messages' onClick={close} className={styles.chatWrap}>
                    <Chat className={styles.chat}/>
                    {newMessagesData && newMessagesData && <div className={styles.newMessages}></div>}
                </Link>
                <div onClick={
                    () => areNotificationsVisible 
                        ? 
                    setAreNotificationsVisible(false) 
                        : 
                    setAreNotificationsVisible(true)
                }>
                    {data && data.filter(elem => elem.profile_to === user.email && elem.status !== 'REJECTED').length > 0 ? 
                        <NotificationsSvg className={styles.notifications} secondClassName={styles.active}/>
                        : 
                        <NotificationsSvg className={styles.notifications}/> 
                    }
                </div>
                <div onClick={() => isMenuVisible ? setIsMenuVisible(false) : setIsMenuVisible(true)} 
                    className={styles.burgerMenu}
                >
                    <BurgerMenu className={styles.burgerMenu}/>
                </div>
            </div>
            <nav className={[styles.leftNavbar, styles.navbar].join(' ')}>
                <Link 
                    to='/' 
                    className={styles.logoWrap} 
                    onClick={closeWelcomeWindow}
                >
                    <Logo className={styles.logo}/>
                </Link>
                <Link 
                    to='/news' 
                    className={styles.newsWrap} 
                    onClick={closeWelcomeWindow}
                >
                    <News className={styles.news}/>
                </Link>
                <Link 
                    to='/messages' 
                    className={styles.chatWrap} 
                    onClick={closeWelcomeWindow}
                >
                    <Chat className={styles.chat}/>
                    {newMessagesData && newMessagesData && <div className={styles.newMessages}/>}
                </Link>
                <Link 
                    to='/friends' 
                    className={styles.friendsWrap} 
                    onClick={closeWelcomeWindow}
                >
                    <Friends className={styles.friends}/>
                </Link>
                <Link 
                    to='/groups' 
                    className={styles.groupWrap} 
                    onClick={closeWelcomeWindow}
                >
                    <Group className={styles.group}/>
                </Link>
                <div 
                    onClick={() => areNotificationsVisible ? setAreNotificationsVisible(false) : setAreNotificationsVisible(true)}
                    className={styles.chatWrap} 
                >
                    <NotificationsSvg className={styles.notifications}/> 
                    {data && data.filter(elem => elem.profile_to === user.email && elem.status !== 'REJECTED').length > 0 &&
                        <div className={styles.newMessages}/>
                    }
                </div>
                <Link 
                    to={['/account/', user.email].join('')} 
                    className={styles.accountWrap} 
                    onClick={closeWelcomeWindow}
                >
                    <Account className={styles.account}/>
                </Link>
            </nav>
            <nav className={[styles.rightNavbar, styles.navbar].join(' ')}>
                <Link 
                    to='/' 
                    className={styles.exitWrap}
                    onClick={closeWelcomeWindow}
                >
                    <Options className={styles.exit}/>
                </Link>
                <Link 
                    to='/auth' 
                    className={styles.exitWrap}
                    onClick={() => logoutHandler()}
                >
                    <Exit className={styles.exit}/>
                </Link>
                <Link 
                    to='/about' 
                    className={styles.aboutWrap} 
                    onClick={closeWelcomeWindow}
                >
                    <Question className={styles.about}/>
                </Link>
            </nav>
        </>
    );
};

export default Layout;