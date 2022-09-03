import React, { FC } from 'react';

interface ViewProps {
    className: string
}

const View:FC<ViewProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 128 128" xmlSpace="preserve" className={className}><g><path xmlns="http://www.w3.org/2000/svg" id="Show" d="m64 104c-41.873 0-62.633-36.504-63.496-38.057-.672-1.209-.672-2.678 0-3.887.863-1.552 21.623-38.056 63.496-38.056s62.633 36.504 63.496 38.057c.672 1.209.672 2.678 0 3.887-.863 1.552-21.623 38.056-63.496 38.056zm-55.293-40.006c4.758 7.211 23.439 32.006 55.293 32.006 31.955 0 50.553-24.775 55.293-31.994-4.758-7.211-23.439-32.006-55.293-32.006-31.955 0-50.553 24.775-55.293 31.994zm55.293 24.006c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" fill="#000000" data-original="#000000" className={className}></path></g></svg>
    );
};

export default View;