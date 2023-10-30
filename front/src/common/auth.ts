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
    .then(() => window.location.reload())
    .catch(reason => console.warn('Unable to disassociate Twitter: ', reason));
}

function disassociateDiscord() {
  axios.post('/api/auth/discord/disassociate', {}, {headers: getAuthorizedHeader()})
    .then(() => window.location.reload())
    .catch(reason => console.warn('Unable to disassociate Discord: ', reason));
}

function disassociateGithub() {
  axios.post('/api/auth/github/disassociate', {}, {headers: getAuthorizedHeader()})
    .then(() => window.location.reload())
    .catch(reason => console.warn('Unable to disassociate Github: ', reason));
}

function disassociateGoogle() {
  axios.post('/api/auth/google/disassociate', {}, {headers: getAuthorizedHeader()})
    .then(() => window.location.reload())
    .catch(reason => console.warn('Unable to disassociate Google: ', reason));
}

function disassociateReddit() {
  axios.post('/api/auth/reddit/disassociate', {}, {headers: getAuthorizedHeader()})
    .then(() => window.location.reload())
    .catch(reason => console.warn('Unable to disassociate Reddit: ', reason));
}

function disassociateMicrosoft() {
  axios.post('/api/auth/microsoft/disassociate', {}, {headers: getAuthorizedHeader()})
    .then(() => window.location.reload())
    .catch(reason => console.warn('Unable to disassociate Microsoft: ', reason));
}

function disassociateFacebook() {
  axios.post('/api/auth/facebook/disassociate', {}, {headers: getAuthorizedHeader()})
    .then(() => window.location.reload())
    .catch(reason => console.warn('Unable to disassociate Facebook: ', reason));
}

export {logout, disassociateTwitter, disassociateDiscord, getAuthorizedHeader, disassociateGoogle, disassociateGithub, disassociateReddit, disassociateMicrosoft, disassociateFacebook};
