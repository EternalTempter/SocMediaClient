import React, { useEffect, useRef, useState } from 'react';
import { IUser } from '../../models';
import jwt_decode from 'jwt-decode';
import { useChangeUserStatusMutation, useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import styles from './AccountPage.module.scss';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import More from '../../assets/svg/More';
import Plus from '../../assets/svg/Plus';
import Angle from '../../assets/svg/Angle';
import Clip from '../../assets/svg/Clip';
import Search from '../../assets/svg/Search';
import Comment from '../../assets/svg/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import Send from '../../assets/svg/Send';
import { useCreatePostMutation, useGetAllUserPostsQuery } from '../../store/socmedia/posts/posts.api';
import Post from '../../components/Post/Post';
import { useAcceptFriendRequestMutation, useDeleteFriendRequestMutation, useGetAllFriendsQuery, useGetAllNotificationsQuery, useSendFriendRequestMutation } from '../../store/socmedia/friends/friends.api';

const AccountPage = () => {
    const navigate = useNavigate();

    const [userStatusClasses, setUserStatusClasses] = useState([styles.editStatus]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPartValue, setEditingPartValue] = useState('Нажми для редактирования');
    const [userCurrentStatus, setUserCurrentStatus] = useState('');
    const [userCurrentPost, setUserCurrentPost] = useState('');
    const [buttonState, setButtonState] = useState('');

    const {id} = useParams();

    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    
    const {isError, isLoading, data} = useGetUserByEmailQuery(id || user.email);
    const {isError: isUserPostsError, isLoading: isUserPostsLoading, data: userPostsData} = useGetAllUserPostsQuery(id || user.email);
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userData} = useGetUserDataQuery(id || user.email);

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

    useEffect(() => {
        if(friendsData && data) {
            if(!checkIsNotFriend(data?.email)) {
                setButtonState('Написать сообщение')
            }
            if(notificationsData && data && checkIsNotFriend(data?.email)) {          
                let asdf = notificationsData.filter(notification => (notification.profile_to === data.email || notification.profile_from === data.email));

                if(asdf.length === 0) 
                    setButtonState('Добавить в друзья')
                else if(asdf[0].profile_from === user.email)
                    setButtonState('Запрос отправлен')
                else 
                    setButtonState('Принять запрос')
            }       
        }
    }, [friendsData, data, notificationsData])

    function turnOnEditing() {
        setIsEditing(true);
        setEditingPartValue('Нажми чтобы сохранить');
        setUserStatusClasses([...userStatusClasses, styles.editing]);
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
        if(userCurrentPost.length > 0 && (key === 'Enter' || key === 'click')) {
            createUserPost({post_handler_type: 'USER', post_handler_id: user.email, description: userCurrentPost})
            setUserCurrentPost('');
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

    useEffect(() => {
        if(userData) {
            setUserCurrentStatus(userData.status);
        }
    }, [userData]);

    return (
        <div className={styles.accountPageWrap}>
            <div className={styles.panoramaImage}>
                <div>
                    <More className={styles.accountMore}/>
                </div>
            </div>
            <div className={styles.accountPage}>
                <div className={styles.userInfo}>
                    <div className={styles.userImageHolder}>
                        <div className={styles.userImage}/>
                    </div>
                    {
                        (id !== user.email) &&
                        <div className={styles.userAddInFriends} onClick={() => sendFrindRequestHandler(data && data.email)}>
                            {buttonState}
                            <div>
                                {buttonState === 'Написать сообщение' 
                                    ? 
                                    <Comment className={styles.userAddInFriendsPlus}/>
                                    :
                                    buttonState === 'Запрос отправлен' 
                                    ? 
                                    <Angle className={styles.userAddInFriendsPlus}/> 
                                    :
                                    <Plus className={styles.userAddInFriendsPlus}/>
                                }
                            </div>
                        </div>
                    }
                    <div className={styles.hiddenUserAddInFriends}>
                        <Plus className={styles.hiddenUserAddInFriendsPlus}/>
                    </div>
                    <p className={styles.userName}>{data && data.name} {data && data.surname}</p>
                    <div className={styles.editablePart}>
                        {!isEditing ? 
                            <p className={styles.userStatus} 
                                onMouseOut={() => setUserStatusClasses([styles.editStatus])} 
                                onMouseOver={() => setUserStatusClasses([...userStatusClasses, styles.on])}
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
                    <div className={styles.moreButton}>
                        <Angle className={styles.moreButtonAngle}/>
                    </div>
                </div>
                <div className={styles.userStats}>
                    <div>
                        <p className={styles.userStatsCount}>23</p>
                        <p className={styles.userStatsType}>друзей</p>
                    </div>
                    <div>
                        <p className={styles.userStatsCount}>44</p>
                        <p className={styles.userStatsType}>группы</p>
                    </div>
                    <div>
                        <p className={styles.userStatsCount}>56</p>
                        <p className={styles.userStatsType}>подписчиков</p>
                    </div>
                    <div>
                        <p className={styles.userStatsCount}>4520</p>
                        <p className={styles.userStatsType}>фото</p>
                    </div>
                    <div>
                        <p className={styles.userStatsCount}>123</p>
                        <p className={styles.userStatsType}>аудиозаписи</p>
                    </div>
                    <div>
                        <p className={styles.userStatsCount}>65</p>
                        <p className={styles.userStatsType}>видеозаписи</p>
                    </div>
                    <div>
                        <p className={styles.userStatsCount}>16</p>
                        <p className={styles.userStatsType}>записи</p>
                    </div>
                </div>
                <div className={styles.addPostWrap}>
                    <div>
                        <input 
                            type="text" 
                            placeholder='Расскажите что у вас нового'
                            value={userCurrentPost}
                            onChange={e => setUserCurrentPost(e.target.value)}
                            // onKeyDown={e => createPost(e.key)}
                        />
                        <div>
                            <Clip className={styles.addPostClip}/>
                            <div onClick={() => createPost('click')}>
                                <Send className={styles.addPostSend}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.userPostsOptions}>
                <div className={styles.postFinder}>
                    <input type="text" placeholder="Искать записи..."/>
                    <div>
                        <Search className={styles.postFinderSearch}/>
                    </div>
                </div>
                <div className={styles.postOptions}>
                    <button>Все записи</button>
                    <button>Только мои записи</button>
                </div>
            </div>
            <div className={styles.userPosts}>
                {userPostsData && userPostsData.map(post => 
                                                    <Post post={post}
                                                />)}
            </div>
        </div>
    );
};

export default AccountPage;