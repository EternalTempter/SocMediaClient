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

const MessagesPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [fetchInboxes, {isLoading, isError, data}] = useLazyGetUserInboxesQuery();

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
    const {isLoading: isUpdatedInboxesLoading, isError: isUpdatedInboxesError, data: updatedInboxesData} = useGetUserInboxesQuery({id: user.email, limit: 50, page: 1}, {
        pollingInterval: 2000
    });

    useObserver(lastElement, isLoading, totalPages, page, () => {
        setPage((page) => page + 1);
    });

    useEffect(() => {
        if(data) {
            setInboxes([...inboxes, ...data.rows])
            console.log([...data.rows].length);
            if(totalPages === null) {
                setTotalPages(data.count);
            }
        }
    }, [data])
 
    useEffect(() => {
        fetchInboxes({id: user.email, limit: 15, page: page})
    }, [page])
    
    useEffect(() => {
        setIsSearch(debounced.length > 1 && data?.length! > 0)
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
            console.log(updates, updatedInboxesData.rows);
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
        let updatedRow = inboxes.filter(inb => inb.id === inbox.id && inb.last_message !== inbox.last_message);
        if(updatedRow.length === 0) return false;
        return updatedRow[0].last_message;
    }

    return (
        <div className={styles.messageBox}>
            <div className={styles.messagesSearch}>
                <input 
                    placeholder='Поиск по истории сообщений...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div>
                    <Search className={styles.messagesSearchIcon}/>
                </div>
            </div>
            {!isSearch && data && [...inboxes].reverse().map(elem => 
                <MessageBoxItem inbox={elem}/>
            )}
            {messagesData && isSearch && messagesData.map(elem => 
                <MessageBoxItem key={messagesData.id} inbox={{
                    last_message: elem.message,
                    last_message_user_id: elem.outgoing_id,
                    inbox_holder_user_id: elem.outgoing_id,
                    inbox_sender_user_id: elem.incoming_id}}
                />
            )}
            <div className={styles.lastElement} ref={lastElement}/>
        </div>
    );
};

export default MessagesPage;