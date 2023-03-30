import React, { FC } from 'react';
import { IAddInFriendsNotification, IUser } from '../../models';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import jwt_decode from 'jwt-decode';
import styles from './AddInFriendsNotifications.module.scss';
import { useAcceptFriendRequestMutation, useRejectFriendRequestMutation } from '../../store/socmedia/friends/friends.api';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import CheckMark from '../../assets/svg/CheckMark';
import Plus from '../../assets/svg/Plus';
import { baseUrl } from '../../envVariables/variables';
import { useNavigate } from 'react-router-dom';

interface AddInFriendsNotificationsProps {
    notification: IAddInFriendsNotification
    setVisible: (value: boolean) => void
    refetch: () => void
    refetchNotifications: () => void
}

const AddInFriendsNotifications:FC<AddInFriendsNotificationsProps> = ({notification, setVisible, refetch, refetchNotifications}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    const {isError, isLoading, data} = useGetUserByEmailQuery(notification.profile_from)
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userData} = useGetUserDataQuery(notification.profile_from);
    const [acceptFriendRequest, {isError: isFriendRequestError, isLoading: isFriendRequestLoading, data: friendRequestData}] = useAcceptFriendRequestMutation();
    const [rejectFriendRequest, {isError: isRejectError, isLoading: isRejectLoading, data: rejectData}] = useRejectFriendRequestMutation();

    function sendToUserAccount() {
        navigate(`/account/${notification.profile_from}`);
        setVisible(false);
    }

    function acceptRequest() {
        acceptFriendRequest({profile_from: data?.email, profile_to: user.email})
        refetch();
        refetchNotifications();
    }

    function rejectRequest() {
        rejectFriendRequest({profile_from: data?.email, profile_to: user.email})
        refetch();
        refetchNotifications();
    }

    return (
        <div className={styles.notification}>
            <div onClick={sendToUserAccount}>
                <div className={styles.image}>
                    {(userData && userData.image !== 'none') &&
                        <img src={baseUrl + userData.image}/>
                    }
                </div>
                <p><span>{data?.name} {data?.surname}</span> хочет добавить вас в друзья</p>
            </div>
            <div>
                <div onClick={acceptRequest} className={styles.checkMarkWrap}>
                    <CheckMark className={styles.checkMark}/>
                </div>
                <div onClick={rejectRequest} className={styles.declineWrap}>
                    <Plus className={styles.decline}/>
                </div>
            </div>
        </div>
    );
};

export default AddInFriendsNotifications;