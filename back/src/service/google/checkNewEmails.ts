import axios from 'axios';

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
    console.log('Liste des e-mails:', emails);
    return Promise.resolve(emails);
  } catch (error) {
    console.error('Erreur lors de la récupération des e-mails:', error);
    return Promise.reject(new Error('Erreur lors de la récupération des e-mails'));
  }
}

export default checkForNewEmails;
