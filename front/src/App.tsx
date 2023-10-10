import * as React from 'react';

import {
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import ServicesScreen from './screens/ServicesScreen';
import TwitterScreen from './screens/TwitterScreen';
import LoginScreen from './screens/LoginScreen';

const router = createHashRouter([
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
    path: '/authentication',
    element: <AuthenticationScreen/>,
  },
  {
    path: '/services',
    element: <ServicesScreen/>,
  },
  {
    path: '/twitter',
    element: <TwitterScreen/>,
  },
  {
    path: '/login',
    element: <LoginScreen/>,
  }
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
