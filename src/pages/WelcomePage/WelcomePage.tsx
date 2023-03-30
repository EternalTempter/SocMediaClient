import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './WelcomePage.module.scss';

const WelcomePage = () => {
    // const [rootClasses, setRootClasses] = useState<string[]>([]);

    // function aminationCycle() {
    //     setRootClasses([...rootClasses, styles.appear]);
    //     setTimeout(() => {
    //         setRootClasses(rootClasses.filter(elem => elem !== styles.appear));
    //         setRootClasses([...rootClasses, styles.trans]);
    //         setTimeout(() => {
    //             setRootClasses(rootClasses.filter(elem => elem !== styles.trans));
    //             setRootClasses([...rootClasses, styles.disappear]);
    //             setTimeout(() => {
    //                 setRootClasses(rootClasses.filter(elem => elem !== styles.disappear));
    //             }, 2000);
    //         }, 6000);
    //     }, 2000);
    // }

    // useEffect(() => {
    //     aminationCycle();
    //     setInterval(() => {
    //         aminationCycle();
    //     }, 10000);
    // }, [])

    return (
        <div className={styles.welcomePageWrap}>
            <Header/>
            <div className={styles.slider}>
                <div className={[styles.animation, styles.slide].join(' ')}>
                   
                </div> 
            </div>
        </div>
    );
};

export default WelcomePage;