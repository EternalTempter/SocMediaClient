import React from 'react';
import Redirect from './Redirect';
import jwt_decode from 'jwt-decode';
import { IUser } from '../models';

const ActivatedAccountRoute = ({children}: {children: any}) => {
    const token = JSON.parse(localStorage.getItem('token') || '');
    if(jwt_decode<IUser>(token).is_activated) {
        return children;
    }    
    else {
        return <Redirect link='/activate'/>;
    } 
};

export default ActivatedAccountRoute;
