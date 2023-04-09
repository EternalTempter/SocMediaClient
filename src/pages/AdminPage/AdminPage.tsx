import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import styles from './AdminPage.module.scss';
import ManageNews from '../../assets/svg/ManageNews';
import ManageReports from '../../assets/svg/ManageReports';
import ManageUserRoles from '../../assets/svg/ManageUserRoles';
import Options from '../../assets/svg/Options';
import Exit from '../../assets/svg/Exit';
import { IUser } from '../../models';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import { baseUrl } from '../../envVariables/variables';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../components/UI/SkeletonLoader/SkeletonLoader';
import AdminPanelManageNews from '../../components/AdminPanelManageNews/AdminPanelManageNews';
import AdminPanelManageReports from '../../components/AdminPanelManageReports/AdminPanelManageReports';
import AdminPanelManageUserRoles from '../../components/AdminPanelManageUserRoles/AdminPanelManageUserRoles';

const AdminPage = () => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    const [currentAdminOption, setCurrentAdminOption] = useState('manageNews');

    const {isLoading: isUserDataLoading, data: userData} = useGetUserDataQuery(user.email);

    useEffect(() => {
        if(user.role !== 'OWNER' && user.role !== 'ADMIN') navigate('/account/' + user.email);
    }, [user])

    return (
        <div className={styles.adminWrap}>
            <div className={styles.adminMenu}>
                <div className={styles.adminProfile}>
                    <div className={styles.adminProfileImage}>
                        {isUserDataLoading && <SkeletonLoader borderRadius={999}/>}
                        {userData && <img src={baseUrl + userData.image}/>}
                    </div>
                    <p>Администратор</p>
                </div>
                <div className={styles.adminOptions}>
                    <div 
                        className={styles.adminOption}
                        onClick={() => setCurrentAdminOption('manageNews')}
                    >
                        <ManageNews className={styles.manageNewsIcon}/>
                        <p>Управление новостями</p>
                    </div>
                    <div 
                        className={styles.adminOption}
                        onClick={() => setCurrentAdminOption('manageReports')}
                    >
                        <ManageReports className={styles.manageReportsIcon}/>
                        <p>Просмотр жалоб</p>
                    </div>
                    <div 
                        className={styles.adminOption}
                        onClick={() => setCurrentAdminOption('manageUserRoles')}
                    >
                        <ManageUserRoles className={styles.manageUserRolesIcon}/>
                        <p>Управление ролями</p>
                    </div>
                    <div 
                        className={styles.adminOption}
                        onClick={() => setCurrentAdminOption('manageNews')}
                    >
                        <Options className={styles.optionsIcon}/>
                        <p>Настройки</p>
                    </div>
                </div>
                <div 
                    className={styles.adminLogout}
                    onClick={() => navigate('/account/' + user.email)}
                >
                    <Exit className={styles.exitIcon}/>
                    <p>Вернуться</p>
                </div>
            </div>
            <div className={styles.adminField}>
                {currentAdminOption === 'manageNews' &&
                    <AdminPanelManageNews/>
                }
                {currentAdminOption === 'manageReports' &&
                    <AdminPanelManageReports/>
                }
                {currentAdminOption === 'manageUserRoles' &&
                    <AdminPanelManageUserRoles/>
                }
            </div>
        </div>
    );
};

export default AdminPage;