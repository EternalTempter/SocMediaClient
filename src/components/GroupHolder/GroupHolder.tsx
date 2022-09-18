import React, { FC, useEffect, useState } from 'react';
import styles from './GroupHolder.module.scss';
import { IGroup, IGroupUsers, IUser } from '../../models';
import BrokenHeart from '../../assets/svg/BrokenHeart';
import { useGetGroupByIdQuery } from '../../store/socmedia/groups/groups.api';
import { useLazySubscribeOnGroupQuery, useUnsubscribeOnGroupMutation } from '../../store/socmedia/groupUsers/groupUsers.api';
import jwt_decode from 'jwt-decode';
import Like from '../../assets/svg/Like';
import { useNavigate } from 'react-router-dom';

interface GroupHolderProps {
    group_id: string
    user_subscriptions?: string[]
    refetch: () => void
    // refetchArgs: {}
}

const GroupHolder:FC<GroupHolderProps> = ({group_id, user_subscriptions, refetch}) => {  
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const navigate = useNavigate();
    
    const {isError, isLoading, data} = useGetGroupByIdQuery(group_id);
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
        if(buttonValue === 'Отписаться'){
            unsubscribe({group_id: group_id, id: user.email})
            refetch()
        } 
        else {
            subscribe({group_id: group_id, id: user.email});
            refetch()
        }
    }

    return (
        <div className={styles.groupHolder} onClick={() => navigate(`/groups/${group_id}`)}>
            <div className={styles.groupPhoto}></div>
            <div className={styles.groupInfo}>
                <p className={styles.groupName}>{data && data.group_name}</p>
                <p className={styles.groupDescription}>{data && data.description}</p>
                <div className={styles.groupType}>Затычка</div>
            </div>
            <div className={styles.groupUsersHolder}>
                <div className={styles.groupUsers}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p>23 623 участников</p>
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