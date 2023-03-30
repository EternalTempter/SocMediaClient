import React, { FC } from 'react';

interface SendProps {
    className: string
}

const Send:FC<SendProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 25 25" xmlSpace="preserve" className={className}>
            <g>
                <path d="M22.65 12 2.76 3a.53.53 0 0 0-.55.09.5.5 0 0 0-.13.54l3.26 8.87-3.26 8.83a.5.5 0 0 0 .13.54.55.55 0 0 0 .34.13.52.52 0 0 0 .21 0l19.89-9a.5.5 0 0 0 0-.92zM3.43 4.45 20.13 12H6.22zM6.22 13h13.91l-16.7 7.55z" data-name="Layer 47" fill="#000000" data-original="#000000" className={className}></path>
            </g>
        </svg>
    );
};

export default Send;