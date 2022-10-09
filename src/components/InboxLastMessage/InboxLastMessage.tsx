import React, { FC, useEffect, useRef } from 'react';
import { baseUrl } from '../../envVariables/variables';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import styles from './InboxLastMessage.module.scss';

interface InboxLastMessageProps {
    last_message_sender: string
    message: string
}

const InboxLastMessage:FC<InboxLastMessageProps> = ({last_message_sender, message}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userData} = useGetUserDataQuery(last_message_sender);
    
    useEffect(() => {
        if(ref.current)
            console.log("width - ", ref.current.offsetWidth);
    }, [ref]);

    return (
        <div className={styles.lastMessage} ref={ref}>
            <div>
                {(userData && userData.image !== 'none') &&
                    <img src={baseUrl + userData.image}/>
                }
            </div>
            <p>
                {ref.current && message.slice(0, ref.current.offsetWidth / 11)} 
                {ref.current && message.length > ref.current.offsetWidth / 11 && '...'}
            </p>
        </div>
    );
};

export default InboxLastMessage;