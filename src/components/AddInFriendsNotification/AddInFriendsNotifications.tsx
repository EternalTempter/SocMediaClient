import React, { FC } from 'react';
import { IAddInFriendsNotification, IUser } from '../../models';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import jwt_decode from 'jwt-decode';
import styles from './AddInFriendsNotifications.module.scss';
import { useAcceptFriendRequestMutation, useRejectFriendRequestMutation } from '../../store/socmedia/friends/friends.api';

interface AddInFriendsNotificationsProps {
    notification: IAddInFriendsNotification
}

const AddInFriendsNotifications:FC<AddInFriendsNotificationsProps> = ({notification}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {isError, isLoading, data} = useGetUserByEmailQuery(notification.profile_from)
    const [acceptFriendRequest, {isError: isFriendRequestError, isLoading: isFriendRequestLoading, data: friendRequestData}] = useAcceptFriendRequestMutation();
    const [rejectFriendRequest, {isError: isRejectError, isLoading: isRejectLoading, data: rejectData}] = useRejectFriendRequestMutation();
    return (
        <div className={styles.notification}>
            <p>Пользователь {data?.name} {data?.surname} хочет добавить вас в друзья</p>
            <button onClick={() => acceptFriendRequest({profile_from: data?.email, profile_to: user.email})}>Добавить</button>
            <button onClick={() => rejectFriendRequest({profile_from: data?.email, profile_to: user.email})}>Отклонить</button>
        </div>
    );
};

export default AddInFriendsNotifications;