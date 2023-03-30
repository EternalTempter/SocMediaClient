import React, { FC } from 'react';

interface QuestionProps {
    className: string
}

const Question:FC<QuestionProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 1560 1560" xmlSpace="preserve" className={className}>
            <g>
                <path d="M780 1556c-104.7 0-206.4-20.5-302.1-61-92.4-39.1-175.4-95-246.7-166.3S104 1174.5 64.9 1082c-40.5-95.7-61-197.3-61-302.1s20.5-206.4 61-302.1c39.1-92.4 95-175.4 166.3-246.7S385.5 104.1 477.9 65C573.6 24.5 675.2 4 780 4s206.4 20.5 302.1 61c92.4 39.1 175.4 95 246.7 166.3S1456 385.5 1495.1 478c40.5 95.7 61 197.3 61 302.1s-20.5 206.4-61 302.1c-39.1 92.4-95 175.4-166.3 246.7s-154.2 127.2-246.7 166.3c-95.7 40.3-197.4 60.8-302.1 60.8zm0-1488C387.4 68 68 387.4 68 780s319.4 712 712 712 712-319.4 712-712S1172.6 68 780 68z" fill="#E3E3E3" data-original="#000000"></path>
                <path d="M780 1038.9c-17.7 0-32-14.3-32-32V347.8c0-17.7 14.3-32 32-32s32 14.3 32 32v659.1c0 17.7-14.3 32-32 32zM780 1244.2c-17.7 0-32-14.3-32-32V1163c0-17.7 14.3-32 32-32s32 14.3 32 32v49.2c0 17.7-14.3 32-32 32z" fill="#E3E3E3" data-original="#000000"></path>
            </g>
        </svg>
    );
};

export default Question;