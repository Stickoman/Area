import React from 'react';
import {IService, SERVICE_ITEMS} from '../../common/service';

import './ServiceContainer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';

interface IServicesCardProperties {
  service: IService;
}

function ServiceCard(props: IServicesCardProperties): React.JSX.Element {
  const {service} = props;
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/services/${service.name}`)} className={'service-card'} style={{background: service.color}}>
      <FontAwesomeIcon icon={service.icon} size={'3x'}/>
      <p>{service.name[0].toUpperCase() + service.name.slice(1)}</p>
    </div>
  );
}

function ServicesContainer(): React.JSX.Element {
  const cards: React.JSX.Element[] = Array.from(SERVICE_ITEMS.values())
    .map(service => <ServiceCard key={service.name} service={service}/>);

  return (
    <div className={'service-container'}>
      {cards}
    </div>
  );
}

export default ServicesContainer;
