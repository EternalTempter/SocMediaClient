import React, { FC } from 'react';

interface ReportProps {
    className: string
}

const Report:FC<ReportProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className={className}><g>
            <g xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256    C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216    c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z" fill="#000000" data-original="#000000" className={className}></path>
                </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877    C276,137.831,267.046,128.877,256,128.877z" fill="#000000" data-original="#000000" className={className}></path>
                </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle cx="256" cy="349.16" r="27" fill="#000000" data-original="#000000" className={className}></circle>
                </g>
            </g>
            </g>
        </svg>
    );
};

export default Report;