import React, { FC } from 'react';

interface BurgerMenuProps {
    className: string
}

const BurgerMenu:FC<BurgerMenuProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" xmlSpace="preserve" className={className}><g><g id="Burger_Menu"><path d="m53 21h-42c-1.7 0-3-1.3-3-3s1.3-3 3-3h42c1.7 0 3 1.3 3 3s-1.3 3-3 3z" fill="#000000" data-original="#000000" className={className}></path><path d="m53 35h-42c-1.7 0-3-1.3-3-3s1.3-3 3-3h42c1.7 0 3 1.3 3 3s-1.3 3-3 3z" fill="#000000" data-original="#000000" className={className}></path><path d="m53 49h-42c-1.7 0-3-1.3-3-3s1.3-3 3-3h42c1.7 0 3 1.3 3 3s-1.3 3-3 3z" fill="#000000" data-original="#000000" className={className}></path></g></g></svg>
    );
};

export default BurgerMenu;