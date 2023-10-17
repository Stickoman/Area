import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import '../index.css'
import {CSSProperties} from 'react';

function handleInstagramLogin() {
  window.location.href = 'http://localhost:8080/api/auth/instagram';
}

function InstagramAuthComponent() {
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '5px',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleInstagramLogin} className={'instagramButtonStyle'}>
        <FontAwesomeIcon icon={faInstagram}/>
        <span style={{marginLeft: '10px'}}>Continue with Instagram</span>
      </button>
    </div>
  )
}
export default InstagramAuthComponent;

