import React from 'react';
import styles from './ChangeLog.module.scss';

const ChangeLog = () => {
    return (
        <div className={styles.changelog}>
            <h2>Список последних обновлений</h2>
            <div className={styles.changelogLabelUnderline}></div>
            <ul>
                <li>Проведено гигантское количество фиксов по всему приложению</li>
                <li>Оптимизированы некоторые процессы</li>
                <li>Добавлен новый функционал</li>
                <li>Улучшенная отзывчивость приложения к различным разрешениям</li>
                <li>Хочу питсы</li>
            </ul>
        </div>
    );
};

export default ChangeLog;