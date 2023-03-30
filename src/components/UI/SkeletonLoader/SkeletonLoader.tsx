import React, { FC } from 'react';
import styles from './SkeletonLoader.module.scss';

interface SkeletonLoaderProps {
    borderRadius: number
}

const SkeletonLoader:FC<SkeletonLoaderProps> = ({borderRadius}) => {
    return (
        <div 
            className={styles.skeletonHolder}
            style={{borderRadius: `${borderRadius}px`}}
        ></div>
    );
};

export default SkeletonLoader;