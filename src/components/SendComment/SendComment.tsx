import React, { FC } from 'react';
import Clip from '../../assets/svg/Clip';
import Send from '../../assets/svg/Send';
import Smile from '../../assets/svg/Smile';
import { baseUrl } from '../../envVariables/variables';
import { IUser } from '../../models';
import { useGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import jwt_decode from 'jwt-decode';
import styles from './SendComment.module.scss';

interface SendCommentProps {
    currentComment: string
    setCurrentComment: (value: string) => void
    pasteCommentHandler: () => void
}

const SendComment:FC<SendCommentProps> = ({currentComment, setCurrentComment, pasteCommentHandler}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const {isError: isUserDataError, isLoading: isUserDataLoading, data: userData} = useGetUserDataQuery(user.email);
    return (
        <div className={styles.addComment}>
            <div className={styles.addCommentUserImage}>
            {
                (userData && userData.image !== 'none') &&
                    <img src={baseUrl + userData.image}/>
            }
            </div>
            <div className={styles.addCommentHolder}>
                <input 
                    type="text" 
                    placeholder='Напишите комментарий...'
                    value={currentComment}
                    onChange={e => setCurrentComment(e.target.value)}
                />
                <div className={styles.addCommentHolderIcons}>
                    <Clip className={styles.addCommentClip}/>
                    <Smile className={styles.addCommentSmile}/>
                </div>
            </div>
            <div className={styles.sendComment} onClick={() => pasteCommentHandler()}>
                <Send className={styles.sendCommentIcon}/>
            </div>
        </div>
    );
};

export default SendComment;