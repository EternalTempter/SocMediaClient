import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Angle from '../../assets/svg/Angle';
import Like from '../../assets/svg/Like';
import More from '../../assets/svg/More';
import Share from '../../assets/svg/Share';
import { useGetGroupByIdQuery } from '../../store/socmedia/groups/groups.api';
import styles from './GroupPage.module.scss';

const GroupPage = () => {
    const {id} = useParams();
    const {isError, isLoading, data} = useGetGroupByIdQuery(String(id));

    useEffect(() => {
        if(data) {
            console.log(data);
        }
    }, [data])

    return (
        <div className={styles.groupPageWrap}>
            <div className={styles.groupWrap}>
                <div className={styles.groupImageHolder}>
                    <div>
                        <img src={data && data.image}/>
                    </div>
                </div>
                <div className={styles.groupHeader}></div>
                <div className={styles.groupBody}>
                    <div className={styles.groupBodyLeftSide}>
                        <p className={styles.groupName}>{data && data.group_name}</p>
                        <p className={styles.groupUsersAmount}>1056703 участника</p>
                        <div className={styles.groupUsers}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div>+245</div>
                        </div>
                    </div>
                    <div className={styles.groupBodyRightSide}>
                        <div className={styles.groupButtons}>
                            <div className={styles.groupMobileViewButtons}>
                                <Like className={styles.subscribeMobileViewButtonHeart}/>
                                <More className={styles.moreMobileViewButtonHeart}/>
                            </div>
                            <div className={styles.subscribeButton}>
                                <p>Подписаться</p>
                                <div>
                                    <Like className={styles.subscribeButtonHeart}/>
                                </div>
                            </div>
                            <div>
                                <Share className={styles.shareButton}/>
                            </div>
                        </div>
                        <div className={styles.groupDescription}>
                            <p>{data && data.description}</p>
                        </div>
                    </div>
                </div>  
                <div className={styles.moreButton}>
                    <Angle className={styles.moreButtonAngle}/>
                </div> 
            </div>
        </div>
    );
};

export default GroupPage;