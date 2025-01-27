import './App.css'
import {
   RouterProvider, createBrowserRouter
   } from 'react-router-dom';

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'

import Preferences from './features/preferences/Preferences'
import { action as logoutAction } from './features/user/Logout';

import RootLayout from './screens/Root';
import ErrorPage from './screens/Error';
import {checkAuthLoader } from './Utils/auth';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeScreen />,
        loader: checkAuthLoader, 
       },
      { path: '/', element: <HomeScreen /> },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      { path: 'register', element: <RegisterScreen /> },
      { path: 'user-preferences', element: <Preferences />,
        loader: checkAuthLoader, 
       },   
       {
        path: 'logout',
        element: null,
        action: logoutAction,
       }
      
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;