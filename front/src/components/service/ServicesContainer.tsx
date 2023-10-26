import React from 'react';
import {SERVICE_ITEMS} from '../../common/service';
import ServiceCard from './ServiceCard';
import {useNavigate} from 'react-router-dom';
import './ServiceContainer.css';

function ServicesContainer(): React.JSX.Element {
  const navigate = useNavigate();
  const cards: React.JSX.Element[] = Array.from(SERVICE_ITEMS.values())
    .map(service => <ServiceCard key={service.name}
                                 name={service.name}
                                 color={service.color}
                                 icon={service.icon}
                                 onClick={() => navigate(`/services/${service.name}`)}/>,
    );

  return (
    <div className={'service-container'}>
      {cards}
    </div>
  );
}

export default ServicesContainer;
