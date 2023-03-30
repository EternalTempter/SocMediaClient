import React from 'react';
import { baseUrl } from '../../envVariables/variables';
import { getFormattedDateAndTimeForPost } from '../../helpers/helpers';
import { useGetAllQuery } from '../../store/socmedia/news/news.api';
import styles from './AppNews.module.scss';

const AppNews = () => {
    const {isLoading, data} = useGetAllQuery('');
    return (
        <div className={styles.newsWrap}>
            <p className={styles.label}>Может быть интересно</p> 
            <div className={styles.news}>
                {data && data.map(elem =>                     
                    <div 
                        className={styles.newsItem} 
                        key={elem.id}
                    >
                        <div className={styles.newsImage}>
                            <img src={baseUrl + elem.image}/>
                        </div>
                        <div className={styles.newsInfo}>
                            <h2>{elem.label}</h2>
                            <p className={styles.info}>{elem.description}</p>
                            <p className={styles.timeSpent}>{elem.time_spent}</p>
                            <p className={styles.publicationDate}>Дата публикации: {getFormattedDateAndTimeForPost(elem.createdAt)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppNews;