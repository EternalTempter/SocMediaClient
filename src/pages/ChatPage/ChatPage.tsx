import React, { useEffect, useRef, useState } from 'react';
import { IMessage, IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import { useSearchParams } from 'react-router-dom';
import { useGetMessagesQuery, usePostMessageMutation, useUpdateMessageMutation } from '../../store/socmedia/messages/messages.api';
import { useCreateInboxMutation, useGetInboxQuery, useUpdateLastInboxMessageMutation } from '../../store/socmedia/inboxes/inboxes.api';
import styles from './ChatPage.module.scss';
import BackArrow from '../../assets/svg/BackArrow';
import More from '../../assets/svg/More';
import Send from '../../assets/svg/Send';
import Smile from '../../assets/svg/Smile';
import Clip from '../../assets/svg/Clip';
import Microphone from '../../assets/svg/Microphone';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import Message from '../../components/Message/Message';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';

const ChatPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    let [searchParams, setSearchParams] = useSearchParams()

    const bottom = useRef<HTMLDivElement>(null);
    
    const [currentMessage, setCurrentMessage] = useState('');
    const [currentInboxId, setCurrentInboxId] = useState('')

    const [isEditing, setIsEditing] = useState(false);
    const [editingMessageId, setEditingMessageId] = useState(0);

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const lastElement = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    
    const {isError: isCurrentInboxError, isLoading: isCurrentInboxLoading, data: currentInboxData} = useGetInboxQuery({firstUserId: user.email, secondUserId: String(searchParams.get('id'))});
    
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userAdditionalData} = useGetUserDataQuery(user.email);
      
    const [createPost, {isError, isLoading, data}] = usePostMessageMutation();
    
    const {isError: isMessagesError, isLoading: isMessagesLoading, data: messagesData} = useGetMessagesQuery({
        firstUserId: user.email, 
        secondUserId: searchParams.get('id'),
    }, {
            pollingInterval: 1000,
        });
        
    const [updateMessage, {isError: isUpdateMessageError, isLoading: isUpdateMessageLoading, data: updateMessageData}] = useUpdateMessageMutation()
    const [updateLastInboxMessage, {isError: isInboxMessageError, isLoading: isInboxMessageLoading, data: isInboxMessageData}] = useUpdateLastInboxMessageMutation();
    const {isError: isUserError, isLoading: isUserLoading, data: userData} = useGetUserByEmailQuery(String(searchParams.get('id')))
    const [createInbox, {isError: isInboxError, isLoading: isInboxLoading, data: inboxData}] = useCreateInboxMutation();
    
    useEffect(() => {
        if(currentInboxData) {
            setCurrentInboxId(String(currentInboxData.id));
        }
    }, [currentInboxData])

    useEffect(() => {
        if(messagesData) {
            setMessages([...messagesData])
        }
        scrollToBottom();
    }, [messagesData])

    
    function editMessageHandler(id: number, message: string) {
        setIsEditing(true);
        setEditingMessageId(id);
        setCurrentMessage(message);
    }

    function closeEditingMode() {
        setIsEditing(false);
        setCurrentMessage('');
    }

    function scrollToBottom() {
        if(bottom.current) {
            bottom.current.scrollIntoView({behavior: 'auto'})
        }
    }

    function messagePasteHandler() {
        if(currentMessage !== '') {
            if(!isEditing) {
                createPost({outgoing_id: user.email, incoming_id: searchParams.get('id'), message: currentMessage});
    
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
                if(bottom.current) {
                    bottom.current.scrollIntoView({behavior: 'auto'})
                }   
            }
            else {
                updateMessage({id: editingMessageId, message: currentMessage})
                setIsEditing(false);
                setCurrentMessage('');
            }
        }
    }

    return (
        <>
            <div className={styles.leftSideUser}>
                <div className={styles.leftSideUserOutline}>
                    <div className={styles.rightSideUserImage}>
                        {/* {
                            (post && post.image !== 'none') 
                                &&
                            <img src={'http://localhost:5000/' + post.image}/>
                        } */}
                    </div>
                </div>
                <p>{userData && userData.name} {userData && userData.surname}</p>
            </div>
            <div className={styles.rightSideUser}>
                <div className={styles.rightSideUserOutline}>
                    <div className={styles.rightSideUserImage}>
                        {
                            (userAdditionalData && userAdditionalData.image !== 'none') 
                                &&
                            <img src={'http://localhost:5000/' + userAdditionalData.image}/>
                        }
                    </div>
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
                    {messages.map(message => 
                        (message.outgoing_id !== user.email) 
                        ? 
                            <Message key={message.id} type='otherUserMessage' message={message} editMessageHandler={editMessageHandler}/>
                        : 
                            <Message key={message.id} type='ourMessage' message={message} editMessageHandler={editMessageHandler}/>
                    )}
                    <div ref={bottom}></div>
                </div>
                <div className={styles.chatInteractive}>
                    {isEditing && 
                        <div className={styles.editingMode}>
                            <p>сообщение в режиме редактирования</p>
                            <button onClick={closeEditingMode}>Х</button>
                        </div>
                    }
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