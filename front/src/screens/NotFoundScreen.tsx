import React from 'react';
import {useNavigate} from 'react-router-dom';

import './NotFoundScreen.css';
import NavigationBar from '../components/NavBarComponent';

function NotFoundScreen(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <NavigationBar color={'#ff4757'}/>

      <div className={'not-found-container'}>
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <a onClick={() => navigate('/')}>Go Home</a>
      </div>
    </div>
  );
}

export default NotFoundScreen;
