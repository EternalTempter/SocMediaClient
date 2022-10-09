import React, { useEffect, useState } from 'react';
import { IPost, IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import { useChangeUserStatusMutation, useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import styles from './AccountPage.module.scss';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import More from '../../assets/svg/More';
import Plus from '../../assets/svg/Plus';
import Angle from '../../assets/svg/Angle';
import Comment from '../../assets/svg/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreatePostMutation, useFindUserPostsByDescriptionQuery, useLazyGetAllUserPostsQuery } from '../../store/socmedia/posts/posts.api';
import Post from '../../components/Post/Post';
import { useAcceptFriendRequestMutation, useDeleteFriendRequestMutation, useGetAllFriendsQuery, useGetAllNotificationsQuery, useSendFriendRequestMutation } from '../../store/socmedia/friends/friends.api';
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

const AccountPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    const [userStatusClasses, setUserStatusClasses] = useState([styles.editStatus]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPartValue, setEditingPartValue] = useState('Нажми для редактирования');
    const [userCurrentStatus, setUserCurrentStatus] = useState('');
    const [userCurrentPostDescription, setUserCurrentPostDescription] = useState('');
    const [userCurrentFile, setUserCurrentFile] = useState();
    const [buttonState, setButtonState] = useState('');

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

    const {id} = useParams();
    const [currentUserId, setCurrentUserId] = useState('');
    const {isError, isLoading, data} = useGetUserByEmailQuery(id || user.email);
    const [getPosts, {isError: isUserPostsError, isLoading: isUserPostsLoading, data: userPostsData}] = useLazyGetAllUserPostsQuery();
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userData, refetch} = useGetUserDataQuery(id || user.email);

    const [changeStatus, {isError: isStatusError, isLoading: isStatusLoading, data: statusData}] = useChangeUserStatusMutation();
    const [createUserPost, {isError: isUserPostError, isLoading: isUserPostLoading, data: userPostData}] = useCreatePostMutation();

    const [sendFriendRequest, {isLoading: isFriendRequestLoading, isError: isFriendRequestError, data: friendRequestData}] = useSendFriendRequestMutation()
    const [sendDeleteFriendRequest, {isLoading: isFriendDeleteRequestLoading, isError: isFriendDeleteRequestError, data: friendDeleteRequestData}] = useDeleteFriendRequestMutation();
    const [sendAcceptFriendRequest, {isLoading: isFriendAcceptRequestLoading, isError: isFriendAcceptRequestError, data: friendAcceptRequestData}] = useAcceptFriendRequestMutation();
    const {isLoading: isNotificationsLoading, isError: isNotificationsError, data: notificationsData} = useGetAllNotificationsQuery(user.email);

    const {isError: isFriendsError, isLoading: isFriendsLoading, data: friendsData} = useGetAllFriendsQuery(user.email);

    function checkIsNotFriend(user) {
        return (friendsData?.filter(friend => (friend.profile_from === (data && data.email) || friend.profile_to === (data && data.email))))?.length == 0
    }

    function hidePost(id: number) {
        setPosts(posts.filter(post => post.id !== id))
    }

    function showPopularPostsHandler() {
        setOptionsButton('Популярные');
    }

    function showMostViewedPostsHandler() {
        setOptionsButton('Просматриваемые');
    }

    const showFileUpload = e => {
        setUserCurrentFile(e.target.files[0]);
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
        if(key === 'Enter' || key === 'click') {
            setIsEditing(false);
            setEditingPartValue('Нажми для редактирования');
            setUserStatusClasses([styles.editStatus])
            changeStatus({status: userCurrentStatus, id: user.email});
        }

    }

    function createPost(key?: any) {
        if(userCurrentPostDescription.length > 0 && (key === 'Enter' || key === 'click')) {
            const formData = new FormData()
            formData.append('description', userCurrentPostDescription);
            formData.append('img', userCurrentFile ? userCurrentFile : 'none');
            formData.append('post_handler_type', 'USER');
            formData.append('post_handler_id', user.email);
            createUserPost(formData);
            setUserCurrentPostDescription('');
        }
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

    function showImageOptionsHandler(type: string) {
        setVisible(true);
        setImageEditingType(type);
    }

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

    return (
        <div className={styles.accountPageWrap}>
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
                        />
                    </ModalWrap>
            }
            <div className={styles.panoramaImage} onClick={() => showImageOptionsHandler('panoramaImage')}>
                {(userData && userData.panoramaImage !== 'none') &&
                    <img src={baseUrl + userData.panoramaImage}/>
                }
                <div>
                    <More className={styles.accountMore}/>
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
                                    {buttonState === 'Написать сообщение' && <Comment className={styles.userAddInFriendsPlus}/>}
                                    {buttonState === 'Запрос отправлен' && <Angle className={styles.userAddInFriendsPlus}/>}
                                    {buttonState === 'Добавить в друзья' && <Plus className={styles.userAddInFriendsPlus}/>}
                                    {buttonState === 'Принять запрос' && <CheckMark className={styles.userAddInFriendsPlus}/>}
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
                            {buttonState === 'Написать сообщение' && <Comment className={styles.hiddenUserAddInFriendsPlus}/>}
                            {buttonState === 'Запрос отправлен' && <Angle className={styles.hiddenUserAddInFriendsPlus}/>}
                            {buttonState === 'Добавить в друзья' && <Plus className={styles.hiddenUserAddInFriendsPlus}/>}
                            {buttonState === 'Принять запрос' && <CheckMark className={styles.hiddenUserAddInFriendsPlus}/>}
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
                                    onChange={e => setUserCurrentStatus(e.target.value)}
                                    type="text" 
                                    value={userCurrentStatus}
                                    className={styles.userEditStatus} 
                            />     
                        }
                        <p className={userStatusClasses.join(' ')}>{editingPartValue}</p>
                    </div>                  
                    <p className={styles.userDateBirth}>Date Birth: {userData && userData.date_birth}</p>
                    <p className={styles.userCity}>City: {userData && userData.city}</p>
                    {/* <div className={styles.moreButton}>
                        <Angle className={styles.moreButtonAngle}/>
                    </div> */}
                </div>
                <UserStats id={String(id)}/>
                {(id === user.email) &&
                    <AddPostPanel 
                        currentPostDescription={userCurrentPostDescription} 
                        setCurrentPostDescription={setUserCurrentPostDescription} 
                        showFileUpload={showFileUpload} 
                        createPost={createPost}
                        type='regular'
                    />
                }
            </div>
            
            <div className={(id === user.email) ? styles.userPostsOptions : [styles.userPostsOptions, styles.marginless].join(' ')}>
                <InputBar>
                    <div className={styles.postFinder}>
                        <Input placeholder='Искать записи...' value={search} onChange={setSearch}/>
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
                {!isSearch &&
                    <PostsWrap getPosts={getPosts} isLoading={isUserPostsLoading} data={userPostsData} type="USER_POSTS" id={id} newPostData={userPostData}/>
                }
                {findedPostsData && isSearch && findedPostsData.map(post =>       
                    <Post key={post.id} hidePost={hidePost} post={post}/>
                )}
            </div>
        </div>
    );
};

export default AccountPage;