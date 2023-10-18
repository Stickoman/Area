import axios from 'axios';
import qs from 'querystring';
import {IGithubAuthentication, GithubAuthentication} from '../model/githubAuth';
import {TwitterResponse} from './twitterService';

interface GithubResponse {
  token_type: string;
  access_token: string;
  scope: string;
}

async function requestAccessToken(code: string): Promise<GithubResponse> {
  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  const CALLBACK_URL = 'http://localhost:8080/api/auth/github/callback';

  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'repo,gist',
    code: code,
    redirect_uri: CALLBACK_URL,
  };

  return axios.post('https://github.com/login/oauth/access_token', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(response => {
    const responseData: unknown = qs.parse(response.data);
    return responseData as GithubResponse;
  });
}

async function registerGithubAccount(response: GithubResponse): Promise<IGithubAuthentication> {
  try {

    const idResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `${response.token_type} ${response.access_token}`,
      },
    });
    const id = idResponse.data.id;
    const screenName = idResponse.data.login;
    let githubAuth = await GithubAuthentication.findOne({id}).exec();

    if (githubAuth === null) {
        githubAuth = await new GithubAuthentication({
        token_type: response.token_type,
        access_token: response.access_token,
        scope: response.scope,
        id: id,
        screenName: screenName,
      }).save();
    }
    return githubAuth;
  } catch (error) {
    throw new Error('Error registering Github account: ' + error);
  }
}

export {requestAccessToken, registerGithubAccount};
export type {GithubResponse};
