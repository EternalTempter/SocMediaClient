import React, { FC } from 'react';

interface ShareProps {
    className: string
}

const Share:FC<ShareProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className={className}><g><path xmlns="http://www.w3.org/2000/svg" d="m328.265 512c-20.834 0-39.375-13.986-45.097-34.011l-55.368-193.789-193.789-55.368c-20.026-5.722-34.011-24.263-34.011-45.089 0-21.119 13.586-39.379 33.808-45.446l458.881-137.664c5.285-1.585 11.015-.141 14.917 3.761s5.347 9.631 3.761 14.917l-137.665 458.882c-6.066 20.221-24.326 33.807-45.437 33.807z" fill="#000000" data-original="#000000" className={className}></path></g></svg>
    );
};

export default Share;