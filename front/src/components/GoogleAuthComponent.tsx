import Axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import '../index.css'
import {CSSProperties} from 'react';

function handleGoogleLogin() {
  window.location.href = 'http://localhost:8080/api/auth/google';
}
function GoogleAuthComponent() {
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    padding: '5px',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGoogleLogin} className={'googleButtonStyle'}>
        <FontAwesomeIcon icon={faGoogle}/>
        <span style={{marginLeft: '10px'}}>Continue with Google</span>
      </button>
    </div>
  )
}
export default GoogleAuthComponent;

