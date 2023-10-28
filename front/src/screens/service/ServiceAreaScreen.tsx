import React from 'react';
import {useNavigate} from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';

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

      <h1>Setup new AREA</h1>

      <p>{actionService}</p>
      <p>{actionTask}</p>
      <p>{reactionService}</p>
      <p>{reactionTask}</p>
    </div>
  );
}

export default ServiceAreaScreen;
