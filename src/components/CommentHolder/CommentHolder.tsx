import React, { FC, useEffect, useState } from 'react';
import Like from '../../assets/svg/Like';
import { IComment, IUser } from '../../models';
import { useIsCommentLikedQuery, useLazyRemoveLikeFromCommentQuery, useSetLikeToPostCommentMutation } from '../../store/socmedia/posts/posts.api';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import styles from './CommentHolder.module.scss';
import jwt_decode from 'jwt-decode';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import { baseUrl } from '../../envVariables/variables';
import { getFormattedDateAndTimeForPost, notifyError } from '../../helpers/helpers';
import Report from '../../assets/svg/Report';
import { ToastContainer } from 'react-toastify';
import ChooseReport from '../ChooseReport/ChooseReport';

interface CommentHolderProps {
    comment: IComment
    type: string
}

const CommentHolder:FC<CommentHolderProps> = ({comment, type}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const [isLiked, setIsLiked] = useState(false);
    const [commentLikes, setCommentLikes] = useState(comment.likes_amount)

    const [isReportVisible, setIsReportVisible] = useState(false);

    const {data} = useGetUserByEmailQuery(comment.user_id);
    const {data: userData} = useGetUserDataQuery(comment.user_id)
    const {data: commentLikeData} = useIsCommentLikedQuery({comment_id: String(comment.id), user_id: user.email})

    const [setLike, {isError: isSetCommentLikeError, isLoading: isSetCommentLikeLoading}] = useSetLikeToPostCommentMutation();
    const [removeLike, {isError: isRemoveCommentLikeError, isLoading: isRemoveCommentLikeLoading}] = useLazyRemoveLikeFromCommentQuery();

    function toggleLikeHandler() {
        if(isLiked) {
            if(!isRemoveCommentLikeLoading) {
                removeLike({id: String(comment.id), user_id: user.email, type: 'COMMENT_LIKE'});
                setCommentLikes(commentLikes - 1);
                setIsLiked(false);
            }
        }
        else {
            if(!isSetCommentLikeLoading) {
                setLike({id: String(comment.id), user_id: user.email});
                setCommentLikes(commentLikes + 1);
                setIsLiked(true);
            }
        }
    }
    
    useEffect(() => {
        if(isSetCommentLikeError && isSetCommentLikeError === true) {
            notifyError('Произошла ошибка при добавлении лайка на комментарий');
        }
    }, [isSetCommentLikeError])

    useEffect(() => {
        if(isRemoveCommentLikeError && isRemoveCommentLikeError === true) {
            notifyError('Произошла ошибка при удалении лайка с комментария');
        }
    }, [isRemoveCommentLikeError])

    useEffect(() => {
        if(commentLikeData) {
            setIsLiked(commentLikeData);
        }
    }, [commentLikeData]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className={styles.toast}
            />
            {isReportVisible &&
                <ChooseReport 
                    setVisible={setIsReportVisible}
                    reported_id={comment.id}
                    reported_type='COMMENT'
                />
            }
            <div className={type === 'REGULAR_COMMENT' ? styles.commentWrap : styles.bestCommentWrap}>
                <div className={styles.imageHolder}>
                    {
                        (userData && userData.image !== 'none') &&
                            <img src={baseUrl + userData.image}/>
                    }
                </div>
                <div className={styles.commentInfo}>
                    <p className={styles.commenterName}>{data && data.name} {data && data.surname}</p>
                    <p className={styles.comment}>{comment.comment}</p>
                </div>
                <div className={styles.likesAmount}>
                    <div 
                        onClick={toggleLikeHandler} 
                        className={styles.commentLikeWrap}
                    >
                        {isLiked
                            ?
                                <Like className={[styles.commentLike, styles.liked].join(' ')}/>
                            :
                                <Like className={styles.commentLike}/>
                        }
                    </div>
                    <p>{commentLikes}</p>
                </div>
                <div className={styles.commentDate}>
                    <div 
                        className={styles.reportIconWrap} 
                        onClick={() => setIsReportVisible(true)}
                    >
                        <Report className={styles.reportIcon}/>
                    </div>
                    {getFormattedDateAndTimeForPost(comment.createdAt)}
                </div>
            </div>
        </>
    );
};

export default CommentHolder;