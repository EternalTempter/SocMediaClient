import React, { FC } from 'react';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import jwt_decode from 'jwt-decode';
import { IInbox, IUser } from '../../models';
import { useNavigate } from 'react-router-dom';
import styles from './MessageBoxItem.module.scss';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';

interface MessageBoxItemProps {
    inbox: IInbox
}

const MessageBoxItem:FC<MessageBoxItemProps> = ({inbox}) => {    
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userData} = useGetUserDataQuery(inbox.inbox_sender_user_id !== user.email ? inbox.inbox_sender_user_id : inbox.inbox_holder_user_id);
    const {isError, isLoading, data} = useGetUserByEmailQuery(
        (user.email !== inbox.inbox_sender_user_id) 
            ? inbox.inbox_sender_user_id 
            : inbox.inbox_holder_user_id)

    const navigate = useNavigate();
    
    return (
        <div className={styles.message} 
            onClick={() => navigate(`/chat?id=${
                (user.email !== inbox.inbox_sender_user_id) 
                ? inbox.inbox_sender_user_id 
                : inbox.inbox_holder_user_id}`)
            }>
                <span></span>
                <div className={styles.userImageHolder}>
                    {(userData && userData.image !== 'none') &&
                        <img src={'http://80.78.245.233:5000/' + userData.image}/>
                    }
                </div>
                <div className={styles.userMessageDirect}>
                    <p className={styles.userMessageGetter}>
                        {data && data.name} {data && data.surname}
                    </p>
                    <div className={styles.lastMessage}>
                        <div>
                            {(userData && userData.image !== 'none') &&
                                <img src={'http://80.78.245.233:5000/' + userData.image}/>
                            }
                        </div>
                        <p>{inbox.last_message}</p>
                    </div>
                </div>
            </div>
    );
};

// {data && (data.email !== inbox.last_message_user_id) 
//     ? 'You: ' 
//     : 'Him: '}

export default MessageBoxItem;