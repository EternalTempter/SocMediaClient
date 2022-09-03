import React, { FC } from 'react';
import { IUser } from '../../models';
import { useGetAllNotificationsQuery } from '../../store/socmedia/friends/friends.api';
import jwt_decode from 'jwt-decode';
import styles from './Notifications.module.scss';
import AddInFriendsNotifications from '../AddInFriendsNotification/AddInFriendsNotifications';

interface NotificationsProps {
    visible: boolean;
    setVisible: (state: boolean) => void;
}

const Notifications:FC<NotificationsProps> = ({visible, setVisible}) => {
    const rootClasses = [styles.notificationsWrap];
    if(visible) {
        rootClasses.push(styles.on);
    }   

    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {isLoading, isError, data} = useGetAllNotificationsQuery(user.email);
    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.notificationsClose} onClick={() => setVisible(false)}></div>
            {data && data.map(item =>          
                (item.profile_from !== user.email) ? <AddInFriendsNotifications key={item.id} notification={item}/> : ''
            )}
        </div>
    );
};

export default Notifications;