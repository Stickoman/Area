import {FlowProps} from '../../common/flow';
import axios from 'axios';
import React, {CSSProperties} from 'react';

function Callback(props: FlowProps): React.JSX.Element {
  const titleStyle: CSSProperties = {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  };

  const buttonStyle: CSSProperties = {
    margin: 10,
    padding: 10,
    width: '100%',
    background: 'black',
    color: 'white',
    fontWeight: 'bolder',
    border: '1px solid black',
    borderRadius: 10,
    cursor: 'pointer',
  };

  const {flow, id, refreshFlow} = props;

  return (
    <div style={{textAlign: 'center'}}>
      <p style={titleStyle}>Welcome Back {flow.userName}!</p>
      <p>This {flow.service} account is not associated with any account.</p>
      <p>Please log-in or register!</p>

      <button onClick={() => {
        axios.post(`/api/oauth/next?id=${id}`, {data: 'login'})
          .then(() => refreshFlow())
          .catch(reason => console.error(reason.message));
      }} style={buttonStyle}>Login
      </button>
      <button onClick={() => {
        axios.post(`/api/oauth/next?id=${id}`, {data: 'register'})
          .then(() => refreshFlow())
          .catch(reason => console.error(reason.message));
      }} style={buttonStyle}>Register
      </button>
    </div>
  );
}

export default Callback;
