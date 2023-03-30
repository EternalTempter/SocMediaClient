import React, { FC, useEffect, useRef, useState } from 'react';
import { useObserver } from '../../hooks/useObserver';
import { IFriend, IUser } from '../../models';
import styles from './UsersWrap.module.scss';
import jwt_decode from 'jwt-decode';
import UserHolder from '../UserHolder/UserHolder';
import SearchError from '../../assets/svg/SearchError';
import AlertHolder from '../UI/AlertHolder/AlertHolder';
import Button from '../UI/Button/Button';

interface UsersWrapProps {
    getUsers: (obj: {}) => void
    isLoading: boolean
    isError: boolean
    data: any
    type: string
    id?: string
    newUserData?: IFriend
    friends?: string[]
    buttonState: string
    setButtonState: (value: string) => void
}

const UsersWrap:FC<UsersWrapProps> = ({
        getUsers, 
        isLoading, 
        isError,
        data, 
        type, 
        id, 
        newUserData, 
        friends,
        buttonState,
        setButtonState
    }) => {
    const mainUser : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [users, setUsers] = useState<IFriend[]>([]);
    const [usersFriends, setUsersFriends] = useState<IUser[]>([]);

    const lastElement = useRef<HTMLDivElement>(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    function checkIfValueNotExistInPostsArray(value: number) {
        if(type === 'FRIENDS') {
            if(users.length === 0) return true;
            return users.filter(user => user.id === value).length === 0;
        }
        else {
            if(usersFriends.length === 0) return true;
            return usersFriends.filter(user => user.id === value).length === 0;
        }
    }

    // function hidePost(id: number) {
    //     setUsers(users.filter(user => user.id !== id))
    // }
    
    useObserver(lastElement, isLoading, totalPages, page, () => {
        setPage((page) => page + 1);
    })

    useEffect(() => {
        if(data) {
            let usersToImplement = data.rows.filter(user => checkIfValueNotExistInPostsArray(user.id));
            if(type === 'FRIENDS') 
                setUsers([...users, ...usersToImplement])
            else 
                setUsersFriends([...usersFriends, ...usersToImplement]);
            
            if(totalPages === null) {
                setTotalPages(Math.floor(data.count / 20));
            }
        }
    }, [data])
    
    useEffect(() => {
        if(type === 'FRIENDS')
            getUsers({id: mainUser.email, limit: 20, page: page});
        else
            getUsers({ids: JSON.stringify(friends), limit: 20, page: page});
    }, [page])

    // useEffect(() => {
    //     if(id) {
    //         setUsers([]);
    //         getUsers({id: id || mainUser.email, limit: 5, page: 1})
    //     }
    // }, [id])

    // useEffect(() => {
    //     if(newUserData) setUsers([newUserData, ...users])
    // }, [newUserData])

    return (
        <div className={styles.wrap}>
            {data && (data[0] === undefined) && users && (users[0] === undefined) && buttonState !== 'Рекомендации' && !isLoading && !isError &&
                <AlertHolder 
                    icon={<SearchError className={styles.alertIconDefault}/>}
                    label="Вы пока не добавляли никого в друзья, можете найти друзей в рекомендациях!"
                    button={
                        <Button 
                            onClick={() => setButtonState('Рекомендации')} 
                            isActive={false}
                        >Смотреть рекомендации</Button>
                    }
                />
            }
            {type === 'FRIENDS' && users.map(user => 
                <UserHolder key={user.id} user_id={user.profile_from !== mainUser.email ? user.profile_from : user.profile_to} isFriend={user.status === 'ACCEPTED'}></UserHolder>
            )}
            {type === 'USERS' && usersFriends.map(user => 
                user.email !== mainUser.email && <UserHolder key={user.id} user_id={String(user.email)} isFriend={false}></UserHolder>
            )}
            <div ref={lastElement} className={styles.lastElement}></div>
        </div>
    );
};

export default UsersWrap;