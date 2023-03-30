import React, { FC } from 'react';

interface ExitProps {
    className: string
}

const Exit:FC<ExitProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 682.667 682.667" xmlSpace="preserve" className={className}>
            <g>
                <defs>
                    <clipPath id="b" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" fill="#000000" data-original="#000000"></path>
                    </clipPath>
                </defs>
                <mask id="a">
                    <rect width="100%" height="100%" fill="#ffffff" data-original="#ffffff"></rect>
                </mask>
                <g mask="url(#a)">
                    <g clipPath="url(#b)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
                        <path d="M0 0v-40c0-33.137-26.863-60-60-60h-201c-33.137 0-60 26.863-60 60v352c0 33.137 26.863 60 60 60h201c33.137 0 60-26.863 60-60v-40" transform="translate(341 120)" fill="none" stroke="#D9D9D9" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                        <path d="M0 0h-271" transform="translate(487 255)" fill="none" stroke="#D9D9D9" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                        <path d="m0 0 44.786 44.787c11.716 11.716 11.716 30.71 0 42.426L0 132" transform="translate(438.427 189)" fill="none" stroke="#D9D9D9" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Exit;