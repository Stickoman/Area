import React from 'react';
import {useNavigate} from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';
import ServiceAreaCreation from '../../components/service/ServiceAreaCreation';
import {ServiceType} from '../../common/service';

function ServiceAreaScreen(): React.JSX.Element {
  const queryParameters = new URLSearchParams(window.location.search);
  const actionService = queryParameters.get('actionService');
  const actionTask = queryParameters.get('actionTask');
  const reactionService = queryParameters.get('reactionService');
  const reactionTask = queryParameters.get('reactionTask');
  const navigate = useNavigate();

  if (!actionService || !actionTask || !reactionService || !reactionTask)
    navigate('/services');

  return (
    <div>
      <NavigationBar color={'#000'}/>

      <h1 style={{textAlign: 'center', marginTop: '40px'}}>Setup New AREA</h1>

      <ServiceAreaCreation actionService={actionService as ServiceType}
                           actionTask={actionTask}
                           reactionService={reactionService as ServiceType}
                           reactionTask={reactionTask}/>
    </div>
  );
}

export default ServiceAreaScreen;
