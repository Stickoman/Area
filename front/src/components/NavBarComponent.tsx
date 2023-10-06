import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import "../index.css"

export function checkIfUserIsLoggedIn() {
  const token = Cookies.get('token');
  return !!token;
}

function NavigationBar(props: {color: string}) {

  const isLoggedIn = checkIfUserIsLoggedIn();

  const navStyle = {
    background: props.color,
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    height: '70px',
  };
    return (
    <nav style={navStyle}>
      <Link to="/" className={'nav-link'}>
        Home
      </Link>
      <Link to="/services" className={'nav-link'}>
        Services
      </Link>
      <Link to={isLoggedIn ? '/profile' : '/authentication'} className={'nav-icon'}>
        <FontAwesomeIcon icon={faUser}/>
      </Link>
    </nav>
  );
}

export default NavigationBar;
