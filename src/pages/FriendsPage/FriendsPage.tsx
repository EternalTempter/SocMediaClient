import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { IUser } from '../../models';
import { useLazyGetAllFriendsQuery } from '../../store/socmedia/friends/friends.api';
import { useFindAllUsersByNameQuery, useLazyGetAllUsersQuery } from '../../store/socmedia/users/users.api';
import jwt_decode from 'jwt-decode';
import styles from './FriendsPage.module.scss';
import UserHolder from '../../components/UserHolder/UserHolder';
import Search from '../../assets/svg/Search';
import ButtonBar from '../../components/ButtonBar/ButtonBar';
import Button from '../../components/UI/Button/Button';
import InputBar from '../../components/InputBar/InputBar';
import Input from '../../components/UI/Input/Input';
import UsersWrap from '../../components/UsersWrap/UsersWrap';
import SearchError from '../../assets/svg/SearchError';
import AlertHolder from '../../components/UI/AlertHolder/AlertHolder';
import ErrorHolder from '../../components/UI/ErrorHolder/ErrorHolder';
import Loader from '../../components/UI/Loader/Loader';

const FriendsPage = () => {
    const mainUser : IUser = jwt_decode(localStorage.getItem('token') || '');

    const [buttonState, setButtonState] = useState('Мои друзья');

    const [friends, setFriends] = useState<string[] | undefined>(undefined)
    
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const debounced = useDebounce(search);
    const {isError, isLoading, data} = useFindAllUsersByNameQuery(debounced, {
        skip: debounced.length < 1
    });
    const [getAllFriends, {isError: isFriendsError, isLoading: isFriendsLoading, data: friendsData}] = useLazyGetAllFriendsQuery();
    const [getAllUsers, {isError: isUsersError, isLoading: isUsersLoading, data: usersData}] = useLazyGetAllUsersQuery();

    useEffect(() => {
        setIsSearch(debounced.length > 1 && data?.length! > 0)
    }, [debounced]);

    useEffect(() => {
        if(friendsData){
            let friends = friendsData.rows.map(friend => friend.profile_from !== mainUser.email ? friend.profile_from : friend.profile_to);
            setFriends(friends);
        } 
    }, [friendsData])

    function checkIsFriend(email) {
        return (friendsData.rows?.filter(friend => (friend.profile_from === email || friend.profile_to === email)))?.length == 0
    }

    function showMyFriendsHandler() {
        setButtonState('Мои друзья');
    }

    function showRecommendationsHandler() {
        setButtonState('Рекомендации');
        getAllFriends({id: mainUser.email, limit: 400, page: 1})
        // getAllUsers();
    }

    return (
        <div className={styles.friendsWrap}>
            <ButtonBar>
                <Button onClick={showMyFriendsHandler} isActive={(buttonState === 'Мои друзья')}>
                    Мои друзья
                </Button>
                <Button onClick={showRecommendationsHandler} isActive={(buttonState === 'Рекомендации')}>
                    Рекомендации
                </Button>
            </ButtonBar>

            <InputBar type='regular'>
                <Input 
                    type="regular" 
                    placeholder='Искать пользователя...' 
                    value={search} 
                    onChange={setSearch}
                />
            </InputBar>

            {(isLoading || isFriendsLoading || isUsersLoading) &&
                <Loader type="regular"/>
            }
            {(isFriendsError && buttonState === 'Мои друзья') &&
                <ErrorHolder 
                    label="Произошла непредвиденная ошибка при загрузке групп, попробуйте нажать кнопку обновить"   
                    refetch={() => getAllFriends({id: mainUser.email, limit: 400, page: 1})}
                />
            }
            {(isUsersError && buttonState === 'Рекомендации') &&
                <ErrorHolder 
                    label="Произошла непредвиденная ошибка при загрузке групп, попробуйте нажать кнопку обновить"   
                    refetch={() => getAllUsers({id: mainUser.email, limit: 20, page: 1})}
                />
            }
            {isError && isSearch &&
                <ErrorHolder 
                    label="Произошла непредвиденная ошибка при загрузке групп, попробуйте нажать кнопку обновить"   
                    refetch={() => {}}
                />
            }
            {data && (data[0] === undefined) && (!isError && !isUsersError && !isFriendsError) && (!isLoading && !isFriendsLoading && !isUsersLoading) && isSearch &&
                <AlertHolder 
                    icon={<SearchError className={styles.alertIconDefault}/>}
                    label="Таких пользователей не найдено"
                />
            }

            {!isSearch && buttonState === 'Мои друзья' &&
                <UsersWrap 
                    getUsers={getAllFriends} 
                    isLoading={isFriendsLoading} 
                    isError={isFriendsError}
                    data={friendsData} 
                    type="FRIENDS"
                    buttonState={buttonState}
                    setButtonState={setButtonState}
                />
            }

            {!isSearch && friendsData && friends && friends.length === friendsData.rows.length && buttonState === 'Рекомендации' && 
                <UsersWrap 
                    friends={friends}
                    getUsers={getAllUsers} 
                    isLoading={isUsersLoading} 
                    isError={isUsersError}
                    data={usersData} 
                    type="USERS"
                    buttonState={buttonState}
                    setButtonState={setButtonState}
                />
            }

            {/* {!isSearch && buttonState === 'Мои друзья' && friendsData && friendsData.map(user =>
                <UserHolder key={user.id} user_id={user.profile_from !== mainUser.email ? user.profile_from : user.profile_to} isFriend={true} refetch={refetch}/> 
            )}

            {(buttonState === 'Рекомендации') && usersData && !isSearch && usersData.filter(user => checkIsFriend(user.email)).map(user => 
                user.email !== mainUser.email && <UserHolder key={user.id} user_id={user.email} isFriend={!checkIsFriend(user.email)} refetch={refetch}/>
            )} */}

            {friendsData && isSearch && data && data.map(user => 
                (user.email !== mainUser.email)
                ?       
                <UserHolder key={user.id} user_id={user.email} isFriend={!checkIsFriend(user.email)}/> 
                : 
                ''
            )}

        </div>
    );
};

export default FriendsPage;