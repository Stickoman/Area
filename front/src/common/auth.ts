import axios from 'axios';
import Cookies from 'js-cookie';
import {NavigateFunction} from 'react-router-dom';

function getAuthorizedHeader() {
  return {'Authorization': `Bearer ${Cookies.get('token')}`};
}

function logout(navigate: NavigateFunction) {
  axios.post('/api/auth/logout', {}, {headers: getAuthorizedHeader()})
    .catch(reason => console.warn('Unable to logout: ', reason))
    .finally(() => {
      Cookies.remove('token');
      navigate('/authentication');
    });
}

function disassociateTwitter() {
  axios.post('/api/auth/twitter/disassociate', {}, {headers: getAuthorizedHeader()})
    .catch(reason => console.warn('Unable to disassociate Twitter: ', reason));
}

function disassociateDiscord() {
  axios.post('/api/auth/discord/disassociate', {}, {headers: getAuthorizedHeader()})
    .catch(reason => console.warn('Unable to disassociate Discord: ', reason));
}

export {logout, disassociateTwitter, getAuthorizedHeader};
