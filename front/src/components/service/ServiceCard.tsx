import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {capitalize} from '../../common/utils';
import './ServiceCard.css';

interface IServicesCardProperties {
  name: string;
  color: string;
  icon: IconProp;
  onClick: (name: string) => void;
}

function ServiceCard(props: IServicesCardProperties): React.JSX.Element {
  const {name, color, icon, onClick} = props;

  return (
    <div onClick={() => onClick(name)} className={'service-card'} style={{background: color}}>
      <FontAwesomeIcon icon={icon} size={'3x'}/>
      <p>{capitalize(name)}</p>
    </div>
  );
}

export default ServiceCard;
