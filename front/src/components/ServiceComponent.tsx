import {MouseEventHandler} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp} from '@fortawesome/fontawesome-svg-core';

type ServiceComponentProps = {
  onClick: MouseEventHandler,
  title: string,
  color: string,
  icon: IconProp,
};

function ServiceComponent(props: ServiceComponentProps) {
  const containerStyle = {
    borderRadius: 30,
    background: props.color,
    cursor: 'pointer',
    padding: '10%',
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 150,
    minHeight: 150,
    margin: 20,
  };

  const logoStyle = {
    width: 50,
    height: 50,
  };

  const titleStyle = {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  };

  return (
    <div onClick={props.onClick} style={containerStyle}>
      <FontAwesomeIcon style={logoStyle} icon={props.icon}></FontAwesomeIcon>
      <h6 style={titleStyle}>{props.title}</h6>
    </div>
  );
}

export default ServiceComponent;
