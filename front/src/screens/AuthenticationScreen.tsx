import React, {useState} from 'react';
import NavigationBar from '../components/NavBarComponent';
import LoginComponent, {LoginFormData} from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import {
  faGoogle,
  faTwitter,
  faDiscord,
  faGithub,
  faFacebook,
  faMeta,
  faInstagram,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';
import SocialButton from '../components/common/SocialButton';
import './AuthenticationScreen.css';

function AuthenticationContainer(): React.JSX.Element {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  async function tryLogin(data: LoginFormData) {
    try {
      const response = await axios.post('/api/auth/login', data);
      const token = response.data.token;

      Cookies.set('token', token);
      navigate('/profile');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  function renderSwitchButton(): React.JSX.Element {
    const hintText: string = login ? 'Don\'t have an account?' : 'Already have an account?';
    const buttonText: string = login ? 'Login' : 'Signup';

    return (
      <p className={'toggleText'}>{hintText}
        <span className={'toggleLink'} onClick={() => setLogin(!login)}>{buttonText}</span>
      </p>
    );
  }

  return (
    <div>
      {login ? (<LoginComponent callback={tryLogin}/>) : (<RegisterComponent/>)}
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
          <SocialButton text={'Continue with Facebook'} color={'#1877f2'} border={false} icon={faFacebook}
                        redirectPath={'/api/auth/facebook'}/>
          <SocialButton text={'Continue with Meta'} color={'#1877f2'} border={false} icon={faMeta}
                        redirectPath={'/api/auth/meta'}/>
          <SocialButton text={'Continue with Instagram'}
                        color={'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'}
                        border={false} icon={faInstagram} redirectPath={'/api/auth/instagram'}/>
          <SocialButton text={'Continue with Microsoft'} color={'#ea4300'} border={false} icon={faMicrosoft}
                        redirectPath={'/api/auth/microsoft'}/>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationScreen;
