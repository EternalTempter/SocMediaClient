import Redirect from './Redirect';

const PrivateRoute = ({children}: {children: any}) => {
    const token = JSON.parse(localStorage.getItem('token') || '"{}"');
    return token !== '{}' ? children : <Redirect link='/auth'/>;
};

export default PrivateRoute;