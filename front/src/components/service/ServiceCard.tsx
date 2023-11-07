import React, {CSSProperties} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {capitalize} from '../../common/utils';
import './ServiceCard.css';

interface IServicesCardProperties {
  name: string;
  color: string;
  icon: IconProp;
  callback: (name: string) => void;
  disabled?: boolean;
}

function ServiceCard(props: IServicesCardProperties): React.JSX.Element {
  const {name, color, icon, callback, disabled} = props;

  function onClick() {
    if (disabled) return;
    callback(name);
  }

  const cardStyle: CSSProperties = {
    background: color,
    filter: disabled ? 'brightness(.5)' : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <div onClick={onClick} onKeyDown={onClick} className={'service-card'} style={cardStyle}>
      <FontAwesomeIcon icon={icon} size={'3x'}/>
      <p>{capitalize(name)}</p>
    </div>
  );
}

export default ServiceCard;
