import React from 'react';
import Cookies from 'js-cookie';
import NavigationBar from '../components/NavBarComponent';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function ProfileScreen() {
  const navigate = useNavigate();
  const buttonContainerStyle = {
    maxWidth: '500px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    borderRadius: '8px',
  };

  async function logout() {
    try {
      const response = await axios.post('/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      if (response.status === 200) {
        Cookies.remove('token');
        navigate('/authentication');
      } else {
        throw new Error('Erreur lors de la déconnexion');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <NavigationBar/>
      <h6>Profile</h6>
      <div style={buttonContainerStyle}>
        <button type="submit" onClick={logout} className="buttonStyle">Logout</button>
      </div>
    </div>
  );
}
export default ProfileScreen;
