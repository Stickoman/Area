import {IMicrosoftAuthentication, MicrosoftAuthentication} from '../model/microsoftAuth';

import axios from 'axios';
import qs from 'querystring';

interface MicrosoftResponse {
  token_type: string;
  access_token: string;
  scope: string;
}

async function requestAccessToken(code: string): Promise<MicrosoftResponse> {
  const API_URL = process.env.API_URL;
  const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID;
  const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET;
  const CALLBACK_URL = `${API_URL}/auth/microsoft/callback`;

  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'https://graph.microsoft.com/Mail.Send',
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: CALLBACK_URL,
  };

  return axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(response => {
    return response.data as MicrosoftResponse;
  });
}

async function registerMicrosoftAccount(response: MicrosoftResponse): Promise<IMicrosoftAuthentication> {
  try {
    const idResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': `Bearer ${response.access_token}`,
      },
    });
    const id = idResponse.data.id;
    const screenName = idResponse.data.displayName;
    let microsoftAuth = await MicrosoftAuthentication.findOne({id}).exec();
    if (microsoftAuth === null) {
      microsoftAuth = await new MicrosoftAuthentication({
        token_type: response.token_type,
        access_token: response.access_token,
        scope: response.scope,
        grant_type: 'authorization_code',
        id: id,
        screenName: screenName,
        email: idResponse.data.mail,
      }).save();
    }
    return microsoftAuth;
  } catch (error) {
    throw new Error('Error registering Microsoft account: ' + error);
  }
}

export {requestAccessToken, registerMicrosoftAccount};
export type {MicrosoftResponse};
