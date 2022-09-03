import React, { FC } from 'react';

interface MicrophoneProps {
    className: string
}

const Microphone:FC<MicrophoneProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 435.2 435.2" xmlSpace="preserve" className={className}>
            <g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M356.864,224.768c0-8.704-6.656-15.36-15.36-15.36s-15.36,6.656-15.36,15.36c0,59.904-48.64,108.544-108.544,108.544    c-59.904,0-108.544-48.64-108.544-108.544c0-8.704-6.656-15.36-15.36-15.36c-8.704,0-15.36,6.656-15.36,15.36    c0,71.168,53.248,131.072,123.904,138.752v40.96h-55.808c-8.704,0-15.36,6.656-15.36,15.36s6.656,15.36,15.36,15.36h142.336    c8.704,0,15.36-6.656,15.36-15.36s-6.656-15.36-15.36-15.36H232.96v-40.96C303.616,355.84,356.864,295.936,356.864,224.768z" fill="#000000" data-original="#000000" className={className}></path>
                    </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M217.6,0c-47.104,0-85.504,38.4-85.504,85.504v138.752c0,47.616,38.4,85.504,85.504,86.016    c47.104,0,85.504-38.4,85.504-85.504V85.504C303.104,38.4,264.704,0,217.6,0z" fill="#000000" data-original="#000000" className={className}></path>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Microphone;