import axios from 'axios';
import {RedditAuthentication} from '../../model/redditAuth';

async function sendRedditPrivateMessage(to: string, subject: string, text: string, userRedditID: string) {
  try {
    const redditAuth = await RedditAuthentication.findOne({id: userRedditID}).exec();
    let accessToken = redditAuth.access_token;
    const redditApiUrl = 'https://oauth.reddit.com/api/compose';
    const requestBody = {
      api_type: 'json',
      subject: subject,
      text: text,
      to: to,
    };
    const requestHeaders = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'AREA/1.0',
    };

    const response = await axios.post(redditApiUrl, requestBody, {headers: requestHeaders});
    return Promise.resolve(response.data);
  } catch (error) {
    console.log("error while send private message on reddit: " + error);
    return Promise.reject(new Error('Error while sending a private message on Reddit'));
  }
}

export { sendRedditPrivateMessage };