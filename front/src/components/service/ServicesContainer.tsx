import React from 'react';
import {IService, SERVICE_ITEMS} from '../../common/service';
import ServiceCard from './ServiceCard';
import {useNavigate} from 'react-router-dom';
import './ServiceContainer.css';

type ServicesContainerMode = 'actions' | 'reactions';

interface IServicesContainerProperties {
  mode: ServicesContainerMode;
  actionsServiceName?: string;
}

function ServicesContainer(props: IServicesContainerProperties): React.JSX.Element {
  const queryParameters = new URLSearchParams(window.location.search);
  const {mode, actionsServiceName} = props;
  const navigate = useNavigate();
  const type = queryParameters.get('actionType');

  const isDisabled = (service: IService): boolean => {
    if (props.mode === 'actions')
      return service.actions.length <= 0;
    if (props.mode === 'reactions')
      return service.reactions.length <= 0;
    return true;
  }

  const cards: React.JSX.Element[] = Array.from(SERVICE_ITEMS.values())
    .map(service => <ServiceCard key={service.name}
                                 name={service.name}
                                 color={service.color}
                                 icon={service.icon}
                                 callback={() => (mode === 'actions' ? navigate(`/services/${service.name}`) : navigate(`/services/${actionsServiceName}/reactions/${service.name}?actionType=${type}`))}
                                 disabled={isDisabled(service)}/>,
    );

  return (
    <div className={'service-container'}>
      {cards}
    </div>
  );
}

export type {ServicesContainerMode};
export default ServicesContainer;
