import React, { useEffect, useState } from 'react';
import styles from './AdminPanelManageReports.module.scss'
import { ToastContainer } from 'react-toastify';
import { useGetAllQuery } from '../../store/socmedia/reports/reports.api';
import SkeletonLoader from '../UI/SkeletonLoader/SkeletonLoader';
import RecentReport from '../RecentReport/RecentReport';
import ChosenReport from '../ChosenReport/ChosenReport';

type Report = {
    createdAt: Date
    id: Number
    report_type: String
    reported_id: String
    reported_type: String
    updatedAt: Date
    user_id: String
}

const AdminPanelManageReports = () => {
    const {isLoading: isReportsLoading, data: reportsData, refetch: refetchReports} = useGetAllQuery('');

    const [currentReport, setCurrentReport] = useState<Report>({createdAt: new Date(), id: 0, report_type: '', reported_id: '', reported_type: '', updatedAt: new Date(), user_id: ''});

    function chooseCurrentReportHandler(report: Report) {
        setCurrentReport(report)
    }   

    function removeChosenReport() {
        setCurrentReport({createdAt: new Date(), id: 0, report_type: '', reported_id: '', reported_type: '', updatedAt: new Date(), user_id: ''});
    }

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
            <div>
                <p className={styles.label}>Просмотр жалоб</p>
                <div className={styles.reportsWrap}>
                    {isReportsLoading &&
                        <div className={[styles.recentReports, styles.skeleton].join(' ')}>
                            <SkeletonLoader borderRadius={5}/>
                        </div>
                    }
                    {!isReportsLoading &&
                        <div className={styles.recentReports}>
                            {!isReportsLoading && reportsData &&    
                                <>
                                    <p className={styles.recentReportsLabel}>Недавние жалобы</p>
                                    {reportsData.map(report => 
                                        <div
                                            onClick={() => chooseCurrentReportHandler(report)}
                                            key={report.id}
                                            className={styles.recentRep} 
                                        >
                                            <RecentReport 
                                                isActive={currentReport ? currentReport.id === report.id : false}
                                                report={report}
                                            />
                                        </div>
                                    )}
                                </>                    
                            }
                        </div>
                    }
                    
                    {currentReport &&
                        <ChosenReport
                            refetchReports={() => refetchReports()}
                            report={currentReport}
                            removeChosenReport={removeChosenReport}
                        />
                    }
                </div>
            </div>
        </>
    );
};

export default AdminPanelManageReports;