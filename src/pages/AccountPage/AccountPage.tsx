import React, { useEffect, useState } from 'react';
import { IPost, IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import { useChangeUserStatusMutation, useGetUserDataQuery, useUpdateImageMutation, useUpdatePanoramaImageMutation } from '../../store/socmedia/userData/userData.api';
import styles from './AccountPage.module.scss';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import More from '../../assets/svg/More';
import Plus from '../../assets/svg/Plus';
import Angle from '../../assets/svg/Angle';
import Comment from '../../assets/svg/Comment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreatePostMutation, useFindUserPostsByDescriptionQuery, useLazyGetAllUserPostsQuery } from '../../store/socmedia/posts/posts.api';
import Post from '../../components/Post/Post';
import { useAcceptFriendRequestMutation, useDeleteFriendMutation, useDeleteFriendRequestMutation, useGetAllFriendsQuery, useGetAllNotificationsQuery, useSendFriendRequestMutation } from '../../store/socmedia/friends/friends.api';
import ImageOptionsModal from '../../components/ImageOptionsModal/ImageOptionsModal';
import Options from '../../assets/svg/Options';
import InputBar from '../../components/InputBar/InputBar';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { useDebounce } from '../../hooks/useDebounce';
import UserOptionsModal from '../../components/UserOptionsModal/UserOptionsModal';
import UserStats from '../../components/UserStats/UserStats';
import AddPostPanel from '../../components/AddPostPanel/AddPostPanel';
import ModalWrap from '../../components/ModalWrap/ModalWrap';
import { baseUrl } from "../../envVariables/variables";
import PostsWrap from '../../components/PostsWrap/PostsWrap';
import CheckMark from '../../assets/svg/CheckMark';

import { isValidFileUploaded } from '../../helpers/helpers';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const AccountPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    const [userStatusClasses, setUserStatusClasses] = useState([styles.editStatus]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPartValue, setEditingPartValue] = useState('?????????? ?????? ????????????????????????????');
    const [userCurrentStatus, setUserCurrentStatus] = useState('');
    const [isUserCurrentStatusError, setIsUserCurrentStatusError] = useState(false);
    const [userCurrentPostDescription, setUserCurrentPostDescription] = useState('');
    const [isPostDescriptionError, setIsPostDescriptionError] = useState(false);
    const [userCurrentFile, setUserCurrentFile] = useState();
    const [buttonState, setButtonState] = useState('');
    const [postImagePreview, setPostImagePreview] = useState('');

    const [posts, setPosts] = useState<IPost[]>([]);

    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const debounced = useDebounce(search);
    const {isError: isFindedPostsError, isLoading: isFindedPostsLoading, data: findedPostsData} = useFindUserPostsByDescriptionQuery({description: debounced, user_id: user.email}, {
        skip: debounced.length < 1
    });

    const [visible, setVisible] = useState(false);
    const [imageEditingType, setImageEditingType] = useState('');
    const [updateUserImage, {isLoading: isRegularImageLoading, isError: isRegularImageError, data: regularImageData}] = useUpdateImageMutation();
    const [updatePanoramaImage, {isLoading: isPanoramaImageLoading, isError: isPanoramaImageError, data: panoramaImageData}] = useUpdatePanoramaImageMutation();

    const [visibleUserOptionsModal, setVisibleUserOptionsModal] = useState(false);

    const [optionsButton, setOptionsButton] = useState('????????????????????');

    const [isShowHiddenOptions, setIsShowHiddenOptions] = useState(false);
    const [isDeleteFriendConfirmationVisible, setIsDeleteFriendConfirmationVisible] = useState(false);

    const {id} = useParams();
    const [currentUserId, setCurrentUserId] = useState('');
    const {isError, isLoading, data} = useGetUserByEmailQuery(id || user.email);
    const [getPosts, {isError: isUserPostsError, isLoading: isUserPostsLoading, data: userPostsData}] = useLazyGetAllUserPostsQuery();
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userData, refetch} = useGetUserDataQuery(id || user.email);

    const [changeStatus, {isError: isStatusError, isLoading: isStatusLoading, data: statusData}] = useChangeUserStatusMutation();
    const [createUserPost, {isError: isUserPostError, isLoading: isUserPostLoading, data: userPostData}] = useCreatePostMutation();

    const [deleteFromFriends, {isLoading: isDeleteFromFriendsLoading, error: isDeleteFromFriendsError, data: deleteFromFriendsData}] = useDeleteFriendMutation();
    const [sendFriendRequest, {isLoading: isFriendRequestLoading, isError: isFriendRequestError, data: friendRequestData}] = useSendFriendRequestMutation()
    const [sendDeleteFriendRequest, {isLoading: isFriendDeleteRequestLoading, isError: isFriendDeleteRequestError, data: friendDeleteRequestData}] = useDeleteFriendRequestMutation();
    const [sendAcceptFriendRequest, {isLoading: isFriendAcceptRequestLoading, isError: isFriendAcceptRequestError, data: friendAcceptRequestData}] = useAcceptFriendRequestMutation();
    const {isLoading: isNotificationsLoading, isError: isNotificationsError, data: notificationsData} = useGetAllNotificationsQuery(user.email);

    const {isError: isFriendsError, isLoading: isFriendsLoading, data: friendsData} = useGetAllFriendsQuery({id: user.email, limit: 400, page: 1});

    function checkIsNotFriend(user) {
        if(friendsData)
            return (friendsData.rows.filter(friend => (friend.profile_from === (data && data.email) || friend.profile_to === (data && data.email))))?.length == 0
    }

    function hidePost(id: number) {
        setPosts(posts.filter(post => post.id !== id))
    }

    function showPopularPostsHandler() {
        setOptionsButton('????????????????????');
    }

    function showMostViewedPostsHandler() {
        setOptionsButton('??????????????????????????????');
    }

    const showFileUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setUserCurrentFile(e.target.files[0]);
    }

    useEffect(() => {
        if(friendsData && data) {
            if(!checkIsNotFriend(data?.email)) {
                setButtonState('???????????????? ??????????????????')
            }
            if(notificationsData && data && checkIsNotFriend(data?.email)) {          
                let subs = notificationsData.filter(notification => (notification.profile_to === data.email || notification.profile_from === data.email));

                if(subs.length === 0) 
                    setButtonState('???????????????? ?? ????????????')
                else if(subs[0].profile_from === user.email)
                    setButtonState('???????????? ??????????????????')
                else 
                    setButtonState('?????????????? ????????????')
            }       
        }
    }, [friendsData, data, notificationsData])

    function turnOnEditing() {
        if(id === user.email) {
            setIsEditing(true);
            setEditingPartValue('?????????? ?????????? ??????????????????');
            setUserStatusClasses([...userStatusClasses, styles.editing]);
        }
    }

    function finishEditing(key?: any) {
        if((key === 'Enter' || key === 'click') && !isUserCurrentStatusError && userCurrentStatus !== '') {
            setIsEditing(false);
            setEditingPartValue('?????????? ?????? ????????????????????????????');
            setUserStatusClasses([styles.editStatus])
            changeStatus({status: userCurrentStatus, id: user.email});
        }

    }

    function createPost(key?: any) {
        if(!isPostDescriptionError && userCurrentPostDescription.length > 0 && (key === 'Enter' || key === 'click')) {
            const formData = new FormData()
            formData.append('description', userCurrentPostDescription);
            formData.append('img', userCurrentFile ? userCurrentFile : 'none');
            formData.append('post_handler_type', 'USER');
            formData.append('post_handler_id', user.email);
            createUserPost(formData);
            setUserCurrentPostDescription('');
            setPostImagePreview('');
            setUserCurrentFile(undefined);
        }
        else notify();
    }

    function sendFrindRequestHandler(email) {
        if(buttonState === '???????????????? ??????????????????') {
            navigate(`/chat?id=${email}`);    
        }
        else if(buttonState === '???????????????? ?? ????????????') {
            sendFriendRequest({profile_from: user.email, profile_to: email})
            setButtonState('???????????? ??????????????????');
        }
        else if(buttonState === '???????????? ??????????????????') {
            sendDeleteFriendRequest({profile_from: user.email, profile_to: email})
            setButtonState('???????????????? ?? ????????????');
        }
        else {
            sendAcceptFriendRequest({profile_from: email, profile_to: user.email})
            setButtonState('???????????????? ??????????????????');
        }
    }

    function handleOpenConfirmationModal(event: any) {
        event.stopPropagation();
        setIsDeleteFriendConfirmationVisible(true);
    }

    function handleDeleteFromFriends() {
        deleteFromFriends({profile_from: user.email, profile_to: id});
        setIsDeleteFriendConfirmationVisible(false);
    }

    function showImageOptionsHandler(type: string) {
        setVisible(true);
        setImageEditingType(type);
    }

    function notify() {
        toast.warn('???????????? ?????????????????? ???????? ?????? ????????????????', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function validatePostDescription() {
        setIsPostDescriptionError(userCurrentPostDescription.length > 200 || userCurrentPostDescription.length < 0);
    }

    function handlePostDescriptionChange(e: any) {
        setUserCurrentPostDescription(e.target.value);
        validatePostDescription()
    }

    function validateUserStatus() {
        setIsUserCurrentStatusError(userCurrentStatus.length > 100 || userCurrentStatus.length < 0);
    }

    function handleUserStatusChange(e: any) {
        setUserCurrentStatus(e.target.value);
        validateUserStatus()
    }

    function showHiddenOptions(event: any) {
        event.stopPropagation();
        isShowHiddenOptions ? setIsShowHiddenOptions(false) : setIsShowHiddenOptions(true);
    }

    useEffect(() => {
        if(deleteFromFriendsData) setButtonState('???????????????? ?? ????????????');
    }, [deleteFromFriendsData])

    useEffect(() => {
        if(userData) {
            setUserCurrentStatus(userData.status !== '' ? userData.status : '???????????? ???? ??????????');
        }
    }, [userData]);

    useEffect(() => {
        setIsSearch(debounced.length > 1 && findedPostsData?.length! > 0)
    }, [debounced]);

    useEffect(() => {
        if(id) {
            setCurrentUserId(id);
        }
    }, [id])

    useEffect(() => {
        if(userCurrentFile) {
            let src = URL.createObjectURL(userCurrentFile);
            setPostImagePreview(src);
        }
    }, [userCurrentFile])

    useEffect(() => {
        if(panoramaImageData || regularImageData) refetch();
    }, [panoramaImageData, regularImageData])

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
        <div className={styles.accountPageWrap}>
            {isDeleteFriendConfirmationVisible &&
                <ModalWrap
                    visible={isDeleteFriendConfirmationVisible} 
                    setVisible={setIsDeleteFriendConfirmationVisible} 
                    type='column'
                >
                    <ConfirmationModal
                        setVisible={setIsDeleteFriendConfirmationVisible} 
                        executeAfterConfirm={handleDeleteFromFriends}
                        label="???? ?????????? ???????????? ???????????????"
                    />
                </ModalWrap>
            }
            {
                visibleUserOptionsModal &&
                    <ModalWrap 
                        visible={visibleUserOptionsModal} 
                        setVisible={setVisibleUserOptionsModal} 
                        type='column'
                    >
                        <UserOptionsModal refetch={refetch}/>
                    </ModalWrap>
            }
            {
                userData && visible && 
                    <ModalWrap 
                        visible={visible} 
                        setVisible={setVisible} 
                        type='row'
                    >
                        <ImageOptionsModal 
                            id={id || user.email} 
                            mainImage={userData.image}
                            currentUserId={String(id)}
                            panoramaImage={userData.panoramaImage} 
                            type={imageEditingType} 
                            refetch={refetch} 
                            setVisible={setVisible}
                            updateRegularImage={updateUserImage}
                            updatePanoramaImage={updatePanoramaImage}
                        />
                    </ModalWrap>
            }
            <div className={styles.panoramaImage} onClick={() => showImageOptionsHandler('panoramaImage')}>
                {(userData && userData.panoramaImage !== 'none') &&
                    <img src={baseUrl + userData.panoramaImage}/>
                }
                <div 
                    className={styles.userAdditionalOptions}
                    onMouseOver={() => setIsShowHiddenOptions(true)}
                    onMouseOut={() => setIsShowHiddenOptions(false)}
                    onClick={event => showHiddenOptions(event)}
                >
                    <More className={styles.accountMore}/>
                </div>
                <div 
                    className={isShowHiddenOptions ? [styles.hiddenOptions, styles.visible].join(' ') : styles.hiddenOptions}
                    onMouseOver={() => setIsShowHiddenOptions(true)}
                    onMouseOut={() => setIsShowHiddenOptions(false)}
                >
                    {!checkIsNotFriend(id) && (id !== user.email) &&
                        <a onClick={event => handleOpenConfirmationModal(event)}>?????????????? ???? ????????????</a>
                    }
                    {(id === user.email) &&
                        <a onClick={() => showImageOptionsHandler('panoramaImage')}>???????????????? ???????????????????? ????????????????????</a>
                    }
                </div>
            </div>
            <div className={styles.accountPage}>
                <div className={styles.userInfo}>
                    <div className={styles.userImageHolder}>
                        <div className={styles.userImage} onClick={() => showImageOptionsHandler('regularImage')}>
                            {(userData && userData.image !== 'none') &&
                               <img src={baseUrl + userData.image}/>
                            }
                        </div>
                    </div>
                    {
                        (id !== user.email) 
                        ?
                            <div className={styles.userAddInFriends} onClick={() => sendFrindRequestHandler(data && data.email)}>
                                {buttonState}
                                <div>
                                    {buttonState === '???????????????? ??????????????????' && <Comment className={styles.userAddInFriendsPlus}/>}
                                    {buttonState === '???????????? ??????????????????' && <Angle className={styles.userAddInFriendsPlus}/>}
                                    {buttonState === '???????????????? ?? ????????????' && <Plus className={styles.userAddInFriendsPlus}/>}
                                    {buttonState === '?????????????? ????????????' && <CheckMark className={styles.userAddInFriendsPlus}/>}
                                </div>
                            </div>
                        :
                            <div className={styles.userOptionsWrap} onClick={() => setVisibleUserOptionsModal(true)}>
                                <Options className={styles.userOptions}/>
                            </div>
                    }
                    {
                        (id !== user.email) &&
                        <div className={styles.hiddenUserAddInFriends} onClick={() => sendFrindRequestHandler(data && data.email)}>
                            {buttonState === '???????????????? ??????????????????' && <Comment className={styles.hiddenUserAddInFriendsPlus}/>}
                            {buttonState === '???????????? ??????????????????' && <Angle className={styles.hiddenUserAddInFriendsPlus}/>}
                            {buttonState === '???????????????? ?? ????????????' && <Plus className={styles.hiddenUserAddInFriendsPlus}/>}
                            {buttonState === '?????????????? ????????????' && <CheckMark className={styles.hiddenUserAddInFriendsPlus}/>}
                        </div>
                    }
                    <p className={styles.userName}>{data && data.name} {data && data.surname}</p>
                    <div className={styles.editablePart}>
                        {!isEditing ? 
                            <p className={styles.userStatus} 
                                onMouseOut={() => (id === user.email) && setUserStatusClasses([styles.editStatus])} 
                                onMouseOver={() => (id === user.email) && setUserStatusClasses([...userStatusClasses, styles.on])}
                                onClick={() => turnOnEditing()}
                            >
                                {userCurrentStatus}
                            </p>
                            :
                            <input autoFocus 
                                    onKeyDown={e => finishEditing(e.key)}
                                    onClick={e => finishEditing('click')} 
                                    onChange={e => handleUserStatusChange(e)}
                                    type="text" 
                                    value={userCurrentStatus}
                                    className={isUserCurrentStatusError ? [styles.userEditStatus, styles.error].join(' ') : styles.userEditStatus} 
                            />     
                        }
                        <p className={userStatusClasses.join(' ')}>{editingPartValue}</p>
                    </div>                  
                    <p className={styles.userDateBirth}>???????? ????????????????: {userData && userData.date_birth}</p>
                    <p className={styles.userCity}>??????????: {userData && userData.city}</p>
                    {/* <div className={styles.moreButton}>
                        <Angle className={styles.moreButtonAngle}/>
                    </div> */}
                </div>
                <UserStats id={String(id)}/>
                {(id === user.email) &&
                    <AddPostPanel 
                        currentPostDescription={userCurrentPostDescription} 
                        handlePostDescriptionChange={handlePostDescriptionChange} 
                        showFileUpload={showFileUpload} 
                        createPost={createPost}
                        postImagePreview={postImagePreview}
                        type='regular'
                        setPostImagePreview={setPostImagePreview}
                        setUserCurrentFile={setUserCurrentFile}
                        isPostDescriptionError={isPostDescriptionError}
                    />
                }
            </div>
            
            <div className={(id === user.email) ? styles.userPostsOptions : [styles.userPostsOptions, styles.marginless].join(' ')}>
                <InputBar>
                    <div className={styles.postFinder}>
                        <Input placeholder='???????????? ????????????...' value={search} onChange={setSearch}/>
                    </div>
                    <div className={styles.postOptions}>
                        <Button onClick={showPopularPostsHandler} isActive={(optionsButton === '????????????????????')}>
                            ????????????????????
                        </Button>
                        <Button onClick={showMostViewedPostsHandler} isActive={(optionsButton === '??????????????????????????????')}>
                            ??????????????????????????????
                        </Button>
                    </div>
                </InputBar>
            </div>
            <div className={styles.userPosts}>
                {!isSearch &&
                    <PostsWrap 
                        getPosts={getPosts} 
                        isLoading={isUserPostsLoading} 
                        data={userPostsData} 
                        type="USER_POSTS" 
                        id={id} 
                        newPostData={userPostData}
                    />
                }
                {findedPostsData && isSearch && findedPostsData.map(post =>       
                    <Post key={post.id} hidePost={hidePost} post={post}/>
                )}
            </div>
        </div>
        </>
    );
};

export default AccountPage;