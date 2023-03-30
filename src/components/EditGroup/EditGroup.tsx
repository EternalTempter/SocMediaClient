import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { baseUrl } from '../../envVariables/variables';
import { isValidFileUploaded, notifyError, notifySuccess } from '../../helpers/helpers';
import { useDeleteGroupMutation, useGetGroupByIdQuery, useUpdateDescriptionMutation, useUpdateImageMutation, useUpdateNameMutation, useUpdatePanoramaImageMutation, useUpdateTypeMutation } from '../../store/socmedia/groups/groups.api';
import EditWrap from '../EditWrap/EditWrap';
import Button from '../UI/Button/Button';
import SavingChangesHolder from '../UI/SavingChangesHolder/SavingChangesHolder';
import styles from './EditGroup.module.scss';

interface EditGroupProps {
    refetch: () => void
    visible: boolean
    setVisible: (value: boolean) => void
}

const EditGroup:FC<EditGroupProps> = ({refetch, visible, setVisible}) => {
    const {id} = useParams();
    const navigate = useNavigate(); 

    const {data, refetch: groupRefetch} = useGetGroupByIdQuery(String(id));

    const [isGeneralOptionsVisible, setIsGeneralOptionsVisible] = useState(false);
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    const [isGroupNameError, setIsGroupNameError] = useState(false);
    const [isGroupDescriptionError, setIsGroupDescriptionError] = useState(false);

    const [groupImage, setGroupImage] = useState();
    const [groupPanoramaImage, setGroupPanoramaImage] = useState();

    const [groupImagePreview, setGroupImagePreview] = useState('');
    const [groupPanoramaImagePreview, setGroupPanoramaImagePreview] = useState('');

    const [updateDescription, {isError: isDescriptionError, isLoading: isDescriptionLoading, data: descriptionData}] = useUpdateDescriptionMutation()
    const [updateName, {isError: isNameError, isLoading: isNameLoading, data: nameData}] = useUpdateNameMutation()
    const [updateType, {isError: isTypeError, isLoading: isTypeLoading, data: typeData}] = useUpdateTypeMutation()
    const [updateImage, {isError: isImageError, isLoading: isImageLoading, data: imageData}] = useUpdateImageMutation()
    const [updatePanoramaImage, {isError: isPanoramaImageError, isLoading: isPanoramaImageLoading, data: panoramaImageData}] = useUpdatePanoramaImageMutation()

    const [deleteGroup, {isError: isDeleteGroupError, isLoading: isDeleteGroupLoading, data: deleteGroupData}] = useDeleteGroupMutation()

    function deleteGroupHandler() {
        deleteGroup({group_id: id});
    }

    function validateGroupName() {
        setIsGroupNameError(groupName.length > 40 || groupName.length < 2);
    }

    function validateGroupDescription() {
        setIsGroupDescriptionError(groupDescription.length > 200 || groupDescription.length < 2);
    }

    const showGroupImageUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setGroupImage(e.target.files[0]);
    }

    const showGroupPanoramaImageUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setGroupPanoramaImage(e.target.files[0]);
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
    
    function updateGroupHandler() {
        if(data) {
            if(groupName !== data.group_name) updateName({group_name: groupName, id: id});
            if(groupDescription !== data.description) updateDescription({description: groupDescription, id: id});
            if(groupType !== data.type) updateType({type: groupType, id: id});

            if(groupImage) {
                const formData = new FormData()
                formData.append('img', groupImage ? groupImage : 'none');
                formData.append('id', String(id));
                updateImage(formData);
            }
            if(groupPanoramaImage) {
                const formData = new FormData()
                formData.append('img', groupPanoramaImage ? groupPanoramaImage : 'none');
                formData.append('id', String(id));
                updatePanoramaImage(formData);
            }
            // setVisible(false);
        }
    }

    useEffect(() => {
        if(deleteGroupData) navigate('/');
    }, [deleteGroupData])

    useEffect(() => {
        if(isDeleteGroupError) notifyError('Произошла ошибка при удалении группы');
    }, [isDeleteGroupError])

    useEffect(() => {
        if(data) {
            if(data.group_name) setGroupName(data.group_name)
            if(data.description) setGroupDescription(data.description)
            if(data.type) setGroupType(data.type)
        }
    }, [data])

    useEffect(() => {
        if(isTypeError || isImageError || isDescriptionError || isNameError || isPanoramaImageError) {
            notifyError('При сохранении некоторых изменений произошла ошибка');
        }
    }, [isTypeError, isImageError, isDescriptionError, isNameError, isPanoramaImageError])

    useEffect(() => {
        if(!isDescriptionLoading && !isTypeLoading && !isImageLoading && !isNameLoading && !isPanoramaImageLoading) {
            if(descriptionData || typeData || imageData || nameData || panoramaImageData) {
                notifySuccess('Данные успешно сохранены');
                refetch();
                groupRefetch();
            }
        }
    }, [descriptionData, typeData, imageData, nameData, panoramaImageData])
    
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
            {isDeleteConfirmationVisible &&
                <div 
                    className={styles.modalWrap} 
                    onClick={() => setIsDeleteConfirmationVisible(false)}
                >
                    <div className={styles.modal}>
                        <p className={styles.confirmLabel}>Вы уверены что хотите удалить группу?</p>
                        <div>
                            <Button
                                onClick={deleteGroupHandler} 
                                isActive={false}
                            >Удалить</Button>
                            <Button
                                onClick={() => setIsDeleteConfirmationVisible(false)} 
                                isActive={false}
                            >Не удалять</Button>
                        </div>
                    </div> 
                </div>
            }
            {(isDescriptionLoading || 
                isTypeLoading || 
                isImageLoading || 
                isNameLoading || 
                isPanoramaImageLoading) &&
                <SavingChangesHolder label="Сохранение изменений"/>
            }
            {isDeleteGroupLoading &&
                <SavingChangesHolder label="Удаление группы"/>
            }
            {isGeneralOptionsVisible &&
                <div className={styles.generalOptionsWrap}>
                    <EditWrap
                        editType='edit'
                        text='Удаление сообщества'
                    >
                        <div className={styles.generalOptions}>
                            <p>Подумайте прежде чем удалять сообщество, эта операция необратима!</p>
                            <Button
                                onClick={() => setIsDeleteConfirmationVisible(true)} 
                                isActive={false}
                            >Удалить группу</Button>
                        </div>
                    </EditWrap>
                </div>

            }
            {!isGeneralOptionsVisible &&
            <>

                <div className={styles.editImages}>
                    <EditWrap
                        editType='clip'
                        text='Изменить фото сообщества'
                        showFileUpload={showGroupImageUpload}
                    > 
                        <aside className={styles.photo}>
                            {
                                groupImagePreview && <img src={groupImagePreview}/>
                            }
                            {
                                (!groupImagePreview && data && data.image !== 'none') 
                                    ? 
                                <img src={baseUrl + data.image}/> 
                                    : 
                                ''
                            }
                        </aside>
                    </EditWrap>
                    <EditWrap
                        editType='clip'
                        text='Изменить фон сообщества'
                        showFileUpload={showGroupPanoramaImageUpload}
                    >
                        <aside className={styles.background}>
                            {
                                groupPanoramaImagePreview && <img src={groupPanoramaImagePreview}/>
                            }
                            {
                                (!groupPanoramaImagePreview && data && data.panoramaImage !== 'none') 
                                    ? 
                                <img src={baseUrl + data.panoramaImage}/> 
                                    : 
                                ''
                            }
                        </aside>
                    </EditWrap>
                </div>
                <div className={styles.editData}>
                    <EditWrap
                        editType='edit'
                        text='Изменение данных сообщества...'
                    >
                        <div className={styles.inputs}>
                            <div className={!isGroupNameError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                            {isGroupNameError && <span className={styles.error}>Допустимая длина от 2 до 40 символов</span>}
                                <input 
                                    className={styles.input}
                                    type="text" 
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)} 
                                    onBlur={validateGroupName}
                                    placeholder="Введите название сообщества"
                                />
                            </div>
                            <div className={!isGroupNameError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                            {isGroupDescriptionError && <span className={styles.error}>Допустимая длина от 2 до 200 символов</span>}
                                <input 
                                    className={styles.input}
                                    type="text" 
                                    value={groupDescription}
                                    onChange={(e) => setGroupDescription(e.target.value)}
                                    onBlur={validateGroupDescription}
                                    placeholder="Введите описание сообщества"
                                />
                            </div>
                            <div className={styles.selects}>
                                <select 
                                    className={styles.themes}
                                    value={groupType}
                                    onChange={e => setGroupType(e.target.value)}
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
                    <Button
                        onClick={() => setIsGeneralOptionsVisible(true)} 
                        isActive={false}
                    >Перейти в настройки управления группой</Button>
                    <div 
                        className={styles.saveButton}
                        onClick={updateGroupHandler}
                    >Сохранить</div>
                </div>
            </>
            }
        </>
    );
};

export default EditGroup;