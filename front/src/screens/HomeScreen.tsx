import React from 'react';
import NavigationBar, {checkIfUserIsLoggedIn} from '../components/NavBarComponent';
import '../index.css'
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import {useNavigate} from 'react-router-dom';
function HomeScreen() {
  const isLoggedIn = checkIfUserIsLoggedIn();
  const navigate = useNavigate();
  return (
    <div>
      <NavigationBar color={'#333'}/>
      <div>
        <button className={'buttonStyle'} onClick={ () => {
          navigate(!isLoggedIn ? '/authentication' : '/profile');
        }}>Get Started</button>
      </div>
    </div>
  );
}

export default HomeScreen;
