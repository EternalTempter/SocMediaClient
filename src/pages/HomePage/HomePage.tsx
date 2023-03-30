import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ChangeLog from '../../components/AppNews/AppNews';
import Statistics from '../../components/Statistics/Statistics';
import styles from './HomePage.module.scss';

interface HomePageProps {
    setIsAuth: (state: boolean) => void
}

const HomePage:FC<HomePageProps> = ({setIsAuth}) => {
    const navigate = useNavigate();

    const [swiper, setSwiper] = useState<SwiperClass>();
    const [currentSlide, setCurrentSlide] = useState(0);

    const [sliderComponents, setSliderComponents] = useState([
        <Statistics/>,
        <ChangeLog/>
    ]);

    function setStatisticsSlideHandler(e) {  
        e.preventDefault();
        swiper?.slideTo(0) 
    }

    function setNewsSlideHandler(e) {
        e.preventDefault();
        swiper?.slideTo(1);
    }

    return (
        <div className={styles.homePageWrap}>
            <div className={styles.homePage}>
                <div className={styles.homePageBody}>   
                    <div className={styles.mobileNavigation}>
                        <a 
                            className={currentSlide === 0 ? styles.active : undefined} 
                            onClick={e => setStatisticsSlideHandler(e)}
                        >Статистика</a>
                        <a 
                            className={currentSlide === 1 ? styles.active : undefined} 
                            onClick={e => setNewsSlideHandler(e)}
                        >Новости</a>
                    </div>                
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className={styles.swiper}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        onSlideChange={() => setCurrentSlide(Number(swiper?.activeIndex))}
                    >
                        {sliderComponents.map((elem, index) => 
                            <SwiperSlide key={index}>{elem}</SwiperSlide>    
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default HomePage;