import Axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import '../index.css'
import {CSSProperties} from 'react';

function handleGoogleLogin() {
  Axios.post('api/auth/google', {
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}
function GoogleAuthComponent() {
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px',
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

