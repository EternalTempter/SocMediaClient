import React, { FC } from 'react';

interface NotificationsSvgProps {
    className: string
    secondClassName?: string
}

const NotificationsSvg:FC<NotificationsSvgProps> = ({className, secondClassName}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" xmlSpace="preserve" className={className}>
            <g>
                <path d="M13.5 4.18a.5.5 0 0 1-.5-.5V2c0-.551-.449-1-1-1s-1 .449-1 1v1.68a.5.5 0 0 1-1 0V2c0-1.103.897-2 2-2s2 .897 2 2v1.68a.5.5 0 0 1-.5.5zM12 24c-1.93 0-3.5-1.57-3.5-3.5a.5.5 0 0 1 1 0c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5a.5.5 0 0 1 1 0c0 1.93-1.57 3.5-3.5 3.5z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M20.5 21h-17a1.502 1.502 0 0 1-.975-2.64A6.952 6.952 0 0 0 5 13.038V10c0-3.86 3.14-7 7-7s7 3.14 7 7v3.038c0 2.053.899 3.99 2.467 5.315A1.501 1.501 0 0 1 20.5 21zM12 4c-3.309 0-6 2.691-6 6v3.038a7.944 7.944 0 0 1-2.821 6.079A.5.5 0 0 0 3.5 20h17a.5.5 0 0 0 .325-.88A7.95 7.95 0 0 1 18 13.038V10c0-3.309-2.691-6-6-6z" fill="#000000" data-original="#000000" className={className}></path>
            </g>
        </svg>    
    );
};

export default NotificationsSvg;