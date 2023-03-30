import React, {FC} from 'react';
import styles from './ImageModal.module.scss';
import { baseUrl } from "../../envVariables/variables";
import BackArrow from '../../assets/svg/BackArrow';

interface ImageModalProps {
    type: string
    mainImage: string
    panoramaImage: string
    visible: boolean
    setVisible: (value: boolean) => void
}

const ImageModal:FC<ImageModalProps> = ({type, mainImage, panoramaImage, visible, setVisible}) => {

    return (
        <div className={[styles.imageHolder, styles.fullsized].join(' ')}>
            <div 
                className={styles.closeImageButton} 
                onClick={() => setVisible(false)}
            >
                <BackArrow className={styles.closeImageIcon}/>
            </div>
            {
                (type === 'regularImage') && <img src={baseUrl + mainImage}/>
            }
            {
                (type === 'panoramaImage') && <img src={baseUrl + panoramaImage}/>
            }
        </div>
    );
};

export default ImageModal;