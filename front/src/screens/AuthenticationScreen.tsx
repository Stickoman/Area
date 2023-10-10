import React, {useState} from 'react';
import NavigationBar from '../components/NavBarComponent';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import GoogleAuthComponent from '../components/GoogleAuthComponent';
import TwitterAuthComponent from '../components/TwitterAuthComponent';
import FacebookAuthComponent from '../components/FacebookAuthComponent';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

function AuthenticationScreen() {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      <NavigationBar color={'#000'}/>
      {login ? (<LoginComponent callback={async (data) => {
        try {
          const response = await axios.post('/api/auth/login', data);
          const token = response.data.token;

          Cookies.set('token', token);
          navigate('/profile');
        } catch (error) {
          console.error('Error logging in:', error);
        }
      }}/>) : (<RegisterComponent/>)}
      <div className="toggleContainer">
        {login ? (
          <p className="toggleText">Don't have an account? <span className="toggleLink" onClick={() => setLogin(false)}>Signup</span></p>
        ) : (
          <p className="toggleText">Already have an account? <span className="toggleLink" onClick={() => setLogin(true)}>Login</span></p>
        )}
      </div>
      <GoogleAuthComponent/>
      <TwitterAuthComponent/>
      <FacebookAuthComponent/>
    </div>
  );
}

export default AuthenticationScreen;
