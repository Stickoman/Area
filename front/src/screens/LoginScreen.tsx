import React, {CSSProperties, useEffect} from 'react';
import NavigationBar from '../components/NavBarComponent';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginScreen(): React.JSX.Element {
  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const titleStyle: CSSProperties = {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
  };

  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search);
  const jwt: string = queryParameters.get('jwt');
  const name: string = queryParameters.get('name');

  useEffect(() => {
    Cookies.set('token', jwt);

    setTimeout(() => {
      navigate('/profile');
    }, 3000);
  }, [jwt]);

  return (
    <div>
      <NavigationBar color={'purple'}/>

      <div style={wrapperStyle}>
        <h6 style={titleStyle}>Welcome Back {name}</h6>

        <p>Please wait while redirecting...</p>
      </div>
    </div>
  );
}

export default LoginScreen;
