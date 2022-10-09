import React, { FC, useEffect, useState } from 'react';
import styles from './GroupHolder.module.scss';
import { IGroup, IGroupUsers, IUser } from '../../models';
import BrokenHeart from '../../assets/svg/BrokenHeart';
import { useGetGroupByIdQuery } from '../../store/socmedia/groups/groups.api';
import { useGetAllGroupSubscribersQuery, useGetFirstGroupSubsQuery, useGetGroupSubsCountQuery, useLazySubscribeOnGroupQuery, useUnsubscribeOnGroupMutation } from '../../store/socmedia/groupUsers/groupUsers.api';
import jwt_decode from 'jwt-decode';
import Like from '../../assets/svg/Like';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../../envVariables/variables";
import GroupSubscriber from '../GroupSubscriber/GroupSubscriber';
import { useRejectFriendRequestMutation } from '../../store/socmedia/friends/friends.api';

interface GroupHolderProps {
    group_id: string
    user_subscriptions?: string[]
    refetch: () => void
    // refetchArgs: {}
}

const GroupHolder:FC<GroupHolderProps> = ({group_id, user_subscriptions, refetch}) => {  
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const navigate = useNavigate();
    
    const {isError: isGroupSubsError, isLoading: isGroupSubsLoading, data: groupSubsData, refetch: refetchFirstGroupSubs} = useGetFirstGroupSubsQuery({group_id: group_id, amount: 3});

    const {isError, isLoading, data} = useGetGroupByIdQuery(group_id);
    const {isError: isGroupSubsCountError, isLoading: isGroupSubsCountLoading, data: groupSubsCountData, refetch: refetchGroupSubs} = useGetGroupSubsCountQuery(group_id);
    const [unsubscribe, {isError: isUnsubscribeError, isLoading: isUnsubscribeLoading, data: unsubscribeData}] = useUnsubscribeOnGroupMutation();
    const [subscribe, {isError: isSubscribeError, isLoading: isSubscribeLoading, data: subscribeData}] = useLazySubscribeOnGroupQuery();
    const [buttonValue, setButtonValue] = useState('');

    useEffect(() => {
        if(user_subscriptions) 
            (user_subscriptions.includes(group_id)) ? setButtonValue('Отписаться') : setButtonValue('Подписаться')
        else 
            setButtonValue('Отписаться')
    }, [user_subscriptions])

    function groupOptionHandler(event) {
        event.stopPropagation();
        if(buttonValue === 'Отписаться') unsubscribe({group_id: group_id, id: user.email})
        else subscribe({group_id: group_id, id: user.email});
    }

    useEffect(() => {
        if(subscribeData || unsubscribeData) {
            refetchGroupSubs()
            refetchFirstGroupSubs()
            refetch()
        }
    }, [subscribeData, unsubscribeData])

    return (
        <div className={styles.groupHolder} onClick={() => navigate(`/groups/${group_id}`)}>
            <div className={styles.groupPhoto}>
                {(data && data.image !== 'none') &&
                    <img src={baseUrl + data.image}/>
                }
            </div>
            <div className={styles.groupInfo}>
                <p className={styles.groupName}>{data && data.group_name}</p>
                <p className={styles.groupDescription}>{data && data.description.slice(0, 90)}{data && (data.description.length > 89) && '...'}</p>
                <div className={styles.groupType}>{data && data.type}</div>
            </div>
            <div className={styles.groupUsersHolder}>
                <div className={styles.groupUsers}>
                    {groupSubsData && groupSubsData.map(sub => 
                        <GroupSubscriber key={sub.id} user_id={sub.user_id}/>
                    )}
                </div>
                <p>{groupSubsCountData && groupSubsCountData} участников</p>
            </div>
            <div className={styles.addButton} onClick={event => groupOptionHandler(event)}>
                <p>{buttonValue}</p>
                <div>
                    {buttonValue === 'Отписаться' ? <BrokenHeart className={styles.addButtonBrokenHeart}/> : <Like className={styles.addButtonHeart}/>}              
                </div>
            </div>
        </div>
    ); 
};

export default GroupHolder;