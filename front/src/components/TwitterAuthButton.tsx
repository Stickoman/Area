import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import '../index.css';
import React, {CSSProperties} from 'react';

interface TwitterAuthButtonProperties {
  text: string;
  onClick: () => void;
}

function TwitterAuthButton(props: TwitterAuthButtonProperties): React.JSX.Element {
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: '10px auto 10px auto',
    borderRadius: '8px',
  };
  const {text, onClick} = props;

  return (
    <div style={containerStyle}>
      <button onClick={onClick} className={'twitterButtonStyle'}>
        <FontAwesomeIcon icon={faTwitter}/>
        <span style={{marginLeft: '10px'}}>{text}</span>
      </button>
    </div>
  );
}

export default TwitterAuthButton;

