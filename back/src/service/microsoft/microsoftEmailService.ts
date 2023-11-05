import {MicrosoftAuthentication} from '../../model/microsoftAuth';
import axios from 'axios';
import {reject} from '../authService';

async function sendMicrosoftEmailToMyself(subject: string, message: string, userMicrosoftID: string) {
  const MicrosoftAuth = await MicrosoftAuthentication.findOne({id: userMicrosoftID}).exec();
  const microsoftEmail = MicrosoftAuth.email;
  const accessToken = MicrosoftAuth.access_token;
  const url = 'https://graph.microsoft.com/v1.0/me/sendMail';
  const email = {
    message: {
      subject,
      body: {
        contentType: 'Text',
        content: message,
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

    console.log('E-mail send:', response.status);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('Error while sending email:', error.data?.error);
    return reject('Error while sending email');
  }
}

export default sendMicrosoftEmailToMyself;
