import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

function NavigationBar() {
  function checkIfUserIsLoggedIn() {
    const token = Cookies.get('token');
    return !!token;
  }
  const isLoggedIn = checkIfUserIsLoggedIn();
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={isLoggedIn ? "/profile" : "/authentication"}>
        <FontAwesomeIcon icon={faUser} />
      </Link>
    </nav>
  );
}
export default NavigationBar;
