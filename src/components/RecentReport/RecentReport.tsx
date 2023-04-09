import React, { FC, useEffect } from 'react';
import styles from './RecentReport.module.scss';
import { useLazyGetByIdQuery, useLazyGetUserByEmailQuery, useGetUserByEmailQuery } from '../../store/socmedia/users/users.api';
import { useLazyGetCommentByIdQuery, useLazyGetPostByIdQuery } from '../../store/socmedia/posts/posts.api';
import { getFormattedDateAndTimeForPost } from '../../helpers/helpers';

type Report = {
    createdAt: Date
    id: Number
    report_type: String
    reported_id: String
    reported_type: String
    updatedAt: Date
    user_id: String
}

interface RecentReportProps{
    report: Report
    isActive: boolean
}

const RecentReport:FC<RecentReportProps> = ({report, isActive}) => {
    const [getUser, {data: userData}] = useLazyGetByIdQuery();
    const {data: userSenderData} = useGetUserByEmailQuery(String(report.user_id));
    const [getUserByEmail, {data: userDataByEmail}] = useLazyGetUserByEmailQuery();
    const [getComment, {data: commentData}] = useLazyGetCommentByIdQuery();
    const [getPost, {data: postData}] = useLazyGetPostByIdQuery();

    useEffect(() => {
        if (report) {
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
        if(commentData) getUserByEmail(String(commentData[0].user_id));
    }, [commentData])

    useEffect(() => {
        if(postData) getUserByEmail(String(postData[0].post_handler_id));
    }, [postData])

    return (
        <div className={
            isActive 
                ? 
            [styles.recentReport, styles.active].join(' ') 
                : 
            styles.recentReport
        }>
            <p>Жалоба на 
                {report.reported_type === 'POST' && ' пост '}
                {report.reported_type === 'COMMENT' && ' комментарий '}
                {report.reported_type === 'ACCOUNT' && ' аккаунт '}
                пользователя
                {userData && report.reported_type === 'ACCOUNT' &&
                    ` "${userData.name} ${userData.surname}" `
                }
                {userDataByEmail && (report.reported_type === 'COMMENT' || report.reported_type === 'POST') &&
                    ` "${userDataByEmail.name} ${userDataByEmail.surname}" `
                }
                от пользователя
                {userSenderData && ` "${userSenderData.name} ${userSenderData.surname}" `} 
            </p>
            <p>{getFormattedDateAndTimeForPost(report.createdAt)}</p>
        </div>
    );
};

export default RecentReport;