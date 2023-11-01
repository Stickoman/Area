import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import './NotFoundScreen.css';

function MaintenanceScreen(): React.JSX.Element {
  return (
    <div>
      <NavigationBar color={'#ff4757'}/>

      <div className={'not-found-container'}>
        <h1>Application under maintenance!</h1>
        <p>Oops! The server cannot be fetched.</p>
      </div>
    </div>
  );
}

export default MaintenanceScreen;
