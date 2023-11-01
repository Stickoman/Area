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
  disassociateGithub, disassociateGoogle, disassociateReddit, disassociateMicrosoft, disassociateFacebook,
} from '../common/auth';
import {
  faDiscord,
  faGithub,
  faGoogle,
  faTwitter,
  faReddit,
  faMicrosoft,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import {deleteAccount} from '../common/profile';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import SocialButton from '../components/common/SocialButton';
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
  microsoftId?: string;
  facebookId?: string;
}

type ServiceId = 'twitterId' | 'discordId' | 'githubId' | 'googleId' | 'redditId' | 'microsoftId' | 'facebookId';

interface ProfileContentProperties {
  profile: IProfile;
}

interface IServiceData {
  id: ServiceId;
  name: string;
  color: string;
  icon: IconProp;
  class: string;
  associatePath: string;
  disassociate: () => void;
}

const SERVICES_OAUTH: IServiceData[] = [
  {
    id: 'twitterId',
    name: 'Twitter',
    color: '#1da1f2',
    icon: faTwitter,
    class: 'twitterButtonStyle',
    associatePath: '/api/auth/twitter',
    disassociate: disassociateTwitter,
  },
  {
    id: 'discordId',
    name: 'Discord',
    color: '#7289da',
    icon: faDiscord,
    class: 'discordButtonStyle',
    associatePath: '/api/auth/discord',
    disassociate: disassociateDiscord,
  },
  {
    id: 'githubId',
    name: 'Github',
    color: '#333333',
    icon: faGithub,
    class: 'githubButtonStyle',
    associatePath: '/api/auth/github',
    disassociate: disassociateGithub,
  },
  {
    id: 'googleId',
    name: 'Google',
    color: '#db4a39ff',
    icon: faGoogle,
    class: 'googleButtonStyle',
    associatePath: '/api/auth/google',
    disassociate: disassociateGoogle,
  },
  {
    id: 'redditId',
    name: 'Reddit',
    color: '#FF5700',
    icon: faReddit,
    class: 'redditButtonStyle',
    associatePath: '/api/auth/reddit',
    disassociate: disassociateReddit,
  },
  {
    id: 'microsoftId',
    name: 'Microsoft',
    color: '#ea4300',
    icon: faMicrosoft,
    class: 'microsoftButtonStyle',
    associatePath: '/api/auth/microsoft',
    disassociate: disassociateMicrosoft,
  },
  {
    id: 'facebookId',
    name: 'Facebook',
    color: '#1877f2',
    icon: faFacebook,
    class: 'facebookButtonStyle',
    associatePath: '/api/auth/facebook',
    disassociate: disassociateFacebook,
  },
];

function ProfileContent(props: ProfileContentProperties): React.JSX.Element {
  const {profile} = props;
  const navigate = useNavigate();

  function renderServiceButtons(): React.JSX.Element[] {
    return SERVICES_OAUTH.map(service => {
      if (profile[service.id]) {
        return <DisassociateComponent key={service.name}
                                      name={service.name}
                                      handleClick={service.disassociate}
                                      icon={service.icon}
                                      style={service.class}/>;
      } else {
        return <SocialButton key={service.name}
                             text={`Associate ${service.name}`}
                             color={service.color}
                             border={service.name === 'Google'}
                             icon={service.icon}
                             redirectPath={service.associatePath}
                             profile={true}/>;
      }
    });
  }

  if (profile === null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    const buttonStyle: CSSProperties = {
      marginTop: '10px',
      marginBottom: '10px',
    };

    return (
      <div>
        <ProfileComponent user={profile}/>

        {profile &&
          <div className={'social-buttons'}>{renderServiceButtons()}</div>
        }

        <div className={'account-actions'}>
          <button type={'button'}
                  onClick={() => logout(navigate)}
                  className="buttonStyle"
                  style={buttonStyle}>
            Logout
          </button>

          <button type={'button'}
                  onClick={async () => await deleteAccount(navigate)}
                  className="buttonStyle"
                  style={{...buttonStyle, backgroundColor: '#f22'}}>
            Delete account
          </button>
        </div>
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

    setProfile(response?.data);
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
