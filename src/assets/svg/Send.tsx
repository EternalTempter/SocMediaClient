import React, { FC } from 'react';

interface SendProps {
    className: string
}

const Send:FC<SendProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" xmlSpace="preserve" className={className}><g><g xmlns="http://www.w3.org/2000/svg" id="Send"><path d="m63 32a1.0009 1.0009 0 0 1 -.6025.918l-60 26a1 1 0 0 1 -1.2637-1.418l11.79-20.44a1.0011 1.0011 0 0 1 .502-.4317l11.8301-4.6283-11.83-4.6279a1.0011 1.0011 0 0 1 -.502-.4317l-11.7901-20.4404a1 1 0 0 1 1.2637-1.418l60 26a1.0009 1.0009 0 0 1 .6025.918z" fill="#000000" data-original="#000000" className={className}></path></g></g></svg>
    );
};

export default Send;