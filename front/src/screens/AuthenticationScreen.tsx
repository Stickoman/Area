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
      <div>
        {login ? (<p>Don't have an account?</p>) : (<p>Already have an account?</p>)}
        {login ? (<div onClick={() => setLogin(false)}>Signup</div>) : (<div onClick={() => setLogin(true)}>Login</div>)}
      </div>
    </div>
  );
}

export default AuthenticationScreen;
