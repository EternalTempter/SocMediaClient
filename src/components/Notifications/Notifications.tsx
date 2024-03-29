import React, { FC } from 'react';
import { IUser } from '../../models';
import { useGetAllNotificationsQuery } from '../../store/socmedia/friends/friends.api';
import jwt_decode from 'jwt-decode';
import styles from './Notifications.module.scss';
import AddInFriendsNotifications from '../AddInFriendsNotification/AddInFriendsNotifications';
import BackArrow from '../../assets/svg/BackArrow';

interface NotificationsProps {
    visible: boolean;
    setVisible: (state: boolean) => void;
    refetch: () => void
}

const Notifications:FC<NotificationsProps> = ({visible, setVisible, refetch}) => {
    const rootClasses = [styles.notificationsWrap];
    if(visible) {
        rootClasses.push(styles.on);
    }   

    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {isLoading, isError, data, refetch: refetchNotifications} = useGetAllNotificationsQuery(user.email);
    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.notificationsHeader}>
                <p className={styles.label}>Уведомления</p>
                <div 
                    className={styles.notificationsClose} 
                    onClick={() => setVisible(false)}
                >
                    <p>Свернуть</p>   
                    <div>
                        <BackArrow className={styles.notificationsCloseIcon}/>  
                    </div>
                </div>
            </div>
            <div className={styles.notificationsLine}></div>
            {data && data.map(item =>          
                (item.profile_from !== user.email && item.status !== 'REJECTED') 
                    &&
                <AddInFriendsNotifications 
                    key={item.id} 
                    refetch={refetch} 
                    setVisible={setVisible} 
                    notification={item}
                    refetchNotifications={refetchNotifications}
                />
            )}
        </div>
    );
};

export default Notifications;