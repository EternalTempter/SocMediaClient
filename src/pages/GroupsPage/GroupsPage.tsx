import React, { useEffect, useState } from 'react';
import Options from '../../assets/svg/Options';
import Plus from '../../assets/svg/Plus';
import Search from '../../assets/svg/Search';
import GroupHolder from '../../components/GroupHolder/GroupHolder';
import { useDebounce } from '../../hooks/useDebounce';
import { IUser } from '../../models';
import { useFindAllGroupsByNameQuery, useGetAllUserGroupSubscriptionsQuery, useLazyGetAllGroupsQuery } from '../../store/socmedia/groups/groups.api';
import styles from './GroupsPage.module.scss';
import jwt_decode from 'jwt-decode';
import ButtonBar from '../../components/ButtonBar/ButtonBar';
import Button from '../../components/UI/Button/Button';
import ComplexButton from '../../components/UI/ComplexButton/ComplexButton';
import InputBar from '../../components/InputBar/InputBar';
import Input from '../../components/UI/Input/Input';
import ModalWrap from '../../components/ModalWrap/ModalWrap';
import CreateGroupModal from '../../components/CreateGroupModal/CreateGroupModal';

const GroupsPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const [buttonState, setButtonState] = useState('Мои сообщества');

    const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
    
    const [search, setSearch] = useState('');
    const {isError, isLoading, data, refetch} = useGetAllUserGroupSubscriptionsQuery(user.email);
    
    const [isSearch, setIsSearch] = useState(false);
    const debounced = useDebounce(search);
    const {isError: isGroupsError, isLoading: isGroupsLoading, data: groupsData} = useFindAllGroupsByNameQuery(debounced, {
        skip: debounced.length < 1
    });
    const [getAllGroups, {isError: isAllGroupsError, isLoading: isAllGroupsLoading, data: allGroupsData}] = useLazyGetAllGroupsQuery();

    function checkIsSubscribed(email) {
        return (data?.filter(group => (group.group_id === String(email))))?.length == 0
    }

    function showMyGroupsHandler() {
        setButtonState('Мои сообщества');
    }

    function showRecommendationsHandler() {
        setButtonState('Рекомендации');
        getAllGroups();
    }

    useEffect(() => {
        setIsSearch(debounced.length > 1 && data?.length! >= 0)
    }, [debounced]);

    return (
        <div className={styles.groupsPageWrap}>
            {
                createGroupModalVisible &&
                    <ModalWrap visible={createGroupModalVisible} setVisible={setCreateGroupModalVisible} type='column'>
                        <CreateGroupModal refetch={refetch} setVisible={setCreateGroupModalVisible}/>
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

            {!isSearch && buttonState === 'Мои сообщества' && data && data.map(group => 
                <GroupHolder key={group.id} refetch={refetch} group_id={group.group_id}/>
            )}
            {!isSearch && data && buttonState === 'Рекомендации' && allGroupsData && allGroupsData.filter(group => checkIsSubscribed(group.id)).map(group => 
                <GroupHolder key={group.id} refetch={refetch} group_id={String(group.id)} user_subscriptions={data.map(group => group.group_id)}/>
            )}
            {isSearch && groupsData && data && groupsData.map(group => 
                <GroupHolder key={group.id} refetch={refetch} group_id={String(group.id)} user_subscriptions={data.map(group => group.group_id)}/>
            )}
        </div>
    );
};

export default GroupsPage;