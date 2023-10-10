import React from 'react';
import {FlowProps} from '../../common/flow';
import axios from 'axios';
import LoginComponent, {LoginFormData} from '../LoginComponent';
import RegisterComponent from '../RegisterComponent';
import Cookies from 'js-cookie';

const loginProcess = async (data: LoginFormData, props: FlowProps) => {
  const {id, refreshFlow} = props;

  try {
    const response = await axios.post('/api/auth/login', data);
    const token = response.data.token;

    axios.post(`/api/oauth/associate?id=${id}`, {}, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    }).then(() => {
      Cookies.set('token', token);
      axios.post(`/api/oauth/next?id=${id}`)
        .then(() => refreshFlow())
        .catch(reason => console.error(reason.message));
    }).catch(reason => console.error(reason.message));
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

function Connection(props: FlowProps): React.JSX.Element {
  const {id, flow, refreshFlow} = props;

  if (!flow.connectionType) {
    axios.post(`/api/oauth/back?id=${id}`)
      .then(() => refreshFlow())
      .catch(reason => console.error(reason.message));
  }

  if (flow.connectionType === 'login')
    return (<LoginComponent callback={(data) => loginProcess(data, props)}/>);
  if (flow.connectionType === 'register')
    return (<RegisterComponent/>);
}

export default Connection;
