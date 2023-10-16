import React, {useState} from 'react';
import NavigationBar from '../components/NavBarComponent';
import LoginComponent, {LoginFormData} from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import GoogleAuthComponent from '../components/GoogleAuthComponent';
import TwitterAuthComponent from '../components/TwitterAuthButton';
import FacebookAuthComponent from '../components/FacebookAuthComponent';
import GithubAuthComponent from '../components/GithubAuthComponent';
import MetaAuthComponent from '../components/MetaAuthComponent';
import MicrosoftAuthComponent from '../components/MicrosoftAuthComponent';
import InstagramAuthComponent from '../components/InstagramAuthComponent';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import DiscordAuthComponent from '../components/DiscordAuthComponent';

function AuthenticationScreen() {
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

  return (
    <div>
      <NavigationBar color={'#000'}/>
      {login ? (<LoginComponent callback={tryLogin}/>) : (<RegisterComponent/>)}
      <div className="toggleContainer">
        {login ? (
          <p className="toggleText">Don't have an account? <span className="toggleLink"
                                                                 onClick={() => setLogin(false)}>Signup</span></p>
        ) : (
          <p className="toggleText">Already have an account? <span className="toggleLink"
                                                                   onClick={() => setLogin(true)}>Login</span></p>
        )}
      </div>

      <GoogleAuthComponent/>
      <TwitterAuthComponent text={'Continue with Twitter'}
                            onClick={() => window.location.href = 'http://localhost:8080/api/auth/twitter'}/>
      <DiscordAuthComponent/>
      <GithubAuthComponent/>
      <FacebookAuthComponent/>
      <MetaAuthComponent/>
      <InstagramAuthComponent/>
      <MicrosoftAuthComponent/>
    </div>
  );
}

export default AuthenticationScreen;
