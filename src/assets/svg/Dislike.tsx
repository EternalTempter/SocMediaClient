import React, { FC } from 'react';

interface DislikeProps {
    className: string
}

const Dislike:FC<DislikeProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 30 30" xmlSpace="preserve" className={className}>
            <g>
                <path d="M29.288 10.71a3.377 3.377 0 0 0-1.052-1.108 3.38 3.38 0 0 0-1.36-3.979c.819-1.744-.547-3.88-2.484-3.84-4.986.054-11.466-.556-16.006 1.862-1.075-1.523-2.948-1.422-4.6-1.38-.98.006-.982 1.494 0 1.5h1.815A2.037 2.037 0 0 1 7.64 5.801v8.925a2.039 2.039 0 0 1-2.039 2.036H3.786a2.038 2.038 0 0 1-2.035-2.036V5.801c.005-.974-1.501-.984-1.5 0v8.925a3.539 3.539 0 0 0 3.535 3.536h1.815a3.539 3.539 0 0 0 3.535-3.536c-.044-.293.102-9.791-.1-9.731 4.248-2.291 10.685-1.633 15.348-1.712 1.067-.027 1.647 1.386.844 2.107a.75.75 0 0 0-.028 1.061c.242.252.633.242.901.463.856.58 1.08 1.744.5 2.6a.754.754 0 0 0 .378 1.131c1.489.46 1.703 2.63.341 3.378-1.01.719.365 1.419.263 2.311a1.974 1.974 0 0 1-2.01 1.877h-7.536a1.7 1.7 0 0 0-1.7 1.7v5.366c.022 1.734-2.582 1.991-3.042.372l-2.74-6.138c-.371-.909-1.757-.342-1.389.565.006.053 2.724 6.081 2.735 6.135a3.026 3.026 0 0 0 2.88 2.037c1.641.036 3.069-1.274 3.056-2.937v-5.4c0-.11.09-.2.2-.2h7.592c2.439.068 4.274-2.69 3.09-4.871a3.375 3.375 0 0 0 .569-4.13z" fill="#000000" data-original="#000000" className={className}></path>
            </g>
        </svg>    
    );
};

export default Dislike;