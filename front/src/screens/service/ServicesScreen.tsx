import React, {CSSProperties, useState} from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import ServicesContainer, {ServicesContainerMode} from '../../components/service/ServicesContainer';
import {useNavigate, useParams} from 'react-router-dom';
import '../../index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {capitalize} from '../../common/utils';

interface IServicesScreenProperties {
  mode: ServicesContainerMode;
}

function ServicesScreen(props: IServicesScreenProperties): React.JSX.Element {
  const [filter, setFilter] = useState('');
  const {service} = useParams();

  const containerStyle: CSSProperties = {
    textAlign: 'center',
  };

  const titleStyle: CSSProperties = {
    fontSize: '56px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
  };

  const searchStyle: CSSProperties = {
    width: '80%',
    borderRadius: 20,
    color: '#333',
  };

  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <NavigationBar color={'#000'}/>
      {service &&
        <button onClick={() => navigate(`/services/${service}`)} className={'service-back buttonStyle'}>
          <FontAwesomeIcon icon={faArrowLeft} className={'service-back-icon'}/>
          <span>Back</span>
        </button>
      }
      <h1 style={titleStyle}>Discover Services {capitalize(props.mode)}</h1>
      <input
        type="text"
        placeholder="Search services"
        value={filter}
        onChange={(e) => setFilter(e.target.value.toLowerCase().trim)}
        className={'inputStyle'}
        style={searchStyle}
      />
      <ServicesContainer mode={props.mode} actionsServiceName={service}/>
    </div>
  );
}

export default ServicesScreen;
