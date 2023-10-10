import {OAuthOptions} from 'twitter-v1-oauth/lib/types';
import oAuth1a from 'twitter-v1-oauth';
import axios from 'axios';
import qs from 'querystring';
import {isString} from './authService';
import {IUser, User} from '../model/user';
import {ITwitterAuthentication, TwitterAuthentication} from '../model/twitterAuth';

interface TwitterResponse {
  oauth_token: string;
  oauth_token_secret: string;
  user_id: string;
  screen_name: string;
}

interface TwitterAPICall {
  url: string;
  method: 'POST' | 'GET';
  data: Record<string, string | number | boolean>;
}

const CALLBACK_URL = 'http://localhost:8080/api/auth/twitter/callback';

async function callTwitterAPI(call: TwitterAPICall, access_token: string) {
  const authOptions: OAuthOptions = {
    api_key: process.env.TWITTER_API_KEY || '',
    api_secret_key: process.env.TWITTER_API_SECRET_KEY || '',
    access_token: access_token,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
  };
  const {url, method, data} = call;
  const authorization = oAuth1a({method, url, data}, authOptions);

  return axios.request({
    url: url,
    method: method,
    headers: {authorization},
    data: qs.stringify(data),
  });
}

async function requestToken(): Promise<string> {
  const url = 'https://api.twitter.com/oauth/request_token';

  return callTwitterAPI({
    url: url,
    method: 'POST',
    data: {
      oauth_callback: CALLBACK_URL,
    },
  }, process.env.TWITTER_ACCESS_TOKEN)
    .then(response => {
      const responseData = qs.parse(response.data);

      if (isString(responseData.oauth_token))
        return responseData.oauth_token;
      return Promise.reject(new Error('Invalid OAuth Token'));
    })
    .catch(reason => {
      return Promise.reject(new Error('Unable to request token from Twitter:' + reason));
    });
}

async function requestAccessToken(token: string, verifier: string): Promise<TwitterResponse> {
  const url = 'https://api.twitter.com/oauth/access_token';

  return callTwitterAPI({
    url: url,
    method: 'POST',
    data: {
      oauth_verifier: verifier,
    },
  }, token)
    .then(response => {
      const responseData: unknown = qs.parse(response.data);

      return responseData as TwitterResponse;
    }).catch(reason => {
      return Promise.reject(new Error('Unable to request access token from Twitter:' + reason));
    });
}

async function registerTwitterAccount(response: TwitterResponse): Promise<ITwitterAuthentication> {
  let twitterAuth = await TwitterAuthentication.findOne({userId: response.user_id}).exec();

  if (twitterAuth === null) {
    twitterAuth = await new TwitterAuthentication({
      userId: response.user_id,
      oauthToken: response.oauth_token,
      oauthTokenSecret: response.oauth_token_secret,
      screenName: response.screen_name,
    }).save();
  }

  return twitterAuth;
}

export {requestToken, requestAccessToken, registerTwitterAccount};
export type {TwitterResponse};
