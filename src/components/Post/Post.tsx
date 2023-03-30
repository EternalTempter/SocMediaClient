import React, { FC, useEffect, useRef, useState } from 'react';
import Like from '../../assets/svg/Like';
import Comment from '../../assets/svg/Comment';
import { IPost, IUser } from '../../models';
import { useDeletePostMutation, useGetBestPostCommentQuery, useIsPostLikedQuery, useLazyGetAllPostCommentsQuery, useLazyGetPostCommentsAmountQuery, useLazyRemoveLikeQuery, usePasteCommentToPostMutation, useSetLikeMutation, useUpdateViewsCountMutation } from '../../store/socmedia/posts/posts.api';
import { useLazyGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import styles from './Post.module.scss'
import View from '../../assets/svg/View';
import Report from '../../assets/svg/Report';
import Dislike from '../../assets/svg/Dislike';
import CommentHolder from '../CommentHolder/CommentHolder';
import More from '../../assets/svg/More';
import Send from '../../assets/svg/Send';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useLazyGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import { useLazyGetGroupByIdQuery } from '../../store/socmedia/groups/groups.api';
import { baseUrl } from "../../envVariables/variables";
import SendComment from '../SendComment/SendComment';
import { getFormattedDateAndTimeForPost } from '../../helpers/helpers';
import TrashCan from '../../assets/svg/TrashCan';
import Loader from '../UI/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import SkeletonLoader from '../UI/SkeletonLoader/SkeletonLoader';

interface PostProps {
    post: IPost
    hidePost: (id: number) => void
    reportPost: (id: number) => void
    filterPostsAfterDeletion: (id: number) => void
}

const Post:FC<PostProps> = ({post, hidePost, filterPostsAfterDeletion, reportPost}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    let [deletePost, {isError: isDeletePostError, isLoading: isDeletePostLoading, data: deletePostData}] = useDeletePostMutation();

    const navigate = useNavigate();

    const [getGroupData, {isLoading: isGroupDataLoading, data: groupData}] = useLazyGetGroupByIdQuery();
    const [getUserData, {isLoading: isUserDataLoading, data: userData}] = useLazyGetUserDataQuery();

    const [getUser, {isLoading, data}] = useLazyGetUserByEmailQuery();
    const [setLike, {isError: isLikeError, isLoading: isLikeLoading}] = useSetLikeMutation();
    const [removeLike, {isError: isRemoveLikeError, isLoading: isRemoveLikeLoading}] = useLazyRemoveLikeQuery();

    const [getComments, {isError: isCommentsError, isLoading: isCommentsLoading, data: commentsData}] = useLazyGetAllPostCommentsQuery()
    const [pasteComment, {isError: isCommentError, data: commentData}] = usePasteCommentToPostMutation();

    const {isLoading: isBestCommentLoading, data: bestCommentData, refetch: refetchBestComment} = useGetBestPostCommentQuery(String(post.id))
    const [getCommentsAmount, {data: commentsAmountData}] = useLazyGetPostCommentsAmountQuery();

    const {data: postLikeData} = useIsPostLikedQuery({user_id: user.email, post_id: String(post.id)});

    const [updateViewsAmount] = useUpdateViewsCountMutation();

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
            if(!isRemoveLikeLoading) {
                removeLike({id: String(post.id), user_id: user.email, type: 'POST_LIKE'});
                setIsLiked(false);
                setState(state - 1);
            }
        }
        else {
            if(!isLikeLoading) {
                setLike({id, user_id: user.email});
                setIsLiked(true);
                setState(state + 1);
            }
        }
    }

    function pasteCommentHandler() {
        if(currentComment.length > 0) {
            pasteComment({post_id: post.id, user_id: user.email , comment: currentComment});
            getCommentsAmount(String(post.id));
            refetchBestComment();
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

    function deletePostHandler(id: number) {
        deletePost({id: id});
    }

    function notify(errorMessage: string) {
        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    useEffect(() => {
        if(isDeletePostError && isDeletePostError === true) {
            notify('Произошла ошибка при удалении поста');
        }
    }, [isDeletePostError])

    useEffect(() => {
        if(isLikeError && isLikeError === true) {
            notify('Произошла ошибка при добавлении лайка на пост');
        }
    }, [isLikeError])

    useEffect(() => {
        if(isRemoveLikeError && isRemoveLikeError === true) {
            notify('Произошла ошибка при удалении лайка с поста');
        }
    }, [isRemoveLikeError])

    useEffect(() => {
        if(isCommentsError && isCommentsError === true) {
            notify('Произошла ошибка при загрузке комментариев к посту');
        }
    }, [isCommentsError])

    useEffect(() => {
        if(isCommentError && isCommentError === true) {
            notify('Произошла ошибка при отправке комментария');
        }
    }, [isCommentError])

    useEffect(() => {
        if(deletePostData) filterPostsAfterDeletion(post.id);
    }, [deletePostData])

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
        <div className={styles.postWrap} ref={lastElement}>
            {isDeletePostLoading &&
                <div className={styles.postDeleteLoading}>
                    <Loader type="regular"/>
                </div>
            }
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
                        {(isUserDataLoading || isGroupDataLoading) &&
                            <SkeletonLoader borderRadius={999}/>
                        }
                        </div>
                        {(isUserDataLoading || isGroupDataLoading) &&
                            <div className={styles.postInfoLoader}>
                                <SkeletonLoader borderRadius={5}/>
                            </div>
                        }
                        {!(isUserDataLoading || isGroupDataLoading || isLoading) &&
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
                                <p className={styles.postPublicationDate}>{getFormattedDateAndTimeForPost(post.createdAt)}</p>
                            </div>
                        }
                    </div>
                    <div className={styles.postButtons}>
                        {post.post_handler_id === user.email &&
                            <div 
                                className={[styles.postButton, styles.postButtonDelete].join(' ')}
                                onClick={() => deletePostHandler(post.id)}
                            >
                                <TrashCan className={styles.postDelete}/>
                            </div>
                        }
                        <div 
                            className={[styles.postButton, styles.postButtonReport].join(' ')}
                            onClick={() => reportPost(post.id)}
                        >
                            <Report className={styles.postReport}/>
                        </div>
                        <div 
                            className={[styles.postButton, styles.postButtonDislike].join(' ')} 
                            onClick={() => hidePost(post.id)}
                        >
                            <Dislike className={styles.postDislike}/>
                        </div>
                        <div 
                            className={[styles.postButton, styles.postButtonMore].join(' ')} 
                            onClick={() => hiddenPostOptionsVisible ? setHiddenPostOptions(false) : setHiddenPostOptions(true)}
                        >
                            <More className={styles.postMore}/>
                        </div>
                        {hiddenPostOptionsVisible &&
                            <div className={styles.hiddenPostOptions}>
                                <a onClick={() => hidePost(post.id)}>Скрыть пост</a>
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
                                <View className={styles.postView}/>
                            </div>
                            <p>{post.views_amount}</p>
                        </div>
                    </div>
                    <div className={styles.postViews}>
                        <div>
                            <View className={styles.postView}/>
                        </div>
                        <p>{post.views_amount}</p>
                    </div>
                    <div className={styles.postMostLikedComment}>
                        {bestCommentData && 
                            <CommentHolder comment={bestCommentData} type='BEST_COMMENT'/>
                        }
                        {isBestCommentLoading && 
                            <SkeletonLoader borderRadius={5}/>
                        }
                        {!bestCommentData && !isBestCommentLoading &&
                            <p className={styles.emptyBestComment}>Место для лучшего комментария пустует. Напишите свой!</p>
                        }
                    </div>
                </div>
                <div className={commentClasses.join(' ')}>
                    <div className={styles.commentLine}></div>
                    {isCommentsLoading && 
                        <Loader type="mini"/>
                    }
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
        </>
    );
};

export default Post;