import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faBars, faXmark} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import './NavigationBar.css';

export function checkIfUserIsLoggedIn(): boolean {
  const token = Cookies.get('token');

  return !!token;
}

interface INavigationBarProperties {
  color: string;
}

function NavigationBar(props: INavigationBarProperties): React.JSX.Element {
  const isLoggedIn = checkIfUserIsLoggedIn();
  const [menuDropDown, setMenuDropDown] = useState(false);

  return (
    <nav className={'navigation-container'} style={{backgroundColor: props.color}}>
      <div className={'mobile'}>
        <button onClick={() => setMenuDropDown(!menuDropDown)}>
          <FontAwesomeIcon icon={menuDropDown ? faXmark : faBars}/>
        </button>
        <h1>AREA</h1>
      </div>
      <div className={'links'} style={{top: (menuDropDown ? '0' : '-1000px')}}>
        <Link to="/" className={'nav-link'}>Home</Link>
        <Link to="/services" className={'nav-link'}>Services</Link>
        <Link to="/configuration" className={'nav-link'}>Configuration</Link>
        <Link to={isLoggedIn ? '/profile' : '/authentication'} className={'nav-icon'}>
          <FontAwesomeIcon icon={faUser}/>
        </Link>
      </div>

      <div className={'menu'}>

      </div>
    </nav>
  );
}

export default NavigationBar;
