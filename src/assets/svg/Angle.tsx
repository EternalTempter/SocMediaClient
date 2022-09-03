import React, { FC } from 'react';

interface AngleProps {
    className: string
}

const Angle:FC<AngleProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 511.997 511.997" xmlSpace="preserve" className={className}>
            <g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <g>
                            
                            <path d="M292.839,262.093c0.432-1.04,0.64-2.08,0.848-3.184c0.176-0.976,0.4-1.92,0.4-2.896c0-0.976-0.208-1.92-0.4-2.896     c-0.208-1.104-0.416-2.16-0.848-3.184c-0.128-0.32-0.096-0.672-0.256-0.976l-118.16-240c-3.888-7.904-13.472-11.216-21.424-7.28     c-7.92,3.872-11.184,13.456-7.28,21.392l114.672,232.928L145.719,488.925c-3.904,7.936-0.64,17.52,7.28,21.424     c2.272,1.12,4.688,1.648,7.056,1.648c5.904,0,11.584-3.28,14.368-8.928l118.16-240     C292.743,262.749,292.711,262.413,292.839,262.093z" fill="#000000" data-original="#000000" className={className}></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Angle;