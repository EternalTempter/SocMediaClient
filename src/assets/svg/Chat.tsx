import React, { FC } from 'react';

interface ChatProps {
    className: string
}

const Chat:FC<ChatProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" xmlSpace="preserve" className={className}><g><g xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2"><path d="m12 1a10.995 10.995 0 0 0 -9.464 16.6l-1.475 4.058a1 1 0 0 0 .939 1.342 1.019 1.019 0 0 0 .342-.06l4.058-1.476a11 11 0 1 0 5.6-20.464z" fill="#000000" data-original="#000000" className={className}></path></g></g></svg>
    );
};

export default Chat;