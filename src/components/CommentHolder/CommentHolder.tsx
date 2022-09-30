import React, { FC, useEffect, useState } from 'react';
import Like from '../../assets/svg/Like';
import { IComment, IUser } from '../../models';
import { useIsCommentLikedQuery, useLazyRemoveLikeFromCommentQuery, useSetLikeToPostCommentMutation } from '../../store/socmedia/posts/posts.api';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import styles from './CommentHolder.module.scss';
import jwt_decode from 'jwt-decode';

interface CommentHolderProps {
    comment: IComment
    type: string
}

const CommentHolder:FC<CommentHolderProps> = ({comment, type}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const [isLiked, setIsLiked] = useState(false);
    const [commentLikes, setCommentLikes] = useState(comment.likes_amount)

    const {isError, isLoading, data} = useGetUserByEmailQuery(comment.user_id);
    const {isError: isCommentLikeError, isLoading: isCommentLikeLoading, data: commentLikeData} = useIsCommentLikedQuery({comment_id: String(comment.id), user_id: user.email})

    const [setLike, {isError: isSetCommentLikeError, isLoading: isSetCommentLikeLoading, data: setCommentLikeData}] = useSetLikeToPostCommentMutation();
    const [removeLike, {isError: isRemoveCommentLikeError, isLoading: isRemoveCommentLikeLoading, data: removeCommentLikeData}] = useLazyRemoveLikeFromCommentQuery();

    function toggleLikeHandler() {
        if(isLiked) {
            removeLike({id: String(comment.id), user_id: user.email, type: 'COMMENT_LIKE'})
            setCommentLikes(commentLikes - 1);
            setIsLiked(false)
        }
        else {
            setLike({id: String(comment.id), user_id: user.email});
            setCommentLikes(commentLikes + 1);
            setIsLiked(true)
        }
    }
    
    useEffect(() => {
        if(commentLikeData) {
            setIsLiked(commentLikeData);
        }
    }, [commentLikeData]);

    return (
        <div className={type === 'REGULAR_COMMENT' ? styles.commentWrap : styles.bestCommentWrap}>
            <div className={styles.imageHolder}></div>
            <div className={styles.commentInfo}>
                <p className={styles.commenterName}>{data && data.name} {data && data.surname}</p>
                <p className={styles.comment}>{comment.comment}</p>
            </div>
            <div className={styles.likesAmount}>
                <div onClick={toggleLikeHandler}>
                    {isLiked
                        ?
                            <Like className={[styles.commentLike, styles.liked].join(' ')}/>
                        :
                            <Like className={styles.commentLike}/>
                    }
                </div>
                <p>{commentLikes}</p>
            </div>
            <div className={styles.commentDate}>{String(comment.createdAt).replace('T', ' ').slice(0, -5)}</div>
        </div>
    );
};

export default CommentHolder;