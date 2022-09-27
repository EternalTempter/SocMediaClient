import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Angle from '../../assets/svg/Angle';
import Clip from '../../assets/svg/Clip';
import Like from '../../assets/svg/Like';
import More from '../../assets/svg/More';
import Send from '../../assets/svg/Send';
import Share from '../../assets/svg/Share';
import AddPostPanel from '../../components/AddPostPanel/AddPostPanel';
import { useObserver } from '../../hooks/useObserver';
import { IPost, IUser } from '../../models';
import { useGetAllUserGroupSubscriptionsQuery, useGetGroupByIdQuery } from '../../store/socmedia/groups/groups.api';
import jwt_decode from 'jwt-decode';
import { useCreatePostMutation, useLazyGetAllGroupPostsQuery } from '../../store/socmedia/posts/posts.api';
import styles from './GroupPage.module.scss';
import Post from '../../components/Post/Post';
import { useLazySubscribeOnGroupQuery, useUnsubscribeOnGroupMutation } from '../../store/socmedia/groupUsers/groupUsers.api';

const GroupPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {id} = useParams();
    const {isError, isLoading, data} = useGetGroupByIdQuery(String(id));
    const [groupCurrentPostDescription, setGroupCurrentPostDescription] = useState('');
    const [userCurrentFile, setUserCurrentFile] = useState();

    const [buttonValue, setButtonValue] = useState('');

    const lastElement = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null); 
    const [posts, setPosts] = useState<IPost[]>([]);

    const {isError: isUserGroupSubscriptionsError, isLoading: isUserGroupSubscriptionsLoading, data: userGroupSubscriptionsData, refetch} = useGetAllUserGroupSubscriptionsQuery(user.email);

    const [unsubscribe, {isError: isUnsubscribeError, isLoading: isUnsubscribeLoading, data: unsubscribeData}] = useUnsubscribeOnGroupMutation();
    const [subscribe, {isError: isSubscribeError, isLoading: isSubscribeLoading, data: subscribeData}] = useLazySubscribeOnGroupQuery();

    const [createGroupPost, {isError: isGroupPostError, isLoading: isGroupPostLoading, data: groupPostData}] = useCreatePostMutation();
    const [getPosts, {isError: isPostsError, isLoading: isPostsLoading, data: postsData}] = useLazyGetAllGroupPostsQuery();

    function createPost(key: string) {
        if(data && groupCurrentPostDescription.length > 0 && (key === 'Enter' || key === 'click')) {
            const formData = new FormData()
            formData.append('description', groupCurrentPostDescription);
            formData.append('img', userCurrentFile ? userCurrentFile : 'none');
            formData.append('post_handler_type', 'GROUP');
            formData.append('post_handler_id', String(data.id));
            createGroupPost(formData);
            setGroupCurrentPostDescription('');
        }
    }

    function hidePost(id: number) {
        setPosts(posts.filter(post => post.id !== id))
    }

    function groupOptionHandler(event) {
        event.stopPropagation();
        if(buttonValue === 'Отписаться'){
            unsubscribe({group_id: id, id: user.email})
            refetch()
        } 
        else {
            subscribe({group_id: id, id: user.email});
            refetch()
        }
    }

    useObserver(lastElement, isPostsLoading, totalPages, page, () => {
        setPage((page) => page + 1)
    });

    useEffect(() => {
        getPosts({id: id || user.email, limit: 5, page: page})
    }, [page])

    useEffect(() => {
        if(postsData) {
            setPosts([...posts, ...postsData.rows])
            if(totalPages === null) {
                setTotalPages(postsData.count);
            }
        }
    }, [postsData])

    useEffect(() => {
        if(userGroupSubscriptionsData) {
            if(userGroupSubscriptionsData.filter(group => group.group_id === id).length !== 0)
                setButtonValue('Отписаться');
            else
                setButtonValue('Подписаться');
        }
    }, [userGroupSubscriptionsData])

    const showFileUpload = e => {
        setUserCurrentFile(e.target.files[0]);
    }

    return (
        <div className={styles.groupPageWrap}>
            <div className={styles.groupWrap}>
                <div className={styles.groupImageHolder}>
                    <div>
                        {(data && data.image !== 'none') &&
                            <img src={'http://localhost:5000/' + data.image}/>
                        }
                    </div>
                </div>
                <div className={styles.groupHeader}>
                    {(data && data.panoramaImage !== 'none') &&
                        <img src={'http://localhost:5000/' + data.panoramaImage}/>
                    }
                </div>
                <div className={styles.groupBody}>
                    <div className={styles.groupBodyLeftSide}>
                        <p className={styles.groupName}>{data && data.group_name}</p>
                        <p className={styles.groupUsersAmount}>1056703 участника</p>
                        <div className={styles.groupUsers}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div>+245</div>
                        </div>
                    </div>
                    <div className={styles.groupBodyRightSide}>
                        <div className={styles.groupButtons}>
                            <div className={styles.groupMobileViewButtons}>
                                <Like className={styles.subscribeMobileViewButtonHeart}/>
                                <More className={styles.moreMobileViewButtonHeart}/>
                            </div>
                            <div className={styles.subscribeButton} onClick={event => groupOptionHandler(event)}>
                                <p>{buttonValue}</p>
                                <div>
                                    <Like className={styles.subscribeButtonHeart}/>
                                </div>
                            </div>
                            <div>
                                <Share className={styles.shareButton}/>
                            </div>
                        </div>
                        <div className={styles.groupDescription}>
                            <p>{data && data.description}</p>
                        </div>
                    </div>
                </div> 

                {
                    data && data.owner_id === user.email &&
                    <AddPostPanel 
                        currentPostDescription={groupCurrentPostDescription}
                        setCurrentPostDescription={setGroupCurrentPostDescription}
                        showFileUpload={showFileUpload}
                        createPost={createPost}
                        type='extended'
                    />
                }

                <div className={styles.groupPosts}>
                    {posts.map(post => 
                        <Post key={post.id} hidePost={hidePost} post={post}/>
                    )}
                </div>
                
                {/* <div className={styles.moreButton}>
                    <Angle className={styles.moreButtonAngle}/>
                </div>  */}
                <div className={styles.lastElement} ref={lastElement}></div>
            </div>
        </div>
    );
};

export default GroupPage;