import React, { FC } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
    type: string
}

const Loader:FC<LoaderProps> = ({type}) => {
    return (
        <div className={
            type === "regular" 
                ? 
            styles.ldsRing
                :
            [styles.ldsRing, styles.mini].join(' ')
        }><div></div><div></div><div></div><div></div></div>
    );
};

export default Loader;