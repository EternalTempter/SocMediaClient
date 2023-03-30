import React, { FC } from 'react';

interface FriendsProps {
    className: string
}

const Friends:FC<FriendsProps> = ({className}) => {
    return (
       <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 682.667 682.667" xmlSpace="preserve" className={className}>
            <g>
                <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" fill="#000000" data-original="#000000"></path>
                    </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
                    <path d="M0 0c0-49.71-40.3-90-90-90-49.71 0-90 40.29-90 90s40.29 90 90 90C-40.3 90 0 49.71 0 0Z" transform="translate(502 401)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0v60" transform="translate(412 371)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0h-60" transform="translate(442 401)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0c-38.65 0-69.98 31.33-69.98 69.98 0 38.651 31.33 69.981 69.98 69.981 38.65 0 69.98-31.33 69.98-69.981C69.98 31.33 38.65 0 0 0Z" transform="translate(110 201.02)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0c15.8 25.97 44.371 43.34 76.93 43.34 49.63 0 90-40.37 90-90v-30h-160" transform="translate(203.07 97.66)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0c-33.13 0-59.99 26.851-59.99 59.98 0 33.13 26.86 59.981 59.99 59.981S59.98 93.11 59.98 59.98C59.98 26.851 33.13 0 0 0Z" transform="translate(280 181.02)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0c0-5.522-4.477-10-10-10S-20-5.522-20 0s4.477 10 10 10S0 5.522 0 0" transform="translate(120 21)" className={className} data-original="#000000"></path>
                    <path d="M0 0h-55v40c0 55.23 44.77 100 100 100 27.62 0 52.62-11.19 70.71-29.29a99.948 99.948 0 0 0 22.36-34.05C142.54 65.31 145 52.94 145 40V0H90" transform="translate(65 21)" fill="none" stroke="#E3E3E3" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                </g>
            </g>
        </svg>
    );
};

export default Friends;