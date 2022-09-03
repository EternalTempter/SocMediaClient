import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
    setIsAuth: (state: boolean) => void
}

const HomePage:FC<HomePageProps> = ({setIsAuth}) => {
    const navigate = useNavigate();

    function logoutHandler() {
        setIsAuth(false);
        localStorage.removeItem('token');
        navigate('/auth');
    }
    return (
        <div>
            Главная страница
            <button onClick={logoutHandler}>Выйти</button>
        </div>
    );
};

export default HomePage;