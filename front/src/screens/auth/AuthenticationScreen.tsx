import React, {useState} from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import LoginComponent, {ILoginFormData} from '../../components/LoginComponent';
import RegisterComponent, {IRegisterFormData} from '../../components/RegisterComponent';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import {
  faGoogle,
  faTwitter,
  faDiscord,
  faGithub,
  faFacebook,
  faReddit,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';
import SocialButton from '../../components/common/SocialButton';
import './AuthenticationScreen.css';

function AuthenticationContainer(): React.JSX.Element {
  const [error, setError] = useState(null as string);
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  function navigateToCallback() {
    const queryParameters = new URLSearchParams(window.location.search);

    if (queryParameters.has('callback'))
      window.location.href = queryParameters.get('callback');
    else
      navigate('/profile');
  }

  async function tryLogin(data: ILoginFormData) {
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', data);
      const token = response?.data.token;

      if (token) {
        Cookies.set('token', token);
        navigateToCallback();
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Unable to retrieve server data');
    }
  }

  async function tryRegister(data: IRegisterFormData) {
    setError(null);
    try {
      await axios.post('/api/auth/register', data);
      const response = await axios.post('/api/auth/login', data);
      const token = response.data.token;

      Cookies.set('token', token);
      navigateToCallback();
    } catch (error) {
      console.error('Error register in:', error);
    }
  }

  function renderSwitchButton(): React.JSX.Element {
    const hintText: string = login ? 'Don\'t have an account?' : 'Already have an account?';
    const buttonText: string = login ? 'Signup' : 'Login';

    return (
      <p className={'toggleText'}>{hintText}
        <span className={'toggleLink'}
              onClick={() => setLogin(!login)}
              onKeyDown={() => setLogin(!login)}>
          {buttonText}
        </span>
      </p>
    );
  }

  return (
    <div>
      {login ? (<LoginComponent callback={tryLogin}/>) : (<RegisterComponent callback={tryRegister}/>)}
      {error && <p style={{textAlign: 'center', color: '#f33', fontWeight: 'bold', fontSize: '20px'}}>{error}</p>}

      <div className="toggleContainer">
        {renderSwitchButton()}
      </div>
    </div>
  );
}

function AuthenticationScreen(): React.JSX.Element {
  return (
    <div>
      <NavigationBar color={'#000'}/>
      <AuthenticationContainer/>

      <div className={'socials-container'}>
        <div className={'column'}>
          <SocialButton text={'Continue with Google'} color={'#db4a39'} border={true} icon={faGoogle}
                        redirectPath={'/api/auth/google'}/>
          <SocialButton text={'Continue with Twitter'} color={'#1da1f2'} border={false} icon={faTwitter}
                        redirectPath={'/api/auth/twitter'}/>
          <SocialButton text={'Continue with Discord'} color={'#7289da'} border={false} icon={faDiscord}
                        redirectPath={'/api/auth/discord'}/>
          <SocialButton text={'Continue with Github'} color={'#333333'} border={false} icon={faGithub}
                        redirectPath={'/api/auth/github'}/>
        </div>
        <div className={'column'}>
          <SocialButton text={'Continue with Reddit'} color={'#FF5536FF'} border={false} icon={faReddit}
                        redirectPath={'/api/auth/reddit'}/>
          <SocialButton text={'Continue with Facebook'} color={'#1877f2'} border={false} icon={faFacebook}
                        redirectPath={'/api/auth/facebook'}/>
          <SocialButton text={'Continue with Microsoft'} color={'#ea4300'} border={false} icon={faMicrosoft}
                        redirectPath={'/api/auth/microsoft'}/>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationScreen;
