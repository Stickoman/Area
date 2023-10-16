import React, {CSSProperties, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import NavigationBar from '../components/NavBarComponent';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ProfileComponent from '../components/profile/ProfileComponent';
import {disassociateTwitter, disassociateDiscord, getAuthorizedHeader, logout} from '../common/auth';

interface IProfile {
  email: string;
  firstName: string;
  lastName: string;
  twitterId?: string;
  discordId?: string;
}

interface ProfileContentProperties {
  profile: IProfile;
}

function ProfileContent(props: ProfileContentProperties): React.JSX.Element {
  const {profile} = props;
  const navigate = useNavigate();

  if (profile === null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div>
      <ProfileComponent user={profile}/>

      {
        profile.twitterId && (
          <div>
            <p>Twitter Associated!</p>
            <span style={{cursor: 'pointer'}} onClick={disassociateTwitter}>Click here to disassociate</span>
          </div>
        )
      }
      {
        profile.discordId && (
          <div>
            <p>Discord Associated!</p>
            <span style={{cursor: 'pointer'}} onClick={disassociateDiscord}>Click here to disassociate</span>
          </div>
        )
      }
      <button type="submit" onClick={() => logout(navigate)} className="buttonStyle">Logout</button>
      </div>
    );
  }
}

function ProfileScreen(): React.JSX.Element {
  const titleStyle: CSSProperties = {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  };
  const profileContainerStyle: CSSProperties = {
    margin: 'auto',
    width: '35%',
    height: '70%',
  };

  const [profile, setProfile] = useState(null as IProfile);

  async function updateUserData() {
    const response = await axios.get('/api/me', {
      headers: getAuthorizedHeader(),
    });

    setProfile(response.data);
  }

  useEffect(() => {
    updateUserData()
      .catch(reason => console.warn(reason));
  }, []);

  return (
    <div>
      <NavigationBar color={'purple'}/>

      <div>
        <h6 style={titleStyle}>Profile</h6>

        <div style={profileContainerStyle}>
          <ProfileContent profile={profile}/>
        </div>
      </div>
    </div>
  );
}

export type {IProfile};
export default ProfileScreen;
