import Redirect from './Redirect';

const PublicRoute = ({children}: {children: any}) => {
    const token = JSON.parse(localStorage.getItem('token') || '"{}"');
    return token === '{}' ? children : <Redirect link='/'/>;
};

export default PublicRoute;