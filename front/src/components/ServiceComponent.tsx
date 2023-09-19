import {MouseEventHandler} from 'react';
import * as ReactDOM from 'react-dom';

type ServiceComponentProps = {
  onClick: MouseEventHandler,
  title: string,
  color: string,
};

function ServiceComponent(props: ServiceComponentProps) {
  return (
    <div className={'container'} onClick={props.onClick}>
      <h6 className={'title'}>{props.title}</h6>
    </div>
  )
}

export default ServiceComponent;
