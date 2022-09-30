import React, { FC, useEffect, useState } from 'react';
import { IUser } from '../../models';
import styles from './ImageOptionsModal.module.scss';
import jwt_decode from 'jwt-decode';
import { useUpdateImageMutation, useUpdatePanoramaImageMutation } from '../../store/socmedia/userData/userData.api';
import { baseUrl } from "../../envVariables/variables";

interface ImageOptionsModalProps {
    type: string
    mainImage: string
    panoramaImage: string
    id: string
    refetch: () => void
    setVisible: (value: boolean) => void
}

const ImageOptionsModal:FC<ImageOptionsModalProps> = ({type, mainImage, panoramaImage, id, refetch, setVisible}) => {
    const user : IUser = jwt_decode(localStorage.getItem('token') || '');
    const [userCurrentFile, setUserCurrentFile] = useState();
    const [preview, setPreview] = useState('');

    const [updateUserImage, {isLoading, isError, data}] = useUpdateImageMutation();
    const [updatePanoramaImage, {isLoading: isPanoramaImageLoading, isError: isPanoramaImageError, data: panoramaImageData}] = useUpdatePanoramaImageMutation();

    const showFileUpload = e => {
        setUserCurrentFile(e.target.files[0]);
    }

    function updateImage(key?: any) {
        if(userCurrentFile !== null) {
            const formData = new FormData()
            formData.append('img', userCurrentFile ? userCurrentFile : 'none');
            formData.append('id', user.email);
            if(type === 'regularImage')
                updateUserImage(formData);
            else
                updatePanoramaImage(formData);
        }
        setVisible(false);
        setTimeout(() => refetch(), 500);
    }

    useEffect(() => {
        if(userCurrentFile) {
            var src = URL.createObjectURL(userCurrentFile);
            setPreview(src);
        }
    }, [userCurrentFile])

    return (
        <>
            <div className={styles.imageHolder}>
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
                (id === user.email) &&
                <div className={styles.imageOptions}>
                    <div className={styles.addImage} onClick={showFileUpload}>
                        <p>Заменить фото</p>
                        <input type="file" onChange={showFileUpload}/>
                    </div>
                    <button onClick={updateImage}>Сохранить</button>
                </div>
            }
        </>
    );
};

export default ImageOptionsModal;