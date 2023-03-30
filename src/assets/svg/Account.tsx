import React, { FC } from 'react';

interface AccountProps {
    className: string
}

const Account:FC<AccountProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 682.667 682.667" xmlSpace="preserve" className={className}>
            <g>
                <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse" className={className}>
                        <path d="M0 512h512V0H0Z" fill="#000000" data-original="#000000" className={className}></path>
                    </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
                    <path d="M0 0c-44.11 0-80 35.89-80 80s35.89 80 80 80 80-35.89 80-80S44.11 0 0 0Z" transform="translate(256 236)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0c.01.13.02.26.04.39 7.25 76.08 71.329 135.58 149.31 135.58 77.98 0 142.049-59.49 149.32-135.57" transform="translate(106.65 60.03)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0c0-5.523-4.478-10-10-10S-20-5.523-20 0s4.478 10 10 10S0 5.523 0 0" transform="translate(450 420)" fill="#000000" data-original="#000000" className={className}></path>
                    <path d="M0 0c22.581-37.189 35.579-80.857 35.579-127.592 0-79.79-37.89-150.65-96.68-195.57v-.01c-41.39-31.64-93.14-50.42-149.32-50.42-56.17 0-107.92 18.78-149.309 50.42-58.791 44.92-96.691 115.78-96.691 195.58 0 135.96 110.02 246 246 246 56.871 0 109.207-19.25 150.851-51.598" transform="translate(466.42 383.592)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                </g>
            </g>
        </svg>
    );
};

export default Account;