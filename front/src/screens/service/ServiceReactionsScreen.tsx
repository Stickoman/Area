import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {SERVICE_ITEMS, ServiceType} from '../../common/service';
import NavigationBar from '../../components/common/NavigationBar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {capitalize} from '../../common/utils';
import ServiceCard from '../../components/service/ServiceCard';

function ServiceReactionsScreen(): React.JSX.Element {
  const queryParameters = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');

  const {actionService, reactionService} = useParams();
  const reactionType: ServiceType = reactionService as ServiceType;
  const selectedService = SERVICE_ITEMS.get(reactionType);
  const filteredItems = selectedService.reactions
    .filter(item => item.name.includes(filter.toLowerCase().trim()));

  const actionTask = queryParameters.get('actionType');
  if (!actionTask)
    navigate(`/services/${actionService}/reactions`);

  return (
    <div>
      {selectedService && <NavigationBar color={selectedService.color}/>}
      <button onClick={() => navigate(`/services/${actionService}/reactions`)} className={'service-back buttonStyle'}>
        <FontAwesomeIcon icon={faArrowLeft} className={'service-back-icon'}/>
        <span>Back</span>
      </button>

      <h1 className={'service-title'}>{capitalize(reactionService)}</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {filteredItems.map(element => (
          <ServiceCard key={`${reactionService}:${element.name}`}
                       name={element.description}
                       color={selectedService.color}
                       icon={selectedService.icon}
                       callback={() => navigate(`/services/area?actionService=${actionService}&actionTask=${actionTask}&reactionService=${reactionService}&reactionTask=${element.name}`)}/>
        ))}
      </div>
    </div>
  );
}

export default ServiceReactionsScreen;
