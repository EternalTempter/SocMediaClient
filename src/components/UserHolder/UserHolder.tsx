import React, { FC, useEffect, useRef, useState } from 'react';
import { IUser, IFriend } from '../../models';
import { useAcceptFriendRequestMutation, useDeleteFriendRequestMutation, useGetAllNotificationsQuery, useSendFriendRequestMutation } from '../../store/socmedia/friends/friends.api';
import jwt_decode from 'jwt-decode';
import styles from './UserHolder.module.scss'
import Plus from '../../assets/svg/Plus';
import Angle from '../../assets/svg/Angle';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import Comment from '../../assets/svg/Comment';
import { useNavigate } from 'react-router-dom';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import { baseUrl } from "../../envVariables/variables";
import CheckMark from '../../assets/svg/CheckMark';

interface UserHolderProps {
    user_id: string
    isFriend: boolean
}

const UserHolder:FC<UserHolderProps> = ({user_id, isFriend}) => {
    const navigate = useNavigate();

    const [buttonState, setButtonState] = useState('none');

    const mainUser : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userData} = useGetUserDataQuery(user_id);
    const {isLoading, isError, data} = useGetAllNotificationsQuery(mainUser.email);

    const {isLoading: isUserLoading, isError: isUserError, data: user} = useGetUserByEmailQuery(user_id);

    const [sendFriendRequest, {isLoading: isFriendRequestLoading, isError: isFriendRequestError, data: friendRequestData}] = useSendFriendRequestMutation()
    const [sendDeleteFriendRequest, {isLoading: isFriendDeleteRequestLoading, isError: isFriendDeleteRequestError, data: friendDeleteRequestData}] = useDeleteFriendRequestMutation();
    const [sendAcceptFriendRequest, {isLoading: isFriendAcceptRequestLoading, isError: isFriendAcceptRequestError, data: friendAcceptRequestData}] = useAcceptFriendRequestMutation();

    function sendFrindRequestHandler(event, email) {
        event.stopPropagation();
        if(buttonState === '???????????????? ??????????????????') {
            navigate(`/chat?id=${user_id}`);    
        }
        else if(buttonState === '???????????????? ?? ????????????') {
            sendFriendRequest({profile_from: mainUser.email, profile_to: email})
            setButtonState('???????????? ??????????????????');
        }
        else if(buttonState === '???????????? ??????????????????') {
            sendDeleteFriendRequest({profile_from: mainUser.email, profile_to: email})
            setButtonState('???????????????? ?? ????????????');
        }
        else {
            sendAcceptFriendRequest({profile_from: email, profile_to: mainUser.email})
            setButtonState('???????????????? ??????????????????');

        }
    }

    function getRole(role) {
        if(role === 'USER') return '????????????????????????' 
        else if(role === 'OWNER') return '????????????????' 
        else return 'VIP ????????????????????????' 
    }

    useEffect(() => {
        if(isFriend) {
            setButtonState('???????????????? ??????????????????')
        }
        if(data && user && !isFriend) {    
            let asdf = data.filter(notification => (notification.profile_to === user.email || notification.profile_from === user.email));
            if(asdf.length === 0) 
                setButtonState('???????????????? ?? ????????????')
            else if(asdf[0].profile_from === mainUser.email)
                setButtonState('???????????? ??????????????????')
            else 
                setButtonState('?????????????? ????????????')
        } 
    }, [data, user])

    return (
        <div className={styles.userHolder} onClick={() => navigate(`/account/${user_id}`)}>
            <div className={styles.userPhoto}>
                {(userData && userData.image !== 'none') &&
                    <img src={baseUrl + userData.image}/>
                }
            </div>
            <div className={styles.userInfo}>
                <p>{user && user.name} {user && user.surname}</p>
                <div className={styles.userNotesWrap}>
                    <div className={styles.userNote}>{user && getRole(user.role)}</div>
                </div>
            </div>
            <div className={styles.addButton} onClick={user ? event => sendFrindRequestHandler(event, user.email) : undefined}>
                <p>{buttonState}</p>
                <div>
                    {buttonState === '???????????????? ??????????????????' && <Comment className={styles.addButtonPlus}/>}
                    {buttonState === '???????????? ??????????????????' && <Angle className={styles.addButtonPlus}/>}
                    {buttonState === '???????????????? ?? ????????????' && <Plus className={styles.addButtonPlus}/>}
                    {buttonState === '?????????????? ????????????' && <CheckMark className={styles.addButtonPlus}/>}
                </div>
            </div>
        </div>        
    );
};

export default UserHolder;