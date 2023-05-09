import React, { FC, useEffect, useState } from 'react';
import styles from './GroupHolder.module.scss';
import { IUser } from '../../models';
import BrokenHeart from '../../assets/svg/BrokenHeart';
import { useGetGroupByIdQuery } from '../../store/socmedia/groups/groups.api';
import { useGetFirstGroupSubsQuery, useGetGroupSubsCountQuery, useLazySubscribeOnGroupQuery, useUnsubscribeOnGroupMutation } from '../../store/socmedia/groupUsers/groupUsers.api';
import jwt_decode from 'jwt-decode';
import Like from '../../assets/svg/Like';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../../envVariables/variables";
import GroupSubscriber from '../GroupSubscriber/GroupSubscriber';
import SkeletonLoader from '../UI/SkeletonLoader/SkeletonLoader';

interface GroupHolderProps {
    group_id: string
    user_subscriptions?: string[]
    refetchUserSubs: () => void
    isSubsLoading: boolean
    // refetch: (type: string, group: IGroupUsers) => void
}

const GroupHolder:FC<GroupHolderProps> = ({group_id, user_subscriptions, refetchUserSubs, isSubsLoading}) => {  
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const navigate = useNavigate();
    
    const {data: groupSubsData, isLoading: isGroupSubsLoading, refetch: refetchFirstGroupSubs} = useGetFirstGroupSubsQuery({group_id: group_id, amount: 3});

    // const {isError: isGroupUserError, isLoading: isGroupUserLoading, data: groupUserData} = useGetGroupUserQuery({group_id: group_id, user_id: user.email});

    const {data, isLoading} = useGetGroupByIdQuery(group_id);
    const {data: groupSubsCountData, refetch: refetchGroupSubs} = useGetGroupSubsCountQuery(group_id);
    const [unsubscribe, {isLoading: isUnsubscribeLoading, data: unsubscribeData}] = useUnsubscribeOnGroupMutation();
    const [subscribe, {isLoading: isSubscribeLoading, data: subscribeData}] = useLazySubscribeOnGroupQuery();
    const [buttonValue, setButtonValue] = useState('');

    useEffect(() => {
        if(user_subscriptions) 
            (user_subscriptions.includes(group_id)) ? setButtonValue('Отписаться') : setButtonValue('Подписаться')
        else 
            setButtonValue('Отписаться')
    }, [user_subscriptions])

    function groupOptionHandler(event) {
        event.stopPropagation();
        if(!isUnsubscribeLoading && !isSubscribeLoading && !isSubsLoading) {
            if(buttonValue === 'Отписаться') {
                unsubscribe({group_id: group_id, id: user.email})
            } 
            else {
                subscribe({group_id: group_id, id: user.email});
            } 
            
        }
    }

    useEffect(() => {
        if(subscribeData) {
            refetchGroupSubs()
            refetchFirstGroupSubs()
            refetchUserSubs()
        }
        if(unsubscribeData) {
            refetchGroupSubs()
            refetchFirstGroupSubs()
            refetchUserSubs()
        }
    }, [subscribeData, unsubscribeData])

    return (
        <div className={styles.groupHolder} onClick={() => navigate(`/groups/${group_id}`)}>
            <div className={styles.groupPhoto}>
                {isLoading && 
                    <SkeletonLoader borderRadius={999}/>
                }
                {(data && data.image !== 'none') &&
                    <img src={baseUrl + data.image}/>
                }
            </div>
            <div className={styles.groupInfo}>
                {isLoading &&
                    <div className={styles.skeletonGroupName}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {!isLoading && 
                    <p className={styles.groupName}>{data && data.group_name}</p>
                }
                {isLoading &&
                    <div className={styles.skeletonGroupDescription}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {!isLoading &&
                    <p className={styles.groupDescription}>{data && data.description.slice(0, 90)}{data && (data.description.length > 89) && '...'}</p>
                }
                {isLoading &&
                    <div className={[styles.groupType, styles.skeleton].join(' ')}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {!isLoading &&
                    <div className={styles.groupType}>
                        {data && data.type}
                    </div>
                }
            </div>
            {isGroupSubsLoading &&
                <div className={[styles.groupUsersHolder, styles.skeleton].join(' ')}>
                    <SkeletonLoader borderRadius={5}/>
                </div>
            }
            {!isGroupSubsLoading && 
                <div className={styles.groupUsersHolder}>
                    <div className={styles.groupUsers}>
                        {groupSubsData && groupSubsData.map(sub => 
                            <GroupSubscriber key={sub.id} user_id={sub.user_id}/>
                        )}
                    </div>
                    <p>{groupSubsCountData && groupSubsCountData} участников</p>
                </div>
            }
            {isLoading && 
                <div 
                    className={
                        buttonValue === 'Отписаться' 
                            ? 
                        [styles.addButton, styles.skeleton, styles.unsubscribe].join(' ') 
                            : 
                        [styles.addButton, styles.skeleton].join(' ')
                    } 
                >
                    <SkeletonLoader borderRadius={5}/>
                </div>
            }
            {!isLoading &&
                <div 
                    className={
                        buttonValue === 'Отписаться' 
                            ? 
                        [styles.addButton, styles.unsubscribe].join(' ') 
                            : 
                        styles.addButton
                    } 
                    onClick={event => groupOptionHandler(event)}
                >
                    <p>{buttonValue}</p>
                    <div>
                        {buttonValue === 'Отписаться' ? <BrokenHeart className={styles.addButtonBrokenHeart}/> : <Like className={styles.addButtonHeart}/>}              
                    </div>
                </div>
            }
        </div>
    ); 
};

export default GroupHolder;