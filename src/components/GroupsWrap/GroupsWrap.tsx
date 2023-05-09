import React, { FC, useRef, useState, useEffect } from 'react';
import { useObserver } from '../../hooks/useObserver';
import { IGroupUsers, IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import styles from './GroupsWrap.module.scss';
import GroupHolder from '../GroupHolder/GroupHolder';
import { useGetAllUserGroupSubscriptionsQuery } from '../../store/socmedia/groups/groups.api';
import AlertHolder from '../UI/AlertHolder/AlertHolder';
import Button from '../UI/Button/Button';
import SearchError from '../../assets/svg/SearchError';

interface GroupsWrapProps {
    getGroups: (obj: {}) => void
    isLoading: boolean
    isError: boolean
    data: any
    type: string
    id?: string
    newGroupData?: IGroupUsers
    buttonState: string
    setButtonState: (value: string) => void
    setCreateGroupModalVisible: (value: boolean) => void
}

const GroupsWrap:FC<GroupsWrapProps> = ({
        getGroups, 
        isLoading, 
        isError, 
        data, 
        type, 
        id, 
        newGroupData, 
        buttonState, 
        setButtonState, 
        setCreateGroupModalVisible,
    }) => {

    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [groups, setGroups] = useState<IGroupUsers[]>([]);

    const lastElement = useRef<HTMLDivElement>(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    
    const [isNoGroupsAlertVisible, setIsNoGroupsAlertVisible] = useState(false);

    const {isError: isSubsError, isLoading: isSubsLoading, data: subsData, refetch} = useGetAllUserGroupSubscriptionsQuery({id: user.email, limit: 400});

    function checkIfValueNotExistInPostsArray(value: number) {
        if(groups.length === 0) return true;
        return groups.filter(group => group.id === value).length === 0;
    }

    function hidePost(id: number) {
        setGroups(groups.filter(group => group.id !== id))
    }

    // function check(id: string) {
    //     console.log(subscriptions?.includes(id), subscriptions, id);
    //     return subscriptions?.includes(id);
    // }
    
    useObserver(lastElement, isLoading, totalPages, page, () => {
        setPage((page) => page + 1);
    })

    useEffect(() => {
        if(data) {
            let groupsToImplement = data.rows.filter(post => checkIfValueNotExistInPostsArray(post.id));
            setGroups([...groups, ...groupsToImplement])
            if(totalPages === null) {
                setTotalPages(Math.floor(data.count / 20));
            }
        }
    }, [data])

    useEffect(() => {
        if(groups) {
            setIsNoGroupsAlertVisible(data && (data[0] === undefined) && groups && (groups[0] === undefined) && buttonState !== 'Рекомендации' && !isLoading && !isError);
        }
    }, [groups])
    
    useEffect(() => {
        if(type === 'SUBSCRIBED_GROUPS')
            getGroups({id: user.email, limit: 20, page: page});
        else {
            getGroups({ids: JSON.stringify(subsData.rows.map(sub => sub.group_id)), limit: 20, page: page});
        }
    }, [page])

    useEffect(() => {
        if(id) {
            setGroups([]);
            getGroups({id: id || user.email, limit: 5, page: 1})
        }
    }, [id])

    useEffect(() => {
        if(newGroupData) setGroups([newGroupData, ...groups])
    }, [newGroupData])

    return (
        <div className={styles.wrap}>
            {isNoGroupsAlertVisible &&
                <AlertHolder 
                    icon={<SearchError className={styles.alertIconDefault}/>}
                    label="Вы пока не подписаны ни на одну группу, можете подписаться на понравившиеся группы в рекомендациях"
                    button={
                        <Button 
                            onClick={() => setButtonState('Рекомендации')} 
                            isActive={false}
                        >Смотреть рекомендации</Button>
                    }
                />
            }
            {subsData && groups.map(group => 
                <GroupHolder 
                    key={group.id} 
                    group_id={group.group_id || String(group.id)} 
                    user_subscriptions={subsData.rows.map(sub => sub.group_id)}
                    refetchUserSubs={refetch}
                    isSubsLoading={isSubsLoading}
                ></GroupHolder>
            )}
            <div ref={lastElement} className={styles.lastElement}></div>
        </div>
    );
};

export default GroupsWrap;