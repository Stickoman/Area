import React, {useState} from 'react';
import NavigationBar, {checkIfUserIsLoggedIn} from '../components/NavBarComponent';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import GoogleAuthComponent from '../components/GoogleAuthComponent';
import TwitterAuthComponent from '../components/TwitterAuthComponent';
import FacebookAuthComponent from '../components/FacebookAuthComponent';

function AuthenticationScreen() {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <NavigationBar color={'#000'}/>
      {login ? (<LoginComponent/>) : (<RegisterComponent/>)}
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
