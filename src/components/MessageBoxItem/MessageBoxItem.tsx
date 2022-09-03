import React, { FC } from 'react';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import jwt_decode from 'jwt-decode';
import { IInbox, IUser } from '../../models';
import { useNavigate } from 'react-router-dom';
import styles from './MessageBoxItem.module.scss';

interface MessageBoxItemProps {
    inbox: IInbox
}

const MessageBoxItem:FC<MessageBoxItemProps> = ({inbox}) => {    
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

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
                <div className={styles.userImageHolder}></div>
                <div className={styles.userMessageDirect}>
                    <p className={styles.userMessageGetter}>
                        {data && data.name} {data && data.surname}
                    </p>
                    <div className={styles.lastMessage}>
                        <div>{data && (data.email !== inbox.last_message_user_id) 
                                ? 'You: ' 
                                : 'Him: '}
                        </div>
                        <p>{inbox.last_message}</p>
                    </div>
                </div>
                <div className={styles.messageReadIndicator}></div>
            </div>
    );
};

export default MessageBoxItem;