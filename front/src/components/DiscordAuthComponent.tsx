import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDiscord} from '@fortawesome/free-brands-svg-icons';
import '../index.css'
import {CSSProperties} from 'react';

function handleDiscordLogin() {
  window.location.href = 'http://localhost:8080/api/auth/discord';
}

function DiscordAuthComponent() {
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleDiscordLogin} className={'twitterButtonStyle'}>
        <FontAwesomeIcon icon={faDiscord}/>
        <span style={{marginLeft: '10px'}}>Continue with Discord</span>
      </button>
    </div>
  )
}
export default DiscordAuthComponent;

