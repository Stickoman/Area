import axios from 'axios';
import {reject} from '../authService';

async function checkForNewEmails(accessToken: string, googleEmail: string) {
  const url = `https://gmail.googleapis.com/gmail/v1/users/${googleEmail}/messages`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const emails = response.data.messages;

    console.log('Google Emails:', emails);
    return Promise.resolve(emails);
  } catch (error) {
    console.error('Error while retrieving emails:', error.data?.error);
    return reject('Error while retrieving emails');
  }
}

export default checkForNewEmails;
