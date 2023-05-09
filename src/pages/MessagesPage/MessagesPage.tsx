import MessageBoxItem from '../../components/MessageBoxItem/MessageBoxItem';  
import { IInbox, IUser } from '../../models';
import { useGetUserInboxesQuery, useLazyGetUserInboxesQuery } from '../../store/socmedia/inboxes/inboxes.api';
import jwt_decode from 'jwt-decode';
import styles from './MessagesPage.module.scss';
import Search from '../../assets/svg/Search';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useFindMessagesQuery } from '../../store/socmedia/messages/messages.api';
import { useObserver } from '../../hooks/useObserver';
import ComplexInput from '../../components/UI/ComplexInput/ComplexInput';
import Loader from '../../components/UI/Loader/Loader';
import ErrorHolder from '../../components/UI/ErrorHolder/ErrorHolder';
import AlertHolder from '../../components/UI/AlertHolder/AlertHolder';
import Error from '../../assets/svg/Error';
import ChatError from '../../assets/svg/ChatError';
import Button from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';

const MessagesPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    
    const navigate = useNavigate();
    
    const [inboxes, setInboxes] = useState<IInbox[]>([]);
    const lastElement = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const debounced = useDebounce(search);
    const {isError: isMessagesError, isLoading: isMessagesLoading, data: messagesData} = useFindMessagesQuery({queryParameter: debounced, id: user.email}, {
        skip: debounced.length < 1
    });
    const {data: updatedInboxesData} = useGetUserInboxesQuery({id: user.email, limit: 50, page: 1}, {
        pollingInterval: 1000
    });
    const [fetchInboxes, {isLoading, isError, data}] = useLazyGetUserInboxesQuery();

    useObserver(lastElement, isLoading, totalPages, page, () => {
        setPage((page) => page + 1);
    });

    useEffect(() => {
        if(data) {
            setInboxes([...inboxes, ...data.rows])
            if(totalPages === null) {
                setTotalPages(data.count);
            }
        }
    }, [data])
 
    useEffect(() => {
        fetchInboxes({id: user.email, limit: 15, page: page})
    }, [page])
    
    useEffect(() => {
        setIsSearch(debounced.length > 1)
        }, [debounced]);

    useEffect(() => {
        if(updatedInboxesData && inboxes.length !== 0) {
            let updates = updatedInboxesData.rows.filter(inbox => {
                let result = checkForUpdates(inbox);
                if(result === false)
                    return false;
                else
                    return inbox;
            });
            if(updates.length !== 0) {
                setInboxes([...inboxes.filter(inbox => !check(inbox.id, updates)), ...updates])
            }
            updates = [];
        }
    }, [updatedInboxesData, inboxes])

    function check(id, updates) {
        return updates.filter(update => update.id === id).length !== 0
    }

    function checkForUpdates(inbox) {
        let updatedRow = inboxes.filter(inb => inb.id === inbox.id && (inb.last_message !== inbox.last_message || inb.viewed !== inbox.viewed));
        if(updatedRow.length === 0) return false;
        return updatedRow[0].last_message;
    }

    return (
        <div className={styles.messageBox}>
            <ComplexInput 
                value={search} 
                onChange={setSearch}
                placeholder="Введите сообщение..."
            />
            {isLoading && 
                <Loader type="regular"/>
            } 
            {isError && 
                <ErrorHolder 
                    label="Произошла непредвиденная ошибка при загрузке чатов, попробуйте нажать кнопку обновить"   
                    refetch={() => fetchInboxes({id: user.email, limit: 15, page: page})}
                />
            }
            {messagesData && isSearch && messagesData.map(elem => 
                <MessageBoxItem key={messagesData.id} inbox={{
                    last_message: elem.message,
                    last_message_user_id: elem.outgoing_id,
                    inbox_holder_user_id: elem.outgoing_id,
                    inbox_sender_user_id: elem.incoming_id,
                    viewed: elem.viewed}}
                />
            )}
            {!isSearch && data && [...inboxes].reverse().map((elem, index) => 
                <MessageBoxItem key={index} inbox={elem}/>
            )}
            {isMessagesLoading &&
                <Loader type="regular"/>
            }
            {isMessagesError && isSearch &&
                <ErrorHolder 
                    label="Произошла непредвиденная ошибка при загрузке сообщений, попробуйте нажать кнопку обновить"   
                    refetch={() => {}}
                />
            }
            {messagesData && (messagesData && messagesData[0] === undefined) && !isMessagesError && !isMessagesLoading && isSearch &&
                <AlertHolder 
                    icon={<ChatError className={styles.alertIcon}/>}
                    label="Подобных сообщений не найдено"
                />
            }
            {data && (data && data.rows[0] === undefined) && inboxes && (inboxes[0] === undefined) && !isError && !isLoading &&
                <AlertHolder 
                    icon={<ChatError className={styles.alertIcon}/>}
                    label="У вас пока нет ни одного чата, чтобы начать общение с пользователем нужно добавить его в друзья"
                    button={
                        <Button 
                            onClick={() => navigate('/friends')} 
                            isActive={false}
                        >Искать друзей</Button>
                    }
                />
            }
            <div className={styles.lastElement} ref={lastElement}/>
        </div>
    );
};

export default MessagesPage;