import React, { FC } from 'react';

interface LinkProps {
    className: string
}

const Link:FC<LinkProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 682.667 682.667" xmlSpace="preserve" className={className}>
            <g>
                <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" fill="#000000" data-original="#000000" className={className}></path>
                    </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
                    <path d="M0 0c8.231-4.688 15.949-10.575 22.973-17.598 42.19-42.19 43.345-109.439-9.733-162.517l-71.886-71.887c-53.079-53.078-120.328-51.923-162.518-9.732-42.19 42.19-43.346 109.439 9.732 162.517l52.336 52.551" transform="translate(272.096 312.666)" fill="none" stroke="#000000" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0c-8.231 4.688-15.949 10.574-22.973 17.598-42.19 42.191-43.345 109.439 9.733 162.517l71.886 71.886c53.079 53.079 120.328 51.923 162.518 9.733 42.19-42.191 43.346-109.439-9.732-162.517l-52.336-52.551" transform="translate(239.904 199.334)" fill="none" stroke="#000000" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" className={className}></path>
                </g>
            </g>
        </svg>
    );
};

export default Link;