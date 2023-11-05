import axios from 'axios';
import {RedditAuthentication} from '../../model/redditAuth';

async function postRedditComment(userId: string, postId: string, text: string) {
  try {
    const redditAuth = await RedditAuthentication.findOne({id: userId}).exec();
    const accessToken = redditAuth.access_token;
    const redditApiUrl = `https://oauth.reddit.com/api/comment`;
    const requestBody = {
      api_type: 'json',
      thing_id: postId,
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
    return Promise.reject(new Error('Error while posting a comment on Reddit'));
  }
}

export { postRedditComment };