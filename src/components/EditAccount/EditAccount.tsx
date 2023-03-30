import React, { FC, useEffect, useState } from 'react';
import { IUser } from '../../models';
import { useChangeUserCityMutation, useChangeUserDateBirthMutation, useChangeUserNameMutation, useChangeUserStatusMutation, useChangeUserSurnameMutation, useGetUserDataQuery, useUpdateImageMutation, useUpdatePanoramaImageMutation } from '../../store/socmedia/userData/userData.api';
import EditWrap from '../EditWrap/EditWrap';
import styles from './EditAccount.module.scss';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { generateArrayOfYears, generateArrayOfDays, isValidFileUploaded, notifyError, notifySuccess } from '../../helpers/helpers';
import { baseUrl } from '../../envVariables/variables';
import { useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import SkeletonLoader from '../UI/SkeletonLoader/SkeletonLoader';
import SavingChangesHolder from '../UI/SavingChangesHolder/SavingChangesHolder';
import { ToastContainer } from 'react-toastify';

interface EditAccountProps {
    refetch: () => void
    refetchUser: () => void
    visible: boolean
    setVisible: (value: boolean) => void
}

const EditAccount:FC<EditAccountProps> = ({refetch, refetchUser, visible, setVisible}) => {
    const {id} = useParams();
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    
    const [userCurrentStatus, setUserCurrentStatus] = useState('');
    const [userCurrentName, setUserCurrentName] = useState('');
    const [userCurrentSurname, setUserCurrentSurname] = useState('');
    const [userCurrentCity, setUserCurrentCity] = useState('');
    const [userCurrentDateBirth, setUserCurrentDateBirth] = useState({day: '', month: '', year: ''});

    const [userCurrentStatusError, setUserCurrentStatusError] = useState(false);
    const [userCurrentNameError, setUserCurrentNameError] = useState(false);
    const [userCurrentSurnameError, setUserCurrentSurnameError] = useState(false);
    const [userCurrentCityError, setUserCurrentCityError] = useState(false);
    
    const [changeCity, {isError: isCityError, isLoading: isCityLoading, data: cityData}] = useChangeUserCityMutation();
    const [changeDateBirth, {isError: isDateBirthError, isLoading: isDateBirthLoading, data: dateBirthData}] = useChangeUserDateBirthMutation();
    const [changeStatus, {isError: isStatusError, isLoading: isStatusLoading, data: statusData}] = useChangeUserStatusMutation();
    const [changeName, {isError: isNameError, isLoading: isNameLoading, data: nameData}] = useChangeUserNameMutation();
    const [changeSurname, {isError: isSurnameError, isLoading: isSurnameLoading, data: surnameData}] = useChangeUserSurnameMutation();
    const [updateUserImage, {isLoading: isRegularImageLoading, isError: isRegularImageError, data: regularImageData}] = useUpdateImageMutation();
    const [updatePanoramaImage, {isLoading: isPanoramaImageLoading, isError: isPanoramaImageError, data: panoramaImageData}] = useUpdatePanoramaImageMutation();

    const {data: userData, refetch: refetchUserData} = useGetUserDataQuery(id || user.email);
    const {data: userServerData, refetch: refetchUserModal} = useGetUserByEmailQuery(id || user.email);
    
    const [userCurrentPhoto, setUserCurrentPhoto] = useState();
    const [userCurrentPhotoPreview, setUserCurrentPhotoPreview] = useState('');
    const [userCurrentBackground, setUserCurrentBackground] = useState();
    const [userCurrentBackgroundPreview, setUserCurrentBackgroundPreview] = useState('');

    const days:number[] = generateArrayOfDays();
    const months:string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const years:number[] = generateArrayOfYears();

    const showPhotoUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setUserCurrentPhoto(e.target.files[0]);
    }

    const showBackgroundUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setUserCurrentBackground(e.target.files[0]);
    }

    useEffect(() => {
        if(userCurrentPhoto) {
            var src = URL.createObjectURL(userCurrentPhoto);
            setUserCurrentPhotoPreview(src);
        }
    }, [userCurrentPhoto])

    useEffect(() => {
        if(userCurrentBackground) {
            var src = URL.createObjectURL(userCurrentBackground);
            setUserCurrentBackgroundPreview(src);
        }
    }, [userCurrentBackground])

    function saveChanges() {
        if(userData) {
            if(userCurrentName !== user.name) changeName({name: userCurrentName, id: user.email});
            if(userCurrentSurname !== user.surname) changeSurname({surname: userCurrentSurname, id: user.email});
            if(userCurrentCity !== userData.city) changeCity({city: userCurrentCity, id: user.email});
            if(userCurrentStatus !== userData.status) changeStatus({status: userCurrentStatus, id: user.email});
            if([userCurrentDateBirth.day, userCurrentDateBirth.month, userCurrentDateBirth.year].join('.') !== userData.dateBirth) 
                changeDateBirth({date_birth: [userCurrentDateBirth.day, userCurrentDateBirth.month, userCurrentDateBirth.year].join('.'), id: user.email});
            
            if(userCurrentPhoto) {         
                const formData = new FormData()
                formData.append('img', userCurrentPhoto ? userCurrentPhoto : 'none');
                formData.append('id', user.email);
                updateUserImage(formData);
            }
            if(userCurrentBackground) {
                const formData = new FormData()
                formData.append('img', userCurrentBackground ? userCurrentBackground : 'none');
                formData.append('id', user.email);
                updatePanoramaImage(formData);
            }
            // setVisible(false);
        }
    }

    useEffect(() => {
        if(userData) {
            if(userData.city) setUserCurrentCity(userData.city)
            if(userData.status) setUserCurrentStatus(userData.status)
            if(userData.date_birth) setUserCurrentDateBirth({day: userData.date_birth.split('.')[0], month: userData.date_birth.split('.')[1], year: userData.date_birth.split('.')[2]})
            setUserCurrentName(user.name)
            setUserCurrentSurname(user.surname)  
        }
    }, [userData])

    useEffect(() => {
        if(userServerData) {
            setUserCurrentName(userServerData.name)
            setUserCurrentSurname(userServerData.surname)  
        }
    }, [userServerData])

    useEffect(() => {
        if(isCityError || isDateBirthError || isStatusError || isNameError || isSurnameError || isRegularImageError || isPanoramaImageError) {
            notifyError('При сохранении некоторых изменений произошла ошибка');
        }
    }, [isCityError, isDateBirthError, isStatusError, isNameError, isSurnameError, isRegularImageError, isPanoramaImageError])

    useEffect(() => {
        if(!isCityLoading && !isDateBirthLoading && !isStatusLoading && !isNameLoading && !isSurnameLoading && !isRegularImageLoading && !isPanoramaImageLoading) {
            if(cityData || dateBirthData || statusData || nameData || surnameData || regularImageData || panoramaImageData) {
                notifySuccess('Данные успешно сохранены');
                refetch();
                refetchUser();
                refetchUserData();
                refetchUserModal();
            }
        }
    }, [cityData, dateBirthData, statusData, nameData, surnameData, regularImageData, panoramaImageData])

    function validateSurname() {
        setUserCurrentSurnameError(userCurrentSurname.length < 2 || userCurrentSurname.length > 20);
    }

    function validateName() {
        setUserCurrentNameError(userCurrentName.length < 2 || userCurrentName.length > 20);
    }

    function validateStatus() {
        setUserCurrentStatusError(userCurrentStatus.length < 1 || userCurrentStatus.length > 200);
    }

    function validateCity() {
        setUserCurrentCityError(userCurrentCity.length < 1 || userCurrentCity.length > 60);
    }

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
        {(isCityLoading || isDateBirthLoading || isStatusLoading || isNameLoading || isSurnameLoading || isRegularImageLoading || isPanoramaImageLoading) &&
            <SavingChangesHolder label='Сохранение изменений'/>
        }
            <div className={styles.editImages}>
                <EditWrap
                    editType='clip'
                    text='Изменить фото профиля'
                    showFileUpload={showPhotoUpload}
                > 
                    <aside className={styles.photo}>
                        {
                            userCurrentPhotoPreview && <img src={userCurrentPhotoPreview}/>
                        }
                        {
                            (userData && !userCurrentPhotoPreview && userData.image !== 'none') 
                                ? 
                            <img src={baseUrl + userData.image}/> 
                                : 
                            ''
                        }
                    </aside>
                </EditWrap>
                <EditWrap
                    editType='clip'
                    text='Изменить фон профиля'
                    showFileUpload={showBackgroundUpload}
                >
                    <aside className={styles.background}>
                        {
                            userCurrentBackgroundPreview && <img src={userCurrentBackgroundPreview}/>
                        }
                        {
                            (userData && !userCurrentBackgroundPreview && userData.panoramaImage !== 'none') 
                                ? 
                            <img src={baseUrl + userData.panoramaImage}/> 
                                : 
                            ''
                        }
                    </aside>
                </EditWrap>
            </div>
            <div className={styles.editData}>
                <EditWrap
                    editType='edit'
                    text='Изменение данных профиля'
                >
                    <div className={styles.inputs}>
                        <div className={!userCurrentSurnameError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                            {userCurrentSurnameError && <span className={styles.error}>Допустимая длина от 2 до 20 символов</span>}
                            <input 
                                className={styles.input}
                                type="text" 
                                onChange={e => setUserCurrentSurname(e.target.value)}
                                onBlur={validateSurname} 
                                value={userCurrentSurname} 
                                placeholder="Введите вашу фамилию"
                            />
                        </div>
                        <div className={!userCurrentNameError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                            {userCurrentNameError && <span className={styles.error}>Допустимая длина от 2 до 20 символов</span>}
                            <input 
                                className={styles.input}
                                type="text" 
                                onChange={e => setUserCurrentName(e.target.value)} 
                                onBlur={validateName} 
                                value={userCurrentName} 
                                placeholder="Введите ваше имя"
                            />
                        </div>
                        <div className={!userCurrentStatusError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                            {userCurrentStatusError && <span className={styles.error}>Допустимая длина от 1 до 200 символов</span>}
                            <input 
                                className={styles.input}
                                type="text" 
                                onChange={e => setUserCurrentStatus(e.target.value)} 
                                onBlur={validateStatus} 
                                value={userCurrentStatus} 
                                placeholder="Введите ваш статус"
                            />
                        </div>
                        <div className={!userCurrentCityError ? styles.inputBox : [styles.inputBox, styles.errored].join(' ')}>
                            {userCurrentCityError && <span className={styles.error}>Допустимая длина от 1 до 60 символов</span>}
                            <input 
                                className={styles.input}
                                type="text" 
                                onChange={e => setUserCurrentCity(e.target.value)} 
                                onBlur={validateCity} 
                                value={userCurrentCity} 
                                placeholder="Введите ваш город"
                            />
                        </div>
                    </div>
                </EditWrap>
                <EditWrap
                    editType='edit'
                    text='Изменение даты рождения'
                >
                    <div className={styles.selects}>
                        <select 
                            className={styles.days}
                            value={userCurrentDateBirth.day}
                            onChange={e => setUserCurrentDateBirth({...userCurrentDateBirth, day: e.target.value})}
                        >
                            {days.map(value => 
                                <option key={value}>{value}</option>
                            )}
                        </select>
                        <select 
                            className={styles.months}
                            value={userCurrentDateBirth.month}
                            onChange={e => setUserCurrentDateBirth({...userCurrentDateBirth, month: e.target.value})}
                        >
                            {months.map((value, index) => 
                                <option value={index + 1} key={value}>{value}</option>
                            )}
                        </select>
                        <select 
                            className={styles.years}
                            value={userCurrentDateBirth.year}
                            onChange={e => setUserCurrentDateBirth({...userCurrentDateBirth, year: e.target.value})}
                        >
                            {years.map(value => 
                                <option key={value}>{value}</option>
                            )}
                        </select>
                    </div>
                </EditWrap>
                <button 
                    className={styles.saveButton}
                    onClick={saveChanges}
                >Сохранить</button>
            </div>
        </>
    );
};

export default EditAccount;