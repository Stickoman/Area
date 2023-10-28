import React from 'react';
import {SERVICE_ITEMS} from '../../common/service';
import ServiceCard from './ServiceCard';
import {useNavigate} from 'react-router-dom';
import './ServiceContainer.css';

type ServicesContainerMode = 'actions' | 'reactions';

interface IServicesContainerProperties {
  mode: ServicesContainerMode;
  actionsServiceName?: string;
}

function ServicesContainer(props: IServicesContainerProperties): React.JSX.Element {
  const queryParameters = new URLSearchParams(window.location.search)
  const {mode, actionsServiceName} = props;
  const navigate = useNavigate();
  const type = queryParameters.get("actionType")

  const cards: React.JSX.Element[] = Array.from(SERVICE_ITEMS.values())
    .map(service => <ServiceCard key={service.name}
                                 name={service.name}
                                 color={service.color}
                                 icon={service.icon}
                                 onClick={() => (mode === 'actions' ? navigate(`/services/${service.name}`) : navigate(`/services/${actionsServiceName}/reactions/${service.name}?actionType=${type}`))}/>,
    );

  return (
    <div className={'service-container'}>
      {cards}
    </div>
  );
}

export type {ServicesContainerMode};
export default ServicesContainer;
