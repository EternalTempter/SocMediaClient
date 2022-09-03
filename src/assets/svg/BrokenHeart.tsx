import React, { FC } from 'react';

interface BrokenHeartProps {
    className: string
}

const BrokenHeart:FC<BrokenHeartProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 511.87 511.87" xmlSpace="preserve" className={className}><g><g xmlns="http://www.w3.org/2000/svg"><path d="m251.568 255.26-79.086-81.104 70.703-98.404-10.655-8.944c-25.397-21.318-57.703-33.06-90.966-33.06-37.829 0-73.395 14.731-100.144 41.481-55.225 55.225-55.226 145.082-.003 200.308l199.675 199.686-41.218-158.561z" fill="#000000" data-original="#000000" className={className}></path><path d="m470.451 75.228c-26.749-26.75-62.314-41.481-100.145-41.481-30.82 0-60.103 9.71-84.683 28.081l-1.807 1.35-79.493 108.906 80.753 81.746-58.156 69.426 40.955 154.867 202.576-202.587c55.225-55.226 55.224-145.083 0-200.308z" fill="#000000" data-original="#000000" className={className}></path></g></g></svg>
    );
};

export default BrokenHeart;