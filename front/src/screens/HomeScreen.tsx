import React, {CSSProperties} from 'react';
import NavigationBar, {checkIfUserIsLoggedIn} from '../components/common/NavigationBar';
import {useNavigate} from 'react-router-dom';
import '../index.css';
import {SERVICE_ITEMS} from '../common/service';
import {capitalize} from '../common/utils';

function HomeScreen(): React.JSX.Element {
  const isLoggedIn = checkIfUserIsLoggedIn();
  const navigate = useNavigate();

  const buttonContainerStyle: CSSProperties = {
    margin: 'auto',
  };

  const containerStyle: CSSProperties = {
    textAlign: 'center',
    overflowX: 'hidden',
  };

  const subContainerStyle: CSSProperties = {
    padding: '8px',
  };

  const titleStyle: CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#333',
    textAlign: 'center',
  };

  const paragraphStyle: CSSProperties = {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#555',
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: '800px',
    padding: '0 15px',
  };

  return (
    <div style={containerStyle}>
      <NavigationBar color={'#000'}/>
      <div style={subContainerStyle}>
        <img alt={'Application logo'}
             src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDkQxZtfjjBT1kVJlrj0_2eZGZwEMLe_g30IIgzTrZCyF73Dm'}/>

        <h1 style={titleStyle}>Simplify Your Digital Life with AREA</h1>
        <p style={paragraphStyle}>Our goal is to develop an automation platform to simplify the management of
          digital life. Our software suite allows users to connect and automate various online services such as social
          media, messaging platforms, file storage, and much more.</p>
        <div style={buttonContainerStyle} className={'buttonContainerStyle'}>
          <button className={'buttonStyle'} onClick={() => navigate(!isLoggedIn ? '/authentication' : '/profile')}>
            Get Started
          </button>
        </div>
      </div>
      <div>
        <h1 style={titleStyle}>Get every thing working better together</h1>
        <p style={paragraphStyle}>Discover all of the Services that AREA supports.</p>

        <ul>
          {
            Array.from(SERVICE_ITEMS.values())
              .map(service => {
                const name = capitalize(service.name);
                const actions = service.actions.map(action => action.description);
                const reactions = service.reactions.map(action => action.description);

                return <p key={service.name} style={paragraphStyle}>
                  {name} - {[...actions, ...reactions].join(', ')}
                </p>;
              })
          }
        </ul>

        <div style={buttonContainerStyle} className={'buttonContainerStyle'}>
          <button className={'buttonStyle'} onClick={() => navigate('/services')}>
            Discover Services
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
