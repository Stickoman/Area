import React, {useState} from 'react';
import {faDiscord, faMicrosoft, faSpotify} from '@fortawesome/free-brands-svg-icons';

import { Link } from 'react-router-dom';
import ServiceComponent from '../components/ServiceComponent';

function HomeScreen() {
  const [filter, setFilter] = useState('');
  const services = [
    {title: 'Discord', color: 'yellow', icon: faDiscord},
    {title: 'Spotify', color: 'red', icon: faSpotify},
    {title: 'Outlook 365', color: 'green', icon: faMicrosoft},
  ];

  const titleStyle = {
    margin: 10,
    fontSize: '2em',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  };

  const searchBarStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    marginBottom: '20px',
    borderRadius: 10,
  };
  

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
  };

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(filter),
  );

  return (
    <div>
      <h1 style={titleStyle}>Welcome!</h1>
      <input
        type="text"
        placeholder="Search services"
        value={filter}
        onChange={handleSearch}
        style={searchBarStyle}
      />
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {filteredServices.map((service, index) => (
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
