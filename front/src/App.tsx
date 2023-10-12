import * as React from 'react';

import {
  RouterProvider, createBrowserRouter,
} from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import ServicesScreen from './screens/ServicesScreen';
import OAuthScreen from './screens/OAuthScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileUpdateScreen from './screens/ProfileUpdateScreen';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen/>,
  },
  {
    path: '/:service',
    element: <ServiceScreen/>,
  },
  {
    path: '/profile',
    element: <ProfileScreen/>,
  },
  {
    path: '/profile/update',
    element: <ProfileUpdateScreen/>,
  },
  {
    path: '/authentication',
    element: <AuthenticationScreen/>,
  },
  {
    path: '/services',
    element: <ServicesScreen/>,
  },
  {
    path: '/oauth',
    element: <OAuthScreen/>,
  },
  {
    path: '/login',
    element: <LoginScreen/>,
  },
]);

function App(): React.JSX.Element {
  return (
    <div>
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
    </div>
  );
}

export default App;
