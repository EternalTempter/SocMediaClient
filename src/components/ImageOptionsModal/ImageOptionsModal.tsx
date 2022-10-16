import React, { FC, useEffect, useState } from 'react';
import { IUser } from '../../models';
import styles from './ImageOptionsModal.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import { useUpdateImageMutation, useUpdatePanoramaImageMutation } from '../../store/socmedia/userData/userData.api';
import { baseUrl } from "../../envVariables/variables";
import { isValidFileUploaded } from '../../helpers/helpers';

interface ImageOptionsModalProps {
    type: string
    mainImage: string
    panoramaImage: string
    id: string
    currentUserId: string
    refetch: () => void
    setVisible: (value: boolean) => void
    groupAdminId?: string
    updateRegularImage: (obj: {}) => void
    updatePanoramaImage: (obj: {}) => void
}

const ImageOptionsModal:FC<ImageOptionsModalProps> = ({type, mainImage, panoramaImage, id, refetch, setVisible, currentUserId, groupAdminId, updateRegularImage, updatePanoramaImage}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [userCurrentFile, setUserCurrentFile] = useState();
    const [preview, setPreview] = useState('');

    const showFileUpload = e => {
        if(isValidFileUploaded(e.target.files[0])) setUserCurrentFile(e.target.files[0]);
    }

    function updateImage(key?: any) {
        if(userCurrentFile) {
            const formData = new FormData()
            formData.append('img', userCurrentFile ? userCurrentFile : 'none');
            formData.append('id', id);
            if(type === 'regularImage')
                updateRegularImage(formData);
            else
                updatePanoramaImage(formData);

            setVisible(false);
        }
        else notify();       
    }

    function notify() {
        toast.warn('Сначала загрузите фото', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    useEffect(() => {
        if(userCurrentFile) {
            var src = URL.createObjectURL(userCurrentFile);
            setPreview(src);
        }
    }, [userCurrentFile])

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
            <div className={(currentUserId === user.email || groupAdminId === user.email) ? styles.imageHolder : [styles.imageHolder, styles.fullsized].join(' ')}>
                {
                    preview && <img src={preview}/>
                }
                {
                    (!preview && type === 'regularImage' && mainImage !== 'none') ? <img src={baseUrl + mainImage}/> : ''
                }
                {
                    (!preview && type === 'panoramaImage' && panoramaImage !== 'none') ? <img src={baseUrl + panoramaImage}/> : ''
                }
            </div>
            {
                (id === user.email || groupAdminId === user.email) &&
                <div className={styles.imageOptions}>
                    <div className={styles.addImage} onClick={showFileUpload}>
                        <p>Заменить фото</p>
                        <input 
                            type="file" 
                            onChange={showFileUpload}
                            accept=".png, .jpg, .jpeg"
                        />
                    </div>
                    <button onClick={updateImage}>Сохранить</button>
                </div>
            }
        </>
    );
};

export default ImageOptionsModal;