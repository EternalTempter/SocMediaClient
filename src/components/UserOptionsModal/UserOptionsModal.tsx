import React, { useState } from 'react';
import { IUser } from '../../models';
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
    }

    function updateCityHandler() {
        if(city !== ''){
            changeCity({city: city, id: user.email});  
            refetch();
        }
    }

    return (
        <>
            <p className={styles.label}>Изменение даты рождения</p>
            <div className={styles.dateBirth}>
                <input 
                    type="number" 
                    placeholder='День' 
                    value={dateBirth.day} 
                    className={styles.dateBirthInput}
                    onChange={e => setDateBirth({...dateBirth, day: e.target.value})}
                />
                <input 
                    type="number" 
                    placeholder='Месяц' 
                    value={dateBirth.month}
                    className={styles.dateBirthInput} 
                    onChange={e => setDateBirth({...dateBirth, month: e.target.value})}
                />
                <input 
                    type="number" 
                    placeholder='Год' 
                    value={dateBirth.year} 
                    className={styles.dateBirthInput}
                    onChange={e => setDateBirth({...dateBirth, year: e.target.value})}
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