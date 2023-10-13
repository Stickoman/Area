import axios from 'axios';
import {getAuthorizedHeader} from './auth';
import {IProfile} from '../screens/ProfileScreen';

function handleFormSubmit(profile: IProfile): Promise<void> {
  const {email, firstName, lastName} = profile;

  return axios.put('/api/profile', {firstName, lastName, email}, {headers: getAuthorizedHeader()})
    .then(() => Promise.resolve())
    .catch(reason => Promise.reject(new Error('Unable to update profile: ' + reason)));
}

export {handleFormSubmit};
