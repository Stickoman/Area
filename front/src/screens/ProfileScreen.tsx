import React, {CSSProperties} from 'react';
import Cookies from 'js-cookie';
import NavigationBar, {checkIfUserIsLoggedIn} from '../components/NavBarComponent';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function ProfileScreen() {
  const navigate = useNavigate();
  const buttonContainerStyle: CSSProperties = {
    margin: 'auto',
  };

  async function logout() {
    const isLoggedIn = checkIfUserIsLoggedIn();
    if (!isLoggedIn) {
      navigate('/authentication');
      return;
    }
    try {
      const response = await axios.post('/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      });
      if (response.status === 200) {
        Cookies.remove('token');
        navigate('/authentication');
      } else {
        throw new Error('Erreur lors de la déconnexion');
      }
    } catch (error) {
      console.error(error);
      navigate('/authentication');
    }
  }

  return (
    <div>
      <NavigationBar color={'yellow'}/>
      <h6>Profile</h6>
      <div style={buttonContainerStyle} className={'buttonContainerStyle'}>
        <button type="submit" onClick={logout} className="buttonStyle">Logout</button>
      </div>
    </div>
  );
}
export default ProfileScreen;
