import React, { FC, useState } from 'react';
import { IMessage } from '../../models';
import Edit from '../../assets/svg/Edit';
import TrashCan from '../../assets/svg/TrashCan';
import styles from './Message.module.scss';
import { useDeleteMessageMutation } from '../../store/socmedia/messages/messages.api';

interface MessageProps {
    type: string
    message: IMessage
    editMessageHandler: (id: number, message: string) => void
}

const Message:FC<MessageProps> = ({type, message, editMessageHandler}) => {
    const [messageStyles, setMessageStyles] = useState(type === 'otherUserMessage' ? [styles.otherUserMessageOptions] : [styles.ourMessageOptions]);

    const [deleteMessage, {isError, isLoading, data}] = useDeleteMessageMutation();

    return (
        <div 
            className={type === 'otherUserMessage' ? styles.otherUserMessageWrap : styles.ourMessageWrap}
            onMouseOver={() => type !== 'otherUserMessage' ? setMessageStyles([...messageStyles, styles.on]) : setMessageStyles([...messageStyles])}
            onMouseOut={() => setMessageStyles(type === 'otherUserMessage' ? [styles.otherUserMessageOptions] : [styles.ourMessageOptions])}
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
                {message.message}
            </div>
        </div>
    );
};

export default Message;