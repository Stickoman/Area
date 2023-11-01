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
  profile?: boolean;
}

function SocialButton(props: ISocialButtonProperties): React.JSX.Element {
  const {text, color, border, icon, redirectPath, profile} = props;
  const containerStyle: CSSProperties = {
    width: profile ? '100%' : '90%',
    minWidth: '300px',
    margin: profile ? '5px 0' : '5px 20px',
  };

  const buttonStyle: CSSProperties = {
    border: (border ? `2px solid ${color}` : 'none'),
    background: (border ? '#fff' : color),
    color: (border ? color : '#fff'),
  };

  function redirect() {
    const API_URL = process.env.REACT_APP_API_URL;

    window.location.href = `${API_URL}${redirectPath}`;
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
