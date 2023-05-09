import React, { FC, useEffect, useState } from 'react';
import { IUser } from '../../models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateGroupMutation } from '../../store/socmedia/groups/groups.api';
import jwt_decode from 'jwt-decode';
import styles from './CreateGroup.module.scss';
import { isValidFileUploaded, notifyError, notifySuccess } from '../../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import EditWrap from '../EditWrap/EditWrap';
import { baseUrl } from '../../envVariables/variables';
import SavingChangesHolder from '../UI/SavingChangesHolder/SavingChangesHolder';

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

    useEffect(() => {
        if(!isLoading) {
            if(data) {
                notifySuccess('Группа успешно создана');
                navigate(`${data.id}`);
                setVisible(false);
            }
        }
    }, [data])

    useEffect(() => {
        if(isError) notifyError('При создании группы произошла ошибка');
    }, [isError])

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
        {isLoading &&
            <SavingChangesHolder label="Создание группы"/>
        }     
        <div className={styles.editImages}>
            <EditWrap
                editType='clip'
                text='Прикрепить фото сообщества'
                showFileUpload={showGroupImageUpload}
            > 
                <aside className={styles.photo}>
                    {
                        groupImagePreview && <img src={groupImagePreview}/>
                    }
                </aside>
            </EditWrap>
            <EditWrap
                editType='clip'
                text='Прикрепить фон сообщества'
                showFileUpload={showGroupPanoramaImageUpload}
            >
                <aside className={styles.background}>
                    {
                        groupPanoramaImagePreview && <img src={groupPanoramaImagePreview}/>
                    }
                </aside>
            </EditWrap>
        </div>
        <div className={styles.editData}>
            <EditWrap
                editType='edit'
                text='Заполните данные формы'
            >
                <div className={styles.inputs}>
                    <div className={!isGroupNameError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                    {isGroupNameError && <span className={styles.error}>Допустимая длина от 2 до 40 символов</span>}
                        <input 
                            className={styles.input}
                            type="text" 
                            value={groupInfo.name}
                            onChange={(e) => setGroupInfo({...groupInfo, name: e.target.value})}
                            onBlur={validateGroupName} 
                            placeholder="Введите название сообщества"
                        />
                    </div>
                    <div className={!isGroupDescriptionError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                    {isGroupDescriptionError && <span className={styles.error}>Допустимая длина от 2 до 200 символов</span>}
                        <input 
                            className={styles.input}
                            type="text" 
                            value={groupInfo.description}
                            onChange={(e) => setGroupInfo({...groupInfo, description: e.target.value})}
                            onBlur={validateGroupDescription} 
                            placeholder="Введите описание сообщества"
                        />
                    </div>
                    <div className={styles.selects}>
                        <select 
                            className={styles.themes}
                            value={groupInfo.type}
                            onChange={e => setGroupInfo({...groupInfo, type: e.target.value})}
                        >
                            <option disabled value="">Выберите тематику сообщества</option>
                            <option value="Анекдоты">Анекдоты</option>
                            <option value="Наука">Наука</option>
                            <option value="Новости">Новости</option>
                            <option value="Игры">Игры</option>
                            <option value="Другое">Другое</option>
                        </select>
                    </div>
                </div>
            </EditWrap>
            <div 
                className={styles.saveButton}
                onClick={createGroupHandler}
            >Создать</div>
        </div>
        </>
    );
};

export default CreateGroupModal;