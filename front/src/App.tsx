import * as React from 'react';

import {
  RouterProvider, createBrowserRouter,
} from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ServiceActionsScreen from './screens/service/ServiceActionsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthenticationScreen from './screens/auth/AuthenticationScreen';
import ServicesScreen from './screens/service/ServicesScreen';
import OAuthScreen from './screens/auth/OAuthScreen';
import LoginScreen from './screens/auth/LoginScreen';
import MobileDownloadScreen from './screens/MobileDownloadScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ConfigurationScreen from './screens/ConfigurationScreen';
import ServiceReactionsScreen from './screens/service/ServiceReactionsScreen';
import ServiceAreaScreen from './screens/service/ServiceAreaScreen';
import MaintenanceScreen from './screens/MaintenanceScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen/>,
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
    path: '/oauth',
    element: <OAuthScreen/>,
  },
  {
    path: '/login',
    element: <LoginScreen/>,
  },
  {
    path: '/client.apk',
    element: <MobileDownloadScreen/>,
  },
  {
    path: '/configuration',
    element: <ConfigurationScreen/>,
  },
  {
    path: '/services',
    element: <ServicesScreen mode={'actions'}/>,
  },
  {
    path: '/services/area',
    element: <ServiceAreaScreen/>,
  },
  {
    path: '/services/:service',
    element: <ServiceActionsScreen/>,
  },
  {
    path: '/services/:service/reactions',
    element: <ServicesScreen mode={'reactions'}/>,
  },
  {
    path: '/services/:actionService/reactions/:reactionService',
    element: <ServiceReactionsScreen/>,
  },
  {
    path: '/maintenance',
    element: <MaintenanceScreen/>,
  },
  {
    path: '*',
    element: <NotFoundScreen/>,
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
