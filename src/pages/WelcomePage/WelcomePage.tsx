import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './WelcomePage.module.scss';
import Stats from '../../assets/svg/Stats';
import SearchNews from '../../assets/svg/SearchNews';
import SearchUsers from '../../assets/svg/SearchUsers';
import Angle from '../../assets/svg/Angle';
import Link from '../../assets/svg/Link';
import Search from '../../assets/svg/Search';
import Abstract from '../../assets/svg/Abstract';
import Logo from '../../assets/svg/Logo';
import { useNavigate } from 'react-router-dom';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const WelcomePage = () => {
    const navigate = useNavigate(); 
    
    SwiperCore.use([Autoplay])

    const [sliderComponents, setSliderComponents] = useState([
        <img src={require('../../assets/images/preview1.png')}/>,
        <img src={require('../../assets/images/preview2.png')}/>,
        <img src={require('../../assets/images/preview3.png')}/>,
        <img src={require('../../assets/images/preview4.png')}/>,
    ]);

    const [isScrollBlocked, setIsScrollBlocked] = useState(false);

    const [firstPreviewRootClasses, setFirstPreviewRootClasses] = useState<string[]>([styles.preview1, styles.hidden]);
    const [secondPreviewRootClasses, setSecondPreviewRootClasses] = useState<string[]>([styles.preview2, styles.hidden]);
    const [constractionRootClasses, setConstractionRootClasses] = useState<string[]>([styles.constraction, styles.hidden]);
    const [infographicRootClasses, setInfographicRootClasses] = useState<string[]>([styles.infographic, styles.hidden]);
    const [offerRootClasses, setOfferRootClasses] = useState<string[]>([styles.offerWrap, styles.hidden]);
    const [dontHaveAccountRootClasses, setDontHaveAccountRootClasses] = useState<string[]>([styles.dontHaveAccount, styles.hidden]);

    const [mobileMenuRootClasses, setMobileMenuRootClasses] = useState<string[]>([styles.mobileMenu, styles.hidden]);

    const firstPreview = useRef<HTMLDivElement>(null);
    const secondPreview = useRef<HTMLDivElement>(null);
    const constraction = useRef<HTMLDivElement>(null);
    const infographic = useRef<HTMLDivElement>(null);
    const offer = useRef<HTMLDivElement>(null);
    const dontHaveAccount = useRef<HTMLDivElement>(null);

    const [hiddenElements, setHiddenElements] = useState([firstPreview, secondPreview, constraction, infographic, offer, dontHaveAccount]);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(/preview1/.test(entry.target.classList.value)) {
                manageRootClasses(entry.isIntersecting, setFirstPreviewRootClasses, firstPreviewRootClasses);
            }
            else if(/preview2/.test(entry.target.classList.value)) {
                manageRootClasses(entry.isIntersecting, setSecondPreviewRootClasses, secondPreviewRootClasses);
            }
            else if(/constraction/.test(entry.target.classList.value)) {
                manageRootClasses(entry.isIntersecting, setConstractionRootClasses, constractionRootClasses);
            }
            else if(/infographic/.test(entry.target.classList.value)) {
                manageRootClasses(entry.isIntersecting, setInfographicRootClasses, infographicRootClasses);
            }
            else if(/offerWrap/.test(entry.target.classList.value)) {
                manageRootClasses(entry.isIntersecting, setOfferRootClasses, offerRootClasses);
            }
            else {
                manageRootClasses(entry.isIntersecting, setDontHaveAccountRootClasses, dontHaveAccountRootClasses);
            }
        })
    });

    function manageRootClasses(isIntersecting, setRootClasses, rootClasses) {
        if(isIntersecting) {
            setRootClasses([...rootClasses, styles.show])
        }
    }

    function openMobileMenuHandler() {
        if(!mobileMenuRootClasses.includes(styles.show)) {
            setMobileMenuRootClasses([...mobileMenuRootClasses, styles.show])
            setIsScrollBlocked(true);
        }
        else {
            setMobileMenuRootClasses(mobileMenuRootClasses.filter(item => item !== styles.show));
            setIsScrollBlocked(false);
        }
    }

    useEffect(() => {
        hiddenElements.forEach(el => observer.observe(el.current!))
    }, [])

    return (
        <div 
            className={styles.welcomePageWrap} 
            style={isScrollBlocked ? {overflow: 'hidden'} : undefined}
        >
            {/* <div className={styles.starField}>
                <div className={styles.star}></div>
            </div>
            <div className={styles.firefly}></div>
            <div className={styles.firefly}></div>
            <div className={styles.firefly}></div>
            <div className={styles.firefly}></div>
            <div className={styles.firefly}></div> */}
            <div className={mobileMenuRootClasses.join(' ')}>
                <div className={styles.mobileMenuHeader}>
                    <Logo className={styles.mobileLogoIcon}/>
                    <button onClick={() => openMobileMenuHandler()}>X</button>
                </div>
                <button onClick={() => navigate('/login')}>Войти</button>
                <button onClick={() => navigate('/registrate')}>Зарегистрироваться</button>
            </div>
            <Header openMobileMenuHandler={openMobileMenuHandler}/>
            <div className={styles.banner}>
                {/* <p>Здесь могла быть ваша реклама</p> */}
                <div className={styles.bannerItem}>
                    <Swiper
                        loop={true}
                        modules={[Autoplay]}
                        autoplay={{ delay: 4000 }}
                        speed={1000}
                    >
                        {sliderComponents.map((elem, index) => 
                            <SwiperSlide key={index}>
                                <div className={styles.imageWrap}>
                                    {elem}
                                </div>
                            </SwiperSlide>    
                        )}
                    </Swiper>
                </div>
            </div>
            <div className={styles.info}>
                <h2>Ellentair</h2>
                <p>Прогрессивная социальная сеть</p>
            </div>
            <div className={firstPreviewRootClasses.join(' ')} ref={firstPreview}>
                <div className={styles.previewImageWrap}>
                    <div className={styles.previewImage}>
                        <img src={require('../../assets/images/preview1.png')} />
                    </div>
                    <div className={styles.previewImageBigLine}></div>
                    <div className={styles.previewImageSmallLine}></div>
                </div>
                <div className={styles.previewInfo}>
                    <h3>Общайся с друзьями, делись впечатлениями! </h3>
                    <p>Социальная сеть Ellentair - это простой и удобный способ общаться с людьми. Держать связь друг с другом, даже если вас разделяют километры.</p>
                </div>
            </div>
            <div className={secondPreviewRootClasses.join(' ')} ref={secondPreview}>
                <div className={styles.previewImageWrap}>
                    <div className={styles.previewImage}>
                        <img src={require('../../assets/images/preview2.png')} />
                    </div>
                    <div className={styles.previewImageBigLine}></div>
                    <div className={styles.previewImageSmallLine}></div>
                </div>
                <div className={styles.previewInfo2}>
                    <h3>Создавай сообщества по интересам, веди тенденции</h3>
                    <p>Создание своего сообщества - это создание небольшого мира, где люди со всей планеты, обьединенные одним интересом наслаждаются публикациями.</p>
                </div>
            </div>
            <div className={constractionRootClasses.join(' ')} ref={constraction}>
                <h2>Рассказывай о себе, заполняя профиль и создавая посты</h2>
                <div>
                    <img src={require('../../assets/images/construction.png')} />
                </div>
            </div>
            <div className={infographicRootClasses.join(' ')} ref={infographic}>
                <div className={styles.stats}>
                    <div className={styles.statsView}>
                        <div>
                            <Stats className={styles.statsIcon}/>
                        </div>
                        <p>Следи за детальной статистикой своего профиля</p>
                        <div>
                            <Angle className={styles.angleIcon}/>
                        </div>
                    </div>
                    <div className={styles.statsImage}>
                        <img src={require('../../assets/images/mobileStats.png')} />
                    </div>
                </div>
                <div className={styles.news}>
                    <div className={styles.newsView}>
                        <div>
                            <SearchNews className={styles.searchNewsIcon}/>
                        </div>
                        <p>Будь в курсе новых изменений</p>
                        <div>
                            <Angle className={styles.angleIcon}/>
                        </div>
                    </div>
                    <div className={styles.newsImage}>
                        <img src={require('../../assets/images/mobileNews.png')} />
                    </div>
                </div>
                <div className={styles.friends}>
                    <div className={styles.friendsView}>
                        <div>
                            <SearchUsers className={styles.searchUsersIcon}/>
                        </div>
                        <p>Находи новые знакомства и интересы</p>
                        <div>
                            <Angle className={styles.angleIcon}/>
                        </div>
                    </div>
                    <div className={styles.friendsImage}>
                        <img src={require('../../assets/images/mobileFriends.png')} />
                    </div>
                </div>
            </div>
            <div className={offerRootClasses.join(' ')} ref={offer}>
                <div className={styles.offer}>
                    <div className={styles.offerInfo}>
                        <h3>Стань частью нового мира</h3>
                        <p>Мира, где людям удобно общаться на расстоянии, делиться своими эмоциями и открывать новые горизонты</p>
                        <div className={styles.offerInfographic}>
                            <div className={styles.offerInfographicItem}>
                                <div>
                                    <Link className={styles.linkIcon}/>
                                </div>
                                <div>
                                    <h4>Присоединяйся ко всем!</h4>
                                    <p>Пользователей в сети уже более 2 млн</p>
                                </div>
                            </div>
                            <div className={styles.offerInfographicItem}>
                                <div>
                                    <Search className={styles.searchIcon}/>
                                </div>
                                <div>
                                    <h4>Отвечай своим интересам</h4>
                                    <p>Здесь каждый сможет найти себе место</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.offerIcon}>
                        <Abstract className={styles.abstractIcon}/>
                    </div>
                </div>
            </div>
            <div className={dontHaveAccountRootClasses.join(' ')} ref={dontHaveAccount}>
                <div className={styles.joinUs}>
                    <h2>У вас все еще нет аккаунта?</h2>
                    <p>Регистрируйтесь скорее и получите доступ ко всем функциям социальной сети Ellentair</p>
                    <button onClick={() => navigate('/registrate')}>Зарегистрироваться</button>
                </div>
                <div className={styles.dontHaveAccountIcon}>
                    <img src={require('../../assets/images/stars.png')}  />
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.logo}>
                    <Logo className={styles.logoIcon}/>
                    <p>Ellentair</p>
                </div>
                <div className={styles.links}>
                    <a href="#">Дополнительная информация</a>
                    <a href="#">Служба поддержки</a>
                    <a href="#">Контакты</a>
                    <a href="#">Вакансии</a>
                    <a href="#">Политика конфиденциальности</a>    
                </div> 
                <p>Сopyright © 2023 Ellentair. All rights reserved.</p>
            </div>
        </div>
    );
};

export default WelcomePage;