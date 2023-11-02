import {MicrosoftAuthentication} from '../../model/microsoftAuth';
import axios from 'axios';

async function sendMicrosoftEmailToMyself(subject: string, message: string, userMicrosoftID: string) {
  const MicrosoftAuth = await MicrosoftAuthentication.findOne({id: userMicrosoftID}).exec();
  const microsoftEmail = MicrosoftAuth.email;
  const accessToken = MicrosoftAuth.access_token;
  console.log('accesToken: ' + accessToken);
  const url = 'https://graph.microsoft.com/v1.0/me/sendMail';
  const email = {
    message: {
      subject: 'Hello Juteman',
      body: {
        contentType: 'Text',
        content: 'This is a test email sent from a Node.js app.',
      },
      toRecipients: [
        {
          emailAddress: {
            address: microsoftEmail,
          },
        },
      ],
    },
  };

  try {
    const response = await axios.post(url, email, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('E-mail envoyé :', response.status);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    return Promise.reject(new Error('Erreur lors de l\'envoi de l\'e-mail'));
  }
}

export default sendMicrosoftEmailToMyself;
