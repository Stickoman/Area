import React, {CSSProperties} from 'react';
import NavigationBar, {checkIfUserIsLoggedIn} from '../components/common/NavigationBar';
import {useNavigate} from 'react-router-dom';
import '../index.css';

function HomeScreen() {
  const isLoggedIn = checkIfUserIsLoggedIn();
  const navigate = useNavigate();

  const buttonContainerStyle: CSSProperties = {
    margin: 'auto',
  };

  const containerStyle: CSSProperties = {
    textAlign: 'center',
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
        <h1 style={titleStyle}>Simplify Your Digital Life with Joe Solutions</h1>
        <p style={paragraphStyle}>Joe Solutions is a company specialized in developing automation platforms to simplify the management of
          digital life. Our software suite allows users to connect and automate various online services such as social
          media, messaging platforms, file storage, and much more.</p>
        <div style={buttonContainerStyle} className={'buttonContainerStyle'}>
          <button className={'buttonStyle'} onClick={() => {
            navigate(!isLoggedIn ? '/authentication' : '/profile');
          }}>Get Started
          </button>
        </div>
      </div>
      <div>
        <h1 style={titleStyle}>Get every thing working better together</h1>
        <p style={paragraphStyle}>Discover all of the Services that Joe Solutions supports.</p>
        <div style={buttonContainerStyle} className={'buttonContainerStyle'}>
          <button className={'buttonStyle'} onClick={() => {
            navigate('/services');
          }}>Discover Services
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
