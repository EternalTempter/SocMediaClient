import React, { FC, useEffect, useState } from 'react';
import { IUser } from '../../models';
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
import SkeletonLoader from '../UI/SkeletonLoader/SkeletonLoader';
import { ToastContainer } from 'react-toastify';
import { notifyError } from '../../helpers/helpers';
import SavingChangesHolder from '../UI/SavingChangesHolder/SavingChangesHolder';

interface UserHolderProps {
    user_id: string
    isFriend: boolean
}

const UserHolder:FC<UserHolderProps> = ({user_id, isFriend}) => {
    const navigate = useNavigate();

    const [buttonState, setButtonState] = useState('none');

    const mainUser : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {isLoading: isUserDataLoading, data: userData} = useGetUserDataQuery(user_id);
    const {isLoading, data} = useGetAllNotificationsQuery(mainUser.email);

    const {isLoading: isUserLoading, data: user} = useGetUserByEmailQuery(user_id);

    const [sendFriendRequest, {isLoading: isFriendRequestLoading, isError: isFriendRequestError, data: friendRequestData}] = useSendFriendRequestMutation()
    const [sendDeleteFriendRequest, {isLoading: isFriendDeleteRequestLoading, isError: isFriendDeleteRequestError, data: friendDeleteRequestData}] = useDeleteFriendRequestMutation();
    const [sendAcceptFriendRequest, {isLoading: isFriendAcceptRequestLoading, isError: isFriendAcceptRequestError, data: friendAcceptRequestData}] = useAcceptFriendRequestMutation();

    function sendFrindRequestHandler(event, email) {
        event.stopPropagation();
        if(!isFriendRequestLoading && !isFriendDeleteRequestLoading && !isFriendAcceptRequestLoading) {
            if(buttonState === 'Написать сообщение') {
                navigate(`/chat?id=${user_id}`);    
            }
            else if(buttonState === 'Добавить в друзья') {
                sendFriendRequest({profile_from: mainUser.email, profile_to: email})
            }
            else if(buttonState === 'Запрос отправлен') {
                sendDeleteFriendRequest({profile_from: mainUser.email, profile_to: email})
            }
            else {
                sendAcceptFriendRequest({profile_from: email, profile_to: mainUser.email})
            }
        }
    }

    function getRole(role) {
        if(role === 'USER') return 'Пользователь' 
        else if(role === 'OWNER') return 'Владелец' 
        else if(role === 'ADMIN') return 'Администратор' 
        else return 'VIP пользователь' 
    }

    useEffect(() => {
        if(isFriend) {
            setButtonState('Написать сообщение')
        }
        if(data && user && !isFriend) {    
            let asdf = data.filter(notification => (notification.profile_to === user.email || notification.profile_from === user.email));
            if(asdf.length === 0) 
                setButtonState('Добавить в друзья')
            else if(asdf[0].profile_from === mainUser.email)
                setButtonState('Запрос отправлен')
            else 
                setButtonState('Принять запрос')
        } 
    }, [data, user])

    useEffect(() => {
        if(friendRequestData) setButtonState('Запрос отправлен');
    }, [friendRequestData])

    useEffect(() => {
        if(friendDeleteRequestData) setButtonState('Добавить в друзья');
    }, [friendDeleteRequestData])

    useEffect(() => {
        if(friendAcceptRequestData) {
            setButtonState('Написать сообщение');

        }
    }, [friendAcceptRequestData])

    useEffect(() => {
        if(isFriendRequestError) notifyError('Произошла ошибка при отправке запроса')
    }, [isFriendRequestError])

    useEffect(() => {
        if(isFriendDeleteRequestError) setButtonState('Произошла ошибка при удалении запроса');
    }, [isFriendDeleteRequestError])

    useEffect(() => {
        if(isFriendAcceptRequestError) setButtonState('Произошла ошибка при принятии запроса');
    }, [isFriendAcceptRequestError])

    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className={styles.toast}
        />
        {isFriendRequestLoading && 
            <SavingChangesHolder label="Отправка запроса"/>
        }
        {isFriendDeleteRequestLoading &&   
            <SavingChangesHolder label="Удаление запроса"/>
        }
        {isFriendAcceptRequestLoading && 
            <SavingChangesHolder label="Принятие запроса"/>
        }
            <div 
                className={styles.userHolder} 
                onClick={() => navigate(`/account/${user_id}`)}
            >
                <div className={styles.userPhoto}>
                    {isUserDataLoading &&
                        <SkeletonLoader borderRadius={999}/>
                    }
                    {(userData && userData.image !== 'none') &&
                        <img src={baseUrl + userData.image}/>
                    }
                </div>
                <div className={styles.userInfo}>
                    {isUserLoading &&
                        <div className={styles.skeleton}>
                            <SkeletonLoader borderRadius={5}/>
                        </div>
                    }
                    {!isUserLoading &&
                        <p>{user && user.name} {user && user.surname}</p>
                    }
                    <div className={styles.userNotesWrap}>
                        {isUserLoading &&
                            <div className={[styles.userNote, styles.skeleton].join(' ')}>
                                <SkeletonLoader borderRadius={5}/>
                            </div>
                        }
                        {!isUserLoading &&
                            <div className={styles.userNote}>
                                {user && getRole(user.role)}
                            </div>
                        }
                    </div>
                </div>
                {(isLoading || isUserLoading) &&
                    <div className={[styles.addButton, styles.skeleton].join(' ')}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {!isLoading && !isUserLoading &&
                    <div 
                        className={styles.addButton}
                        onClick={user ? event => sendFrindRequestHandler(event, user.email) : undefined}
                    >
                        <p>{buttonState}</p>
                        <div>
                            {buttonState === 'Написать сообщение' && <Comment className={styles.addButtonPlus}/>}
                            {buttonState === 'Запрос отправлен' && <Angle className={styles.addButtonPlus}/>}
                            {buttonState === 'Добавить в друзья' && <Plus className={styles.addButtonPlus}/>}
                            {buttonState === 'Принять запрос' && <CheckMark className={styles.addButtonPlus}/>}
                        </div>
                    </div>
                }
            </div>   
        </>     
    );
};

export default UserHolder;