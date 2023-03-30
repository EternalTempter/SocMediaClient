import React, { FC } from 'react';

interface MoreProps {
    className: string
}

const More:FC<MoreProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 48 48" xmlSpace="preserve" className={className}>
            <g>
                <path fill="url(#a)" d="M4.074 456.819A4.502 4.502 0 0 1 8.5 451.5c2.484 0 4.5 2.016 4.5 4.5a4.502 4.502 0 0 1-5.727 4.33 1.001 1.001 0 0 0-.546 1.925A6.504 6.504 0 0 0 15 456c0-3.587-2.913-6.5-6.5-6.5a6.504 6.504 0 0 0-6.393 7.681 1 1 0 0 0 1.967-.362zm38.897-3.682A4.502 4.502 0 0 1 39.5 460.5c-2.484 0-4.5-2.016-4.5-4.5a4.502 4.502 0 0 1 5.727-4.33 1.001 1.001 0 0 0 .546-1.925A6.504 6.504 0 0 0 33 456c0 3.587 2.913 6.5 6.5 6.5s6.5-2.913 6.5-6.5a6.473 6.473 0 0 0-1.488-4.137 1 1 0 0 0-1.541 1.274zM24 449.5c-3.587 0-6.5 2.913-6.5 6.5s2.913 6.5 6.5 6.5 6.5-2.913 6.5-6.5-2.913-6.5-6.5-6.5zm-19.5 9.304a1.001 1.001 0 0 1 0 2 1 1 0 0 1 0-2zM24 451.5c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5z" transform="translate(0 -432)" data-original="url(#a)" className={className}></path>
            </g>
        </svg>
    );
};

export default More;