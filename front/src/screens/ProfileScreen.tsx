import React, {CSSProperties, useEffect, useState} from 'react';
import NavigationBar from '../components/NavBarComponent';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ProfileComponent from '../components/profile/ProfileComponent';
import DisassociateComponent from '../components/oauth/DisassociateComponent';
import {
  disassociateDiscord, disassociateTwitter,
  getAuthorizedHeader,
  logout,
  disassociateGithub, disassociateGoogle,
} from '../common/auth';
import {faDiscord, faGithub, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons';

interface IProfile {
  email: string;
  firstName: string;
  lastName: string;
  twitterId?: string;
  discordId?: string;
  githubId?: string;
  googleId?: string;
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
            <DisassociateComponent name={'Twitter'} handleClick={disassociateTwitter} icon={faTwitter}
                                   style={'twitterButtonStyle'}/>)
        }{
        profile.discordId && (
          <DisassociateComponent name={'Discord'} handleClick={disassociateDiscord} icon={faDiscord}
                                 style={'discordButtonStyle'}/>)
      }{
        profile.githubId && (
          <DisassociateComponent name={'Github'} handleClick={disassociateGithub} icon={faGithub}
                                 style={'githubButtonStyle'}/>)
      }{
        profile.googleId && (
          <DisassociateComponent name={'Google'} handleClick={disassociateGoogle} icon={faGoogle}
                                 style={'googleButtonStyle'}/>)
      }
        <button type="submit" onClick={() => logout(navigate)} className="buttonStyle" style={{
          marginTop: '10px',
          marginBottom: '10px',
        }}>Logout
        </button>
      </div>
    );
  }
}

function ProfileScreen(): React.JSX.Element {
  const titleStyle: CSSProperties = {
    margin: '25px 0',
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
