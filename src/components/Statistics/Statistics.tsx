import React, { useEffect, useState } from 'react';
import { IUser } from '../../models';
import { useGetAllUserMessagesCountQuery } from '../../store/socmedia/messages/messages.api';
import jwt_decode from 'jwt-decode';
import styles from './Statistics.module.scss';
import { useGetAllLikedPostsCountQuery, useGetAllPostsCountQuery, useGetAllUserCommentsCountQuery, useGetUserMostLikedCommentQuery, useGetUserMostLikedPostCountQuery } from '../../store/socmedia/posts/posts.api';
import Like from '../../assets/svg/Like';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import { addZero, getDaysCountSinceRegistration } from '../../helpers/helpers';
import SkeletonLoader from '../UI/SkeletonLoader/SkeletonLoader';

const StatisticsWindow = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const {isLoading, data} = useGetUserByEmailQuery(user.email); 

    const [likesPercentage, setLikesPercentage] = useState(0);

    const [lastDays, setLastDays] = useState<string[]>();

    const {isLoading: isAllUserMessagesCountLoading, data: allUserMessagesCountData} = useGetAllUserMessagesCountQuery(user.email)
    const {isLoading: isAllUserCommentsCountLoading, data: allUserCommentsCountData} = useGetAllUserCommentsCountQuery(user.email);
    const {isLoading: isAllUserLikesCountLoading, data: allUserLikesCountData} = useGetAllLikedPostsCountQuery(user.email)
    const {isLoading: isAllPostsCountLoading, data: allPostsCountData} = useGetAllPostsCountQuery('')
    const {isLoading: isAllUserMostLikedPostCountLoading, data: allUserMostLikedPostCountData} = useGetUserMostLikedPostCountQuery(user.email)
    const {isLoading: isAllUserMostLikedCommentCountLoading, data: allUserMostLikedCommentCountData} = useGetUserMostLikedCommentQuery(user.email)

    const style = { "--p": likesPercentage } as React.CSSProperties;

    useEffect(() => {
        if(allPostsCountData && allUserLikesCountData) {
            setLikesPercentage(Math.floor(allPostsCountData / allUserLikesCountData));
        }
    }, [allPostsCountData, allUserLikesCountData])

    useEffect(() => {
        if(data) {
            let daysSinceRegistration = getDaysCountSinceRegistration(data.createdAt);
            daysSinceRegistration++;
            
            if(daysSinceRegistration > 7) {
                daysSinceRegistration = 7;
            } 

            let currentDate = new Date();
            let lastDays:number[] = [];

            for(let i = 0; i < daysSinceRegistration; i++) {
                lastDays.push(currentDate.getDate() - i);
            }

            let monthes:number[] = [];
            let previousMonth = currentDate.getMonth() - 1;
            let daysCount = getDaysCountInMonth(previousMonth);

            for(let i = 1; i <= Number(daysCount); i++) {
                monthes.push(i);
            }

            setLastDays(lastDays.map(elem => {
                if(elem <= 0) return `${addZero(monthes[monthes.length + elem - 1])}.${addZero(previousMonth + 1)}`;
                else return `${addZero(elem)}.${addZero(previousMonth + 2)}`;           
            }));          
        }
    }, [data])

    function getDaysCountInMonth(month) {
        if(month === -1) month = 11;
        else if(month === 1) return 28;
        else if(month % 2 == 0) return 31;
        else return 30;
    }

    return (
        <div className={styles.statsWrap}>
            <p className={styles.label}>Статистика за все время</p>
            <div className={styles.stats}>
                {isLoading &&                 
                    <div className={[styles.registrationStreak, styles.skeleton].join(' ')}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {!isLoading &&
                    <div className={styles.registrationStreak}>
                        <h1>{data && getDaysCountSinceRegistration(data.createdAt)}</h1>
                        <p>Дней прошло с момента регистрации</p>
                    </div>
                } 
                {isAllUserMessagesCountLoading &&
                    <div className={[styles.messages, styles.skeleton].join(' ')}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {!isAllUserMessagesCountLoading &&
                    <div className={styles.messages}>
                        <h1>{allUserMessagesCountData}</h1>
                        <p>Сообщений отправлено</p>
                    </div>
                }
                {isAllUserLikesCountLoading &&
                    <div className={[styles.likes, styles.skeleton].join(' ')}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {!isAllUserLikesCountLoading &&                
                    <div className={styles.likes}>
                        <h1>{allUserLikesCountData}</h1>
                        <p>Лайков оставлено на постах</p>
                    </div>
                }
                {(isAllUserLikesCountLoading || isAllPostsCountLoading) &&             
                    <div className={[styles.likesPercentage, styles.skeleton].join(' ')}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {(!isAllUserLikesCountLoading && !isAllPostsCountLoading) &&                
                    <div className={styles.likesPercentage}>
                        <div 
                            className={[styles.pie, styles.animate].join(' ')}
                            style={style}
                        >{likesPercentage}%</div>
                        <p>Лайкнутых постов в ленте</p>
                    </div>
                }
                {isAllUserLikesCountLoading &&
                    <div className={[styles.views, styles.skeleton].join(' ')}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {!isAllUserMostLikedPostCountLoading &&
                    <div className={styles.views}>
                        <h1>{allUserMostLikedPostCountData}</h1>
                        <p>Лайков на вашем самом популярном посте</p>
                    </div>
                }
                {(isAllUserCommentsCountLoading || isAllUserMostLikedCommentCountLoading) &&
                    <div className={[styles.comments, styles.skeleton].join(' ')}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {(!isAllUserCommentsCountLoading && !isAllUserMostLikedCommentCountLoading) &&
                    <div className={styles.comments}>
                        <h1>{allUserCommentsCountData}</h1>
                        <p>Комментариев оставлено</p>
                        <div className={styles.bestComment}>
                            <h3>Лучший комментарий</h3>
                            <div>
                                <Like className={styles.likeIcon}/>
                                <p>{allUserMostLikedCommentCountData && allUserMostLikedCommentCountData.likes_amount}</p>
                            </div>
                            <p className={styles.comment}>
                                {allUserMostLikedCommentCountData && allUserMostLikedCommentCountData.comment}
                            </p>
                        </div>
                    </div>
                }
                {isAllUserLikesCountLoading &&
                    <div className={[styles.activityGraph, styles.skeleton].join(' ')}>
                        <SkeletonLoader borderRadius={5}/>
                    </div>
                }
                {!isAllUserLikesCountLoading &&
                    <div className={styles.activityGraph}>
                        <p>Средняя активность в течение недели</p>
                        <div className={styles.graph}>
                            <div className={styles.graphPoints}>
                                {lastDays?.map(elem => 
                                    <div></div>
                                )}
                            </div>
                            <div className={styles.graphLine}>
                                
                            </div>
                            <div className={styles.graphDays}>
                                {lastDays && lastDays?.reverse().map(elem => 
                                    <p>{elem}</p>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default StatisticsWindow;