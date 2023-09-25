import React, { useState } from 'react';
import { faDiscord, faMicrosoft, faSpotify, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import ServiceComponent from '../components/ServiceComponent';

function HomeScreen() {
  const [filter, setFilter] = useState('');
  const services = [
    { title: 'Discord', color: '#7289da', icon: faDiscord },
    { title: 'Spotify', color: '#1db954', icon: faSpotify },
    { title: 'Outlook 365', color: '#ea4300', icon: faMicrosoft },
    { title: 'Twitter', color: '#1da1f2', icon: faTwitter },
    { title: 'Facebook', color: '#1877f2', icon: faFacebook },
  ];

  const containerStyle = {
    padding: '16px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '56px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
  };

  const inputStyle = {
    width: '80%',
    padding: '12px',
    fontSize: '20px',
    marginBottom: '24px',
    borderRadius: 20,
    border: '1px solid #ccc',
    color: '#333',
  };

  const servicesContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Discover Services</h1>
      <input
        type="text"
        placeholder="Search services"
        value={filter}
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
        style={inputStyle}
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

export default HomeScreen;
