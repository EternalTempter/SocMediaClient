import React, { FC } from 'react';

interface MoreProps {
    className: string
}

const More:FC<MoreProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 426.667 426.667" xmlSpace="preserve" className={className}>
            <g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <circle cx="42.667" cy="213.333" r="42.667" fill="#384859" data-original="#000000" className={className}></circle>
                    </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <circle cx="213.333" cy="213.333" r="42.667" fill="#384859" data-original="#000000" className={className}></circle>
                    </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <circle cx="384" cy="213.333" r="42.667" fill="#384859" data-original="#000000" className={className}></circle>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default More;