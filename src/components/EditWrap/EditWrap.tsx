import React, { FC } from 'react';
import Clip from '../../assets/svg/Clip';
import Edit from '../../assets/svg/Edit';
import styles from './EditWrap.module.scss';

interface EditWrapProps {
    editType: string
    text: string
    showFileUpload?: (e:any) => void
    children: React.ReactNode
}   

const EditWrap:FC<EditWrapProps> = ({editType, text, children, showFileUpload}) => {
    return (
        <div className=
            {
                editType === "clip" 
                    ? 
                styles.editWrap 
                    : 
                [styles.editWrap, styles.shortened].join(' ')
            }
        >
            {editType === "clip" &&
                <input 
                    className={styles.inputFile}
                    type="file" 
                    onChange={showFileUpload}
                    accept=".png, .jpg, .jpeg"
                />
            }
            <div className={styles.editHeader}>
                <p>{text}</p>
                {
                    editType === "clip" 
                        ? 
                    <Clip className={styles.clipIcon}/>
                        :
                    <Edit className={styles.editIcon}/>  
                }
            </div>
            <div className={styles.editContent}>
                {children}
            </div>
        </div>
    );
};

export default EditWrap;