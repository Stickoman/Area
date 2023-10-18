import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMeta} from '@fortawesome/free-brands-svg-icons';
import '../index.css'
import {CSSProperties} from 'react';

function handleMetaLogin() {
  window.location.href = 'http://localhost:8080/api/auth/meta';
}

function MetaAuthComponent() {
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '5px',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleMetaLogin} className={'metaButtonStyle'}>
        <FontAwesomeIcon icon={faMeta}/>
        <span style={{marginLeft: '10px'}}>Continue with Meta</span>
      </button>
    </div>
  )
}
export default MetaAuthComponent;

