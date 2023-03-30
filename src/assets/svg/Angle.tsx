import React, { FC } from 'react';

interface AngleProps {
    className: string
}

const Angle:FC<AngleProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" xmlSpace="preserve" className={className}>
            <g>
                <path d="M42.7 29.6 26.2 13.1l-2.4-2.4c-1.8-1.8-4.7 1-2.8 2.8L37.5 30l.9.9-15 15-2.3 2.3c-1.8 1.8 1 4.7 2.8 2.8l16.4-16.4 2.3-2.3c.9-.6.9-1.9.1-2.7z" fill="#000000" data-original="#000000" className={className}></path>
            </g>
        </svg>
    );
};

export default Angle;