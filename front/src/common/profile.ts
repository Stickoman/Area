import axios from 'axios';
import {getAuthorizedHeader} from './auth';
import {IProfile} from '../screens/ProfileScreen';
import {NavigateFunction} from 'react-router-dom';

function handleFormSubmit(profile: IProfile): Promise<void> {
  const {email, firstName, lastName} = profile;

  return axios.put('/api/profile', {firstName, lastName, email}, {headers: getAuthorizedHeader()})
    .then(() => Promise.resolve())
    .catch(reason => Promise.reject(new Error('Unable to update profile: ' + reason)));
}

async function deleteAccount(navigate: NavigateFunction) {
  await axios.delete('/api/me', {headers: getAuthorizedHeader()});

  navigate('/authentication');
}

export {handleFormSubmit, deleteAccount};
