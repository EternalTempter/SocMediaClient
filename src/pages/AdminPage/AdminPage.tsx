import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import { isValidFileUploaded } from '../../helpers/helpers';
import { useCreateMutation, useDeleteByIdMutation } from '../../store/socmedia/news/news.api';
import styles from './AdminPage.module.scss';

const AdminPage = () => {
    const [createNews, {data: createNewsData}] = useCreateMutation();
    const [deleteNews, {data: deleteNewsData}] = useDeleteByIdMutation();

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [photo, setPhoto] = useState();

    const showPhotoUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setPhoto(e.target.files[0]);
    }

    const [id, setId] = useState('');

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
        if(createNewsData) console.log(createNewsData);
    }, [createNewsData]);

    useEffect(() => {
        if(deleteNewsData) console.log(deleteNewsData);
    }, [deleteNewsData]);

    return (
        <div>
            <div className={styles.newsCreateForm}>
                <Input 
                    placeholder='Введите заголовок'
                    value={label}
                    onChange={setLabel}
                    type='regular'
                />
                <Input 
                    placeholder='Введите описание'
                    value={description}
                    onChange={setDescription}
                    type='regular'
                />
                <Input 
                    placeholder='Введите потраченное время'
                    value={timeSpent}
                    onChange={setTimeSpent}
                    type='regular'
                />
                <input 
                    type="file" 
                    onChange={e => showPhotoUpload(e)} 
                    placeholder="Прикрепите фотографию"
                />
                <button
                    onClick={createNewsHandler}
                >Создать новость</button>
            </div>
            <div className={styles.newsDeletionForm}>
                <Input 
                    placeholder='Введите айди новости которую хотите удалить'
                    value={id}
                    onChange={setId}
                    type='regular'
                />
                <button
                    onClick={deleteNewsHandler}
                >Удалить новость</button>
            </div>
        </div>
    );
};

export default AdminPage;