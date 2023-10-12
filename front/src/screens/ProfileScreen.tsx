import React, {CSSProperties, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import NavigationBar, {checkIfUserIsLoggedIn} from '../components/NavBarComponent';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

interface IProfile {
  email: string;
  firstName: string;
  lastName: string;
  twitterId?: string;
}

function ProfileScreen() {
  const navigate = useNavigate();
  const buttonContainerStyle: CSSProperties = {
    margin: 'auto',
  };

  const [profile, setProfile] = useState(null as IProfile);

  async function updateUserData() {
    const response = await axios.get('/api/me', {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
    });

    setProfile(response.data);
  }

  useEffect(() => {
    updateUserData()
      .catch(reason => console.warn(reason));
  }, []);

  function goToUpdate() {
    navigate('/profile/update');
  }

  async function logout() {
    const isLoggedIn = checkIfUserIsLoggedIn();
    if (!isLoggedIn) {
      navigate('/authentication');
      return;
    }
    await axios.post('/api/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
    })
      .catch(reason => {
        console.warn('Unable to logout: ', reason);
      })
      .finally(() => {
        Cookies.remove('token');
        navigate('/authentication');
      });
  }

  if (profile === null) {
    return (
      <div>
        <NavigationBar color={'purple'}/>
        <h6>Profile</h6>

        <p>Loading...</p>
      </div>
    )
  } else {
    return (
      <div>
        <NavigationBar color={'purple'}/>
        <h6>Profile</h6>
        <div style={buttonContainerStyle} className={'buttonContainerStyle'}>
          <p>Email: {profile.email}</p>

          {profile.twitterId && <p>Twitter Associated! <span style={{cursor: 'pointer'}} onClick={async () => {
            await axios.post('/api/auth/twitter/disassociate', {}, {
              headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
              },
            })
              .then(() => navigate('/profile'));
          }}>Click here to disassociate</span></p>}
          <button type="submit" onClick={goToUpdate} className="buttonStyle">Modify your profile</button>
          <button type="submit" onClick={logout} className="buttonStyle">Logout</button>
        </div>
      </div>
    );
  }
}

export default ProfileScreen;
