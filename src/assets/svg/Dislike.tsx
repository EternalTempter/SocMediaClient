import React, { FC } from 'react';

interface DislikeProps {
    className: string
}

const Dislike:FC<DislikeProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 152 152" xmlSpace="preserve" className={className}><g><path xmlns="http://www.w3.org/2000/svg" id="Icon" d="m105.7 22.9c0-4.1 3.4-7.4 7.4-7.4h20.4c4.1 0 7.4 3.3 7.4 7.4v58.2c0 4.1-3.3 7.4-7.4 7.4h-20.4c-4.1 0-7.4-3.3-7.4-7.4zm-86.8 45.6c-4.4-3.5-5.1-9.9-1.6-14.3 1.4-1.8 3.4-3 5.6-3.5-4.4-3.5-5.1-9.9-1.6-14.2 1.4-1.8 3.4-3 5.7-3.6-4.4-3.5-5.1-9.9-1.5-14.3 1.9-2.4 4.8-3.8 7.9-3.8l57.5.6c4.1 0 7.4 3.3 7.4 7.4v58.2c0 9.2-29.4 26.1-30.9 35.2-1 5.8.3 20.9-3.7 20.9-6.9 0-15.6-2.6-15.6-17.8 0-13.4 8.8-30.8 8.8-30.8h-35.8c-5.6 0-10.1-4.5-10.1-10.1 0-4.8 3.3-8.9 7.9-9.9z" fill="#000000" data-original="#000000" className={className}></path></g></svg>
    );
};

export default Dislike;