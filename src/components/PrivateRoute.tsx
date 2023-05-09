import Redirect from './Redirect';

const PrivateRoute = ({children}: {children: any}) => {
    const token = JSON.parse(localStorage.getItem('token') || '"{}"');
    if(token === '{}') {
        return <Redirect link='/auth'/>;
    }    
    else {
        return children;
    } 
};

export default PrivateRoute;