import React, {CSSProperties, useState} from 'react';
import { faDiscord, faMicrosoft, faSpotify, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import ServiceComponent from '../components/ServiceComponent';
import NavigationBar from '../components/common/NavigationBar';
import '../index.css';
function ServicesScreen() {
  const [filter, setFilter] = useState('');
  const services = [
    { title: 'Discord', color: '#7289da', icon: faDiscord },
    { title: 'Spotify', color: '#1db954', icon: faSpotify },
    { title: 'Outlook 365', color: '#ea4300', icon: faMicrosoft },
    { title: 'Twitter', color: '#1da1f2', icon: faTwitter },
    { title: 'Facebook', color: '#1877f2', icon: faFacebook },
  ];

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

  const servicesContainerStyle: CSSProperties = {
    padding: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  return (
    <div style={containerStyle}>
      <NavigationBar color={'#000'}/>
      <h1 style={titleStyle}>Discover Services</h1>
      <input
        type="text"
        placeholder="Search services"
        value={filter}
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
        className={'inputStyle'}
        style={searchStyle}
      />
      <div style={servicesContainerStyle}>
        {services
          .filter((service) => service.title.toLowerCase().includes(filter))
          .map((service, index) => (
            <ServiceComponent
              key={index}
              onClick={undefined}
              title={service.title}
              color={service.color}
              icon={service.icon}
            />
          ))}
      </div>
    </div>
  );
}

export default ServicesScreen;
