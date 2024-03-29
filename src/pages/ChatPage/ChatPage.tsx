import React, { useEffect, useRef, useState } from 'react';
import { IMessage, IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetMessagesCountQuery, useGetMessagesQuery, useLazyGetMessagesQuery, usePostMessageMutation, useUpdateMessageMutation } from '../../store/socmedia/messages/messages.api';
import { useCreateInboxMutation, useGetInboxQuery, useUpdateLastInboxMessageMutation } from '../../store/socmedia/inboxes/inboxes.api';
import styles from './ChatPage.module.scss';
import BackArrow from '../../assets/svg/BackArrow';
import More from '../../assets/svg/More';
import Send from '../../assets/svg/Send';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import Message from '../../components/Message/Message';
import ChatUser from '../../components/ChatUser/ChatUser';
import { useObserver } from '../../hooks/useObserver';
import { baseUrl } from '../../envVariables/variables';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import AutoHeightTextarea from '../../components/AutoHeightTextarea/AutoHeightTextarea';
import Loader from '../../components/UI/Loader/Loader';
import ErrorHolder from '../../components/UI/ErrorHolder/ErrorHolder';
import SkeletonLoader from '../../components/UI/SkeletonLoader/SkeletonLoader';
import Plus from '../../assets/svg/Plus';

const ChatPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams()

    const bottom = useRef<HTMLDivElement>(null);
    
    const [currentMessage, setCurrentMessage] = useState('');
    const [currentInboxId, setCurrentInboxId] = useState('')

    const [isEditing, setIsEditing] = useState(false);
    const [editingMessageId, setEditingMessageId] = useState(0);

    const [messages, setMessages] = useState<IMessage[]>([]);
    // Код для динамической пагинации
    // const [page, setPage] = useState(0);
    // const [totalPages, setTotalPages] = useState<number | null>(null);
    // const lastElement = useRef<HTMLDivElement>(null);
    
    const {data: currentInboxData} = useGetInboxQuery({firstUserId: user.email, secondUserId: String(searchParams.get('id'))});
         
    const [postMessage] = usePostMessageMutation();
    
    const {isLoading: isUpdatedMessagesLoading, data: updatedMessagesData} = useGetMessagesQuery({
        firstUserId: user.email, 
        secondUserId: searchParams.get('id'),
        limit: 1000
    }, {
            pollingInterval: 500,
        });

    //Для динамической пагинации
    // const {isError: isMessagesCountError, isLoading: isMessagesCountLoading, data: messagesCountData} = useGetMessagesCountQuery({firstUserId: user.email, secondUserId: searchParams.get('id')});
    // const [getMessages, {isError: isMessagesError, isLoading: isMessagesLoading, data: messagesData}] = useLazyGetMessagesQuery();
        
    const [updateMessage] = useUpdateMessageMutation()
    const [updateLastInboxMessage] = useUpdateLastInboxMessageMutation();
    const {data: userData} = useGetUserByEmailQuery(String(searchParams.get('id')))
    const [createInbox, {data: inboxData}] = useCreateInboxMutation();
    const {isLoading: isUserDataLoading, data: userAdditionalData} = useGetUserDataQuery(String(searchParams.get('id')));

    useEffect(() => {
        if(currentInboxData) {
            setCurrentInboxId(String(currentInboxData.id));
        }
    }, [currentInboxData])

    // Закоментированный код для динамической пагинации (сделано лишь на половину)
    // useEffect(() => {
    //     if(messagesData) {
    //         setMessages([...messagesData])
    //     }
    //     scrollToBottom();
    // }, [messagesData])

    
    function editMessageHandler(id: number, message: string) {
        setIsEditing(true);
        setEditingMessageId(id);
        setCurrentMessage(message);
    }

    function closeEditingMode() {
        setIsEditing(false);
        setCurrentMessage('');
    }

    // Баг на мобильных устройствах
    function scrollToBottom() {
        if(bottom.current) {
            bottom.current.scrollIntoView({behavior: 'auto'})
        }
    }

    function sendMessageByKeyHandler(code) {
        if(code === 'Enter') {
            messagePasteHandler()
        }
    }

    // Закоментированный код для динамической пагинации (сделано лишь на половину)
    // function checkIfValueNotExistInPostsArray(value: number) {
    //     if(messages.length === 0) return true;
    //     return messages.filter(message => message.id === value).length === 0;
    // }

    function messagePasteHandler() {
        if(currentMessage !== '') {
            if(!isEditing) {
                postMessage({outgoing_id: user.email, incoming_id: searchParams.get('id'), message: currentMessage});
    
                setTimeout(() => setCurrentMessage(''), 50); 
    
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

                //Баг на мобильных устройствах
                // if(bottom.current) {
                //     bottom.current.scrollToBottom()
                // }   
            }
            else {
                updateMessage({id: editingMessageId, message: currentMessage})
                setIsEditing(false);
                setTimeout(() => setCurrentMessage(''), 50); 
            }
        }
    }

    // Закоментированный код для динамической пагинации (сделано лишь на половину)
    // useObserver(lastElement, isMessagesLoading, totalPages, page, () => {
    //     if(messages && page > 0)
    //         setPage((page) => page - 1);
    // });
    // useEffect(() => {
    //     if(messagesData) {
    //         console.log(messagesData, Math.floor(messagesData.count / 15));
    //         let messagesToImplement = messagesData.rows.filter(message => checkIfValueNotExistInPostsArray(message.id));
    //         setMessages([...messagesToImplement, ...messages])  
    //     }
    // }, [messagesData])


    // Баг на мобильных устройствах
    useEffect(() => {
        scrollToBottom();
    }, [messages])
    
    // Закоментированный код для динамической пагинации (сделано лишь на половину)
    // useEffect(() => {
    //     if(page !== 0 && page !== NaN) {
    //         console.log(`Запрос по странице ${page} отправлен`);
    //         getMessages({firstUserId: user.email, secondUserId: searchParams.get('id'), limit: 15, page: page});
    //     }
    // }, [page])
    // useEffect(() => {
    //     if(messagesCountData) {
    //         console.log(`Количество страниц $`);
    //         setTotalPages(Math.ceil(messagesCountData / 15) + 1);
    //         setPage(Math.ceil(messagesCountData / 15) + 1);
    //     }
    // }, [messagesCountData])
    // useEffect(() => {
    //     if(updatedMessagesData) {
    //         console.log(updatedMessagesData.rows.filter(message => check(message.id)));
    //         let newMessages = updatedMessagesData.rows.filter(message => check(message.id))
    //         if(newMessages.length > 0)
    //             setMessages([...messages, ...newMessages])
    //     }
    // }, [updatedMessagesData])
    // function check(id) {
    //     return messages.filter(message => message.id === id).length === 0
    // }

    useEffect(() => {
        if(updatedMessagesData) {
            setMessages(updatedMessagesData.rows)
        }
    }, [updatedMessagesData])

    return (
        <>
            <ChatUser userId={String(searchParams.get('id'))} type="LEFT_SIDE"/>
            <ChatUser userId={user.email} type="RIGHT_SIDE"/>
            <div className={styles.chatWrap}>
                <div className={styles.chatHeader}>
                    <div onClick={() => navigate('/messages')}>
                        <BackArrow className={styles.charHeaderBackArrow}/>
                    </div>
                    <div 
                        className={styles.chatHeaderUserData} 
                        onClick={() => navigate(`/account/${searchParams.get('id')}`)}
                    >
                        <div>
                            {(userAdditionalData && userAdditionalData.image !== 'none') &&
                                <img src={baseUrl + userAdditionalData.image}/>
                            }
                            {isUserDataLoading && 
                                <SkeletonLoader borderRadius={999}/>
                            }
                        </div>
                        <p>{userData && userData.name} {userData && userData.surname}</p>
                    </div>
                    <div>
                        <More className={styles.chatHeaderMore}/>
                    </div>
                </div>
                <div className={styles.chatArea}>
                    {isUpdatedMessagesLoading &&
                        <div className={styles.chatLoader}>
                            <Loader type="regular"/>
                        </div>
                    }
                    {messages.map((message, index) => 
                        (message.outgoing_id !== user.email) 
                        ? 
                            <Message 
                                key={message.id} 
                                type='otherUserMessage' 
                                message={message} 
                                editMessageHandler={editMessageHandler} 
                                inboxId={currentInboxId}
                            />
                        : 
                            <Message 
                                key={message.id} 
                                type='ourMessage' 
                                message={message} 
                                editMessageHandler={editMessageHandler} 
                                inboxId={currentInboxId}
                            />
                    )}
                        <div ref={bottom} className={styles.bottom}/>
                </div>
                <div className={styles.chatInteractive}>
                    {isEditing && 
                        <div className={styles.editingMode}>
                            <p>Сообщение в режиме редактирования</p>
                            <div 
                                className={styles.closeEditingModeIconWrap}
                                onClick={() => closeEditingMode()}
                            >
                                <Plus className={styles.closeEditingModeIcon}/>
                            </div>
                        </div>
                    }
                    <div className={styles.chatUserInput}>
                        <AutoHeightTextarea 
                            value={currentMessage} 
                            onChange={setCurrentMessage} 
                            style={{}} 
                            placeholder='Введите сообщение...'
                            onKeyPress={sendMessageByKeyHandler}
                        />
                        <div className={styles.chatUserInputButtons}>
                            <div onClick={messagePasteHandler}>
                                <Send className={styles.chatUserInputSend}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );  
};

export default ChatPage;