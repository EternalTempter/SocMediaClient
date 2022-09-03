import React, { FC } from 'react';
import Like from '../../assets/svg/Like';
import { IComment } from '../../models';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import styles from './CommentHolder.module.scss';

interface CommentHolderProps {
    comment: IComment
}

const CommentHolder:FC<CommentHolderProps> = ({comment}) => {
    const {isError, isLoading, data} = useGetUserByEmailQuery(comment.user_id);
    return (
        <div className={styles.commentWrap}>
            <div className={styles.imageHolder}></div>
            <div className={styles.commentInfo}>
                <p className={styles.commenterName}>{data && data.name} {data && data.surname}</p>
                <p className={styles.comment}>{comment.comment}</p>
            </div>
            <div className={styles.likesAmount}>
                <div>
                    <Like className={styles.commentLike}/>    
                </div> 
                <p>{comment.likes_amount}</p>
            </div>
            <div className={styles.commentDate}>{String(comment.createdAt).replace('T', ' ').slice(0, -5)}</div>
        </div>
    );
};

export default CommentHolder;