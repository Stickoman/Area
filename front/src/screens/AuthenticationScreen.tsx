import React, {useState} from 'react';
import NavigationBar from '../components/NavBarComponent';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';

function AuthenticationScreen() {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <NavigationBar/>
      {login ? (<LoginComponent/>) : (<RegisterComponent/>)}
      <div className="toggleContainer">
        {login ? (
          <p className="toggleText">Don't have an account? <span className="toggleLink" onClick={() => setLogin(false)}>Signup</span></p>
        ) : (
          <p className="toggleText">Already have an account? <span className="toggleLink" onClick={() => setLogin(true)}>Login</span></p>
        )}
      </div>
    </div>
  );
}

export default AuthenticationScreen;
