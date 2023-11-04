import axios from 'axios';
import {GoogleAuthentication} from '../../model/googleAuth';

interface QueryParameters {
  q?: string;
}
async function checkForNewEmails(userGoogleID: string, searchCriteria?: string) {
  let GoogleAuth = await GoogleAuthentication.findOne({id: userGoogleID}).exec();
  const googleEmail = GoogleAuth.email;
  const accessToken = GoogleAuth.access_token;
  const url = `https://gmail.googleapis.com/gmail/v1/users/${googleEmail}/messages`;
  const params: QueryParameters = {};
  if (searchCriteria) params.q = searchCriteria;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      params: params,
    });

    const emails = response.data.messages;
    return Promise.resolve(emails);
  } catch (error) {
    console.error('Erreur lors de la récupération des e-mails:', error);
    return Promise.reject(new Error('Erreur lors de la récupération des e-mails'));
  }
}

export default checkForNewEmails;
