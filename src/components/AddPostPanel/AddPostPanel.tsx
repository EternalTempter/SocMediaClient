import React, { FC } from 'react';
import Clip from '../../assets/svg/Clip';
import Plus from '../../assets/svg/Plus';
import Send from '../../assets/svg/Send';
import styles from './AddPostPanel.module.scss';

interface AddPostPanelProps {
    currentPostDescription: string
    handlePostDescriptionChange: (value: any) => void
    showFileUpload: (e: any) => void
    createPost: (type: string) => void
    postImagePreview: string
    type: string
    setPostImagePreview: (value: string) => void
    setUserCurrentFile: (value: any) => void
    isPostDescriptionError: boolean
}

const AddPostPanel:FC<AddPostPanelProps> = ({
    currentPostDescription, 
    handlePostDescriptionChange, 
    showFileUpload, 
    createPost, 
    type, 
    postImagePreview, 
    setPostImagePreview, 
    setUserCurrentFile, 
    isPostDescriptionError,
}) => {
    function clearPreview() {
        setPostImagePreview('');
        setUserCurrentFile('');
    }

    return (
        <div className={type === 'extended' ? styles.addPostWrapExtended : styles.addPostWrap}>
            <div className={type === 'extended' ? styles.extended : styles.regular}>
                <input 
                    type="text" 
                    placeholder='Расскажите что у вас нового'
                    value={currentPostDescription}
                    onChange={e => handlePostDescriptionChange(e)}
                    className={isPostDescriptionError ? styles.error : undefined}
                />
                <div>
                    <div onClick={showFileUpload}>
                        <input 
                            type="file" 
                            className={styles.fileUploadInput} 
                            onChange={showFileUpload}
                            accept=".png, .jpg, .jpeg"
                        />
                        <Clip className={styles.addPostClip}/>
                    </div>
                    <div onClick={() => createPost('click')}>
                        <Send className={styles.addPostSend}/>
                    </div>
                    {postImagePreview && postImagePreview !== '' &&
                        <div>
                            <img src={postImagePreview}/>
                        </div>
                    }
                </div>
            </div>
            {postImagePreview && postImagePreview !== '' &&
                <div className={styles.imagePreview}>
                    <img src={postImagePreview}/>
                    <div className={styles.closePreview} onClick={clearPreview}>
                        <Plus className={styles.close}/>
                    </div>
                </div>
            }
        </div>
    );
};

export default AddPostPanel;