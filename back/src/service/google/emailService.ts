import axios from 'axios';

async function sendEmailToMyself(accessToken: string, subject: string, message: string, googleEmail: string) {
  const url = `https://gmail.googleapis.com/gmail/v1/users/${googleEmail}/messages/send`;

  const raw = makeBody(googleEmail, googleEmail, subject, message);

  const requestBody = {
    raw: raw,
  };

  try {
    const response = await axios.post(url, requestBody, {
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

  return Buffer.from(str, 'utf-8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
}

export default sendEmailToMyself;
