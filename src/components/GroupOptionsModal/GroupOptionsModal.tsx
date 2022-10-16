import React, { FC, useState } from 'react';
import { IUser } from '../../models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import styles from './GroupOptionsModal.module.scss';
import { useDeleteGroupMutation, useUpdateDescriptionMutation } from '../../store/socmedia/groups/groups.api';
import ModalWrap from '../ModalWrap/ModalWrap';
import { useNavigate } from 'react-router-dom';

interface GroupOptionsModalProps {
    group_id: string
    refetch: () => void
    setGroupVisible: (value: boolean) => void
}

const GroupOptionsModal:FC<GroupOptionsModalProps> = ({refetch, group_id, setGroupVisible}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [isDescError, setIsDescError] = useState(false);

    const [visible, setVisible] = useState(false);

    const [updateDescription, {isError: isDescriptionError, isLoading: isDescriptionLoading, data: descriptionData}] = useUpdateDescriptionMutation()

    const [deleteGroup, {isError: isDeleteGroupError, isLoading: isDeleteGroupLoading, data: deleteGroupData}] = useDeleteGroupMutation()

    function updateDescriptionHandler() {
        if(description !== '' && !isDescError){
            updateDescription({description: description, id: group_id});  
            refetch();
        }
        else notify('Правильно заполните описание группы!');  
    }

    function validateDescription() {
        setIsDescError(description.length > 200 || description.length < 2);
    }

    function handleDescriptionChange(e: any) {
        setDescription(e.target.value);
        validateDescription()
    }

    function deleteGroupHandler() {
        deleteGroup({group_id: group_id});
        navigate('/groups')
    }

    function notify(message: string) {
        toast.warn(message, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
        {visible &&
            <div className={styles.modalWrap} onClick={() => setVisible(false)}>
                <div className={styles.modal}>
                    <p className={styles.confirmLabel}>Вы уверены что хотите удалить группу?</p>
                    <div>
                        <button className={styles.deleteButton} onClick={deleteGroupHandler}>Удалить</button>
                        <button className={styles.button} onClick={() => setVisible(false)}>Не удалять</button>
                    </div>
                </div> 
            </div>
        }
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
                <p className={styles.label}>Изменение описания группы</p>
                <p className={styles.inputLabel}>Допустимая длина от 2 до 200 символов</p>
                <div>
                    <input 
                        type="text" 
                        placeholder='Описание группы'
                        className={isDescError ? [styles.groupDescriptionInput, styles.error].join(' ') : styles.groupDescriptionInput}
                        value={description}
                        onChange={e => handleDescriptionChange(e)}
                    />
                </div>
                <button className={styles.button} onClick={updateDescriptionHandler}>Сохранить описание</button>
                <p className={styles.label}>Удаление группы</p>
                <button className={styles.deleteButton} onClick={() => setVisible(true)}>Удалить группу</button>
            </div>
        </>
    );
};

export default GroupOptionsModal;