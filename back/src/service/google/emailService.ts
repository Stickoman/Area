import axios from 'axios';
import {GoogleAuthentication} from '../../model/googleAuth';
import {getBearerHeader} from '../../common/bearerHelper';
import {reject} from '../authService';

async function sendEmailToMyself(subject: string, message: string, userGoogleID: string) {
  const googleAuth = await GoogleAuthentication.findOne({id: userGoogleID}).exec();
  const googleEmail = googleAuth.email;
  const accessToken = googleAuth.access_token;
  const url = `https://gmail.googleapis.com/gmail/v1/users/${googleEmail}/messages/send`;
  const raw = makeBody(googleEmail, googleEmail, subject, message);

  try {
    const response = await axios.post(url, {raw}, {
      headers: {
        ...getBearerHeader(accessToken),
        'Content-Type': 'application/json',
      },
    });

    console.log('Email send!', response.status);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('Error while sending email:', error.data?.error);
    return reject('Error while sending email');
  }
}

function makeBody(to: string, from: string, subject: string, message: string) {
  const str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: 7bit\n',
    `to: ${to}\n`,
    `from: ${from}\n`,
    `subject: ${subject}\n\n`,
    message,
  ].join('');

  return Buffer.from(str, 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export default sendEmailToMyself;
