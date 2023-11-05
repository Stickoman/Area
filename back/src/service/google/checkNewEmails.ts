import axios from 'axios';
import {GoogleAuthentication} from '../../model/googleAuth';

interface QueryParameters {
  q?: string;
}

async function checkForNewEmailsIds(googleEmail: string, accessToken: string, searchCriteria?: string) {
  const url = `https://gmail.googleapis.com/gmail/v1/users/${googleEmail}/messages`;
  const params: QueryParameters = {};
  if (searchCriteria) params.q = searchCriteria;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const emails = response.data.messages;
    console.warn(emails);
    return Promise.resolve(emails);
  } catch (error) {
    console.error('Erreur lors de la récupération des e-mails:', error);
    return Promise.reject(new Error('Erreur lors de la récupération des e-mails'));
  }
}

async function getSingleEmail(googleEmail: string, messageId: string, accessToken: string) {
  const url = `https://gmail.googleapis.com/gmail/v1/users/${googleEmail}/messages/${messageId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const email = response.data;
    return Promise.resolve(email);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'e-mail:', error);
    return Promise.reject(new Error('Erreur lors de la récupération de l\'e-mail'));
  }
}

async function checkForNewEmails(userGoogleID: string, searchCriteria?: string) {
  try {
    let GoogleAuth = await GoogleAuthentication.findOne({id: userGoogleID}).exec();
    const googleEmail = GoogleAuth.email;
    const accessToken = GoogleAuth.access_token;
    const emailsIds = await checkForNewEmailsIds(googleEmail, accessToken, searchCriteria);

    const emails = [];
    for (const emailId of emailsIds) {
      const email = await getSingleEmail(googleEmail, emailId.id, accessToken);
      const subject = email.payload.headers.find((header: { name: string; }) => header.name === 'Subject').value;
      const fromHeader = email.payload.headers.find((header: { name: string; }) => header.name === 'From');
      const sender = fromHeader ? fromHeader.value : 'Expéditeur inconnu';
      emails.push({
        subject: subject,
        from: sender,
        snippet: email.snippet.data,
        internalDate: email.internalDate.data
      });
    }
    console.warn(emails);
    return emails;
  } catch (error) {
    console.error('Erreur lors de la récupération des e-mails:', error);
    return Promise.reject(new Error('Erreur lors de la récupération des e-mails'));
  }
}

export default checkForNewEmails;
