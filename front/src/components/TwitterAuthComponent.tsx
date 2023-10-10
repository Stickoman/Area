import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import '../index.css'
import {CSSProperties} from 'react';

function handleTwitterLogin() {
  window.location.href = 'http://localhost:8080/api/auth/twitter';
}

function twitterAuthComponent() {
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleTwitterLogin} className={'twitterButtonStyle'}>
        <FontAwesomeIcon icon={faTwitter}/>
        <span style={{marginLeft: '10px'}}>Continue with Twitter</span>
      </button>
    </div>
  )
}
export default twitterAuthComponent;

