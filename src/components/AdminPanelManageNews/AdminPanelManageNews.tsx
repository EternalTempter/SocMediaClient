import React, { useEffect, useState } from 'react';
import styles from './AdminPanelManageNews.module.scss';
import SavingChangesHolder from '../UI/SavingChangesHolder/SavingChangesHolder';
import Clip from '../../assets/svg/Clip';
import Edit from '../../assets/svg/Edit';
import { isValidFileUploaded, notifyError, notifySuccess } from '../../helpers/helpers';
import { useCreateMutation, useDeleteByIdMutation } from '../../store/socmedia/news/news.api';
import { ToastContainer } from 'react-toastify';

const AdminPanelManageNews = () => {
    const [createNews, {isError: isCreateNewsError, isLoading: isCreateNewsLoading, data: createNewsData}] = useCreateMutation();
    const [deleteNews, {isError: isDeleteNewsError, isLoading: isDeleteNewsLoading, data: deleteNewsData}] = useDeleteByIdMutation();

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [photo, setPhoto] = useState();
    const [newsPhotoPreview, setNewsPhotoPreview] = useState('');

    const [isLabelError, setIsLabelError] = useState(false);
    const [isDescriptionError, setIsDescriptionError] = useState(false);
    const [isTimeSpentError, setIsTimeSpentError] = useState(false);

    const showPhotoUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setPhoto(e.target.files[0]);
    }

    const [id, setId] = useState('');

    function validateLabel() {
        setIsLabelError(label.length < 2 || label.length > 70);
    }

    function validateDescription() {
        setIsDescriptionError(description.length < 2 || description.length > 350)
    }

    function validateTimeSpent() {
        setIsTimeSpentError(label.length < 2 || label.length > 60);
    }

    function createNewsHandler() {
        const formData = new FormData()
        formData.append('label', label);
        formData.append('description', description);
        formData.append('time_spent', timeSpent);
        formData.append('image', photo ? photo : 'none');
        createNews(formData);
    }

    function deleteNewsHandler() {
        deleteNews({id: id});
    }
    
    useEffect(() => {
        if(photo) {
            var src = URL.createObjectURL(photo);
            setNewsPhotoPreview(src);
        }
    }, [photo])

    useEffect(() => {
        if(isCreateNewsError) notifyError('Ошибка создания новости');
    }, [isCreateNewsError])

    useEffect(() => {
        if(isDeleteNewsError) notifyError('Ошибка удаления новости');
    }, [isDeleteNewsError])

    useEffect(() => {
        if(createNewsData) notifySuccess('Новость успешно создана');
    }, [createNewsData])

    useEffect(() => {
        if(deleteNewsData) notifySuccess('Новость успешно удалена');
    }, [deleteNewsData])

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
            <div>
                {isCreateNewsLoading && 
                    <SavingChangesHolder label="Создание новости"/>
                }
                {isDeleteNewsLoading && 
                    <SavingChangesHolder label="Удаление новости"/>
                }
                <p className={styles.label}>Управление новостями</p>
                <div className={styles.manageNews}>
                    <div className={styles.createNews}>
                        <p className={styles.createNewsLabel}>Создание новости</p>
                        <div className={styles.editWrap}>
                            <input 
                                className={styles.inputFile}
                                type="file" 
                                onChange={e => showPhotoUpload(e)}
                                accept=".png, .jpg, .jpeg"
                            />
                            <div className={styles.editHeader}>
                                <p>Добавить изображение новости</p>
                                <Clip className={styles.clipIcon}/>
                            </div>
                            <div className={styles.editContent}>
                                <aside className={styles.background}>
                                    {
                                        newsPhotoPreview && <img src={newsPhotoPreview}/>
                                    }
                                </aside>
                            </div>
                        </div>
                        <div className={styles.editWrap}>
                            <div className={styles.editHeader}>
                                <p>Добавить данные новости</p>              
                                <Edit className={styles.editIcon}/>  
                            </div>
                            <div className={styles.editContent}>
                                <div className={styles.inputs}>
                                    <div className={!isLabelError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                                        {isLabelError && <span className={styles.error}>Допустимая длина от 2 до 70 символов</span>}
                                        <input 
                                            className={styles.input}
                                            type="text" 
                                            onChange={e => setLabel(e.target.value)}
                                            onBlur={validateLabel} 
                                            value={label} 
                                            placeholder="Введите заголовок"
                                        />
                                    </div>
                                    <div className={!isDescriptionError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                                        {isDescriptionError && <span className={styles.error}>Допустимая длина от 2 до 350 символов</span>}
                                        <input 
                                            className={styles.input}
                                            type="text" 
                                            onChange={e => setDescription(e.target.value)} 
                                            onBlur={validateDescription} 
                                            value={description} 
                                            placeholder="Введите описание"
                                        />
                                    </div>
                                    <div className={!isTimeSpentError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                                        {isTimeSpentError && <span className={styles.error}>Допустимая длина от 1 до 60 символов</span>}
                                        <input 
                                            className={styles.input}
                                            type="text" 
                                            onChange={e => setTimeSpent(e.target.value)} 
                                            onBlur={validateTimeSpent} 
                                            value={timeSpent} 
                                            placeholder="Введите потраченное время"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div 
                            className={styles.createButton}
                            onClick={createNewsHandler}
                        >Создать новость</div>
                    </div>
                    <div className={styles.deleteNews}>
                        <p className={styles.createNewsLabel}>Удаление новости</p>
                        <div className={styles.editWrap}>
                            <div className={styles.editHeader}>
                                <p>Удаление новости</p>              
                                <Edit className={styles.editIcon}/>  
                            </div>
                            <div className={styles.editContent}>
                                <div className={styles.inputs}>
                                    <div className={styles.inputBox}>
                                        <input 
                                            className={styles.input}
                                            type="number" 
                                            onChange={e => setId(e.target.value)}
                                            value={id} 
                                            placeholder="Введите айди новости"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div 
                            className={styles.createButton}
                            onClick={deleteNewsHandler}
                        >Удалить новость</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPanelManageNews;