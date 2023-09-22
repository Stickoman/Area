import { Link, useParams } from 'react-router-dom';
import React, {useState} from 'react';
import {faDiscord, faMicrosoft, faSpotify} from '@fortawesome/free-brands-svg-icons';

import ServiceComponent from '../components/ServiceComponent';

function ServiceScreen() {
  const [filter, setFilter] = useState('');
  const services = [
    {title: 'Send a ping', color: 'blue', icon: faDiscord, serviceApp: 'Discord'},
    {title: 'Send friend request', color: 'blue', icon: faDiscord, serviceApp: 'Discord'},
    {title: 'Create a group', color: 'blue', icon: faDiscord, serviceApp: 'Discord'},
  
    {title: 'Create a playlist', color: 'green', icon: faSpotify, serviceApp: 'Spotify'},
    {title: 'Lorem Ipsum', color: 'green', icon: faSpotify, serviceApp: 'Spotify'},
    {title: 'Add a song', color: 'green', icon: faSpotify, serviceApp: 'Spotify'},
  
    {title: 'Send an email', color: 'blue', icon: faMicrosoft, serviceApp: 'Outlook 365'},
    {title: 'Get last 5 emails', color: 'blue', icon: faMicrosoft, serviceApp: 'Outlook 365'},
    {title: 'CC all your contacts', color: 'blue', icon: faMicrosoft, serviceApp: 'Outlook 365'},
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
  const { service } = useParams();

  return (
    <div>
      <Link to={`/`}>
        <h1 style={titleStyle}>Back</h1>  
      </Link>
      <h1 style={titleStyle}>{service}</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {filteredServices.map((serviceApp, index) => (
          serviceApp.serviceApp === service &&
                <ServiceComponent
                  key={index}
                  onClick={undefined}
                  title={serviceApp.title}
                  color={serviceApp.color}
                  icon={serviceApp.icon}
                />
        ))}
    </div>
    </div>
  );
}

export default ServiceScreen;
