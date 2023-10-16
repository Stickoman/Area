import axios from 'axios';
import qs from 'querystring';
import {IDiscordAuthentication, DiscordAuthentication} from '../model/discordAuth';

interface DiscordResponse {
  oauth_token: string;
  oauth_token_secret: string;
  user_id: string;
  screen_name: string;
}

async function requestAccessToken(code: string): Promise<DiscordResponse> {
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const CALLBACK_URL = 'https://discord.com/api/oauth2/authorize?client_id=1163485356558139535&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify';

  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: CALLBACK_URL,
  };

  return axios.post('https://discord.com/api/oauth2/token', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(response => response.data);
}
async function registerDiscordAccount(response: DiscordResponse): Promise<IDiscordAuthentication> {
  let discordAuth = await DiscordAuthentication.findOne({userId: response.user_id}).exec();

  if (discordAuth === null) {
    discordAuth = await new DiscordAuthentication({
      userId: response.user_id,
      oauthToken: response.oauth_token,
      oauthTokenSecret: response.oauth_token_secret,
      screenName: response.screen_name,
    }).save();
  }
  return discordAuth;
}

export {requestAccessToken, registerDiscordAccount};
export type {DiscordResponse};
