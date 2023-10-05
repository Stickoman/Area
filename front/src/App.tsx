import * as React from 'react';

import {
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import NavigationBar from './components/NavBarComponent';
import ServicesScreen from './screens/ServicesScreen';

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
