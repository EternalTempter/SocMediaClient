import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Angle from '../../assets/svg/Angle';
import Clip from '../../assets/svg/Clip';
import Like from '../../assets/svg/Like';
import More from '../../assets/svg/More';
import Send from '../../assets/svg/Send';
import Share from '../../assets/svg/Share';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPostPanel from '../../components/AddPostPanel/AddPostPanel';
import { useObserver } from '../../hooks/useObserver';
import { IPost, IUser } from '../../models';
import { useGetAllUserGroupSubscriptionsQuery, useGetGroupByIdQuery, useUpdateImageMutation, useUpdatePanoramaImageMutation } from '../../store/socmedia/groups/groups.api';
import jwt_decode from 'jwt-decode';
import { useCreatePostMutation, useLazyGetAllGroupPostsQuery } from '../../store/socmedia/posts/posts.api';
import styles from './GroupPage.module.scss';
import Post from '../../components/Post/Post';
import { useGetFirstGroupSubsQuery, useGetGroupSubsCountQuery, useLazySubscribeOnGroupQuery, useUnsubscribeOnGroupMutation } from '../../store/socmedia/groupUsers/groupUsers.api';
import { baseUrl } from "../../envVariables/variables";
import BrokenHeart from '../../assets/svg/BrokenHeart';
import GroupSubscriber from '../../components/GroupSubscriber/GroupSubscriber';
import { isValidFileUploaded } from '../../helpers/helpers';
import ModalWrap from '../../components/ModalWrap/ModalWrap';
import ImageOptionsModal from '../../components/ImageOptionsModal/ImageOptionsModal';
import Options from '../../assets/svg/Options';
import GroupOptionsModal from '../../components/GroupOptionsModal/GroupOptionsModal';
import PostsWrap from '../../components/PostsWrap/PostsWrap';

const GroupPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {id} = useParams();
    const {isError, isLoading, data, refetch: groupRefetch} = useGetGroupByIdQuery(String(id));
    const [groupCurrentPostDescription, setGroupCurrentPostDescription] = useState('');
    const [isPostDescriptionError, setIsPostDescriptionError] = useState(false);
    const [userCurrentFile, setUserCurrentFile] = useState();
    const [postImagePreview, setPostImagePreview] = useState('');

    const [buttonValue, setButtonValue] = useState('');

    const [visible, setVisible] = useState(false);
    const [imageEditingType, setImageEditingType] = useState('');

    const [groupOptionsVisible, setGroupOptionsVisible] = useState(false);

    const [updateGroupImage, {isLoading: isRegularImageLoading, isError: isRegularImageError, data: regularImageData}] = useUpdateImageMutation();
    const [updatePanoramaImage, {isLoading: isPanoramaImageLoading, isError: isPanoramaImageError, data: panoramaImageData}] = useUpdatePanoramaImageMutation();
    
    const {isError: isGroupSubsError, isLoading: isGroupSubsLoading, data: groupSubsData, refetch: refetchFirstGroupSubs} = useGetFirstGroupSubsQuery({group_id: String(id), amount: 3});

    const {isError: isGroupSubsCountError, isLoading: isGroupSubsCountLoading, data: groupSubsCountData, refetch: refetchGroupSubs} = useGetGroupSubsCountQuery(String(id));
    const {isError: isUserGroupSubscriptionsError, isLoading: isUserGroupSubscriptionsLoading, data: userGroupSubscriptionsData, refetch} = useGetAllUserGroupSubscriptionsQuery({id: user.email, limit: 400});

    const [unsubscribe, {isError: isUnsubscribeError, isLoading: isUnsubscribeLoading, data: unsubscribeData}] = useUnsubscribeOnGroupMutation();
    const [subscribe, {isError: isSubscribeError, isLoading: isSubscribeLoading, data: subscribeData}] = useLazySubscribeOnGroupQuery();

    const [createGroupPost, {isError: isGroupPostError, isLoading: isGroupPostLoading, data: groupPostData}] = useCreatePostMutation();
    const [getPosts, {isError: isPostsError, isLoading: isPostsLoading, data: postsData}] = useLazyGetAllGroupPostsQuery();

    function createPost(key: string) {
        if(!isPostDescriptionError && data && groupCurrentPostDescription.length > 0 && (key === 'Enter' || key === 'click')) {
            const formData = new FormData()
            formData.append('description', groupCurrentPostDescription);
            formData.append('img', userCurrentFile ? userCurrentFile : 'none');
            formData.append('post_handler_type', 'GROUP');
            formData.append('post_handler_id', String(data.id));
            createGroupPost(formData);
            setGroupCurrentPostDescription('');
            setPostImagePreview('');
            setUserCurrentFile(undefined);
        }
        else notify();
    }

    function notify() {
        toast.warn('Нельзя отправить пост без описания', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    // function hidePost(id: number) {
    //     setPosts(posts.filter(post => post.id !== id))
    // }

    function groupOptionHandler(event) {
        event.stopPropagation();
        if(buttonValue === 'Отписаться') unsubscribe({group_id: id, id: user.email})
        else subscribe({group_id: id, id: user.email});

    }

    function validatePostDescription() {
        setIsPostDescriptionError(groupCurrentPostDescription.length > 200 || groupCurrentPostDescription.length < 0);
    }

    function handlePostDescriptionChange(e: any) {
        setGroupCurrentPostDescription(e.target.value);
        validatePostDescription()
    }

    function showImageOptionsHandler(type: string) {
        setVisible(true);
        setImageEditingType(type);
    }

    useEffect(() => {
        if(subscribeData || unsubscribeData) {
            refetchGroupSubs()
            refetchFirstGroupSubs()
            refetch()
        }
    }, [subscribeData, unsubscribeData])

    // useEffect(() => {
    //     if(groupPostData) setPosts([groupPostData, ...posts])
    // }, [groupPostData])

    // useObserver(lastElement, isPostsLoading, totalPages, page, () => {
    //     setPage((page) => page + 1)
    // });

    // useEffect(() => {
    //     getPosts({id: id || user.email, limit: 5, page: page})
    // }, [page])

    // useEffect(() => {
    //     if(postsData) {
    //         setPosts([...posts, ...postsData.rows])
    //         if(totalPages === null) {
    //             setTotalPages(postsData.count);
    //         }
    //     }
    // }, [postsData])

    useEffect(() => {
        if(userGroupSubscriptionsData) {
            if(userGroupSubscriptionsData.rows.filter(group => group.group_id === id).length !== 0)
                setButtonValue('Отписаться');
            else
                setButtonValue('Подписаться');
        }
    }, [userGroupSubscriptionsData])

    useEffect(() => {
        if(userCurrentFile) {
            let src = URL.createObjectURL(userCurrentFile);
            setPostImagePreview(src);
        }
    }, [userCurrentFile]);

    useEffect(() => {
        if(panoramaImageData || regularImageData) groupRefetch();
    }, [panoramaImageData, regularImageData])

    const showFileUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setUserCurrentFile(e.target.files[0]);
    }

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
        <div className={styles.groupPageWrap}>
            {groupOptionsVisible &&
                <ModalWrap 
                    visible={groupOptionsVisible}
                    setVisible={setGroupOptionsVisible}
                    type='column'
                >
                    <GroupOptionsModal 
                        group_id={String(id)} 
                        refetch={groupRefetch}
                        setGroupVisible={setGroupOptionsVisible}
                    />
                </ModalWrap>
            }
            {data && visible && 
                <ModalWrap 
                    visible={visible} 
                    setVisible={setVisible} 
                    type='row'
                >
                    <ImageOptionsModal 
                        id={String(id)} 
                        mainImage={data.image}
                        currentUserId={String(id)}
                        panoramaImage={data.panoramaImage} 
                        type={imageEditingType} 
                        refetch={refetch} 
                        setVisible={setVisible}
                        groupAdminId={data.owner_id}
                        updatePanoramaImage={updatePanoramaImage}
                        updateRegularImage={updateGroupImage}
                    />
                </ModalWrap>
            }
            <div className={styles.groupWrap}>
                <div className={styles.groupImageHolder}>
                    <div onClick={() => showImageOptionsHandler('regularImage')}>
                        {(data && data.image !== 'none') &&
                            <img src={baseUrl + data.image}/>
                        }
                    </div>
                </div>
                <div className={styles.groupHeader} onClick={() => showImageOptionsHandler('panoramaImage')}>
                    {(data && data.panoramaImage !== 'none') &&
                        <img src={baseUrl + data.panoramaImage}/>
                    }
                </div>
                <div className={styles.groupBody}>
                    <div className={styles.groupBodyLeftSide}>
                        <p className={styles.groupName}>{data && data.group_name}</p>
                        <p className={styles.groupUsersAmount}>{groupSubsCountData && groupSubsCountData} участника</p>
                        <div className={styles.groupUsers}>
                            {groupSubsData && groupSubsData.map(sub => 
                                <GroupSubscriber key={sub.id} user_id={sub.user_id}/>
                            )}
                            {groupSubsCountData && groupSubsCountData > 5 &&
                                <div>+{groupSubsCountData - 5}</div>
                            }
                        </div>
                    </div>
                    <div className={styles.groupBodyRightSide}>
                        <div className={styles.groupButtons}>
                            <div className={styles.groupMobileViewButtons}>
                                <div onClick={event => groupOptionHandler(event)}>
                                    {buttonValue === 'Подписаться' && <Like className={styles.subscribeMobileViewButtonHeart}/>}
                                    {buttonValue === 'Отписаться' && <BrokenHeart className={styles.subscribeMobileViewButtonHeart}/>}   
                                </div>
                                <div onClick={() => setGroupOptionsVisible(true)}>
                                    <More className={styles.moreMobileViewButtonHeart}/>
                                </div>
                            </div>
                            <div className={styles.subscribeButton} onClick={event => groupOptionHandler(event)}>
                                <p>{buttonValue}</p>
                                <div>
                                    {buttonValue === 'Подписаться' && <Like className={styles.subscribeButtonHeart}/>}
                                    {buttonValue === 'Отписаться' && <BrokenHeart className={styles.subscribeButtonHeart}/>}                       
                                </div>
                            </div>
                            {data && data.owner_id === user.email &&
                                <div onClick={() => setGroupOptionsVisible(true)}>
                                    <Options className={styles.shareButton}/>
                                </div>
                            }
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
                        handlePostDescriptionChange={handlePostDescriptionChange}
                        showFileUpload={showFileUpload}
                        createPost={createPost}
                        postImagePreview={postImagePreview}
                        type='extended'
                        setPostImagePreview={setPostImagePreview}
                        setUserCurrentFile={setUserCurrentFile}
                        isPostDescriptionError={isPostDescriptionError}
                    />
                }

                <div className={styles.groupPosts}>
                    <PostsWrap getPosts={getPosts} isLoading={isPostsLoading} data={postsData} type="USER_POSTS" id={String(id)}/>
                </div>
                
                {/* <div className={styles.moreButton}>
                    <Angle className={styles.moreButtonAngle}/>
                </div>  */}
            </div>
        </div>
        </>
    );
};

export default GroupPage;