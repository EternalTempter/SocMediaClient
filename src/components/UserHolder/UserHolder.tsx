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

interface UserHolderProps {
    user_id: string
    isFriend: boolean
}

const UserHolder:FC<UserHolderProps> = ({user_id, isFriend}) => {
    const navigate = useNavigate();

    const [buttonState, setButtonState] = useState('none');

    const mainUser : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {isLoading, isError, data} = useGetAllNotificationsQuery(mainUser.email);

    const {isLoading: isUserLoading, isError: isUserError, data: userData} = useGetUserByEmailQuery(user_id);

    const [sendFriendRequest, {isLoading: isFriendRequestLoading, isError: isFriendRequestError, data: friendRequestData}] = useSendFriendRequestMutation()
    const [sendDeleteFriendRequest, {isLoading: isFriendDeleteRequestLoading, isError: isFriendDeleteRequestError, data: friendDeleteRequestData}] = useDeleteFriendRequestMutation();
    const [sendAcceptFriendRequest, {isLoading: isFriendAcceptRequestLoading, isError: isFriendAcceptRequestError, data: friendAcceptRequestData}] = useAcceptFriendRequestMutation();

    function sendFrindRequestHandler(event, email) {
        event.stopPropagation();
        if(buttonState === 'Написать сообщение') {
            navigate(`/chat?id=${user_id}`);    
        }
        else if(buttonState === 'Добавить в друзья') {
            sendFriendRequest({profile_from: mainUser.email, profile_to: email})
            setButtonState('Запрос отправлен');
        }
        else if(buttonState === 'Запрос отправлен') {
            sendDeleteFriendRequest({profile_from: mainUser.email, profile_to: email})
            setButtonState('Добавить в друзья');
        }
        else {
            sendAcceptFriendRequest({profile_from: email, profile_to: mainUser.email})
            setButtonState('Написать сообщение');

        }
    }

    useEffect(() => {
        if(isFriend) {
            setButtonState('Написать сообщение')
        }
        if(data && userData && !isFriend) {          
            let asdf = data.filter(notification => (notification.profile_to === userData.email || notification.profile_from === userData.email));
            if(asdf.length === 0) 
                setButtonState('Добавить в друзья')
            else if(asdf[0].profile_from === mainUser.email)
                setButtonState('Запрос отправлен')
            else 
                setButtonState('Принять запрос')
        } 
    }, [data, userData])

    return (
        <div className={styles.userHolder} onClick={() => navigate(`/account/${user_id}`)}>
            <div className={styles.userPhoto}></div>
            <div className={styles.userInfo}>
                <p>{userData && userData.name} {userData && userData.surname}</p>
                <div className={styles.userNotesWrap}>
                    <div className={styles.userNote}>Unique case</div>
                    <div className={styles.userNote}>Unique case</div>
                </div>
            </div>
            <div className={styles.addButton} onClick={userData ? event => sendFrindRequestHandler(event, userData.email) : undefined}>
                <p>{buttonState}</p>
                <div>
                    {buttonState === 'Написать сообщение' 
                        ? 
                        <Comment className={styles.addButtonPlus}/>
                        :
                        buttonState === 'Запрос отправлен' 
                        ? 
                        <Angle className={styles.addButtonPlus}/> 
                        :
                        <Plus className={styles.addButtonPlus}/>
                    }
                </div>
            </div>
        </div>        
    );
};

export default UserHolder;