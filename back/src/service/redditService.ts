import axios from 'axios';
import {IRedditAuthentication, RedditAuthentication} from '../model/redditAuth';

interface RedditResponse {
  token_type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
}

async function requestAccessToken(code: string): Promise<RedditResponse> {
  const API_URL = process.env.API_URL;
  const redirectUri = `${API_URL}/auth/reddit/callback`;
  try {
    const tokenResponse = await axios.post('https://www.reddit.com/api/v1/access_token', `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
      {
        auth: {
          username: process.env.REDDIT_CLIENT_ID,
          password: process.env.REDDIT_CLIENT_SECRET,
        },
        headers: {
          'User-Agent': 'AREA/1.0',
        },
      });
    return tokenResponse.data;
  } catch (error) {
    throw new Error('Error retrieving Reddit access token:' + error);
  }
}

async function registerRedditAccount(response: RedditResponse): Promise<IRedditAuthentication> {
  try {
    const idResponse = await axios.get('https://oauth.reddit.com/api/v1/me', {
      headers: {
        'Authorization': `Bearer ${response.access_token}`,
        'User-Agent': 'AREA',
      },
    });

    const id = idResponse.data.id;
    const screenName = idResponse.data.name;

    let RedditAuth = await RedditAuthentication.findOne({id}).exec();
    if (RedditAuth === null) {
      RedditAuth = await new RedditAuthentication({
        token_type: response.token_type,
        access_token: response.access_token,
        expires_in: response.expires_in,
        userId: id,
        screenName: screenName,
      }).save();
    }
    return RedditAuth;
  } catch (error) {
    throw new Error('Error registering Reddit account: ' + error);
  }
}

export {requestAccessToken, registerRedditAccount};
export type {RedditResponse};
