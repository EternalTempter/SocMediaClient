import React, { FC } from 'react';

interface ExitProps {
    className: string
}

const Exit:FC<ExitProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" xmlSpace="preserve" className={className}>
            <g>
                <path d="M13.5 21h-4a.5.5 0 0 1 0-1h4c.827 0 1.5-.673 1.5-1.5v-5a.5.5 0 0 1 1 0v5c0 1.378-1.121 2.5-2.5 2.5zM23.5 11h-10a.5.5 0 0 1 0-1h10a.5.5 0 0 1 0 1z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M8 24c-.22 0-.435-.037-.638-.109l-5.99-1.997A1.998 1.998 0 0 1 0 20V2C0 .897.897 0 2 0c.222 0 .438.037.639.11l5.989 1.996A1.996 1.996 0 0 1 10 4v18c0 1.103-.897 2-2 2zM2 1c-.552 0-1 .449-1 1v18a1 1 0 0 0 .688.946l6 2C8.344 23.179 9 22.654 9 22V4a.996.996 0 0 0-.688-.945l-6-2A.92.92 0 0 0 2 1z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M15.5 8a.5.5 0 0 1-.5-.5v-5c0-.827-.673-1.5-1.5-1.5H2a.5.5 0 0 1 0-1h11.5C14.879 0 16 1.122 16 2.5v5a.5.5 0 0 1-.5.5zM19.5 15a.5.5 0 0 1-.354-.853l3.646-3.646-3.646-3.646a.5.5 0 0 1 .707-.707l4 4a.5.5 0 0 1 0 .707l-4 4A.501.501 0 0 1 19.5 15z" fill="#000000" data-original="#000000" className={className}></path>
            </g>
        </svg>
    );
};

export default Exit;