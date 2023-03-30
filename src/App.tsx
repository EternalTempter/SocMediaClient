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

function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  const [isWelcomeWindowVisible, setIsWelcomeWindowVisible] = useState(false);

  useEffect(() => {
    localStorage.getItem('token') ? setIsAuth(true) : setIsAuth(false)
  }, []);

  return (
    <>
      {isAuth ? <Layout 
        setIsAuth={setIsAuth} 
        isWelcomeWindowVisible={isWelcomeWindowVisible} 
        setIsWelcomeWindowVisible={setIsWelcomeWindowVisible}
      /> : ''}
      <Routes>
        <Route path='/auth' element={<PublicRoute><AuthorizePage setIsAuth={setIsAuth}/></PublicRoute>}/>
        <Route path='/welcome' element={<PublicRoute><WelcomePage/></PublicRoute>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/registrate' element={<PublicRoute><RegistratePage setIsAuth={setIsAuth} setIsWelcomeWindowVisible={setIsWelcomeWindowVisible}/></PublicRoute>}/>
        <Route path='/' element={<PrivateRoute><HomePage setIsAuth={setIsAuth}/></PrivateRoute>}/>
        <Route path='/news' element={<PrivateRoute><NewsPage/></PrivateRoute>}/>
        <Route path='/admin' element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
        <Route path='/groups' element={<PrivateRoute><GroupsPage/></PrivateRoute>}/>
        <Route path='/groups/:id' element={<PrivateRoute><GroupPage/></PrivateRoute>}/>
        <Route path='/account/:id' element={<PrivateRoute><AccountPage/></PrivateRoute>}/>
        <Route path='/friends' element={<PrivateRoute><FriendsPage/></PrivateRoute>}/>
        <Route path='/messages' element={<PrivateRoute><MessagesPage/></PrivateRoute>}/>
        <Route path='/chat' element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
        <Route path='*' element={<PrivateRoute><HomePage setIsAuth={setIsAuth}/></PrivateRoute>}/>
      </Routes>
    </>
  );
}

export default App; 
