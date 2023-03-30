import React, { FC } from 'react';

interface LogoProps {
    className: string
}

const Logo:FC<LogoProps> = ({className}) => {
    return (
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="30" cy="30" r="29" fill="#212121" stroke="#D9D9D9" strokeWidth="2" className={className}/>
            <path d="M16.4131 16.5L30.5 12.8777L44.5869 16.5L30.5 20.1223L16.4131 16.5ZM45.5285 16.7421C45.5284 16.7421 45.5283 16.7421 45.5281 16.742L45.5285 16.7421Z" fill="#D9D9D9" stroke="#D9D9D9" strokeWidth="1.7" className={className}/>
            <path d="M16.8147 30L30.5 26.8719L44.1853 30L30.5 33.1281L16.8147 30Z" fill="#D9D9D9" stroke="#D9D9D9" strokeWidth="1.7" className={className}/>
            <path d="M16.4131 43.5L30.5 39.8777L44.5869 43.5L30.5 47.1223L16.4131 43.5ZM45.5285 43.7421C45.5284 43.7421 45.5283 43.7421 45.5281 43.742L45.5285 43.7421Z" fill="#D9D9D9" stroke="#D9D9D9" strokeWidth="1.7" className={className}/>
            <path d="M15.35 19.7717L27.6514 23L15.35 26.2283V19.7717ZM15.0365 26.3105C15.0367 26.3105 15.0368 26.3105 15.0369 26.3104L15.0365 26.3105Z" fill="#D9D9D9" stroke="#D9D9D9" strokeWidth="1.7" className={className}/>
            <path d="M15.35 33.7717L27.6514 37L15.35 40.2283V33.7717ZM15.0365 40.3105C15.0367 40.3105 15.0368 40.3105 15.0369 40.3104L15.0365 40.3105Z" fill="#D9D9D9" stroke="#D9D9D9" strokeWidth="1.7" className={className}/>
        </svg>
    );
};

export default Logo;