import React, { FC } from 'react';

interface ChatProps {
    className: string
}

const Chat:FC<ChatProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 682.667 682.667" xmlSpace="preserve" className={className}>
            <g>
                <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" fill="#000000" data-original="#000000"></path>
                    </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
                    <path d="M0 0c0 98.931-91.203 179.13-203.708 179.13-112.504 0-203.707-80.199-203.707-179.13 0-79.387 58.734-146.701 140.072-170.203l-12.229-37.475c-.987-3.024 1.877-5.888 4.901-4.901l115.989 37.849C-67.845-156.707 0-85.324 0 0Z" transform="translate(414.915 239.916)" fill="none" stroke="#E3E3E3" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="700, 40, 1000, 0" strokeDashoffset="0" strokeOpacity="" data-original="#000000" className={className}></path>
                    <path d="M0 0c-71.107 0-133.705-32.002-170.214-80.513 133.904 51.014 284.61-35.391 284.61-164.433 0-36.78-12.615-70.964-34.235-99.405 72.803 27.388 123.82 90.943 123.82 164.981C203.981-80.307 112.656 0 0 0Z" transform="translate(300.519 484.862)" fill="none" stroke="#E3E3E3" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="0, 35, 974, 0, 162" strokeDashoffset="0" strokeOpacity="" data-original="#000000" className={className}></path>
                </g>
            </g>
        </svg>
    );
};

export default Chat;