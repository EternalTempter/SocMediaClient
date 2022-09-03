import React, { useEffect } from 'react';
import Options from '../../assets/svg/Options';
import Post from '../../components/Post/Post';
import { IPost } from '../../models';
import { useGetAllPostsQuery } from '../../store/socmedia/posts/posts.api';
import styles from './NewsPage.module.scss';

const NewsPage = () => {
    const {isLoading, isError, data} = useGetAllPostsQuery();

    return (
        <div className={styles.newsPageWrap}>
            <div className={styles.newsToggler}>
                <div className={styles.newsTogglerButtons}>
                    <button>Интересное</button>
                    <button>Новости друзей</button>
                    <button>Только новое</button>
                    <button>Понравившееся</button>
                </div>
                <div className={styles.newsTogglerOptions}>
                    <div className={styles.newsTogglerOption}>
                        <Options className={styles.newsTogglerOption}/>
                    </div>
                </div>
            </div>

        {data && [...data].reverse().map(post => 
            <Post key={post.id} post={post}></Post>
        )}

        </div>
    );
};

export default NewsPage;