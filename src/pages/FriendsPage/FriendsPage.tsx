import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { IUser } from '../../models';
import { useGetAllFriendsQuery } from '../../store/socmedia/friends/friends.api';
import { useFindAllUsersByNameQuery } from '../../store/socmedia/users/users.api';
import jwt_decode from 'jwt-decode';
import styles from './FriendsPage.module.scss';
import UserHolder from '../../components/UserHolder/UserHolder';
import Search from '../../assets/svg/Search';

const FriendsPage = () => {
    const mainUser : IUser = jwt_decode(localStorage.getItem('token') || '');
    
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const debounced = useDebounce(search);
    const {isError, isLoading, data} = useFindAllUsersByNameQuery(debounced, {
        skip: debounced.length < 1
    });
    const {isError: isFriendsError, isLoading: isFriendsLoading, data: friendsData} = useGetAllFriendsQuery(mainUser.email);

    useEffect(() => {
        setIsSearch(debounced.length > 1 && data?.length! > 0)
    }, [debounced]);

    function checkIsFriend(user) {
        return (friendsData?.filter(friend => (friend.profile_from === user.email || friend.profile_to === user.email)))?.length == 0
    }

    return (
        <div className={styles.friendsWrap}>
            <div className={styles.friendsToggler}>
                <button>Мои друзья</button>
                <button>Рекомендации</button>
            </div>
            <div className={styles.friendsFinderWrap}>
                <div className={styles.friendsFinder}>
                    <input type="text" placeholder='Искать пользователя...' value={search} onChange={e => setSearch(e.target.value)}/>
                    <div>
                        <Search className={styles.friendsFinderSearch}/>
                    </div>
                </div>
            </div>

            {!isSearch && friendsData && friendsData.map(user =>
                <UserHolder key={user.id} user_id={user.profile_from} isFriend={true}/> 
            )}

            {friendsData && isSearch && data && data.map(user => 
                (user.email !== mainUser.email)
                ?       
                <UserHolder key={user.id} user_id={user.email} isFriend={!checkIsFriend(user)}/> 
                : 
                ''
            )}

        </div>
    );
};

export default FriendsPage;