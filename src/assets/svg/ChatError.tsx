import React, { FC } from 'react';

interface ChatErrorProps {
    className: string
}

const ChatError:FC<ChatErrorProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" xmlSpace="preserve" className={className}>
            <g>
                <path d="M58 9H32.574A11 11 0 1 0 22 23c.338 0 .67-.021 1-.051V25C10.869 25 1 32.178 1 41c0 6.366 5.076 12.04 13 14.61V62a1 1 0 0 0 1.515.857l9.923-5.957C36.6 56.014 45 49.2 45 41a12.388 12.388 0 0 0-1.6-6h3.249l9.726 7.781A1 1 0 0 0 58 42v-7a5.006 5.006 0 0 0 5-5V14a5.006 5.006 0 0 0-5-5Zm-45 3a9 9 0 1 1 9 9 9.01 9.01 0 0 1-9-9Zm30 29c0 7.2-7.706 13.184-17.921 13.925a1 1 0 0 0-.467.141L16 60.233v-5.36a1 1 0 0 0-.718-.959C7.821 51.717 3 46.647 3 41c0-7.72 8.972-14 20-14v3a5.006 5.006 0 0 0 5 5h13.053A10.51 10.51 0 0 1 43 41Zm18-11a3 3 0 0 1-3 3h-1a1 1 0 0 0-1 1v5.919l-8.375-6.7A1 1 0 0 0 47 33H28a3 3 0 0 1-3-3v-7.426A11.013 11.013 0 0 0 33 12c0-.338-.021-.67-.051-1H58a3 3 0 0 1 3 3Z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M22.181 5h-.362A2.823 2.823 0 0 0 19 7.82a2.865 2.865 0 0 0 .055.553l.768 3.843a2.22 2.22 0 0 0 4.354 0l.768-3.844A2.818 2.818 0 0 0 22.181 5Zm.8 2.98-.768 3.843a.229.229 0 0 1-.432 0l-.768-3.842A.792.792 0 0 1 21 7.82a.82.82 0 0 1 .819-.82h.362a.82.82 0 0 1 .819.82.775.775 0 0 1-.016.16Z" fill="#000000" data-original="#000000" className={className}></path>
                <circle cx="22" cy="17" r="2" fill="#000000" data-original="#000000" className={className}></circle>
                <circle cx="35" cy="24" r="2" fill="#000000" data-original="#000000" className={className}></circle>
                <circle cx="43" cy="24" r="2" fill="#000000" data-original="#000000" className={className}></circle>
                <circle cx="51" cy="24" r="2" fill="#000000" data-original="#000000" className={className}></circle>
                <circle cx="15" cy="43" r="2" fill="#000000" data-original="#000000" className={className}></circle>
                <circle cx="23" cy="43" r="2" fill="#000000" data-original="#000000" className={className}></circle>
                <circle cx="31" cy="43" r="2" fill="#000000" data-original="#000000" className={className}></circle>
            </g>
        </svg>
    );
};

export default ChatError;