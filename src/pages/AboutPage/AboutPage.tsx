import React from 'react';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
    return (
        <div className={styles.aboutPageWrap}>
            <div className={styles.aboutPage}>
                <div className={styles.about}>
                    <h3>О проекте</h3>
                    <p>Проект был разработан <a target="_blank" href="https://vk.com/verpess">Сигитовым Даниилом</a>, и продолжает разрабатываться как
                        пет-проект по завершению обучения технологий разработки. За помощь в совместной
                        разработке дизайна отдельное спасибо: Galzarus.</p>
                </div>
                <div className={styles.copyright}>
                    <p>© All rights reserved</p>
                    <p>© Все права защищены</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;