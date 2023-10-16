import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import '../index.css'
import {CSSProperties} from 'react';

function handleGithubLogin() {
  window.location.href = 'http://localhost:8080/api/auth/github';
}

function GithubAuthComponent() {
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGithubLogin} className={'twitterButtonStyle'}>
        <FontAwesomeIcon icon={faGithub}/>
        <span style={{marginLeft: '10px'}}>Continue with Github</span>
      </button>
    </div>
  )
}
export default GithubAuthComponent;

