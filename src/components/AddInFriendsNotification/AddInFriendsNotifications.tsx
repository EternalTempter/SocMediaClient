import React, { FC } from 'react';
import { IAddInFriendsNotification, IUser } from '../../models';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import jwt_decode from 'jwt-decode';
import styles from './AddInFriendsNotifications.module.scss';
import { useAcceptFriendRequestMutation, useRejectFriendRequestMutation } from '../../store/socmedia/friends/friends.api';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import CheckMark from '../../assets/svg/CheckMark';
import Plus from '../../assets/svg/Plus';

interface AddInFriendsNotificationsProps {
    notification: IAddInFriendsNotification
}

const AddInFriendsNotifications:FC<AddInFriendsNotificationsProps> = ({notification}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {isError, isLoading, data} = useGetUserByEmailQuery(notification.profile_from)
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userData} = useGetUserDataQuery(notification.profile_from);
    const [acceptFriendRequest, {isError: isFriendRequestError, isLoading: isFriendRequestLoading, data: friendRequestData}] = useAcceptFriendRequestMutation();
    const [rejectFriendRequest, {isError: isRejectError, isLoading: isRejectLoading, data: rejectData}] = useRejectFriendRequestMutation();
    return (
        <div className={styles.notification}>
            <div>
                <div className={styles.image}>
                    {(userData && userData.image !== 'none') &&
                        <img src={'http://localhost:5000/' + userData.image}/>
                    }
                </div>
                <p>{data?.name} {data?.surname} хочет добавить вас в друзья</p>
            </div>
            <div>
                <div onClick={() => acceptFriendRequest({profile_from: data?.email, profile_to: user.email})}>
                    <CheckMark className={styles.checkMark}/>
                </div>
                <div onClick={() => rejectFriendRequest({profile_from: data?.email, profile_to: user.email})} className={styles.declineWrap}>
                    <Plus className={styles.decline}/>
                </div>
            </div>
        </div>
    );
};

export default AddInFriendsNotifications;