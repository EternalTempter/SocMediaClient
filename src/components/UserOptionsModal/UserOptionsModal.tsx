import React, { useState } from 'react';
import { IUser } from '../../models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useChangeUserCityMutation, useChangeUserDateBirthMutation } from '../../store/socmedia/userData/userData.api';
import styles from './UserOptionsModal.module.scss';
import jwt_decode from 'jwt-decode';

interface UserOptionsModalProps {
    refetch: () => void
}

const UserOptionsModal = ({refetch}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [city, setCity] = useState('');
    const [dateBirth, setDateBirth] = useState({day: '', month: '', year: ''});

    const [changeCity, {isError: isCityError, isLoading: isCityLoading, data: cityData}] = useChangeUserCityMutation();
    const [changeDateBirth, {isError: isDateBirthError, isLoading: isDateBirthLoading, data: dateBirthData}] = useChangeUserDateBirthMutation();
    
    function updateDateBirthHandler() {
        if(dateBirth.day !== '' && dateBirth.month !== '' && dateBirth.year !== '') {
            changeDateBirth({date_birth: [dateBirth.day, dateBirth.month, dateBirth.year].join('.'), id: user.email});
            refetch();
        } 
        else notify('Правильно заполните дату рождения!');   
    }

    function updateCityHandler() {
        if(city !== ''){
            changeCity({city: city, id: user.email});  
            refetch();
        }
        else notify('Правильно заполните город проживания!');  
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

    function handleDateBirthDayChange(e: any, minValue: number, maxValue: number) {
        if(e.target.value > maxValue && e.target.value !== '') setDateBirth({...dateBirth, day: String(maxValue)})
        else if(e.target.value < minValue && e.target.value !== '') setDateBirth({...dateBirth, day: String(minValue)})
        else setDateBirth({...dateBirth, day: e.target.value})
    }

    function handleDateBirthMonthChange(e: any, minValue: number, maxValue: number) {
        if(e.target.value > maxValue && e.target.value !== '') setDateBirth({...dateBirth, month: String(maxValue)})
        else if(e.target.value < minValue && e.target.value !== '') setDateBirth({...dateBirth, month: String(minValue)})
        else setDateBirth({...dateBirth, month: e.target.value})
    }

    function handleDateBirthYearChange(e: any, minValue: number, maxValue: number) {
        if(e.target.value > maxValue && e.target.value !== '') setDateBirth({...dateBirth, year: String(maxValue)})
        else if(e.target.value < minValue && e.target.value !== '') setDateBirth({...dateBirth, year: String(minValue)})
        else setDateBirth({...dateBirth, year: e.target.value})
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
            <p className={styles.label}>Изменение даты рождения</p>
            <div className={styles.dateBirth}>
                <input 
                    type="number" 
                    placeholder='День' 
                    value={dateBirth.day} 
                    className={styles.dateBirthInput}
                    onChange={e => handleDateBirthDayChange(e, 1, 31)}
                />
                <input 
                    type="number" 
                    placeholder='Месяц' 
                    value={dateBirth.month}
                    className={styles.dateBirthInput} 
                    onChange={e => handleDateBirthMonthChange(e, 1, 12)}
                />
                <input 
                    type="number" 
                    placeholder='Год' 
                    value={dateBirth.year} 
                    className={styles.dateBirthInput}
                    onChange={e => handleDateBirthYearChange(e, 1, 2016)}
                />  
            </div>
            <button className={styles.button} onClick={updateDateBirthHandler}>Сохранить дату</button>
            <p className={styles.label}>Изменение города</p>
            <input 
                type="text" 
                placeholder='Ваш город' 
                value={city} 
                className={styles.cityInput}
                onChange={e => setCity(e.target.value)}
            />
            <button className={styles.button} onClick={updateCityHandler}>Сохранить город</button>
        </>
    );
};

export default UserOptionsModal;