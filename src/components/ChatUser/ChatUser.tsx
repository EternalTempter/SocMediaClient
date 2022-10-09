import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../envVariables/variables';
import { IUser } from '../../models';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import styles from './ChatUser.module.scss';

interface ChatUserProps {
    userId: string
    type: string
}

const ChatUser:FC<ChatUserProps> = ({userId, type}) => {
    const navigate = useNavigate();
    const {isError: isUserError, isLoading: isUserLoading, data: userData} = useGetUserByEmailQuery(userId);
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userAdditionalData} = useGetUserDataQuery(userId);
    return (
        <div className={type === 'LEFT_SIDE' ? styles.leftChatUser : styles.rightChatUser}>
            <div className={styles.chatUserOutline} onClick={() => navigate(`/account/${userId}`)}>
                <div className={styles.chatUserImage}>
                    {
                        (userAdditionalData && userAdditionalData.image !== 'none') 
                            &&
                        <img src={baseUrl + userAdditionalData.image}/>
                    }
                </div>
            </div>
            <p onClick={() => navigate(`/account/${userId}`)}>{userData && userData.name} {userData && userData.surname}</p>
        </div>
    );
};

export default ChatUser;