import React, { FC } from 'react';

interface FriendsProps {
    className: string
}

const Friends:FC<FriendsProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className={className}>
            <g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M155.327,57.142c-51.531,0-93.454,44.45-93.454,99.086c0,54.636,41.923,99.086,93.454,99.086s93.455-44.45,93.455-99.086    C248.782,101.592,206.859,57.142,155.327,57.142z" fill="#000000" data-original="#000000" className={className}></path>
                    </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M367.798,71.321c-0.211,0-0.425,0.001-0.636,0.002c-21.626,0.179-41.826,9.31-56.878,25.713    c-14.788,16.113-22.829,37.37-22.644,59.854c0.186,22.484,8.577,43.605,23.628,59.473c15.17,15.991,35.265,24.773,56.651,24.773    c0.215,0,0.43-0.001,0.646-0.002c21.626-0.179,41.826-9.311,56.878-25.713c14.788-16.113,22.829-37.37,22.644-59.855    C447.702,108.972,411.747,71.321,367.798,71.321z" fill="#000000" data-original="#000000" className={className}></path>
                    </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M371.74,257.358h-7.76c-36.14,0-69.12,13.74-94.02,36.26c6.23,4.78,12.16,9.99,17.78,15.61    c16.58,16.58,29.6,35.9,38.7,57.42c8.2,19.38,12.88,39.8,13.97,60.83H512v-29.87C512,320.278,449.08,257.358,371.74,257.358z" fill="#000000" data-original="#000000" className={className}></path>
                    </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M310.35,427.478c-2.83-45.59-25.94-85.69-60.43-111.39c-25.09-18.7-56.21-29.77-89.92-29.77h-9.34    C67.45,286.319,0,353.768,0,436.978v17.88h310.65v-17.88C310.65,433.788,310.55,430.618,310.35,427.478z" fill="#000000" data-original="#000000" className={className}></path>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Friends;