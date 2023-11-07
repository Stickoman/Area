import axios from 'axios';
import {reject} from '../authService';
import {GoogleAuthentication} from '../../model/googleAuth';

interface QueryParameters {
  q?: string;
}

export interface GoogleEmailsItem {
  subject: string;
  snippet: string;
  internalDate: Date;
  from: string;
  id: string;
}

export interface GoogleEmails {
  items: GoogleEmailsItem[];
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
    return Promise.resolve(emails);
  } catch (error) {
    console.error('Error while retrieving emails ids: ', error);
    return Promise.reject(new Error('Error while retrieving emails ids'));
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

async function checkForNewEmails(userGoogleID: string, searchCriteria?: string): Promise<GoogleEmails> {
  try {
    let GoogleAuth = await GoogleAuthentication.findOne({id: userGoogleID}).exec();
    const googleEmail = GoogleAuth.email;
    const accessToken = GoogleAuth.access_token;
    const emailsIds = await checkForNewEmailsIds(googleEmail, accessToken, searchCriteria);

    const emails = {items: []} as GoogleEmails;
    for (const emailId of emailsIds) {
      try {
        const email = await getSingleEmail(googleEmail, emailId.id, accessToken);
        const subjectHeader = email.payload.headers.find((header: { name: string }) => header.name === 'Subject');
        const fromHeader = email.payload.headers.find((header: { name: string }) => header.name === 'From');

        const subject = subjectHeader ? subjectHeader.value : 'Sujet inconnu';
        const sender = fromHeader ? fromHeader.value : 'Expéditeur inconnu';

        const snippet = email.snippet;
        const internalDate = new Date(parseInt(email.internalDate));

        emails.items.push({
          subject: subject,
          from: sender,
          snippet: snippet,
          internalDate: internalDate,
          id: emailId.id,
        });
      } catch (error) {
        console.error('Erreur lors du traitement de l\'e-mail:', error);
      }
    }
    return emails;
  } catch (error) {
    console.error('Erreur lors de la récupération des e-mails:', error);
    return Promise.reject(new Error('Erreur lors de la récupération des e-mails'));
  }
}

export default checkForNewEmails;
