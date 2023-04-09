import React, { useEffect, useState } from 'react';
import styles from './AdminPanelManageUserRoles.module.scss';
import { ToastContainer } from 'react-toastify';
import Edit from '../../assets/svg/Edit';
import { useChangeUserRoleMutation } from '../../store/socmedia/users/users.api';
import { notifyAlert, notifyError, notifySuccess } from '../../helpers/helpers';
import SavingChangesHolder from '../UI/SavingChangesHolder/SavingChangesHolder';

const AdminPanelManageUserRoles = () => {
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');

    const [changeUserRole, {isLoading, isError, data}] = useChangeUserRoleMutation();

    function changeUserRoleHandler() {
        if(role !== '' && userId !== '') changeUserRole({role: role, user_id: userId});
        else notifyAlert('Сначала заполните все поля')
        setUserId('');
        setRole('');
    }

    useEffect(() => {
        if(isError) notifyError('Произошла ошибка при изменении роли');
    }, [isError])

    useEffect(() => {
        if(data) notifySuccess('Роль успешно изменена');
    }, [data])

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
                <SavingChangesHolder label='Изменение роли'/>
            }
            <div>
                <p className={styles.label}>Управление ролями пользователя</p>
                <div className={styles.deleteNews}>
                    <p className={styles.createNewsLabel}>Удаление новости</p>
                    <div className={styles.editWrap}>
                        <div className={styles.editHeader}>
                            <p>Управление ролями</p>              
                            <Edit className={styles.editIcon}/>  
                        </div>
                        <div className={styles.editContent}>
                            <div className={styles.inputs}>
                                <div className={styles.inputBox}>
                                    <input 
                                        className={styles.input}
                                        type="text" 
                                        onChange={e => setUserId(e.target.value)}
                                        value={userId} 
                                        placeholder="Введите айди пользователя"
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <input 
                                        className={styles.input}
                                        type="text" 
                                        onChange={e => setRole(e.target.value)}
                                        value={role} 
                                        placeholder="Введите роль"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div 
                        className={styles.createButton}
                        onClick={changeUserRoleHandler}
                    >Изменить роль</div>
                </div>
            </div>
        </>
    );
};

export default AdminPanelManageUserRoles;