import React, {CSSProperties} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';


type DisassociateComponentProps = {
  name: string,
  handleClick: React.MouseEventHandler<HTMLButtonElement>,
  icon: IconProp,
  style: string
};

const containerStyle: CSSProperties = {
  width: '100%',
  margin: '5px 0',
  borderRadius: '8px',
};
function DisassociateComponent(props: DisassociateComponentProps) {

  return (
    <div style={containerStyle}>
      <button onClick={props.handleClick} className={props.style}>
        <FontAwesomeIcon icon={props.icon}/>
        <span style={{marginLeft: '10px'}}>Dissociate {props.name}</span>
      </button>
    </div>
  );
}

export default DisassociateComponent;
