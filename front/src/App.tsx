import * as React from 'react';

import {
  RouterProvider, createBrowserRouter,
} from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import ServicesScreen from './screens/ServicesScreen';
import TwitterCallbackScreen from './screens/TwitterCallbackScreen';
import LoginScreen from './screens/LoginScreen';

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
    path: '/authentication',
    element: <AuthenticationScreen/>,
  },
  {
    path: '/services',
    element: <ServicesScreen/>,
  },
  {
    path: '/twitterCallback',
    element: <TwitterCallbackScreen/>,
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
