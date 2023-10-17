import Axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import '../index.css'
import {CSSProperties} from 'react';

function handleFacebookLogin() {
  Axios.post('api/auth/facebook', {
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}
function facebookAuthComponent() {
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
      <button onClick={handleFacebookLogin} className={'facebookButtonStyle'}>
        <FontAwesomeIcon icon={faFacebook}/>
        <span style={{marginLeft: '10px'}}>Continue with Facebook</span>
      </button>
    </div>
  )
}
export default facebookAuthComponent;

