import axios from 'axios';
import {RedditAuthentication} from '../../model/redditAuth';
import {reject} from '../authService';

async function postRedditContent(subreddit: string, title: string, content: string, userRedditID: string) {
  try {
    const redditAuth = await RedditAuthentication.findOne({id: userRedditID}).exec();

    if (!redditAuth)
      return reject('Reddit Account not found');
    const accessToken = redditAuth.access_token;
    const url = 'https://oauth.reddit.com/api/submit';
    const requestBody = {
      kind: 'self',
      sr: subreddit,
      title: title,
      text: content,
    };
    const response = await axios.post(url, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return Promise.resolve(response.data);
  } catch (error) {
    console.error('Error while posting on reddit', error);
    return reject('Error while posting on reddit');
  }
}

export default postRedditContent;
