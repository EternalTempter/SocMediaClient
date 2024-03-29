import React, { FC } from 'react';

interface SearchErrorProps {
    className: string
}

const SearchError:FC<SearchErrorProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"width="512" height="512" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className={className}>
            <g>
                <path d="M266.609 357.859c-2.799-2.791-6.659-4.39-10.609-4.39s-7.81 1.6-10.61 4.39a15.111 15.111 0 0 0-4.39 10.61c0 3.95 1.6 7.81 4.39 10.6 2.8 2.79 6.66 4.391 10.61 4.391s7.81-1.601 10.609-4.391a15.105 15.105 0 0 0 4.391-10.6c0-3.95-1.601-7.82-4.391-10.61z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M437.019 74.98C388.667 26.629 324.38 0 256 0 187.619 0 123.331 26.629 74.98 74.98 26.628 123.333 0 187.62 0 256c0 63.355 22.874 123.188 64.69 170.097L4.394 486.392c-5.858 5.857-5.858 15.354 0 21.213a14.947 14.947 0 0 0 10.607 4.393c3.838 0 7.678-1.465 10.606-4.393l60.297-60.295C132.813 489.125 192.645 512 256.001 512c68.38 0 132.667-26.629 181.019-74.98C485.371 388.666 512 324.38 512 256s-26.629-132.667-74.981-181.02zM256 481.998C131.383 481.998 30 380.616 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 124.616-101.383 225.998-226 225.998z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M256 128.534c-8.284 0-15 6.716-15 15v128.531c0 8.284 6.716 15 15 15s15-6.716 15-15V143.534c0-8.284-6.716-15-15-15z" fill="#000000" data-original="#000000" className={className}></path>
            </g>
        </svg>
    );
};

export default SearchError;