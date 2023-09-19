import {MouseEventHandler} from 'react';
import * as ReactDOM from 'react-dom';

type ServiceComponentProps = {
  onClick: MouseEventHandler,
  title: string,
  color: string,
};

function ServiceComponent(props: ServiceComponentProps) {
  const containerStyle = {
    background: props.color,
    cursor: 'pointer',
    padding: '10px',
  };

  return (
    <div onClick={props.onClick} style={containerStyle}>
      <h6>{props.title}</h6>
    </div>
  )

}

export default ServiceComponent;
