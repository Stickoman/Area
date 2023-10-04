import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

export function checkIfUserIsLoggedIn() {
  const token = Cookies.get('token');
  return !!token;
}
function NavigationBar() {

  const isLoggedIn = checkIfUserIsLoggedIn();

  const navStyle = {
    background: '#333',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
  };

  const userIconStyle = {
    fontSize: '24px',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to={isLoggedIn ? '/profile' : '/authentication'} style={linkStyle}>
        <FontAwesomeIcon icon={faUser} style={userIconStyle} />
      </Link>
    </nav>
  );
}

export default NavigationBar;
