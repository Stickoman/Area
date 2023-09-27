import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Link} from 'react-router-dom';
import React, {CSSProperties, MouseEventHandler} from 'react';

type ServiceComponentProps = {
  onClick: MouseEventHandler;
  title: string;
  color: string;
  icon: IconProp;
};

function ServiceComponent(props: ServiceComponentProps) {

  const darkenedColor = darkenColor(props.color, 30);

  const containerStyle: CSSProperties = {
    borderRadius: 30,
    background: `linear-gradient(to bottom, ${props.color} 0%, ${darkenedColor} 100%)`,
    cursor: 'pointer',
    padding: '10%',
    textAlign: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 150,
    minHeight: 150,
    margin: 20,
  };

  const logoStyle: CSSProperties = {
    width: '70%',
    height: 'auto',
    margin: '0 auto 10px',
    color: 'white',
  };

  const titleStyle: CSSProperties = {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  };

  const linkStyle: CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'inherit',
    flexDirection: 'inherit',
  };

  function darkenColor(color: string, percent: number) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const r = Math.max((num >> 16) - amt, 0);
    const g = Math.max(((num >> 8) & 0x00FF) - amt, 0);
    const b = Math.max((num & 0x0000FF) - amt, 0);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  }


  return (
    <Link to={`/${props.title}`} style={linkStyle}>
      <div onClick={props.onClick} style={containerStyle}>
        <FontAwesomeIcon style={logoStyle} icon={props.icon}/>
        <h6 style={titleStyle}>{props.title}</h6>
      </div>
    </Link>
  );
}

export default ServiceComponent;
