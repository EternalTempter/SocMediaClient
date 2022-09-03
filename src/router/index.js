import AuthorizePage from "../pages/AuthorizePage/AuthorizePage"
import HomePage from "../pages/HomePage/HomePage"
import MessagesPage from "../pages/MessagesPage/MessagesPage"
import RegistratePage from "../pages/RegistratePage/RegistratePage"

export const privateRoutes = [
    {path: '/', element: <HomePage/>},
    {path: '/messages', element: <MessagesPage/>}
]

export const publicRoutes = [
    {path: '/auth', element: <AuthorizePage/>},
    {path: '/registrate', element: <RegistratePage/>}
]