import React, { FC } from 'react';
import { baseUrl } from '../../envVariables/variables';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import styles from './GroupSubscriber.module.scss';

interface GroupSubscriberProps {
    user_id: string
}

const GroupSubscriber:FC<GroupSubscriberProps> = ({user_id}) => {
    const {isError, isLoading, data} = useGetUserDataQuery(user_id)
    return (
        <div className={styles.subPhoto}>
            {(data && data.image !== 'none') &&
                <img src={baseUrl + data.image}/>
            }
        </div>
    );
};

export default GroupSubscriber;