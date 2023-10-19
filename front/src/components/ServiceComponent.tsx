import '../index.css';

import React, {CSSProperties, MouseEventHandler} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Link} from 'react-router-dom';

type ServiceComponentProps = {
  onClick: MouseEventHandler;
  title: string;
  color: string;
  icon: IconProp;
};

function ServiceComponent(props: ServiceComponentProps): JSX.Element {
  const logoStyle: CSSProperties = {
    width: '70%',
    height: 'auto',
    margin: 'auto',
    color: 'white',
  };

  const titleStyle: CSSProperties = {
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  };

  const linkStyle: CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    background: `${props.color}`,
  };

  return (
    <Link to={`/services/${props.title.toLowerCase()}`} onClick={props.onClick} className="containerStyle"
          style={linkStyle}>
      <FontAwesomeIcon style={logoStyle} icon={props.icon}/>
      <h6 style={titleStyle}>{props.title}</h6>
    </Link>
  );
}

export default ServiceComponent;
