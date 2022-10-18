import React, { FC, useEffect, useRef, useState } from 'react';
import { useObserver } from '../../hooks/useObserver';
import { IPost, IUser } from '../../models';
import Post from '../Post/Post';
import jwt_decode from 'jwt-decode';
import styles from './PostsWrap.module.scss';

interface PostsWrapProps {
    getPosts: (obj: {}) => void
    isLoading: boolean
    data: any
    type: string
    friendsIds?: string[]
    likesIds?: string[]
    id?: string
    newPostData?: IPost
}

const PostsWrap:FC<PostsWrapProps> = ({getPosts, isLoading, data, type, friendsIds, likesIds, id, newPostData}) => {
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
        if(type === 'FRIENDS_POSTS' && (friendsIds && friendsIds.length > 0))
            getPosts({id: user.email, friendsArray: JSON.stringify(friendsIds || []), limit: 5, page: page})
        else if(type === 'LIKED_POSTS' && (likesIds && likesIds.length > 0))
            getPosts({id: user.email, likesArray: JSON.stringify(likesIds || []), limit: 5, page: page})
        else if(type === 'USER_POSTS' && id)
            getPosts({id: id || user.email, limit: 5, page: page})
        else
            getPosts({limit: 5, page: page})
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
        <div className={styles.wrap}>
            {posts.map(post => 
                <Post key={post.id} hidePost={hidePost} post={post}></Post>
            )}
            <div ref={lastElement} className={styles.lastElement}></div>
        </div>
    );
};

export default PostsWrap;