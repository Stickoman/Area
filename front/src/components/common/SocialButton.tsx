import React, {CSSProperties} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import './SocialButton.css';

interface ISocialButtonProperties {
  text: string;
  color: string;
  border: boolean;
  icon: IconProp;
  redirectPath: string;
}

function SocialButton(props: ISocialButtonProperties): React.JSX.Element {
  const {text, color, border, icon, redirectPath} = props;
  const containerStyle: CSSProperties = {
    width: '90%',
    minWidth: '300px',
    margin: '5px 20px',
  };

  const buttonStyle: CSSProperties = {
    border: (border ? `2px solid ${color}` : 'none'),
    background: (border ? '#fff' : color),
    color: (border ? color : '#fff'),
  };

  function redirect() {
    window.location.href = `http://localhost:8080${redirectPath}`;
  }

  return (
    <div style={containerStyle}>
      <button onClick={redirect} style={buttonStyle} className={'button'}>
        <FontAwesomeIcon icon={icon}/>
        <span style={{marginLeft: '10px'}}>{text}</span>
      </button>
    </div>
  );
}

export default SocialButton;
