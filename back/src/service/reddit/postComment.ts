import axios from 'axios';
import {RedditAuthentication} from '../../model/redditAuth';
import { reject } from '../authService';

async function postRedditComment(userId: string, postId: string, text: string) {
  try {
    const redditAuth = await RedditAuthentication.findOne({id: userId}).exec();

    if (!redditAuth)
      return reject('Reddit Account not found');
    const accessToken = redditAuth.access_token;
    const redditApiUrl = `https://oauth.reddit.com/api/comment`;
    const requestBody = {
      api_type: 'json',
      thing_id: "t3_"+postId,
      text: text,
    };
    const requestHeaders = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'AREA/1.0',
    };

    const response = await axios.post(redditApiUrl, requestBody, {headers: requestHeaders});
    return Promise.resolve(response.data);
  } catch (error) {
    console.log("Error while posting a comment on Reddit: " + error);
    return reject('Error while posting on reddit');
  }
}

export { postRedditComment };