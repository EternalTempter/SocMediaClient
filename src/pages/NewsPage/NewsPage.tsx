import React, { useState } from 'react';
import { IUser } from '../../models';
import { useGetAllFriendsQuery } from '../../store/socmedia/friends/friends.api';
import { useGetAllLikesQuery, useLazyGetAllPostsQuery, useLazyGetAllFriendsPostsQuery, useLazyGetAllLikedPostsQuery } from '../../store/socmedia/posts/posts.api';
import styles from './NewsPage.module.scss';
import jwt_decode from 'jwt-decode';
import ButtonBar from '../../components/ButtonBar/ButtonBar';
import Button from '../../components/UI/Button/Button';
import PostsWrap from '../../components/PostsWrap/PostsWrap';

const NewsPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const [buttonState, setButtonState] = useState('Интересное');
    
    const [getPosts, {isLoading, isError, data}] = useLazyGetAllPostsQuery();

    const [friendsIds, setFriendsIds] = useState<string[]>([])
    const {isLoading: isFriendsLoading, isError: isFriendsError, data: friendsData} = useGetAllFriendsQuery({id: user.email, limit: 400, page: 1})
    const [getAllFriendsPosts, {isLoading: isFriendsPostsLoading, isError: isFriendsPostsError, data: friendsPostsData}] = useLazyGetAllFriendsPostsQuery()

    const [likesIds, setLikesIds] = useState<string[]>([])
    const {isLoading: isLikesLoading, isError: isLikesError, data: likesData} = useGetAllLikesQuery(user.email)
    const [getAllLikedPosts, {isLoading: isLikedPostsLoading, isError: isLikedPostsError, data: likedPostsData}] = useLazyGetAllLikedPostsQuery();
    
    function showInterestPostsHandler() {
        setButtonState('Интересное');
    }

    function showFriendsPostsHandler() {
        setButtonState('Новости друзей');
        if(friendsData) {
            let ids:string[] = [];
            friendsData.rows.forEach(friend => ids.push(friend.profile_from !== user.email ? friend.profile_from : friend.profile_to))
            setFriendsIds(ids);
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
            setLikesIds(ids);
        }
    }

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
        </ButtonBar>

        {(buttonState === 'Интересное' || buttonState === 'Только новое') &&
            <PostsWrap getPosts={getPosts} isLoading={isLoading} data={data} type="NEW_POSTS"/>
        }

        {(buttonState === 'Новости друзей') && 
            <PostsWrap getPosts={getAllFriendsPosts} isLoading={isFriendsPostsLoading} data={friendsPostsData} type="FRIENDS_POSTS" friendsIds={friendsIds}/>
        }

        {(buttonState === 'Понравившееся') &&
            <PostsWrap getPosts={getAllLikedPosts} isLoading={isLikedPostsLoading} data={likedPostsData} type="LIKED_POSTS" likesIds={likesIds}/>
        }
        </div>
    );
};

export default NewsPage;