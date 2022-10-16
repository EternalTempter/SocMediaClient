import React, { useEffect, useRef, useState } from 'react';
import Options from '../../assets/svg/Options';
import Plus from '../../assets/svg/Plus';
import Search from '../../assets/svg/Search';
import GroupHolder from '../../components/GroupHolder/GroupHolder';
import { useDebounce } from '../../hooks/useDebounce';
import { IGroupUsers, IUser } from '../../models';
import { useFindAllGroupsByNameQuery, useGetAllUserGroupSubscriptionsQuery, useLazyGetAllGroupsQuery, useLazyGetAllUserGroupSubscriptionsQuery } from '../../store/socmedia/groups/groups.api';
import styles from './GroupsPage.module.scss';
import jwt_decode from 'jwt-decode';
import ButtonBar from '../../components/ButtonBar/ButtonBar';
import Button from '../../components/UI/Button/Button';
import ComplexButton from '../../components/UI/ComplexButton/ComplexButton';
import InputBar from '../../components/InputBar/InputBar';
import Input from '../../components/UI/Input/Input';
import ModalWrap from '../../components/ModalWrap/ModalWrap';
import CreateGroupModal from '../../components/CreateGroupModal/CreateGroupModal';
import { useObserver } from '../../hooks/useObserver';
import GroupsWrap from '../../components/GroupsWrap/GroupsWrap';

const GroupsPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const [buttonState, setButtonState] = useState('Мои сообщества');

    // const lastElement = useRef<HTMLDivElement | null>(null);
    // const [page, setPage] = useState(1);
    // const [totalPages, setTotalPages] = useState<number | null>(null); 
    // const [groups, setGroups] = useState<IGroupUsers[]>([]);
    const [subscriptions, setSubscriptions] = useState<string[] | undefined>(undefined)

    const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
    
    const [search, setSearch] = useState('');
    const [getAllUserGroupSubscriptions, {isError, isLoading, data}] = useLazyGetAllUserGroupSubscriptionsQuery();
    
    const [isSearch, setIsSearch] = useState(false);
    const debounced = useDebounce(search);
    const {isError: isGroupsError, isLoading: isGroupsLoading, data: groupsData} = useFindAllGroupsByNameQuery(debounced, {
        skip: debounced.length < 1
    });
    const [getAllGroups, {isError: isAllGroupsError, isLoading: isAllGroupsLoading, data: allGroupsData}] = useLazyGetAllGroupsQuery();

    // function checkIsSubscribed(email) {
    //     return (groups.filter(group => (group.group_id === String(email))))?.length == 0
    // }

    function showMyGroupsHandler() {
        setButtonState('Мои сообщества');
    }

    function showRecommendationsHandler() {
        setButtonState('Рекомендации');
        // getAllGroups({});
    }

    useEffect(() => {
        if(data){
            let subs = data.rows.map(group => group.group_id);
            setSubscriptions(subs);
        } 
    }, [data])

    useEffect(() => {
        getAllUserGroupSubscriptions({id: user.email, limit: 400})
    }, [])

    // function updateSubscriptionsData(type: string, group: any) {
    //     if(type === 'add') setGroups([group, ...groups])
    //     else setGroups(groups.filter(gr => gr.id !== group.id));
    // }

    // useObserver(lastElement, isLoading, totalPages, page, () => {
    //     setPage((page) => page + 1)
    // });

    // useEffect(() => {
    //     getAllUserGroupSubscriptions({id: user.email, limit: 5, page: page})
    // }, [page])

    // useEffect(() => {
    //     if(data) {
    //         setGroups([...groups, ...data.rows])
    //         if(totalPages === null) {
    //             setTotalPages(data.count);
    //         }
    //     }
    // }, [data])

    useEffect(() => {
        setIsSearch(debounced.length > 1 && data.rows?.length! >= 0)
    }, [debounced]);

    return (
        <div className={styles.groupsPageWrap}>
            {
                createGroupModalVisible &&
                    <ModalWrap visible={createGroupModalVisible} setVisible={setCreateGroupModalVisible} type='column'>
                        <CreateGroupModal setVisible={setCreateGroupModalVisible}/>
                    </ModalWrap>
            }
            <ButtonBar>
                <Button onClick={showMyGroupsHandler} isActive={(buttonState === 'Мои сообщества')}>
                    Мои сообщества
                </Button>
                <Button onClick={showRecommendationsHandler} isActive={(buttonState === 'Рекомендации')}>
                    Рекомендации
                </Button>
                <div className={styles.groupsOptions} onClick={() => setCreateGroupModalVisible(true)}>
                    <Options className={styles.groupsOptionsIcon}/>
                </div>
                <div className={styles.createGroup} onClick={() => setCreateGroupModalVisible(true)}>
                    <ComplexButton>
                        <p>Создать сообщество</p>
                        <Plus className={styles.createGroupPlus}/>
                    </ComplexButton>
                </div>
            </ButtonBar>
            
            <InputBar>
                <Input placeholder="Искать сообщества..." value={search} onChange={setSearch}/>
            </InputBar>

            {!isSearch && buttonState === 'Мои сообщества' && 
                <GroupsWrap 
                    getGroups={getAllUserGroupSubscriptions} 
                    isLoading={isLoading} 
                    type="SUBSCRIBED_GROUPS" 
                    data={data}
                />
            }

            {!isSearch && data && subscriptions && subscriptions.length === data.rows.length && buttonState === 'Рекомендации' && 
                <GroupsWrap 
                    subscriptions={subscriptions}
                    getGroups={getAllGroups} 
                    isLoading={isAllGroupsLoading} 
                    type="UNSUBSCRIBED_GROUPS" 
                    data={allGroupsData}
                />
            }

            {/* {!isSearch && buttonState === 'Мои сообщества' && groups && groups.map(group => 
                <GroupHolder key={group.id} refetch={updateSubscriptionsData} group_id={group.group_id}/>
            )}
            {!isSearch && data && buttonState === 'Рекомендации' && allGroupsData && allGroupsData.filter(group => checkIsSubscribed(group.id)).map(group => 
                <GroupHolder key={group.id} refetch={updateSubscriptionsData} group_id={String(group.id)} user_subscriptions={groups.map(group => group.group_id)}/>
            )} */}
            {isSearch && groupsData && data && subscriptions && subscriptions.length === data.rows.length && groupsData.map(group => 
                <GroupHolder key={group.id} group_id={String(group.id)} user_subscriptions={subscriptions}/>
            )}
            {/* <div className={styles.lastElement} ref={lastElement}></div> */}
        </div>
    );
};

export default GroupsPage;