import {MicrosoftAuthentication} from '../../model/microsoftAuth';
import axios from 'axios';

async function teamsMessageService(subject: string, message: string, userMicrosoftID: string) {
  const MicrosoftAuth = await MicrosoftAuthentication.findOne({id: userMicrosoftID}).exec();
  const accessToken = MicrosoftAuth.access_token;


}


async function getMyUserId(accessToken : string) {
  try {
    const endpoint = 'https://graph.microsoft.com/v1.0/me';
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(endpoint, { headers: headers });
    return response.data.id;
  } catch (error) {
    console.error('Error fetching user id:', error);
  }
}

async function sendMessageToChat(accessToken : string, chatId : string, message : string) {
  try {
    const endpoint = `https://graph.microsoft.com/v1.0/chats/${chatId}/messages`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    const body = { body: { content: message } };
    const response = await axios.post(endpoint, body, { headers: headers });
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

export default teamsMessageService;
