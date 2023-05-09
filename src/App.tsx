import {Routes, Route} from 'react-router-dom';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import HomePage from './pages/HomePage/HomePage';
import RegistratePage from './pages/RegistratePage/RegistratePage';
import PrivateRoute from './components/PrivateRoute';
import AuthorizePage from './pages/AuthorizePage/AuthorizePage';
import PublicRoute from './components/PublicRoute';
import ChatPage from './pages/ChatPage/ChatPage';
import Layout from './components/Layout/Layout';
import NewsPage from './pages/NewsPage/NewsPage';
import AccountPage from './pages/AccountPage/AccountPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import GroupsPage from './pages/GroupsPage/GroupsPage';
import { useEffect, useState } from 'react';
import GroupPage from './pages/GroupPage/GroupPage';
import AboutPage from './pages/AboutPage/AboutPage';
import AdminPage from './pages/AdminPage/AdminPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import AccountActivationPage from './pages/AccountActivationPage/AccountActivationPage';
import jwt_decode from 'jwt-decode';
import { IUser } from './models';
import ActivatedAccountRoute from './components/ActivatedAccountRoute';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  
  const [isWelcomeWindowVisible, setIsWelcomeWindowVisible] = useState(false);

  // const {data} = useCheckIsActivatedQuery({email: jwt_decode<IUser>(localStorage.getItem('token') || '').email}, {
  //     skip: localStorage.getItem('token') === null || jwt_decode<IUser>(localStorage.getItem('token') || '').is_activated === true,
  //     pollingInterval: 5000
  // });
  // const [checkIsActivated, {data}] = useLazyCheckIsActivatedQuery();

  // useEffect(() => {
  //   if(data && data !== false) {
  //     localStorage.setItem('token', data.token);
  //     setIsActivated(true);
  //   } 
  // }, [data])

  // useEffect(() => {
  //   if(data && data !== false) {
  //     localStorage.setItem('token', JSON.stringify(data.token));
  //     setIsActivated(true);
  //   }
  // }, [data])

  // useEffect(() => {
  //   if(localStorage.getItem('token') && !isActivated) {
  //     const user : IUser = jwt_decode(localStorage.getItem('token') || '');
  //     const interval = setInterval(() => {
  //       if(!isActivated) checkIsActivated({email: user.email});
  //       console.log(isActivated)
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }
  // }, []);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsAuth(true)
      if(jwt_decode<IUser>(localStorage.getItem('token') || '').is_activated === true) {
        setIsActivated(true);
      }
      else {
        setIsActivated(false);
      }
    }
    else {
      setIsAuth(false)
    } 
  }, []);

  

  // useEffect(() => {
  //   if(localStorage.getItem('token')) {
  //     const user : IUser = jwt_decode(localStorage.getItem('token') || '');
  //     setIsActivated(user.is_activated!);
  //     setIsAuth(true)
  //   }
  //   else {
  //     setIsAuth(false)
  //   } 
  // }, [])

  return (
    <>
      {isAuth && isActivated ? <Layout 
        setIsAuth={setIsAuth} 
        setIsActivated={setIsActivated}
        isWelcomeWindowVisible={isWelcomeWindowVisible} 
        setIsWelcomeWindowVisible={setIsWelcomeWindowVisible}
      /> : ''}
      <Routes>
        <Route path='/auth' element={<PublicRoute><AuthorizePage setIsAuth={setIsAuth}/></PublicRoute>}/>
        <Route path='/activate' element={<PrivateRoute><AccountActivationPage setIsActivated={setIsActivated}/></PrivateRoute>}/>
        <Route path='/welcome' element={<PublicRoute><WelcomePage/></PublicRoute>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/registrate' element={<PublicRoute><RegistratePage setIsAuth={setIsAuth} setIsWelcomeWindowVisible={setIsWelcomeWindowVisible}/></PublicRoute>}/>
        <Route path='/' element={<PrivateRoute><ActivatedAccountRoute><HomePage setIsAuth={setIsAuth}/></ActivatedAccountRoute></PrivateRoute>}/>
        <Route path='/news' element={<PrivateRoute><ActivatedAccountRoute><NewsPage/></ActivatedAccountRoute></PrivateRoute>}/>
        <Route path='/admin' element={<PrivateRoute><ActivatedAccountRoute><AdminPage/></ActivatedAccountRoute></PrivateRoute>}/>
        <Route path='/groups' element={<PrivateRoute><ActivatedAccountRoute><GroupsPage/></ActivatedAccountRoute></PrivateRoute>}/>
        <Route path='/groups/:id' element={<PrivateRoute><ActivatedAccountRoute><GroupPage/></ActivatedAccountRoute></PrivateRoute>}/>
        <Route path='/account/:id' element={<PrivateRoute><ActivatedAccountRoute><AccountPage/></ActivatedAccountRoute></PrivateRoute>}/>
        <Route path='/friends' element={<PrivateRoute><ActivatedAccountRoute><FriendsPage/></ActivatedAccountRoute></PrivateRoute>}/>
        <Route path='/messages' element={<PrivateRoute><ActivatedAccountRoute><MessagesPage/></ActivatedAccountRoute></PrivateRoute>}/>
        <Route path='/chat' element={<PrivateRoute><ActivatedAccountRoute><ChatPage/></ActivatedAccountRoute></PrivateRoute>}/>
        <Route path='*' element={<PrivateRoute><ActivatedAccountRoute><HomePage setIsAuth={setIsAuth}/></ActivatedAccountRoute></PrivateRoute>}/>
      </Routes>
    </>
  );
}

export default App; 
