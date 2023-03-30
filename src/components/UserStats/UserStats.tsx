import React, { FC } from 'react';
import { IUser } from '../../models';
import styles from './UserStats.module.scss';
import jwt_decode from 'jwt-decode';
import { useGetUserFriendsCountQuery, useGetUserSubscribersCountQuery } from '../../store/socmedia/friends/friends.api';
import { useGetUserPostsCountQuery } from '../../store/socmedia/posts/posts.api';
import { useGetUserGroupSubsCountQuery } from '../../store/socmedia/groupUsers/groupUsers.api';
import SkeletonLoader from '../UI/SkeletonLoader/SkeletonLoader';

interface UserStatsProps {
    id: string
}

const UserStats:FC<UserStatsProps> = ({id}) => {
    const {isLoading, data} = useGetUserPostsCountQuery(id);
    const {isLoading: isFriendsLoading, data: friendsData} = useGetUserFriendsCountQuery(id);
    const {isLoading: isSubsLoading, data: subsData} = useGetUserSubscribersCountQuery(id);
    const {isLoading: isGroupSubsLoading, data: groupSubsData} = useGetUserGroupSubsCountQuery(id);
    return (
        <>
            {!isLoading && !isFriendsLoading && !isSubsLoading && !isGroupSubsLoading &&
                <div className={styles.userStats}>
                    <div>
                        <p className={styles.userStatsCount}>{friendsData && friendsData}</p>
                        <p className={styles.userStatsType}>друзей</p>
                    </div>
                    <div>
                        <p className={styles.userStatsCount}>{groupSubsData && groupSubsData}</p>
                        <p className={styles.userStatsType}>группы</p>
                    </div>
                    <div>
                        <p className={styles.userStatsCount}>{subsData && subsData}</p>
                        <p className={styles.userStatsType}>подписчиков</p>
                    </div>
                    <div>
                        <p className={styles.userStatsCount}>{data && data}</p>
                        <p className={styles.userStatsType}>записи</p>
                    </div>
                </div>
            }
            {isLoading && isFriendsLoading && isSubsLoading && isGroupSubsLoading &&
                <div className={[styles.userStats, styles.skeleton].join(' ')}>
                    <SkeletonLoader borderRadius={0}/>
                </div>
            }
        </>
    );
};

export default UserStats;