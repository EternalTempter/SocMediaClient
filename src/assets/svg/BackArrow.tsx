import React, { FC } from 'react';

interface BackArrowProps {
    className: string
}

const BackArrow:FC<BackArrowProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className={className}><g><path xmlns="http://www.w3.org/2000/svg" d="m496.987 479.867c-7.263 0-13.569-5.252-14.783-12.535-10.824-63.203-72.026-173.512-227.271-179.958v81.093c0 5.619-3.14 10.767-8.136 13.338-4.997 2.57-11.011 2.133-15.583-1.132l-224.933-160.667c-3.942-2.816-6.281-7.363-6.281-12.207 0-4.845 2.339-9.391 6.281-12.206l224.934-160.666c4.571-3.266 10.586-3.703 15.582-1.132s8.136 7.719 8.136 13.338v82.315c95.963 9.572 257.067 78.84 257.067 335.418 0 7.805-5.985 14.306-13.763 14.949-.419.034-.836.052-1.25.052z" fill="#000000" data-original="#000000" className={className}></path></g></svg>
    );
};

export default BackArrow;