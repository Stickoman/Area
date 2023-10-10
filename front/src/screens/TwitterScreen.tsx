import React, {CSSProperties} from 'react';
import NavigationBar, {checkIfUserIsLoggedIn} from '../components/NavBarComponent';

function TwitterScreen(): React.JSX.Element {
  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const titleStyle: CSSProperties = {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
  };

  const queryParameters = new URLSearchParams(window.location.href);
  const id: string = queryParameters.get('id');
  const name: string = queryParameters.get('name');

  return (
    <div>
      <NavigationBar color={'#1c9cea'}/>

      <div style={wrapperStyle}>
        <h6 style={titleStyle}>Twitter</h6>

        <p>Welcome {name}</p>
        <p>This Twitter account is not associated with any account. Please log-in or register!</p>
      </div>
    </div>
  );
}

export default TwitterScreen;
