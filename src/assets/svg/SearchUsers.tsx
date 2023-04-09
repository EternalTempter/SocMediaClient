import React, { FC } from 'react';

interface SearchUsersProps {
    className: string
}

const SearchUsers:FC<SearchUsersProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" xmlSpace="preserve" className={className}>
            <g>
                <path d="M32 38c-8 0-9.595-1.954-9.895-2.553A1 1 0 0 1 22 35v-3a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7v3a1 1 0 0 1-.1.447C41.6 36.046 40 38 32 38Zm-8-3.367c.422.308 2.245 1.367 8 1.367 5.64 0 7.5-1.017 8-1.394V32a5.006 5.006 0 0 0-5-5h-6a5.006 5.006 0 0 0-5 5ZM41 35Z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M32 27a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6Zm0-10a4 4 0 1 0 4 4 4 4 0 0 0-4-4ZM54 38a35.769 35.769 0 0 1-4.116-.214l.232-1.986A33.816 33.816 0 0 0 54 36c5.64 0 7.5-1.017 8-1.394V32a5.006 5.006 0 0 0-5-5h-3v-2h3a7.008 7.008 0 0 1 7 7v3a1 1 0 0 1-.1.447C63.6 36.046 62 38 54 38Z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M54 27v-2a4 4 0 0 0 0-8 3.959 3.959 0 0 0-2.4.8l-1.2-1.6A5.94 5.94 0 0 1 54 15a6 6 0 0 1 0 12ZM10 38C2 38 .4 36.046.105 35.447A1 1 0 0 1 0 35v-3a7.008 7.008 0 0 1 7-7h3v2H7a5.006 5.006 0 0 0-5 5v2.633C2.422 34.941 4.245 36 10 36a33.816 33.816 0 0 0 3.884-.2l.232 1.986A35.769 35.769 0 0 1 10 38Z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M10 27a6 6 0 0 1 0-12 5.94 5.94 0 0 1 3.6 1.2l-1.2 1.6A3.959 3.959 0 0 0 10 17a4 4 0 0 0 0 8ZM32 45a19 19 0 1 1 19-19 19.021 19.021 0 0 1-19 19Zm0-36a17 17 0 1 0 17 17A17.019 17.019 0 0 0 32 9Z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="m44.294 39.708 1.414-1.414 4 4-1.414 1.414z" fill="#000000" data-original="#000000" className={className}></path>
                <path d="M58 57a1 1 0 0 1-.707-.293l-11-11a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l11 11a1 1 0 0 1 0 1.414l-4 4A1 1 0 0 1 58 57Zm-9.586-12L58 54.586 60.586 52 51 42.414Z" fill="#000000" data-original="#000000" className={className}></path>
            </g>
        </svg>
    );
};

export default SearchUsers;