import {useNavigate, useParams} from 'react-router-dom';
import React, {useState} from 'react';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NavigationBar from '../../components/common/NavigationBar';
import {SERVICE_ITEMS, ServiceType} from '../../common/service';
import {capitalize} from '../../common/utils';
import ServiceCard from '../../components/service/ServiceCard';
import '../../index.css';
import './ServiceScreen.css';

function ServiceActionsScreen(): React.JSX.Element {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');

  const {service} = useParams();
  const type: ServiceType = service as ServiceType;
  const selectedService = SERVICE_ITEMS.get(type);
  const filteredItems = selectedService.actions
    .filter(item => item.name.includes(filter.toLowerCase().trim()));

  return (
    <div>
      {selectedService && <NavigationBar color={selectedService.color}/>}
      <button onClick={() => navigate('/services')} className={'service-back buttonStyle'}>
        <FontAwesomeIcon icon={faArrowLeft} className={'service-back-icon'}/>
        <span>Back</span>
      </button>

      <h1 className={'service-title'}>{capitalize(service)}</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {filteredItems.map(element => (
          <ServiceCard key={`${service}:${element.name}`}
                       name={element.description}
                       color={selectedService.color}
                       icon={selectedService.icon}
                       onClick={() => navigate(`/services/${service}/reactions?actionType=${element.name}`)}/>
        ))}
      </div>
    </div>
  );
}

export default ServiceActionsScreen;
