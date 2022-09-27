import React, { FC } from 'react';
import Clip from '../../assets/svg/Clip';
import Send from '../../assets/svg/Send';
import styles from './AddPostPanel.module.scss';

interface AddPostPanelProps {
    currentPostDescription: string
    setCurrentPostDescription: (value: string) => void
    showFileUpload: (e: any) => void
    createPost: (type: string) => void
    type: string
}

const AddPostPanel:FC<AddPostPanelProps> = ({currentPostDescription, setCurrentPostDescription, showFileUpload, createPost, type}) => {
    return (
        <div className={type === 'extended' ? styles.addPostWrapExtended : styles.addPostWrap}>
            <div className={type === 'extended' ? styles.extended : styles.regular}>
                <input 
                    type="text" 
                    placeholder='Расскажите что у вас нового'
                    value={currentPostDescription}
                    onChange={e => setCurrentPostDescription(e.target.value)}
                />
                <div>
                    <div onClick={showFileUpload}>
                        <input type="file" className={styles.fileUploadInput} onChange={showFileUpload}/>
                        <Clip className={styles.addPostClip}/>
                    </div>
                    <div onClick={() => createPost('click')}>
                        <Send className={styles.addPostSend}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPostPanel;