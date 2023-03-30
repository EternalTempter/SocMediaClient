import React, { FC, useEffect, useRef, useState } from 'react';
import { useObserver } from '../../hooks/useObserver';
import { IPost, IUser } from '../../models';
import Post from '../Post/Post';
import jwt_decode from 'jwt-decode';
import styles from './PostsWrap.module.scss';
import Loader from '../UI/Loader/Loader';
import ErrorHolder from '../UI/ErrorHolder/ErrorHolder';
import { toast, ToastContainer } from 'react-toastify';

interface PostsWrapProps {
    getPosts: (obj: {}) => void
    isLoading: boolean
    data: any
    type: string
    isError: boolean
    friendsIds?: string[]
    likesIds?: string[]
    id?: string
    newPostData?: IPost
}

const PostsWrap:FC<PostsWrapProps> = ({getPosts, isLoading, data, type, friendsIds, likesIds, id, newPostData, isError}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [posts, setPosts] = useState<IPost[]>([]);

    const lastElement = useRef<HTMLDivElement>(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    function checkIfValueNotExistInPostsArray(value: number) {
        if(posts.length === 0) return true;
        return posts.filter(post => post.id === value).length === 0;
    }

    function hidePost(id: number) {
        setPosts(posts.filter(post => post.id !== id))
        notify("Подобные посты больше не будут отображаться")
    }

    function reportPost(id: number) {
        setPosts(posts.filter(post => post.id !== id))
        notifyError("Ваша жалоба на пост отправлена")
    }

    function filterPostsAfterDeletion(postId) {
        setPosts(posts.filter(post => post.id !== postId))
    }

    function getPostsHandler() {
        if(type === 'FRIENDS_POSTS' && (friendsIds && friendsIds.length > 0))
            getPosts({id: user.email, friendsArray: JSON.stringify(friendsIds || []), limit: 5, page: page})
        else if(type === 'LIKED_POSTS' && (likesIds && likesIds.length > 0))
            getPosts({id: user.email, likesArray: JSON.stringify(likesIds || []), limit: 5, page: page})
        else if(type === 'USER_POSTS' && id)
            getPosts({id: id || user.email, limit: 5, page: page})
        else
            getPosts({limit: 5, page: page})
    }
    
    function notify(errorMessage: string) {
        toast.warn(errorMessage, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function notifyError(errorMessage: string) {
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

    useObserver(lastElement, isLoading, totalPages, page, () => {
        setPage((page) => page + 1);
    })

    useEffect(() => {
        if(data) {
            let postsToImplement = data.rows.filter(post => checkIfValueNotExistInPostsArray(post.id));
            setPosts([...posts, ...postsToImplement])
            if(totalPages === null) {
                setTotalPages(Math.floor(data.count / 5));
            }
        }
    }, [data])
    
    useEffect(() => {
        getPostsHandler();
    }, [page])

    useEffect(() => {
        if(id) {
            setPosts([]);
            getPosts({id: id || user.email, limit: 5, page: 1})
        }
    }, [id])

    useEffect(() => {
        if(newPostData) setPosts([newPostData, ...posts])
    }, [newPostData])

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
            <div className={styles.wrap}>
                {posts.map(post => 
                    <Post 
                        key={post.id} 
                        hidePost={hidePost} 
                        reportPost={reportPost}
                        post={post}
                        filterPostsAfterDeletion={filterPostsAfterDeletion}
                    ></Post>
                )}
                {isLoading &&
                    <Loader type="regular"/>
                }
                {isError &&
                    <ErrorHolder 
                        label="Произошла ошибка при загрузке постов"
                        refetch={() => getPostsHandler()}
                    />
                }
                <div ref={lastElement} className={styles.lastElement}></div>
            </div>
        </>
    );
};

export default PostsWrap;