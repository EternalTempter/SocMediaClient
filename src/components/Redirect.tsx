import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectProps {
    link: string
}

const Redirect: FC<RedirectProps> = ({link}) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(link);
    }, [navigate])
    return (
        <div>
            
        </div>
    );
};

export default Redirect;