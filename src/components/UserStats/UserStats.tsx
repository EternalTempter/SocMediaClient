import React, { FC } from 'react';
import { IUser } from '../../models';
import styles from './UserStats.module.scss';
import jwt_decode from 'jwt-decode';
import { useGetUserFriendsCountQuery, useGetUserSubscribersCountQuery } from '../../store/socmedia/friends/friends.api';
import { useGetUserPostsCountQuery } from '../../store/socmedia/posts/posts.api';
import { useGetUserGroupSubsCountQuery } from '../../store/socmedia/groupUsers/groupUsers.api';

interface UserStatsProps {
    id: string
}

const UserStats:FC<UserStatsProps> = ({id}) => {
    const {isLoading, isError, data} = useGetUserPostsCountQuery(id);
    const {isLoading: isFriendsLoading, isError: isFriendsError, data: friendsData} = useGetUserFriendsCountQuery(id);
    const {isLoading: isSubsLoading, isError: isSubsError, data: subsData} = useGetUserSubscribersCountQuery(id);
    const {isLoading: isGroupSubsLoading, isError: isGroupSubsError, data: groupSubsData} = useGetUserGroupSubsCountQuery(id);
    return (
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
    );
};

export default UserStats;