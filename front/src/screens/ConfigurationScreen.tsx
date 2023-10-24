import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import AreasContainer from '../components/configuration/AreasContainer';

function ConfigurationScreen(): React.JSX.Element {
  return (
    <div>
      <NavigationBar color={'#000000'}/>

      <AreasContainer/>
    </div>
  );
}

export default ConfigurationScreen;
