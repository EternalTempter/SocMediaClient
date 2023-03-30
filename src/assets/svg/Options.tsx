import React, { FC } from 'react';

interface OptionsProps {
    className: string
}

const Options:FC<OptionsProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 682.667 682.667" xmlSpace="preserve" className={className}>
            <g>
                <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" fill="#000000"></path>
                    </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
                    <path d="m0 0-16.87 67.46c-13.38 3.86-26.231 9.17-38.28 15.82l-59.59-35.75-49.05 49.05 35.75 59.59c-6.66 12.05-11.96 24.9-15.82 38.28l-67.46 16.87v69.36l67.46 16.87c3.86 13.38 9.16 26.23 15.82 38.28l-35.75 59.59 49.05 49.05 59.59-35.75a184.99 184.99 0 0 0 38.28 15.82L0 492h69.359l16.87-67.46a185.02 185.02 0 0 0 38.281-15.82l59.59 35.75 49.049-49.05-35.75-59.59c6.661-12.05 11.96-24.9 15.821-38.28l67.46-16.87v-69.36l-67.46-16.87c-3.861-13.38-9.16-26.23-15.821-38.28l35.75-59.59L184.1 47.53l-59.59 35.75c-12.05-6.65-24.901-11.96-38.281-15.82L69.359 0Z" transform="translate(221.32 10)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" className={className}></path>
                    <path d="M0 0c0-5.523-4.478-10-10-10S-20-5.523-20 0s4.478 10 10 10S0 5.523 0 0" transform="translate(360 172)" className={className}></path>
                    <path d="M0 0c-17.484-9.199-37.383-14.407-58.475-14.407-69.48 0-126 56.52-126 126 0 69.48 56.52 126 126 126 69.481 0 126-56.52 126-126 0-16.078-3.026-31.462-8.54-45.612" transform="translate(314.475 144.407)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" className={className}></path>
                </g>
            </g>
        </svg>
    );
};

export default Options;