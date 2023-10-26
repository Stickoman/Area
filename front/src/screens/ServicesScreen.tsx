import React, {CSSProperties, useState} from 'react';
import NavigationBar from '../components/common/NavigationBar';
import '../index.css';
import ServicesContainer from '../components/service/ServicesContainer';

function ServicesScreen(): React.JSX.Element {
  const [filter, setFilter] = useState('');

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
      <ServicesContainer/>
    </div>
  );
}

export default ServicesScreen;
