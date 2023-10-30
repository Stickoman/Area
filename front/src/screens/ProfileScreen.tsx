import React, {CSSProperties, useEffect, useState} from 'react';
import NavigationBar from '../components/common/NavigationBar';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ProfileComponent from '../components/profile/ProfileComponent';
import DisassociateComponent from '../components/oauth/DisassociateComponent';
import {
  disassociateDiscord, disassociateTwitter,
  getAuthorizedHeader,
  logout,
  disassociateGithub, disassociateGoogle, disassociateReddit,
} from '../common/auth';
import {faDiscord, faGithub, faGoogle, faTwitter, faReddit} from '@fortawesome/free-brands-svg-icons';
import './ProfileScreen.css';

interface IProfile {
  email: string;
  firstName: string;
  lastName: string;
  twitterId?: string;
  discordId?: string;
  githubId?: string;
  googleId?: string;
  googleEmail?: string
  redditId?: string;
}

interface ProfileContentProperties {
  profile: IProfile;
}

function ProfileContent(props: ProfileContentProperties): React.JSX.Element {
  const {profile} = props;
  const navigate = useNavigate();

  async function sendEmail() {
    try {
      await axios.post('/api/services/email', {subject:"tktmongars", message:"zebi test", email:"thomas.joan.pl@gmail.com"}, {headers: getAuthorizedHeader()});
      return await Promise.resolve();
    } catch (reason) {
      throw new Error('Unable to update profile: ' + reason);
    }
  }

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
        {
          profile.redditId && (
            <DisassociateComponent name={'Reddit'} handleClick={disassociateReddit} icon={faReddit}
                                   style={'redditButtonStyle'}/>)
        }

        {
          profile.googleEmail && (
            <DisassociateComponent name={'send Email'} handleClick={() => {try {
              alert(sendEmail());
            }catch (e) {
              alert(e);
            }}
            } icon={faGoogle}
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
    minHeight: '70%',
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
        <h6 style={titleStyle}>My Profile</h6>

        <div style={profileContainerStyle} className={'profile-container'}>
          <ProfileContent profile={profile}/>
        </div>
      </div>
    </div>
  );
}

export type {IProfile};
export default ProfileScreen;
