import React, { FC, useEffect, useState } from 'react';
import Like from '../../assets/svg/Like';
import Comment from '../../assets/svg/Comment';
import { IPost } from '../../models';
import { useLazyGetAllPostCommentsQuery, useSetLikeMutation } from '../../store/socmedia/posts/posts.api';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import styles from './Post.module.scss'
import Share from '../../assets/svg/Share';
import View from '../../assets/svg/View';
import Report from '../../assets/svg/Report';
import Dislike from '../../assets/svg/Dislike';
import CommentHolder from '../CommentHolder/CommentHolder';
import More from '../../assets/svg/More';
import Clip from '../../assets/svg/Clip';
import Smile from '../../assets/svg/Smile';
import Send from '../../assets/svg/Send';

interface PostProps {
    post: IPost
}

const Post:FC<PostProps> = ({post}) => {
    const {isError, isLoading, data} = useGetUserByEmailQuery(post.post_handler_id);
    const [setLike, {isError: isLikeError, isLoading: isLikeLoading, data: isLikeData}] = useSetLikeMutation();

    const [getComments, {isError: isCommentsError, isLoading: isCommentsLoading, data: commentsData}] = useLazyGetAllPostCommentsQuery()

    // const [isLiked, setIsLiked] = useState(false);
    const [state, setState] = useState(post.likes_amount);

    function setLikeHandler(id: number) {
        setLike({id});
        setState(state + 1);
    }

    function showCommentsHandler(){
        getComments(String(post.id));
    }

    useEffect(() => {

    }, []);

    return (
        <div className={styles.postWrap}>
                <div className={styles.postHeader}>
                    <div className={styles.postInfoWrap}>
                        <div className={styles.postImage}></div>
                        <div className={styles.postInfo}>
                            <p className={styles.postGroupName}>{data && data.name} {data && data.surname}</p>
                            <p className={styles.postPublicationDate}>{String(post.createdAt).replace('T', ' ').slice(0, -5)}</p>
                        </div>
                    </div>
                    <div className={styles.postButtons}>
                        <div className={styles.postButton}>
                            <Report className={styles.postReport}/>
                        </div>
                        <div className={styles.postButton}>
                            <Dislike className={styles.postDislike}/>
                        </div>
                        <div className={styles.postButton}>
                            <More className={styles.postMore}/>
                        </div>
                    </div>
                </div>
                <div className={styles.postBody}>
                    <p>{post && post.description}</p>
                    <img src={post && post.image}/>
                </div>
                <div className={styles.postFooter}>
                    <div className={styles.postFooterActions}>
                        <div className={styles.postLikes}>
                            <div onClick={() => setLikeHandler(post.id)}>
                                <Like className={styles.postLike}/>
                            </div>
                            <p>{state}</p>
                        </div>
                        <div className={styles.postComments}>
                            <div onClick={showCommentsHandler}>
                                <Comment className={styles.postComment}/>
                            </div>
                            <p>{post.comments_amount}</p>
                        </div>
                        <div className={styles.postShares}>
                            <div>
                                <Share className={styles.postShare}/>
                            </div>
                            <p>{post.shares_amount}</p>
                        </div>
                    </div>
                    <div className={styles.postViews}>
                        <div>
                            <View className={styles.postView}/>
                        </div>
                        <p>{post.views_amount}</p>
                    </div>
                    <div className={styles.postMostLikedComment}>
                        <div className={styles.postMostLikedCommentImage}></div>
                        <div className={styles.postMostLikedCommentInfo}>
                            <p>Имя человека</p>
                            <p>А тут какой то невероятно содержательный и интересный комментарий</p>
                        </div>
                        <div className={styles.postMostLikedCommentLikes}>
                            <Like className={styles.postMostLikedCommentLike}/>
                            <p>143</p>
                        </div>
                        <p className={styles.postMostLikedCommentDate}>22 Апр. 25:67:94</p>
                    </div>
                </div>
                <div className={styles.allPostComments}>
                    <div className={styles.commentLine}></div>
                    {commentsData && commentsData.map(comment => 
                        <CommentHolder comment={comment}/>
                    )}
                    <div className={styles.addComment}>
                        <div className={styles.addCommentUserImage}></div>
                        <div className={styles.addCommentHolder}>
                            <input type="text" placeholder='Напишите комментарий...'/>
                            <div className={styles.addCommentHolderIcons}>
                                <Clip className={styles.addCommentClip}/>
                                <Smile className={styles.addCommentSmile}/>
                            </div>
                        </div>
                        <div className={styles.sendComment}>
                            <Send className={styles.sendCommentIcon}/>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Post;