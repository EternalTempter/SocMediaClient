import React, { FC, useEffect, useState } from 'react';
import styles from './ChooseReport.module.scss';
import jwt_decode from 'jwt-decode';
import { notifyAlert, notifyError, notifySuccess } from '../../helpers/helpers';
import { useCreateMutation } from '../../store/socmedia/reports/reports.api';
import { ToastContainer } from 'react-toastify';
import SavingChangesHolder from '../UI/SavingChangesHolder/SavingChangesHolder';
import { IUser } from '../../models';

interface ChooseReportProps {
    setVisible: (value: boolean) => void
    reported_type: string
    reported_id: number
}

const ChooseReport:FC<ChooseReportProps> = ({setVisible, reported_type, reported_id}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [value, setValue] = useState('');
    const [sendReport, {isError: isSendReportError, isLoading: isSendReportLoading, data: sendReportData}] = useCreateMutation();

    function sendReportHandler() {
        if(value === '') notifyAlert('Сначала выберите тип жалобы');
        else sendReport({user_id: user.email, report_type: value, reported_type: reported_type, reported_id: reported_id});
    }

    useEffect(() => {
        if(isSendReportError) notifyError('При отправке жалобы произошла ошибка');
    }, [isSendReportError])

    useEffect(() => {
        if(sendReportData) {
            notifySuccess('Ваша жалоба успешно отправлена');
            setVisible(false);
        } 
    }, [sendReportData])

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
            {isSendReportLoading && 
                <SavingChangesHolder label="Жалоба отправляется"/>
            }
            <div 
                className={styles.chooseReportWrap} 
                onClick={() => setVisible(false)}
            >
                <div 
                    className={styles.chooseReport}
                    onClick={e => e.stopPropagation()}
                >
                    <p>Почему вы хотите пожаловаться?</p>
                    <div 
                        onClick={() => setValue('scam')}
                        className={value === 'scam' ? styles.active : undefined}
                    >
                        Обман
                    </div>
                    <div 
                        onClick={() => setValue('spam')}
                        className={value === 'spam' ? styles.active : undefined}
                    >
                        Спам
                    </div>
                    <div 
                        onClick={() => setValue('prohibitedGoods')}
                        className={value === 'prohibitedGoods' ? styles.active : undefined}
                    >
                        Запрещенные товары
                    </div>
                    <div 
                        onClick={() => setValue('fuelingConflict')}
                        className={value === 'fuelingConflict' ? styles.active : undefined}
                    >
                        Разжигание конфликта
                    </div>
                    <button 
                        className={styles.sendReport}
                        onClick={sendReportHandler}
                    >
                        Пожаловаться
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChooseReport;