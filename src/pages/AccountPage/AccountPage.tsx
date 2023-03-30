import React, { useEffect, useState } from 'react';
import { IPost, IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import { useChangeUserStatusMutation, useGetUserDataQuery} from '../../store/socmedia/userData/userData.api';
import styles from './AccountPage.module.scss';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import More from '../../assets/svg/More';
import Plus from '../../assets/svg/Plus';
import Angle from '../../assets/svg/Angle';
import Comment from '../../assets/svg/Comment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreatePostMutation, useFindUserPostsByDescriptionQuery, useLazyGetAllUserPostsQuery } from '../../store/socmedia/posts/posts.api';
import Post from '../../components/Post/Post';
import { useAcceptFriendRequestMutation, useDeleteFriendMutation, useDeleteFriendRequestMutation, useGetAllFriendsQuery, useGetAllNotificationsQuery, useSendFriendRequestMutation } from '../../store/socmedia/friends/friends.api';
import ImageOptionsModal from '../../components/ImageModal/ImageModal';
import Options from '../../assets/svg/Options';
import InputBar from '../../components/InputBar/InputBar';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { useDebounce } from '../../hooks/useDebounce';
import UserStats from '../../components/UserStats/UserStats';
import AddPostPanel from '../../components/AddPostPanel/AddPostPanel';
import ModalWrap from '../../components/ModalWrap/ModalWrap';
import { baseUrl } from "../../envVariables/variables";
import PostsWrap from '../../components/PostsWrap/PostsWrap';
import CheckMark from '../../assets/svg/CheckMark';
import { isValidFileUploaded, notifyAlert, notifyError } from '../../helpers/helpers';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import EditModal from '../../components/EditModal/EditModal';
import EditAccount from '../../components/EditAccount/EditAccount';
import SkeletonLoader from '../../components/UI/SkeletonLoader/SkeletonLoader';
import AlertHolder from '../../components/UI/AlertHolder/AlertHolder';
import Loader from '../../components/UI/Loader/Loader';
import SearchError from '../../assets/svg/SearchError';

const AccountPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    const [userStatusClasses, setUserStatusClasses] = useState([styles.editStatus]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPartValue, setEditingPartValue] = useState('Нажми для редактирования');
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

    const [visibleUserOptionsModal, setVisibleUserOptionsModal] = useState(false);

    const [optionsButton, setOptionsButton] = useState('Популярные');

    const [isShowHiddenOptions, setIsShowHiddenOptions] = useState(false);
    const [isDeleteFriendConfirmationVisible, setIsDeleteFriendConfirmationVisible] = useState(false);

    const {id} = useParams();
    const [currentUserId, setCurrentUserId] = useState('');
    const {isLoading, data, refetch: refetchUser} = useGetUserByEmailQuery(id || user.email);
    const [getPosts, {isError: isUserPostsError, isLoading: isUserPostsLoading, data: userPostsData}] = useLazyGetAllUserPostsQuery();
    const {isLoading: isUserDataLoading, data: userData, refetch} = useGetUserDataQuery(id || user.email);

    const [changeStatus, {isError: isStatusError}] = useChangeUserStatusMutation();
    const [createUserPost, {isError: isUserPostError, data: userPostData}] = useCreatePostMutation();

    const [deleteFromFriends, {error: isDeleteFromFriendsError, data: deleteFromFriendsData}] = useDeleteFriendMutation();
    const [sendFriendRequest, {isError: isFriendRequestError}] = useSendFriendRequestMutation()
    const [sendDeleteFriendRequest, {isError: isFriendDeleteRequestError}] = useDeleteFriendRequestMutation();
    const [sendAcceptFriendRequest, {isError: isFriendAcceptRequestError}] = useAcceptFriendRequestMutation();
    const {data: notificationsData} = useGetAllNotificationsQuery(user.email);

    const {data: friendsData} = useGetAllFriendsQuery({id: user.email, limit: 400, page: 1});

    function checkIsNotFriend(user) {
        if(friendsData)
            return (friendsData.rows.filter(friend => (friend.profile_from === (data && data.email) || friend.profile_to === (data && data.email))))?.length == 0
    }

    function hidePost(id: number) {
        setPosts(posts.filter(post => post.id !== id))
        notifyAlert("Подобные посты больше не будут отображаться")
    }

    function reportPost(id: number) {
        setPosts(posts.filter(post => post.id !== id))
        notifyError("Ваша жалоба на пост отправлена")
    }

    function showPopularPostsHandler() {
        setOptionsButton('Популярные');
    }

    function showMostViewedPostsHandler() {
        setOptionsButton('Просматриваемые');
    }

    const showFileUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setUserCurrentFile(e.target.files[0]);
    }

    useEffect(() => {
        if(friendsData && data) {
            if(!checkIsNotFriend(data?.email)) {
                setButtonState('Написать сообщение')
            }
            if(notificationsData && data && checkIsNotFriend(data?.email)) {          
                let subs = notificationsData.filter(notification => (notification.profile_to === data.email || notification.profile_from === data.email));

                if(subs.length === 0) 
                    setButtonState('Добавить в друзья')
                else if(subs[0].profile_from === user.email)
                    setButtonState('Запрос отправлен')
                else 
                    setButtonState('Принять запрос')
            }       
        }
    }, [friendsData, data, notificationsData])

    function turnOnEditing() {
        if(id === user.email) {
            setIsEditing(true);
            setEditingPartValue('Нажми чтобы сохранить');
            setUserStatusClasses([...userStatusClasses, styles.editing]);
        }
    }

    function finishEditing(key?: any) {
        if((key === 'Enter' || key === 'click') && !isUserCurrentStatusError && userCurrentStatus !== '') {
            setIsEditing(false);
            setEditingPartValue('Нажми для редактирования');
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
        else notifyAlert('Нельзя отправить пост без описания');
    }

    function sendFrindRequestHandler(email) {
        if(buttonState === 'Написать сообщение') {
            navigate(`/chat?id=${email}`);    
        }
        else if(buttonState === 'Добавить в друзья') {
            sendFriendRequest({profile_from: user.email, profile_to: email})
            setButtonState('Запрос отправлен');
        }
        else if(buttonState === 'Запрос отправлен') {
            sendDeleteFriendRequest({profile_from: user.email, profile_to: email})
            setButtonState('Добавить в друзья');
        }
        else {
            sendAcceptFriendRequest({profile_from: email, profile_to: user.email})
            setButtonState('Написать сообщение');
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

    function filterPostsAfterDeletion(postId) {
        setPosts(posts.filter(post => post.id !== postId))
    }

    useEffect(() => {
        if(isUserPostError) notifyError('Произошла ошибка при создании поста');
    }, [isUserPostError])

    useEffect(() => {
        if(isStatusError) notifyError('Произошла ошибка при изменении статуса');
    }, [isStatusError])

    useEffect(() => {
        if(isDeleteFromFriendsError) notifyError('Произошла ошибка при удалении пользователя из друзей');
    }, [isDeleteFromFriendsError])

    useEffect(() => {
        if(isFriendRequestError) notifyError('Произошла ошибка при отправке запроса в друзья');
    }, [isFriendRequestError])

    useEffect(() => {
        if(isFriendAcceptRequestError) notifyError('Произошла ошибка при принятии запроса в друзья');
    }, [isFriendAcceptRequestError])

    useEffect(() => {
        if(isFriendDeleteRequestError) notifyError('Произошла ошибка при удалении пользователя из друзей');
    }, [isFriendDeleteRequestError])

    useEffect(() => {
        if(deleteFromFriendsData) setButtonState('Добавить в друзья');
    }, [deleteFromFriendsData])

    useEffect(() => {
        if(userData) {
            setUserCurrentStatus(userData.status !== '' ? userData.status : 'Статус не задан');
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
                >
                    <ConfirmationModal
                        setVisible={setIsDeleteFriendConfirmationVisible} 
                        executeAfterConfirm={handleDeleteFromFriends}
                        label="Вы точно хотите удалить?"
                    />
                </ModalWrap>
            }
            {
                visibleUserOptionsModal &&
                    <ModalWrap 
                        visible={visibleUserOptionsModal} 
                        setVisible={setVisibleUserOptionsModal} 
                    >
                        <EditModal 
                            header='Форма редактирования профиля'
                            setVisible={setVisibleUserOptionsModal} 
                        >
                            <EditAccount
                                visible={visibleUserOptionsModal} 
                                setVisible={setVisibleUserOptionsModal} 
                                refetch={refetch}
                                refetchUser={refetchUser}
                            />
                        </EditModal>
                    </ModalWrap>
            }
            {
                userData && visible && 
                    <ModalWrap 
                        visible={visible} 
                        setVisible={setVisible} 
                    >
                        <ImageOptionsModal 
                            mainImage={userData.image}
                            panoramaImage={userData.panoramaImage} 
                            type={imageEditingType}
                            visible={visible} 
                            setVisible={setVisible}  
                        />
                    </ModalWrap>
            }
            <div 
                className={styles.panoramaImage} 
                onClick={() => showImageOptionsHandler('panoramaImage')}
            >
                {isUserDataLoading &&
                    <SkeletonLoader borderRadius={0}/>
                }
                {(userData && userData.panoramaImage !== 'none') &&
                    <img src={baseUrl + userData.panoramaImage}/>
                }
                {id !== user.email &&
                    <div 
                        className={styles.userAdditionalOptions}
                        onMouseOver={() => setIsShowHiddenOptions(true)}
                        onMouseOut={() => setIsShowHiddenOptions(false)}
                        onClick={event => showHiddenOptions(event)}
                    >
                        <More className={styles.accountMore}/>
                    </div>
                }
                <div 
                    className={isShowHiddenOptions ? [styles.hiddenOptions, styles.visible].join(' ') : styles.hiddenOptions}
                    onMouseOver={() => setIsShowHiddenOptions(true)}
                    onMouseOut={() => setIsShowHiddenOptions(false)}
                >
                    {!checkIsNotFriend(id) && (id !== user.email) &&
                        <a onClick={event => handleOpenConfirmationModal(event)}>Удалить из друзей</a>
                    }
                </div>
            </div>
            <div className={styles.accountPage}>
                <div className={styles.userInfo}>
                    <div className={styles.userImageHolder}>
                        <div 
                            className={styles.userImage} 
                            onClick={() => showImageOptionsHandler('regularImage')}
                        >
                            {isUserDataLoading &&
                                <SkeletonLoader borderRadius={999}/>
                            }
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
                                    {buttonState === 'Написать сообщение' && <Comment className={styles.userAddInFriendsPlus}/>}
                                    {buttonState === 'Запрос отправлен' && <Angle className={styles.userAddInFriendsPlus}/>}
                                    {buttonState === 'Добавить в друзья' && <Plus className={styles.userAddInFriendsPlus}/>}
                                    {buttonState === 'Принять запрос' && <CheckMark className={styles.userAddInFriendsPlus}/>}
                                </div>
                            </div>
                        :
                            <div 
                                className={styles.userOptionsWrap} 
                                onClick={() => setVisibleUserOptionsModal(true)}
                            >
                                <Options className={styles.userOptions}/>
                            </div>
                    }
                    {
                        (id !== user.email) &&
                        <div className={styles.hiddenUserAddInFriends} onClick={() => sendFrindRequestHandler(data && data.email)}>
                            {buttonState === 'Написать сообщение' && <Comment className={styles.hiddenUserAddInFriendsPlus}/>}
                            {buttonState === 'Запрос отправлен' && <Angle className={styles.hiddenUserAddInFriendsPlus}/>}
                            {buttonState === 'Добавить в друзья' && <Plus className={styles.hiddenUserAddInFriendsPlus}/>}
                            {buttonState === 'Принять запрос' && <CheckMark className={styles.hiddenUserAddInFriendsPlus}/>}
                        </div>
                    }
                    {isLoading &&
                        <p className={[styles.userName, styles.skeleton].join(' ')}>
                            <SkeletonLoader borderRadius={3}/>
                        </p>
                    }
                    <p className={styles.userName}>{data && data.name} {data && data.surname}</p>
                    <div className={styles.editablePart}>
                        {isUserDataLoading &&
                            <p className={[styles.userStatus, styles.skeleton].join(' ')}>
                                <SkeletonLoader borderRadius={3}/>
                            </p>
                        }
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
                    {isUserDataLoading &&
                        <p className={[styles.userDateBirth, styles.skeleton].join(' ')}>
                            <SkeletonLoader borderRadius={3}/>
                        </p>
                    }
                    {!isUserDataLoading &&
                        <>
                            <p className={styles.userDateBirth}>Дата рождения: {userData && userData.date_birth}</p>
                            <p className={styles.userCity}>Город: {userData && userData.city}</p>
                        </>
                    }

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
                <InputBar type='shortened'>
                    <div className={styles.postFinder}>
                        <Input 
                            type="shortened"
                            placeholder='Искать записи...' 
                            value={search} 
                            onChange={setSearch}
                        />
                    </div>
                    <div className={styles.postOptions}>
                        <Button onClick={showPopularPostsHandler} isActive={(optionsButton === 'Популярные')}>
                            Популярные
                        </Button>
                        <Button onClick={showMostViewedPostsHandler} isActive={(optionsButton === 'Просматриваемые')}>
                            Просматриваемые
                        </Button>
                    </div>
                </InputBar>
            </div>
            <div className={styles.userPosts}>
                {isFindedPostsLoading &&
                    <div className={styles.loader}>
                        <Loader type="regular"/>
                    </div> 
                }
                {findedPostsData && (findedPostsData && findedPostsData[0] === undefined) && !isFindedPostsError && !isFindedPostsLoading && isSearch &&
                    <AlertHolder 
                        icon={<SearchError className={styles.alertIconDefault}/>}
                        label="Подобных постов не найдено"
                    />
                }
                {!isSearch &&
                    <PostsWrap 
                        getPosts={getPosts} 
                        isLoading={isUserPostsLoading} 
                        isError={isUserPostsError}
                        data={userPostsData} 
                        type="USER_POSTS" 
                        id={id} 
                        newPostData={userPostData}
                    />
                }
                {findedPostsData && isSearch && findedPostsData.map(post =>       
                    <Post 
                        key={post.id} 
                        hidePost={hidePost} 
                        reportPost={reportPost}
                        post={post}
                        filterPostsAfterDeletion={filterPostsAfterDeletion}
                    />
                )}
            </div>
        </div>
        </>
    );
};

export default AccountPage;