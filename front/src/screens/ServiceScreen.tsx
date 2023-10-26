import {useNavigate, useParams} from 'react-router-dom';
import React, {CSSProperties, useState} from 'react';
import '../index.css';

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NavigationBar from '../components/common/NavigationBar';
import {SERVICE_ITEMS, ServiceType} from '../common/service';
import {capitalize} from '../common/utils';
import ServiceCard from '../components/service/ServiceCard';

function ServiceScreen(): React.JSX.Element {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');

  const titleStyle: CSSProperties = {
    margin: 10,
    fontSize: '2em',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  };

  const backButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'white',
    margin: '20px',
    width: '125px',
  };

  const backIconStyle: CSSProperties = {
    marginRight: '10px',
    fontSize: '1.5em',
  };

  const {service} = useParams();
  const type: ServiceType = service as ServiceType;
  const selectedService = SERVICE_ITEMS.get(type);
  const filteredItems = selectedService.actions
    .filter(item => item.name.includes(filter.toLowerCase().trim()));

  return (
    <div>
      {selectedService && <NavigationBar color={selectedService.color}/>}
      <button onClick={() => navigate('/services')} style={backButtonStyle} className={'buttonStyle'}>
        <FontAwesomeIcon icon={faArrowLeft} style={backIconStyle}/>
        <span>Back</span>
      </button>

      <h1 style={titleStyle}>{capitalize(service)}</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {filteredItems.map(element => (
          <ServiceCard key={`${service}:${element.name}`}
                       name={element.description}
                       color={selectedService.color}
                       icon={selectedService.icon}
                       onClick={undefined}/>
        ))}
      </div>
    </div>
  );
}

export default ServiceScreen;
