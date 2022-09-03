import React, { useEffect, useState } from 'react';
import { IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import { useSearchParams } from 'react-router-dom';
import { useGetMessagesQuery, usePostMessageMutation } from '../../store/socmedia/messages/messages.api';
import { useCreateInboxMutation, useGetInboxQuery, useUpdateLastInboxMessageMutation } from '../../store/socmedia/inboxes/inboxes.api';
import styles from './ChatPage.module.scss';
import BackArrow from '../../assets/svg/BackArrow';
import More from '../../assets/svg/More';
import Send from '../../assets/svg/Send';
import Smile from '../../assets/svg/Smile';
import Clip from '../../assets/svg/Clip';
import Microphone from '../../assets/svg/Microphone';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';

const ChatPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    let [searchParams, setSearchParams] = useSearchParams()
    
    const [currentMessage, setCurrentMessage] = useState('');
    const [currentInboxId, setCurrentInboxId] = useState('')

    const {
        isError: isCurrentInboxError, 
        isLoading: isCurrentInboxLoading, 
        data: currentInboxData
    } = useGetInboxQuery({firstUserId: user.email, secondUserId: String(searchParams.get('id'))});

    useEffect(() => {
        if(currentInboxData) {
            setCurrentInboxId(String(currentInboxData.id));
            console.log(currentInboxData)
        }
    }, [currentInboxData])

    const [createPost, {isError, isLoading, data}] = usePostMessageMutation();
    
    const {isError: isMessagesError, isLoading: isMessagesLoading, data: messagesData} = useGetMessagesQuery({
        firstUserId: user.email, 
        secondUserId: searchParams.get('id')
    }, {
        pollingInterval: 1000,
    });

    const [updateLastInboxMessage, {
        isError: isInboxMessageError, 
        isLoading: isInboxMessageLoading, 
        data: isInboxMessageData
    }] = useUpdateLastInboxMessageMutation();

    const {
        isError: isUserError, 
        isLoading: isUserLoading, 
        data: userData
    } = useGetUserByEmailQuery(String(searchParams.get('id')))

    const [createInbox, {
        isError: isInboxError, 
        isLoading: isInboxLoading, 
        data: inboxData
    }] = useCreateInboxMutation();

    function messagePasteHandler() {
        if(currentMessage !== '') {
            createPost({
                outgoing_id: user.email, 
                incoming_id: searchParams.get('id'), 
                message: currentMessage
            });

            setCurrentMessage(''); 

            if(currentInboxId === '') {
                createInbox({
                    last_message: currentMessage,
                    last_message_user_id: user.email,
                    inbox_holder_user_id: user.email, 
                    inbox_sender_user_id: searchParams.get('id')
                });
                setCurrentInboxId(inboxData && inboxData.id)
            }
            else {
                updateLastInboxMessage({
                    last_message_user_id: user.email, 
                    last_message: currentMessage, 
                    id: currentInboxId
                });
            }

        }
    }

    return (
        <>
            <div className={styles.leftSideUser}>
                <div className={styles.leftSideUserOutline}>
                    <div className={styles.rightSideUserImage}></div>
                </div>
                <p>{userData && userData.name} {userData && userData.surname}</p>
            </div>
            <div className={styles.rightSideUser}>
                <div className={styles.rightSideUserOutline}>
                    <div className={styles.rightSideUserImage}></div>
                </div>
                <p>{user.name} {user.surname}</p>
            </div>
            <div className={styles.chatWrap}>
                <div className={styles.chatHeader}>
                    <div>
                        <BackArrow className={styles.charHeaderBackArrow}/>
                    </div>
                    <div className={styles.chatHeaderUserData}>
                        <div></div>
                        <p>{userData && userData.name} {userData && userData.surname}</p>
                    </div>
                    <div>
                        <More className={styles.chatHeaderMore}/>
                    </div>
                </div>
                <div className={styles.chatArea}>
                    {messagesData && messagesData.map(message => 
                        (message.outgoing_id !== user.email) 
                        ? 
                        <div key={message.id} className={styles.ourMessage}>
                            <p>{String(message.createdAt).replace('T', ' ').slice(11, -8)}</p>
                            {message.message}
                        </div>
                        : 
                        <div key={message.id} className={styles.otherUserMessage}>
                            <p>{String(message.createdAt).replace('T', ' ').slice(11, -8)}</p>
                            {message.message}
                        </div> 
                    )}
                </div>
                <div className={styles.chatInteractive}>
                    <div className={styles.chatUserInput}>
                        <textarea placeholder='Введите сообщение' value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} onKeyPress={(e) => (e.code === 'Enter') ? messagePasteHandler() : ''}/>
                        <div className={styles.chatUserInputButtons}>
                            <div>
                                <Smile className={styles.chatButtonsSmile}/>
                            </div>
                            <div>
                                <Clip className={styles.chatButtonsClip}/>
                            </div>
                            <div onClick={messagePasteHandler}>
                                <Send className={styles.chatUserInputSend}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.chatButtons}>
                        <div>
                            <Smile className={styles.chatButtonsSmile}/>
                        </div>
                        <div>
                            <Clip className={styles.chatButtonsClip}/>
                        </div>
                        <div>
                            <Microphone className={styles.chatButtonsMicrophone}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );  
};

export default ChatPage;