import React, { FC, useEffect, useState } from 'react';
import { IGroupUsers, IUser } from '../../models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateGroupMutation } from '../../store/socmedia/groups/groups.api';
import jwt_decode from 'jwt-decode';
import styles from './CreateGroupModal.module.scss';
import { useLazyGetGroupUserQuery, useLazySubscribeOnGroupQuery } from '../../store/socmedia/groupUsers/groupUsers.api';
import { isValidFileUploaded } from '../../helpers/helpers';
import { useNavigate } from 'react-router-dom';

interface CreateGroupModalProps {
    setVisible: (value: boolean) => void
}

const CreateGroupModal:FC<CreateGroupModalProps> = ({setVisible}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    const [groupInfo, setGroupInfo] = useState({name: '', type: '', description: ''});
    const [isGroupNameError, setIsGroupNameError] = useState(false);
    const [isGroupDescriptionError, setIsGroupDescriptionError] = useState(false);

    const [groupImage, setGroupImage] = useState();
    const [groupPanoramaImage, setGroupPanoramaImage] = useState();

    const [groupImagePreview, setGroupImagePreview] = useState('');
    const [groupPanoramaImagePreview, setGroupPanoramaImagePreview] = useState('');

    const [createGroup, {isError, isLoading, data}] = useCreateGroupMutation();

    const [getGroupUser, {isError: isGroupUserError, isLoading: isGroupUserLoading, data: groupUserData}] = useLazyGetGroupUserQuery();

    const [subscribe, {isError: isSubError, isLoading: isSubLoading, data: subData}] = useLazySubscribeOnGroupQuery()

    const showGroupImageUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setGroupImage(e.target.files[0]);
    }

    const showGroupPanoramaImageUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setGroupPanoramaImage(e.target.files[0]);
    }

    function notify() {
        toast.warn('Правильно заполните первые три поля', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function createGroupHandler() {
        if((groupInfo.name !== '' && !isGroupNameError) && groupInfo.type !== '' && (groupInfo.description !== '' && !isGroupDescriptionError)) {
            const formData = new FormData()
            formData.append('group_name', groupInfo.name);
            formData.append('type', groupInfo.type);
            formData.append('description', groupInfo.description);
            formData.append('owner_id', user.email);
            formData.append('image', groupImage ? groupImage : 'none');
            formData.append('panoramaImage', groupPanoramaImage ? groupPanoramaImage : 'none');
            createGroup(formData);
            setGroupInfo({name: '', type: '', description: ''});
            setGroupImage(undefined);
            setGroupPanoramaImage(undefined);
        }
        else notify();
    }

    function validateGroupName() {
        setIsGroupNameError(groupInfo.name.length > 40 || groupInfo.name.length < 2);
    }

    function validateGroupDescription() {
        setIsGroupDescriptionError(groupInfo.description.length > 200 || groupInfo.description.length < 2);
    }

    function handleGroupNameChange(e: any) {
        setGroupInfo({...groupInfo, name: e.target.value})
        validateGroupName()
    }

    function handleGroupDescriptionChange(e: any) {
        setGroupInfo({...groupInfo, description: e.target.value})
        validateGroupDescription()
    }

    useEffect(() => {
        if(data) {
            navigate(`${data.id}`);
            setVisible(false);
        }
    }, [data])

    useEffect(() => {
        if(groupImage) {
            let src = URL.createObjectURL(groupImage);
            setGroupImagePreview(src);
        }
    }, [groupImage])

    useEffect(() => {
        if(groupPanoramaImage) {
            let src = URL.createObjectURL(groupPanoramaImage);
            setGroupPanoramaImagePreview(src);
        }
    }, [groupPanoramaImage])

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
            <h3 className={styles.textLabel}>Создание сообщества</h3>
            <p className={styles.inputLabel}>Допустимая длина от 2 до 40 символов</p>
            <input 
                className={isGroupNameError ? [styles.groupNameInput, styles.error].join(' ') : styles.groupNameInput} 
                type="text" 
                placeholder='Введите название сообщества'
                value={groupInfo.name}
                onChange={(e) => handleGroupNameChange(e)}
                onBlur={validateGroupName}
            />
            <select
                className={styles.groupTypeInput} 
                value={groupInfo.type}
                onChange={e => setGroupInfo({...groupInfo, type: e.target.value})}
            >
                <option disabled value="">Выберите тематику группы</option>
                <option value="Мемы">Анекдоты</option>
                <option value="Наука">Наука</option>
                <option value="Религия">Новости</option>
                <option value="Игры">Игры</option>
                <option value="Другое">Другое</option>
            </select>
            <p className={styles.inputLabel}>Допустимая длина от 2 до 200 символов. Осталось - {((200 - groupInfo.description.length) > 0) ? 200 - groupInfo.description.length : 0}</p>
            <textarea 
                className={isGroupDescriptionError ? [styles.groupDescriptionInput, styles.error].join(' ') : styles.groupDescriptionInput} 
                placeholder='Введите описание сообщества'
                value={groupInfo.description}
                onChange={(e) => handleGroupDescriptionChange(e)}
                onBlur={validateGroupDescription}
            />
            <div className={styles.groupViews}>
                <div className={styles.groupImage}>
                    {groupImagePreview === '' && <p>Прикрепите фотографию</p>}
                    {
                        groupImagePreview && <img src={groupImagePreview} />
                    }
                    <input 
                        type="file" 
                        placeholder='Прикрепите фотографию сообщества'
                        onChange={showGroupImageUpload}
                        accept=".png, .jpg, .jpeg"
                    />
                </div>
                <div className={styles.groupPanoramaImage}>
                    {groupPanoramaImagePreview === '' && <p>Прикрепите панорамную фотографию</p>}
                    {
                        groupPanoramaImagePreview && <img src={groupPanoramaImagePreview} />
                    }
                    <input 
                        type="file" 
                        placeholder='Прикрепите панорамную фотографию сообщества'
                        onChange={showGroupPanoramaImageUpload}
                        accept=".png, .jpg, .jpeg"
                    />
                </div>
            </div>
            <input 
                className={styles.createGroup} 
                type="button" 
                value="Создать сообщество"
                onClick={createGroupHandler}
            />
        </>
    );
};

export default CreateGroupModal;