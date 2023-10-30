import axios from 'axios';

async function sendEmailToMyself(accessToken: string, subject: string, message: string, googleEmail: string) {
  const url = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';

  const email = `
    From: "Votre Nom" ${googleEmail}
    To: ${googleEmail}
    Subject: ${subject}

    ${message}
  `;

  const base64EncodedEmail = Buffer.from(email).toString('base64');
  const requestBody = {
    raw: base64EncodedEmail,
  };
  console.warn(base64EncodedEmail);
  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('E-mail envoyé:', response.status);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
    return Promise.reject(new Error('Erreur lors de l\'envoi de l\'e-mail'));
  }
}

export default sendEmailToMyself;
