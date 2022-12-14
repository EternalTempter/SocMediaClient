import React, { FC, useEffect, useRef, useState } from 'react';
import Like from '../../assets/svg/Like';
import Comment from '../../assets/svg/Comment';
import { IPost, IUser } from '../../models';
import { useGetBestPostCommentQuery, useIsPostLikedQuery, useLazyGetAllPostCommentsQuery, useLazyGetPostCommentsAmountQuery, useLazyRemoveLikeQuery, usePasteCommentToPostMutation, useSetLikeMutation, useUpdateViewsCountMutation } from '../../store/socmedia/posts/posts.api';
import { useLazyGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
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
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useLazyGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import { useLazyGetGroupByIdQuery } from '../../store/socmedia/groups/groups.api';
import { baseUrl } from "../../envVariables/variables";
import SendComment from '../SendComment/SendComment';

interface PostProps {
    post: IPost
    hidePost: (id: number) => void
}

const Post:FC<PostProps> = ({post, hidePost}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const navigate = useNavigate();

    const [getGroupData, {isError: isGroupDataError, isLoading: isGroupDataLoading, data: groupData}] = useLazyGetGroupByIdQuery();
    const [getUserData, {isError: isUserDataError, isLoading: isUserDataLoading, data: userData}] = useLazyGetUserDataQuery();

    const [getUser, {isError, isLoading, data}] = useLazyGetUserByEmailQuery();
    const [setLike, {isError: isLikeError, isLoading: isLikeLoading, data: isLikeData}] = useSetLikeMutation();
    const [removeLike, {isError: isRemoveLikeError, isLoading: isRemoveLikeLoading, data: removeLikeData}] = useLazyRemoveLikeQuery();

    const [getComments, {isError: isCommentsError, isLoading: isCommentsLoading, data: commentsData}] = useLazyGetAllPostCommentsQuery()
    const [pasteComment, {isError: isCommentError, isLoading: isCommentLoading, data: commentData}] = usePasteCommentToPostMutation();

    const {isError: isBestCommentError, isLoading: isBestCommentLoading, data: bestCommentData} = useGetBestPostCommentQuery(String(post.id))
    const [getCommentsAmount, {isError: isCommentsAmountError, isLoading: isCommentsAmountLoading, data: commentsAmountData}] = useLazyGetPostCommentsAmountQuery();

    const {isError: isPostLikeError, isLoading: isPostLikeLoading, data: postLikeData} = useIsPostLikedQuery({user_id: user.email, post_id: String(post.id)});

    const [updateViewsAmount, {isError: isViewsError, isLoading: isViewsLoading, data: viewsData}] = useUpdateViewsCountMutation();

    const [isLiked, setIsLiked] = useState(false);
    const [state, setState] = useState(post.likes_amount);

    const [isViewed, setIsViewed] = useState(false)

    const [hiddenPostOptionsVisible, setHiddenPostOptions] = useState(false);

    const [currentComment, setCurrentComment] = useState('');
    const [commentClasses, setCommentClasses] = useState([styles.allPostComments, styles.off]);

    const lastElement = useRef<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver>();

    function toggleLikeHandler(id: number) {
        if(isLiked) {
            removeLike({id: String(post.id), user_id: user.email, type: 'POST_LIKE'});
            setIsLiked(false);
            setState(state - 1);
        }
        else {
            setLike({id, user_id: user.email});
            setIsLiked(true);
            setState(state + 1);
        }
    }

    function pasteCommentHandler() {
        if(currentComment.length > 0) {
            pasteComment({post_id: post.id, user_id: user.email , comment: currentComment});
            setCurrentComment('');
        }
    }

    function showCommentsHandler(){
        getComments(String(post.id));
    }
    
    function toggleCommentClasses() {
        if(commentClasses.includes(styles.off)) {
            showCommentsHandler();
            getCommentsAmount(String(post.id));
            setCommentClasses([styles.allPostComments]);
        }
        else
            setCommentClasses([styles.allPostComments, styles.off]);
    }

    useEffect(() => {
        if(commentData) getComments(String(post.id))
    }, [commentData])

    useEffect(() => {
        if(post) {
            if(post.post_handler_type === 'USER'){
                getUserData(post.post_handler_id);
                getUser(post.post_handler_id);
            } 
            else
                getGroupData(post.post_handler_id);
        }
    }, [post])

    useEffect(() => {
        if(postLikeData) {
            setIsLiked(postLikeData);
        }
    }, [postLikeData]);

    useEffect(() => {
        var options = {
            root: document.querySelector('.newsPageWrap'),
            rootMargin: '0px',
            threshold: 1.0
        }
        var callback = function(entries, observer) {
            if(entries[0].isIntersecting && !isViewed){
                setIsViewed(true);
                updateViewsAmount({post_id: post.id})
            }
        };
        observer.current = new IntersectionObserver(callback, options);
        observer.current.observe(lastElement.current!)
    }, [])

    return (
        <div className={styles.postWrap} ref={lastElement}>
                <div className={styles.postHeader}>
                    <div className={styles.postInfoWrap}>
                        <div 
                            className={styles.postImage}
                            onClick={() => post.post_handler_type === 'USER' ? navigate(`/account/${post.post_handler_id}`) : navigate(`/groups/${post.post_handler_id}`)}
                        >
                        {
                            (userData && userData.image !== 'none') &&
                                <img src={baseUrl + userData.image}/>
                                    ||
                            (groupData && groupData.image !== 'none') && 
                                <img src={baseUrl + groupData.image}/>
                        }
                        </div>
                        <div className={styles.postInfo}>
                            <p 
                                className={styles.postGroupName} 
                                onClick={() => post.post_handler_type === 'USER' ? navigate(`/account/${post.post_handler_id}`) : navigate(`/groups/${post.post_handler_id}`)}
                            >
                                {
                                    data && [data.name, data.surname].join(' ')
                                        ||
                                    groupData && groupData.group_name
                                }
                            </p>
                            <p className={styles.postPublicationDate}>{String(post.createdAt).replace('T', ' ').slice(0, -5)}</p>
                        </div>
                    </div>
                    <div className={styles.postButtons}>
                        <div className={styles.postButton}>
                            <Report className={styles.postReport}/>
                        </div>
                        <div className={styles.postButton} onClick={() => hidePost(post.id)}>
                            <Dislike className={styles.postDislike}/>
                        </div>
                        <div className={styles.postButton} onClick={() => hiddenPostOptionsVisible ? setHiddenPostOptions(false) : setHiddenPostOptions(true)}>
                            <More className={styles.postMore}/>
                        </div>
                        {hiddenPostOptionsVisible &&
                            <div className={styles.hiddenPostOptions}>
                                <a onClick={() => hidePost(post.id)}>???????????? ????????</a>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.postBody}>
                    <p>{post && post.description}</p>
                    {
                        (post && post.image !== 'none') 
                            &&
                        <img src={baseUrl + post.image}/>
                    }
                </div>
                <div className={styles.postFooter}>
                    <div className={styles.postFooterActions}>
                        <div className={styles.postLikes}>
                            <div onClick={() => toggleLikeHandler(post.id)}>
                                {isLiked 
                                    ?
                                        <Like className={[styles.postLike, styles.liked].join(' ')}/>
                                    :
                                        <Like className={styles.postLike}/>
                                    }
                                </div>
                            <p>{state}</p>
                        </div>
                        <div className={styles.postComments}>
                            <div onClick={toggleCommentClasses}>
                                <Comment className={styles.postComment}/>
                            </div>
                            <p>{!commentsAmountData ? post.comments_amount : commentsAmountData}</p>
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
                        {
                            bestCommentData && <CommentHolder comment={bestCommentData} type='BEST_COMMENT'/>
                        }
                    </div>
                </div>
                <div className={commentClasses.join(' ')}>
                    <div className={styles.commentLine}></div>
                    {commentsData && commentsData.map(comment => 
                        <CommentHolder key={comment.id} comment={comment} type='REGULAR_COMMENT'/>
                    )}
                    <SendComment 
                        currentComment={currentComment} 
                        setCurrentComment={setCurrentComment} 
                        pasteCommentHandler={pasteCommentHandler}
                    />
                </div>
            </div>
    );
};

export default Post;