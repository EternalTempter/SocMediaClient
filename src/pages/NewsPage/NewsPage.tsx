import React, { useEffect, useRef, useState } from 'react';
import Options from '../../assets/svg/Options';
import Post from '../../components/Post/Post';
import { IPost, IUser } from '../../models';
import { useGetAllFriendsQuery } from '../../store/socmedia/friends/friends.api';
import { useGetAllLikesQuery, useLazyGetAllPostsQuery, useLazyGetAllFriendsPostsQuery, useLazyGetAllLikedPostsQuery } from '../../store/socmedia/posts/posts.api';
import styles from './NewsPage.module.scss';
import jwt_decode from 'jwt-decode';
import { useObserver } from '../../hooks/useObserver';
import ButtonBar from '../../components/ButtonBar/ButtonBar';
import Button from '../../components/UI/Button/Button';

const NewsPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const [buttonState, setButtonState] = useState('Интересное');
    
    const [getPosts, {isLoading, isError, data}] = useLazyGetAllPostsQuery();
    const [posts, setPosts] = useState<IPost[]>([]);

    const lastElement = useRef<HTMLDivElement>(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    const {isLoading: isFriendsLoading, isError: isFriendsError, data: friendsData} = useGetAllFriendsQuery(user.email)
    const [getAllFriendsPosts, {isLoading: isFriendsPostsLoading, isError: isFriendsPostsError, data: friendsPostsData}] = useLazyGetAllFriendsPostsQuery()

    const {isLoading: isLikesLoading, isError: isLikesError, data: likesData} = useGetAllLikesQuery(user.email)
    const [getAllLikedPosts, {isLoading: isLikedPostsLoading, isError: isLikedPostsError, data: likedPostsData}] = useLazyGetAllLikedPostsQuery();

    function hidePost(id: number) {
        setPosts(posts.filter(post => post.id !== id))
    }
    
    function showInterestPostsHandler() {
        setButtonState('Интересное');
    }

    function showFriendsPostsHandler() {
        setButtonState('Новости друзей');
        if(friendsData) {
            console.log(friendsData)
            let ids: string[] = [];
            friendsData.forEach(friend => ids.push(friend.profile_from !== user.email ? friend.profile_from : friend.profile_to))
            getAllFriendsPosts({id: user.email, friendsArray: JSON.stringify(ids)})
        }
    }

    function showOnlyNewPostsHandler() {
        setButtonState('Только новое');
    }

    function showLikedPostsHandler() {
        setButtonState('Понравившееся');
        if(likesData) {
            let ids: string[] = [];
            likesData.forEach(like => ids.push(like.post_id))
            getAllLikedPosts({id: user.email, likesArray: JSON.stringify(ids)})
        }
    }

    useObserver(lastElement, isLoading, totalPages, page, () => {
        setPage((page) => page + 1);
    })

    useEffect(() => {
        if(data) {
            setPosts([...posts, ...data.rows])
            if(totalPages === null) {
                setTotalPages(data.count);
            }
        }
    }, [data])
    
    useEffect(() => {
        getPosts({limit: 4, page: page})
    }, [page])

    return (
        <div className={styles.newsPageWrap}>
        <ButtonBar>
            <Button onClick={showInterestPostsHandler} isActive={(buttonState === 'Интересное')}>
                Интересное
            </Button>
            <Button onClick={showFriendsPostsHandler} isActive={(buttonState === 'Новости друзей')}>
                Новости друзей
            </Button>
            <Button onClick={showOnlyNewPostsHandler} isActive={(buttonState === 'Только новое')}>
                Только новое
            </Button>
            <Button onClick={showLikedPostsHandler} isActive={(buttonState === 'Понравившееся')}>
                Понравившееся
            </Button>
            <div>
                <Options className={styles.togglerOption}/>
            </div>
        </ButtonBar>

        {(buttonState === 'Интересное' || buttonState === 'Только новое') && posts.map(post => 
            <Post key={post.id} hidePost={hidePost} post={post}></Post>
        )}

        {buttonState === 'Новости друзей' && friendsPostsData && [...friendsPostsData].reverse().map(post => 
            <Post key={post.id} hidePost={hidePost} post={post}></Post>
        )}

        {buttonState === 'Понравившееся' && likedPostsData && [...likedPostsData].reverse().map(post => 
            <Post key={post.id} hidePost={hidePost} post={post}></Post>
        )}
        <div ref={lastElement} className={styles.lastElement}></div>
        </div>
    );
};

export default NewsPage;