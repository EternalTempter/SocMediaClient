import React, { FC, useRef, useState, useEffect } from 'react';
import { useObserver } from '../../hooks/useObserver';
import { IGroupUsers, IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import styles from './GroupsWrap.module.scss';
import GroupHolder from '../GroupHolder/GroupHolder';

interface GroupsWrapProps {
    getGroups: (obj: {}) => void
    isLoading: boolean
    data: any
    type: string
    id?: string
    newGroupData?: IGroupUsers
    subscriptions?: string[]
}

const GroupsWrap:FC<GroupsWrapProps> = ({getGroups, isLoading, data, type, id, newGroupData, subscriptions}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [groups, setGroups] = useState<IGroupUsers[]>([]);

    const lastElement = useRef<HTMLDivElement>(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    function checkIfValueNotExistInPostsArray(value: number) {
        if(groups.length === 0) return true;
        return groups.filter(group => group.id === value).length === 0;
    }

    function hidePost(id: number) {
        setGroups(groups.filter(group => group.id !== id))
    }
    
    useObserver(lastElement, isLoading, totalPages, page, () => {
        setPage((page) => page + 1);
    })

    useEffect(() => {
        if(data) {
            let groupsToImplement = data.rows.filter(post => checkIfValueNotExistInPostsArray(post.id));
            setGroups([...groups, ...groupsToImplement])
            if(totalPages === null) {
                setTotalPages(data.count);
            }
        }
    }, [data])
    
    useEffect(() => {
        if(type === 'SUBSCRIBED_GROUPS')
            getGroups({id: user.email, limit: 5, page: page});
        else {
            getGroups({ids: JSON.stringify(subscriptions), limit: 5, page: page});
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
            {groups.map(group => 
                <GroupHolder key={group.id} group_id={group.group_id || String(group.id)} user_subscriptions={subscriptions}></GroupHolder>
            )}
            <div ref={lastElement} className={styles.lastElement}></div>
        </div>
    );
};

export default GroupsWrap;