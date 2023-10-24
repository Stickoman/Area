import axios from 'axios';
import qs from 'querystring';
import {IDiscordAuthentication, DiscordAuthentication} from '../model/discordAuth';

interface DiscordResponse {
  token_type: string;
  access_token: string;
  expires_in: string;
}

async function requestAccessToken(code: string): Promise<DiscordResponse> {
  const API_URL = process.env.API_URL;
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const CALLBACK_URL = `${API_URL}/auth/discord/callback`;

  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'identify',
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
  try {
    const idResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `${response.token_type} ${response.access_token}`,
      },
    });
    const id = idResponse.data.id;
    const screenName = idResponse.data.global_name;
    let discordAuth = await DiscordAuthentication.findOne({id}).exec();

    if (discordAuth === null) {
      discordAuth = await new DiscordAuthentication({
        token_type: response.token_type,
        access_token: response.access_token,
        expires_in: response.expires_in,
        id: id,
        screenName: screenName,
      }).save();
    }
    return discordAuth;
  } catch (error) {
    throw new Error('Error registering Discord account: ' + error);
  }
}

export {requestAccessToken, registerDiscordAccount};
export type {DiscordResponse};
