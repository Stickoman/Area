import React, {CSSProperties, useEffect, useState} from 'react';
import NavigationBar from '../components/common/NavigationBar';
import axios from 'axios';
import StepBar from '../components/oauth/StepBar';
import {FlowData, serviceColor} from '../common/flow';
import Callback from '../components/oauth/Callback';
import Connection from '../components/oauth/Connection';
import Finish from '../components/oauth/Finish';

function OAuthScreen(): React.JSX.Element {
  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  };

  const errorStyle: CSSProperties = {
    color: 'red',
    textAlign: 'center',
  };

  const queryParameters = new URLSearchParams(window.location.search);
  const id: string = queryParameters.get('id');
  const [flow, setFlow] = useState(null as FlowData);
  const [loading, setLoading] = useState(true);

  function refreshFlow() {
    axios.get(`/api/oauth?id=${id}`)
      .then(response => setFlow(response.data))
      .catch(reason => console.error(reason.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    refreshFlow();
  }, [id]);

  return (
    <div>
      <NavigationBar color={flow ? serviceColor.get(flow.service) : 'black'}/>

      <div style={wrapperStyle}>
        <h1>OAuth Connection Flow</h1>
        {flow && <StepBar flow={flow} id={id} refreshFlow={refreshFlow}/>}

        {flow?.step === 0 && <Callback flow={flow} id={id} refreshFlow={refreshFlow}/>}
        {flow?.step === 1 && <Connection flow={flow} id={id} refreshFlow={refreshFlow}/>}
        {flow?.step === 2 && <Finish flow={flow} id={id} refreshFlow={refreshFlow}/>}
        {!loading && !flow && <p style={errorStyle}>Unable to retrieve flow. Please restart authentication</p>}
      </div>
    </div>
  );
}

export default OAuthScreen;
