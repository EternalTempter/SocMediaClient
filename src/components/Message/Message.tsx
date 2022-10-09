import React, { FC, useEffect, useRef, useState } from 'react';
import { IMessage, IUser } from '../../models';
import Edit from '../../assets/svg/Edit';
import TrashCan from '../../assets/svg/TrashCan';
import styles from './Message.module.scss';
import { useDeleteMessageMutation, useUpdateViewMutation } from '../../store/socmedia/messages/messages.api';
import { useUpdateLastMessageViewMutation } from '../../store/socmedia/inboxes/inboxes.api';
import jwt_decode from 'jwt-decode';

interface MessageProps {
    type: string
    message: IMessage
    editMessageHandler: (id: number, message: string) => void
    inboxId: string
}

const Message:FC<MessageProps> = ({type, message, editMessageHandler, inboxId}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [messageStyles, setMessageStyles] = useState(type === 'otherUserMessage' ? [styles.otherUserMessageOptions] : [styles.ourMessageOptions]);

    const [deleteMessage, {isError, isLoading, data}] = useDeleteMessageMutation();

    const lastElement = useRef<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver>();

    const [updateLastMessageView, {isError: isUpdateLastMessageViewError, isLoading: isUpdateLastMessageViewLoading, data: updateLastMessageViewData}] = useUpdateLastMessageViewMutation();
    const [updateMessageView, {isError: isUpdateMessageViewError, isLoading: isUpdateMessageViewLoading, data: updateMessageViewData}] = useUpdateViewMutation()

    useEffect(() => {
        var options = {
            root: document.querySelector('.newsPageWrap'),
            rootMargin: '0px',
            threshold: 1.0
        }
        var callback = function(entries, observer) {
            if(entries[0].isIntersecting && !message.viewed && message.outgoing_id !== user.email){
                updateMessageView({id: message.id})
                updateLastMessageView({id: inboxId})
            }
        };
        observer.current = new IntersectionObserver(callback, options);
        observer.current.observe(lastElement.current!)
    }, [])

    return (
        <div 
            className={type === 'otherUserMessage' ? styles.otherUserMessageWrap : styles.ourMessageWrap}
            onMouseOver={() => type !== 'otherUserMessage' ? setMessageStyles([...messageStyles, styles.on]) : setMessageStyles([...messageStyles])}
            onMouseOut={() => setMessageStyles(type === 'otherUserMessage' ? [styles.otherUserMessageOptions] : [styles.ourMessageOptions])}
            ref={lastElement}
        >
            <div className={type !== 'ourMessage' ? styles.otherUserMessage : styles.ourMessage}>
                <div className={messageStyles.join(' ')}>
                    <div onClick={() => editMessageHandler(message.id, message.message)}>
                        <Edit className={styles.messageOptionsEdit}/>
                    </div>
                    <div onClick={() => deleteMessage({id: message.id})}>
                        <TrashCan className={styles.messageOptionsTrashCan}/>
                    </div>
                </div>
                <p>{String(message.createdAt).replace('T', ' ').slice(11, -8)}</p>
                {message.viewed === false &&
                    <div className={styles.readIndicator}></div>
                }
                {message.message}
            </div>
        </div>
    );
};

export default Message;