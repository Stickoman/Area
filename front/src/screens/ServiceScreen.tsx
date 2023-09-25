import { Link, useParams } from 'react-router-dom';
import React, {useState} from 'react';
import {faDiscord, faFacebook, faMicrosoft, faSpotify, faTwitter} from '@fortawesome/free-brands-svg-icons';

import ServiceComponent from '../components/ServiceComponent';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function ServiceScreen() {
  const [filter, setFilter] = useState('');
  const services = [
    {title: 'Send a ping', color: '#7289da', icon: faDiscord, serviceApp: 'Discord'},
    {title: 'Send friend request', color: '#7289da', icon: faDiscord, serviceApp: 'Discord'},
    {title: 'Create a group', color: '#7289da', icon: faDiscord, serviceApp: 'Discord'},

    {title: 'Create a playlist', color: '#1db954', icon: faSpotify, serviceApp: 'Spotify'},
    {title: 'Lorem Ipsum', color: '#1db954', icon: faSpotify, serviceApp: 'Spotify'},
    {title: 'Add a song', color: '#1db954', icon: faSpotify, serviceApp: 'Spotify'},

    {title: 'Send an email', color: '#ea4300', icon: faMicrosoft, serviceApp: 'Outlook 365'},
    {title: 'Get last 5 emails', color: '#ea4300', icon: faMicrosoft, serviceApp: 'Outlook 365'},
    {title: 'CC all your contacts', color: '#ea4300', icon: faMicrosoft, serviceApp: 'Outlook 365'},

    { title: 'Twitter Service 1', color: '#1da1f2', icon: faTwitter, serviceApp: 'Twitter' },
    { title: 'Twitter Service 2', color: '#1da1f2', icon: faTwitter, serviceApp: 'Twitter' },
    { title: 'Twitter Service 3', color: '#1da1f2', icon: faTwitter, serviceApp: 'Twitter' },

    { title: 'Facebook Service 1', color: '#1877f2', icon: faFacebook, serviceApp: 'Facebook' },
    { title: 'Facebook Service 2', color: '#1877f2', icon: faFacebook, serviceApp: 'Facebook' },
    { title: 'Facebook Service 3', color: '#1877f2', icon: faFacebook, serviceApp: 'Facebook' },
  ];

  const titleStyle = {
    margin: 10,
    fontSize: '2em',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  };

  const backButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#333',  // Couleur de texte personnalisée
    marginBottom: '20px',
  };

  const backIconStyle = {
    marginRight: '10px',
    fontSize: '1.5em',
  };

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(filter),
  );
  const { service } = useParams();

  return (
    <div>
      <Link to={`/`} style={backButtonStyle}>
        <FontAwesomeIcon icon={faArrowLeft} style={backIconStyle} />
        <span>Back</span>
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
