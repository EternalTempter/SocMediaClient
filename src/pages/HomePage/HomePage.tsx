import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ChangeLog from '../../components/ChangeLog/ChangeLog';
import Statistics from '../../components/Statistics/Statistics';
import WelcomeWindow from '../../components/WelcomeWindow/WelcomeWindow';
import styles from './HomePage.module.scss';

interface HomePageProps {
    setIsAuth: (state: boolean) => void
}

const HomePage:FC<HomePageProps> = ({setIsAuth}) => {
    const navigate = useNavigate();

    const [currentSliderComponent, setCurrentSliderComponent] = useState(1);
    const [sliderComponents, setSliderComponents] = useState([
        <WelcomeWindow/>,
        <div className={styles.homePageContentNews}>
            <Statistics/>
            <ChangeLog/>
        </div>
    ]);

    function logoutHandler() {
        setIsAuth(false);
        localStorage.removeItem('token');
        navigate('/auth');
    }
    return (
        <div className={styles.homePageWrap}>
            <div className={styles.homePage}>
                <div className={styles.homePageHeader}>
                    <div>
                        <p>Добро пожаловать в soc media</p>
                    </div>
                    <button onClick={logoutHandler}>Выйти</button>
                </div>
                <div className={styles.homePageBody}>                   
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className={styles.swiper}
                    >
                        {sliderComponents.map(elem => 
                            <SwiperSlide>{elem}</SwiperSlide>    
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default HomePage;