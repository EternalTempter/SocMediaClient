import React from 'react';
import { IUser } from '../../models';
import { useGetAllUserMessagesCountQuery } from '../../store/socmedia/messages/messages.api';
import jwt_decode from 'jwt-decode';
import styles from './Statistics.module.scss';
import { useGetAllLikedPostsCountQuery, useGetAllUserCommentsCountQuery, useGetUserMostLikedPostCountQuery } from '../../store/socmedia/posts/posts.api';

const StatisticsWindow = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {isError: isAllUserMessagesCountError, isLoading: isAllUserMessagesCountLoading, data: allUserMessagesCountData} = useGetAllUserMessagesCountQuery(user.email)
    const {isError: isAllUserCommentsCountError, isLoading: isAllUserCommentsCountLoading, data: allUserCommentsCountData} = useGetAllUserCommentsCountQuery(user.email);
    const {isError: isAllUserLikesCountError, isLoading: isAllUserLikesCountLoading, data: allUserLikesCountData} = useGetAllLikedPostsCountQuery(user.email)
    const {isError: isAllUserMostLikedPostCountError, isLoading: isAllUserMostLikedPostCountLoading, data: allUserMostLikedPostCountData} = useGetUserMostLikedPostCountQuery(user.email)
    return (
        <div className={styles.stats}>
            <h2>Ваша статистика</h2>
            <div className={styles.statsLabelUnderline}></div>

            <div className={styles.statistic}>
                <p>Отправлено сообщений</p>
                <p>{allUserMessagesCountData && allUserMessagesCountData}</p>
            </div>
            <div className={styles.statsUnderline}></div>

            <div className={styles.statistic}>
                <p>Количество ваших комментариев</p>
                <p>{allUserCommentsCountData && allUserCommentsCountData}</p>
            </div>
            <div className={styles.statsUnderline}></div>
            
            <div className={styles.statistic}>
                <p>Количество ваших лайков на посты</p>
                <p>{allUserLikesCountData && allUserLikesCountData}</p>
            </div>
            <div className={styles.statsUnderline}></div>

            <div className={styles.statistic}>
                <p>Количество лайков на лучшем посте</p>
                <p>{allUserMostLikedPostCountData && allUserMostLikedPostCountData}</p>
            </div>
            <div className={styles.statsUnderline}></div>
        </div>
    );
};

export default StatisticsWindow;