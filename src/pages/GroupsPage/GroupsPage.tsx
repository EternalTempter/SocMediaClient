import React, { useEffect, useState } from 'react';
import Options from '../../assets/svg/Options';
import Plus from '../../assets/svg/Plus';
import Search from '../../assets/svg/Search';
import GroupHolder from '../../components/GroupHolder/GroupHolder';
import { useDebounce } from '../../hooks/useDebounce';
import { IUser } from '../../models';
import { useFindAllGroupsByNameQuery, useGetAllUserGroupSubscriptionsQuery } from '../../store/socmedia/groups/groups.api';
import styles from './GroupsPage.module.scss';
import jwt_decode from 'jwt-decode';

const GroupsPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    
    const [search, setSearch] = useState('');
    const {isError, isLoading, data} = useGetAllUserGroupSubscriptionsQuery(user.email);
    
    const [isSearch, setIsSearch] = useState(false);
    const debounced = useDebounce(search);
    const {isError: isGroupsError, isLoading: isGroupsLoading, data: groupsData} = useFindAllGroupsByNameQuery(debounced, {
        skip: debounced.length < 1
    });

    useEffect(() => {
        setIsSearch(debounced.length > 1 && data?.length! >= 0)
    }, [debounced]);

    useEffect(() => {
        if(groupsData) {
            console.log(groupsData);
        }
    })

    return (
        <div className={styles.groupsPageWrap}>
            <div className={styles.groupsToggler}>
                <button>Мои сообщества</button>
                <button>Рекомендации</button>
                <div className={styles.groupsOptions}>
                    <Options className={styles.groupsOptionsIcon}/>
                </div>
                <div className={styles.createGroup}>
                    <p>Создать сообщество</p>
                    <Plus className={styles.createGroupPlus}/>
                </div>
            </div>
            <div className={styles.groupsFinderWrap}>
                <div className={styles.groupsFinder}>
                    <input type="text" placeholder='Искать сообщества...' value={search} onChange={e => setSearch(e.target.value)}/>
                    <div>
                        <Search className={styles.groupsFinderSearch}/>
                    </div>
                </div>
            </div>
            {!isSearch && data && data.map(group => 
                <GroupHolder key={group.id} group_id={group.group_id}/>
            )}
            {isSearch && groupsData && data && groupsData.map(group => 
                <GroupHolder key={group.id} group_id={String(group.id)} user_subscriptions={data.map(group => group.group_id)}/>
            )}
        </div>
    );
};

export default GroupsPage;