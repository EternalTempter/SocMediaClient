import MessageBoxItem from '../../components/MessageBoxItem/MessageBoxItem';  
import { IUser } from '../../models';
import { useGetUserInboxesQuery } from '../../store/socmedia/inboxes/inboxes.api';
import jwt_decode from 'jwt-decode';
import styles from './MessagesPage.module.scss';
import Search from '../../assets/svg/Search';

const MessagesPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const {isLoading, isError, data} = useGetUserInboxesQuery(user.email, {
        pollingInterval: 1000
    });

    return (
        <div className={styles.messageBox}>
            <div className={styles.messagesSearch}>
                <input placeholder='Поиск по истории сообщений...'/>
                <div>
                    <Search className={styles.messagesSearchIcon}/>
                </div>
            </div>
            {data && [...data].reverse().map(elem => 
                <MessageBoxItem
                    inbox={elem}
            />)}
            
        </div>
    );
};

export default MessagesPage;