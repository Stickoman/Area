import '../index.css';

import React, {CSSProperties, useEffect, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Link} from 'react-router-dom';
import {MouseEventHandler} from 'react';

type ServiceComponentProps = {
  onClick: MouseEventHandler;
  title: string;
  color: string;
  icon: IconProp;
};

function ServiceComponent(props: ServiceComponentProps): JSX.Element {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const darkenedColor = darkenColor(props.color, 30);

  const containerStyle = {
  };

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

  function darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const r = Math.max((num >> 16) - amt, 0);
    const g = Math.max(((num >> 8) & 0x00FF) - amt, 0);
    const b = Math.max((num & 0x0000FF) - amt, 0);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  }
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  return (
    <Link to={`/${props.title}`} onClick={props.onClick} className='containerStyle' style={linkStyle}>
        <FontAwesomeIcon style={logoStyle} icon={props.icon}/>
        <h6 style={titleStyle}>{props.title}</h6>
    </Link>
  );
}

export default ServiceComponent;
