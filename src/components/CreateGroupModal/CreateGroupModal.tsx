import React, { FC, useEffect, useState } from 'react';
import { IUser } from '../../models';
import { useCreateGroupMutation } from '../../store/socmedia/groups/groups.api';
import jwt_decode from 'jwt-decode';
import styles from './CreateGroupModal.module.scss';

interface CreateGroupModalProps {

}

const CreateGroupModal:FC<CreateGroupModalProps> = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');

    const [groupInfo, setGroupInfo] = useState({name: '', type: '', description: ''});

    const [groupImage, setGroupImage] = useState();
    const [groupPanoramaImage, setGroupPanoramaImage] = useState();

    const [groupImagePreview, setGroupImagePreview] = useState('');
    const [groupPanoramaImagePreview, setGroupPanoramaImagePreview] = useState('');

    const [createGroup, {isError, isLoading, data}] = useCreateGroupMutation();

    const showGroupImageUpload = e => {
        setGroupImage(e.target.files[0]);
    }

    const showGroupPanoramaImageUpload = e => {
        setGroupPanoramaImage(e.target.files[0]);
    }

    function createGroupHandler() {
        if(groupInfo.name !== '' && groupInfo.type !== '' && groupInfo.description !== '') {
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
    }

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
            <h3 className={styles.textLabel}>Создание сообщества</h3>
            <input 
                className={styles.groupNameInput} 
                type="text" 
                placeholder='Введите название сообщества'
                value={groupInfo.name}
                onChange={e => setGroupInfo({...groupInfo, name: e.target.value})}
            />
            <input 
                className={styles.groupTypeInput} 
                type="text" 
                placeholder='Введите тематику группы'
                value={groupInfo.type}
                onChange={e => setGroupInfo({...groupInfo, type: e.target.value})}
            />
            <textarea 
                className={styles.groupDescriptionInput} 
                placeholder='Введите описание сообщества'
                value={groupInfo.description}
                onChange={e => setGroupInfo({...groupInfo, description: e.target.value})}
            />
            <div className={styles.groupViews}>
                <div className={styles.groupImage}>
                    <p>Прикрепите фотографию</p>
                    {
                        groupImagePreview && <img src={groupImagePreview} />
                    }
                    <input 
                        type="file" 
                        placeholder='Прикрепите фотографию сообщества'
                        onChange={showGroupImageUpload}
                    />
                </div>
                <div className={styles.groupPanoramaImage}>
                    <p>Прикрепите панорамную фотографию</p>
                    {
                        groupPanoramaImagePreview && <img src={groupPanoramaImagePreview} />
                    }
                    <input 
                        type="file" 
                        placeholder='Прикрепите панорамную фотографию сообщества'
                        onChange={showGroupPanoramaImageUpload}
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