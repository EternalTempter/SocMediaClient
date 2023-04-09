import React, { FC, useEffect } from 'react';
import styles from './ChosenReport.module.scss';
import { useDeleteUserByEmailMutation, useLazyGetByIdQuery } from '../../store/socmedia/users/users.api';
import { useDeleteCommentMutation, useDeletePostMutation, useLazyGetCommentByIdQuery, useLazyGetPostByIdQuery } from '../../store/socmedia/posts/posts.api';
import Post from '../Post/Post';
import { baseUrl } from '../../envVariables/variables';
import CommentHolder from '../CommentHolder/CommentHolder';
import { useLazyGetUserDataQuery } from '../../store/socmedia/userData/userData.api';
import { useDeleteByIdMutation } from '../../store/socmedia/reports/reports.api';
import { notifyError, notifySuccess } from '../../helpers/helpers';
import { ToastContainer } from 'react-toastify';
import SavingChangesHolder from '../UI/SavingChangesHolder/SavingChangesHolder';

type Report = {
    createdAt: Date
    id: Number
    report_type: String
    reported_id: String
    reported_type: String
    updatedAt: Date
    user_id: String
}

interface ChosenReportProps {
    report: Report
    refetchReports: () => void
    removeChosenReport: () => void
}

const ChosenReport:FC<ChosenReportProps> = ({report, refetchReports, removeChosenReport}) => {
    const [getUser, {data: userData}] = useLazyGetByIdQuery();
    const [getComment, {data: commentData}] = useLazyGetCommentByIdQuery();
    const [getPost, {data: postData}] = useLazyGetPostByIdQuery();
    const [getUserData, {data}] = useLazyGetUserDataQuery();

    const [deleteReport, {isError: isDeleteReportError, isLoading: isDeleteReportLoading, data: deleteReportData}] = useDeleteByIdMutation(); 
    const [deletPost, {isLoading: isDeletePostLoading, isError: isDeletePostError, data: deletePostData}] = useDeletePostMutation();
    const [deleteComment, {isLoading: isDeleteCommentLoading, isError: isDeleteCommentError, data: deleteCommentData}] = useDeleteCommentMutation();
    const [deleteUser, {isLoading: isDeleteUserLoading, isError: isDeleteUserError, data: deleteUserData}] = useDeleteUserByEmailMutation();

    function declineReportHandler() {
        deleteReport({id: report.id});
        removeChosenReport();
    }

    function deleteContentHandler() {
        if(report.reported_type === "ACCOUNT") {
            if(userData) deleteUser({email: userData.email});
        }
        else if(report.reported_type === "POST") {
            deletPost({id: String(report.reported_id)})
        }
        else {
            deleteComment({id: String(report.reported_id)});
        } 
        deleteReport({id: report.id});
        removeChosenReport();
    }

    function banHandler() {
        deleteReport({id: report.id});
        notifySuccess('Пользователь заблокирован')
    }

    useEffect(() => {
        if(isDeleteReportError) notifyError('При отклонении жалобы произошла ошибка');
    }, [isDeleteReportError])

    useEffect(() => {
        if(deleteReportData) {
            notifySuccess('Жалоба успешно отклонена');
            refetchReports();
        } 
    }, [deleteReportData])

    useEffect(() => {
        if(isDeletePostError) notifyError('При удалении поста произошла ошибка');
    }, [isDeletePostError])

    useEffect(() => {
        if(deletePostData) {
            notifySuccess('Пост успешно удален');
            refetchReports();
        } 
    }, [deletePostData])

    useEffect(() => {
        if(isDeleteCommentError) notifyError('При удалении комментария произошла ошибка');
    }, [isDeleteCommentError])

    useEffect(() => {
        if(deleteCommentData) {
            notifySuccess('Комментарий успешно удален');
            refetchReports();
        }
    }, [deleteCommentData])

    useEffect(() => {
        if(isDeleteUserError) notifyError('При удалении пользователя произошла ошибка');
    }, [isDeleteUserError])

    useEffect(() => {
        if(deleteUserData) {
            notifySuccess('Пользователь успешно удален');
            refetchReports();        
        }
    }, [deleteUserData])

    useEffect(() => {
        if(report) {
            if(report.reported_type === "ACCOUNT") {
                getUser(String(report.reported_id));
            }
            else if(report.reported_type === "POST") {
                getPost({id: String(report.reported_id)});
            }
            else {
                getComment({id: String(report.reported_id)});
            } 
        }
    }, [report])

    useEffect(() => {
        if(userData) {
            getUserData(userData.email);
        }
    }, [userData])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className={styles.toast}
            />
            {isDeleteReportLoading &&
                <SavingChangesHolder label='Отклонение жалобы'/>
            }
            {isDeletePostLoading &&
                <SavingChangesHolder label='Удаление поста'/>
            }
            {isDeleteCommentLoading &&
                <SavingChangesHolder label='Удаление комментария'/>
            }
            {isDeleteUserLoading &&
                <SavingChangesHolder label='Удаление пользователя'/>
            }
            <div className={styles.currentReportWrap}>
                <p className={styles.recentReportsLabel}>Выбранная жалоба</p>
                <div className={styles.currentReport}>
                    <div className={styles.chosenReportWrap}>
                        {postData && report.reported_type === "POST" &&
                            <div className={styles.chosenReport}>
                                <p>Описание поста: {postData[0].description}</p>
                                <img src={baseUrl + postData[0].image}/>
                            </div>
                        }
                        {commentData && report.reported_type === "COMMENT" &&
                            <div className={styles.chosenCommentReport}>
                                <CommentHolder 
                                    comment={commentData[0]} 
                                    type='REGULAR_COMMENT'
                                />
                            </div>
                        }
                        {userData && data && report.reported_type === "ACCOUNT" &&
                            <div className={styles.chosenAccountReport}>
                                <p>Имя Фамилия: {userData.name} {userData.surname}</p>
                                <p>Статус: {data.status}</p>
                                <p>Город: {data.city}</p>
                                <div className={styles.chosenAccountReportImages}>
                                    <div className={styles.chosenAccountReportImage}>
                                        <img src={baseUrl + data.image}/>
                                    </div>
                                    <div className={styles.chosenAccountReportPanoramaImage}>
                                        <img src={baseUrl + data.panoramaImage}/>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.reportOptions}>
                    <button onClick={declineReportHandler}>Отклонить жалобу</button>
                    <button onClick={deleteContentHandler}>
                        Удалить 
                        {report.reported_type === "COMMENT" && ' коммент'}
                        {report.reported_type === "ACCOUNT" && ' пользователя'}
                        {report.reported_type === "POST" && ' пост'}
                    </button>
                    <select onClick={banHandler}>
                        <option value="banRepretraitor">Заблокировать нарушителя</option>
                        <option value="banReporter">Заблокировать отправителя</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default ChosenReport;