import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMicrosoft} from '@fortawesome/free-brands-svg-icons';
import '../index.css'
import {CSSProperties} from 'react';

function handleMicrosoftLogin() {
  window.location.href = 'http://localhost:8080/api/auth/microsoft';
}

function MicrosoftAuthComponent() {
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '5px',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleMicrosoftLogin} className={'microsoftButtonStyle'}>
        <FontAwesomeIcon icon={faMicrosoft}/>
        <span style={{marginLeft: '10px'}}>Continue with Microsoft</span>
      </button>
    </div>
  )
}
export default MicrosoftAuthComponent;

